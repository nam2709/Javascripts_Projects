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
# from Workspace.views import AdminWebContext

from admin_argon.forms import LoginForm
# from A360EvaluateSystemManagement.models import *
# from A360NewOrganizationChartManagement.models import *

from .tokens import account_activation_token
import logging
from cpuinfo import get_cpu_info
import psutil
# import redis
import socket
# from OnlineUsers.models import OnlineUserActivity

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
# from Workspace.views import AdminWebContext
# from Workspace.views import SUPER_ALL_MENU_ITEMS
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

# try:
#     default_email = BackendEmail.objects.filter(default=True).first()
#     if default_email is not None:
#         settings.EMAIL_USE_TLS = default_email.enable_tls
#         settings.EMAIL_HOST = default_email.host
#         settings.EMAIL_PORT = default_email.port
#         settings.EMAIL_HOST_USER = default_email.username
#         settings.EMAIL_HOST_PASSWORD = default_email.password
#         settings.SUPPORT_EMAIL_SSL = default_email.enable_ssl
#     else:
#         print('Use default email sender info...!')
# except Exception as xx:
#     print(str(xx))

def get_user_permissions(user):
    if user.is_superuser:
        return Permission.objects.all()
    return user.user_permissions.all() | Permission.objects.filter(group__user=user)

@user_passes_test(lambda u: u.is_superuser)
def CreateUser(request, newContext={}, *args, **kwargs):
    context = AdminWebContext(request, page_info='Account:CreateUser', *args, **kwargs)
    context.update(newContext)
    template = loader.get_template(str('Account/%s/admin/create-user.html' % context['website_template']))
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
def CreateUserForApp(request, appname=None, *args, **kwargs):
    context = AdminWebContext(request, page_info='Account:CreateUserForApp', *args, **kwargs)
    context.update(newContext)
    template = loader.get_template(str('Account/%s/admin/create-user-for-app.html' % context['website_template']))
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

@csrf_exempt
def Signup(request, newContext={}, *args, **kwargs):
    context = AdminWebContext(request, page_info='Account:Signup', *args, **kwargs)
    context.update(newContext)
    template = loader.get_template(str('Account/%s/front/signup.html' % context['website_template']))
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
                    signup_status = 'User is not actived!'
                elif current_user.email_activated is False:
                    try:
                        signup_status = 'User existed, please confirm your email address to complete the registration.'
                        current_site = Site.objects.get(id=(settings.SITE_ID))
                        log_write(msg=(str('current_site = %s ' % current_site)), request=request,
                                  func_name=_getframe().f_code.co_name)
                        mail_subject = str('[%s] Activate your account' % current_site.domain.capitalize())
                        log_write(msg=(str('mail_subject = %s ' % mail_subject)), request=request,
                                  func_name=_getframe().f_code.co_name)
                        uid = urlsafe_base64_encode(force_bytes(current_user.pk))
                        log_write(msg=(str('uid = %s' % uid)), request=request, func_name=_getframe().f_code.co_name)
                        token = account_activation_token.make_token(current_user)
                        log_write(msg=(str('token = %s' % token)), request=request,
                                  func_name=_getframe().f_code.co_name)
                        message = render_to_string(
                            str('Account/%s/front/acc_active_email.html' % context['website_template']),
                            {'user': current_user,
                             'domain': current_site.domain,
                             'uid': uid,
                             'token': token})
                        log_write(msg=(str('message = %s' % message)), request=request,
                                  func_name=_getframe().f_code.co_name)
                        to_email = email
                        log_write(msg=(str('to_email = %s' % to_email)), request=request,
                                  func_name=_getframe().f_code.co_name)
                        obj_email = EmailMessage(from_email=settings.EMAIL_HOST_USER,
                                                 subject=mail_subject,
                                                 body=message,
                                                 to=[to_email])
                        obj_email.send()
                    except Exception as sendmail_ex:
                        try:
                            signup_status = str(sendmail_ex)
                            log_write(msg=(str(str(sendmail_ex))), request=request,
                                      func_name=_getframe().f_code.co_name)
                        finally:
                            sendmail_ex = None
                            del sendmail_ex

                else:
                    try:
                        if current_user.check_password(passwd):
                            login(request, current_user, backend='django.contrib.auth.backends.ModelBackend')
                            log_write(msg=(str('Try redirect...')), request=request,
                                      func_name=_getframe().f_code.co_name)
                            return redirect(reverse('Workspace:Index'))
                        log_write(msg=(str('Check password failed. User: %s' % current_user.username)), request=request,
                                  func_name=_getframe().f_code.co_name)
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
                    ip, is_routable = get_client_ip(request)
                    new_user.signup_ipv4 = ip
                    new_user.signup_at = djnow()
                    super(Account, new_user).save()
                    signup_status = 'Please confirm your email address to complete the registration'
                    current_site = Site.objects.get(id=(settings.SITE_ID))
                    log_write(msg=(str('current_site = %s ' % current_site)), request=request,
                              func_name=_getframe().f_code.co_name)
                    mail_subject = str('[%s] Activate your account' % current_site.domain.capitalize())
                    log_write(msg=(str('mail_subject = %s ' % mail_subject)), request=request,
                              func_name=_getframe().f_code.co_name)
                    uid = urlsafe_base64_encode(force_bytes(new_user.pk))
                    log_write(msg=(str('uid = %s' % uid)), request=request, func_name=_getframe().f_code.co_name)
                    token = account_activation_token.make_token(new_user)
                    log_write(msg=(str('token = %s' % token)), request=request, func_name=_getframe().f_code.co_name)
                    message = render_to_string(
                        str('Account/%s/front/acc_active_email.html' % context['website_template']), {'user': new_user,
                                                                                                       'domain': current_site.domain,
                                                                                                       'uid': uid,
                                                                                                       'token': token})
                    log_write(msg=(str('message = %s' % render_to_string)), request=request,
                              func_name=_getframe().f_code.co_name)
                    to_email = email
                    log_write(msg=(str('to_email = %s' % to_email)), request=request,
                              func_name=_getframe().f_code.co_name)
                    obj_email = EmailMessage(from_email=settings.EMAIL_HOST_USER,
                                             subject=mail_subject,
                                             body=message,
                                             to=[
                                                 to_email])
                    obj_email.send()
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

        if request.user.is_authenticated:
            signup_hide = True
            log_write(msg=(str('signup_hide = %s' % signup_hide)), request=request,
                      func_name=_getframe().f_code.co_name)
    signup_info['signup_status'] = signup_status
    signup_info['signup_hide'] = signup_hide
    context['signup_info'] = signup_info
    return HttpResponse(template.render(context, request))

