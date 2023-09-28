
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
from Workspace.views import AdminWebContext


# from .models import *

# from .models import *
# from RunningTaskManagement.models import *
# from RunningTaskManagement.models_genaral import *
from .models import *


def Index(request, *args, **kwargs):
    try:
        context = AdminWebContext(request, page_info='Workspace:Index', *args, **kwargs)
    except Exception as xx:
        context = {}
        context['website_template'] = 'gradient'

    template = loader.get_template(str('Workspace/%s/admin/index.html' % context['website_template']))
        
    context['config_count'] = Config.objects.all().count()
        
    context['allapp_count'] = AllApp.objects.all().count()
        
    context['allview_count'] = AllView.objects.all().count()
        
    context['adminmenugroup_count'] = AdminMenuGroup.objects.all().count()
        
    context['alladminmenu_count'] = AllAdminMenu.objects.all().count()
        
    context['position_count'] = Position.objects.all().count()
        
    context['footeritem_count'] = FooterItem.objects.all().count()
        
    context['widget_count'] = Widget.objects.all().count()
        
    context['timezone_count'] = TimeZone.objects.all().count()
        
    context['pageinfo_count'] = PageInfo.objects.all().count()
        
    context['botua_count'] = BotUA.objects.all().count()
        
    context['robotsarg_count'] = RobotsArg.objects.all().count()
        
    context['logoimages_count'] = LogoImages.objects.all().count()
        
    return HttpResponse(template.render(context, request))
    
from .RequestHandler.TConfigRequestHandler import config_post_handle, config_get_handle

@login_required(login_url="/login/")
def ConfigView(request, *args, **kwargs):
    try:
        context = AdminWebContext(request, page_info='Workspace:Config_View', *args, **kwargs)
    except Exception as xx:
        context = {}
        context['website_template'] = 'gradient'

    template = loader.get_template(str('Workspace/%s/admin/Config.html' % context['website_template']))
    if request.method == 'POST':
        more_context = config_post_handle(request)
        if more_context:
            context.update(more_context)

    all_of_objs = Config.objects.all().order_by('-updated_at')

    paginator = Paginator(all_of_objs, 100) # Show 100 contacts per page

    page = request.GET.get('page')
    context['all_configs'] = paginator.get_page(page)

    result = HttpResponse(template.render(context, request))
    return result
            
@login_required(login_url="/login/")
def Config_CreateView(request, *args, **kwargs):
    try:
        context = AdminWebContext(request, page_info='Workspace:ConfigCreateView', *args, **kwargs)
    except Exception as xx:
        context = {}
        context['website_template'] = 'gradient'

    template = loader.get_template(str('Workspace/%s/admin/Config-Create.html' % context['website_template']))
    if request.method == 'POST':
        more_context = config_post_handle(request)
        if more_context:
            context.update(more_context)
    all_of_objs = Config.objects.all().order_by('-updated_at')

    paginator = Paginator(all_of_objs, 100) # Show 100 contacts per page

    page = request.GET.get('page')
    context['all_configs'] = paginator.get_page(page)

    context['current_uuid'] = UUID4()

    result = HttpResponse(template.render(context, request))
    return result
            
@login_required(login_url="/login/")
def Config_DetailView(request, slug, *args, **kwargs):
    try:
        context = AdminWebContext(request, page_info='Workspace:ConfigDetailView', *args, **kwargs)
    except Exception as xx:
        context = {}
        context['website_template'] = 'gradient'

    template = loader.get_template(str('Workspace/%s/admin/Config-Detail.html' % context['website_template']))
    if request.method == 'POST':
        more_context = config_post_handle(request)
        if more_context:
            context.update(more_context)
    all_of_objs = Config.objects.all().order_by('-updated_at')

    paginator = Paginator(all_of_objs, 100) # Show 100 contacts per page

    page = request.GET.get('page')
    context['all_configs'] = paginator.get_page(page)

    try:
        context['current_config'] = Config.objects.filter(uuid=slug).first()
    except Exception as xx:
        print(str(xx))

    result = HttpResponse(template.render(context, request))
    return result
            
@login_required(login_url="/login/")
def Config_EditView(request, slug, *args, **kwargs):
    try:
        context = AdminWebContext(request, page_info='Workspace:ConfigEditView', *args, **kwargs)
    except Exception as xx:
        context = {}
        context['website_template'] = 'gradient'

    template = loader.get_template(str('Workspace/%s/admin/Config-Edit.html' % context['website_template']))
    if request.method == 'POST':
        more_context = config_post_handle(request)
        if more_context:
            context.update(more_context)
    all_of_objs = Config.objects.all().order_by('-updated_at')

    paginator = Paginator(all_of_objs, 100) # Show 100 contacts per page

    page = request.GET.get('page')
    context['all_configs'] = paginator.get_page(page)

    try:
        context['current_config'] = Config.objects.filter(uuid=slug).first()
    except Exception as xx:
        print(str(xx))

    result = HttpResponse(template.render(context, request))
    return result
            
from .RequestHandler.TAllAppRequestHandler import allapp_post_handle, allapp_get_handle

@login_required(login_url="/login/")
def AllAppView(request, *args, **kwargs):
    try:
        context = AdminWebContext(request, page_info='Workspace:AllApp_View', *args, **kwargs)
    except Exception as xx:
        context = {}
        context['website_template'] = 'gradient'

    template = loader.get_template(str('Workspace/%s/admin/AllApp.html' % context['website_template']))
    if request.method == 'POST':
        more_context = allapp_post_handle(request)
        if more_context:
            context.update(more_context)

    all_of_objs = AllApp.objects.all().order_by('-updated_at')

    paginator = Paginator(all_of_objs, 100) # Show 100 contacts per page

    page = request.GET.get('page')
    context['all_allapps'] = paginator.get_page(page)

    result = HttpResponse(template.render(context, request))
    return result
            
