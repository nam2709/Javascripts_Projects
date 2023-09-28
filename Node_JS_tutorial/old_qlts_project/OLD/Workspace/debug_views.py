__author__ = 'root'

from sys import _getframe
import socket

from django.http import HttpResponse
from django.template import loader
from django.urls import resolve
import pycountry
from django import template
from django.views.decorators.csrf import csrf_exempt
from django.utils.translation import activate
from django.utils.translation import gettext
from country_list import available_languages
import pytz
from django.utils import timezone
from django.core.exceptions import PermissionDenied
from django.views.decorators.http import require_http_methods
from django.contrib.auth.decorators import user_passes_test
from django.contrib import messages
from cpuinfo import get_cpu_info
import psutil
import redis
from datetime import timedelta

register = template.Library()

from Logger.admin import log_write

##############################
from .models import *

from Alert.models import *
from Message.models import *

from OnlineUsers.models import *

from .tnd_tools import get_username_from_session

DEFAULT_CONTEXT = settings.WEBSITE_DEFAULT_CONTEXT
print('DEFAULT_CONTEXT = %s' % DEFAULT_CONTEXT)

from .views import AdminWebContext

@user_passes_test(lambda u: u.is_superuser)
# @user_passes_test(lambda u: u.is_staff)
def SuperUserTools(request, *args, **kwargs):
    # request.method
    # request.data
    # request.POST & request.GET
    # request.FILES
    # r
    try:
        context = AdminWebContext(request, page_info='Website:SuperUserTools', *args, **kwargs)
        log_write(msg=str('context[website_template] = %s' % context['website_template']), request=request,
                  func_name=_getframe().f_code.co_name)

        template = loader.get_template(str('Workspace/%s/admin/super-user-tools.html' % context['website_template']))
        if request.method == 'POST':
            data = request.POST
            print('data = %s' % data)
            token = data['csrfmiddlewaretoken']
            print('token = %s' % token)
            action = data['action']
            print('action = %s' % action)
            alert_msg = {}
            alert_msg['level'] = 'INFO'
            if action == 'update-all-apps-list':
                from .admin import gen_all_app_name
                try:
                    gen_all_app_name()

                    alert_msg['message'] = 'gen_all_app_name() success!'
                    context['web_alerts'].append('Gen gen_all_app_name list success!')
                except Exception as xx:
                    alert_msg['level'] = 'ERROR'
                    alert_msg['message'] = str('Error: %s' % str(xx))

            elif action == 'clean-all-apps-list':
                from .admin import clean_all_app_name
                try:
                    clean_all_app_name()
                    alert_msg['message'] = 'clean_all_app_name() success!'
                except Exception as xx:
                    alert_msg['level'] = 'ERROR'
                    alert_msg['message'] = str('Error: %s' % str(xx))
            elif action == 'update-all-views-list':
                from .admin import update_all_view
                try:
                    update_all_view()
                    alert_msg['message'] = 'update_all_view() success!'
                except Exception as xx:
                    alert_msg['level'] = 'ERROR'
                    alert_msg['message'] = str('Error: %s' % str(xx))
            elif action == 'clean-all-views-list':
                from .admin import clean_all_view
                try:
                    clean_all_view()
                    alert_msg['message'] = 'clean_all_view() success!'
                    print('Clean all view done!')
                except Exception as xx:
                    alert_msg['level'] = 'ERROR'
                    alert_msg['message'] = str('Error: %s' % str(xx))
            elif action == 'clean-expired-user':
                from accounts.models import clean_expired_users
                try:
                    clean_expired_users()
                    alert_msg['message'] = 'clean_expired_users() success!'
                    print('Clean Expired Users done!')
                except Exception as xx:
                    alert_msg['level'] = 'ERROR'
                    alert_msg['message'] = str('Error: %s' % str(xx))
            context['web_alerts'].append(alert_msg)

        return HttpResponse(template.render(context, request))
    except Exception as xx:
        log_write(msg=str(str(xx)), request=request, func_name=_getframe().f_code.co_name)