@csrf_exempt
def Signin(request, newContext={}, *args, **kwargs):
    # context = AdminWebContext(request, page_info='Account:Signin', *args, **kwargs)
    context = {}
    context['website_template'] = 'arrgon'
    context.update(newContext)
    template = loader.get_template(str('Account/%s/front/sign-in.html' % context['website_template']))
    form_class = LoginForm

    if request.method == 'POST':
        data = request.POST
        log_write(msg=(str(data)), request=request, func_name=_getframe().f_code.co_name)
        raw_username = data['username']
        raw_password = data['password']
        # checker = settings.ALL_ACCOUNTS.filter(username=username).first()
        # checker = Account.objects.filter(username=username).first()
        # u = Account.objects.get(username=raw_username)
        # u.set_password(raw_password)
        # u.save()
        checker = authenticate(username=raw_username, password=raw_password)
        if checker is None:
            login_status = 'User is not existed!'
        else:
            current_user = checker
            if current_user.is_active is False or current_user.email_activated is False:
                login_status = 'User is not active!'
            # elif current_user.check_password(raw_password):
            else:
                try:
                    login(request, current_user, backend='django.contrib.auth.backends.ModelBackend')
                    current_user.logged_with_password = True
                    current_user.last_login = djnow()
                    ip, is_routable = get_client_ip(request)
                    current_user.last_login_ipv4 = ip
                    current_user.last_login_at = djnow()
                    current_user.save()
                    login_status = 'Login Success!'
                    try:
                        next = request.GET['next']
                    except:
                        # next = reverse('Account:TNVDashboard')
                        # redirect_obj = SUPER_ALL_MENU_ITEMS.filter(~Q(url="") & ~Q(url=None) & Q(login_redirect=True)).first()
                        # if redirect_obj is not None:
                        #     next = redirect_obj.url
                        # else:
                        #     next = reverse('Account:TNVDashboard')
                        next = reverse('index')
                        print("err")
                    return HttpResponseRedirect(next)

                except Exception as xx:
                    try:
                        log_write(msg=(str(str(xx))), request=request, func_name=_getframe().f_code.co_name)
                        login_status = str(xx)
                    finally:
                        xx = None
                        del xx

            # else:
            #     login_status = 'Password failed!'
    else:
        login_status = None
    try:
        context['login_status'] = login_status
        context['form'] = LoginForm
    except Exception as xx:
        print(str(xx))
        pass

    return HttpResponse(template.render(context, request))

