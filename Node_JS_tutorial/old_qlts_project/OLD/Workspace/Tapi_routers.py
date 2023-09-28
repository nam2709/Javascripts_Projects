
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

app_name = 'Workspace'

#######################################
from .Trest_views import *
from Router.models import SharedAPIRootRouter

router = SharedAPIRootRouter().shared_router
router.register(r'workspace/config/all', ConfigRestApiView, basename='ConfigRestApiView')
router.register(r'workspace/config/large/all', ConfigRestLargePaginationApiView, basename='ConfigRestLargePaginationApiView')
router.register(r'workspace/config/list', ConfigListRestApiView, basename='ConfigListRestApiView')
router.register(r'workspace/config/detete', ConfigDeleteRestApiView, basename='ConfigDeleteRestApiView')
router.register(r'workspace/config/update', ConfigUpdateRestApiView, basename='ConfigUpdateRestApiView')
router.register(r'workspace/config/remove-file', ConfigRemoveFileRestApiView, basename='ConfigRemoveFileRestApiView')
router.register(r'workspace/allapp/all', AllAppRestApiView, basename='AllAppRestApiView')
router.register(r'workspace/allapp/large/all', AllAppRestLargePaginationApiView, basename='AllAppRestLargePaginationApiView')
router.register(r'workspace/allapp/list', AllAppListRestApiView, basename='AllAppListRestApiView')
router.register(r'workspace/allapp/detete', AllAppDeleteRestApiView, basename='AllAppDeleteRestApiView')
router.register(r'workspace/allapp/update', AllAppUpdateRestApiView, basename='AllAppUpdateRestApiView')
router.register(r'workspace/allapp/remove-file', AllAppRemoveFileRestApiView, basename='AllAppRemoveFileRestApiView')
router.register(r'workspace/allview/all', AllViewRestApiView, basename='AllViewRestApiView')
router.register(r'workspace/allview/large/all', AllViewRestLargePaginationApiView, basename='AllViewRestLargePaginationApiView')
router.register(r'workspace/allview/list', AllViewListRestApiView, basename='AllViewListRestApiView')
router.register(r'workspace/allview/detete', AllViewDeleteRestApiView, basename='AllViewDeleteRestApiView')
router.register(r'workspace/allview/update', AllViewUpdateRestApiView, basename='AllViewUpdateRestApiView')
router.register(r'workspace/allview/remove-file', AllViewRemoveFileRestApiView, basename='AllViewRemoveFileRestApiView')
router.register(r'workspace/adminmenugroup/all', AdminMenuGroupRestApiView, basename='AdminMenuGroupRestApiView')
router.register(r'workspace/adminmenugroup/large/all', AdminMenuGroupRestLargePaginationApiView, basename='AdminMenuGroupRestLargePaginationApiView')
router.register(r'workspace/adminmenugroup/list', AdminMenuGroupListRestApiView, basename='AdminMenuGroupListRestApiView')
router.register(r'workspace/adminmenugroup/detete', AdminMenuGroupDeleteRestApiView, basename='AdminMenuGroupDeleteRestApiView')
router.register(r'workspace/adminmenugroup/update', AdminMenuGroupUpdateRestApiView, basename='AdminMenuGroupUpdateRestApiView')
router.register(r'workspace/adminmenugroup/remove-file', AdminMenuGroupRemoveFileRestApiView, basename='AdminMenuGroupRemoveFileRestApiView')
router.register(r'workspace/alladminmenu/all', AllAdminMenuRestApiView, basename='AllAdminMenuRestApiView')
router.register(r'workspace/alladminmenu/large/all', AllAdminMenuRestLargePaginationApiView, basename='AllAdminMenuRestLargePaginationApiView')
router.register(r'workspace/alladminmenu/list', AllAdminMenuListRestApiView, basename='AllAdminMenuListRestApiView')
router.register(r'workspace/alladminmenu/detete', AllAdminMenuDeleteRestApiView, basename='AllAdminMenuDeleteRestApiView')
router.register(r'workspace/alladminmenu/update', AllAdminMenuUpdateRestApiView, basename='AllAdminMenuUpdateRestApiView')
router.register(r'workspace/alladminmenu/remove-file', AllAdminMenuRemoveFileRestApiView, basename='AllAdminMenuRemoveFileRestApiView')
router.register(r'workspace/position/all', PositionRestApiView, basename='PositionRestApiView')
router.register(r'workspace/position/large/all', PositionRestLargePaginationApiView, basename='PositionRestLargePaginationApiView')
router.register(r'workspace/position/list', PositionListRestApiView, basename='PositionListRestApiView')
router.register(r'workspace/position/detete', PositionDeleteRestApiView, basename='PositionDeleteRestApiView')
router.register(r'workspace/position/update', PositionUpdateRestApiView, basename='PositionUpdateRestApiView')
router.register(r'workspace/position/remove-file', PositionRemoveFileRestApiView, basename='PositionRemoveFileRestApiView')
router.register(r'workspace/footeritem/all', FooterItemRestApiView, basename='FooterItemRestApiView')
router.register(r'workspace/footeritem/large/all', FooterItemRestLargePaginationApiView, basename='FooterItemRestLargePaginationApiView')
router.register(r'workspace/footeritem/list', FooterItemListRestApiView, basename='FooterItemListRestApiView')
router.register(r'workspace/footeritem/detete', FooterItemDeleteRestApiView, basename='FooterItemDeleteRestApiView')
router.register(r'workspace/footeritem/update', FooterItemUpdateRestApiView, basename='FooterItemUpdateRestApiView')
router.register(r'workspace/footeritem/remove-file', FooterItemRemoveFileRestApiView, basename='FooterItemRemoveFileRestApiView')
router.register(r'workspace/widget/all', WidgetRestApiView, basename='WidgetRestApiView')
router.register(r'workspace/widget/large/all', WidgetRestLargePaginationApiView, basename='WidgetRestLargePaginationApiView')
router.register(r'workspace/widget/list', WidgetListRestApiView, basename='WidgetListRestApiView')
router.register(r'workspace/widget/detete', WidgetDeleteRestApiView, basename='WidgetDeleteRestApiView')
router.register(r'workspace/widget/update', WidgetUpdateRestApiView, basename='WidgetUpdateRestApiView')
router.register(r'workspace/widget/remove-file', WidgetRemoveFileRestApiView, basename='WidgetRemoveFileRestApiView')
router.register(r'workspace/timezone/all', TimeZoneRestApiView, basename='TimeZoneRestApiView')
router.register(r'workspace/timezone/large/all', TimeZoneRestLargePaginationApiView, basename='TimeZoneRestLargePaginationApiView')
router.register(r'workspace/timezone/list', TimeZoneListRestApiView, basename='TimeZoneListRestApiView')
router.register(r'workspace/timezone/detete', TimeZoneDeleteRestApiView, basename='TimeZoneDeleteRestApiView')
router.register(r'workspace/timezone/update', TimeZoneUpdateRestApiView, basename='TimeZoneUpdateRestApiView')
router.register(r'workspace/timezone/remove-file', TimeZoneRemoveFileRestApiView, basename='TimeZoneRemoveFileRestApiView')
router.register(r'workspace/pageinfo/all', PageInfoRestApiView, basename='PageInfoRestApiView')
router.register(r'workspace/pageinfo/large/all', PageInfoRestLargePaginationApiView, basename='PageInfoRestLargePaginationApiView')
router.register(r'workspace/pageinfo/list', PageInfoListRestApiView, basename='PageInfoListRestApiView')
router.register(r'workspace/pageinfo/detete', PageInfoDeleteRestApiView, basename='PageInfoDeleteRestApiView')
router.register(r'workspace/pageinfo/update', PageInfoUpdateRestApiView, basename='PageInfoUpdateRestApiView')
router.register(r'workspace/pageinfo/remove-file', PageInfoRemoveFileRestApiView, basename='PageInfoRemoveFileRestApiView')
router.register(r'workspace/botua/all', BotUARestApiView, basename='BotUARestApiView')
router.register(r'workspace/botua/large/all', BotUARestLargePaginationApiView, basename='BotUARestLargePaginationApiView')
router.register(r'workspace/botua/list', BotUAListRestApiView, basename='BotUAListRestApiView')
router.register(r'workspace/botua/detete', BotUADeleteRestApiView, basename='BotUADeleteRestApiView')
router.register(r'workspace/botua/update', BotUAUpdateRestApiView, basename='BotUAUpdateRestApiView')
router.register(r'workspace/botua/remove-file', BotUARemoveFileRestApiView, basename='BotUARemoveFileRestApiView')
router.register(r'workspace/robotsarg/all', RobotsArgRestApiView, basename='RobotsArgRestApiView')
router.register(r'workspace/robotsarg/large/all', RobotsArgRestLargePaginationApiView, basename='RobotsArgRestLargePaginationApiView')
router.register(r'workspace/robotsarg/list', RobotsArgListRestApiView, basename='RobotsArgListRestApiView')
router.register(r'workspace/robotsarg/detete', RobotsArgDeleteRestApiView, basename='RobotsArgDeleteRestApiView')
router.register(r'workspace/robotsarg/update', RobotsArgUpdateRestApiView, basename='RobotsArgUpdateRestApiView')
router.register(r'workspace/robotsarg/remove-file', RobotsArgRemoveFileRestApiView, basename='RobotsArgRemoveFileRestApiView')
router.register(r'workspace/logoimages/all', LogoImagesRestApiView, basename='LogoImagesRestApiView')
router.register(r'workspace/logoimages/large/all', LogoImagesRestLargePaginationApiView, basename='LogoImagesRestLargePaginationApiView')
router.register(r'workspace/logoimages/list', LogoImagesListRestApiView, basename='LogoImagesListRestApiView')
router.register(r'workspace/logoimages/detete', LogoImagesDeleteRestApiView, basename='LogoImagesDeleteRestApiView')
router.register(r'workspace/logoimages/update', LogoImagesUpdateRestApiView, basename='LogoImagesUpdateRestApiView')
router.register(r'workspace/logoimages/remove-file', LogoImagesRemoveFileRestApiView, basename='LogoImagesRemoveFileRestApiView')