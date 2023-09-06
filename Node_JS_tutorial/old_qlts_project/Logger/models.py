from django.db import models
from uuid import uuid4 as UUID4

from django.utils.timezone import now as djnow

from netfields import CidrAddressField


#@architect.install('partition', type='range', subtype='string_lastchars', constraint='5', column='columnname')
#@architect.install('partition', type='range', subtype='string_firstchars', constraint='5', column='columnname')
# @architect.install('partition', type='range', subtype='date', constraint='month', column='created_at')
class Log(models.Model):
    name = models.CharField(max_length=2048,
                            null=True,
                            blank=True,
                            unique=False)
    level = models.CharField(max_length=20, unique=False, default="INFO")
    #owner = models.ForeignKey(DatapeenUser, on_delete=models.SET_NULL, default=None, null=True, blank=True)
    owner_tndid = models.CharField(default=None,
                             max_length=128,
                             null=True,
                             blank=True,
                             editable=True)
    ipv4 = CidrAddressField(null=True,
                            blank=True,
                            default=None)
    app_name = models.CharField(max_length=64, unique=False, default=None, null=True, blank=True)
    class_name = models.CharField(max_length=64, unique=False, default=None, null=True, blank=True)
    func_name = models.CharField(max_length=64, unique=False, default=None, null=True, blank=True)
    session_id = models.CharField(max_length=64, unique=False, default=None, null=True, blank=True)
    updated_at = models.DateTimeField(default=djnow)
    created_at = models.DateTimeField(default=djnow, editable=False)
    def owner(self, user=None):
        from Account.models import Account
        if user is None:
            user_obj = Account.objects.filter(tndid=self.owner_tndid).first()
        else:
            user_obj = user
            self.owner_tndid = user_obj.tndid
        return user_obj
    def __str__(self):
        return self.name
    def fullname(self):
        module = self.__class__.__module__
        if module is None or module == str.__class__.__module__:
            return self.__class__.__name__  # Avoid reporting __builtin__
        else:
            return module + '.' + self.__class__.__name__
    def save(self, *args, **kwargs):
        self.updated_at = djnow()
        super(Log, self).save()

class LogMsg(object):
    def __init__(self, *args):
        self.msg = None
        self.level = None
        self.owner = None
        self.app = None
        self.class_name = None
        self.session_id = None
        self.func_name = None
        self.request = None
        if args[0]:
            self.msg = None
        if args[1]:
            self.level = None
        if args[2]:
            self.owner = None
        if args[3]:
            self.app = None
        if args[4]:
            self.class_name = None
        if args[5]:
            self.session_id = None
        if args[6]:
            self.func_name = None
        if args[7]:
            self.request = None
    def __repr__(self):
        return str("\n%s:[%s]: [%s][%s][%s][%s] %s (%s)" % (str(djnow()), self.level, self.class_name, self.app, self.func_name, self.owner, self.session_id, self.msg))
