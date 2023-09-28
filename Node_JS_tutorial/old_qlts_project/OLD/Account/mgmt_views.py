from sys import _getframe

from django.shortcuts import redirect
from django.http import HttpResponse
from django.template import loader
from django.contrib.auth import login, authenticate
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth import logout
from django.contrib.auth.decorators import user_passes_test
from django.contrib.auth.models import User
from django.http import HttpResponseRedirect
from django.utils.translation import activate
from ipware import get_client_ip
from django.utils.encoding import force_bytes, force_str as force_text
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.template.loader import render_to_string
from django.core.mail import EmailMessage
from django.conf import settings
from django.contrib.auth.decorators import login_required
from django.urls import reverse
from django.contrib.auth.hashers import make_password
from django.db.models import Q
from datetime import timedelta

from .tokens import account_activation_token
import logging
from cpuinfo import get_cpu_info
import psutil
import redis
import socket
from OnlineUsers.models import OnlineUserActivity

logger = logging.getLogger(__name__)

########
try:
    # Đề phòng trường hợp chưa đăng ký Site
    from django.contrib.sites.models import Site
    if Site.objects.filter(id=settings.SITE_ID).count() == 0:
        new_site = Site.objects.create(domain='tamnd.com', name='tamnd.com')
        settings.SITE_ID = new_site.id
except Exception as xx:
    print(str(xx))
########
from Workspace.views import AdminWebContext
from Workspace.views import SUPER_ALL_MENU_ITEMS
from .models import *

try:
    for obj in Account.objects.all():
        pass
        # settings.ALLVIEWS[obj.username] = AllViewEnable.objects.filter(username=obj.username).values('name')


    settings.ALL_ACCOUNTS = Account.objects.all()
except Exception as xx:
    print(str(xx))
try:
    # KHi dang migrate account --> loi import lien quan toi admin
    from .admin import GEN_SALT
except Exception as xx:
    print(str(xx))
from .process_request import process_post

try:
    default_email = BackendEmail.objects.filter(default=True).first()
    if default_email is not None:
        settings.EMAIL_USE_TLS = default_email.enable_tls
        settings.EMAIL_HOST = default_email.host
        settings.EMAIL_PORT = default_email.port
        settings.EMAIL_HOST_USER = default_email.username
        settings.EMAIL_HOST_PASSWORD = default_email.password
        settings.SUPPORT_EMAIL_SSL = default_email.enable_ssl
    else:
        print('Use default email sender info...!')
except Exception as xx:
    print(str(xx))

def get_user_permissions(user):
    if user.is_superuser:
        return Permission.objects.all()
    return user.user_permissions.all() | Permission.objects.filter(group__user=user)

