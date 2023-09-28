from django.contrib import admin

# Register your models here.
from .models import *


class ProvinceAdmin(admin.ModelAdmin):
    resource_class = Province
    list_display = ('uuid',
        'name',
        'code',
        'uuid',
        'codename',
        'division_type',
        'phone_code',)
    # list_filter = ('name')
    
    search_fields = ('name',
        # 'image',
        'uuid',
     )
admin.site.register(Province, ProvinceAdmin)

class DistrictsAdmin(admin.ModelAdmin):
    resource_class = Districts
    list_display = ('uuid',
        'name',
        'code',
        'division_type',
        'province',
        'codename',
        'province_code',)
    # list_filter = ('name')
    
    search_fields = ('name',
        # 'image',
        'uuid',
     )
admin.site.register(Districts, DistrictsAdmin)


class WardAdmin(admin.ModelAdmin):
    resource_class = Ward
    list_display = ('uuid',
        'name',
        'code',
        'division_type',
        'districts',
        'codename',
        'ditrict_code',
    )
    # list_filter = ('name')
    search_fields = ('name',
                     'uuid'
    )
admin.site.register(Ward, WardAdmin)
