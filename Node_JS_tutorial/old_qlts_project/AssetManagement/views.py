from django.shortcuts import render
from django.views.generic import TemplateView

from django.http import HttpResponse
from django.template import loader
from django.core.paginator import Paginator
from django.contrib.auth.decorators import login_required
from uuid import uuid4 as UUID4

from .models import *

# Create your views here.

# Asset Template
@login_required(login_url="/Account/signin/")
def AssetView(request, *args, **kwargs):
    context = {}

    template = loader.get_template(str('AssetManagement/argon/admin/Asset.html'))

    all_of_objs = Asset.objects.all().order_by('-updated_at')

    context['asset'] = all_of_objs

    result = HttpResponse(template.render(context, request))
    return result

# Asset Type Template
@login_required(login_url="/Account/signin/")
def assettype_view(request, *args, **kwargs):
    context = {}

    template = loader.get_template(str('AssetManagement/argon/admin/AssetType.html'))

    all_of_objs = Asset.objects.all().order_by('-updated_at')
    context['asset_type'] = all_of_objs

    result = HttpResponse(template.render(context, request))
    return result

# Template Asset Of Type
@login_required(login_url="/Account/signin/")
def assetoftype_view(request, *args, **kwargs):
    context = {}

    template = loader.get_template(str('AssetManagement/argon/admin/AssetOfType.html'))

    all_of_objs = Asset.objects.all().order_by('-updated_at')
    context['asset_of_type'] = all_of_objs

    result = HttpResponse(template.render(context, request))
    return result

# Asset Detail Template
@login_required(login_url="/Account/signin/")
def assetdetail_view(request, *args, **kwargs):
    context = {}

    template = loader.get_template(str('AssetManagement/argon/admin/AssetDetailType.html'))

    all_of_objs = Asset.objects.all().order_by('-updated_at')
    context['asset_detail'] = all_of_objs

    result = HttpResponse(template.render(context, request))
    return result

# Asset Detail Template Template
@login_required(login_url="/Account/signin/")
def assetdetailtemplate_view(request, *args, **kwargs):
    context = {}

    template = loader.get_template(str('AssetManagement/argon/admin/AssetDetailTemplate.html'))

    all_of_objs = Asset.objects.all().order_by('-updated_at')
    context['asset_detail_template'] = all_of_objs

    result = HttpResponse(template.render(context, request))
    return result

# Asset Status Template
@login_required(login_url="/Account/signin/")
def assetstatus_view(request, *args, **kwargs):
    context = {}

    template = loader.get_template(str('AssetManagement/argon/admin/AssetStatus.html'))

    all_of_objs = Asset.objects.all().order_by('-updated_at')
    context['asset_status'] = all_of_objs

    result = HttpResponse(template.render(context, request))
    return result

# Own Status Template
@login_required(login_url="/Account/signin/")
def ownstatus_view(request, *args, **kwargs):
    context = {}

    template = loader.get_template(str('AssetManagement/argon/admin/OwnStatus.html'))

    all_of_objs = Asset.objects.all().order_by('-updated_at')
    context['own_status'] = all_of_objs

    result = HttpResponse(template.render(context, request))
    return result

# Supplier Category Template
@login_required(login_url="/Account/signin/")
def suppliercategory_view(request, *args, **kwargs):
    context = {}

    template = loader.get_template(str('AssetManagement/argon/admin/SupplierCategory.html'))

    all_of_objs = Asset.objects.all().order_by('-updated_at')
    context['supplier_category'] = all_of_objs

    result = HttpResponse(template.render(context, request))
    return result

# Unit Category Template
@login_required(login_url="/Account/signin/")
def unitcategory_view(request, *args, **kwargs):
    context = {}

    template = loader.get_template(str('AssetManagement/argon/admin/UnitCategory.html'))

    all_of_objs = Asset.objects.all().order_by('-updated_at')
    context['unit_category'] = all_of_objs

    result = HttpResponse(template.render(context, request))
    return result

@login_required(login_url="/Account/signin/")
def currency_unit_view(request, *args, **kwargs):
    context = {}

    template = loader.get_template(str('AssetManagement/argon/admin/CurrencyUnit.html'))

    all_of_objs = Asset.objects.all().order_by('-updated_at')
    context['currency_unit'] = all_of_objs

    result = HttpResponse(template.render(context, request))
    return result

# Ware House Category Template
@login_required(login_url="/Account/signin/")
def warehousecategory_view(request, *args, **kwargs):
    context = {}

    template = loader.get_template(str('AssetManagement/argon/admin/WareHouseCategory.html'))

    all_of_objs = Asset.objects.all().order_by('-updated_at')
    context['ware_house_category'] = all_of_objs

    result = HttpResponse(template.render(context, request))
    return result

# Nam da tao
@login_required(login_url="/Account/signin/")
def postasset_view(request, *args, **kwargs):
    context = {}

    template = loader.get_template(str('AssetManagement/argon/admin/Nam_CreateAsset.html'))
    
    result = HttpResponse(template.render(context, request))
    return result