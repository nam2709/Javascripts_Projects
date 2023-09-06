
# #!/usr/bin/env python
# # -*- coding: utf-8 -*-
# #region Description
# __author__ = 'TruongNV - NGUYEN VAN TRUONG'
# __copyright__ = "Copyright ©2022 TruongNV <truongg.nv@gmail.com>"
# __maintainer__ = "TruongNV"
# __email__ = "truongg.nv@gmail.com"
# __status__ = "Production"
# __date__ = 4 / 20 / 21
# #endregion
# # __init__.py

# from django.contrib import admin
# from import_export import fields, resources
# from import_export.widgets import ForeignKeyWidget
# from import_export.admin import ImportExportModelAdmin
# from django.utils.html import format_html
# # from .models import *

# # from .models import *
# # from RunningTaskManagement.models import *
# # from RunningTaskManagement.models_genaral import *
# from .models import *


# class ConfigResource(resources.ModelResource):
#     # uuid_field = fields.Field(
#     #     column_name='uuid',
#     #     attribute='uuid',
#     #     widget=ForeignKeyWidget(
#     #         Config,
#     #         'uuid',
#     #         )
#     #     )
#     class Meta:
#         # fields = (
#         #     'uuid_field',
#         # )
#         model = Config

# class ConfigAdmin(ImportExportModelAdmin):
#     resource_class = ConfigResource
#     list_display = (
#         'name',
#         # 'image',
#         'uuid',
#         'created_at',
#         'updated_at',
#     )
#     search_fields = ('name',
#         # 'image',
#         'uuid',
#      )
#     fieldsets = (
#         (None, {
#             'fields': (
#             'name',
#             'uuid',
#             )
#         }),
#         ('Advanced options', {
#             'classes': ('collapse',),
#             'fields': (
            
#                 'value',
                    
#                 'active',
                    
#                 'default',
                    
#                 'updated_at',
#                 'created_at',
#             ),
#             # 'fields': ('registration_required', 'template_name'),
#         }),
#     )
#     list_display_links = (
#         'name',
#     )
#     date_hierarchy = 'updated_at'
#     ordering = (
#         'updated_at',
#     )
#     readonly_fields = (
#         'uuid',
#         'created_at',
#         'updated_at',
#     )
#     class Media:
#         js = ('Website/admin/js/test.js',)
#         css = {
#              'all': ('Website/admin/css/test.css',)
#         }
#     def name_link(self, obj):
#         return format_html(str('<a href="%s" target="_self">%s</a>' % (obj.name, obj.updated_at)))
#     name_link.short_description = 'Name Link'
#     name_link.allow_tags = True
#     def save_model(self, request, instance, form, change):
#         user = request.user
#         instance = form.save(commit=False)
#         instance.save()
#         form.save_m2m()
#         return instance
# admin.site.register(Config, ConfigAdmin)
            
# class AllAppResource(resources.ModelResource):
#     # uuid_field = fields.Field(
#     #     column_name='uuid',
#     #     attribute='uuid',
#     #     widget=ForeignKeyWidget(
#     #         AllApp,
#     #         'uuid',
#     #         )
#     #     )
#     class Meta:
#         # fields = (
#         #     'uuid_field',
#         # )
#         model = AllApp

# class AllAppAdmin(ImportExportModelAdmin):
#     resource_class = AllAppResource
#     list_display = (
#         'name',
#         # 'image',
#         'uuid',
#         'created_at',
#         'updated_at',
#     )
#     search_fields = ('name',
#         # 'image',
#         'uuid',
#      )
#     fieldsets = (
#         (None, {
#             'fields': (
#             'name',
#             'uuid',
#             )
#         }),
#         ('Advanced options', {
#             'classes': ('collapse',),
#             'fields': (
            
#                 'short_name',
                    
#                 'url',
                    
#                 'href_target',
                    
#                 'icon',
                    
#                 'icon_base64',
                    
#                 'active',
                    
#                 'is_product',
                    
#                 'staff_only',
                    
#                 'admin_only',
                    
#                 'order',
                    
