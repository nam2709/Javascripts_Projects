from django import forms
from django.contrib import admin
from .models import *
# Register your models here.
class GenerateCodeAdmin(admin.ModelAdmin):
    resourceclass = GenerateCode
admin.site.register(GenerateCode, GenerateCodeAdmin)