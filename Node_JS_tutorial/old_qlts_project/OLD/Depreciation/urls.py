from django.urls import path
from . import views
from django.urls import path, include
from django.contrib.auth.models import User
from rest_framework import routers, serializers, viewsets
from .routers import *

# app_name='Depreciation'
urlpatterns = [
    path('depreciation/', include(router.urls)),
    path('',views.depreciaiton,name='test1'),
    path('<int:year_id>/',views.year_depreciation,name='test12'),
    path('assetrevaluation/',views.assetrevaluation,name='test2'),
    path('depreciationasset/', views.depreciationasset,name='test3'),
    path('depreciationtype/', views.depreciationtype,name='test4'),
    path('adjustment/', views.adjustment,name='test5'),
    path('revaluationcreate/',views.createrel,name='test6'),
    path('test/',views.test,name='test'),
    # path('like/',views.like,name='liket'),
]