#                 'demo_mode',
                    
#                 'updated_at',
#                 'created_at',
#             ),
#             # 'fields': ('registration_required', 'template_name'),
#         }),
#     )
#     list_display_links = (
#         'name',
#     )
#     date_hierarchy = 'updated_at'
#     ordering = (
#         'updated_at',
#     )
#     readonly_fields = (
#         'uuid',
#         'created_at',
#         'updated_at',
#     )
#     class Media:
#         js = ('Website/admin/js/test.js',)
#         css = {
#              'all': ('Website/admin/css/test.css',)
#         }
#     def name_link(self, obj):
#         return format_html(str('<a href="%s" target="_self">%s</a>' % (obj.name, obj.updated_at)))
#     name_link.short_description = 'Name Link'
#     name_link.allow_tags = True
#     def save_model(self, request, instance, form, change):
#         user = request.user
#         instance = form.save(commit=False)
#         instance.save()
#         form.save_m2m()
#         return instance
# admin.site.register(AllApp, AllAppAdmin)
            
# class AllViewResource(resources.ModelResource):
#     # uuid_field = fields.Field(
#     #     column_name='uuid',
#     #     attribute='uuid',
#     #     widget=ForeignKeyWidget(
#     #         AllView,
#     #         'uuid',
#     #         )
#     #     )
#     class Meta:
#         # fields = (
#         #     'uuid_field',
#         # )
#         model = AllView

# class AllViewAdmin(ImportExportModelAdmin):
#     resource_class = AllViewResource
#     list_display = (
#         'name',
#         # 'image',
#         'uuid',
#         'created_at',
#         'updated_at',
#     )
#     search_fields = ('name',
#         # 'image',
#         'uuid',
#      )
#     fieldsets = (
#         (None, {
#             'fields': (
#             'name',
#             'uuid',
#             )
#         }),
#         ('Advanced options', {
#             'classes': ('collapse',),
#             'fields': (
            
#                 'short_name',
                    
#                 'pattern',
                    
#                 'icon',
                    
#                 'icon_base64',
                    
#                 'active',
                    
#                 'is_product',
                    
#                 'staff_only',
                    
#                 'admin_only',
                    
#                 'order',
                    
#                 'demo_mode',
                    
#                 'updated_at',
#                 'created_at',
#             ),
#             # 'fields': ('registration_required', 'template_name'),
#         }),
#     )
#     list_display_links = (
#         'name',
#     )
#     date_hierarchy = 'updated_at'
#     ordering = (
#         'updated_at',
#     )
#     readonly_fields = (
#         'uuid',
#         'created_at',
#         'updated_at',
#     )
#     class Media:
#         js = ('Website/admin/js/test.js',)
#         css = {
#              'all': ('Website/admin/css/test.css',)
#         }
#     def name_link(self, obj):
#         return format_html(str('<a href="%s" target="_self">%s</a>' % (obj.name, obj.updated_at)))
#     name_link.short_description = 'Name Link'
#     name_link.allow_tags = True
#     def save_model(self, request, instance, form, change):
#         user = request.user
#         instance = form.save(commit=False)
#         instance.save()
#         form.save_m2m()
#         return instance
# admin.site.register(AllView, AllViewAdmin)
            
# class AdminMenuGroupResource(resources.ModelResource):
#     # uuid_field = fields.Field(
#     #     column_name='uuid',
#     #     attribute='uuid',
#     #     widget=ForeignKeyWidget(
#     #         AdminMenuGroup,
#     #         'uuid',
#     #         )
#     #     )
#     class Meta:
#         # fields = (
#         #     'uuid_field',
#         # )
#         model = AdminMenuGroup

# class AdminMenuGroupAdmin(ImportExportModelAdmin):
#     resource_class = AdminMenuGroupResource
#     list_display = (
#         'name',
#         # 'image',
#         'uuid',
#         'created_at',
#         'updated_at',
#     )
#     search_fields = ('name',
#         # 'image',
#         'uuid',
#      )
#     fieldsets = (
#         (None, {
#             'fields': (
#             'name',
#             'uuid',
#             )
#         }),
#         ('Advanced options', {
#             'classes': ('collapse',),
#             'fields': (
            