@csrf_exempt
def LoginFace(request, *args, **kwargs):
    context = AdminWebContext(request, page_info='Account:SigninFace', *args, **kwargs)
    template = loader.get_template(str('Account/%s/front/login-face.html' % context['website_template']))
    if request.method == 'POST':
        data = request.POST
        log_write(msg=(str(data)), request=request, func_name=_getframe().f_code.co_name)
        username = data['user-name']
        app_password = data['onetime-passwd']
        checker = settings.ALL_ACCOUNTS.filter(username=username)
        if checker.count() == 0:
            login_status = 'User is not existed!'
            template = loader.get_template('Account/login.html')
        else:
            current_user = checker[0]
            if current_user.is_active is False:
                login_status = 'User is not active!'
                template = loader.get_template('Account/login.html')
            elif app_password == current_user.onetime_passwd:
                user = current_user
                login(request, user)
                login_status = 'Success'
                current_user.onetime_passwd = None
                current_user.logged_with_password = False
                ip, is_routable = get_client_ip(request)
                current_user.last_login_ipv4 = ip
                current_user.last_login_at = djnow()
                current_user.save()
                return HttpResponseRedirect(reverse('Account:Dashboard'))
    else:
        login_status = None
    try:
        context['login_status'] = login_status
    except:
        pass

    return HttpResponse(template.render(context, request))

@login_required
def ChangePassword(request, *args, **kwargs):
    context = AdminWebContext(request, page_info='Account:ChangePassword', *args, **kwargs)
    template = loader.get_template(str('Account/%s/admin/change_password.html' % context['website_template']))
    changepasswd_info = {}
    alert = {}
    change_status = None
    change_hide = None
    log_write(msg=(str('Change password request Method: %s ' % request.method)), request=request,
              func_name=_getframe().f_code.co_name)
    if request.method == 'POST':
        all_data = request.POST
        for key, value in all_data.items():
            log_write(msg=(str('%s: %s' % (key, value))), request=request, func_name=_getframe().f_code.co_name)

        if request.user.is_authenticated:
            current_password = all_data['current-passwd']
            new_password = all_data['new-passwd']
            new_repasswd = all_data['confirm-passwd']
            if new_password == new_repasswd:
                checker = settings.ALL_ACCOUNTS.filter(username=(request.user)).first()
                if checker is None:
                    change_status = 'User is not existed! May be fake!'
                    log_write(msg=(str(change_status)), request=request, func_name=_getframe().f_code.co_name)
                    alert['level'] = 'danger'
                    alert['message'] = change_status
                else:
                    current_user = checker
                    if current_user.check_password(current_password):
                        current_user.password = make_password(new_repasswd, 'pbkdf2_sha256')
                        current_user.save()
                        change_status = 'Password updated successfull!'
                        log_write(msg=(str(change_status)), request=request, func_name=_getframe().f_code.co_name)
                        alert['level'] = 'success'
                        alert['message'] = change_status
                        login_views_url = f'/Account/signin/'
                        if login_views_url:
                            return HttpResponseRedirect(login_views_url)
                        else:
                            return HttpResponseRedirect(reverse('Account:Signin'))
                        # return HttpResponseRedirect(reverse('Account:Signin'))
                    else:
                        change_status = 'Check_password Password failed!'
                        log_write(msg=(str(change_status)), request=request, func_name=_getframe().f_code.co_name)
                        alert['level'] = 'warning'
                        alert['message'] = change_status
                    # return HttpResponseRedirect('Account:Signin')
            else:
                change_status = 'Repassword and new password are not the same!'
                log_write(msg=(str(change_status)), request=request, func_name=_getframe().f_code.co_name)
                alert['level'] = 'warning'
                alert['message'] = change_status
        else:
            alert['level'] = 'warning'
            alert['message'] = 'You should login to continue!'
            context['web_alerts'].append(alert)
            return Signin(request, context)
    elif request.user.is_authenticated:
        change_hide = False
        log_write(msg=(str('change_hide = %s' % change_hide)), request=request, func_name=_getframe().f_code.co_name)
        alert['level'] = 'warning'
        alert['message'] = 'You should login by password to update new password!'
    else:
        change_hide = True
        return HttpResponseRedirect('Account:Signin')
    changepasswd_info['change_status'] = change_status
    changepasswd_info['change_hide'] = change_hide
    context['changepasswd_info'] = changepasswd_info
    context['alert'] = alert
    return HttpResponse(template.render(context, request))


