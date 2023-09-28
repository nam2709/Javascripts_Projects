from django.contrib import admin

# Register your models here.

from .models import SupplierCategory
from .models import WareHouseCategory
from .models import UnitCategory
from .models import AssetStatus
from .models import OwnStatus
from .models import AssetOfType
from .models import AssetType
from .models import AssetDetailTemplate
from .models import Asset
from .models import AssetDetail


class SupplierCategoryAdmin(admin.ModelAdmin):
    list_display = ('code', 'name', 'address', 'detail_address', 'contact_info', 'created_at', 'updated_at', 'created_by', 'updated_by')
    list_filter = ('name', 'created_by')
    search_fields = ('name', 'code')
    
    
class WareHouseCategoryAdmin(admin.ModelAdmin):
    list_display = ('code', 'name', 'status', 'manager', 'created_at', 'updated_at', 'created_by', 'updated_by')
    list_filter = ('name', 'created_by', 'manager')
    search_fields = ('name', 'code')
    
    
class UnitCategoryAdmin(admin.ModelAdmin):
    list_display = ('code', 'name', 'created_at', 'updated_at', 'created_by', 'updated_by')
    list_filter = ('name', 'created_by')
    search_fields = ('name', 'code')
    

class AssetStatusAdmin(admin.ModelAdmin):
    list_display = ('uuid','code', 'name', 'detail_description', 'created_at', 'updated_at', 'created_by', 'updated_by')
    list_filter = ('name', 'created_by')
    search_fields = ('name', 'code')
    

class OwnStatusAdmin(admin.ModelAdmin):
    list_display = ('code', 'name', 'detail_description', 'created_at', 'updated_at', 'created_by', 'updated_by')
    list_filter = ('name', 'created_by')
    search_fields = ('name', 'code')
    
    
class AssetOfTypeAdmin(admin.ModelAdmin):
    list_display = ('code', 'name', 'created_at', 'updated_at', 'created_by', 'updated_by')
    list_filter = ('name', 'created_by')
    search_fields = ('name', 'code')
    
    
class AssetTypeAdmin(admin.ModelAdmin):
    list_display = ('code', 'name', 'asset_of_type', 'created_at', 'updated_at', 'created_by', 'updated_by')
    list_filter = ('name', 'created_by', 'asset_of_type')
    search_fields = ('name', 'code')
    
    
class AssetDetailTemplateAdmin(admin.ModelAdmin):
    list_display = ('code', 'name', 'created_at', 'updated_at', 'created_by', 'updated_by')
    list_filter = ('name', 'created_by')
    search_fields = ('name', 'code')
    
    
class AssetAdmin(admin.ModelAdmin):
    list_display = ('code', 'name', 'price_buy', 'date_added', 'asset_type', 'warehouse', 'supplier', 'own_status', 'asset_status', 'unit', 'owned_company')
    list_filter = ('name', 'asset_type', 'warehouse', 'owned_company')
    search_fields = ('name', 'code')
    

class AssetDetailAdmin(admin.ModelAdmin):
    list_display = ('code', 'name', 'asset', 'created_at', 'updated_at', 'created_by', 'updated_by')
    list_filter = ('name', 'created_by')
    search_fields = ('name', 'code')
    
    
admin.site.register(SupplierCategory, SupplierCategoryAdmin)
admin.site.register(WareHouseCategory, WareHouseCategoryAdmin)
admin.site.register(UnitCategory, UnitCategoryAdmin)
admin.site.register(AssetStatus, AssetStatusAdmin)
admin.site.register(OwnStatus, OwnStatusAdmin)
admin.site.register(AssetOfType, AssetOfTypeAdmin)
admin.site.register(AssetType, AssetTypeAdmin)
admin.site.register(AssetDetailTemplate, AssetDetailTemplateAdmin)
admin.site.register(Asset, AssetAdmin)
admin.site.register(AssetDetail, AssetDetailAdmin)