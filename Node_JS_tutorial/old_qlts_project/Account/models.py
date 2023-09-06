from uuid import uuid4 as UUID4
import os
from sys import _getframe

from django.db import models
from django.utils.timezone import now as djnow
from django.contrib.auth.models import BaseUserManager, AbstractUser
from django.contrib.auth.models import Group
from django.contrib.auth.models import Permission
from django.contrib.sessions.models import Session
from model_utils import FieldTracker
from netfields import CidrAddressField
import pytz
from django.utils.encoding import force_bytes
from django.utils.http import urlsafe_base64_encode
from django.template.loader import render_to_string
from django.core.mail import EmailMessage
from django.conf import settings
from django.conf.global_settings import AUTH_USER_MODEL

from django.db.models import Q
from django.utils.translation import gettext_lazy as _
import bcrypt
from .tokens import account_activation_token
from django.contrib.sites.models import Site
TIMEZONES = tuple(zip(pytz.all_timezones, pytz.all_timezones))
from Logger.admin import log_write
LANGUAGE_CODE = 'en-us'
LANGUAGES = (
    ('en', 'English'),
    ('vi', 'Vietnam'),
)
from uuid import uuid4 as UUID4
from uuid import uuid1 as UUID1
AVA_BASE64 = ""
try:
    with open('%s/Account/default_avatar.txt' % settings.BASE_DIR) as f:
        AVA_BASE64 = f.read().replace("\n", "")
        # print("AVA_BASE64 = %s" % AVA_BASE64)
except Exception as xx:
    print(str(xx))
def TNDID():
    tndid = str('t%s-n-%sd' %(UUID1(), UUID4()))
    return tndid

class MyUserManager(BaseUserManager):
    def create_user(self, username, email, date_of_birth=None, password=None, is_staff=None, is_superuser=None):
        """
        Creates and saves a User with the given email, date of
        birth and password.
        """
        if not email:
            raise ValueError('Users must have an email address')

        user = self.model(
            username=username,
            email=self.normalize_email(email),
            date_of_birth=date_of_birth,
            is_staff=is_staff,
            is_superuser=is_superuser,
        )

        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, username, email, password, date_of_birth=None):
        """
        Creates and saves a superuser with the given email, date of
        birth and password.
        """
        user = self.create_user(username, email=email,
                                password=password,
                                date_of_birth=date_of_birth,
                                is_staff=True,
                                is_superuser=True,
                                )
        user.is_admin = True
        user.save(using=self._db)
        return user


class WebsiteTemplate(models.Model):
    name = models.CharField(max_length=128,
                            null=True,
                            blank=True,
                            unique=False)
    uuid = models.UUIDField(default=UUID4,
                            max_length=64,
                            unique=False,
                            null=True,
                            editable=True)
    tndid = models.CharField(default=TNDID, max_length=128,
                             unique=True,
                             editable=True)
    updated_at = models.DateTimeField(default=djnow)
    created_at = models.DateTimeField(default=djnow, editable=False)

    def __str__(self):
        return self.name

    def fullname(self):
        module = self.__class__.__module__
        if module is None or (module == str.__class__.__module__):
            return self.__class__.__name__
        return module + '.' + self.__class__.__name__

    def save(self, *args, **kwargs):
        self.updated_at = djnow()
        (super(WebsiteTemplate, self).save)(*args, **kwargs)
        

