#!/usr/bin/env python
# -*- coding: utf-8 -*-

#
#
# __init__.py
__author__ = 'TND - NGUYEN DUC TAM'
from django.urls import path, include

from .views import *
# from .api import *
# from . import rest_views
app_name = 'Account'

#######################################
# from .Trest_views import *
# from .fixed_views import *
# from .Tapi_routers import *
#
# from . import mgmt_views

# from Router.models import SharedAPIRootRouter

urlpatterns = [
    # path('', Home),
    path('signup/', Signup, name='Signup'),
    # # url('^activate/(?P<uidb64>[0-9A-Za-z_\\-]+)/(?P<token>[0-9A-Za-z]{1,13}-[0-9A-Za-z]{1,20})/$', ActivateListener, name='ActivateListener'),
    # # url('^activate/(?P<uidb64>[0-9A-Za-z_\-]+)/(?P<token>[0-9A-Za-z]{1,13}-[0-9A-Za-z]{1,20})/$', ActivateListener, name='ActivateListener'),
    # path('activate/<uidb64>/<token>/', ActivateListener, name='ActivateListener'),
    #
    # # url('^reset/(?P<uidb64>[0-9A-Za-z_\-]+)/(?P<token>[0-9A-Za-z]{1,13}-[0-9A-Za-z]{1,20})/$', ResetPasswordListener, name='ResetPasswordListener'),
    # path('reset/<uidb64>/<token>/', ResetPasswordListener, name='ResetPasswordListener'),
    #
    path('change-password/', ChangePassword, name='ChangePassword'),
    # path('reset-password/', ResetPassword, name='ResetPassword'),
    path('signin/', Signin, name='Signin'),
    path('signout/', Signout, name='Signout'),
    # path('admin/create-user/', CreateUser, name='CreateUser'),
    #
    # path('admin/create-user/<appname>/', CreateUserForApp, name='CreateUserForApp'),
    #
    # path('adm/user/profile/<slug>/', ProfileUserAdminManager, name='ProfileUserAdminManager'),
    # path('adm/person/profile/<slug>/', ProfileUserAdminManager, name='ProfileUserAdminManager'),
    # path('adm/website-user/profiles/<slug>/', ProfileUserAdminManager, name='ProfileUserAdminManager'),
    # path('profile/', Profile, name='Profile'),
    # path('dashboard/', Dashboard, name='Dashboard'),
    path('cdashboard/', TNVDashboard, name='TNVDashboard'),
    #
    # path('dashboard/addsite/', AddSite, name='AddSite'),
    # path('license/', LicenseView, name='LicenseView'),
    # # path('messages/', AccountMessagesViewAll, name='AccountMessagesViewAll'),
    # # path('messages/<slug>/', AccountMessagesViewDetail, name='AccountMessagesViewDetail'),
    # path('alerts/<slug>/', AccountAlertsViewDetail, name='AccountAlertsViewDetail'),
    # path('alerts/', AccountAlertsViewAll, name='AccountAlertsViewAll'),
    # ## REST
    # # path('api/v1/', AccountApiView, name='AccountApiView'),
    #
    # # path('api/v1/<username>/', rest_views.AccountDetailView),
    # # path('api/v1/', include(router.urls)),
    # path(r'api/v1/test/', ObtainJSONWebToken.as_view(), name='ObtainJSONWebToken'),
    #
    # path(r'api/v1/login/', LoginView.as_view(), name='LoginView'),
    # path(r'api/v2/logout/', LogoutView.as_view(), name='LogoutView'),
    #
    # # Manager
    # # List Users
    # path('manager/list-user/', mgmt_views.UserListView, name='UserListView'),
    # path('manager/add-user/', mgmt_views.AddUserView, name='AddUserView'),
    # path('manager/edit-user/', mgmt_views.EditUserView, name='EditUserView'),
    # path('manager/list-group/', mgmt_views.GroupListView, name='GroupListView'),
    # path('manager/org-detail/', mgmt_views.OrgDetailView, name='OrgDetailView'),
]

from .Turls import urlpatterns as Turlpatterns
urlpatterns.extend(Turlpatterns)
from .Tapi_routers import *