#                 'title',
                    
#                 'icon_class',
                    
#                 'desc',
                    
#                 'order',
                    
#                 'active',
                    
#                 'is_base',
                    
#                 'staff_only',
                    
#                 'superuser_only',
                    
#                 'app',
                    
#                 'related_apps',
                    
#                 'updated_at',
#                 'created_at',
#             ),
#             # 'fields': ('registration_required', 'template_name'),
#         }),
#     )
#     list_display_links = (
#         'name',
#     )
#     date_hierarchy = 'updated_at'
#     ordering = (
#         'updated_at',
#     )
#     readonly_fields = (
#         'uuid',
#         'created_at',
#         'updated_at',
#     )
#     class Media:
#         js = ('Website/admin/js/test.js',)
#         css = {
#              'all': ('Website/admin/css/test.css',)
#         }
#     def name_link(self, obj):
#         return format_html(str('<a href="%s" target="_self">%s</a>' % (obj.name, obj.updated_at)))
#     name_link.short_description = 'Name Link'
#     name_link.allow_tags = True
#     def save_model(self, request, instance, form, change):
#         user = request.user
#         instance = form.save(commit=False)
#         instance.save()
#         form.save_m2m()
#         return instance
# admin.site.register(AdminMenuGroup, AdminMenuGroupAdmin)
            
# class AllAdminMenuResource(resources.ModelResource):
#     # uuid_field = fields.Field(
#     #     column_name='uuid',
#     #     attribute='uuid',
#     #     widget=ForeignKeyWidget(
#     #         AllAdminMenu,
#     #         'uuid',
#     #         )
#     #     )
#     class Meta:
#         # fields = (
#         #     'uuid_field',
#         # )
#         model = AllAdminMenu

# class AllAdminMenuAdmin(ImportExportModelAdmin):
#     resource_class = AllAdminMenuResource
#     list_display = (
#         'name',
#         # 'image',
#         'uuid',
#         'created_at',
#         'updated_at',
#     )
#     search_fields = ('name',
#         # 'image',
#         'uuid',
#      )
#     fieldsets = (
#         (None, {
#             'fields': (
#             'name',
#             'uuid',
#             )
#         }),
#         ('Advanced options', {
#             'classes': ('collapse',),
#             'fields': (
            
#                 'title',
                    
#                 'icon_class',
                    
#                 'data_feather',
                    
#                 'url',
                    
#                 'icon',
                    
#                 'icon_base64',
                    
#                 'desc',
                    
#                 'order',
                    
#                 'in_main_menu',
                    
#                 'menu_group',
                    
#                 'parent_menu',
                    
#                 'login_redirect',
                    
#                 'active',
                    
#                 'staff_only',
                    
#                 'superuser_only',
                    
#                 'split_marked',
                    
#                 'split_label',
                    
#                 'updated_at',
#                 'created_at',
#             ),
#             # 'fields': ('registration_required', 'template_name'),
#         }),
#     )
#     list_display_links = (
#         'name',
#     )
#     date_hierarchy = 'updated_at'
#     ordering = (
#         'updated_at',
#     )
#     readonly_fields = (
#         'uuid',
#         'created_at',
#         'updated_at',
#     )
#     class Media:
#         js = ('Website/admin/js/test.js',)
#         css = {
#              'all': ('Website/admin/css/test.css',)
#         }
#     def name_link(self, obj):
#         return format_html(str('<a href="%s" target="_self">%s</a>' % (obj.name, obj.updated_at)))
#     name_link.short_description = 'Name Link'
#     name_link.allow_tags = True
#     def save_model(self, request, instance, form, change):
#         user = request.user
#         instance = form.save(commit=False)
#         instance.save()
#         form.save_m2m()
#         return instance
# admin.site.register(AllAdminMenu, AllAdminMenuAdmin)
            
