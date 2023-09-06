from django.urls import path, include
from django.contrib.auth.models import User
from rest_framework import routers, serializers
from .models import *
import math

class CodeSerializer(serializers.ModelSerializer):
    class Meta:
        model = GenerateCode
        fields = '__all__'