@user_passes_test(lambda u: u.is_superuser)
def UserListView(request, newContext={}, *args, **kwargs):
    context = AdminWebContext(request, page_info='Account:UserListView', *args, **kwargs)
    context.update(newContext)
    template = loader.get_template(str('Account/%s/admin/manager/list_user.html' % context['website_template']))
    signup_info = {}
    signup_status = None
    signup_hide = False
    if request.method == 'POST':
        all_data = request.POST
        for key, value in all_data.items():
            log_write(msg=(str('%s: %s' % (key, value))), request=request, func_name=_getframe().f_code.co_name)

        passwd = all_data['passwd']
        user_name = all_data['user-name']
        email = all_data['email']
        if passwd:
            signup_hide = True
            checker = Account.objects.filter(username=user_name).first()
            if checker is not None:
                log_write(msg=(str('User Existed!')), request=request, func_name=_getframe().f_code.co_name)
                current_user = checker
                if current_user.is_active is False:
                    current_user.is_active = True
                    signup_status = 'User is not actived!'
                elif current_user.email_activated is False:
                    current_user.email_activated = True
                    current_user.save()
                else:
                    try:
                        if current_user.check_password(passwd):
                            login(request, current_user, backend='django.contrib.auth.backends.ModelBackend')
                            log_write(msg=(str('Try redirect...')), request=request,
                                      func_name=_getframe().f_code.co_name)
                            return redirect(reverse('Workspace:Index'))
                        log_write(msg=(str('Check password failed. User: %s' % current_user.username)), request=request,
                                  func_name=_getframe().f_code.co_name)
                        print('Set new password to: %s' % passwd)
                        current_user.password = make_password(passwd, 'pbkdf2_sha256')
                        current_user.save()
                    except Exception as login_ex:
                        try:
                            log_write(msg=(str(str(login_ex))), request=request, func_name=_getframe().f_code.co_name)
                            signup_status = 'User existed, Tried login but password failed!'
                            log_write(msg=(str('signup_status = %s' % signup_status)), request=request,
                                      func_name=_getframe().f_code.co_name)
                            return redirect(reverse('Account:Signin'))
                        finally:
                            login_ex = None
                            del login_ex

            else:
                try:
                    new_user = Account()
                    new_user.username = user_name
                    new_user.email = email
                    new_user.salt = GEN_SALT()
                    new_user.password = make_password(passwd, 'pbkdf2_sha256')
                    new_user.is_active = False
                    new_user.email_activated = True
                    super(Account, new_user).save()
                    signup_status = 'Account has been created done!'
                except Exception as usersave_ex:
                    try:
                        signup_status = str(usersave_ex)
                        log_write(msg=(str(str(usersave_ex))), request=request, func_name=_getframe().f_code.co_name)
                    finally:
                        usersave_ex = None
                        del usersave_ex

        else:
            signup_hide = False
            signup_status = 'Password Mismatch!'
    else:
        try:
            signup_email = request.GET['signup_email']
            context['signup_email'] = signup_email
        except Exception as rx:
            try:
                log_write(msg=(str('error = %s' % str(rx))), request=request, func_name=_getframe().f_code.co_name)
            finally:
                rx = None
                del rx

    signup_info['signup_status'] = signup_status
    signup_info['signup_hide'] = signup_hide
    context['signup_info'] = signup_info
    return HttpResponse(template.render(context, request))

@user_passes_test(lambda u: u.is_superuser)
def AddUserView(request, newContext={}, *args, **kwargs):
    context = AdminWebContext(request, page_info='Account:UserListView', *args, **kwargs)
    context.update(newContext)
    template = loader.get_template(str('Account/%s/admin/manager/add_user.html' % context['website_template']))
    signup_info = {}
    signup_status = None
    signup_hide = False
    if request.method == 'POST':
        all_data = request.POST
        for key, value in all_data.items():
            log_write(msg=(str('%s: %s' % (key, value))), request=request, func_name=_getframe().f_code.co_name)

        passwd = all_data['passwd']
        user_name = all_data['user-name']
        email = all_data['email']
        if passwd:
            signup_hide = True
            checker = Account.objects.filter(username=user_name).first()
            if checker is not None:
                log_write(msg=(str('User Existed!')), request=request, func_name=_getframe().f_code.co_name)
                current_user = checker
                if current_user.is_active is False:
                    current_user.is_active = True
                    signup_status = 'User is not actived!'
                elif current_user.email_activated is False:
                    current_user.email_activated = True
                    current_user.save()
                else:
                    try:
                        if current_user.check_password(passwd):
                            login(request, current_user, backend='django.contrib.auth.backends.ModelBackend')
                            log_write(msg=(str('Try redirect...')), request=request,
                                      func_name=_getframe().f_code.co_name)
                            return redirect(reverse('Workspace:Index'))
                        log_write(msg=(str('Check password failed. User: %s' % current_user.username)), request=request,
                                  func_name=_getframe().f_code.co_name)
                        print('Set new password to: %s' % passwd)
                        current_user.password = make_password(passwd, 'pbkdf2_sha256')
                        current_user.save()
                    except Exception as login_ex:
                        try:
                            log_write(msg=(str(str(login_ex))), request=request, func_name=_getframe().f_code.co_name)
                            signup_status = 'User existed, Tried login but password failed!'
                            log_write(msg=(str('signup_status = %s' % signup_status)), request=request,
                                      func_name=_getframe().f_code.co_name)
                            return redirect(reverse('Account:Signin'))
                        finally:
                            login_ex = None
                            del login_ex

            else:
                try:
                    new_user = Account()
                    new_user.username = user_name
                    new_user.email = email
                    new_user.salt = GEN_SALT()
                    new_user.password = make_password(passwd, 'pbkdf2_sha256')
                    new_user.is_active = False
                    new_user.email_activated = True
                    super(Account, new_user).save()
                    signup_status = 'Account has been created done!'
                except Exception as usersave_ex:
                    try:
                        signup_status = str(usersave_ex)
                        log_write(msg=(str(str(usersave_ex))), request=request, func_name=_getframe().f_code.co_name)
                    finally:
                        usersave_ex = None
                        del usersave_ex

        else:
            signup_hide = False
            signup_status = 'Password Mismatch!'
    else:
        try:
            signup_email = request.GET['signup_email']
            context['signup_email'] = signup_email
        except Exception as rx:
            try:
                log_write(msg=(str('error = %s' % str(rx))), request=request, func_name=_getframe().f_code.co_name)
            finally:
                rx = None
                del rx

    signup_info['signup_status'] = signup_status
    signup_info['signup_hide'] = signup_hide
    context['signup_info'] = signup_info
    return HttpResponse(template.render(context, request))