@login_required(login_url="/login/")
def AllApp_CreateView(request, *args, **kwargs):
    try:
        context = AdminWebContext(request, page_info='Workspace:AllAppCreateView', *args, **kwargs)
    except Exception as xx:
        context = {}
        context['website_template'] = 'gradient'

    template = loader.get_template(str('Workspace/%s/admin/AllApp-Create.html' % context['website_template']))
    if request.method == 'POST':
        more_context = allapp_post_handle(request)
        if more_context:
            context.update(more_context)
    all_of_objs = AllApp.objects.all().order_by('-updated_at')

    paginator = Paginator(all_of_objs, 100) # Show 100 contacts per page

    page = request.GET.get('page')
    context['all_allapps'] = paginator.get_page(page)

    context['current_uuid'] = UUID4()

    result = HttpResponse(template.render(context, request))
    return result
            
@login_required(login_url="/login/")
def AllApp_DetailView(request, slug, *args, **kwargs):
    try:
        context = AdminWebContext(request, page_info='Workspace:AllAppDetailView', *args, **kwargs)
    except Exception as xx:
        context = {}
        context['website_template'] = 'gradient'

    template = loader.get_template(str('Workspace/%s/admin/AllApp-Detail.html' % context['website_template']))
    if request.method == 'POST':
        more_context = allapp_post_handle(request)
        if more_context:
            context.update(more_context)
    all_of_objs = AllApp.objects.all().order_by('-updated_at')

    paginator = Paginator(all_of_objs, 100) # Show 100 contacts per page

    page = request.GET.get('page')
    context['all_allapps'] = paginator.get_page(page)

    try:
        context['current_allapp'] = AllApp.objects.filter(uuid=slug).first()
    except Exception as xx:
        print(str(xx))

    result = HttpResponse(template.render(context, request))
    return result
            
@login_required(login_url="/login/")
def AllApp_EditView(request, slug, *args, **kwargs):
    try:
        context = AdminWebContext(request, page_info='Workspace:AllAppEditView', *args, **kwargs)
    except Exception as xx:
        context = {}
        context['website_template'] = 'gradient'

    template = loader.get_template(str('Workspace/%s/admin/AllApp-Edit.html' % context['website_template']))
    if request.method == 'POST':
        more_context = allapp_post_handle(request)
        if more_context:
            context.update(more_context)
    all_of_objs = AllApp.objects.all().order_by('-updated_at')

    paginator = Paginator(all_of_objs, 100) # Show 100 contacts per page

    page = request.GET.get('page')
    context['all_allapps'] = paginator.get_page(page)

    try:
        context['current_allapp'] = AllApp.objects.filter(uuid=slug).first()
    except Exception as xx:
        print(str(xx))

    result = HttpResponse(template.render(context, request))
    return result
            
from .RequestHandler.TAllViewRequestHandler import allview_post_handle, allview_get_handle

@login_required(login_url="/login/")
def AllViewView(request, *args, **kwargs):
    try:
        context = AdminWebContext(request, page_info='Workspace:AllView_View', *args, **kwargs)
    except Exception as xx:
        context = {}
        context['website_template'] = 'gradient'

    template = loader.get_template(str('Workspace/%s/admin/AllView.html' % context['website_template']))
    if request.method == 'POST':
        more_context = allview_post_handle(request)
        if more_context:
            context.update(more_context)

    all_of_objs = AllView.objects.all().order_by('-updated_at')

    paginator = Paginator(all_of_objs, 100) # Show 100 contacts per page

    page = request.GET.get('page')
    context['all_allviews'] = paginator.get_page(page)

    result = HttpResponse(template.render(context, request))
    return result
            
@login_required(login_url="/login/")
def AllView_CreateView(request, *args, **kwargs):
    try:
        context = AdminWebContext(request, page_info='Workspace:AllViewCreateView', *args, **kwargs)
    except Exception as xx:
        context = {}
        context['website_template'] = 'gradient'

    template = loader.get_template(str('Workspace/%s/admin/AllView-Create.html' % context['website_template']))
    if request.method == 'POST':
        more_context = allview_post_handle(request)
        if more_context:
            context.update(more_context)
    all_of_objs = AllView.objects.all().order_by('-updated_at')

    paginator = Paginator(all_of_objs, 100) # Show 100 contacts per page

    page = request.GET.get('page')
    context['all_allviews'] = paginator.get_page(page)

    context['current_uuid'] = UUID4()

    result = HttpResponse(template.render(context, request))
    return result
            
@login_required(login_url="/login/")
def AllView_DetailView(request, slug, *args, **kwargs):
    try:
        context = AdminWebContext(request, page_info='Workspace:AllViewDetailView', *args, **kwargs)
    except Exception as xx:
        context = {}
        context['website_template'] = 'gradient'

    template = loader.get_template(str('Workspace/%s/admin/AllView-Detail.html' % context['website_template']))
    if request.method == 'POST':
        more_context = allview_post_handle(request)
        if more_context:
            context.update(more_context)
    all_of_objs = AllView.objects.all().order_by('-updated_at')

    paginator = Paginator(all_of_objs, 100) # Show 100 contacts per page

    page = request.GET.get('page')
    context['all_allviews'] = paginator.get_page(page)

    try:
        context['current_allview'] = AllView.objects.filter(uuid=slug).first()
    except Exception as xx:
        print(str(xx))

    result = HttpResponse(template.render(context, request))
    return result
            
@login_required(login_url="/login/")
def AllView_EditView(request, slug, *args, **kwargs):
    try:
        context = AdminWebContext(request, page_info='Workspace:AllViewEditView', *args, **kwargs)
    except Exception as xx:
        context = {}
        context['website_template'] = 'gradient'

    template = loader.get_template(str('Workspace/%s/admin/AllView-Edit.html' % context['website_template']))
    if request.method == 'POST':
        more_context = allview_post_handle(request)
        if more_context:
            context.update(more_context)
    all_of_objs = AllView.objects.all().order_by('-updated_at')

    paginator = Paginator(all_of_objs, 100) # Show 100 contacts per page

    page = request.GET.get('page')
    context['all_allviews'] = paginator.get_page(page)

    try:
        context['current_allview'] = AllView.objects.filter(uuid=slug).first()
    except Exception as xx:
        print(str(xx))

    result = HttpResponse(template.render(context, request))
    return result
            
from .RequestHandler.TAdminMenuGroupRequestHandler import adminmenugroup_post_handle, adminmenugroup_get_handle

