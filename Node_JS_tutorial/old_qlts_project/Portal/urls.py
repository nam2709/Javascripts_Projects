# -*- encoding: utf-8 -*-
"""
Copyright (c) 2019 - present AppSeed.us
"""

from django.urls import path, re_path
from Portal import views

from Router.models import SharedAPIRootRouter

app_name = "Portal"

urlpatterns = [
    # path('', views.Index, name='Index'),
    path('', views.IndexNew, name='IndexNew'),
]