# class PositionResource(resources.ModelResource):
#     # uuid_field = fields.Field(
#     #     column_name='uuid',
#     #     attribute='uuid',
#     #     widget=ForeignKeyWidget(
#     #         Position,
#     #         'uuid',
#     #         )
#     #     )
#     class Meta:
#         # fields = (
#         #     'uuid_field',
#         # )
#         model = Position

# class PositionAdmin(ImportExportModelAdmin):
#     resource_class = PositionResource
#     list_display = (
#         'name',
#         # 'image',
#         'uuid',
#         'created_at',
#         'updated_at',
#     )
#     search_fields = ('name',
#         # 'image',
#         'uuid',
#      )
#     fieldsets = (
#         (None, {
#             'fields': (
#             'name',
#             'uuid',
#             )
#         }),
#         ('Advanced options', {
#             'classes': ('collapse',),
#             'fields': (
            
#                 'desc',
                    
#                 'css',
                    
#                 'order',
                    
#                 'active',
                    
#                 'updated_at',
#                 'created_at',
#             ),
#             # 'fields': ('registration_required', 'template_name'),
#         }),
#     )
#     list_display_links = (
#         'name',
#     )
#     date_hierarchy = 'updated_at'
#     ordering = (
#         'updated_at',
#     )
#     readonly_fields = (
#         'uuid',
#         'created_at',
#         'updated_at',
#     )
#     class Media:
#         js = ('Website/admin/js/test.js',)
#         css = {
#              'all': ('Website/admin/css/test.css',)
#         }
#     def name_link(self, obj):
#         return format_html(str('<a href="%s" target="_self">%s</a>' % (obj.name, obj.updated_at)))
#     name_link.short_description = 'Name Link'
#     name_link.allow_tags = True
#     def save_model(self, request, instance, form, change):
#         user = request.user
#         instance = form.save(commit=False)
#         instance.save()
#         form.save_m2m()
#         return instance
# admin.site.register(Position, PositionAdmin)
            
# class FooterItemResource(resources.ModelResource):
#     # uuid_field = fields.Field(
#     #     column_name='uuid',
#     #     attribute='uuid',
#     #     widget=ForeignKeyWidget(
#     #         FooterItem,
#     #         'uuid',
#     #         )
#     #     )
#     class Meta:
#         # fields = (
#         #     'uuid_field',
#         # )
#         model = FooterItem

# class FooterItemAdmin(ImportExportModelAdmin):
#     resource_class = FooterItemResource
#     list_display = (
#         'name',
#         # 'image',
#         'uuid',
#         'created_at',
#         'updated_at',
#     )
#     search_fields = ('name',
#         # 'image',
#         'uuid',
#      )
#     fieldsets = (
#         (None, {
#             'fields': (
#             'name',
#             'uuid',
#             )
#         }),
#         ('Advanced options', {
#             'classes': ('collapse',),
#             'fields': (
            
#                 'desc',
                    
#                 'html_code',
                    
#                 'css_code',
                    
#                 'js_code',
                    
#                 'order',
                    
#                 'position',
                    
#                 'active',
                    
#                 'updated_at',
#                 'created_at',
#             ),
#             # 'fields': ('registration_required', 'template_name'),
#         }),
#     )
#     list_display_links = (
#         'name',
#     )
#     date_hierarchy = 'updated_at'
#     ordering = (
#         'updated_at',
#     )
#     readonly_fields = (
#         'uuid',
#         'created_at',
#         'updated_at',
#     )
#     class Media:
#         js = ('Website/admin/js/test.js',)
#         css = {
#              'all': ('Website/admin/css/test.css',)
#         }
#     def name_link(self, obj):
#         return format_html(str('<a href="%s" target="_self">%s</a>' % (obj.name, obj.updated_at)))
#     name_link.short_description = 'Name Link'
#     name_link.allow_tags = True
#     def save_model(self, request, instance, form, change):
#         user = request.user
#         instance = form.save(commit=False)
#         instance.save()
#         form.save_m2m()
#         return instance
# admin.site.register(FooterItem, FooterItemAdmin)
            
