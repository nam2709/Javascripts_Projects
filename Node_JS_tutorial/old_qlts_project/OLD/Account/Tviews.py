
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

from django.http import HttpResponse
from django.template import loader
from django.core.paginator import Paginator
from django.contrib.auth.decorators import login_required
import sys
import os
import json
# from .process_request import process_post
# from Workspace.views import AdminWebContext


# from .models import *

# from .models import *
# from RunningTaskManagement.models import *
# from RunningTaskManagement.models_genaral import *
from .models import *


def Index(request, *args, **kwargs):
    # try:
    #     context = AdminWebContext(request, page_info='Account:Index', *args, **kwargs)
    # except Exception as xx:
    context = {}
    context['website_template'] = 'arrgon'

    template = loader.get_template(str('Account/%s/admin/index.html' % context['website_template']))
        
    context['account_count'] = Account.objects.all().count() 
    context['account'] = Account.objects.all().count() + 1001
        
    return HttpResponse(template.render(context, request))
    
from .RequestHandler.TAccountRequestHandler import account_post_handle, account_get_handle

@login_required(login_url="/Account/signin/")
def AccountView(request, *args, **kwargs):
    # try:
    #     context = AdminWebContext(request, page_info='Account:Account_View', *args, **kwargs)
    # except Exception as xx:
    context = {}
    context['website_template'] = 'arrgon'

    template = loader.get_template(str('Account/%s/admin/Account.html' % context['website_template']))
    if request.method == 'POST':
        more_context = account_post_handle(request)
        if more_context:
            context.update(more_context)

    all_of_objs = Account.objects.all().order_by('-updated_at')

    paginator = Paginator(all_of_objs, 100) # Show 100 contacts per page

    page = request.GET.get('page')
    context['all_accounts'] = paginator.get_page(page)

    result = HttpResponse(template.render(context, request))
    return result
            
@login_required(login_url="/Account/signin/")
def Account_CreateView(request, *args, **kwargs):
    # try:
    #     context = AdminWebContext(request, page_info='Account:AccountCreateView', *args, **kwargs)
    # except Exception as xx:
    context = {}
    context['website_template'] = 'arrgon'

    template = loader.get_template(str('Account/%s/admin/Account-Create.html' % context['website_template']))
    if request.method == 'POST':
        more_context = account_post_handle(request)
        if more_context:
            context.update(more_context)
    all_of_objs = Account.objects.all().order_by('-updated_at')

    paginator = Paginator(all_of_objs, 100) # Show 100 contacts per page

    page = request.GET.get('page')
    context['all_accounts'] = paginator.get_page(page)

    context['current_uuid'] = UUID4()

    result = HttpResponse(template.render(context, request))
    return result
            
@login_required(login_url="/Account/signin/")
def Account_DetailView(request, slug, *args, **kwargs):
    # try:
    #     context = AdminWebContext(request, page_info='Account:AccountDetailView', *args, **kwargs)
    # except Exception as xx:
    #     context = {}
    #     context['website_template'] = 'arrgon'
    context = {}
    context['website_template'] = 'arrgon'
    template = loader.get_template(str('Account/%s/admin/Account-Detail.html' % context['website_template']))
    if request.method == 'POST':
        more_context = account_post_handle(request)
        if more_context:
            context.update(more_context)
    all_of_objs = Account.objects.all().order_by('-updated_at')

    paginator = Paginator(all_of_objs, 100) # Show 100 contacts per page

    page = request.GET.get('page')
    context['all_accounts'] = paginator.get_page(page)

    try:
        context['current_account'] = Account.objects.filter(uuid=slug).first()
    except Exception as xx:
        print(str(xx))

    result = HttpResponse(template.render(context, request))
    return result
            
@login_required(login_url="/Account/signin/")
def Account_EditView(request, slug, *args, **kwargs):
    # try:
    #     context = AdminWebContext(request, page_info='Account:AccountEditView', *args, **kwargs)
    # except Exception as xx:
    #     context = {}
    #     context['website_template'] = 'arrgon'
    context = {}
    context['website_template'] = 'arrgon'
    template = loader.get_template(str('Account/%s/admin/Account-Edit.html' % context['website_template']))
    if request.method == 'POST':
        more_context = account_post_handle(request)
        if more_context:
            context.update(more_context)
    all_of_objs = Account.objects.all().order_by('-updated_at')

    paginator = Paginator(all_of_objs, 100) # Show 100 contacts per page

    page = request.GET.get('page')
    context['all_accounts'] = paginator.get_page(page)

    try:
        context['current_account'] = Account.objects.filter(uuid=slug).first()
    except Exception as xx:
        print(str(xx))

    result = HttpResponse(template.render(context, request))
    return result
            