@login_required(login_url="/login/")
def AdminMenuGroupView(request, *args, **kwargs):
    try:
        context = AdminWebContext(request, page_info='Workspace:AdminMenuGroup_View', *args, **kwargs)
    except Exception as xx:
        context = {}
        context['website_template'] = 'gradient'

    template = loader.get_template(str('Workspace/%s/admin/AdminMenuGroup.html' % context['website_template']))
    if request.method == 'POST':
        more_context = adminmenugroup_post_handle(request)
        if more_context:
            context.update(more_context)

    all_of_objs = AdminMenuGroup.objects.all().order_by('-updated_at')

    paginator = Paginator(all_of_objs, 100) # Show 100 contacts per page

    page = request.GET.get('page')
    context['all_adminmenugroups'] = paginator.get_page(page)

    result = HttpResponse(template.render(context, request))
    return result
            
@login_required(login_url="/login/")
def AdminMenuGroup_CreateView(request, *args, **kwargs):
    try:
        context = AdminWebContext(request, page_info='Workspace:AdminMenuGroupCreateView', *args, **kwargs)
    except Exception as xx:
        context = {}
        context['website_template'] = 'gradient'

    template = loader.get_template(str('Workspace/%s/admin/AdminMenuGroup-Create.html' % context['website_template']))
    if request.method == 'POST':
        more_context = adminmenugroup_post_handle(request)
        if more_context:
            context.update(more_context)
    all_of_objs = AdminMenuGroup.objects.all().order_by('-updated_at')

    paginator = Paginator(all_of_objs, 100) # Show 100 contacts per page

    page = request.GET.get('page')
    context['all_adminmenugroups'] = paginator.get_page(page)

    context['current_uuid'] = UUID4()

    result = HttpResponse(template.render(context, request))
    return result
            
@login_required(login_url="/login/")
def AdminMenuGroup_DetailView(request, slug, *args, **kwargs):
    try:
        context = AdminWebContext(request, page_info='Workspace:AdminMenuGroupDetailView', *args, **kwargs)
    except Exception as xx:
        context = {}
        context['website_template'] = 'gradient'

    template = loader.get_template(str('Workspace/%s/admin/AdminMenuGroup-Detail.html' % context['website_template']))
    if request.method == 'POST':
        more_context = adminmenugroup_post_handle(request)
        if more_context:
            context.update(more_context)
    all_of_objs = AdminMenuGroup.objects.all().order_by('-updated_at')

    paginator = Paginator(all_of_objs, 100) # Show 100 contacts per page

    page = request.GET.get('page')
    context['all_adminmenugroups'] = paginator.get_page(page)

    try:
        context['current_adminmenugroup'] = AdminMenuGroup.objects.filter(uuid=slug).first()
    except Exception as xx:
        print(str(xx))

    result = HttpResponse(template.render(context, request))
    return result
            
@login_required(login_url="/login/")
def AdminMenuGroup_EditView(request, slug, *args, **kwargs):
    try:
        context = AdminWebContext(request, page_info='Workspace:AdminMenuGroupEditView', *args, **kwargs)
    except Exception as xx:
        context = {}
        context['website_template'] = 'gradient'

    template = loader.get_template(str('Workspace/%s/admin/AdminMenuGroup-Edit.html' % context['website_template']))
    if request.method == 'POST':
        more_context = adminmenugroup_post_handle(request)
        if more_context:
            context.update(more_context)
    all_of_objs = AdminMenuGroup.objects.all().order_by('-updated_at')

    paginator = Paginator(all_of_objs, 100) # Show 100 contacts per page

    page = request.GET.get('page')
    context['all_adminmenugroups'] = paginator.get_page(page)

    try:
        context['current_adminmenugroup'] = AdminMenuGroup.objects.filter(uuid=slug).first()
    except Exception as xx:
        print(str(xx))

    result = HttpResponse(template.render(context, request))
    return result
            
from .RequestHandler.TAllAdminMenuRequestHandler import alladminmenu_post_handle, alladminmenu_get_handle

@login_required(login_url="/login/")
def AllAdminMenuView(request, *args, **kwargs):
    try:
        context = AdminWebContext(request, page_info='Workspace:AllAdminMenu_View', *args, **kwargs)
    except Exception as xx:
        context = {}
        context['website_template'] = 'gradient'

    template = loader.get_template(str('Workspace/%s/admin/AllAdminMenu.html' % context['website_template']))
    if request.method == 'POST':
        more_context = alladminmenu_post_handle(request)
        if more_context:
            context.update(more_context)

    all_of_objs = AllAdminMenu.objects.all().order_by('-updated_at')

    paginator = Paginator(all_of_objs, 100) # Show 100 contacts per page

    page = request.GET.get('page')
    context['all_alladminmenus'] = paginator.get_page(page)

    result = HttpResponse(template.render(context, request))
    return result
            
@login_required(login_url="/login/")
def AllAdminMenu_CreateView(request, *args, **kwargs):
    try:
        context = AdminWebContext(request, page_info='Workspace:AllAdminMenuCreateView', *args, **kwargs)
    except Exception as xx:
        context = {}
        context['website_template'] = 'gradient'

    template = loader.get_template(str('Workspace/%s/admin/AllAdminMenu-Create.html' % context['website_template']))
    if request.method == 'POST':
        more_context = alladminmenu_post_handle(request)
        if more_context:
            context.update(more_context)
    all_of_objs = AllAdminMenu.objects.all().order_by('-updated_at')

    paginator = Paginator(all_of_objs, 100) # Show 100 contacts per page

    page = request.GET.get('page')
    context['all_alladminmenus'] = paginator.get_page(page)

    context['current_uuid'] = UUID4()

    result = HttpResponse(template.render(context, request))
    return result
            
