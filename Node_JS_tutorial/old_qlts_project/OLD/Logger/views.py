# Create your views here.
import json

from django.template import loader
from django.views.decorators.csrf import csrf_exempt
from django.http import HttpResponse
from django.core.paginator import Paginator
from django.contrib.auth.decorators import login_required
from django.conf import settings

from Workspace.views import AdminWebContext
from Account.models import *

# Create your views here.
from .admin import get_logs, LOG_LIST

from .process_request import process_post

PROFILE_BASE_PATH = "/data/Browsers"
PROFILE_TEMPLATE_PATH = "/data/Browsers/profile-template@oheen.com"

@login_required
def Dashboard(request, *args, **kwargs):
    context = AdminWebContext(request, page_info='Logger:Dashboard', *args, **kwargs)
    if request.method == 'POST':
        more_context = process_post(request)
        if more_context:
            context.update(more_context)
    try:
        context['ENABLE_LOGGER_DB'] = settings.ENABLE_LOGGER_DB
        if settings.ENABLE_LOGGER_DB is True:
            all_logs = get_logs(request)

            context['all_logs'] = all_logs

            if all_logs.count() > 0:
                error_percent = all_logs.count() / all_logs.count() * 100
            else:
                error_percent = 0
            context['error_percent'] = round(error_percent, 2)
        else:
            all_of_logs = LOG_LIST
            context['all_logs'] = all_of_logs
    except Exception as xx:
        print(str(xx))
    template = loader.get_template(str('Logger/%s/admin/dashboard.html' % context['website_template']))
    return HttpResponse(template.render(context, request))

@login_required
def AllLogsView(request, *args, **kwargs):
    context = AdminWebContext(request, page_info='Logger:AllLogsView', *args, **kwargs)
    if request.method == 'POST':
        more_context = process_post(request)
        if more_context:
            context.update(more_context)
        if context['result'] is not None:
            return context['result']
    try:
        context['ENABLE_LOGGER_DB'] = settings.ENABLE_LOGGER_DB
        if settings.ENABLE_LOGGER_DB is True:
            all_of_logs = get_logs(request)[:10000]

            paginator = Paginator(all_of_logs, 200) # Show 100 contacts per page

            page = request.GET.get('page')
            all_logs = paginator.get_page(page)
            context['all_logs'] = all_logs
        else:
            all_of_logs = LOG_LIST
            context['all_logs'] = all_of_logs

    except Exception as xx:
        print(str(xx))
    template = loader.get_template(str('Logger/%s/admin/all_logs.html' % context['website_template']))
    return HttpResponse(template.render(context, request))

@login_required
def AllLogsByAppView(request, slug=None, *args, **kwargs):
    context = AdminWebContext(request, page_info='Logger:AllLogsByAppView', *args, **kwargs)
    if request.method == 'POST':
        more_context = process_post(request)
        if more_context:
            context.update(more_context)
        if context['result'] is not None:
            return context['result']
    if slug == "None":
        slug = None
    context['ENABLE_LOGGER_DB'] = settings.ENABLE_LOGGER_DB
    if settings.ENABLE_LOGGER_DB is True:
        all_of_logs = get_logs(request).filter(app_name=slug)[:10000]

        paginator = Paginator(all_of_logs, 200) # Show 100 contacts per page

        page = request.GET.get('page')
        all_logs = paginator.get_page(page)
        context['all_logs'] = all_logs
    else:
        all_of_logs = LOG_LIST
        context['all_logs'] = all_of_logs

    template = loader.get_template(str('Logger/%s/admin/all_logs.html' % context['website_template']))
    return HttpResponse(template.render(context, request))

@login_required
def AllLogsByClassView(request, slug=None, *args, **kwargs):
    context = AdminWebContext(request, page_info='Logger:AllLogsByClassView', *args, **kwargs)
    if request.method == 'POST':
        more_context = process_post(request)
        if more_context:
            context.update(more_context)
        if context['result'] is not None:
            return context['result']
    if slug == "None":
        slug = None
    context['ENABLE_LOGGER_DB'] = settings.ENABLE_LOGGER_DB
    if settings.ENABLE_LOGGER_DB is True:

        all_of_logs = get_logs(request).filter(class_name=slug)[:10000]

        paginator = Paginator(all_of_logs, 200) # Show 100 contacts per page

        page = request.GET.get('page')
        all_logs = paginator.get_page(page)

        context['all_logs'] = all_logs
    else:
        all_of_logs = LOG_LIST
        context['all_logs'] = all_of_logs
    template = loader.get_template(str('Logger/%s/admin/all_logs.html' % context['website_template']))
    return HttpResponse(template.render(context, request))

