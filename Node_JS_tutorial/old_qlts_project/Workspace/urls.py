from django.urls import path
from django.contrib.sitemaps.views import sitemap

from .sitemap import StaticViewSitemap
from .models import AllAdminMenu
from . import views
from . import test_views
from . import tool_views
from . import debug_views

app_name = 'Website'

#######################################
from .Trest_views import *
from .Tapi_routers import *
from .fixed_views import *

from Router.models import SharedAPIRootRouter

# router = SharedAPIRootRouter()
# router.register(r'websites/config', ConfigRestApiView, 'ConfigRestApiView')
# router.register(r'websites/all-app', AllAppRestApiView, 'AllAppRestApiView')
# router.register(r'websites/all-view', AllViewRestApiView, 'AllViewRestApiView')
# router.register(r'websites/admin-menu-group', AdminMenuGroupRestApiView, 'AdminMenuGroupRestApiView')
# router.register(r'websites/all-admin-menu', AllAdminMenuRestApiView, 'AllAdminMenuRestApiView')
# router.register(r'websites/position', PositionRestApiView, 'PositionRestApiView')
# router.register(r'websites/footer-item', FooterItemRestApiView, 'FooterItemRestApiView')
# router.register(r'websites/widget', WidgetRestApiView, 'WidgetRestApiView')
# router.register(r'websites/timezone', TimeZoneRestApiView, 'TimeZoneRestApiView')
# router.register(r'websites/page-info', PageInfoRestApiView, 'PageInfoRestApiView')
# router.register(r'websites/bot-ua', BotUARestApiView, 'BotUARestApiView')
# router.register(r'websites/robots-arg', RobotsArgRestApiView, 'RobotsArgRestApiView')


# router.register(r'debug/system-info', SystemInfoApiView, 'SystemInfoApiView')

#######################################

info_dict = {
    'queryset': AllAdminMenu.objects.all(),
    'date_field': 'updated_at',
}

sitemaps = {
    'static': StaticViewSitemap,
}

urlpatterns = [
    path('', views.Index, name='Index'),
    ####################################################################################
    path('sitemap.xml', sitemap, {'sitemaps': sitemaps},
         name='django.contrib.sitemaps.views.sitemap'),

    path('robots.txt', views.Robots, name='Robots'),
    path('sitemap.xml', sitemap, name='sitemap-xml'),
    #path('.htaccess', views.HtaccessView, name='HtaccessView'),

    path('locales/', views.Locales, name='Locales'),

    path('yandex_a9f22e19507e15cb.html', views.YandexVerification, name='YandexVerification'),
    path('testing/', views.testing, name='testing'),

    path('super-user-tools/', views.SuperUserTools, name='SuperUserTools'),

    path('system/setting/', views.SystemSetting, name='SystemSetting'),

    ####################################################################################
    path('search/', views.Search, name='Search'),

    ####################################################################################
    path('favicon.ico', views.Favicon, name='Favicon'),

    ####################################################################################
    path('debug/redis/', debug_views.RedisView, name='RedisView'),
    path('debug/redis/<slug>/', debug_views.RedisDetailView, name='RedisDetailView'),
    path('debug/system-info/', debug_views.SystemInfoView, name='SystemInfoView'),
    path('api/v1/debug/system-info-api/', SystemInfoApiView.as_view(), name='SystemInfoApiView'),


    ####################################################################################
    path('tools/whatismyip/', tool_views.WhatIsMyIp, name='WhatIsMyIp'),
    path('tools/ip/', tool_views.MyIp, name='MyIp'),

    ####################################################################################
    path('testing/themes/dashboard/', test_views.Dashboard, name='TestingDashboard'),
    path('testing/themes/bread-scumb/', test_views.BreadScumb, name='TestingBreadScumb'),
    path('testing/themes/alert-message/', test_views.AlertMessage, name='TestingAlertMessage'),
    path('testing/themes/images/', test_views.Images, name='TestingImages'),
    path('testing/themes/grid/', test_views.Grid, name='TestingGrid'),
    path('testing/themes/progress-bar/', test_views.ProgressBar, name='TestingProgressBar'),
    path('testing/themes/spinners/', test_views.Spinner, name='TestingSpinner'),
    path('testing/themes/pagination/', test_views.Pagination, name='TestingPagination'),
    path('testing/themes/pdf-object/', test_views.PdfObject, name='TestingPdfObject'),
    path('testing/themes/pdf-js/', test_views.PdfJs, name='PdfJs'),
    path('testing/themes/pdf-js-iframe/', test_views.PdfJsIframe, name='PdfJsIframe'),
    path('testing/themes/pdf-js-viewer/', test_views.PdfJsViewer, name='PdfJsViewer'),

    path('testing/themes/count-down/', test_views.CountDown, name='TestingCountDown'),
    path('testing/themes/slide-show/', test_views.SlideShow, name='TestingSlideShow'),

    path('testing/themes/scrollspy/', test_views.ScrollSpy, name='TestingScrollSpy'),

    path('testing/themes/tooltip/', test_views.ToolTip, name='TestingToolTip'),

    path('testing/themes/table/', test_views.Table, name='TestingTable'),
    path('testing/themes/chart/', test_views.Chart, name='TestingChart'),
    path('testing/themes/button/', test_views.Button, name='TestingButton'),
    path('testing/themes/cards/', test_views.Cards, name='TestingCard'),
    path('testing/themes/blank/', test_views.Blank, name='TestingBlank'),
    path('testing/themes/404/', test_views.T404, name='TestingT404'),
    path('testing/themes/register/', test_views.Register, name='TestingRegister'),
    path('testing/themes/login/', test_views.Login, name='TestingLogin'),
    path('testing/themes/forgot-password/', test_views.ForgotPassword, name='TestingForgotPassword'),
    path('testing/themes/animation/', test_views.Animation, name='TestingAnimation'),
    path('testing/themes/border/', test_views.Border, name='TestingBorder'),
    path('testing/themes/color/', test_views.Color, name='TestingColor'),
    path('testing/themes/other/', test_views.Other, name='TestingOther'),

    path('testing/themes/chat/', test_views.Chat, name='Chat'),
    path('testing/themes/chat1/', test_views.Chat1, name='Chat1'),
    path('testing/themes/chat2/', test_views.Chat2, name='Chat2'),
    path('testing/themes/chat3/', test_views.Chat3, name='Chat3'),
    path('testing/themes/chat3-iframe/', test_views.Chat3Iframe, name='Chat3Iframe'),

    path('testing/themes/chat4/', test_views.Chat4, name='Chat4'),

    path('testing/themes/pricing-mdb/', test_views.PricingMdb, name='Pricing-MDB'),
    path('testing/themes/about-us-mdb/', test_views.AboutUsMdb, name='About-Us-MDB'),
    path('testing/themes/contact-us-mdb/', test_views.ContactUsMdb, name='Contact-Us-MDB'),

    path('testing/themes/datetime-picker-mdb/', test_views.DatetimePickerMdb, name='Datetime-Picker-MDB'),

    path('testing/themes/select/', test_views.SelectView, name='SelectView'),
    path('testing/themes/docviewer/', test_views.DocViewer, name='DocViewer'),

    path('api/debug/env-paras/', EnviromentParameterRestApiView.as_view(), name='EnviromentParameterRestApiView'),

]
from .Turls import urlpatterns as Turlpatterns
urlpatterns.extend(Turlpatterns)
from .Tapi_routers import *