@login_required(login_url="/login/")
def AllAdminMenu_DetailView(request, slug, *args, **kwargs):
    try:
        context = AdminWebContext(request, page_info='Workspace:AllAdminMenuDetailView', *args, **kwargs)
    except Exception as xx:
        context = {}
        context['website_template'] = 'gradient'

    template = loader.get_template(str('Workspace/%s/admin/AllAdminMenu-Detail.html' % context['website_template']))
    if request.method == 'POST':
        more_context = alladminmenu_post_handle(request)
        if more_context:
            context.update(more_context)
    all_of_objs = AllAdminMenu.objects.all().order_by('-updated_at')

    paginator = Paginator(all_of_objs, 100) # Show 100 contacts per page

    page = request.GET.get('page')
    context['all_alladminmenus'] = paginator.get_page(page)

    try:
        context['current_alladminmenu'] = AllAdminMenu.objects.filter(uuid=slug).first()
    except Exception as xx:
        print(str(xx))

    result = HttpResponse(template.render(context, request))
    return result
            
@login_required(login_url="/login/")
def AllAdminMenu_EditView(request, slug, *args, **kwargs):
    try:
        context = AdminWebContext(request, page_info='Workspace:AllAdminMenuEditView', *args, **kwargs)
    except Exception as xx:
        context = {}
        context['website_template'] = 'gradient'

    template = loader.get_template(str('Workspace/%s/admin/AllAdminMenu-Edit.html' % context['website_template']))
    if request.method == 'POST':
        more_context = alladminmenu_post_handle(request)
        if more_context:
            context.update(more_context)
    all_of_objs = AllAdminMenu.objects.all().order_by('-updated_at')

    paginator = Paginator(all_of_objs, 100) # Show 100 contacts per page

    page = request.GET.get('page')
    context['all_alladminmenus'] = paginator.get_page(page)

    try:
        context['current_alladminmenu'] = AllAdminMenu.objects.filter(uuid=slug).first()
    except Exception as xx:
        print(str(xx))

    result = HttpResponse(template.render(context, request))
    return result
            
from .RequestHandler.TPositionRequestHandler import position_post_handle, position_get_handle

@login_required(login_url="/login/")
def PositionView(request, *args, **kwargs):
    try:
        context = AdminWebContext(request, page_info='Workspace:Position_View', *args, **kwargs)
    except Exception as xx:
        context = {}
        context['website_template'] = 'gradient'

    template = loader.get_template(str('Workspace/%s/admin/Position.html' % context['website_template']))
    if request.method == 'POST':
        more_context = position_post_handle(request)
        if more_context:
            context.update(more_context)

    all_of_objs = Position.objects.all().order_by('-updated_at')

    paginator = Paginator(all_of_objs, 100) # Show 100 contacts per page

    page = request.GET.get('page')
    context['all_positions'] = paginator.get_page(page)

    result = HttpResponse(template.render(context, request))
    return result
            
@login_required(login_url="/login/")
def Position_CreateView(request, *args, **kwargs):
    try:
        context = AdminWebContext(request, page_info='Workspace:PositionCreateView', *args, **kwargs)
    except Exception as xx:
        context = {}
        context['website_template'] = 'gradient'

    template = loader.get_template(str('Workspace/%s/admin/Position-Create.html' % context['website_template']))
    if request.method == 'POST':
        more_context = position_post_handle(request)
        if more_context:
            context.update(more_context)
    all_of_objs = Position.objects.all().order_by('-updated_at')

    paginator = Paginator(all_of_objs, 100) # Show 100 contacts per page

    page = request.GET.get('page')
    context['all_positions'] = paginator.get_page(page)

    context['current_uuid'] = UUID4()

    result = HttpResponse(template.render(context, request))
    return result
            
@login_required(login_url="/login/")
def Position_DetailView(request, slug, *args, **kwargs):
    try:
        context = AdminWebContext(request, page_info='Workspace:PositionDetailView', *args, **kwargs)
    except Exception as xx:
        context = {}
        context['website_template'] = 'gradient'

    template = loader.get_template(str('Workspace/%s/admin/Position-Detail.html' % context['website_template']))
    if request.method == 'POST':
        more_context = position_post_handle(request)
        if more_context:
            context.update(more_context)
    all_of_objs = Position.objects.all().order_by('-updated_at')

    paginator = Paginator(all_of_objs, 100) # Show 100 contacts per page

    page = request.GET.get('page')
    context['all_positions'] = paginator.get_page(page)

    try:
        context['current_position'] = Position.objects.filter(uuid=slug).first()
    except Exception as xx:
        print(str(xx))

    result = HttpResponse(template.render(context, request))
    return result
            
@login_required(login_url="/login/")
def Position_EditView(request, slug, *args, **kwargs):
    try:
        context = AdminWebContext(request, page_info='Workspace:PositionEditView', *args, **kwargs)
    except Exception as xx:
        context = {}
        context['website_template'] = 'gradient'

    template = loader.get_template(str('Workspace/%s/admin/Position-Edit.html' % context['website_template']))
    if request.method == 'POST':
        more_context = position_post_handle(request)
        if more_context:
            context.update(more_context)
    all_of_objs = Position.objects.all().order_by('-updated_at')

    paginator = Paginator(all_of_objs, 100) # Show 100 contacts per page

    page = request.GET.get('page')
    context['all_positions'] = paginator.get_page(page)

    try:
        context['current_position'] = Position.objects.filter(uuid=slug).first()
    except Exception as xx:
        print(str(xx))

    result = HttpResponse(template.render(context, request))
    return result
            
from .RequestHandler.TFooterItemRequestHandler import footeritem_post_handle, footeritem_get_handle

@login_required(login_url="/login/")
def FooterItemView(request, *args, **kwargs):
    try:
        context = AdminWebContext(request, page_info='Workspace:FooterItem_View', *args, **kwargs)
    except Exception as xx:
        context = {}
        context['website_template'] = 'gradient'

    template = loader.get_template(str('Workspace/%s/admin/FooterItem.html' % context['website_template']))
    if request.method == 'POST':
        more_context = footeritem_post_handle(request)
        if more_context:
            context.update(more_context)

    all_of_objs = FooterItem.objects.all().order_by('-updated_at')

    paginator = Paginator(all_of_objs, 100) # Show 100 contacts per page

    page = request.GET.get('page')
    context['all_footeritems'] = paginator.get_page(page)

    result = HttpResponse(template.render(context, request))
    return result
            