@user_passes_test(lambda u: u.is_superuser)
def EditUserView(request, newContext={}, *args, **kwargs):
    context = AdminWebContext(request, page_info='Account:UserListView', *args, **kwargs)
    context.update(newContext)
    template = loader.get_template(str('Account/%s/admin/manager/edit_user.html' % context['website_template']))
    signup_info = {}
    signup_status = None
    signup_hide = False
    if request.method == 'POST':
        all_data = request.POST
        for key, value in all_data.items():
            log_write(msg=(str('%s: %s' % (key, value))), request=request, func_name=_getframe().f_code.co_name)

        passwd = all_data['passwd']
        user_name = all_data['user-name']
        email = all_data['email']
        if passwd:
            signup_hide = True
            checker = Account.objects.filter(username=user_name).first()
            if checker is not None:
                log_write(msg=(str('User Existed!')), request=request, func_name=_getframe().f_code.co_name)
                current_user = checker
                if current_user.is_active is False:
                    current_user.is_active = True
                    signup_status = 'User is not actived!'
                elif current_user.email_activated is False:
                    current_user.email_activated = True
                    current_user.save()
                else:
                    try:
                        if current_user.check_password(passwd):
                            login(request, current_user, backend='django.contrib.auth.backends.ModelBackend')
                            log_write(msg=(str('Try redirect...')), request=request,
                                      func_name=_getframe().f_code.co_name)
                            return redirect(reverse('Workspace:Index'))
                        log_write(msg=(str('Check password failed. User: %s' % current_user.username)), request=request,
                                  func_name=_getframe().f_code.co_name)
                        print('Set new password to: %s' % passwd)
                        current_user.password = make_password(passwd, 'pbkdf2_sha256')
                        current_user.save()
                    except Exception as login_ex:
                        try:
                            log_write(msg=(str(str(login_ex))), request=request, func_name=_getframe().f_code.co_name)
                            signup_status = 'User existed, Tried login but password failed!'
                            log_write(msg=(str('signup_status = %s' % signup_status)), request=request,
                                      func_name=_getframe().f_code.co_name)
                            return redirect(reverse('Account:Signin'))
                        finally:
                            login_ex = None
                            del login_ex

            else:
                try:
                    new_user = Account()
                    new_user.username = user_name
                    new_user.email = email
                    new_user.salt = GEN_SALT()
                    new_user.password = make_password(passwd, 'pbkdf2_sha256')
                    new_user.is_active = False
                    new_user.email_activated = True
                    super(Account, new_user).save()
                    signup_status = 'Account has been created done!'
                except Exception as usersave_ex:
                    try:
                        signup_status = str(usersave_ex)
                        log_write(msg=(str(str(usersave_ex))), request=request, func_name=_getframe().f_code.co_name)
                    finally:
                        usersave_ex = None
                        del usersave_ex

        else:
            signup_hide = False
            signup_status = 'Password Mismatch!'
    else:
        try:
            signup_email = request.GET['signup_email']
            context['signup_email'] = signup_email
        except Exception as rx:
            try:
                log_write(msg=(str('error = %s' % str(rx))), request=request, func_name=_getframe().f_code.co_name)
            finally:
                rx = None
                del rx

    signup_info['signup_status'] = signup_status
    signup_info['signup_hide'] = signup_hide
    context['signup_info'] = signup_info
    return HttpResponse(template.render(context, request))

