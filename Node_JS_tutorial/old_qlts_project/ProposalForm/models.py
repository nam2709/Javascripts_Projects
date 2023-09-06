import os
from sys import _getframe
from django.db import models
from django.conf import settings
from django.utils.translation import gettext as _
import datetime 
from time import gmtime, strftime
from django.utils.timezone import now as djnow
from django.contrib.auth import get_user_model
import pytz
from uuid import uuid4 as UUID4
from uuid import uuid1 as UUID1
from AssetManagement.models import Asset
from company.models import Staff, Unit, Company
from multiselectfield import MultiSelectField
Account = get_user_model()

TIMEZONES = tuple(zip(pytz.all_timezones, pytz.all_timezones))
LANGUAGE_CODE = 'en-us'
LANGUAGES = (
    ('en', 'English'),
    ('vi', 'Vietnam'),
)


#6 Dùng chung bảng ListTypeForm với bên model FormManagement
class ListType(models.Model):
    FIELDS_FORM = (
        ('name', 'Tên'),
        ('code', 'Mã'),
        # ~ thông tin cần thêm vào model ProposalForm
        ('execution_date', 'Ngày thực hiện'),
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
        ('created_by', 'Người tạo'),
        ('updated_by', 'Người chỉnh sửa'),
        ('updated_at', 'Ngày chỉnh sửa'),
        ('created_at', 'Ngày tạo'),
    )
    class Meta:
        verbose_name = _("Kiểu đơn")
        verbose_name_plural = _("Kiểu đơn")
    uuid = models.UUIDField(
                                primary_key=True,
                                default=UUID4,
                                max_length=64,
                                editable=False,
                                help_text='UUID'
                            )

    name = models.CharField(
                                max_length=1024, 
                                blank=True, 
                                null=True, 
                                help_text="Form type name"
                            )
    code = models.CharField(
                                max_length=1024, 
                                unique=True, 
                                help_text="Form code"
                            )
    fields = MultiSelectField(
                                choices=FIELDS_FORM, 
                                blank=True, 
                                null=True, 
                                help_text="Lựa chọn trường"
                            )

    created_by = models.ForeignKey(
                                    Account,
                                    to_field='username',
                                    related_name='%(app_label)s_%(class)s_created_by',
                                    on_delete=(models.SET_NULL),
                                    null=True,
                                    blank=True,
                                    help_text='Creator'
                                )

    updated_by = models.ForeignKey(
                                    Account,
                                    to_field='username',
                                    related_name='%(app_label)s_%(class)s_updated_by',
                                    on_delete=(models.SET_NULL),
                                    null=True,
                                    blank=True,
                                    help_text='Updater'
                                )

    updated_at = models.DateTimeField(default=djnow, help_text='Update time')
    created_at = models.DateTimeField(default=djnow, editable=False, help_text='Posting time')
    def __str__(self):
        return str(self.name)

    def save(self, *args, **kwargs):
        if self.name is None or self.name == "":
            self.name = self.code
        return super().save(*args, **kwargs)


# 1. Danh sách tài sản
class AssetList(models.Model):
    class Meta:
        verbose_name = _("Danh sách tài sản")
        verbose_name_plural = _("Danh sách tài sản")
    uuid = models.UUIDField(
                                primary_key=True, 
                                default=UUID4,
                                max_length=64,
                                null=False,
                                editable=False
                            )
    name = models.CharField(
                                max_length=1024, 
                                editable=True, 
                                help_text='Tên danh sách'
                            )
    code = models.CharField(
                                max_length=1024, 
                                editable=True, 
                                unique=True, 
                                blank=False, 
                                null=False, 
                                help_text="Mã danh sách"
                            ) 
    created_by = models.ForeignKey(
                                    Account,
                                    to_field='username',
                                    related_name='%(app_label)s_%(class)s_created_by',
                                    on_delete=(models.SET_NULL),
                                    null=True,
                                    blank=True,
                                    help_text='Người tạo',
                                )
    updated_by = models.ForeignKey(
                                    Account,
                                    to_field='username',
                                    related_name='%(app_label)s_%(class)s_updated_by',
                                    on_delete=(models.SET_NULL),
                                    null=True,
                                    blank=True,
                                    help_text='Người cập nhật'
                                )
    updated_at = models.DateTimeField(default=djnow, help_text='Thời điểm cập nhật')
    created_at = models.DateTimeField(default=djnow, help_text='Thời điểm tạo')
    def __str__(self):
        return self.name
     