@login_required(login_url="/login/")
def FooterItem_CreateView(request, *args, **kwargs):
    try:
        context = AdminWebContext(request, page_info='Workspace:FooterItemCreateView', *args, **kwargs)
    except Exception as xx:
        context = {}
        context['website_template'] = 'gradient'

    template = loader.get_template(str('Workspace/%s/admin/FooterItem-Create.html' % context['website_template']))
    if request.method == 'POST':
        more_context = footeritem_post_handle(request)
        if more_context:
            context.update(more_context)
    all_of_objs = FooterItem.objects.all().order_by('-updated_at')

    paginator = Paginator(all_of_objs, 100) # Show 100 contacts per page

    page = request.GET.get('page')
    context['all_footeritems'] = paginator.get_page(page)

    context['current_uuid'] = UUID4()

    result = HttpResponse(template.render(context, request))
    return result
            
@login_required(login_url="/login/")
def FooterItem_DetailView(request, slug, *args, **kwargs):
    try:
        context = AdminWebContext(request, page_info='Workspace:FooterItemDetailView', *args, **kwargs)
    except Exception as xx:
        context = {}
        context['website_template'] = 'gradient'

    template = loader.get_template(str('Workspace/%s/admin/FooterItem-Detail.html' % context['website_template']))
    if request.method == 'POST':
        more_context = footeritem_post_handle(request)
        if more_context:
            context.update(more_context)
    all_of_objs = FooterItem.objects.all().order_by('-updated_at')

    paginator = Paginator(all_of_objs, 100) # Show 100 contacts per page

    page = request.GET.get('page')
    context['all_footeritems'] = paginator.get_page(page)

    try:
        context['current_footeritem'] = FooterItem.objects.filter(uuid=slug).first()
    except Exception as xx:
        print(str(xx))

    result = HttpResponse(template.render(context, request))
    return result
            
@login_required(login_url="/login/")
def FooterItem_EditView(request, slug, *args, **kwargs):
    try:
        context = AdminWebContext(request, page_info='Workspace:FooterItemEditView', *args, **kwargs)
    except Exception as xx:
        context = {}
        context['website_template'] = 'gradient'

    template = loader.get_template(str('Workspace/%s/admin/FooterItem-Edit.html' % context['website_template']))
    if request.method == 'POST':
        more_context = footeritem_post_handle(request)
        if more_context:
            context.update(more_context)
    all_of_objs = FooterItem.objects.all().order_by('-updated_at')

    paginator = Paginator(all_of_objs, 100) # Show 100 contacts per page

    page = request.GET.get('page')
    context['all_footeritems'] = paginator.get_page(page)

    try:
        context['current_footeritem'] = FooterItem.objects.filter(uuid=slug).first()
    except Exception as xx:
        print(str(xx))

    result = HttpResponse(template.render(context, request))
    return result
            
from .RequestHandler.TWidgetRequestHandler import widget_post_handle, widget_get_handle

@login_required(login_url="/login/")
def WidgetView(request, *args, **kwargs):
    try:
        context = AdminWebContext(request, page_info='Workspace:Widget_View', *args, **kwargs)
    except Exception as xx:
        context = {}
        context['website_template'] = 'gradient'

    template = loader.get_template(str('Workspace/%s/admin/Widget.html' % context['website_template']))
    if request.method == 'POST':
        more_context = widget_post_handle(request)
        if more_context:
            context.update(more_context)

    all_of_objs = Widget.objects.all().order_by('-updated_at')

    paginator = Paginator(all_of_objs, 100) # Show 100 contacts per page

    page = request.GET.get('page')
    context['all_widgets'] = paginator.get_page(page)

    result = HttpResponse(template.render(context, request))
    return result
            
@login_required(login_url="/login/")
def Widget_CreateView(request, *args, **kwargs):
    try:
        context = AdminWebContext(request, page_info='Workspace:WidgetCreateView', *args, **kwargs)
    except Exception as xx:
        context = {}
        context['website_template'] = 'gradient'

    template = loader.get_template(str('Workspace/%s/admin/Widget-Create.html' % context['website_template']))
    if request.method == 'POST':
        more_context = widget_post_handle(request)
        if more_context:
            context.update(more_context)
    all_of_objs = Widget.objects.all().order_by('-updated_at')

    paginator = Paginator(all_of_objs, 100) # Show 100 contacts per page

    page = request.GET.get('page')
    context['all_widgets'] = paginator.get_page(page)

    context['current_uuid'] = UUID4()

    result = HttpResponse(template.render(context, request))
    return result
            
@login_required(login_url="/login/")
def Widget_DetailView(request, slug, *args, **kwargs):
    try:
        context = AdminWebContext(request, page_info='Workspace:WidgetDetailView', *args, **kwargs)
    except Exception as xx:
        context = {}
        context['website_template'] = 'gradient'

    template = loader.get_template(str('Workspace/%s/admin/Widget-Detail.html' % context['website_template']))
    if request.method == 'POST':
        more_context = widget_post_handle(request)
        if more_context:
            context.update(more_context)
    all_of_objs = Widget.objects.all().order_by('-updated_at')

    paginator = Paginator(all_of_objs, 100) # Show 100 contacts per page

    page = request.GET.get('page')
    context['all_widgets'] = paginator.get_page(page)

    try:
        context['current_widget'] = Widget.objects.filter(uuid=slug).first()
    except Exception as xx:
        print(str(xx))

    result = HttpResponse(template.render(context, request))
    return result
            
@login_required(login_url="/login/")
def Widget_EditView(request, slug, *args, **kwargs):
    try:
        context = AdminWebContext(request, page_info='Workspace:WidgetEditView', *args, **kwargs)
    except Exception as xx:
        context = {}
        context['website_template'] = 'gradient'

    template = loader.get_template(str('Workspace/%s/admin/Widget-Edit.html' % context['website_template']))
    if request.method == 'POST':
        more_context = widget_post_handle(request)
        if more_context:
            context.update(more_context)
    all_of_objs = Widget.objects.all().order_by('-updated_at')

    paginator = Paginator(all_of_objs, 100) # Show 100 contacts per page

    page = request.GET.get('page')
    context['all_widgets'] = paginator.get_page(page)

    try:
        context['current_widget'] = Widget.objects.filter(uuid=slug).first()
    except Exception as xx:
        print(str(xx))

    result = HttpResponse(template.render(context, request))
    return result
            
