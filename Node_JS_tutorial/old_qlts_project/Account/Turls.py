
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

from django.urls import path , include

from . import Tviews
from . import Trest_views
from .Tapi_routers import *

app_name = 'Account'

#######################################
from .Trest_views import *
from .Tapi_routers import *
#######################################
urlpatterns = [
    path('', Tviews.Index, name='Index'),
        
    path('Account/', Tviews.AccountView, name='AccountView'),
    path('Account/create/', Tviews.Account_CreateView, name='Account_CreateView'),
    path('Account/detail/<slug>/', Tviews.Account_DetailView, name='Account_DetailView'),
    path('Account/edit/<slug>/', Tviews.Account_EditView, name='Account_EditView'),
    path('Account/search/', Trest_views.AccountSearchRestApiView.as_view(), name='AccountSearchRestApiView'),
    path('Account/filter/', Trest_views.AccountFilterRestApiView.as_view(), name='AccountFilterRestApiView'),
    
    path('Account/large/filter/', Trest_views.AccountFilterLargeRestApiView.as_view(), name='AccountFilterLargeRestApiView'),



    path('Account/medium/filter/', Trest_views.AccountFilterMediumRestApiView.as_view(), name='AccountFilterMediumRestApiView'),
   



]
