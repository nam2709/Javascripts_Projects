from django.contrib import admin



from django.contrib import admin
from import_export import fields, resources
from import_export.widgets import ForeignKeyWidget
from import_export.admin import ImportExportModelAdmin

# from .models import *

# from .models import *
# from RunningTaskManagement.models import *
# from RunningTaskManagement.models_genaral import *
from .models import *


class AppPermissionAdmin(admin.ModelAdmin):
    resource_class = AppPermission
    list_display = (
        'name',
        'uuid',
    #    'getAllAppName',
        
        'created_at',
        'updated_at',
    )
    # list_filter = ('name')
    search_fields = ('name',
                     'uuid'
    )
admin.site.register(AppPermission, AppPermissionAdmin)

class ModelsPermissionAdmin(admin.ModelAdmin):
    resource_class = ModelsPermission
    list_display = (
        'name',
        'uuid',
       
        'app',
        'created_at',
        'updated_at',
    )
    # list_filter = ('name')
    search_fields = ('name',
                     'uuid'
    )
admin.site.register(ModelsPermission, ModelsPermissionAdmin)
class PermissionAdmin(admin.ModelAdmin):
    resource_class = Permission
    list_display = (
        'name',
        'uuid',
        'app',
        'perm_name',
        'model',
        'is_add',
        'is_view_only',
        'is_view_all',
        'is_view_public',
        'is_delete_only',
        'is_delete_all',
        'is_delete_public',
        'is_edit_only',
        'is_edit_all',
        'is_edit_public',
        'created_at',
        'updated_at',
    )
    # list_filter = ('name')
    search_fields = ('name',
                     'uuid'
    )
admin.site.register(Permission, PermissionAdmin)
class PermissionGroupAdmin(admin.ModelAdmin):
    resource_class =  PermissionGroup
    list_display = (
        'name',
        'uuid',
        'account_text',
        'permissions_text',
        'get_account',
        'get_permissions',
        'desc',
        'created_at',
        'updated_at',
    )
    # list_filter = ('name')
    search_fields = ('name',
                     'uuid',
    )
    def save_model(self, request, instance, form, change):
        instance = form.save(commit=False)
        instance.save()
        # form.save_m2m()
        return instance

admin.site.register( PermissionGroup,PermissionGroupAdmin)
class UserGroupAdmin(admin.ModelAdmin):
    resource_class = UserGroup
    list_display = (
        'name',
        'uuid',
        'permissions_group_text',
        'account_text',
        'desc',
        'created_at',
        'updated_at',
    )
    # list_filter = ('name')
    search_fields = ('name',
                     'uuid'
    )
    def save_model(self, request, instance, form, change):
        instance = form.save(commit=False)
        instance.save()
        # form.save_m2m()
        return instance

admin.site.register(UserGroup, UserGroupAdmin)