# 2. Liên kết tài sản vs Danh sách - tài sản thuộc danh sách tài sản
class List(models.Model):
    class Meta:
        verbose_name = _("Tài sản theo danh sách")
        verbose_name_plural = _("Tài sản theo danh sách")
    uuid = models.UUIDField(
                                primary_key=True, 
                                default=UUID4,
                                max_length=64,
                                null=False,
                                editable=False
                            )
    name = models.CharField(
                                max_length=1024, 
                                blank=True, 
                                null=True, 
                                help_text='Tên'
                            )
    list = models.ForeignKey(
                                AssetList, 
                                editable=True, 
                                null=True, 
                                blank=True, 
                                on_delete=(models.SET_NULL)
                            )
    asset = models.ForeignKey(
                                Asset, 
                                editable=True, 
                                null=True, 
                                blank=True, 
                                on_delete=(models.SET_NULL)
                            )
    count = models.PositiveIntegerField(default=1)
    created_by = models.ForeignKey(
                                    Account,
                                    to_field='username',
                                    related_name='%(app_label)s_%(class)s_created_by',
                                    on_delete=(models.SET_NULL),
                                    null=True,
                                    blank=True,
                                    help_text='Người tạo',
                                )
    updated_by = models.ForeignKey(
                                    Account,
                                    to_field='username',
                                    related_name='%(app_label)s_%(class)s_updated_by',
                                    on_delete=(models.SET_NULL),
                                    null=True,
                                    blank=True,
                                    help_text='Người cập nhật'
                                )
    updated_at = models.DateTimeField(default=djnow, help_text='Thời điểm cập nhật')
    created_at = models.DateTimeField(default=djnow, help_text='Thời điểm tạo')
    def __str__(self):
        return self.name

# 3. Trạng thái đơn
class ProposalFormStatus(models.Model):
    class Meta:
        verbose_name = _("Trạng thái")
        verbose_name_plural = _("Trạng thái")
    name = models.CharField(
                                max_length=1024, 
                                blank=True, 
                                null=True, 
                                help_text='Hiệu lực đơn đề xuất'
                            )
    uuid = models.UUIDField(
                                primary_key=True, 
                                default=UUID4,
                                max_length=64,
                                null=False,
                                editable=False
                            )
    code = models.CharField(
                                max_length=1024, 
                                editable=True, 
                                unique=True, 
                                blank=False, 
                                null=False, 
                                help_text="Mã trạng thái"
                            )
    is_active = models.BooleanField(
                                        default=True, 
                                        help_text='Trạng thái'
                                    )
    created_by = models.ForeignKey(
                                    Account,
                                    to_field='username',
                                    related_name='%(app_label)s_%(class)s_created_by',
                                    on_delete=(models.SET_NULL),
                                    null=True,
                                    blank=True,
                                    help_text='Người tạo'
                                )
    updated_by = models.ForeignKey(
                                    Account,
                                    to_field='username',
                                    related_name='%(app_label)s_%(class)s_updated_by',
                                    on_delete=(models.SET_NULL),
                                    null=True,
                                    blank=True,
                                    help_text='Người cập nhật'
                                )
    updated_at = models.DateTimeField(default=djnow, help_text='Thời điểm cập nhật')
    created_at = models.DateTimeField(default=djnow, help_text='Thời điểm tạo')

    def __str__(self):
        return self.name
    def save(self,*args, **kwargs):
        if self.name is None:
            self.name = str(self.uuid)
        super().save(*args, **kwargs)