# class WidgetResource(resources.ModelResource):
#     # uuid_field = fields.Field(
#     #     column_name='uuid',
#     #     attribute='uuid',
#     #     widget=ForeignKeyWidget(
#     #         Widget,
#     #         'uuid',
#     #         )
#     #     )
#     class Meta:
#         # fields = (
#         #     'uuid_field',
#         # )
#         model = Widget

# class WidgetAdmin(ImportExportModelAdmin):
#     resource_class = WidgetResource
#     list_display = (
#         'name',
#         # 'image',
#         'uuid',
#         'created_at',
#         'updated_at',
#     )
#     search_fields = ('name',
#         # 'image',
#         'uuid',
#      )
#     fieldsets = (
#         (None, {
#             'fields': (
#             'name',
#             'uuid',
#             )
#         }),
#         ('Advanced options', {
#             'classes': ('collapse',),
#             'fields': (
            
#                 'title',
                    
#                 'url',
                    
#                 'desc',
                    
#                 'html_code',
                    
#                 'css_code',
                    
#                 'js_code',
                    
#                 'position',
                    
#                 'order',
                    
#                 'active',
                    
#                 'updated_at',
#                 'created_at',
#             ),
#             # 'fields': ('registration_required', 'template_name'),
#         }),
#     )
#     list_display_links = (
#         'name',
#     )
#     date_hierarchy = 'updated_at'
#     ordering = (
#         'updated_at',
#     )
#     readonly_fields = (
#         'uuid',
#         'created_at',
#         'updated_at',
#     )
#     class Media:
#         js = ('Website/admin/js/test.js',)
#         css = {
#              'all': ('Website/admin/css/test.css',)
#         }
#     def name_link(self, obj):
#         return format_html(str('<a href="%s" target="_self">%s</a>' % (obj.name, obj.updated_at)))
#     name_link.short_description = 'Name Link'
#     name_link.allow_tags = True
#     def save_model(self, request, instance, form, change):
#         user = request.user
#         instance = form.save(commit=False)
#         instance.save()
#         form.save_m2m()
#         return instance
# admin.site.register(Widget, WidgetAdmin)
            
# class TimeZoneResource(resources.ModelResource):
#     # uuid_field = fields.Field(
#     #     column_name='uuid',
#     #     attribute='uuid',
#     #     widget=ForeignKeyWidget(
#     #         TimeZone,
#     #         'uuid',
#     #         )
#     #     )
#     class Meta:
#         # fields = (
#         #     'uuid_field',
#         # )
#         model = TimeZone

# class TimeZoneAdmin(ImportExportModelAdmin):
#     resource_class = TimeZoneResource
#     list_display = (
#         'name',
#         # 'image',
#         'uuid',
#         'created_at',
#         'updated_at',
#     )
#     search_fields = ('name',
#         # 'image',
#         'uuid',
#      )
#     fieldsets = (
#         (None, {
#             'fields': (
#             'name',
#             'uuid',
#             )
#         }),
#         ('Advanced options', {
#             'classes': ('collapse',),
#             'fields': (
            
#                 'updated_at',
#                 'created_at',
#             ),
#             # 'fields': ('registration_required', 'template_name'),
#         }),
#     )
#     list_display_links = (
#         'name',
#     )
#     date_hierarchy = 'updated_at'
#     ordering = (
#         'updated_at',
#     )
#     readonly_fields = (
#         'uuid',
#         'created_at',
#         'updated_at',
#     )
#     class Media:
#         js = ('Website/admin/js/test.js',)
#         css = {
#              'all': ('Website/admin/css/test.css',)
#         }
#     def name_link(self, obj):
#         return format_html(str('<a href="%s" target="_self">%s</a>' % (obj.name, obj.updated_at)))
#     name_link.short_description = 'Name Link'
#     name_link.allow_tags = True
#     def save_model(self, request, instance, form, change):
#         user = request.user
#         instance = form.save(commit=False)
#         instance.save()
#         form.save_m2m()
#         return instance
# admin.site.register(TimeZone, TimeZoneAdmin)
            