class Account(AbstractUser):
    MIN_WITHDRAW = 1
    MAX_WITHDRAW = 50
    MIN_DEPOSIT = 5
    MAX_DEPOSIT = 20
    name = models.CharField(max_length=1024, blank=True, null=True)
    uuid = models.UUIDField(default=UUID4,
                            max_length=64,
                            unique=True,
                            null=True,
                            editable=True)
    tndid = models.CharField(default=TNDID, max_length=128,
                             unique=True,
                             editable=True)
    nick_name = models.CharField(max_length=1024, blank=True, null=True)
    full_name = models.CharField(max_length=1024, blank=True, null=True)
    email = models.CharField(max_length=1024, blank=True, null=True)
    date_of_birth = models.DateField(null=True,
                                     blank=True)
    age = models.IntegerField(blank=True, null=True)
    telephone = models.CharField(max_length=15, blank=True, null=True)
    salt = models.CharField(max_length=1024, blank=True, null=True)
    onetime_passwd = models.CharField(max_length=1024, blank=True, null=True)
    avatar = models.ImageField(upload_to='avatar-images/%Y/%m/%d/',
                               default='default/default-avatar.jpg',
                               max_length=4096,
                               null=True,
                               blank=True)
    is_callbot = models.BooleanField(default=False,
                                 null=False,
                                 blank=False)
    callbot_endpoint = models.CharField(max_length=2048,
                                        blank=True,
                                        null=True)
    is_chatbot = models.BooleanField(default=False,
                                 null=False,
                                 blank=False)
    chatbot_endpoint = models.CharField(max_length=2048,
                                        blank=True,
                                        null=True)
    # self.avatar.path
    avatar_base64 = AVA_BASE64
    manager = models.ForeignKey('self', on_delete=models.SET_DEFAULT, default=None, null=True, blank=True)
    log_confirm_by_email = models.BooleanField(default=True, null=False, blank=False)
    logged_with_password = models.BooleanField(default=True, null=False, blank=False)
    created_free_license = models.BooleanField(default=False, null=False, blank=False)
    email_activated = models.BooleanField(default=True, null=False, blank=False)
    website_template = models.ForeignKey(WebsiteTemplate,
                                         on_delete=models.SET_NULL,
                                         null=True,
                                         blank=True)
    language = models.CharField(max_length=10,
                                choices=LANGUAGES,
                                default=LANGUAGE_CODE)
    timezone = models.CharField(max_length=255,
                                choices=TIMEZONES,
                                default=settings.TIME_ZONE)
    signup_ipv4 = CidrAddressField(null=True, blank=True,
                                   default=None)
    signup_at = models.DateTimeField(default=djnow, editable=False)
    last_login_ipv4 = CidrAddressField(null=True, blank=True,
                                       default=None)
    last_login_at = models.DateTimeField(default=djnow, editable=False)
    updated_at = models.DateTimeField(default=djnow, editable=False)
    created_at = models.DateTimeField(default=djnow, editable=False)
    tracker = FieldTracker()

    def __str__(self):
        return self.username

    def __get__(self):
        if self.avatar is None or os.path.exists(self.avatar.path) is False:
            self.avatar = None

    def fullname(self):
        module = self.__class__.__module__
        if module is None or (module == str.__class__.__module__):
            return self.__class__.__name__
        return module + '.' + self.__class__.__name__


    def check_permission_view(self, view_name, *args, **kargs):
        if view_name in settings.ALLVIEWS[self.username]:
            return True
        else:
            return False
    objects = MyUserManager()

    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = ['email']

    def get_website_template(self):
        if self.website_template is not None:
            return self.website_template.name
        else:
            return 'arrgon'

    def get_full_name(self):
        # The user is identified by their email address
        return self.email

    def get_short_name(self):
        # The user is identified by their email address
        return self.email

    def has_perm(self, perm, obj=None):
        # "Does the user have a specific permission?"
        # Simplest possible answer: Yes, always
        return True

    def has_module_perms(self, app_label):
        # "Does the user have permissions to view the app `app_label`?"
        # Simplest possible answer: Yes, always
        return True

    def get_field(self, key):
        for obj in self.extend_field.all():
            if obj.key == key:
                return obj.value
        return None

    def remove_field(self, key):
        for obj in self.extend_field.all():
            if obj.key == key:
                return obj.value
        return None

    def save(self, *args, **kwargs):
        # self.salt = bcrypt.gensalt()
        # self.password = bcrypt.hashpw(self.password.encode('utf8'), self.salt).decode()
        self.updated_at = djnow()
        if self.name is None or self.name is "":
            self.name = self.username
        super(Account, self).save()

    def set_staff(self, *args, **kwargs):
        self.updated_at = djnow()
        self.is_staff = True
        (super(Account, self).save)(*args, **kwargs)

    def unset_staff(self, *args, **kwargs):
        self.updated_at = djnow()
        self.is_staff = False
        (super(Account, self).save)(*args, **kwargs)

        (super(Account, self).save)(*args, **kwargs)
    def withdraw(self,
            id=None,
            user=None,
            amount=None,
            withdrawn_by=None,
            comment=None,
            asof=None):
        print('Test withdraw...')
        return None