@user_passes_test(lambda u: u.is_superuser)
def GroupListView(request, newContext={}, *args, **kwargs):
    context = AdminWebContext(request, page_info='Account:UserListView', *args, **kwargs)
    context.update(newContext)
    template = loader.get_template(str('Account/%s/admin/manager/groups_list.html' % context['website_template']))
    signup_info = {}
    signup_status = None
    signup_hide = False
    if request.method == 'POST':
        all_data = request.POST
        for key, value in all_data.items():
            log_write(msg=(str('%s: %s' % (key, value))), request=request, func_name=_getframe().f_code.co_name)

        passwd = all_data['passwd']
        user_name = all_data['user-name']
        email = all_data['email']
        if passwd:
            signup_hide = True
            checker = Account.objects.filter(username=user_name).first()
            if checker is not None:
                log_write(msg=(str('User Existed!')), request=request, func_name=_getframe().f_code.co_name)
                current_user = checker
                if current_user.is_active is False:
                    current_user.is_active = True
                    signup_status = 'User is not actived!'
                elif current_user.email_activated is False:
                    current_user.email_activated = True
                    current_user.save()
                else:
                    try:
                        if current_user.check_password(passwd):
                            login(request, current_user, backend='django.contrib.auth.backends.ModelBackend')
                            log_write(msg=(str('Try redirect...')), request=request,
                                      func_name=_getframe().f_code.co_name)
                            return redirect(reverse('Workspace:Index'))
                        log_write(msg=(str('Check password failed. User: %s' % current_user.username)), request=request,
                                  func_name=_getframe().f_code.co_name)
                        print('Set new password to: %s' % passwd)
                        current_user.password = make_password(passwd, 'pbkdf2_sha256')
                        current_user.save()
                    except Exception as login_ex:
                        try:
                            log_write(msg=(str(str(login_ex))), request=request, func_name=_getframe().f_code.co_name)
                            signup_status = 'User existed, Tried login but password failed!'
                            log_write(msg=(str('signup_status = %s' % signup_status)), request=request,
                                      func_name=_getframe().f_code.co_name)
                            return redirect(reverse('Account:Signin'))
                        finally:
                            login_ex = None
                            del login_ex

            else:
                try:
                    new_user = Account()
                    new_user.username = user_name
                    new_user.email = email
                    new_user.salt = GEN_SALT()
                    new_user.password = make_password(passwd, 'pbkdf2_sha256')
                    new_user.is_active = False
                    new_user.email_activated = True
                    super(Account, new_user).save()
                    signup_status = 'Account has been created done!'
                except Exception as usersave_ex:
                    try:
                        signup_status = str(usersave_ex)
                        log_write(msg=(str(str(usersave_ex))), request=request, func_name=_getframe().f_code.co_name)
                    finally:
                        usersave_ex = None
                        del usersave_ex

        else:
            signup_hide = False
            signup_status = 'Password Mismatch!'
    else:
        try:
            signup_email = request.GET['signup_email']
            context['signup_email'] = signup_email
        except Exception as rx:
            try:
                log_write(msg=(str('error = %s' % str(rx))), request=request, func_name=_getframe().f_code.co_name)
            finally:
                rx = None
                del rx

    signup_info['signup_status'] = signup_status
    signup_info['signup_hide'] = signup_hide
    context['signup_info'] = signup_info
    return HttpResponse(template.render(context, request))