# 4. Kiểu đơn
class ProposalFormType(models.Model):
    FIELDS_FORM = (
        ('price', 'Giá thanh lý'),
        ('buyer', 'Người mua'),
    )
    class Meta:
        verbose_name = _("Kiểu đơn")
        verbose_name_plural = _("Kiểu đơn")

    MIN_WITHDRAW = 1
    MAX_WITHDRAW = 50
    MIN_DEPOSIT = 5
    MAX_DEPOSIT = 20
    name = models.CharField(
                                max_length=1024, 
                                blank=True, 
                                null=True, 
                                default='Đơn đề xuất', 
                                help_text='Kiểu đơn'
                            )
    uuid = models.UUIDField(
                                primary_key=True, 
                                default=UUID4,
                                max_length=64,
                                null=False,
                                editable=False
                            )
    code = models.CharField(
                                max_length=1024, 
                                editable=True, 
                                unique=True, 
                                blank=False, 
                                null=False, 
                                help_text="Mã kiểu đơn"
                            )
    fields = MultiSelectField(
                                choices=FIELDS_FORM, 
                                blank=True, 
                                null=True, 
                                help_text="Lựa chọn trường cho loại đơn"
                            )
    created_by = models.ForeignKey(
                                    Account,
                                    to_field='username',
                                    related_name='%(app_label)s_%(class)s_created_by',
                                    on_delete=(models.SET_NULL),
                                    null=True,
                                    blank=True,
                                    help_text='Người tạo'
                                )
    updated_by = models.ForeignKey(
                                    Account,
                                    to_field='username',
                                    related_name='%(app_label)s_%(class)s_updated_by',
                                    on_delete=(models.SET_NULL),
                                    null=True,
                                    blank=True,
                                    help_text='Người cập nhật'
                                )
    updated_at = models.DateTimeField(default=djnow, help_text="Thời điểm cập nhật")
    created_at = models.DateTimeField(default=djnow, help_text="Thời điểm tạo")

    def __str__(self):
        return self.name
    def save(self,*args, **kwargs):
        if self.name is None:
            self.name = str(self.uuid)
        super().save(*args, **kwargs)


