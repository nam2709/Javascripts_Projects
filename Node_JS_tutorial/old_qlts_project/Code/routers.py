from django.urls import path, include
from django.contrib.auth.models import User
from rest_framework import routers, serializers, viewsets
from .rest_views import *


# Routers provide an easy way of automatically determining the URL conf.
router = routers.DefaultRouter()

router.register(r'Code', CodeViewSet)