from .RequestHandler.TTimeZoneRequestHandler import timezone_post_handle, timezone_get_handle

@login_required(login_url="/login/")
def TimeZoneView(request, *args, **kwargs):
    try:
        context = AdminWebContext(request, page_info='Workspace:TimeZone_View', *args, **kwargs)
    except Exception as xx:
        context = {}
        context['website_template'] = 'gradient'

    template = loader.get_template(str('Workspace/%s/admin/TimeZone.html' % context['website_template']))
    if request.method == 'POST':
        more_context = timezone_post_handle(request)
        if more_context:
            context.update(more_context)

    all_of_objs = TimeZone.objects.all().order_by('-updated_at')

    paginator = Paginator(all_of_objs, 100) # Show 100 contacts per page

    page = request.GET.get('page')
    context['all_timezones'] = paginator.get_page(page)

    result = HttpResponse(template.render(context, request))
    return result
            
@login_required(login_url="/login/")
def TimeZone_CreateView(request, *args, **kwargs):
    try:
        context = AdminWebContext(request, page_info='Workspace:TimeZoneCreateView', *args, **kwargs)
    except Exception as xx:
        context = {}
        context['website_template'] = 'gradient'

    template = loader.get_template(str('Workspace/%s/admin/TimeZone-Create.html' % context['website_template']))
    if request.method == 'POST':
        more_context = timezone_post_handle(request)
        if more_context:
            context.update(more_context)
    all_of_objs = TimeZone.objects.all().order_by('-updated_at')

    paginator = Paginator(all_of_objs, 100) # Show 100 contacts per page

    page = request.GET.get('page')
    context['all_timezones'] = paginator.get_page(page)

    context['current_uuid'] = UUID4()

    result = HttpResponse(template.render(context, request))
    return result
            
@login_required(login_url="/login/")
def TimeZone_DetailView(request, slug, *args, **kwargs):
    try:
        context = AdminWebContext(request, page_info='Workspace:TimeZoneDetailView', *args, **kwargs)
    except Exception as xx:
        context = {}
        context['website_template'] = 'gradient'

    template = loader.get_template(str('Workspace/%s/admin/TimeZone-Detail.html' % context['website_template']))
    if request.method == 'POST':
        more_context = timezone_post_handle(request)
        if more_context:
            context.update(more_context)
    all_of_objs = TimeZone.objects.all().order_by('-updated_at')

    paginator = Paginator(all_of_objs, 100) # Show 100 contacts per page

    page = request.GET.get('page')
    context['all_timezones'] = paginator.get_page(page)

    try:
        context['current_timezone'] = TimeZone.objects.filter(uuid=slug).first()
    except Exception as xx:
        print(str(xx))

    result = HttpResponse(template.render(context, request))
    return result
            
@login_required(login_url="/login/")
def TimeZone_EditView(request, slug, *args, **kwargs):
    try:
        context = AdminWebContext(request, page_info='Workspace:TimeZoneEditView', *args, **kwargs)
    except Exception as xx:
        context = {}
        context['website_template'] = 'gradient'

    template = loader.get_template(str('Workspace/%s/admin/TimeZone-Edit.html' % context['website_template']))
    if request.method == 'POST':
        more_context = timezone_post_handle(request)
        if more_context:
            context.update(more_context)
    all_of_objs = TimeZone.objects.all().order_by('-updated_at')

    paginator = Paginator(all_of_objs, 100) # Show 100 contacts per page

    page = request.GET.get('page')
    context['all_timezones'] = paginator.get_page(page)

    try:
        context['current_timezone'] = TimeZone.objects.filter(uuid=slug).first()
    except Exception as xx:
        print(str(xx))

    result = HttpResponse(template.render(context, request))
    return result
            
from .RequestHandler.TPageInfoRequestHandler import pageinfo_post_handle, pageinfo_get_handle

@login_required(login_url="/login/")
def PageInfoView(request, *args, **kwargs):
    try:
        context = AdminWebContext(request, page_info='Workspace:PageInfo_View', *args, **kwargs)
    except Exception as xx:
        context = {}
        context['website_template'] = 'gradient'

    template = loader.get_template(str('Workspace/%s/admin/PageInfo.html' % context['website_template']))
    if request.method == 'POST':
        more_context = pageinfo_post_handle(request)
        if more_context:
            context.update(more_context)

    all_of_objs = PageInfo.objects.all().order_by('-updated_at')

    paginator = Paginator(all_of_objs, 100) # Show 100 contacts per page

    page = request.GET.get('page')
    context['all_pageinfos'] = paginator.get_page(page)

    result = HttpResponse(template.render(context, request))
    return result
            
@login_required(login_url="/login/")
def PageInfo_CreateView(request, *args, **kwargs):
    try:
        context = AdminWebContext(request, page_info='Workspace:PageInfoCreateView', *args, **kwargs)
    except Exception as xx:
        context = {}
        context['website_template'] = 'gradient'

    template = loader.get_template(str('Workspace/%s/admin/PageInfo-Create.html' % context['website_template']))
    if request.method == 'POST':
        more_context = pageinfo_post_handle(request)
        if more_context:
            context.update(more_context)
    all_of_objs = PageInfo.objects.all().order_by('-updated_at')

    paginator = Paginator(all_of_objs, 100) # Show 100 contacts per page

    page = request.GET.get('page')
    context['all_pageinfos'] = paginator.get_page(page)

    context['current_uuid'] = UUID4()

    result = HttpResponse(template.render(context, request))
    return result
            
@login_required(login_url="/login/")
def PageInfo_DetailView(request, slug, *args, **kwargs):
    try:
        context = AdminWebContext(request, page_info='Workspace:PageInfoDetailView', *args, **kwargs)
    except Exception as xx:
        context = {}
        context['website_template'] = 'gradient'

    template = loader.get_template(str('Workspace/%s/admin/PageInfo-Detail.html' % context['website_template']))
    if request.method == 'POST':
        more_context = pageinfo_post_handle(request)
        if more_context:
            context.update(more_context)
    all_of_objs = PageInfo.objects.all().order_by('-updated_at')

    paginator = Paginator(all_of_objs, 100) # Show 100 contacts per page

    page = request.GET.get('page')
    context['all_pageinfos'] = paginator.get_page(page)

    try:
        context['current_pageinfo'] = PageInfo.objects.filter(uuid=slug).first()
    except Exception as xx:
        print(str(xx))

    result = HttpResponse(template.render(context, request))
    return result
            
