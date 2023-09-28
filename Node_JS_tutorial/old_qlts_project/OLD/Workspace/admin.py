# System imports
######################################

# ML imports
######################################

# Django imports
######################################
from django.contrib import admin
from django.urls import URLPattern, URLResolver

from import_export import resources
from import_export.admin import ImportExportModelAdmin
from django.utils.translation import gettext_lazy as _
from .admin_actions import *
# Other apps imports
######################################

from .tnd_tools import get_user_from_session

from django.conf import settings
from django.apps import apps
############################################################################
from .models import Config
import django

if django.VERSION[0] >= 4:
    @admin.action(description='Disable Selected')
    def disable_selected(modeladmin, request, queryset):
        selected = queryset
        for obj in selected:
            obj.in_main_menu = False
            obj.save()
else:
    def disable_selected(modeladmin, request, queryset):
        selected = queryset
        for obj in selected:
            obj.in_main_menu = False
            obj.save()
    disable_selected.description = 'Disable Selected'

if django.VERSION[0] >= 4:
    @admin.action(description='Enable Selected')
    def enable_selected(modeladmin, request, queryset):
        selected = queryset
        for obj in selected:
            obj.in_main_menu = True
            obj.save()
else:
    def enable_selected(modeladmin, request, queryset):
        selected = queryset
        for obj in selected:
            obj.in_main_menu = True
            obj.save()
    enable_selected.description = 'Enable Selected'

if django.VERSION[0] >= 4:
    @admin.action(description='Deactive Selected')
    def deactive_selected(modeladmin, request, queryset):
        selected = queryset
        for obj in selected:
            obj.active = False
            obj.save()
else:
    def deactive_selected(modeladmin, request, queryset):
        selected = queryset
        for obj in selected:
            obj.active = False
            obj.save()
    deactive_selected.description = 'Deactive Selected'

if django.VERSION[0] >= 4:
    @admin.action(description='Active Selected')
    def active_selected(modeladmin, request, queryset):
        selected = queryset
        for obj in selected:
            obj.active = False
            obj.save()
else:
    def active_selected(modeladmin, request, queryset):
        selected = queryset
        for obj in selected:
            obj.active = False
            obj.save()
    active_selected.description = 'Active Selected'

class ConfigResource(resources.ModelResource):
    class Meta:
        model = Config


class ConfigAdmin(ImportExportModelAdmin):
    resource_class = ConfigResource
    list_display = ('uuid',
                    'name',
                    'value',
                    'active',
                    'default',
                    'updated_at',
                    'created_at',)
    actions = [export_selected_objects, make_inactive, make_active]


admin.site.register(Config, ConfigAdmin)

############################################################################

############################################################################
from .models import AllApp


class AllAppResource(resources.ModelResource):
    class Meta:
        model = AllApp
        # fields = ('name', 'uuid', 'owner')
        # exclude = ('num_of_image', 'num_of_ranges', 'created_at', 'updated_at')
        fields = ('uuid',
                  'name',
                  'url',
                  'short_name',
                  'url',

                  'is_product',
                  'order',

                  'active',
                  'demo_mode',
                  'updated_at',
                  'created_at',
                  )

class AllAppAdmin(ImportExportModelAdmin):
    resource_class = AllAppResource

    list_display = ('uuid',
                    'name',
                    'url',
                    'thumbnail',
                    'is_product',
                    'active',
                    'updated_at',
                    'created_at')
    fields = ('name',
              'uuid',
              'short_name',
              'url',
              'href_target',
              'icon',
              'icon_base64',
              'active',
              'is_product',
              'staff_only',
              'admin_only',
              'order',
              'demo_mode',
              'updated_at',
              'created_at')
    # fields = ( 'icon', )
    readonly_fields = ('thumbnail',
                       'uuid',
                       'updated_at',
                       'created_at',)

    search_fields = [
        'name',
        'uuid',
        'title',
    ]
    date_hierarchy = 'updated_at'
    ordering = (
        'updated_at',
    )
    autocomplete_fields = [

    ]


admin.site.register(AllApp, AllAppAdmin)

############################################################################

############################################################################
from .models import AllView


class AllViewResource(resources.ModelResource):
    class Meta:
        model = AllView
        # fields = ('name', 'uuid', 'owner')
        # exclude = ('num_of_image', 'num_of_ranges', 'created_at', 'updated_at')


class AllViewAdmin(ImportExportModelAdmin):
    resource_class = AllViewResource
    list_display = ('name',
                    'pattern',
                    'created_at',
                    'updated_at')


