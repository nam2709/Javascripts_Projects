from django.contrib import admin
from .models import FormManagement
from .models import ListTypeForm
from .models import ListAsset
from .models import HistoryUseAsset
from .models import TypeAction
from AssetManagement.models import Asset
from company.models import Staff

# Register your models here.

class FormManagementAdmin(admin.ModelAdmin):
    resource_class = FormManagement
    list_display = (
        'uuid',
        'name',
        'code',
        'type_form',
        'content',
        'is_confirm',
        # 'warehouse',
        'execution_date',
        'attached_document',
        'delivered',
        'received',
        # 'inventory_checker',
        'staff_receive_property',
        'staff_confiscated_asset',
        'reason_asset_recovery',
        'lending_unit',
        'loan_period',
        'unit_currently_borrowing',
        'buyer',
        'price',
        'liquidation_reason',
        'created_by',
        'updated_by',
        'updated_at',
        'created_at',
        # 'get_json_asset_list',
        # 'get_type_form',
    )
    search_fields = (
        'name',
        'uuid',
        'code',
    )

admin.site.register(FormManagement, FormManagementAdmin)

class ListTypeFormAdmin(admin.ModelAdmin):
    resource_class = ListTypeForm
    list_display = (
        'uuid',
        'name',
        'code',
        'fields',
        'created_by',
        'updated_by',
        'updated_at',
        'created_at',
    )

    search_fields = (
        'uuid',
        'name',
        'code',
    )

admin.site.register(ListTypeForm, ListTypeFormAdmin)


class ListAssetAdmin(admin.ModelAdmin):
    resource_class = ListAsset
    list_display = (
        'uuid',
        'code',
        'name',
        'asset',
        'code_form',
        'current_status_asset',
        'is_exits_when_inventory',
        'created_by',
        'updated_by',
        'updated_at',
        'created_at',
        # 'get_info_asset',
    )

    search_fields = (
        'uuid',
        'name',
        'code',
        'code_form',
    )

admin.site.register(ListAsset, ListAssetAdmin)

class HistoryUseAssetAdmin(admin.ModelAdmin):
    resource_class = HistoryUseAsset
    list_display = (
        'uuid',
        'code',
        'name',
        'asset',
        'user',
        'type_action',
        'status_current',
        'started_using',
        'end_use',
        'created_by',
        'updated_by',
        'updated_at',
        'created_at',
    )

admin.site.register(HistoryUseAsset, HistoryUseAssetAdmin)


class TypeActionAdmin(admin.ModelAdmin):
    resource_class = TypeAction
    list_display = (
        'uuid',
        'code',
        'name',
        'color_code',
        'icon',
        'type_form',
        'created_by',
        'updated_by',
        'updated_at',
        'created_at',
    )

admin.site.register(TypeAction, TypeActionAdmin)