@login_required
def Signout(request, *args, **kwargs):
    logout(request)
    return HttpResponseRedirect('/')


@csrf_exempt
def ActivateListener(request,
                     uidb64,
                     token,
                     backend='django.contrib.auth.backends.ModelBackend',
                     *args, **kwargs):
    context = AdminWebContext(request, page_info='Account:Activate', *args, **kwargs)
    template = loader.get_template(str('Account/%s/front/home.html' % context['website_template']))
    try:
        uid = force_text(urlsafe_base64_decode(uidb64))
        user = Account.objects.get(pk=uid)
    except (TypeError, ValueError, OverflowError, Account.DoesNotExist):
        user = None

    if user is not None and account_activation_token.check_token(user, token):
        user.is_active = True
        user.email_activated = True
        user.save()
        login(request, user, backend=backend)
        context['inform'] = 'Thank you for your email confirmation. Now you can login your account.'
    else:
        context['inform'] = 'Activation link is invalid!'
    return HttpResponse(template.render(context, request))


@csrf_exempt
def ResetPassword(request, *args, **kwargs):
    context = AdminWebContext(request, page_info='Account:ResetPassword', *args, **kwargs)
    template = loader.get_template(str('Account/%s/front/reset_password.html' % context['website_template']))
    signup_info = {}
    if request.method == 'POST':
        all_data = request.POST
        for key, value in all_data.items():
            log_write(msg=(str('%s: %s' % (key, value))), request=request, func_name=_getframe().f_code.co_name)

        email = all_data['email']
        if email:
            signup_hide = True
            checker = settings.ALL_ACCOUNTS.filter(email=email).first()
            signup_status = 'If the email address is existing, let check your email address to reset password'
            if checker is not None:
                checker.reset_password(request)
                # try:
                #     current_site = Site.objects.get(id=(settings.SITE_ID))
                #     log_write(msg=(str('current_site = %s ' % current_site)), request=request,
                #               func_name=_getframe().f_code.co_name)
                #     mail_subject = str('[%s] Reset your account password' % current_site.domain.capitalize())
                #     log_write(msg=(str('mail_subject = %s ' % mail_subject)), request=request,
                #               func_name=_getframe().f_code.co_name)
                #     uid = urlsafe_base64_encode(force_bytes(checker.pk))
                #     log_write(msg=(str('uid = %s' % uid)), request=request, func_name=_getframe().f_code.co_name)
                #     token = account_activation_token.make_token(checker)
                #     log_write(msg=(str('token = %s' % token)), request=request, func_name=_getframe().f_code.co_name)
                #     message = render_to_string(
                #         str('Account/%s/front/reset_password_email.html' % context['website_template']),
                #         {'user': checker,
                #          'domain': current_site.domain,
                #          'uid': uid,
                #          'token': token})
                #     log_write(msg=(str('message = %s' % render_to_string)), request=request,
                #               func_name=_getframe().f_code.co_name)
                #     to_email = email
                #     log_write(msg=(str('to_email = %s' % to_email)), request=request,
                #               func_name=_getframe().f_code.co_name)
                #     obj_email = EmailMessage(from_email=settings.EMAIL_HOST_USER,
                #                              subject=mail_subject,
                #                              body=message,
                #                              to=[to_email])
                #     obj_email.send()
                # except Exception as usersave_ex:
                #     try:
                #         signup_status = str(usersave_ex)
                #         log_write(msg=(str(str(usersave_ex))), request=request, func_name=_getframe().f_code.co_name)
                #     finally:
                #         usersave_ex = None
                #         del usersave_ex

        else:
            signup_hide = False
            signup_status = 'Email is invalid!'
    else:
        if request.user.is_authenticated:
            signup_hide = True
            log_write(msg=(str('signup_hide = %s' % signup_hide)), request=request,
                      func_name=_getframe().f_code.co_name)
        else:
            signup_hide = False
        signup_status = None
    signup_info['signup_status'] = signup_status
    signup_info['signup_hide'] = signup_hide
    context['signup_info'] = signup_info
    return HttpResponse(template.render(context, request))


