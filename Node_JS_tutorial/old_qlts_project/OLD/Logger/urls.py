from django.urls import path

from .views import *

app_name = 'Logger'

#######################################
from .rest_views import *
from Router.models import SharedAPIRootRouter

router = SharedAPIRootRouter()
router.register(r'logs', LogRestApiView, 'LogRestApiView')

#######################################

urlpatterns = [
    path('', Dashboard, name='Dashboard'),
    path('all-log/', AllLogsView, name='AllLogsView'),
    path('all-log/by-app/<slug>/', AllLogsByAppView, name='AllLogsByAppView'),
    path('all-log/by-class/<slug>/', AllLogsByClassView, name='AllLogsByClassView'),
    path('all-log/by-func/<slug>/', AllLogsByFunctionView, name='AllLogsByFunctionView'),
    path('all-log/by-level/<slug>/', AllLogsByLevelView, name='AllLogsByLevelView'),
    path('all-log/by-name/<slug>/', AllLogsByNameView, name='AllLogsByNameView'),
    path('all-log/by-user/<slug>/', AllLogsByUserView, name='AllLogsByUserView'),
    path('syslog/api/listener/', SyslogListener, name='SyslogListener'),
    ]