@user_passes_test(lambda u: u.is_superuser)
def SystemSetting(request, *args, **kwargs):
    context = AdminWebContext(request, page_info='Website:SystemSetting', *args, **kwargs)
    template = loader.get_template(str('Workspace/%s/admin/system-setting.html' % context['website_template']))
    print(request.method)
    if request.method == "POST":
        try:
            signup_email = request.POST['email']
            print('signup_email = %s' % signup_email)
            context['signup_email'] = signup_email
            from Account.views import Signup
            request.method = "GET"
            return Signup(request, context)
        except Exception as xx:
            print('[Website:SystemSetting] ERROR:' % str(xx))
            pass
    return HttpResponse(template.render(context, request))


@user_passes_test(lambda u: u.is_superuser)
def SystemInfoView(request, *args, **kwargs):
    context = AdminWebContext(request, page_info='Website:SystemInfoView', *args, **kwargs)
    template = loader.get_template(str('Workspace/%s/admin/debug/system-info.html' % context['website_template']))
    print(request.method)
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
    # users = (user for user in user_activity_objects)
    # context['users'] = users

    return HttpResponse(template.render(context, request))


@user_passes_test(lambda u: u.is_superuser)
def RedisView(request, *args, **kwargs):
    context = AdminWebContext(request, page_info='Website:RedisView', *args, **kwargs)
    log_write(msg=str('context[website_template] = %s' % context['website_template']), request=request,
              func_name=_getframe().f_code.co_name)
    res_keys = []
    for i in range(0, 16):
        r = redis.Redis(settings.REDIS_CACHE_HOST,
                        port=settings.REDIS_CACHE_PORT,
                        # db=settings.REDIS_CACHE_DB_NO,
                        db=i,
                        password=settings.REDIS_CACHE_PASSWORD)
        print(request.method)
        if request.method == "POST":
            data = request.POST
            action = data['action']
            print('action = %s' % action)
            if action == 'clear-cache-session':
                for key in r.scan_iter("sessions.cache:*"):
                    r.delete(key)
            elif action == 'clear-cache-header':
                for key in r.scan_iter("cache_header:*"):
                    r.delete(key)
            elif action == 'clear-cache-page':
                for key in r.scan_iter("cache_page:*"):
                    r.delete(key)
            elif action == 'clear-cache-all':
                for key in r.scan_iter("*"):
                    r.delete(key)
        for key in r.scan_iter("*"):
            res_keys.append(str(key))
    context['all_keys'] = res_keys
    del r
    template = loader.get_template(str('Workspace/%s/admin/debug/redis_view.html' % context['website_template']))
    result = HttpResponse(template.render(context, request))
    return result


@user_passes_test(lambda u: u.is_superuser)
def RedisDetailView(request, slug=None, *args, **kwargs):
    context = AdminWebContext(request, page_info='Website:RedisView', *args, **kwargs)
    log_write(msg=str('context[website_template] = %s' % context['website_template']), request=request,
              func_name=_getframe().f_code.co_name)
    res_keys = []
    DB_NO = settings.REDIS_CACHE_DB_NO
    if slug is not None:
        try:
            DB_NO = int(slug)
        except Exception as xx:
            log_write(msg=str(xx), request=request, func_name=_getframe().f_code.co_name)

    r = redis.Redis(settings.REDIS_CACHE_HOST,
                    port=settings.REDIS_CACHE_PORT,
                    db=DB_NO,
                    password=settings.REDIS_CACHE_PASSWORD)
    print(request.method)
    if request.method == "POST":
        data = request.POST
        action = data['action']
        print('action = %s' % action)
        if action == 'clear-cache-session':
            for key in r.scan_iter("sessions.cache:*"):
                r.delete(key)
        elif action == 'clear-cache-header':
            for key in r.scan_iter("cache_header:*"):
                r.delete(key)
        elif action == 'clear-cache-page':
            for key in r.scan_iter("cache_page:*"):
                r.delete(key)
        elif action == 'clear-cache-all':
            for key in r.scan_iter("*"):
                r.delete(key)
    for key in r.scan_iter("*"):
        res_keys.append(key)
    context['all_keys'] = res_keys
    del r
    template = loader.get_template(str('Workspace/%s/admin/debug/redis_view.html' % context['website_template']))
    result = HttpResponse(template.render(context, request))
    return result