# 5. Đơn đề xuất
class ProposalForm(models.Model):
    class Meta:
        verbose_name = _("Đơn đề xuất")
        verbose_name_plural = _("Đơn đề xuất")

    MIN_WITHDRAW = 1
    MAX_WITHDRAW = 50
    MIN_DEPOSIT = 5
    MAX_DEPOSIT = 20
    name = models.CharField(
                                max_length=1024, 
                                blank=True, 
                                null=True, 
                                help_text="Đơn đề xuất"
                            )
    uuid = models.UUIDField(
                                primary_key=True, 
                                default=UUID4,
                                max_length=64,
                                null=False,
                                editable=False
                            )
    code = models.CharField(
                                max_length=1024, 
                                editable=True, 
                                unique=True, 
                                blank=False, 
                                null=False, 
                                help_text="Mã đơn"
                            )
    reason = models.CharField(  
                                max_length=10024, 
                                editable=True, 
                                blank=False, 
                                null=True, 
                                help_text="Lý do tạo đơn"
                            )
    company = models.ForeignKey(
                                    Company, 
                                    editable=True, 
                                    blank=True, 
                                    null=True, 
                                    on_delete=(models.SET_NULL), 
                                    help_text='Công ty'
                                )
    proposal_type = models.ForeignKey(
                                        ListType, 
                                        editable=True, 
                                        null=True, 
                                        on_delete=(models.SET_NULL), 
                                        help_text='Kiểu đơn'
                                    ) 
    proposal_status = models.ForeignKey(
                                            ProposalFormStatus, 
                                            editable=True, 
                                            null=True, 
                                            on_delete=(models.SET_NULL), 
                                            help_text='Hiệu lực'
                                        )
    proposer = models.ForeignKey(
                                    Staff, 
                                    editable=True, 
                                    null=True, 
                                    on_delete=(models.SET_NULL), 
                                    help_text='Người đề xuất'
                                )
    #thêm attribute from ListTypeForm
    execution_date = models.DateTimeField(default=djnow,
                                        blank=True,
                                        help_text="Implementation date"
                                        )

    delivered = models.ForeignKey(Staff,
                                    on_delete=models.SET_NULL,
                                    blank=True,
                                    null=True,
                                    related_name='%(app_label)s_%(class)s_delivered',
                                    help_text="Delivered"
                                    )

    received = models.ForeignKey(Staff,
                                    on_delete=models.SET_NULL,
                                    blank=True,
                                    null=True,
                                    related_name='%(app_label)s_%(class)s_received',
                                    help_text="Received"
                                    )

    staff_receive_property = models.ForeignKey(Staff,
                                                on_delete=models.SET_NULL,
                                                null=True,
                                                blank=True,
                                                related_name='%(app_label)s_%(class)s_staff_receive_property',
                                                help_text="Staff Receive Property"
                                                )

    staff_confiscated_asset = models.ForeignKey(Staff,
                                                on_delete=models.SET_NULL,
                                                null=True,
                                                blank=True,
                                                related_name='%(app_label)s_%(class)s_staff_confiscated_asset',
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
                                                    related_name='%(app_label)s_%(class)s_unit_currently_borrowing',
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
                                        related_name='%(app_label)s_%(class)s_lending_unit',
                                        null=True,
                                        blank=True,
                                        help_text="Lending Unit"
                                        )
    #--end--

    asset_list = models.ForeignKey(
                                    AssetList, 
                                    editable=True, 
                                    null=True, 
                                    on_delete=(models.SET_NULL), 
                                    help_text='Danh sách tài sản'
                                )
    created_by = models.ForeignKey(
                                    Account,
                                    to_field='username',
                                    related_name='%(app_label)s_%(class)s_created_by',
                                    on_delete=(models.SET_NULL),
                                    null=True,
                                    blank=True,
                                    help_text='Người tạo'
                                )
    updated_by = models.ForeignKey(
                                    Account,
                                    to_field='username',
                                    related_name='%(app_label)s_%(class)s_updated_by',
                                    on_delete=(models.SET_NULL),
                                    null=True,
                                    blank=True,
                                    help_text='Người cập nhật'
                                )
    updated_at = models.DateTimeField(default=djnow, help_text="Thời điểm cập nhật")
    created_at = models.DateTimeField(default=djnow, help_text="Thời điểm tạo")

    def __str__(self):
        return self.name
    def save(self,*args, **kwargs):
        if self.name is None:
            self.name = str(self.uuid)
        super().save(*args, **kwargs)



# ------------------------------------------------------------------------
#------------------------ Quản lý luồng phê duyệt ------------------------
# ------------------------------------------------------------------------


# 7. Quản lý quy trình đề xuất
# class ProposalProcessConfig(models.Model):
#     class Meta:
#         verbose_name = _("Quy trình duyệt đơn đề xuất")
#         verbose_name_plural = _("Quy trình duyệt đơn đề xuất")
#     uuid = models.UUIDField(
#                                 primary_key=True, 
#                                 default=UUID4,
#                                 max_length=64,
#                                 null=False,
#                                 editable=False
#                             )
#     name = models.CharField(
#                                 max_length=1024, 
#                                 editable=True, 
#                                 help_text='Tên'
#                             )
#     code = models.CharField(
#                                 max_length=1024, 
#                                 editable=True, 
#                                 unique=True, 
#                                 blank=False, 
#                                 null=False, 
#                                 help_text="Mã"
#                             ) 
#     type = models.ForeignKey(
#                                 ListType, 
#                                 blank=True, 
#                                 null=True, 
#                                 on_delete=models.SET_NULL, 
#                                 help_text="Kiểu đơn"
#                             )
#     created_by = models.ForeignKey(
#                                     Account,
#                                     to_field='username',
#                                     related_name='%(app_label)s_%(class)s_created_by',
#                                     on_delete=(models.SET_NULL),
#                                     null=True,
#                                     blank=True,
#                                     help_text='Người tạo',
#                                 )
#     updated_by = models.ForeignKey(
#                                     Account,
#                                     to_field='username',
#                                     related_name='%(app_label)s_%(class)s_updated_by',
#                                     on_delete=(models.SET_NULL),
#                                     null=True,
#                                     blank=True,
#                                     help_text='Người cập nhật'
#                                 )
#     updated_at = models.DateTimeField(default=djnow, help_text='Thời điểm cập nhật')
#     created_at = models.DateTimeField(default=djnow, help_text='Thời điểm tạo')
#     def __str__(self):
#         return self.name
    