@login_required
def AllLogsByFunctionView(request, slug=None, *args, **kwargs):
    context = AdminWebContext(request, page_info='Logger:AllLogsByFunctionView', *args, **kwargs)
    if request.method == 'POST':
        more_context = process_post(request)
        if more_context:
            context.update(more_context)
        if context['result'] is not None:
            return context['result']
    if slug == "None":
        slug = None
    context['ENABLE_LOGGER_DB'] = settings.ENABLE_LOGGER_DB
    if settings.ENABLE_LOGGER_DB is True:

        all_of_logs = get_logs(request).filter(func_name=slug)[:10000]

        paginator = Paginator(all_of_logs, 200) # Show 100 contacts per page

        page = request.GET.get('page')
        all_logs = paginator.get_page(page)

        context['all_logs'] = all_logs
    else:
        all_of_logs = LOG_LIST
        context['all_logs'] = all_of_logs
    template = loader.get_template(str('Logger/%s/admin/all_logs.html' % context['website_template']))
    return HttpResponse(template.render(context, request))

@login_required
def AllLogsByLevelView(request, slug=None, *args, **kwargs):
    context = AdminWebContext(request, page_info='Logger:AllLogsByLevelView', *args, **kwargs)
    if request.method == 'POST':
        more_context = process_post(request)
        if more_context:
            context.update(more_context)
        if context['result'] is not None:
            return context['result']
    if slug == "None":
        slug = None

    context['ENABLE_LOGGER_DB'] = settings.ENABLE_LOGGER_DB
    if settings.ENABLE_LOGGER_DB is True:

        all_of_logs = get_logs(request).filter(level=slug)[:10000]

        paginator = Paginator(all_of_logs, 200) # Show 100 contacts per page

        page = request.GET.get('page')
        all_logs = paginator.get_page(page)

        context['all_logs'] = all_logs
    else:
        all_of_logs = LOG_LIST
        context['all_logs'] = all_of_logs
    template = loader.get_template(str('Logger/%s/admin/all_logs.html' % context['website_template']))
    return HttpResponse(template.render(context, request))

@login_required
def AllLogsByNameView(request, slug=None, *args, **kwargs):
    context = AdminWebContext(request, page_info='Logger:AllLogsView', *args, **kwargs)
    if request.method == 'POST':
        more_context = process_post(request)
        if more_context:
            context.update(more_context)
        if context['result'] is not None:
            return context['result']
    if slug == "None":
        slug = None
    context['ENABLE_LOGGER_DB'] = settings.ENABLE_LOGGER_DB
    if settings.ENABLE_LOGGER_DB is True:

        all_of_logs = get_logs(request).filter(name=slug)[:10000]

        paginator = Paginator(all_of_logs, 200) # Show 100 contacts per page

        page = request.GET.get('page')
        all_logs = paginator.get_page(page)

        context['all_logs'] = all_logs
    else:
        all_of_logs = LOG_LIST
        context['all_logs'] = all_of_logs
    template = loader.get_template(str('Logger/%s/admin/all_logs.html' % context['website_template']))
    return HttpResponse(template.render(context, request))

@login_required
def AllLogsByUserView(request, slug=None, *args, **kwargs):
    context = AdminWebContext(request, page_info='Logger:AllLogsView', *args, **kwargs)
    if request.method == 'POST':
        more_context = process_post(request)
        if more_context:
            context.update(more_context)
        if context['result'] is not None:
            return context['result']
    if slug == "None":
        slug = None
        owner_obj = None
    else:
        owner_obj = Account.objects.filter(username=slug).first()

    if owner_obj is not None:
        context['ENABLE_LOGGER_DB'] = settings.ENABLE_LOGGER_DB
        if settings.ENABLE_LOGGER_DB is True:

            all_of_logs = get_logs(request).filter(owner_tndid=owner_obj.tndid)[:10000]

            paginator = Paginator(all_of_logs, 200) # Show 100 contacts per page

            page = request.GET.get('page')
            all_logs = paginator.get_page(page)

            context['all_logs'] = all_logs
        else:
            all_of_logs = LOG_LIST
            context['all_logs'] = all_of_logs
    template = loader.get_template(str('Logger/%s/admin/all_logs.html' % context['website_template']))
    return HttpResponse(template.render(context, request))

@login_required
def SyslogDashboard(request, *args, **kwargs):
    context = AdminWebContext(request, page_info='Logger:SyslogDashboard', *args, **kwargs)
    if request.method == 'POST':
        more_context = process_post(request)
        if more_context:
            context.update(more_context)
    try:
        context['ENABLE_LOGGER_DB'] = settings.ENABLE_LOGGER_DB
        if settings.ENABLE_LOGGER_DB is True:
            all_logs = get_logs(request)

            context['all_logs'] = all_logs

            if all_logs.count() > 0:
                error_percent = all_logs.count() / all_logs.count() * 100
            else:
                error_percent = 0
            context['error_percent'] = round(error_percent, 2)
        else:
            all_of_logs = LOG_LIST
            context['all_logs'] = all_of_logs
    except Exception as xx:
        print(str(xx))
    template = loader.get_template(str('Logger/%s/admin/dashboard.html' % context['website_template']))
    return HttpResponse(template.render(context, request))

@csrf_exempt
def SyslogListener(request, *args, **kwargs):
    # context = AdminWebContext(request, page_info='Logger:SyslogListener', *args, **kwargs)
    response = {}
    response['result'] = "failed"
    if request.method == 'POST':
        data = request.POST
        print(str(data))
    else:
        print('Method Not accepted!')
    result = HttpResponse(json.dumps(response), content_type="application/json")
    return result