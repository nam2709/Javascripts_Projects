from django.contrib import admin

# Register your models here.
from .models import *

###
# from django.contrib.auth.admin import UserAdmin
# from .models import User

# admin.site.register(User, UserAdmin)

class CommuneAdmin(admin.ModelAdmin):
    resource_class = Commune
    list_display = (
        'name',
        # 'image',
        'uuid',)
    # list_filter = ('name')
    
    search_fields = ('name',
        # 'image',
        'uuid',
     )
admin.site.register(Commune, CommuneAdmin)

class DistrictAdmin(admin.ModelAdmin):
    resource_class = District
    list_display = (
        'name',
        'commune',
        'uuid',)
    # list_filter = ('name')
    
    search_fields = ('name',
        # 'image',
        'uuid',
     )
admin.site.register(District, DistrictAdmin)


class CityAdmin(admin.ModelAdmin):
    resource_class = City
    list_display = (
        'name',
        'district',
        'commune',
        'uuid',
    )
    # list_filter = ('name')
    search_fields = ('name',
                     'uuid'
    )
admin.site.register(City, CityAdmin)


class CompanyStatusAdmin(admin.ModelAdmin):
    resource_class = CompanyStatus
    list_display =('uuid',
                   'name',
                   'code',
                   'desc',
                   'created_at',
                    'updated_at',
                )
    # list_filter = ('name')
    search_fields =(
        'uuid',
        'name',
    )
admin.site.register(CompanyStatus, CompanyStatusAdmin)


class CompanyAdmin(admin.ModelAdmin):
    resource_class = Company
    list_display = (
        'name',
        'uuid',
        'companystatus',
        'code_company',
        'province',
        'districts',
        'ward',
        'address',
        'tax_code',
        'phone_number',
        'created_at',
        'updated_at',
    )
    # list_filter = ('name')
    search_fields = ('name',
                     'uuid'
    )
admin.site.register(Company, CompanyAdmin)

class UnitAdmin(admin.ModelAdmin):
    resource_class = Unit
    list_display = (
        'name',
        'uuid',
      'code',
        'company',
        'created_at',
        'updated_at',
    )
    # list_filter = ('name')
    search_fields = ('name',
                     'uuid'
    )
admin.site.register(Unit, UnitAdmin)
class PositionAdmin(admin.ModelAdmin):
    resource_class = Position
    list_display = (
        'name',
        'uuid',
        'code',
        'unit',
        'created_at',
        'updated_at',
    )
    # list_filter = ('name')
    search_fields = ('name',
                     'uuid'
    )
admin.site.register(Position, PositionAdmin)
class StaffStatusAdmin(admin.ModelAdmin):
    resource_class = StaffStatus
    list_display = (
        'name',
        'uuid',
        'desc',
        'created_at',
        'updated_at',
    )
    # list_filter = ('name')
    search_fields = ('name',
                     'uuid'
    )
admin.site.register(StaffStatus, StaffStatusAdmin)


class StaffAdmin(admin.ModelAdmin):
    resource_class = Staff
    list_display = ('uuid',
        'name',
        'staffstatus',
        'code',
        'company',
        'unit',
        'position',
        'created_at',
        'updated_at',
    )
    # list_filter = ('name')
    search_fields = ('name',
        'uuid',
     )


    
admin.site.register(Staff, StaffAdmin)


class StaffInformationAdmin(admin.ModelAdmin):
    resource_class = StaffInformation
    list_display = (
        'uuid',
        'staff',
        'full_name',
        'email',
        'position',
        'id_card',
        'phone_number',
        'province',
        'districts',
        'ward',
        'address',
        'degree',
        'avatar',
        'created_by',
        'updated_by',
    )
    
    search_fields = ('staff',
                    
    
        'uuid',
     )
admin.site.register(StaffInformation, StaffInformationAdmin)



