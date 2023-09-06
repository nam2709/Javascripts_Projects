
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

from django.urls import path

from . import Tviews
from . import Trest_views
from .Tapi_routers import *

app_name = 'Workspace'

#######################################
from .Trest_views import *
from .Tapi_routers import *
#######################################
urlpatterns = [
    path('', Tviews.Index, name='Index'),
        
    path('Config/', Tviews.ConfigView, name='ConfigView'),
    path('Config/create/', Tviews.Config_CreateView, name='Config_CreateView'),
    path('Config/detail/<slug>/', Tviews.Config_DetailView, name='Config_DetailView'),
    path('Config/edit/<slug>/', Tviews.Config_EditView, name='Config_EditView'),
    path('Config/search/', Trest_views.ConfigSearchRestApiView.as_view(), name='ConfigSearchRestApiView'),
    path('Config/filter/', Trest_views.ConfigFilterRestApiView.as_view(), name='ConfigFilterRestApiView'),
    
    path('Config/large/filter/', Trest_views.ConfigFilterLargeRestApiView.as_view(), name='ConfigFilterLargeRestApiView'),



    path('Config/medium/filter/', Trest_views.ConfigFilterMediumRestApiView.as_view(), name='ConfigFilterMediumRestApiView'),



    path('AllApp/', Tviews.AllAppView, name='AllAppView'),
    path('AllApp/create/', Tviews.AllApp_CreateView, name='AllApp_CreateView'),
    path('AllApp/detail/<slug>/', Tviews.AllApp_DetailView, name='AllApp_DetailView'),
    path('AllApp/edit/<slug>/', Tviews.AllApp_EditView, name='AllApp_EditView'),
    path('AllApp/search/', Trest_views.AllAppSearchRestApiView.as_view(), name='AllAppSearchRestApiView'),
    path('AllApp/filter/', Trest_views.AllAppFilterRestApiView.as_view(), name='AllAppFilterRestApiView'),
    
    path('AllApp/large/filter/', Trest_views.AllAppFilterLargeRestApiView.as_view(), name='AllAppFilterLargeRestApiView'),



    path('AllApp/medium/filter/', Trest_views.AllAppFilterMediumRestApiView.as_view(), name='AllAppFilterMediumRestApiView'),



    path('AllView/', Tviews.AllViewView, name='AllViewView'),
    path('AllView/create/', Tviews.AllView_CreateView, name='AllView_CreateView'),
    path('AllView/detail/<slug>/', Tviews.AllView_DetailView, name='AllView_DetailView'),
    path('AllView/edit/<slug>/', Tviews.AllView_EditView, name='AllView_EditView'),
    path('AllView/search/', Trest_views.AllViewSearchRestApiView.as_view(), name='AllViewSearchRestApiView'),
    path('AllView/filter/', Trest_views.AllViewFilterRestApiView.as_view(), name='AllViewFilterRestApiView'),
    
    path('AllView/large/filter/', Trest_views.AllViewFilterLargeRestApiView.as_view(), name='AllViewFilterLargeRestApiView'),



    path('AllView/medium/filter/', Trest_views.AllViewFilterMediumRestApiView.as_view(), name='AllViewFilterMediumRestApiView'),



    path('AdminMenuGroup/', Tviews.AdminMenuGroupView, name='AdminMenuGroupView'),
    path('AdminMenuGroup/create/', Tviews.AdminMenuGroup_CreateView, name='AdminMenuGroup_CreateView'),
    path('AdminMenuGroup/detail/<slug>/', Tviews.AdminMenuGroup_DetailView, name='AdminMenuGroup_DetailView'),
    path('AdminMenuGroup/edit/<slug>/', Tviews.AdminMenuGroup_EditView, name='AdminMenuGroup_EditView'),
    path('AdminMenuGroup/search/', Trest_views.AdminMenuGroupSearchRestApiView.as_view(), name='AdminMenuGroupSearchRestApiView'),
    path('AdminMenuGroup/filter/', Trest_views.AdminMenuGroupFilterRestApiView.as_view(), name='AdminMenuGroupFilterRestApiView'),
    
    path('AdminMenuGroup/large/filter/', Trest_views.AdminMenuGroupFilterLargeRestApiView.as_view(), name='AdminMenuGroupFilterLargeRestApiView'),



    path('AdminMenuGroup/medium/filter/', Trest_views.AdminMenuGroupFilterMediumRestApiView.as_view(), name='AdminMenuGroupFilterMediumRestApiView'),



    path('AllAdminMenu/', Tviews.AllAdminMenuView, name='AllAdminMenuView'),
    path('AllAdminMenu/create/', Tviews.AllAdminMenu_CreateView, name='AllAdminMenu_CreateView'),
    path('AllAdminMenu/detail/<slug>/', Tviews.AllAdminMenu_DetailView, name='AllAdminMenu_DetailView'),
    path('AllAdminMenu/edit/<slug>/', Tviews.AllAdminMenu_EditView, name='AllAdminMenu_EditView'),
    path('AllAdminMenu/search/', Trest_views.AllAdminMenuSearchRestApiView.as_view(), name='AllAdminMenuSearchRestApiView'),
    path('AllAdminMenu/filter/', Trest_views.AllAdminMenuFilterRestApiView.as_view(), name='AllAdminMenuFilterRestApiView'),
    
    path('AllAdminMenu/large/filter/', Trest_views.AllAdminMenuFilterLargeRestApiView.as_view(), name='AllAdminMenuFilterLargeRestApiView'),



    path('AllAdminMenu/medium/filter/', Trest_views.AllAdminMenuFilterMediumRestApiView.as_view(), name='AllAdminMenuFilterMediumRestApiView'),



    path('Position/', Tviews.PositionView, name='PositionView'),
    path('Position/create/', Tviews.Position_CreateView, name='Position_CreateView'),
    path('Position/detail/<slug>/', Tviews.Position_DetailView, name='Position_DetailView'),
    path('Position/edit/<slug>/', Tviews.Position_EditView, name='Position_EditView'),
    path('Position/search/', Trest_views.PositionSearchRestApiView.as_view(), name='PositionSearchRestApiView'),
    path('Position/filter/', Trest_views.PositionFilterRestApiView.as_view(), name='PositionFilterRestApiView'),
    
    path('Position/large/filter/', Trest_views.PositionFilterLargeRestApiView.as_view(), name='PositionFilterLargeRestApiView'),



    path('Position/medium/filter/', Trest_views.PositionFilterMediumRestApiView.as_view(), name='PositionFilterMediumRestApiView'),



    path('FooterItem/', Tviews.FooterItemView, name='FooterItemView'),
    path('FooterItem/create/', Tviews.FooterItem_CreateView, name='FooterItem_CreateView'),
    path('FooterItem/detail/<slug>/', Tviews.FooterItem_DetailView, name='FooterItem_DetailView'),
    path('FooterItem/edit/<slug>/', Tviews.FooterItem_EditView, name='FooterItem_EditView'),
    path('FooterItem/search/', Trest_views.FooterItemSearchRestApiView.as_view(), name='FooterItemSearchRestApiView'),
    path('FooterItem/filter/', Trest_views.FooterItemFilterRestApiView.as_view(), name='FooterItemFilterRestApiView'),
    
    path('FooterItem/large/filter/', Trest_views.FooterItemFilterLargeRestApiView.as_view(), name='FooterItemFilterLargeRestApiView'),



    path('FooterItem/medium/filter/', Trest_views.FooterItemFilterMediumRestApiView.as_view(), name='FooterItemFilterMediumRestApiView'),



    path('Widget/', Tviews.WidgetView, name='WidgetView'),
    path('Widget/create/', Tviews.Widget_CreateView, name='Widget_CreateView'),
    path('Widget/detail/<slug>/', Tviews.Widget_DetailView, name='Widget_DetailView'),
    path('Widget/edit/<slug>/', Tviews.Widget_EditView, name='Widget_EditView'),
    path('Widget/search/', Trest_views.WidgetSearchRestApiView.as_view(), name='WidgetSearchRestApiView'),
    path('Widget/filter/', Trest_views.WidgetFilterRestApiView.as_view(), name='WidgetFilterRestApiView'),
    
    path('Widget/large/filter/', Trest_views.WidgetFilterLargeRestApiView.as_view(), name='WidgetFilterLargeRestApiView'),



    path('Widget/medium/filter/', Trest_views.WidgetFilterMediumRestApiView.as_view(), name='WidgetFilterMediumRestApiView'),



    path('TimeZone/', Tviews.TimeZoneView, name='TimeZoneView'),
    path('TimeZone/create/', Tviews.TimeZone_CreateView, name='TimeZone_CreateView'),
    path('TimeZone/detail/<slug>/', Tviews.TimeZone_DetailView, name='TimeZone_DetailView'),
    path('TimeZone/edit/<slug>/', Tviews.TimeZone_EditView, name='TimeZone_EditView'),
    path('TimeZone/search/', Trest_views.TimeZoneSearchRestApiView.as_view(), name='TimeZoneSearchRestApiView'),
    path('TimeZone/filter/', Trest_views.TimeZoneFilterRestApiView.as_view(), name='TimeZoneFilterRestApiView'),
    
    path('TimeZone/large/filter/', Trest_views.TimeZoneFilterLargeRestApiView.as_view(), name='TimeZoneFilterLargeRestApiView'),



    path('TimeZone/medium/filter/', Trest_views.TimeZoneFilterMediumRestApiView.as_view(), name='TimeZoneFilterMediumRestApiView'),



    path('PageInfo/', Tviews.PageInfoView, name='PageInfoView'),
    path('PageInfo/create/', Tviews.PageInfo_CreateView, name='PageInfo_CreateView'),
    path('PageInfo/detail/<slug>/', Tviews.PageInfo_DetailView, name='PageInfo_DetailView'),
    path('PageInfo/edit/<slug>/', Tviews.PageInfo_EditView, name='PageInfo_EditView'),
    path('PageInfo/search/', Trest_views.PageInfoSearchRestApiView.as_view(), name='PageInfoSearchRestApiView'),
    path('PageInfo/filter/', Trest_views.PageInfoFilterRestApiView.as_view(), name='PageInfoFilterRestApiView'),
    
    path('PageInfo/large/filter/', Trest_views.PageInfoFilterLargeRestApiView.as_view(), name='PageInfoFilterLargeRestApiView'),



    path('PageInfo/medium/filter/', Trest_views.PageInfoFilterMediumRestApiView.as_view(), name='PageInfoFilterMediumRestApiView'),



    path('BotUA/', Tviews.BotUAView, name='BotUAView'),
    path('BotUA/create/', Tviews.BotUA_CreateView, name='BotUA_CreateView'),
    path('BotUA/detail/<slug>/', Tviews.BotUA_DetailView, name='BotUA_DetailView'),
    path('BotUA/edit/<slug>/', Tviews.BotUA_EditView, name='BotUA_EditView'),
    path('BotUA/search/', Trest_views.BotUASearchRestApiView.as_view(), name='BotUASearchRestApiView'),
    path('BotUA/filter/', Trest_views.BotUAFilterRestApiView.as_view(), name='BotUAFilterRestApiView'),
    
    path('BotUA/large/filter/', Trest_views.BotUAFilterLargeRestApiView.as_view(), name='BotUAFilterLargeRestApiView'),



    path('BotUA/medium/filter/', Trest_views.BotUAFilterMediumRestApiView.as_view(), name='BotUAFilterMediumRestApiView'),



    path('RobotsArg/', Tviews.RobotsArgView, name='RobotsArgView'),
    path('RobotsArg/create/', Tviews.RobotsArg_CreateView, name='RobotsArg_CreateView'),
    path('RobotsArg/detail/<slug>/', Tviews.RobotsArg_DetailView, name='RobotsArg_DetailView'),
    path('RobotsArg/edit/<slug>/', Tviews.RobotsArg_EditView, name='RobotsArg_EditView'),
    path('RobotsArg/search/', Trest_views.RobotsArgSearchRestApiView.as_view(), name='RobotsArgSearchRestApiView'),
    path('RobotsArg/filter/', Trest_views.RobotsArgFilterRestApiView.as_view(), name='RobotsArgFilterRestApiView'),
    
    path('RobotsArg/large/filter/', Trest_views.RobotsArgFilterLargeRestApiView.as_view(), name='RobotsArgFilterLargeRestApiView'),



    path('RobotsArg/medium/filter/', Trest_views.RobotsArgFilterMediumRestApiView.as_view(), name='RobotsArgFilterMediumRestApiView'),



    path('LogoImages/', Tviews.LogoImagesView, name='LogoImagesView'),
    path('LogoImages/create/', Tviews.LogoImages_CreateView, name='LogoImages_CreateView'),
    path('LogoImages/detail/<slug>/', Tviews.LogoImages_DetailView, name='LogoImages_DetailView'),
    path('LogoImages/edit/<slug>/', Tviews.LogoImages_EditView, name='LogoImages_EditView'),
    path('LogoImages/search/', Trest_views.LogoImagesSearchRestApiView.as_view(), name='LogoImagesSearchRestApiView'),
    path('LogoImages/filter/', Trest_views.LogoImagesFilterRestApiView.as_view(), name='LogoImagesFilterRestApiView'),
    
    path('LogoImages/large/filter/', Trest_views.LogoImagesFilterLargeRestApiView.as_view(), name='LogoImagesFilterLargeRestApiView'),



    path('LogoImages/medium/filter/', Trest_views.LogoImagesFilterMediumRestApiView.as_view(), name='LogoImagesFilterMediumRestApiView'),



]
