from django.shortcuts import render
from django.template import loader
from django.views.generic import TemplateView

from django.core.paginator import Paginator
from django.contrib.auth.decorators import login_required
from uuid import uuid4 as UUID4
from .models import ProposalForm
from .models import ProposalFormType  
# thay ProposalFormType = ListType
from .models import ProposalFormStatus
from .models import AssetList
from .models import List
from .models import ListType
# from .models import ProposalProcessConfig
from django.http import HttpResponse


# Create your views here.
def Index(request, *args, **kwargs):
    context = {}
    template = loader.get_template('ProposalForm/index.html')
    context['count'] = ProposalForm.objects.all().count()
    return HttpResponse(template.render(context, request))


# List
@login_required(login_url="/Account/signin/")
def ListView(request, *args, **kwargs):
    context = {}

    template = loader.get_template('ProposalForm/arrgon/admin/List.html')

    all_of_objs = List.objects.all().order_by('list')

    paginator = Paginator(all_of_objs, 100) # Show 100 contacts per page

    page = request.GET.get('page')
    
    context['count'] = paginator.get_page(page)

    # result = HttpResponse()
    result = HttpResponse(template.render(context, request))
    return result


# ProposalForm
@login_required(login_url="/Account/signin/")
def ProposalFormView(request, *args, **kwargs):
    context = {}

    template = loader.get_template('ProposalForm/arrgon/admin/ProposalForm.html')

    all_of_objs = ProposalForm.objects.all().order_by('-updated_at')

    paginator = Paginator(all_of_objs, 100) # Show 100 contacts per page

    page = request.GET.get('page')

    context['count'] = paginator.get_page(page)

    result = HttpResponse(template.render(context, request))
    return result


# ProposalFormType
@login_required(login_url="/Account/signin/")
def ProposalFormTypeView(request, *args, **kwargs):
    context = {}

    template = loader.get_template('ProposalForm/arrgon/admin/ProposalFormType.html')

    all_of_objs = ListType.objects.all().order_by('-updated_at')

    paginator = Paginator(all_of_objs, 5) # Show 100 contacts per page

    page = request.GET.get('page')
    context['count'] = paginator.get_page(page)

    result = HttpResponse(template.render(context, request))
    return result


# ProposalFormStatus
@login_required(login_url="/Account/signin/")
def ProposalFormStatusView(request, *args, **kwargs):
    context = {}

    template = loader.get_template('ProposalForm/arrgon/admin/ProposalFormStatus.html')

    all_of_objs = ProposalFormStatus.objects.all().order_by('-updated_at')

    paginator = Paginator(all_of_objs, 100) # Show 100 contacts per page

    page = request.GET.get('page')
    
    context['count'] = paginator.get_page(page)

    result = HttpResponse(template.render(context, request))
    return result


# AssetList
@login_required(login_url="/Account/signin/")
def AssetListView(request, *args, **kwargs):
    context = {}

    template = loader.get_template('ProposalForm/arrgon/admin/AssetList.html')

    all_of_objs = AssetList.objects.all().order_by('-updated_at')

    paginator = Paginator(all_of_objs, 100) # Show 100 contacts per page

    page = request.GET.get('page')
    
    context['count'] = paginator.get_page(page)

    result = HttpResponse(template.render(context, request))
    return result



# -----------------------------------------------------------------------------
# ProposalProcessConfig
# @login_required(login_url="/Account/signin/")
# def ProposalProcessConfigView(request, *args, **kwargs):
#     context = {}

#     template = loader.get_template('ProposalForm/arrgon/admin/ProposalProcessConfig.html')

#     all_of_objs = ProposalProcessConfig.objects.all().order_by('-updated_at')

#     paginator = Paginator(all_of_objs, 100) # Show 100 contacts per page

#     page = request.GET.get('page')
    
#     context['count'] = paginator.get_page(page)

#     result = HttpResponse(template.render(context, request))
#     return result