@csrf_exempt
def ResetPasswordListener(request, uidb64, token, *args, **kwargs):
    context = AdminWebContext(request, page_info='Account:ResetPassword', *args, **kwargs)
    template = loader.get_template(str('Account/%s/front/reset_password_update.html' % context['website_template']))
    signup_info = {}
    try:
        uid = force_text(urlsafe_base64_decode(uidb64))
        user = Account.objects.get(pk=uid)
    except (TypeError, ValueError, OverflowError, User.DoesNotExist):
        user = None

    if user is not None and account_activation_token.check_token(user, token):
        if request.method == 'POST':
            try:
                passwd = request.POST['passwd']
                re_passwd = request.POST['re_passwd']
                if re_passwd == passwd:
                    user.email_activated = True
                    user.is_active = True
                    user.password = make_password(re_passwd, 'pbkdf2_sha256')
                    user.save()
                    login(request, user)
                    context['inform'] = 'Password is reset. Now you can login your account with new password.'
                    signup_status = 'Password is reset. Now you can login your account with new password.'
                    signup_hide = True
                    log_write(msg=(str(signup_status)), request=request, func_name=_getframe().f_code.co_name)
                else:
                    context['inform'] = 'Password and confirm password does not match!'
                    signup_status = 'Password and confirm password does not match!'
                    log_write(msg=(str(signup_status)), request=request, func_name=_getframe().f_code.co_name)
                    signup_hide = False
            except Exception as xx:
                try:
                    context['inform'] = 'Failed!'
                    signup_status = 'Failed!'
                    signup_hide = True
                    log_write(msg=(str('Error = %s ' % str(xx))), request=request,
                              func_name=_getframe().f_code.co_name)
                finally:
                    xx = None
                    del xx

        else:
            signup_status = None
            signup_hide = False
    else:
        context['inform'] = 'Link is invalid!'
        signup_status = 'Link is invalid!'
        signup_hide = True
    signup_info['signup_status'] = signup_status
    signup_info['signup_hide'] = signup_hide
    context['signup_info'] = signup_info
    log_write(msg=(str(signup_status)), request=request, func_name=_getframe().f_code.co_name)
    result = HttpResponse(template.render(context, request))
    return result


def Home(request, *args, **kwargs):
    if request.user:
        return HttpResponseRedirect(reverse('Account:Dashboard'))
    return HttpResponseRedirect(reverse('Account:Signin'))


@csrf_exempt
def TestCamera(request, *args, **kwargs):
    context = AdminWebContext(request, page_info='Account:TestCamera', *args, **kwargs)
    template = loader.get_template(str('Account/%s/test_webcam.html' % context['website_template']))
    return HttpResponse(template.render(context, request))


@login_required
def MessagesView(request, *args, **kwargs):
    context = AdminWebContext(request, page_info='Account:TestCamera', *args, **kwargs)
    template = loader.get_template('Account/test_webcam.html')
    return HttpResponse(template.render(context, request))


@login_required
def MessagesViewDetail(request, slug=None, *args, **kwargs):
    context = AdminWebContext(request, page_info='Account:TestCamera', *args, **kwargs)
    template = loader.get_template(str('Account/%s/admin/test_webcam.html' % context['website_template']))
    return HttpResponse(template.render(context, request))


@login_required
def AccountAlertsViewAll(request, *args, **kwargs):
    context = AdminWebContext(request, page_info='Account:AccountAlertsViewAll', *args, **kwargs)
    template = loader.get_template(str('Account/%s/admin/all-alerts.html' % context['website_template']))
    return HttpResponse(template.render(context, request))


@login_required
def AccountAlertsViewDetail(request, slug=None, *args, **kwargs):
    context = AdminWebContext(request, page_info='Account:AccountAlertsViewDetail', *args, **kwargs)
    template = loader.get_template(str('Account/%s/admin/alert-detail.html' % context['website_template']))
    return HttpResponse(template.render(context, request))


