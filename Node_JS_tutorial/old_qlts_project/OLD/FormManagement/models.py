from django.db import models
from uuid import uuid4 as UUID4
from django.core import serializers
from django.utils.timezone import now as djnow
from django.conf.global_settings import AUTH_USER_MODEL
from Account.models import Account
from django.utils.translation import gettext as _
from django.contrib.auth import get_user_model
from AssetManagement.models import Asset, WareHouseCategory, SupplierCategory, AssetStatus
from company.models import Staff, Unit
from ProposalForm.models import ProposalForm
from django.utils.timezone import now
from django.utils import timezone
from multiselectfield import MultiSelectField
from django import forms
from ProposalForm.models import ListType


Account = get_user_model()
CONFIRM = "confirm"
NO_CONFIRM = 'no_confirm'
# Create your models here.
STATUS_FORM = [
    (CONFIRM, "Xác nhận"),
    (NO_CONFIRM, "Không xác nhận"),
]


class ListTypeForm(models.Model):
    FIELDS_FORM = (
        ('name', 'Tên Phiếu'),
        ('code', 'Mã Phiếu'),
        ('execution_date', 'Ngày thực hiện'),
        ('attached_document', 'Đơn đi kèm'),
        ('delivered', 'Họ tên người giao'),
        ('received', 'Họ tên người nhận'),
        ('staff_receive_property', 'Nhân viên nhận tài sản được cấp'),
        ('staff_confiscated_asset', 'Nhân viên bị thu hồi tài sản'),
        ('reason_asset_recovery', 'Lý do bị thu hồi tài sản'),
        ('loan_period', 'Thời gian mượn đến'),
        ('lending_unit', 'Đơn vị cho mượn'),
        ('unit_currently_borrowing', 'Đơn vị đang mượn'),
        ('warehouse', 'Kho'),
        ('suplier', 'Nhà cung cấp'),
        ('buyer', 'Người mua'),
        ('price', 'Giá'),
        # ('execution_staff','Người thực hiện'),
        ('liquidation_reason', 'Lý do thanh lý'),
        ('created_by', 'Người tạo phiếu'),
        ('updated_by', 'Người chỉnh sửa'),
        ('updated_at', 'Ngày chỉnh sửa'),
        ('created_at', 'Ngày tạo phiếu'),
    )

    uuid = models.UUIDField(primary_key=True,
                            default=UUID4,
                            max_length=64,
                            editable=False,
                            help_text='UUID'
                            )

    name = models.CharField(max_length=1024,
                            blank=True,
                            null=True,
                            help_text="Form type name"
                            )

    code = models.CharField(max_length=1024,
                            unique=True,
                            help_text="Form code"
                            )

    fields = MultiSelectField(choices=FIELDS_FORM,
                              blank=True,
                              null=True,
                              help_text="Lựa chọn trường cho loại phiếu"
                              )

    created_by = models.ForeignKey(Account,
                                   to_field='username',
                                   related_name='%(app_label)s_%(class)s_created_by',
                                   on_delete=(models.SET_NULL),
                                   null=True,
                                   blank=True,
                                   help_text='Creator'
                                   )

    updated_by = models.ForeignKey(Account,
                                   to_field='username',
                                   related_name='%(app_label)s_%(class)s_updated_by',
                                   on_delete=(models.SET_NULL),
                                   null=True,
                                   blank=True,
                                   help_text='Updater'
                                   )

    updated_at = models.DateTimeField(default=djnow,
                                      help_text='Update time'
                                      )

    created_at = models.DateTimeField(default=djnow,
                                      editable=False,
                                      help_text='Posting time'
                                      )

    def __str__(self):
        return str(self.name)

    def save(self, *args, **kwargs):
        if self.name is None or self.name == "":
            self.name = self.code
        return super().save(*args, **kwargs)