@login_required(login_url="/login/")
def PageInfo_EditView(request, slug, *args, **kwargs):
    try:
        context = AdminWebContext(request, page_info='Workspace:PageInfoEditView', *args, **kwargs)
    except Exception as xx:
        context = {}
        context['website_template'] = 'gradient'

    template = loader.get_template(str('Workspace/%s/admin/PageInfo-Edit.html' % context['website_template']))
    if request.method == 'POST':
        more_context = pageinfo_post_handle(request)
        if more_context:
            context.update(more_context)
    all_of_objs = PageInfo.objects.all().order_by('-updated_at')

    paginator = Paginator(all_of_objs, 100) # Show 100 contacts per page

    page = request.GET.get('page')
    context['all_pageinfos'] = paginator.get_page(page)

    try:
        context['current_pageinfo'] = PageInfo.objects.filter(uuid=slug).first()
    except Exception as xx:
        print(str(xx))

    result = HttpResponse(template.render(context, request))
    return result
            
from .RequestHandler.TBotUARequestHandler import botua_post_handle, botua_get_handle

@login_required(login_url="/login/")
def BotUAView(request, *args, **kwargs):
    try:
        context = AdminWebContext(request, page_info='Workspace:BotUA_View', *args, **kwargs)
    except Exception as xx:
        context = {}
        context['website_template'] = 'gradient'

    template = loader.get_template(str('Workspace/%s/admin/BotUA.html' % context['website_template']))
    if request.method == 'POST':
        more_context = botua_post_handle(request)
        if more_context:
            context.update(more_context)

    all_of_objs = BotUA.objects.all().order_by('-updated_at')

    paginator = Paginator(all_of_objs, 100) # Show 100 contacts per page

    page = request.GET.get('page')
    context['all_botuas'] = paginator.get_page(page)

    result = HttpResponse(template.render(context, request))
    return result
            
@login_required(login_url="/login/")
def BotUA_CreateView(request, *args, **kwargs):
    try:
        context = AdminWebContext(request, page_info='Workspace:BotUACreateView', *args, **kwargs)
    except Exception as xx:
        context = {}
        context['website_template'] = 'gradient'

    template = loader.get_template(str('Workspace/%s/admin/BotUA-Create.html' % context['website_template']))
    if request.method == 'POST':
        more_context = botua_post_handle(request)
        if more_context:
            context.update(more_context)
    all_of_objs = BotUA.objects.all().order_by('-updated_at')

    paginator = Paginator(all_of_objs, 100) # Show 100 contacts per page

    page = request.GET.get('page')
    context['all_botuas'] = paginator.get_page(page)

    context['current_uuid'] = UUID4()

    result = HttpResponse(template.render(context, request))
    return result
            
@login_required(login_url="/login/")
def BotUA_DetailView(request, slug, *args, **kwargs):
    try:
        context = AdminWebContext(request, page_info='Workspace:BotUADetailView', *args, **kwargs)
    except Exception as xx:
        context = {}
        context['website_template'] = 'gradient'

    template = loader.get_template(str('Workspace/%s/admin/BotUA-Detail.html' % context['website_template']))
    if request.method == 'POST':
        more_context = botua_post_handle(request)
        if more_context:
            context.update(more_context)
    all_of_objs = BotUA.objects.all().order_by('-updated_at')

    paginator = Paginator(all_of_objs, 100) # Show 100 contacts per page

    page = request.GET.get('page')
    context['all_botuas'] = paginator.get_page(page)

    try:
        context['current_botua'] = BotUA.objects.filter(uuid=slug).first()
    except Exception as xx:
        print(str(xx))

    result = HttpResponse(template.render(context, request))
    return result
            
@login_required(login_url="/login/")
def BotUA_EditView(request, slug, *args, **kwargs):
    try:
        context = AdminWebContext(request, page_info='Workspace:BotUAEditView', *args, **kwargs)
    except Exception as xx:
        context = {}
        context['website_template'] = 'gradient'

    template = loader.get_template(str('Workspace/%s/admin/BotUA-Edit.html' % context['website_template']))
    if request.method == 'POST':
        more_context = botua_post_handle(request)
        if more_context:
            context.update(more_context)
    all_of_objs = BotUA.objects.all().order_by('-updated_at')

    paginator = Paginator(all_of_objs, 100) # Show 100 contacts per page

    page = request.GET.get('page')
    context['all_botuas'] = paginator.get_page(page)

    try:
        context['current_botua'] = BotUA.objects.filter(uuid=slug).first()
    except Exception as xx:
        print(str(xx))

    result = HttpResponse(template.render(context, request))
    return result
            
from .RequestHandler.TRobotsArgRequestHandler import robotsarg_post_handle, robotsarg_get_handle

@login_required(login_url="/login/")
def RobotsArgView(request, *args, **kwargs):
    try:
        context = AdminWebContext(request, page_info='Workspace:RobotsArg_View', *args, **kwargs)
    except Exception as xx:
        context = {}
        context['website_template'] = 'gradient'

    template = loader.get_template(str('Workspace/%s/admin/RobotsArg.html' % context['website_template']))
    if request.method == 'POST':
        more_context = robotsarg_post_handle(request)
        if more_context:
            context.update(more_context)

    all_of_objs = RobotsArg.objects.all().order_by('-updated_at')

    paginator = Paginator(all_of_objs, 100) # Show 100 contacts per page

    page = request.GET.get('page')
    context['all_robotsargs'] = paginator.get_page(page)

    result = HttpResponse(template.render(context, request))
    return result
            
