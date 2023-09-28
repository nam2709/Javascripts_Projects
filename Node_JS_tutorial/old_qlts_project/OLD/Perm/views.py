from django.shortcuts import render

from .models import PermissionGroup
from rest_framework.renderers import TemplateHTMLRenderer
from rest_framework.response import Response
from rest_framework.views import APIView

from django.http import HttpResponse
from django.template import loader
from .models import *
from django.views.generic import ListView
from django.core.paginator import Paginator
from django.views.generic.detail import DetailView
from django.contrib.auth.decorators import login_required
# from .RequestHandler.TAccountRequestHandler import account_post

# Create your views here.
@login_required(login_url="/Account/signin/")
def PermissionGroupDetails(request, *args, **kwargs):
    context = {}
    # context['company_template'] = 'arrgon'
    template = loader.get_template('PermissionGroup/PermissionGroup.html')
    context['PermissionGroup_count'] = PermissionGroup.objects.all().count()     
    

    return HttpResponse(template.render(context, request))
@login_required(login_url="/Account/signin/")
def UserGroupDetails(request, *args, **kwargs):
    context = {}
    # context['company_template'] = 'arrgon'
    template = loader.get_template('UserGroup/UserGroup.html')
    context['UserGroup_count'] = UserGroup.objects.all().count()     
    

    return HttpResponse(template.render(context, request))

def GenAppModel(request, *args, **kwargs):
    context = {}
    obj_modelPer = ModelsPermission()
    obj_modelPer.getAllAppModelName()

    return render(context)
