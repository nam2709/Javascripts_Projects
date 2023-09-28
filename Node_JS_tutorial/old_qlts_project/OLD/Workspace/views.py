__author__ = 'root'

from sys import _getframe
import socket

from django.http import HttpResponse
from django.template import loader
from django.urls import resolve
# import pycountry
from django import template
from django.views.decorators.csrf import csrf_exempt
from django.utils.translation import activate
from django.utils.translation import gettext
# from country_list import available_languages
import pytz
from django.utils import timezone
from django.core.exceptions import PermissionDenied
from django.views.decorators.http import require_http_methods
from django.contrib.auth.decorators import user_passes_test
from django.contrib import messages
from cpuinfo import get_cpu_info
import psutil
# import redis
from datetime import timedelta
# from cached_property import cached_property_with_ttl
# from SystemManagement.models import MPSApplication
register = template.Library()

from Logger.admin import log_write

##############################
from .models import *

# from Alert.models import *
# from Message.models import *

# from OnlineUsers.models import *

from .tnd_tools import get_username_from_session
# from Tools.Txlog.tXlog import t_xlog

DEFAULT_CONTEXT = settings.WEBSITE_DEFAULT_CONTEXT
print('DEFAULT_CONTEXT = %s' % DEFAULT_CONTEXT)


# if "settings.WEBSITE_DEFAULT_CONTEXT" in globals():
#     DEFAULT_CONTEXT = settings.WEBSITE_DEFAULT_CONTEXT
# else:
#     DEFAULT_CONTEXT = 'default'
from django.utils.functional import cached_property
POSITION_ITEMS = []
WIDGET_ITEMS = []
FOOTER_ITEMS = []
try:
    POSITION_ITEMS = Position.objects.filter(Q(active=True)).order_by('order').values()
    WIDGET_ITEMS = Widget.objects.filter(Q(active=True)).order_by('order').values()
    FOOTER_ITEMS = FooterItem.objects.order_by('order').values()
except Exception as xx:
    print(str(xx))