class FormManagement(models.Model):
    uuid = models.UUIDField(primary_key=True,
                            default=UUID4,
                            max_length=64,
                            editable=False,
                            help_text='UUID Asset'
                            )

    name = models.CharField(max_length=1024,
                            blank=True,
                            null=True,
                            help_text="Form name"
                            )

    code = models.CharField(max_length=1024,
                            unique=True,
                            help_text="Form code"
                            )

    content = models.TextField(null=True,
                               blank=True,
                               help_text="Content"
                               )

    type_form = models.ForeignKey(ListTypeForm,
                                  on_delete=models.CASCADE,
                                  null=True,
                                  blank=True,
                                  help_text="Name Type Form"
                                  )

    # status = models.CharField(max_length=64,
    #                           choices=STATUS_FORM,
    #                           default=NO_CONFIRM,
    #                           help_text="Xác nhận phiếu"
    #                           )

    is_confirm = models.BooleanField(default=False,
                                     null=False,
                                     blank=False)

    execution_date = models.DateTimeField(default=djnow,
                                          blank=True,
                                          help_text="Implementation date"
                                          )
    # NEW
    warehouse = models.ForeignKey(WareHouseCategory,
                                  on_delete=models.SET_NULL,
                                  null=True,
                                  blank=True,
                                  help_text="Warehouse"
                                  )

    attached_document = models.ForeignKey(ProposalForm,
                                          on_delete=models.SET_NULL,
                                          null=True,
                                          blank=True,
                                          help_text="Attached Document"
                                          )
    supplier = models.ForeignKey(SupplierCategory,
                                on_delete=models.SET_NULL,
                                null=True,
                                blank=True,
                                help_text="Supplier"
                                )

    delivered = models.ForeignKey(Staff,
                                  on_delete=models.SET_NULL,
                                  blank=True,
                                  null=True,
                                  related_name='delivered',
                                  help_text="Delivered"
                                  )

    received = models.ForeignKey(Staff,
                                 on_delete=models.SET_NULL,
                                 blank=True,
                                 null=True,
                                 related_name='received',
                                 help_text="Received"
                                 )

    # inventory_checker = models.ForeignKey(Staff,
    #                                       on_delete=models.SET_NULL,
    #                                       null=True,
    #                                       blank=True,
    #                                       related_name='inventory_checker',
    #                                       help_text="Inventory Checker"
    #                                       )

    staff_receive_property = models.ForeignKey(Staff,
                                               on_delete=models.SET_NULL,
                                               null=True,
                                               blank=True,
                                               related_name='staff_receive_property',
                                               help_text="Staff Receive Property"
                                               )

    staff_confiscated_asset = models.ForeignKey(Staff,
                                                on_delete=models.SET_NULL,
                                                null=True,
                                                blank=True,
                                                related_name='staff_confiscated_asset',
                                                help_text="Staff Confiscated Asset"
                                                )

    reason_asset_recovery = models.CharField(max_length=1024,
                                             blank=True,
                                             null=True,
                                             help_text="Reason for Asset Recovery"
                                             )

    loan_period = models.DateTimeField(max_length=1024,
                                       blank=True,
                                       null=True,
                                       help_text="Loan Period"
                                       )

    unit_currently_borrowing = models.ForeignKey(Unit,
                                                 on_delete=models.SET_NULL,
                                                 to_field="uuid",
                                                 related_name="unit_currently_borrowing",
                                                 null=True,
                                                 blank=True,
                                                 help_text="Unit Currently Browwing"
                                                 )

    buyer = models.CharField(max_length=1024,
                             null=True,
                             blank=True,
                             help_text="Buyer"
                             )

    price = models.FloatField(max_length=1024,
                              null=True,
                              blank=True,
                              help_text="Liquidation Price"
                              )

    liquidation_reason = models.CharField(max_length=1024,
                                          null=True,
                                          blank=True,
                                          help_text="Lending Unit"
                                          )

    lending_unit = models.ForeignKey(Unit,
                                     to_field="uuid",
                                     on_delete=models.SET_NULL,
                                     related_name="lending_unit",
                                     null=True,
                                     blank=True,
                                     help_text="Lending Unit"
                                     )

    created_by = models.ForeignKey(Account,
                                   to_field='username',
                                   related_name='%(app_label)s_%(class)s_created_by',
                                   on_delete=(models.SET_NULL),
                                   null=True,
                                   blank=True,
                                   help_text='Creator'
                                   )

    updated_by = models.ForeignKey(Account,
                                   to_field='username',
                                   related_name='%(app_label)s_%(class)s_updated_by',
                                   on_delete=(models.SET_NULL),
                                   null=True,
                                   blank=True,
                                   help_text='Updater'
                                   )

    updated_at = models.DateTimeField(default=djnow,
                                      help_text='Update time'
                                      )

    created_at = models.DateTimeField(default=djnow,
                                      editable=False,
                                      help_text='Posting time'
                                      )

    def __str__(self) -> str:
        return self.name

    def __str__(self) -> str:
        return self.code

    def save(self, *args, **kwargs):
        if self.name is None or self.name == "":
            self.name = self.code
        return super().save(*args, **kwargs)

    def get_json_asset_list(self):
        asset_list = ListAsset.objects.filter(
            code_form=self).values("name").all()
        return asset_list


