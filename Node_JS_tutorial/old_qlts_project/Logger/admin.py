import os
import threading
from datetime import datetime

from dateutil.relativedelta import relativedelta
from django.urls import resolve
from ipware import get_client_ip
from django.contrib import admin
from django.utils.timezone import now as djnow
from django.conf import settings

from .models import Log
from .models import LogMsg

DEBUG = settings.DEBUG
LOGFILE_PATH = settings.LOGFILE_PATH
LOG_LIST = []


# Register your models here.
class LogAdmin2(admin.ModelAdmin):
    list_display = ('created_at',
                    'app_name',
                    'level',
                    'name',
                    'class_name',
                    'func_name',
                    'ipv4',
                    'session_id',
                    'updated_at')

try:
    admin.site.register(Log, LogAdmin2)
except Exception as ex:
    print(str(ex))

class LogMessage():
    def __init__(self, *args, **kwargs):
        self.msg = kwargs['msg']
        self.level = kwargs['level']
        self.owner = kwargs['owner']
        self.app = kwargs['app']
        self.class_name = kwargs['class_name']
        self.session_id = kwargs['session_id']
        self.func_name = kwargs['func_name']
        self.request = kwargs['request']
    def target_db(self):
        pass
def log_target(*args, **kwargs):
    msg = kwargs['msg'] if "msg" in kwargs else None
    level = kwargs['level'] if "level" in kwargs else None
    owner = kwargs['owner'] if "owner" in kwargs else None
    app = kwargs['app'] if "app" in kwargs else None
    class_name = kwargs['class_name'] if "class_name" in kwargs else None
    session_id = kwargs['session_id'] if "session_id" in kwargs else None
    func_name = kwargs['func_name'] if "msg" in kwargs else None
    request = kwargs['request'] if "request" in kwargs else None
    ipv4 = kwargs['ipv4'] if "ipv4" in kwargs else None

    if msg and len(msg) > 2048:
        msg = msg[:2048]
    if request is not None:
        owner = None
        if request.user:
            # print('request.user = %s ' % request.user)
            if str(request.user) == "AnonymousUser":
                pass
            else:
                try:
                    owner = request.user.tndid
                    # print('owner = %s' % owner)
                except Exception as xx:
                    # print(str(xx))
                    pass
        app = resolve(request.path).app_name
        session_id = request.session.session_key
        ip, is_routable = get_client_ip(request)
        if ip is None:
            # Unable to get the client's IP address
            ipv4 = None
        else:
            # We got the client's IP address
            if is_routable:
                # The client's IP address is publicly routable on the Internet
                ipv4 = ip
            else:
                # The client's IP address is private
                ipv4 = ip
    if DEBUG is True:
        try:
            if level:
                Log.objects.create(name=msg,
                                   level=level,
                                   owner_tndid=owner,
                                   app_name=app,
                                   class_name=class_name,
                                   session_id=session_id,
                                   func_name=func_name,
                                   ipv4=ipv4)
            else:
                Log.objects.create(name=msg,
                                   owner_tndid=owner,
                                   app_name=app,
                                   session_id=session_id,
                                   class_name=class_name,
                                   func_name=func_name,
                                   ipv4=ipv4)
                # print('Save Log Done!')
        except Exception as lx:
            print(str('Failed to save log --> %s: %s' % (djnow(), str(lx))))
    else:
        if not level:
            level = None
        log_msg = LogMsg(msg, level, owner, app, class_name, session_id, func_name, ipv4)
        with open(LOGFILE_PATH, 'w+') as f:
            f.write(str(log_msg))

def log_target_file(*args, **kwargs):
    try:
        full_msg = str('[%s][LEVEL=%s][OWNER=%s][APP=%s][CLASS=%s][FUNC=%s][SESS=%s][msg=%s]' % (
        str(datetime.now()),
        kwargs['level'],
        kwargs['owner'],
        kwargs['app'],
        kwargs['class_name'],
        kwargs['func_name'],
        kwargs['session_id'],
        kwargs['msg']))
        os.system(str('echo "%s" >> %s' % (full_msg, settings.LOGGER_FILEPATH)))
    except Exception as ex:
        print(str(ex))
