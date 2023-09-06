from django import forms
from django.contrib import admin
from .models import *
# Register your models here.

class AssetRevaluationAdmin(admin.ModelAdmin):
    resourceclass = AssetRevaluation
    list_display = ('name',
    'uuid',
    'asset_revaluation',
    )
admin.site.register(AssetRevaluation, AssetRevaluationAdmin)

class DepreciationPeriodAdmin(admin.ModelAdmin):
    resourceclass = DepreciationPeriod
    list_display = ('name',
    'uuid',
    )
admin.site.register(DepreciationPeriod, DepreciationPeriodAdmin)

class YearViewsAdmin(admin.ModelAdmin):
    resourceclass = YearViews
    list_display = ('name',
    )
admin.site.register(YearViews, YearViewsAdmin)


class DepreciationDetailAdmin(admin.ModelAdmin):
    resourceclass = DepreciationDetail
    list_display = ('name',
    'type_depreciation',
    'aset',
    'add_value',
    'depreciation_value',
    'preiod_detail',
    'time_depreciation',
    'uuid',
    'time_been_depreciation',
    )
admin.site.register(DepreciationDetail, DepreciationDetailAdmin)


class DepreciationAssetDetailAdmin(admin.ModelAdmin):
    resourceclass = DepreciationAssetDetail
    list_display = ('name',
    'asset_depreciations',
    'count_depreciation',
    'days_depreciation',
    'value_start',
    'value_end',
    'percent_depreciation',
    'value_depreciaiton',
    'remain_value',
    'uuid',
    )
    ordering = ['asset_depreciations','count_depreciation']
admin.site.register(DepreciationAssetDetail, DepreciationAssetDetailAdmin)

# for i in range(1990,2051):
#     a = YearViews()
#     a.name = i
#     a.save()


class DepreciationTypeAdmin(admin.ModelAdmin):
    resourceclass = DepreciationType
    list_display = ('name',
    'asset_type',
    'time',
    'uuid',
    )
admin.site.register(DepreciationType, DepreciationTypeAdmin)


class AdjustmentAdmin(admin.ModelAdmin):
    resourceclass = Adjustment
    list_display = ('name',
    'number',
    'uuid',
    )
admin.site.register(Adjustment, AdjustmentAdmin)