admin.site.register(AllView, AllViewAdmin)
############################################################################

# ############################################################################
# from .models import FrontMenuGroup
#
#
# class FrontMenuGroupResource(resources.ModelResource):
#     class Meta:
#         model = FrontMenuGroup
#         # fields = ('name', 'uuid', 'owner')
#         # exclude = ('num_of_image', 'num_of_ranges', 'created_at', 'updated_at')
#
#
# class FrontMenuGroupAdmin(ImportExportModelAdmin):
#     resource_class = FrontMenuGroupResource
#     list_display = ('name',
#                     'created_at',
#                     'updated_at')
#
#
# admin.site.register(FrontMenuGroup, FrontMenuGroupAdmin)
#
#
# ############################################################################
#
# ############################################################################
# from .models import FrontMenu
#
#
# class FrontMenuResource(resources.ModelResource):
#     class Meta:
#         model = FrontMenu
#         # fields = ('name', 'uuid', 'owner')
#         # exclude = ('num_of_image', 'num_of_ranges', 'created_at', 'updated_at')
#
#
# class FrontMenuAdmin(ImportExportModelAdmin):
#     resource_class = FrontMenuResource
#     list_display = ('name',
#                     'created_at',
#                     'updated_at')
#
#
# admin.site.register(FrontMenu, FrontMenuAdmin)

############################################################################

############################################################################
from .models import AdminMenuGroup


class AdminMenuGroupResource(resources.ModelResource):
    class Meta:
        model = AdminMenuGroup
        fields = (
            'name',
            'uuid',
            'id',
            'title',
            'icon_class',
            'desc',
            'order',
            'active',
            'is_base',
            'staff_only',
            'superuser_only',
            'created_at',
        )
        # exclude = ('num_of_image', 'num_of_ranges', 'created_at', 'updated_at')


class AdminMenuGroupAdmin(ImportExportModelAdmin):
    resource_class = AdminMenuGroupResource
    list_display = ('name',
                    'uuid',
                    'title',
                    'app',
                    'active',
                    'count_menu',
                    'menus_list',
                    'icon_preview',
                    'order',
                    'created_at',
                    'updated_at')
    fieldsets = (
        (None, {
            'fields': ('uuid',
                       'name',
                       'title',
                       ('icon_preview', 'icon_class',),
                       ('order',),
                       ('app', 'related_apps',),
                       )
        }),
        ('Advanced options', {
            'classes': ('collapse',),
            'fields': (
                'desc',
                ('active', 'staff_only', 'superuser_only',),
                ('updated_at', 'created_at',),
            ),
        }),
    )
    actions = [
        active_selected,
        deactive_selected,
    ]
    #
    readonly_fields = (
        'menus_list',
        'uuid',
        'icon_preview',
        'updated_at',
        'created_at',
    )
    search_fields = [
        'name',
        'uuid',
        'title',
    ]
    date_hierarchy = 'updated_at'
    ordering = (
        'updated_at',
    )
    autocomplete_fields = [
    ]

    class Media:
        js = ('Workspace/admin/fontawesome/js/all.js',)
        css = {
            'all': ('Workspace/admin/fontawesome/css/all.css',)
        }


admin.site.register(AdminMenuGroup, AdminMenuGroupAdmin)

from .models import AllAdminMenu


class AllAdminMenuResource(resources.ModelResource):
    class Meta:
        model = AllAdminMenu
        fields = (
            'name',
            'uuid',
            'title',
            'icon_class',
            'data_feather',
            'url',
            'desc',
            'order',
            'in_main_menu',
            'menu_group',
            'parent_menu',
            'login_redirect',
            'split_marked',
            'split_label',
            'active',
            'is_base',
            'staff_only',
            'superuser_only',
            'created_at',
        )


