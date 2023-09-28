#!/usr/bin/env python
# -*- coding: utf-8 -*-
#region Description
__author__ = 'Tamnd - NGUYEN DUC TAM'
__copyright__ = "Copyright ©2021 Tamnd <ductambka@gmail.com>"
__maintainer__ = "Tamnd"
__email__ = "ductambka@gmail.com"
__status__ = "Production"
__date__ = 6 / 19 / 21
#endregion

#
#
# __init__.py

import sys
import os
import time
import datetime
from django.contrib import admin
from django.contrib.auth import get_permission_codename
from django.utils.translation import gettext_lazy as _

def make_inactive(self, request, queryset):
    for obj in queryset:
        obj.is_active = False
        obj.save()
make_inactive.short_description = _('Make InActive')
make_inactive.allow_tags = True

def make_instaff(self, request, queryset):
    for obj in queryset:
        obj.is_staff = False
        obj.save()
make_instaff.short_description = _('Make InStaff')
make_instaff.allow_tags = True

def make_insuperuser(self, request, queryset):
    for obj in queryset:
        obj.is_superuser = False
        obj.save()
make_insuperuser.short_description = _('Make InSuperuser')
make_insuperuser.allow_tags = True

def make_active(self, request, queryset):
    for obj in queryset:
        obj.is_active = True
        obj.save()

make_active.short_description = _('Make Active')
make_active.allow_tags = True

def make_is_staff(self, request, queryset):
    for obj in queryset:
        obj.is_staff = True
        obj.save()
make_is_staff.short_description = _('Make Is Staff')
make_is_staff.allow_tags = True

def make_is_superuser(self, request, queryset):
    for obj in queryset:
        obj.is_superuser = True
        obj.save()
make_is_superuser.short_description = _('Make Is Superuser')
make_is_superuser.allow_tags = True

def reset_password(self, request, queryset):
    for obj in queryset:
        obj.reset_password(request)

reset_password.short_description = _('Reset Password')
reset_password.allow_tags = True






# End of TFile