@login_required(login_url="/login/")
def RobotsArg_CreateView(request, *args, **kwargs):
    try:
        context = AdminWebContext(request, page_info='Workspace:RobotsArgCreateView', *args, **kwargs)
    except Exception as xx:
        context = {}
        context['website_template'] = 'gradient'

    template = loader.get_template(str('Workspace/%s/admin/RobotsArg-Create.html' % context['website_template']))
    if request.method == 'POST':
        more_context = robotsarg_post_handle(request)
        if more_context:
            context.update(more_context)
    all_of_objs = RobotsArg.objects.all().order_by('-updated_at')

    paginator = Paginator(all_of_objs, 100) # Show 100 contacts per page

    page = request.GET.get('page')
    context['all_robotsargs'] = paginator.get_page(page)

    context['current_uuid'] = UUID4()

    result = HttpResponse(template.render(context, request))
    return result
            
@login_required(login_url="/login/")
def RobotsArg_DetailView(request, slug, *args, **kwargs):
    try:
        context = AdminWebContext(request, page_info='Workspace:RobotsArgDetailView', *args, **kwargs)
    except Exception as xx:
        context = {}
        context['website_template'] = 'gradient'

    template = loader.get_template(str('Workspace/%s/admin/RobotsArg-Detail.html' % context['website_template']))
    if request.method == 'POST':
        more_context = robotsarg_post_handle(request)
        if more_context:
            context.update(more_context)
    all_of_objs = RobotsArg.objects.all().order_by('-updated_at')

    paginator = Paginator(all_of_objs, 100) # Show 100 contacts per page

    page = request.GET.get('page')
    context['all_robotsargs'] = paginator.get_page(page)

    try:
        context['current_robotsarg'] = RobotsArg.objects.filter(uuid=slug).first()
    except Exception as xx:
        print(str(xx))

    result = HttpResponse(template.render(context, request))
    return result
            
@login_required(login_url="/login/")
def RobotsArg_EditView(request, slug, *args, **kwargs):
    try:
        context = AdminWebContext(request, page_info='Workspace:RobotsArgEditView', *args, **kwargs)
    except Exception as xx:
        context = {}
        context['website_template'] = 'gradient'

    template = loader.get_template(str('Workspace/%s/admin/RobotsArg-Edit.html' % context['website_template']))
    if request.method == 'POST':
        more_context = robotsarg_post_handle(request)
        if more_context:
            context.update(more_context)
    all_of_objs = RobotsArg.objects.all().order_by('-updated_at')

    paginator = Paginator(all_of_objs, 100) # Show 100 contacts per page

    page = request.GET.get('page')
    context['all_robotsargs'] = paginator.get_page(page)

    try:
        context['current_robotsarg'] = RobotsArg.objects.filter(uuid=slug).first()
    except Exception as xx:
        print(str(xx))

    result = HttpResponse(template.render(context, request))
    return result
            
from .RequestHandler.TLogoImagesRequestHandler import logoimages_post_handle, logoimages_get_handle

@login_required(login_url="/login/")
def LogoImagesView(request, *args, **kwargs):
    try:
        context = AdminWebContext(request, page_info='Workspace:LogoImages_View', *args, **kwargs)
    except Exception as xx:
        context = {}
        context['website_template'] = 'gradient'

    template = loader.get_template(str('Workspace/%s/admin/LogoImages.html' % context['website_template']))
    if request.method == 'POST':
        more_context = logoimages_post_handle(request)
        if more_context:
            context.update(more_context)

    all_of_objs = LogoImages.objects.all().order_by('-updated_at')

    paginator = Paginator(all_of_objs, 100) # Show 100 contacts per page

    page = request.GET.get('page')
    context['all_logoimagess'] = paginator.get_page(page)

    result = HttpResponse(template.render(context, request))
    return result
            
@login_required(login_url="/login/")
def LogoImages_CreateView(request, *args, **kwargs):
    try:
        context = AdminWebContext(request, page_info='Workspace:LogoImagesCreateView', *args, **kwargs)
    except Exception as xx:
        context = {}
        context['website_template'] = 'gradient'

    template = loader.get_template(str('Workspace/%s/admin/LogoImages-Create.html' % context['website_template']))
    if request.method == 'POST':
        more_context = logoimages_post_handle(request)
        if more_context:
            context.update(more_context)
    all_of_objs = LogoImages.objects.all().order_by('-updated_at')

    paginator = Paginator(all_of_objs, 100) # Show 100 contacts per page

    page = request.GET.get('page')
    context['all_logoimagess'] = paginator.get_page(page)

    context['current_uuid'] = UUID4()

    result = HttpResponse(template.render(context, request))
    return result
            
@login_required(login_url="/login/")
def LogoImages_DetailView(request, slug, *args, **kwargs):
    try:
        context = AdminWebContext(request, page_info='Workspace:LogoImagesDetailView', *args, **kwargs)
    except Exception as xx:
        context = {}
        context['website_template'] = 'gradient'

    template = loader.get_template(str('Workspace/%s/admin/LogoImages-Detail.html' % context['website_template']))
    if request.method == 'POST':
        more_context = logoimages_post_handle(request)
        if more_context:
            context.update(more_context)
    all_of_objs = LogoImages.objects.all().order_by('-updated_at')

    paginator = Paginator(all_of_objs, 100) # Show 100 contacts per page

    page = request.GET.get('page')
    context['all_logoimagess'] = paginator.get_page(page)

    try:
        context['current_logoimages'] = LogoImages.objects.filter(uuid=slug).first()
    except Exception as xx:
        print(str(xx))

    result = HttpResponse(template.render(context, request))
    return result
            
@login_required(login_url="/login/")
def LogoImages_EditView(request, slug, *args, **kwargs):
    try:
        context = AdminWebContext(request, page_info='Workspace:LogoImagesEditView', *args, **kwargs)
    except Exception as xx:
        context = {}
        context['website_template'] = 'gradient'

    template = loader.get_template(str('Workspace/%s/admin/LogoImages-Edit.html' % context['website_template']))
    if request.method == 'POST':
        more_context = logoimages_post_handle(request)
        if more_context:
            context.update(more_context)
    all_of_objs = LogoImages.objects.all().order_by('-updated_at')

    paginator = Paginator(all_of_objs, 100) # Show 100 contacts per page

    page = request.GET.get('page')
    context['all_logoimagess'] = paginator.get_page(page)

    try:
        context['current_logoimages'] = LogoImages.objects.filter(uuid=slug).first()
    except Exception as xx:
        print(str(xx))

    result = HttpResponse(template.render(context, request))
    return result
            