class AllAdminMenuAdmin(ImportExportModelAdmin):
    resource_class = AllAdminMenuResource
    list_display = ('name',
                    'uuid',
                    'title',
                    'sub_menus_list',
                    'url',
                    'order',
                    # 'menu_group',
                    # 'parent_menu',
                    'icon_preview',
                    'in_main_menu',
                    'staff_only',
                    'superuser_only',
                    'active',
                    'created_at',
                    'updated_at')

    actions = [
        enable_selected,
        disable_selected,
        active_selected,
        deactive_selected,
    ]
    fieldsets = (
        (None, {
            'fields': ('uuid',
                       'name',
                       'title',
                       ('url', 'login_redirect',),
                       'parent_menu',
                       ('menu_group', 'in_main_menu',),
                       ('data_feather'),
                       ('icon_preview', 'icon_class',),
                       'icon',
                       ('order',),
                       )
        }),
        ('Advanced options', {
            'classes': ('collapse',),
            'fields': (
                'icon_base64_short',
                'desc',
                ('active', 'staff_only', 'superuser_only',),
                ('split_marked', 'split_label',),
                ('updated_at', 'created_at',),
            ),
        }),
    )

    readonly_fields = (
        'sub_menus_list',
        'uuid',
        'icon_base64_short',
        'icon_preview',
        'updated_at',
        'created_at',
    )
    search_fields = [
        'name',
        'uuid',
        'title',
        'menu_group__name',
    ]

    date_hierarchy = 'updated_at'
    ordering = (
        'updated_at',
    )
    autocomplete_fields = (
        # 'menu_group',
    )

    class Media:
        js = (
            'Workspace/admin/fontawesome/js/all.js',
            'Workspace/admin/js/jquery-3.5.1.min.js',
        )
        css = {
            'all': ('Workspace/admin/fontawesome/css/all.css',)
        }

    def icon_base64_short(self, obj):
        if obj.icon_base64 is not None:
            return obj.icon_base64[:500]
        else:
            return None


admin.site.register(AllAdminMenu, AllAdminMenuAdmin)

############################################################################


############################################################################
from .models import Position


class PositionResource(resources.ModelResource):
    class Meta:
        model = Position
        # fields = ('name', 'uuid', 'owner')
        # exclude = ('num_of_image', 'num_of_ranges', 'created_at', 'updated_at')


class PositionAdmin(ImportExportModelAdmin):
    resource_class = PositionResource
    list_display = ('name',
                    'created_at',
                    'updated_at')


admin.site.register(Position, PositionAdmin)

############################################################################


############################################################################
from django.contrib.sessions.models import Session


class SessionResource(resources.ModelResource):
    class Meta:
        model = Session
        # fields = ('name', 'uuid', 'owner')
        # exclude = ('num_of_image', 'num_of_ranges', 'created_at', 'updated_at')


class SessionAdmin(ImportExportModelAdmin):
    resource_class = SessionResource
    list_display = ('session_user',
                    'expire_date',
                    'session_key',
                    'session_ip',
                    'session_data',)

    def session_ip(self, instance):
        result = ""
        return result

    def session_user(self, instance):
        return get_user_from_session(instance.session_key)


admin.site.register(Session, SessionAdmin)

############################################################################
from .models import FooterItem


class FooterItemResource(resources.ModelResource):
    class Meta:
        model = FooterItem
        # fields = ('name', 'uuid', 'owner')
        # exclude = ('num_of_image', 'num_of_ranges', 'created_at', 'updated_at')


class FooterItemAdmin(ImportExportModelAdmin):
    resource_class = FooterItemResource
    list_display = ('name',
                    'created_at',
                    'updated_at')


admin.site.register(FooterItem, FooterItemAdmin)

from .models import Widget


class WidgetResource(resources.ModelResource):
    class Meta:
        model = Widget
        # fields = ('name', 'uuid', 'owner')
        # exclude = ('num_of_image', 'num_of_ranges', 'created_at', 'updated_at')


class WidgetAdmin(ImportExportModelAdmin):
    resource_class = WidgetResource
    list_display = ('name',
                    'created_at',
                    'updated_at')


admin.site.register(Widget, WidgetAdmin)

############################################################################

from .models import PageInfo


class PageInfoResource(resources.ModelResource):
    class Meta:
        model = PageInfo
        # fields = ('name', 'uuid', 'owner')
        # exclude = ('num_of_image', 'num_of_ranges', 'created_at', 'updated_at')


class PageInfoAdmin(ImportExportModelAdmin):
    resource_class = PageInfoResource
    list_display = ('name',
                    'title',
                    'header',
                    'meta_description',
                    'meta_keywords',
                    'created_at',
                    'updated_at')


admin.site.register(PageInfo, PageInfoAdmin)

from .models import BotUA


class BotUAResource(resources.ModelResource):
    class Meta:
        model = BotUA
        # fields = ('name', 'uuid', 'owner')
        # exclude = ('num_of_image', 'num_of_ranges', 'created_at', 'updated_at')


