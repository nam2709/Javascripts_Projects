from django.urls import path
from . import views
from django.urls import path, include
from django.contrib.auth.models import User
from rest_framework import routers, serializers, viewsets
from .routers import *
from .views import *
# app_name='Depreciation'
urlpatterns = [
    path('code/', include(router.urls)),
    path('get-code/<company_code>/<app_code>/<class_code>/', GetCode, name='GetCode'),
    path('check-exist-code/<company_code>/<app_code>/<class_code>/<crr_code>/', CheckExistCode, name='CheckExistCode'),

]