# Log Message QUEUE
LOG_MSG_QUEUE = []
def monitor_log_queue():
    while True:
        while len(LOG_MSG_QUEUE) > 0:
            msg = LOG_MSG_QUEUE.pop(0)
            if settings.ENABLE_LOGGER_DB is True:
                log_target(**msg)
            elif settings.ENABLE_LOGGER_DB is False:
                log_target_file(**msg)
        time.sleep(1)

# Log Message THREAD
LOG_THREAD = threading.Thread(target=log_target)
LOG_THREAD.start()

def log_write(msg=None, level='INFO', owner=None, app=None, class_name=None, session_id=None, func_name=None,
              request=None):
    if owner is None and request is not None:
        owner = request.user
    log_msg = {
        'name': msg,
        'level': level,
        'owner_tndid': owner,
        'app_name': app,
        'class_name': class_name,
        'session_id': session_id,
        'func_name': func_name,
        'request': request,
    }
    LOG_MSG_QUEUE.append(log_msg)

def clear_log():
    try:
        time_meta = djnow() - relativedelta(minutes=1)
        Log.objects.filter(created_at__le=time_meta).delete()
    except Exception as xx:
        log_write(msg=str(xx))


def log_filter(app=None, owner=None, func=None, classname=None, level=None, message=None):
    all_of_logs = None
    if app is None:
        if owner is None:
            if func is None:
                if classname is None:
                    if level is None:
                        if message is None:
                            all_of_logs = Log.objects.all().order_by("-created_at")
                        else:
                            all_of_logs = Log.objects.filter(name=message).order_by("-created_at")
                    else:
                        if message is None:
                            all_of_logs = Log.objects.filter(level=level).order_by("-created_at")
                        else:
                            all_of_logs = Log.objects.filter(level=level, name=message).order_by("-created_at")
                else:
                    if level is None:
                        if message is None:
                            all_of_logs = Log.objects.filter(class_name=classname).order_by("-created_at")
                        else:
                            all_of_logs = Log.objects.filter(class_name=classname, name=message).order_by("-created_at")
                    else:
                        if message is None:
                            all_of_logs = Log.objects.filter(class_name=classname, level=level).order_by("-created_at")
                        else:
                            all_of_logs = Log.objects.filter(class_name=classname, level=level, name=message).order_by(
                                "-created_at")
            else:
                if classname is None:
                    if level is None:
                        if message is None:
                            all_of_logs = Log.objects.filter(func_name=func).order_by("-created_at")
                        else:
                            all_of_logs = Log.objects.filter(func_name=func, name=message).order_by("-created_at")
                    else:
                        if message is None:
                            all_of_logs = Log.objects.filter(func_name=func, level=level).order_by("-created_at")
                        else:
                            all_of_logs = Log.objects.filter(func_name=func, level=level, name=message).order_by(
                                "-created_at")
                else:
                    if level is None:
                        if message is None:
                            all_of_logs = Log.objects.filter(func_name=func, class_name=classname).order_by(
                                "-created_at")
                        else:
                            all_of_logs = Log.objects.filter(func_name=func, class_name=classname,
                                                             name=message).order_by("-created_at")
                    else:
                        if message is None:
                            all_of_logs = Log.objects.filter(func_name=func, class_name=classname,
                                                             level=level).order_by("-created_at")
                        else:
                            all_of_logs = Log.objects.filter(func_name=func, class_name=classname, level=level,
                                                             name=message).order_by("-created_at")
        else:
            owner_obj = None
            if owner_obj is None:
                return None
            if func is None:
                if classname is None:
                    if level is None:
                        if message is None:
                            all_of_logs = Log.objects.filter(owner_tndid=owner_obj.tndid).order_by("-created_at")
                        else:
                            all_of_logs = Log.objects.filter(owner_tndid=owner_obj.tndid, name=message).order_by(
                                "-created_at")
                    else:
                        if message is None:
                            all_of_logs = Log.objects.filter(owner_tndid=owner_obj.tndid, level=level).order_by(
                                "-created_at")
                        else:
                            all_of_logs = Log.objects.filter(owner_tndid=owner_obj.tndid, level=level,
                                                             name=message).order_by("-created_at")
                else:
                    if level is None:
                        if message is None:
                            all_of_logs = Log.objects.filter(owner_tndid=owner_obj.tndid,
                                                             class_name=classname).order_by("-created_at")
                        else:
                            all_of_logs = Log.objects.filter(owner_tndid=owner_obj.tndid, class_name=classname,
                                                             name=message).order_by("-created_at")
                    else:
                        if message is None:
                            all_of_logs = Log.objects.filter(owner_tndid=owner_obj.tndid, class_name=classname,
                                                             level=level).order_by("-created_at")
                        else:
                            all_of_logs = Log.objects.filter(owner_tndid=owner_obj.tndid, class_name=classname,
                                                             level=level, name=message).order_by("-created_at")
            else:
                if classname is None:
                    if level is None:
                        if message is None:
                            all_of_logs = Log.objects.filter(owner_tndid=owner_obj.tndid, func_name=func).order_by(
                                "-created_at")
                        else:
                            all_of_logs = Log.objects.filter(owner_tndid=owner_obj.tndid, func_name=func,
                                                             name=message).order_by("-created_at")
                    else:
                        if message is None:
                            all_of_logs = Log.objects.filter(owner_tndid=owner_obj.tndid, func_name=func,
                                                             level=level).order_by("-created_at")
                        else:
                            all_of_logs = Log.objects.filter(owner_tndid=owner_obj.tndid, func_name=func, level=level,
                                                             name=message).order_by("-created_at")
                else:
                    if level is None:
                        if message is None:
                            all_of_logs = Log.objects.filter(owner_tndid=owner_obj.tndid, func_name=func,
                                                             class_name=classname).order_by("-created_at")
                        else:
                            all_of_logs = Log.objects.filter(owner_tndid=owner_obj.tndid, func_name=func,
                                                             class_name=classname, name=message).order_by("-created_at")
                    else:
                        if message is None:
                            all_of_logs = Log.objects.filter(owner_tndid=owner_obj.tndid, func_name=func,
                                                             class_name=classname, level=level).order_by("-created_at")
                        else:
                            all_of_logs = Log.objects.filter(owner_tndid=owner_obj.tndid, func_name=func,
                                                             class_name=classname, level=level, name=message).order_by(
                                "-created_at")
    else:
        if owner is None:
            if func is None:
                if classname is None:
                    if level is None:
                        if message is None:
                            all_of_logs = Log.objects.filter(app_name=app).order_by("-created_at")
                        else:
                            all_of_logs = Log.objects.filter(app_name=app, name=message).order_by("-created_at")
                    else:
                        if message is None:
                            all_of_logs = Log.objects.filter(app_name=app, level=level).order_by("-created_at")
                        else:
                            all_of_logs = Log.objects.filter(app_name=app, level=level, name=message).order_by(
                                "-created_at")
                else:
                    if level is None:
                        if message is None:
                            all_of_logs = Log.objects.filter(app_name=app, class_name=classname).order_by("-created_at")
                        else:
                            all_of_logs = Log.objects.filter(app_name=app, class_name=classname, name=message).order_by(
                                "-created_at")
                    else:
                        if message is None:
                            all_of_logs = Log.objects.filter(app_name=app, class_name=classname, level=level).order_by(
                                "-created_at")
                        else:
                            all_of_logs = Log.objects.filter(app_name=app, class_name=classname, level=level,
                                                             name=message).order_by("-created_at")
            else:
                if classname is None:
                    if level is None:
                        if message is None:
                            all_of_logs = Log.objects.filter(app_name=app, func_name=func).order_by("-created_at")
                        else:
                            all_of_logs = Log.objects.filter(app_name=app, func_name=func, name=message).order_by(
                                "-created_at")
                    else:
                        if message is None:
                            all_of_logs = Log.objects.filter(app_name=app, func_name=func, level=level).order_by(
                                "-created_at")
                        else:
                            all_of_logs = Log.objects.filter(app_name=app, func_name=func, level=level,
                                                             name=message).order_by("-created_at")
                else:
                    if level is None:
                        if message is None:
                            all_of_logs = Log.objects.filter(app_name=app, func_name=func,
                                                             class_name=classname).order_by("-created_at")
                        else:
                            all_of_logs = Log.objects.filter(app_name=app, func_name=func, class_name=classname,
                                                             name=message).order_by("-created_at")
                    else:
                        if message is None:
                            all_of_logs = Log.objects.filter(app_name=app, func_name=func, class_name=classname,
                                                             level=level).order_by("-created_at")
                        else:
                            all_of_logs = Log.objects.filter(app_name=app, func_name=func, class_name=classname,
                                                             level=level, name=message).order_by("-created_at")
        else:
            owner_obj = None
            if owner_obj is None:
                return None
            if func is None:
                if classname is None:
                    if level is None:
                        if message is None:
                            all_of_logs = Log.objects.filter(app_name=app, owner_tndid=owner_obj.tndid).order_by(
                                "-created_at")
                        else:
                            all_of_logs = Log.objects.filter(app_name=app, owner_tndid=owner_obj.tndid,
                                                             name=message).order_by("-created_at")
                    else:
                        if message is None:
                            all_of_logs = Log.objects.filter(app_name=app, owner_tndid=owner_obj.tndid,
                                                             level=level).order_by("-created_at")
                        else:
                            all_of_logs = Log.objects.filter(app_name=app, owner_tndid=owner_obj.tndid, level=level,
                                                             name=message).order_by("-created_at")
                else:
                    if level is None:
                        if message is None:
                            all_of_logs = Log.objects.filter(app_name=app, owner_tndid=owner_obj.tndid,
                                                             class_name=classname).order_by("-created_at")
                        else:
                            all_of_logs = Log.objects.filter(app_name=app, owner_tndid=owner_obj.tndid,
                                                             class_name=classname, name=message).order_by("-created_at")
                    else:
                        if message is None:
                            all_of_logs = Log.objects.filter(app_name=app, owner_tndid=owner_obj.tndid,
                                                             class_name=classname, level=level).order_by("-created_at")
                        else:
                            all_of_logs = Log.objects.filter(app_name=app, owner_tndid=owner_obj.tndid,
                                                             class_name=classname, level=level, name=message).order_by(
                                "-created_at")
            else:
                if classname is None:
                    if level is None:
                        if message is None:
                            all_of_logs = Log.objects.filter(app_name=app, owner_tndid=owner_obj.tndid,
                                                             func_name=func).order_by("-created_at")
                        else:
                            all_of_logs = Log.objects.filter(app_name=app, owner_tndid=owner_obj.tndid, func_name=func,
                                                             name=message).order_by("-created_at")
                    else:
                        if message is None:
                            all_of_logs = Log.objects.filter(app_name=app, owner_tndid=owner_obj.tndid, func_name=func,
                                                             level=level).order_by("-created_at")
                        else:
                            all_of_logs = Log.objects.filter(app_name=app, owner_tndid=owner_obj.tndid, func_name=func,
                                                             level=level, name=message).order_by("-created_at")
                else:
                    if level is None:
                        if message is None:
                            all_of_logs = Log.objects.filter(app_name=app, owner_tndid=owner_obj.tndid, func_name=func,
                                                             class_name=classname).order_by("-created_at")
                        else:
                            all_of_logs = Log.objects.filter(app_name=app, owner_tndid=owner_obj.tndid, func_name=func,
                                                             class_name=classname, name=message).order_by("-created_at")
                    else:
                        if message is None:
                            all_of_logs = Log.objects.filter(app_name=app, owner_tndid=owner_obj.tndid, func_name=func,
                                                             class_name=classname, level=level).order_by("-created_at")
                        else:
                            all_of_logs = Log.objects.filter(app_name=app, owner_tndid=owner_obj.tndid, func_name=func,
                                                             class_name=classname, level=level, name=message).order_by(
                                "-created_at")
    return all_of_logs


def get_logs(request, app=None, owner=None, func=None, classname=None, level=None, message=None):
    if settings.ENABLE_LOGGER_DB and settings.ENABLE_LOGGER_DB is True:
        if request.user.is_superuser:
            all_of_logs = log_filter(app=app, owner=owner, func=func, classname=classname, level=level, message=message)
        elif request.user.is_staff:
            all_managed_users = None
            all_of_logs = log_filter(app=app, owner=owner, func=func, classname=classname, level=level,
                                     message=message).filter(owner__in=all_managed_users).order_by("-created_at")
        elif request.user.is_authenticated:
            all_of_logs = log_filter(app=app, owner=request.user, func=func, classname=classname, level=level,
                                     message=message).filter(owner_tndid=request.user.tndid).order_by("-created_at")
        else:
            all_of_logs = None
    elif settings.ENABLE_LOGGER_DB is False:
        all_of_logs = LOG_LIST
        print(all_of_logs)
    return all_of_logs