# @cached_property_with_ttl(ttl=5)
# @cached_property
def AdminWebContext(request=None, page_info=None, *args, **kwargs):
    context = {}
    context['website_template'] = DEFAULT_CONTEXT
    if request is not None:
        if request.user.is_authenticated is False:
            pass
        else:
            try:
                context['website_template'] = request.user.get_website_template()
            except Exception as rx:
                print(str(f"[{t_xlog()}-Error] Exception: {str(rx)}"))
    print('DEFAULT_CONTEXT = %s' % context['website_template'])
    user_agent = None
    context['dj_messages'] = messages.get_messages(request)

    
    try:
        position_items = POSITION_ITEMS
        widget_items = WIDGET_ITEMS
        footer_items = FOOTER_ITEMS
        if request and request.user.is_authenticated:
            if len(SUPER_ALL_ADMIN_MENUGROUP) == 0:
                    update_adminmenugroup()
                    print('[SUPER_ALL_ADMIN_MENUGROUP] Update done....')
            if request.user.is_superuser:
               
                menu_groups = SUPER_ALL_ADMIN_MENUGROUP
                all_menu_items = SUPER_ALL_MENU_ITEMS
                main_menu_items = SUPER_MAINMENU_ITEMS
                all_apps = SUPER_ALLAPPS

            elif request.user.is_staff:
                menu_groups = STAFF_ALL_ADMIN_MENUGROUP
                all_menu_items = STAFF_ALL_MENU_ITEMS
                main_menu_items = STAFF_MAINMENU_ITEMS

                all_apps = STAFF_ALLAPPS
            else:
                menu_groups = NORMAL_ALL_ADMIN_MENUGROUP
                all_menu_items = NORMAL_ALL_MENU_ITEMS
                main_menu_items = NORMAL_MAINMENU_ITEMS

                all_apps = NORMAL_ALLAPPS
        else:
            menu_groups = GUEST_ALL_ADMIN_MENUGROUP
            all_menu_items = GUEST_ALL_MENU_ITEMS
            main_menu_items = GUEST_MAINMENU_ITEMS

            all_apps = GUEST_ALLAPPS
        try:
            if request:
                if request.user_agent:
                    user_agent = request.user_agent
        except Exception as xx:
            # print(str(xx))
            pass
        

        # crr_app_hr360 = MPSApplication.objects.filter(code='hr360').first()
        # context['crr_app'] = crr_app_hr360
        # # Let's assume that the visitor uses an iPhone...
        # request.user_agent.is_mobile # returns True
        # request.user_agent.is_tablet # returns False
        # request.user_agent.is_touch_capable # returns True
        # request.user_agent.is_pc # returns False
        # request.user_agent.is_bot # returns False
        #
        # # Accessing user agent's browser attributes
        # request.user_agent.browser  # returns Browser(family=u'Mobile Safari', version=(5, 1), version_string='5.1')
        # request.user_agent.browser.family  # returns 'Mobile Safari'
        # request.user_agent.browser.version  # returns (5, 1)
        # request.user_agent.browser.version_string   # returns '5.1'
        #
        # # Operating System properties
        # request.user_agent.os  # returns OperatingSystem(family=u'iOS', version=(5, 1), version_string='5.1')
        # request.user_agent.os.family  # returns 'iOS'
        # request.user_agent.os.version  # returns (5, 1)
        # request.user_agent.os.version_string  # returns '5.1'
        #
        # # Device properties
        # request.user_agent.device  # returns Device(family='iPhone')
        # request.user_agent.device.family  # returns 'iPhone'

        context['menu_groups'] = menu_groups
        context['main_menu_items'] = main_menu_items
        context['footer_items'] = footer_items
        context['all_menu_items'] = all_menu_items
        context['position_items'] = position_items
        context['widget_items'] = widget_items
        context['all_apps'] = all_apps
        context['user_agent'] = user_agent

        # Get site name in Database:
        # current_site = Site.objects.get_current()
        if request:
            try:
                context['session_key'] = request.session.session_key
                if request.user:
                    try:
                        context['session_username'] = get_username_from_session(context['session_key'])
                    except Exception as rx:
                        print(str(rx))
                        context['session_username'] = None
            except Exception as xx:
                print(str(xx))
                pass
                context['session_key'] = None
            app_name = resolve(request.path).app_name
            context['app_name'] = app_name

            current_site = request.META['HTTP_HOST']
            # log_write(msg=str('current_site = %s ' % current_site), request=request, func_name=_getframe().f_code.co_name)
            context['current_site'] = str(current_site).split(':')[0].capitalize()

            # log_write('session_key = %s' % request.session.session_key, app=resolve(request.path).app_name, owner=request.user)

        if page_info is not None:
            try:
                page_infos = ALL_PAGE_INFOS.filter(name=page_info).first()
                if page_infos is None:
                    try:

                        PageInfo.objects.create(name=page_info,
                                                title=page_info,
                                                meta_description=settings.DEFAULT_WEBSITE_METATAGS,
                                                header=settings.DEFAULT_WEBSITE_TITLE,
                                                desc=settings.DEFAULT_WEBSITE_METATAGS)
                    except Exception as rx:
                        log_write(msg=str(rx), request=request, func_name=_getframe().f_code.co_name)
            except Exception as xx:
                print(str(xx))
                page_infos = PageInfo.objects.filter(active=True, name='default').first()
        else:
            try:
                page_infos = PageInfo.objects.filter(active=True, name='default').first()
            except Exception as px:
                print(str(px))
        context['page_infos'] = page_infos

        # context['website_template'] = 'default'

        if request and request.user:
            if request.user.is_authenticated:
                try:
                    print('request.user.language = %s' % request.user.language)
                    activate(request.user.language)
                except Exception as ex:
                    print(str(ex))
                    pass

                try:
                    timezone.activate(pytz.timezone(request.user.timezone))
                except Exception as ex:
                    print(str(ex))
                    pass
                try:
                    all_alerts = AlertMessage.objects.filter(
                        send_to_users_tndid__contains=[request.user.tndid]).order_by('read')[:10]
                    unread_alerts = AlertMessage.objects.filter(send_to_users_tndid__contains=[request.user.tndid],
                                                                read=False)
                    context['alerts'] = all_alerts
                    context['unread_alerts'] = unread_alerts

                    all_messages = CustomerMessage.objects.filter(
                        send_to_users_tndid__contains=[request.user.tndid]).order_by('read')[:10]
                    unread_messages = CustomerMessage.objects.filter(send_to_users_tndid__contains=[request.user.tndid],
                                                                     read=False)
                    context['messages'] = all_messages
                    context['unread_messages'] = unread_messages
                except Exception as mx:
                    print(str(mx))
                    log_write(msg=str(mx), request=request, func_name=_getframe().f_code.co_name)

                try:
                    context['current_user'] = request.user
                    # log_write(msg=str(context['current_user']), request=request, func_name=_getframe().f_code.co_name)
                except Exception as mx:
                    log_write(msg=str(mx), request=request, func_name=_getframe().f_code.co_name)

        web_alerts = []
        context['web_alerts'] = web_alerts
    except Exception as xx:
        print('[AdminWebContext] ERROR: %s' % str(xx))
    return context


