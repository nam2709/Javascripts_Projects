
#!/usr/bin/env python
# -*- coding: utf-8 -*-
#region Description
__author__ = 'TruongNV - NGUYEN VAN TRUONG'
__copyright__ = "Copyright ©2022 TruongNV <truongg.nv@gmail.com>"
__maintainer__ = "TruongNV"
__email__ = "truongg.nv@gmail.com"
__status__ = "Production"
__date__ = 4 / 20 / 21
#endregion

#
#
# __init__.py

from django.urls import path

from . import views

app_name = 'Account'

#######################################
from .Trest_views import *
from Router.models import SharedAPIRootRouter

router = SharedAPIRootRouter().shared_router
router.register(r'account/account/all', AccountRestApiView, basename='AccountRestApiView')
router.register(r'account/account/large/all', AccountRestLargePaginationApiView, basename='AccountRestLargePaginationApiView')
router.register(r'account/account/list', AccountListRestApiView, basename='AccountListRestApiView')
router.register(r'account/account/detete', AccountDeleteRestApiView, basename='AccountDeleteRestApiView')
router.register(r'account/account/update', AccountUpdateRestApiView, basename='AccountUpdateRestApiView')
router.register(r'account/account/remove-file', AccountRemoveFileRestApiView, basename='AccountRemoveFileRestApiView')