# class PageInfoResource(resources.ModelResource):
#     # uuid_field = fields.Field(
#     #     column_name='uuid',
#     #     attribute='uuid',
#     #     widget=ForeignKeyWidget(
#     #         PageInfo,
#     #         'uuid',
#     #         )
#     #     )
#     class Meta:
#         # fields = (
#         #     'uuid_field',
#         # )
#         model = PageInfo

# class PageInfoAdmin(ImportExportModelAdmin):
#     resource_class = PageInfoResource
#     list_display = (
#         'name',
#         # 'image',
#         'uuid',
#         'created_at',
#         'updated_at',
#     )
#     search_fields = ('name',
#         # 'image',
#         'uuid',
#      )
#     fieldsets = (
#         (None, {
#             'fields': (
#             'name',
#             'uuid',
#             )
#         }),
#         ('Advanced options', {
#             'classes': ('collapse',),
#             'fields': (
            
#                 'title',
                    
#                 'charset',
                    
#                 'header',
                    
#                 'desc',
                    
#                 'meta_description',
                    
#                 'meta_keywords',
                    
#                 'active',
                    
#                 'updated_at',
#                 'created_at',
#             ),
#             # 'fields': ('registration_required', 'template_name'),
#         }),
#     )
#     list_display_links = (
#         'name',
#     )
#     date_hierarchy = 'updated_at'
#     ordering = (
#         'updated_at',
#     )
#     readonly_fields = (
#         'uuid',
#         'created_at',
#         'updated_at',
#     )
#     class Media:
#         js = ('Website/admin/js/test.js',)
#         css = {
#              'all': ('Website/admin/css/test.css',)
#         }
#     def name_link(self, obj):
#         return format_html(str('<a href="%s" target="_self">%s</a>' % (obj.name, obj.updated_at)))
#     name_link.short_description = 'Name Link'
#     name_link.allow_tags = True
#     def save_model(self, request, instance, form, change):
#         user = request.user
#         instance = form.save(commit=False)
#         instance.save()
#         form.save_m2m()
#         return instance
# admin.site.register(PageInfo, PageInfoAdmin)
            
# class BotUAResource(resources.ModelResource):
#     # uuid_field = fields.Field(
#     #     column_name='uuid',
#     #     attribute='uuid',
#     #     widget=ForeignKeyWidget(
#     #         BotUA,
#     #         'uuid',
#     #         )
#     #     )
#     class Meta:
#         # fields = (
#         #     'uuid_field',
#         # )
#         model = BotUA

# class BotUAAdmin(ImportExportModelAdmin):
#     resource_class = BotUAResource
#     list_display = (
#         'name',
#         # 'image',
#         'uuid',
#         'created_at',
#         'updated_at',
#     )
#     search_fields = ('name',
#         # 'image',
#         'uuid',
#      )
#     fieldsets = (
#         (None, {
#             'fields': (
#             'name',
#             'uuid',
#             )
#         }),
#         ('Advanced options', {
#             'classes': ('collapse',),
#             'fields': (
            
#                 'active',
                    
#                 'updated_at',
#                 'created_at',
#             ),
#             # 'fields': ('registration_required', 'template_name'),
#         }),
#     )
#     list_display_links = (
#         'name',
#     )
#     date_hierarchy = 'updated_at'
#     ordering = (
#         'updated_at',
#     )
#     readonly_fields = (
#         'uuid',
#         'created_at',
#         'updated_at',
#     )
#     class Media:
#         js = ('Website/admin/js/test.js',)
#         css = {
#              'all': ('Website/admin/css/test.css',)
#         }
#     def name_link(self, obj):
#         return format_html(str('<a href="%s" target="_self">%s</a>' % (obj.name, obj.updated_at)))
#     name_link.short_description = 'Name Link'
#     name_link.allow_tags = True
#     def save_model(self, request, instance, form, change):
#         user = request.user
#         instance = form.save(commit=False)
#         instance.save()
#         form.save_m2m()
#         return instance
# admin.site.register(BotUA, BotUAAdmin)
            