class ListAsset(models.Model):
    uuid = models.UUIDField(primary_key=True,
                            default=UUID4,
                            max_length=64,
                            editable=False,
                            help_text="UUID")

    code = models.CharField(max_length=1024,
                            unique=True,
                            help_text="Code asset in list"
                            )

    name = models.CharField(max_length=1024,
                            default="Tài sản của phiếu",
                            help_text="Name"
                            )

    asset = models.ForeignKey(Asset,
                              on_delete=models.CASCADE,
                              null=True,
                              blank=True,
                              help_text="Asset"
                              )

    code_form = models.ForeignKey(FormManagement,
                                  on_delete=models.CASCADE,
                                  null=True,
                                  blank=True,
                                  help_text='Code Form'
                                  )

    current_status_asset = models.CharField(max_length=1024,
                                            null=True,
                                            blank=True,
                                            help_text="Current Status Asset"
                                            )

    is_exits_when_inventory = models.BooleanField(null=True,
                                                  blank=True,
                                                  help_text="Does the asset exist at the time of the inventory?")

    created_by = models.ForeignKey(Account,
                                   to_field='username',
                                   related_name='%(app_label)s_%(class)s_created_by',
                                   on_delete=(models.SET_NULL),
                                   null=True,
                                   blank=True,
                                   help_text='Creator'
                                   )

    updated_by = models.ForeignKey(Account,
                                   to_field='username',
                                   related_name='%(app_label)s_%(class)s_updated_by',
                                   on_delete=(models.SET_NULL),
                                   null=True,
                                   blank=True,
                                   help_text='Updater'
                                   )

    updated_at = models.DateTimeField(default=djnow,
                                      help_text='Update time'
                                      )

    created_at = models.DateTimeField(default=djnow,
                                      editable=False,
                                      help_text='Posting time'
                                      )

    def __str__(self) -> str:
        return self.code

    def save(self, *args, **kwargs):
        # if self.name_form is None or self.name_form == "":
        #     self.name_form = self.code_form
        uuid_status = Asset.objects.filter(
            uuid=self.asset.uuid).values('asset_status').first()
        # print(uuid_status['asset_status'])
        status = AssetStatus.objects.filter(
            uuid=uuid_status['asset_status']).values('name').all()
        self.current_status_asset = status
        return super().save(*args, **kwargs)