#@login_required
@user_passes_test(lambda u: u.is_superuser)
def Dashboard(request, *args, **kwargs):
    activate('vi')
    if 'next' in request.GET:
        next = request.GET['next']
        return HttpResponseRedirect(next)
    else:
        redirect_obj = SUPER_ALL_MENU_ITEMS.filter(~Q(url="") & ~Q(url=None) & Q(login_redirect=True)).first()
        if redirect_obj is not None:
            next = redirect_obj.url
            return HttpResponseRedirect(next)
    context = AdminWebContext(request, page_info='Account:Dashboard', *args, **kwargs)
    template = loader.get_template(str('Account/%s/admin/dashboard.html' % context['website_template']))
    profile_info = {}
    profile_status = None
    profile_hide = None
    if request.user.is_authenticated:
        profile_hide = False
        log_write(msg=(str('profile_hide = %s' % profile_hide)), request=request,
                  func_name=_getframe().f_code.co_name)
        current_user = Account.objects.get(username=(request.user))
        context['current_user'] = current_user
    else:
        profile_hide = True
        return HttpResponseRedirect('Account:Signin')
    if request.method == 'POST':
        all_data = request.POST
        for key, value in all_data.items():
            log_write(msg=(str('%s: %s' % (key, value))), request=request, func_name=_getframe().f_code.co_name)

        if request.user.is_authenticated:
            checker = Account.objects.filter(username=(request.user))
            if checker.count() == 0:
                profile_status = 'User is not existed! May be fake!'
                log_write(msg=(str(profile_status)), request=request, func_name=_getframe().f_code.co_name)
            else:
                current_user = checker[0]
                action = all_data['action']
                log_write(msg=(str('action = %s' % action)), request=request, func_name=_getframe().f_code.co_name)
                if action == 'add-site':
                    url = all_data['site-url']
                    log_write(msg=(str('url = %s' % url)), request=request, func_name=_getframe().f_code.co_name)
                    try:
                        profile_status = current_user.add_website(url)
                    except Exception as px:
                        try:
                            profile_status = str('Cannot add website. Error: %s' % str(px))
                            log_write(msg=(str(profile_status)), request=request,
                                      func_name=_getframe().f_code.co_name)
                        finally:
                            px = None
                            del px

                elif action == 'change-profile':
                    first_name = all_data['first-name']
                    last_name = all_data['last-name']
                    phone_number = all_data['phone_number']
                    current_user = Account.objects.get(username=(request.user))
                    try:
                        current_user.first_name = first_name
                        current_user.last_name = last_name
                        current_user.telephone = phone_number
                        current_user.save()
                        profile_status = str('Update Profile success!')
                    except Exception as xx:
                        try:
                            log_write(msg=(str(str(xx))), request=request, func_name=_getframe().f_code.co_name)
                            profile_status = str('Cannot update profile. Error: %s' % str(xx))
                        finally:
                            xx = None
                            del xx

                elif action == 'change-password-action':
                    if request.user.is_authenticated:
                        current_password = all_data['current_passwd']
                        new_password = all_data['new_password']
                        new_repasswd = all_data['new_repasswd']
                        if new_password == new_repasswd:
                            checker = Account.objects.filter(username=(request.user))
                            if checker.count() == 0:
                                change_status = 'User is not existed! May be fake!'
                                log_write(msg=(str(change_status)), request=request,
                                          func_name=_getframe().f_code.co_name)
                            else:
                                current_user = checker[0]
                                user = authenticate(username=(current_user.username), password=current_password)
                                if user is None:
                                    change_status = 'Wrong current password!'
                                    log_write(msg=(str(change_status)), request=request,
                                              func_name=_getframe().f_code.co_name)
                                else:
                                    change_status = 'Let wait for change password!'
                                    log_write(msg=(str(change_status)), request=request,
                                              func_name=_getframe().f_code.co_name)
                        else:
                            change_status = 'Repassword and new password are not the same!'
                            log_write(msg=(str(change_status)), request=request, func_name=_getframe().f_code.co_name)
                    else:
                        return HttpResponseRedirect('Account:Signin')
        else:
            return HttpResponseRedirect('Account:Signin')
    else:
        pass
    cpu_info = get_cpu_info()

    #### CPU
    cpu_usage = psutil.cpu_percent()
    context['cpu_info'] = cpu_info
    context['cpu_usage'] = cpu_usage

    # Enviroment Parameters
    env_paras = os.environ
    context['env_paras'] = env_paras

    #### MEMORY
    ram_info = None
    ram_percent = psutil.virtual_memory().percent
    ram_total = psutil.virtual_memory().total / 1024 ** 2
    ram_usage = ram_total - psutil.virtual_memory().available / 1024 ** 2
    context['ram_total'] = ram_total

    context['ram_usage'] = ram_usage
    context['ram_percent'] = ram_percent
    context['ram_info'] = ram_info

    #### STORAGE
    storage_info = None
    hdd = psutil.disk_usage('/')
    hdd_total = hdd.total / (2 ** 30)
    hdd_used = hdd.used / (2 ** 30)
    hdd_free = hdd.free / (2 ** 30)
    context['hdd_total'] = hdd_total
    context['hdd_used'] = hdd_used
    context['hdd_percent'] = round(hdd_used * 100 / hdd_total, 2)
    context['hdd_free'] = round(hdd_free, 2)

    #### Parameters
    try:
        configs = settings.__dict__
        context['configs'] = configs
    except Exception as xx:
        print(str('Can not get settings.ALL_CONFIGS... Error: %s' % str(xx)))

    #### Networks
    hostname = socket.gethostname()
    local_ip = socket.gethostbyname(hostname)
    context['hostname'] = hostname
    context['local_ip'] = local_ip

    context['storage_info'] = storage_info

    #### Users online:
    # user_activity_objects = OnlineUserActivity.get_user_activities(timedelta(days=1))
    user_activity_objects = OnlineUserActivity.get_user_activities_in_range(timedelta(days=1), timedelta(days=0))
    context['user_activity_objects'] = user_activity_objects

    user_online_counts = []
    for i in range(0, 6):
        user_online_counts.append(OnlineUserActivity.get_user_activities_in_range(timedelta(days=6-i), timedelta(days=6-i-1)).count())
    context['user_online_counts'] = user_online_counts

    all_users_count = Account.objects.all().count()
    context['all_users_count'] = all_users_count

    online_percent = user_activity_objects.count() / all_users_count * 100
    context['online_percent'] = round(online_percent, 0)

    context['chart_data'] = {
        'label': ['5 days ago', '4 days ago', '3 days ago', '2 days ago', 'Yesterday', 'Today'],
        'value': user_online_counts,
    }
    if request.user:
        profile_info['profile_status'] = profile_status
        profile_info['profile_hide'] = profile_hide
        context['profile_info'] = profile_info
    return HttpResponse(template.render(context, request))