# class RobotsArgResource(resources.ModelResource):
#     # uuid_field = fields.Field(
#     #     column_name='uuid',
#     #     attribute='uuid',
#     #     widget=ForeignKeyWidget(
#     #         RobotsArg,
#     #         'uuid',
#     #         )
#     #     )
#     class Meta:
#         # fields = (
#         #     'uuid_field',
#         # )
#         model = RobotsArg

# class RobotsArgAdmin(ImportExportModelAdmin):
#     resource_class = RobotsArgResource
#     list_display = (
#         'name',
#         # 'image',
#         'uuid',
#         'created_at',
#         'updated_at',
#     )
#     search_fields = ('name',
#         # 'image',
#         'uuid',
#      )
#     fieldsets = (
#         (None, {
#             'fields': (
#             'name',
#             'uuid',
#             )
#         }),
#         ('Advanced options', {
#             'classes': ('collapse',),
#             'fields': (
            
#                 'value',
                    
#                 'ua',
                    
#                 'active',
                    
#                 'updated_at',
#                 'created_at',
#             ),
#             # 'fields': ('registration_required', 'template_name'),
#         }),
#     )
#     list_display_links = (
#         'name',
#     )
#     date_hierarchy = 'updated_at'
#     ordering = (
#         'updated_at',
#     )
#     readonly_fields = (
#         'uuid',
#         'created_at',
#         'updated_at',
#     )
#     class Media:
#         js = ('Website/admin/js/test.js',)
#         css = {
#              'all': ('Website/admin/css/test.css',)
#         }
#     def name_link(self, obj):
#         return format_html(str('<a href="%s" target="_self">%s</a>' % (obj.name, obj.updated_at)))
#     name_link.short_description = 'Name Link'
#     name_link.allow_tags = True
#     def save_model(self, request, instance, form, change):
#         user = request.user
#         instance = form.save(commit=False)
#         instance.save()
#         form.save_m2m()
#         return instance
# admin.site.register(RobotsArg, RobotsArgAdmin)
            
# class LogoImagesResource(resources.ModelResource):
#     # uuid_field = fields.Field(
#     #     column_name='uuid',
#     #     attribute='uuid',
#     #     widget=ForeignKeyWidget(
#     #         LogoImages,
#     #         'uuid',
#     #         )
#     #     )
#     class Meta:
#         # fields = (
#         #     'uuid_field',
#         # )
#         model = LogoImages

# class LogoImagesAdmin(ImportExportModelAdmin):
#     resource_class = LogoImagesResource
#     list_display = (
#         'name',
#         # 'image',
#         'uuid',
#         'created_at',
#         'updated_at',
#     )
#     search_fields = ('name',
#         # 'image',
#         'uuid',
#      )
#     fieldsets = (
#         (None, {
#             'fields': (
#             'name',
#             'uuid',
#             )
#         }),
#         ('Advanced options', {
#             'classes': ('collapse',),
#             'fields': (
            
#                 'file',
                    
#                 'is_favicon',
                    
#                 'desc',
                    
#                 'updated_at',
#                 'created_at',
#             ),
#             # 'fields': ('registration_required', 'template_name'),
#         }),
#     )
#     list_display_links = (
#         'name',
#     )
#     date_hierarchy = 'updated_at'
#     ordering = (
#         'updated_at',
#     )
#     readonly_fields = (
#         'uuid',
#         'created_at',
#         'updated_at',
#     )
#     class Media:
#         js = ('Website/admin/js/test.js',)
#         css = {
#              'all': ('Website/admin/css/test.css',)
#         }
#     def name_link(self, obj):
#         return format_html(str('<a href="%s" target="_self">%s</a>' % (obj.name, obj.updated_at)))
#     name_link.short_description = 'Name Link'
#     name_link.allow_tags = True
#     def save_model(self, request, instance, form, change):
#         user = request.user
#         instance = form.save(commit=False)
#         instance.save()
#         form.save_m2m()
#         return instance
# admin.site.register(LogoImages, LogoImagesAdmin)
            