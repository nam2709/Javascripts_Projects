from django.shortcuts import render
from django.template import loader
from django.contrib.auth.decorators import login_required

from django.core.paginator import Paginator
from .models import FormManagement
from .models import ListAsset
from .models import ListTypeForm
from .models import HistoryUseAsset
from .models import TypeAction
from django.http import HttpResponse

    
# Create your views here.
def Index(request, *args, **kwargs):
    context = {}
    # context['company_template'] = 'arrgon'
    template = loader.get_template('FormManagement/index.html')
    context['count'] = FormManagement.objects.all().count()
    return HttpResponse(template.render(context, request))

# @login_required(login_url="/account/signin/")
def FormListView(request, *args, **kwargs):
    context = {}
    template = loader.get_template('FormManagement/Form-FormManagement.html')

    all_of_objs = FormManagement.objects.all().order_by('-updated_at')

    paginator = Paginator(all_of_objs, 100) # Show 100 contacts per page

    page = request.GET.get('page')
    context['count'] = paginator.get_page(page)

    result = HttpResponse(template.render(context, request))
    return result


def AssetListView(request, *args, **kwargs):
    context = {}
    template = loader.get_template('FormManagement/Form-AssetList.html')

    all_of_objs = ListAsset.objects.all().order_by('-updated_at')

    paginator = Paginator(all_of_objs, 100) # Show 100 contacts per page

    page = request.GET.get('page')
    context['count'] = paginator.get_page(page)

    result = HttpResponse(template.render(context, request))
    return result

def TypeFormView(request, *args, **kwargs):
    context = {}
    template = loader.get_template('FormManagement/Form-TypeForm.html')

    all_of_objs = ListTypeForm.objects.all().order_by('-updated_at')

    paginator = Paginator(all_of_objs, 100) # Show 100 contacts per page

    page = request.GET.get('page')
    context['count'] = paginator.get_page(page)

    result = HttpResponse(template.render(context, request))
    return result

def HistoryUseAssetFormView(request, *args, **kwargs):
    context = {}
    template = loader.get_template('FormManagement/Form-HistoryUseAsset.html')

    all_of_objs = HistoryUseAsset.objects.all().order_by('-updated_at')

    paginator = Paginator(all_of_objs, 100) # Show 100 contacts per page

    page = request.GET.get('page')
    context['count'] = paginator.get_page(page)
    # context['history'] = HistoryUseAsset.objects.all().order_by('-updated_at')
    result = HttpResponse(template.render(context, request))
    return result


def TimelineHistoryUseAssetFormView(request, pk, *args, **kwargs):
    context = {}
    template = loader.get_template('FormManagement/includes/Form--HistoryUseAssetTimeline.html')

    all_of_objs = HistoryUseAsset.objects.all().order_by('-updated_at')

    paginator = Paginator(all_of_objs, 100) # Show 100 contacts per page

    page = request.GET.get('page')
    context['count'] = paginator.get_page(page)

    # uuid_asset = request.GET.get('uuid_asset', '')
    context['history'] = HistoryUseAsset.objects.filter(asset=pk).order_by('-updated_at')
    # context['uuid_asset'] = uuid_asset
    print(context)
    result = HttpResponse(template.render(context, request))
    return result


def TypeActionFormView(request, *args, **kwargs):
    context = {}
    template = loader.get_template('FormManagement/Form-TypeAction.html')

    all_of_objs = ListTypeForm.objects.all().order_by('-updated_at')

    paginator = Paginator(all_of_objs, 100) # Show 100 contacts per page

    page = request.GET.get('page')
    context['count'] = paginator.get_page(page)

    result = HttpResponse(template.render(context, request))
    return result