class TypeAction(models.Model):
    uuid = models.UUIDField(primary_key=True,
                            default=UUID4,
                            max_length=64,
                            editable=False,
                            help_text="UUID"
                            )

    code = models.CharField(max_length=1024,
                            unique=True,
                            help_text="Mã Loại Hành Động"
                            )

    name = models.CharField(max_length=1024,
                            default="Tên Loại Hành Động",
                            help_text="Name"
                            )

    color_code = models.CharField(max_length=1024,
                                  null=True,
                                  blank=True,                                  
                                  help_text="Color"
                                  )

    icon = models.CharField(max_length=1024,
                            null=True,
                            blank=True,
                            help_text="Icon"
                            )

    type_form = models.ForeignKey(ListTypeForm,
                                  on_delete=models.CASCADE,
                                  null=True,
                                  blank=True,
                                  help_text="Name Type Form"
                                  )

    created_by = models.ForeignKey(Account,
                                   to_field='username',
                                   related_name='%(app_label)s_%(class)s_created_by',
                                   on_delete=(models.SET_NULL),
                                   null=True,
                                   blank=True,
                                   help_text='Creator'
                                   )

    updated_by = models.ForeignKey(Account,
                                   to_field='username',
                                   related_name='%(app_label)s_%(class)s_updated_by',
                                   on_delete=(models.SET_NULL),
                                   null=True,
                                   blank=True,
                                   help_text='Updater'
                                   )

    updated_at = models.DateTimeField(default=djnow,
                                      help_text='Update time'
                                      )

    created_at = models.DateTimeField(default=djnow,
                                      editable=False,
                                      help_text='Posting time'
                                      )
    def __str__(self) -> str:
        return self.name

    # def __str__(self) -> str:
    #     return self.code

    def save(self, *args, **kwargs):
        if self.name is None or self.name == "":
            self.name = self.code
        return super().save(*args, **kwargs)

class HistoryUseAsset(models.Model):
    uuid = models.UUIDField(primary_key=True,
                            default=UUID4,
                            max_length=64,
                            editable=False,
                            help_text="UUID"
                            )

    code = models.CharField(max_length=1024,
                            unique=True,
                            help_text="Code"
                            )

    name = models.CharField(max_length=1024,
                            default="Người sử dụng",
                            help_text="Name"
                            )

    form = models.CharField(max_length=1024,
                            null=True,
                            blank=True,
                            help_text="Phiếu"
                            )

    asset = models.ForeignKey(Asset,
                              on_delete=models.CASCADE,
                              null=True,
                              blank=True,
                              help_text="Asset"
                              )

    user = models.ForeignKey(Staff,
                             on_delete=models.CASCADE,
                             null=True,
                             blank=True,
                             help_text="User"
                             )

    status_current = models.CharField(max_length=1024,
                                      null=True,
                                      blank=True,
                                      help_text="Status Current"
                                      )

    started_using = models.DateTimeField(null=True,
                                         blank=True,
                                         help_text="Stared Using"
                                         )

    end_use = models.DateTimeField(null=True,
                                   blank=True,
                                   help_text="End Use"
                                   )

    type_action = models.ForeignKey(TypeAction,
                                    on_delete=models.SET_NULL,
                                    null=True,
                                    blank=True,
                                    help_text="Asset"
                                    )

    created_by = models.ForeignKey(Account,
                                   to_field='username',
                                   related_name='%(app_label)s_%(class)s_created_by',
                                   on_delete=(models.SET_NULL),
                                   null=True,
                                   blank=True,
                                   help_text='Creator'
                                   )

    updated_by = models.ForeignKey(Account,
                                   to_field='username',
                                   related_name='%(app_label)s_%(class)s_updated_by',
                                   on_delete=(models.SET_NULL),
                                   null=True,
                                   blank=True,
                                   help_text='Updater'
                                   )

    updated_at = models.DateTimeField(default=djnow,
                                      help_text='Update time'
                                      )

    created_at = models.DateTimeField(default=djnow,
                                      editable=False,
                                      help_text='Posting time'
                                      )