# # 8. template quy trình đề xuất
# class ProposalProcessStepTemplate(models.Model):
#     # fields = []
#     class Meta:
#         verbose_name = _("Template Quy trình")
#         verbose_name_plural = _("Template Quy trình")
#     uuid = models.UUIDField(
#                                 primary_key=True, 
#                                 default=UUID4,
#                                 max_length=64,
#                                 null=False,
#                                 editable=False
#                             )
#     name = models.CharField(
#                                 max_length=1024, 
#                                 editable=True, 
#                                 help_text='Tên'
#                             )
#     code = models.CharField(
#                                 max_length=1024, 
#                                 editable=True, 
#                                 unique=True, 
#                                 blank=False, 
#                                 null=False, 
#                                 help_text="Mã"
#                             ) 
#     order = models.IntegerField(
#                                     default=1, 
#                                     help_text="Thứ tự"
#                                 )
#     config = models.ForeignKey(
#                                 ProposalProcessConfig, 
#                                 null=True, 
#                                 on_delete=models.SET_NULL, 
#                                 help_text="Config"
#                             )
#     is_all_confirm_to_next = models.BooleanField(
#                                                 default=False,
#                                                 help_text=""
#                                             )
#     is_done = models.BooleanField(
#                                     default=False,
#                                     help_text=""
#                                 )
#     created_by = models.ForeignKey(
#                                     Account,
#                                     to_field='username',
#                                     related_name='%(app_label)s_%(class)s_created_by',
#                                     on_delete=(models.SET_NULL),
#                                     null=True,
#                                     blank=True,
#                                     help_text='Người tạo',
#                                 )
#     updated_by = models.ForeignKey(
#                                     Account,
#                                     to_field='username',
#                                     related_name='%(app_label)s_%(class)s_updated_by',
#                                     on_delete=(models.SET_NULL),
#                                     null=True,
#                                     blank=True,
#                                     help_text='Người cập nhật'
#                                 )      
#     updated_at = models.DateTimeField(default=djnow, help_text='Thời điểm cập nhật')
#     created_at = models.DateTimeField(default=djnow, help_text='Thời điểm tạo')
#     def __str__(self):
#         return self.name    
    