class BotUAAdmin(ImportExportModelAdmin):
    resource_class = BotUAResource
    list_display = ('name',
                    'created_at',
                    'updated_at')


admin.site.register(BotUA, BotUAAdmin)

############################################################################
from .models import RobotsArg


class RobotsArgResource(resources.ModelResource):
    class Meta:
        model = RobotsArg
        # fields = ('name', 'uuid', 'owner')
        # exclude = ('num_of_image', 'num_of_ranges', 'created_at', 'updated_at')


class RobotsArgAdmin(ImportExportModelAdmin):
    resource_class = RobotsArgResource
    list_display = ('name',
                    'created_at',
                    'updated_at')


admin.site.register(RobotsArg, RobotsArgAdmin)

############################################################################
from .models import LogoImages


class LogoImagesResource(resources.ModelResource):
    class Meta:
        model = LogoImages


class LogoImagesAdmin(ImportExportModelAdmin):
    resource_class = LogoImagesResource
    list_display = ('uuid',
                    'name',
                    'file',
                    'desc',
                    'is_favicon',
                    'updated_at',
                    'created_at',)


admin.site.register(LogoImages, LogoImagesAdmin)


############################################################################

def gen_all_model_name():
    return (apps.get_models())


def gen_all_app_name():
    app_names = []
    for app in settings.INSTALLED_APPS:
        temp_name = app.split('.')[0]
        # print('temp_name = %s' % temp_name)
        app_names.append(temp_name)
        try:
            checker = AllApp.objects.filter(name=temp_name).first()
            if checker is None:
                AllApp.objects.create(name=temp_name)
                print('Created: %s' % temp_name)
            else:
                print('Existed: %s' % temp_name)
        except Exception as xx:
            print('Can not add app name: %s ERROR: %s' % (temp_name, str(xx)))


def clean_all_app_name():
    app_names = []
    for tmp in settings.INSTALLED_APPS:
        temp_name = tmp.split('.')[0]
        app_names.append(temp_name)

    for app in AllApp.objects.all():
        if app.name not in app_names:
            try:
                # print('App not existing: %s' % app.name)
                app.delete()
                print('Deleted appname: %s' % (app.name))
            except Exception as xx:
                print('Can not delete app name: %s ERROR: %s' % (app.name, str(xx)))


def get_all_view():
    all_urlpatterns = __import__(settings.ROOT_URLCONF).urls.urlpatterns
    detail_views_list = []

    # URLPattern, URLResolver
    def get_all_view_names(urlpatterns):
        for pattern in urlpatterns:
            if isinstance(pattern, URLResolver):
                get_all_view_names(pattern.url_patterns)
            elif isinstance(pattern, URLPattern):
                tmp = {}
                print('pattern.callback.__name__ = %s' % pattern.callback.__name__)
                tmp['name'] = pattern.callback.__name__
                print('pattern.pattern = %s' % pattern.pattern)
                tmp['pattern'] = pattern.pattern
                detail_views_list.append(tmp)

    get_all_view_names(all_urlpatterns)
    all_views_list = []

    # remove redundant entries and specific ones we don't care about
    print('====================================')
    print('======= CURRENT VIEW LIST ==========')

    for each in detail_views_list:
        if each['name'] not in "serve add_view change_view changelist_view history_view delete_view RedirectView":
            if each['name'] not in all_views_list:
                print('View: %s' % each)
                all_views_list.append(each)
    print('====================================')

    return all_views_list


def update_all_view():
    all_views = get_all_view()
    for view_name in all_views:
        try:
            checker = AllView.objects.filter(name=view_name['name']).first()
            if checker is None:
                AllView.objects.create(name=view_name['name'],
                                       pattern=view_name['pattern'])
                print('Created: %s' % view_name['name'])
            else:
                print('Existed: %s' % view_name['name'])
                AllView.objects.filter(name=view_name['name']).update(pattern=view_name['pattern'])
                print('Updated pattern: %s' % view_name['name'])
        except Exception as xx:
            print('Can not create view name: %s ERROR: %s' % (view_name['name'], str(xx)))


def clean_all_view():
    all_views = get_all_view()
    all_viewnames = []
    for tmp in all_views:
        all_viewnames.append(tmp['name'])

    for view_obj in AllView.objects.all():
        if view_obj.name not in all_viewnames:
            try:
                print(view_obj.name)
            except Exception as xx:
                print('Can not delete view name: %s ERROR: %s' % (view_obj.name, str(xx)))

from .Tadmin import *
