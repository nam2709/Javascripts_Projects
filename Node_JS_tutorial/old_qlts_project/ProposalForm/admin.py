from django.contrib import admin
# Register your models here.
from ProposalForm .models import *

class ListAdmin(admin.ModelAdmin):
    resource_class = List
    list_display = [
        'list', 'asset', 
        # 'created_at', 'created_by', 'updated_at', 'updated_by',
    ]


class AssetInline(admin.StackedInline):
    model = List
    extra = 0


class AssetListAdmin(admin.ModelAdmin):
    inlines = [AssetInline]
    list_display = [
        'name', 'code', 'name', 'created_at', 'created_by', 'updated_at', 'updated_by'
    ]
    search_fields = (
        'name', 'code',
    )


class ProposalFormAdmin(admin.ModelAdmin):
    resource_class = ProposalForm
    list_display = (
        'name', 'code', 'reason', 'company', 'proposal_type', 'proposal_status', 'proposer', 
        # --start--
        'execution_date',
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
        #--end__
        'created_by', 'created_at', 'updated_by', 'updated_at',
        'asset_list',
    )
    search_fields = (
        'name', 'code',
    )
    # hàm tắt chế độ sửa/xoá của trường thông tin
    # def get_form(self, request, obj=None, **kwargs):
    #     form = super(ProposalFormAdmin, self).get_form(request, obj, **kwargs)
    #     form.base_fields['asset_list'].widget.can_delete_related = False
    #     form.base_fields['asset_list'].widget.can_change_related = False
    #     form.base_fields['proposal_type'].widget.can_delete_related = False
    #     form.base_fields['proposal_type'].widget.can_change_related = False
    #     return form
    # hàm mặc định created_by = user hiện tại
    # def save_model(self, request, instance, form, change):
    #     user = request.user
    #     instance = form.save(commit=False)
    #     if not change or not instance.created_by:
    #         instance.created_by = user
    #     instance.modified_by = user
    #     instance.save()
    #     form.save_m2m() 
    #     return instance
    

class ProposalFormTypeAdmin(admin.ModelAdmin):
    resource_class = ProposalFormType
    list_display = (
        'name', 'code', 'fields', 'created_by', 'created_at', 'updated_at', 'updated_by',
    ) 
    search_fields = (
        'name', 'code',
    )

class ListTypeAdmin(admin.ModelAdmin):
    resource_class = ListType
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


class ProposalFormStatusAdmin(admin.ModelAdmin):
    resource_class = ProposalFormStatus
    list_display = (
        'name', 'code', 'is_active', 'created_by', 'created_at', 'updated_at', 'updated_by',
    )
    search_fields = (
        'name', 'code',
    )

admin.site.register(List, ListAdmin)
admin.site.register(AssetList, AssetListAdmin)
admin.site.register(ProposalForm, ProposalFormAdmin)
admin.site.register(ProposalFormType, ProposalFormTypeAdmin)
admin.site.register(ListType, ListTypeAdmin)
admin.site.register(ProposalFormStatus, ProposalFormStatusAdmin)



# --------------------------------------------------------------

# class ProposalProcessConfigAdmin(admin.ModelAdmin):
#     resource_class = ProposalProcessConfig
#     list_display = (
#         'uuid', 'name', 'code', 'created_by', 'created_at', 'updated_at', 'updated_by',
#     )


# class ProposalProcessStepTemplateAdmin(admin.ModelAdmin):
#     resource_class = ProposalProcessStepTemplate
#     list_display = (
#         'uuid', 'name', 'code', 'created_by', 'created_at', 'updated_at', 'updated_by',
#     )


# class ProposalProcessStepDetailAdmin(admin.ModelAdmin):
#     resource_class = ProposalProcessStepDetail
#     list_display = (
#         'uuid', 'name', 'code', 'created_by', 'created_at', 'updated_at', 'updated_by',
#     )   


# class ProposalConfirmStepByUserAdmin(admin.ModelAdmin):
#     resource_class = ProposalConfirmStepByUser
#     list_display = (
#         'uuid', 'name', 'code', 'created_by', 'created_at', 'updated_at', 'updated_by',
#     )   


# admin.site.register(ProposalProcessConfig, ProposalProcessConfigAdmin)
# admin.site.register(ProposalProcessStepTemplate, ProposalProcessStepTemplateAdmin)
# admin.site.register(ProposalProcessStepDetail, ProposalProcessStepDetailAdmin)
# admin.site.register(ProposalConfirmStepByUser, ProposalConfirmStepByUserAdmin)
