
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
# __init__.py

from django.contrib import admin
from import_export import fields, resources
from import_export.widgets import ForeignKeyWidget
from import_export.admin import ImportExportModelAdmin
from django.utils.html import format_html
# from .models import *

# from .models import *
# from RunningTaskManagement.models import *
# from RunningTaskManagement.models_genaral import *
from .models import *


class WebsiteTemplateResource(resources.ModelResource):
    # uuid_field = fields.Field(
    #     column_name='uuid',
    #     attribute='uuid',
    #     widget=ForeignKeyWidget(
    #         WebsiteTemplate,
    #         'uuid',
    #         )
    #     )
    class Meta:
        # fields = (
        #     'uuid_field',
        # )
        model = WebsiteTemplate

class WebsiteTemplateAdmin(ImportExportModelAdmin):
    resource_class = WebsiteTemplateResource
    list_display = (
        'name',
        # 'image',
        'uuid',
        'created_at',
        'updated_at',
    )
    search_fields = ('name',
        # 'image',
        'uuid',
     )
    fieldsets = (
        (None, {
            'fields': (
            'name',
            'uuid',
            )
        }),
        ('Advanced options', {
            'classes': ('collapse',),
            'fields': (
            
                'tndid',
                    
                'updated_at',
                'created_at',
            ),
            # 'fields': ('registration_required', 'template_name'),
        }),
    )
    list_display_links = (
        'name',
    )
    date_hierarchy = 'updated_at'
    ordering = (
        'updated_at',
    )
    readonly_fields = (
        'uuid',
        'created_at',
        'updated_at',
    )
    class Media:
        js = ('Website/admin/js/test.js',)
        css = {
             'all': ('Website/admin/css/test.css',)
        }
    def name_link(self, obj):
        return format_html(str('<a href="%s" target="_self">%s</a>' % (obj.name, obj.updated_at)))
    name_link.short_description = 'Name Link'
    name_link.allow_tags = True
    def save_model(self, request, instance, form, change):
        user = request.user
        instance = form.save(commit=False)
        instance.save()
        form.save_m2m()
        return instance
admin.site.register(WebsiteTemplate, WebsiteTemplateAdmin)

class AccountResource(resources.ModelResource):
    # uuid_field = fields.Field(
    #     column_name='uuid',
    #     attribute='uuid',
    #     widget=ForeignKeyWidget(
    #         Account,
    #         'uuid',
    #         )
    #     )
    class Meta:
        # fields = (
        #     'uuid_field',
        # )
        model = Account

class AccountAdmin(ImportExportModelAdmin):
    resource_class = AccountResource
    list_display = (
        'name',
        # 'image',
        'uuid',
        'created_at',
        'updated_at',
    )
    search_fields = ('name',
        # 'image',
        'uuid',
     )
    fieldsets = (
        (None, {
            'fields': (
            'name',
            'uuid',
            )
        }),
        ('Advanced options', {
            'classes': ('collapse',),
            'fields': (
            
                'tndid',
                    
                'nick_name',
                    
                'full_name',
                    
                'groups',
                    
                'user_permissions',
                    
                'date_of_birth',
                    
                'age',
                    
                'telephone',
                    
                'salt',
                    
                'onetime_passwd',
                    
                'avatar',
                    
                'is_callbot',
                    
                'callbot_endpoint',
                    
                'is_chatbot',
                    
                'chatbot_endpoint',
                    
                'manager',
                    
                'log_confirm_by_email',
                    
                'logged_with_password',
                    
                'created_free_license',
                    
                'email_activated',
                    
                'website_template',
                    
                'language',
                    
                'timezone',
                    
                'signup_at',
                    
                'last_login_at',
                    
                'updated_at',
                'created_at',
            ),
            # 'fields': ('registration_required', 'template_name'),
        }),
    )
    list_display_links = (
        'name',
    )
    date_hierarchy = 'updated_at'
    ordering = (
        'updated_at',
    )
    readonly_fields = (
        'uuid',
        'created_at',
        'updated_at',
    )
    class Media:
        js = ('Website/admin/js/test.js',)
        css = {
             'all': ('Website/admin/css/test.css',)
        }
    def name_link(self, obj):
        return format_html(str('<a href="%s" target="_self">%s</a>' % (obj.name, obj.updated_at)))
    name_link.short_description = 'Name Link'
    name_link.allow_tags = True
    def save_model(self, request, instance, form, change):
        user = request.user
        instance = form.save(commit=False)
        instance.save()
        form.save_m2m()
        return instance
admin.site.register(Account, AccountAdmin)
            