# # 9. chi tiết các bước trong luồng phê duyệt
# class ProposalProcessStepDetail(models.Model):
#     class Meta:
#         verbose_name = _("Các bước chi tiết của Quy trình")
#         verbose_name_plural = _("Các bước chi tiết của Quy trình")
#     uuid = models.UUIDField(
#                                 primary_key=True, 
#                                 default=UUID4,
#                                 max_length=64,
#                                 null=False,
#                                 editable=False
#                             )
#     name = models.CharField(
#                                 max_length=1024, 
#                                 editable=True, 
#                                 help_text='Tên'
#                             )
#     code = models.CharField(
#                                 max_length=1024, 
#                                 editable=True, 
#                                 unique=True, 
#                                 blank=False, 
#                                 null=False, 
#                                 help_text="Mã"
#                             ) 
#     order = models.IntegerField(
#                                     default=1, 
#                                     help_text="Thứ tự"
#                                 )
#     type = models.ForeignKey(   
#                                 ListType, 
#                                 blank=True, 
#                                 null=True, 
#                                 on_delete=models.SET_NULL, 
#                                 help_text="Kiểu đơn"
#                             )
#     proposal = models.ForeignKey(
#                                     ProposalForm,
#                                     on_delete=models.CASCADE,
#                                     help_text="Đơn đề xuất"
#                                 )
#     template = models.ForeignKey(
#                                 ProposalProcessStepTemplate, 
#                                 null=True, 
#                                 on_delete=models.SET_NULL, 
#                                 help_text="template"
#                             )
#     to_users = models.ForeignKey(
#                                     Staff,
#                                     null=True,
#                                     on_delete=models.SET_NULL,
#                                     help_text="Người nhận/xét duyệt"
#                                 )
#     is_done = models.BooleanField(
#                                     default=False,
#                                     help_text=""                                    
#                                 )
#     is_go_next = models.BooleanField(
#                                         default=False,
#                                         help_text=""                                    
#                                     )
#     is_checked = models.BooleanField(
#                                         default=False,
#                                         help_text=""                                    
#                                     )
#     created_by = models.ForeignKey(
#                                     Account,
#                                     to_field='username',
#                                     related_name='%(app_label)s_%(class)s_created_by',
#                                     on_delete=(models.SET_NULL),
#                                     null=True,
#                                     blank=True,
#                                     help_text='Người tạo',
#                                 )
#     updated_by = models.ForeignKey(
#                                     Account,
#                                     to_field='username',
#                                     related_name='%(app_label)s_%(class)s_updated_by',
#                                     on_delete=(models.SET_NULL),
#                                     null=True,
#                                     blank=True,
#                                     help_text='Người cập nhật'
#                                 )
#     updated_at = models.DateTimeField(default=djnow, help_text='Thời điểm cập nhật')
#     created_at = models.DateTimeField(default=djnow, help_text='Thời điểm tạo')
#     def __str__(self):
#         return self.name    
    

# # 10. ProposalConfirmStepByUser
# class ProposalConfirmStepByUser(models.Model):
#     class Meta:
#         verbose_name = _("Bước xác nhận của người dùng")
#         verbose_name_plural = _("Bước xác nhận của người dùng")
#     uuid = models.UUIDField(
#                                 primary_key=True, 
#                                 default=UUID4,
#                                 max_length=64,
#                                 null=False,
#                                 editable=False
#                             )
#     name = models.CharField(
#                                 max_length=1024, 
#                                 editable=True, 
#                                 help_text='Tên'
#                             )
#     code = models.CharField(
#                                 max_length=1024, 
#                                 editable=True, 
#                                 unique=True, 
#                                 blank=False, 
#                                 null=False, 
#                                 help_text="Mã"
#                             ) 
#     user = models.ForeignKey(
#                                 Staff,
#                                 on_delete=models.CASCADE,
#                                 help_text="Người xác nhận"
#                             )
#     step_detail = models.ForeignKey(
#                                 ProposalProcessStepDetail,
#                                 on_delete=models.CASCADE,
#                                 help_text="Bước"
#                             )
#     is_accepted = models.BooleanField(
#                                         default=False,
#                                         help_text="đã/chưa được xác nhận"  
#                                     )
#     is_checked = models.BooleanField(
#                                         default=False,
#                                         help_text="Biến kiểm tra step cuối"
#                                     )
#     created_by = models.ForeignKey(
#                                     Account,
#                                     to_field='username',
#                                     related_name='%(app_label)s_%(class)s_created_by',
#                                     on_delete=(models.SET_NULL),
#                                     null=True,
#                                     blank=True,
#                                     help_text='Người tạo',
#                                 )
#     updated_by = models.ForeignKey(
#                                     Account,
#                                     to_field='username',
#                                     related_name='%(app_label)s_%(class)s_updated_by',
#                                     on_delete=(models.SET_NULL),
#                                     null=True,
#                                     blank=True,
#                                     help_text='Người cập nhật'
#                                 )
#     updated_at = models.DateTimeField(default=djnow, help_text='Thời điểm cập nhật')
#     created_at = models.DateTimeField(default=djnow, help_text='Thời điểm tạo')
#     def __str__(self):
#         return self.name



    