#@login_required
# from A360EvaluateSystemManagement.models import A360EvaluateCampaign
@user_passes_test(lambda u: u.is_superuser)

def TNVDashboard(request, *args, **kwargs):

    context = AdminWebContext(request, page_info='Account:TNVDashboard', *args, **kwargs)
    template = loader.get_template(str('Account/%s/admin/dashboard-tnv.html' % context['website_template']))

    return HttpResponse(template.render(context, request))


@login_required
def Profile(request, *args, **kwargs):
    context = AdminWebContext(request, page_info='Account:Profile', *args, **kwargs)
    template = loader.get_template(str('Account/%s/admin/profile.html' % context['website_template']))
    profile_info = {}
    profile_status = None
    profile_hide = None
    if request.method == 'POST':
        all_data = request.POST
        for key, value in all_data.items():
            log_write(msg=(str('%s: %s' % (key, value))), request=request, func_name=_getframe().f_code.co_name)

        result_context = process_post(request)
        if result_context is not None:
            context.update(result_context)
        #current_user = Account.objects.get(username=(request.user))
        context['current_user'] = request.user
    else:
        pass
    if request.user:
        profile_info['profile_status'] = profile_status
        profile_info['profile_hide'] = profile_hide
        context['profile_info'] = profile_info
        try:
            context['all_website_templates'] = WebsiteTemplate.objects.all()
        except Exception as xx:
            print(str(xx))
            logger.error(str(xx))
        context['all_languages'] = settings.LANGUAGES
        context['all_timezones'] = settings.TIMEZONES
        if request.user.is_authenticated:
            profile_hide = False
            log_write(msg=(str('profile_hide = %s' % profile_hide)), request=request,
                      func_name=_getframe().f_code.co_name)
            current_user = Account.objects.filter(username=(request.user)).first()
            context['current_user'] = current_user
        else:
            profile_hide = True
            return HttpResponseRedirect('Account:Signin')

        if current_user is not None and current_user.avatar_base64 is None:
            request.user.avatar_base64 = AVA_BASE64
    return HttpResponse(template.render(context, request))