def response_error_handler(request, exception=None):
    return HttpResponse('Error handler content', status=403)


def permission_denied_view(request):
    raise PermissionDenied


STATIC_CONTEXT = AdminWebContext()


def testing(request, *args, **kwargs):
    try:
        context = AdminWebContext(request, page_info='Website:testing', *args, **kwargs)
        log_write(msg=str('context[website_template] = %s' % context['website_template']), request=request,
                  func_name=_getframe().f_code.co_name)
        print(str('Workspace/%s/front/index.html' % context['website_template']))
        template = loader.get_template(str('Workspace/material/front/index.html'))
        return HttpResponse(template.render(context, request))
    except Exception as xx:
        print('%s' % str(xx))
        log_write(msg=str(str(xx)), request=request, func_name=_getframe().f_code.co_name)


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


def Search(request, *args, **kwargs):
    context = AdminWebContext(request, page_info='Website:Search', *args, **kwargs)
    log_write(msg=str('context[website_template] = %s' % context['website_template']), request=request,
              func_name=_getframe().f_code.co_name)
    template = loader.get_template(str('Workspace/%s/admin/search.html' % context['website_template']))

    if request.method == 'POST':
        log_write(msg=str(request.POST), request=request, func_name=_getframe().f_code.co_name)
        post_data = request.POST
        action = post_data['action']
        log_write(msg=str('action = %s' % action), request=request, func_name=_getframe().f_code.co_name)
        if action == 'delete-email':
            email_id = post_data['email-id']
            log_write(msg=str('email_id = %s ' % email_id), request=request, func_name=_getframe().f_code.co_name)

            YandexEmail.objects.filter(id=email_id).delete()
    else:
        try:
            get_data = request.GET
            log_write(msg=str('get_data = %s' % get_data), request=request, func_name=_getframe().f_code.co_name)
            keyword = get_data['q']

            from browsers.models import BrowserProfile
            from browsers.models import Browser

            from browsers.models import ScreenShot

            browser_profiles = BrowserProfile.objects.filter(
                Q(id__contains=keyword) | Q(name__contains=keyword) | Q(uuid__contains=keyword) | Q(
                    desc__contains=keyword))
            context['browser_profiles'] = browser_profiles

            browsers = Browser.objects.filter(
                Q(id__contains=keyword) | Q(name__contains=keyword) | Q(uuid__contains=keyword) | Q(
                    desc__contains=keyword))
            context['browsers'] = browsers

            screenshots = ScreenShot.objects.filter(
                Q(id__contains=keyword) | Q(name__contains=keyword) | Q(uuid__contains=keyword))
            context['screenshots'] = screenshots

            from YandexEmail.models import AdminAccounts
            from YandexEmail.models import DomainName
            from YandexEmail.models import YandexEmail

            admin_accounts = AdminAccounts.objects.filter(
                Q(id__contains=keyword) | Q(name__contains=keyword) | Q(desc__contains=keyword))
            context['admin_accounts'] = admin_accounts

            yandex_accounts = YandexEmail.objects.filter(
                Q(id__contains=keyword) | Q(name__contains=keyword) | Q(desc__contains=keyword) | Q(
                    yandex_uid__contains=keyword) | Q(first_name__contains=keyword) | Q(last_name__contains=keyword))
            context['yandex_accounts'] = yandex_accounts

            domains = DomainName.objects.filter(
                Q(id__contains=keyword) | Q(name__contains=keyword) | Q(desc__contains=keyword))
            context['domains'] = domains


        except Exception as xx:
            log_write(msg=str(str(xx)), request=request, func_name=_getframe().f_code.co_name)
    result = HttpResponse(template.render(context, request))
    return result