@user_passes_test(lambda u: u.is_superuser)
def OrgDetailView(request, newContext={}, *args, **kwargs):
    context = AdminWebContext(request, page_info='Account:UserListView', *args, **kwargs)
    context.update(newContext)
    template = loader.get_template(str('Account/%s/admin/manager/org_details.html' % context['website_template']))
    signup_info = {}
    signup_status = None
    signup_hide = False
    if request.method == 'POST':
        all_data = request.POST
        for key, value in all_data.items():
            log_write(msg=(str('%s: %s' % (key, value))), request=request, func_name=_getframe().f_code.co_name)

        passwd = all_data['passwd']
        user_name = all_data['user-name']
        email = all_data['email']
        if passwd:
            signup_hide = True
            checker = Account.objects.filter(username=user_name).first()
            if checker is not None:
                log_write(msg=(str('User Existed!')), request=request, func_name=_getframe().f_code.co_name)
                current_user = checker
                if current_user.is_active is False:
                    current_user.is_active = True
                    signup_status = 'User is not actived!'
                elif current_user.email_activated is False:
                    current_user.email_activated = True
                    current_user.save()
                else:
                    try:
                        if current_user.check_password(passwd):
                            login(request, current_user, backend='django.contrib.auth.backends.ModelBackend')
                            log_write(msg=(str('Try redirect...')), request=request,
                                      func_name=_getframe().f_code.co_name)
                            return redirect(reverse('Workspace:Index'))
                        log_write(msg=(str('Check password failed. User: %s' % current_user.username)), request=request,
                                  func_name=_getframe().f_code.co_name)
                        print('Set new password to: %s' % passwd)
                        current_user.password = make_password(passwd, 'pbkdf2_sha256')
                        current_user.save()
                    except Exception as login_ex:
                        try:
                            log_write(msg=(str(str(login_ex))), request=request, func_name=_getframe().f_code.co_name)
                            signup_status = 'User existed, Tried login but password failed!'
                            log_write(msg=(str('signup_status = %s' % signup_status)), request=request,
                                      func_name=_getframe().f_code.co_name)
                            return redirect(reverse('Account:Signin'))
                        finally:
                            login_ex = None
                            del login_ex

            else:
                try:
                    new_user = Account()
                    new_user.username = user_name
                    new_user.email = email
                    new_user.salt = GEN_SALT()
                    new_user.password = make_password(passwd, 'pbkdf2_sha256')
                    new_user.is_active = False
                    new_user.email_activated = True
                    super(Account, new_user).save()
                    signup_status = 'Account has been created done!'
                except Exception as usersave_ex:
                    try:
                        signup_status = str(usersave_ex)
                        log_write(msg=(str(str(usersave_ex))), request=request, func_name=_getframe().f_code.co_name)
                    finally:
                        usersave_ex = None
                        del usersave_ex

        else:
            signup_hide = False
            signup_status = 'Password Mismatch!'
    else:
        try:
            signup_email = request.GET['signup_email']
            context['signup_email'] = signup_email
        except Exception as rx:
            try:
                log_write(msg=(str('error = %s' % str(rx))), request=request, func_name=_getframe().f_code.co_name)
            finally:
                rx = None
                del rx

    signup_info['signup_status'] = signup_status
    signup_info['signup_hide'] = signup_hide
    context['signup_info'] = signup_info
    return HttpResponse(template.render(context, request))