@login_required
def ProfileUserAdminManager(request, slug=None, *args, **kwargs):
    context = AdminWebContext(request, page_info='Account:Profile', *args, **kwargs)
    template = loader.get_template(str('Account/%s/admin/profile.html' % context['website_template']))
    profile_info = {}
    profile_status = None
    profile_hide = None
    if request.user.is_superuser:
        profile_hide = False
        log_write(msg=(str('profile_hide = %s' % profile_hide)), request=request,
                  func_name=_getframe().f_code.co_name)
        current_user = Account.objects.filter(Q(username=slug)).first()
        context['current_user'] = current_user
    else:
        profile_hide = True
        return HttpResponseRedirect('Account:Signin')
    if request.method == 'POST':
        all_data = request.POST
        for key, value in all_data.items():
            log_write(msg=(str('%s: %s' % (key, value))), request=request, func_name=_getframe().f_code.co_name)

        result_context = process_post(request, slug=slug)
        if result_context is not None:
            context.update(result_context)
    else:
        pass

    if request.user:
        try:
            from Payment.models import License
            context['licenses'] = License.objects.filter(dp_user_tndid=(request.user.tndid))
            context['his_licenses'] = License.objects.filter(dp_user_tndid=(request.user.tndid))
        except Exception as xx:
            try:
                print(str(xx))
            finally:
                xx = None
                del xx

        profile_info['profile_status'] = profile_status
        profile_info['profile_hide'] = profile_hide
        context['profile_info'] = profile_info
        context['all_languages'] = settings.LANGUAGES
        context['all_timezones'] = settings.TIMEZONES
        return HttpResponse(template.render(context, request))

@login_required
def LicenseView(request, *args, **kwargs):
    context = AdminWebContext(request, page_info='Account:License', *args, **kwargs)
    template = loader.get_template(str('Account/%s/admin/license.html' % context['website_template']))
    profile_info = {}
    profile_status = None
    profile_hide = None
    if request.user.is_authenticated:
        profile_hide = False
        log_write(msg=(str('profile_hide = %s' % profile_hide)), request=request,
                  func_name=_getframe().f_code.co_name)
        current_user = Account.objects.get(username=(request.user))
        context['current_user'] = current_user

    else:
        profile_hide = True
        return HttpResponseRedirect('Account:Signin')
    if request.method == 'POST':
        all_data = request.POST
        for key, value in all_data.items():
            log_write(msg=(str('%s: %s' % (key, value))), request=request, func_name=_getframe().f_code.co_name)

        process_post(request)
    else:
        pass

    if request.user:
        profile_info['profile_status'] = profile_status
        profile_info['profile_hide'] = profile_hide
        context['profile_info'] = profile_info
        return HttpResponse(template.render(context, request))


@login_required
def AddSite(request, *args, **kwargs):
    context = AdminWebContext(request, page_info='Account:AddSite', *args, **kwargs)
    template = loader.get_template(str('Account/%s/addsite.html' % context['website_template']))
    profile_info = {}
    profile_status = None
    profile_hide = None
    if request.method == 'POST':
        all_data = request.POST
        for key, value in all_data.items():
            log_write(msg=(str('%s: %s' % (key, value))), request=request, func_name=_getframe().f_code.co_name)

        process_post(request)
    elif request.user.is_authenticated:
        profile_hide = False
        log_write(msg=(str('profile_hide = %s' % profile_hide)), request=request,
                  func_name=_getframe().f_code.co_name)
        current_user = Account.objects.get(username=(request.user))
        context['current_user'] = current_user
    else:
        profile_hide = True
        return HttpResponseRedirect('Account:Signin')
    all_websites = current_user.website.all().filter().order_by('-updated_at')
    verified_websites = current_user.website.all().filter(verify_status=True).order_by('-updated_at')
    context['all_websites'] = all_websites
    context['verified_websites'] = verified_websites
    profile_info['profile_status'] = profile_status
    profile_info['profile_hide'] = profile_hide
    context['profile_info'] = profile_info
    return HttpResponse(template.render(context, request))