# Load Favicon if exist
FAVICON = None
try:
    fav_obj = LogoImages.objects.filter(is_favicon=True).first()
    if fav_obj is not None:
        with open(fav_obj.file.path, 'rb') as f:
            FAVICON = f.read()
    print('Load favicon data done!')
except Exception as xx:
    print('Can not load favicon data, ERROR: %s' % str(xx))


def Favicon(request, *args, **kwargs):
    global FAVICON
    if FAVICON is None:
        data_uri = '''data:image/png;base64,
    iVBORw0KGgoAAAANSUhEUgAAABAAAAAQBAMAAADt3eJSAAAAMFBMVEU0OkArMjhobHEoPUPFEBIu
    O0L+AAC2FBZ2JyuNICOfGx7xAwTjCAlCNTvVDA1aLzQ3COjMAAAAVUlEQVQI12NgwAaCDSA0888G
    CItjn0szWGBJTVoGSCjWs8TleQCQYV95evdxkFT8Kpe0PLDi5WfKd4LUsN5zS1sKFolt8bwAZrCa
    GqNYJAgFDEpQAAAzmxafI4vZWwAAAABJRU5ErkJggg=='''
        image_data = data_uri.partition('base64,')[2]
        binary = base64.b64decode(image_data)
        return HttpResponse(binary, content_type="image/x-icon")
    else:
        return HttpResponse(FAVICON, content_type="image/x-icon")


# @permission_required('entity.can_delete', login_url='/admin/')
@csrf_exempt
@require_http_methods(["GET", "POST"])
def Index(request, *args, **kwargs):
    context = AdminWebContext(request, page_info='Website:Index', *args, **kwargs)
    template = loader.get_template(str('Workspace/%s/front/index.html' % context['website_template']))
    # template = loader.get_template(str('Workspace/material/login.html' % context['website_template']))

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
            print('[Website:Index] ERROR:' % str(xx))
            pass
    return HttpResponse(template.render(context, request))


def YandexVerification(request, *args, **kwargs):
    context = {
    }
    template = loader.get_template('Workspace/yandex.html')
    return HttpResponse(template.render(context, request))


def Robots(request, *args, **kwargs):
    # request.session['lang'] = 'vi'
    context = AdminWebContext(request, page_info='Website:Robots', *args, **kwargs)
    template = loader.get_template(str('Workspace/%s/front/robots.html' % context['website_template']))

    all_uas = BotUA.objects.filter(active=True)
    robots_args = RobotsArg.objects.filter(active=True)

    context['all_uas'] = all_uas
    context['robots_args'] = robots_args

    return HttpResponse(template.render(context, request))


def HtaccessView(request, *args, **kwargs):
    # request.session['lang'] = 'vi'
    context = AdminWebContext(request, page_info='Website:HtaccessView', *args, **kwargs)
    template = loader.get_template(str('Workspace/%s/front/htaccess.html' % context['website_template']))
    return HttpResponse(template.render(context, request))


def Locales(request, *args, **kwargs):
    for language in available_languages():
        print(language)
    # request.session['lang'] = 'vi'
    context = AdminWebContext(request, page_info='Website:Robots', *args, **kwargs)
    template = loader.get_template(str('Workspace/%s/front/locales.html' % context['website_template']))
    today = date.today()
    activate("vi")
    msg = gettext('Hello')
    context['msg'] = msg
    context['message'] = gettext("XYZ")
    # context['countries'] = list(pycountry.countries)
    # context['languages'] = list(pycountry.subdivisions)
    return HttpResponse(template.render(context, request))


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
