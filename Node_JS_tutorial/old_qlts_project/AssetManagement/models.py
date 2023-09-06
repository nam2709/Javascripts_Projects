from django.db import models
from django.utils.timezone import now as djnow
from django.utils.translation import gettext_lazy as _

import uuid
from datetime import date

from company.models import City
from company.models import Company
from company.models import Staff


from django.contrib.auth import get_user_model

Account = get_user_model()


# Create your models here.

class SupplierCategory(models.Model):
    '''Nhà cung cấp tài sản'''
    class Meta:
        verbose_name = _('Nhà cung cấp')
        verbose_name_plural = _('Những nhà cung cấp')

    uuid = models.UUIDField(
                            primary_key=True, 
                            unique=True,
                            default=uuid.uuid4, 
                            editable=False,
                            help_text='Khóa chính của Nhà cung cấp'
                            )
    
    code = models.CharField(
                            max_length=150, 
                            unique=True, 
                            help_text='Mã nhà cung cấp'
                            )
    
    name = models.CharField(
                            max_length=150, 
                            blank=True, 
                            null=True,
                            help_text='Tên nhà cung cấp'
                            )
    
    address = models.ForeignKey(
                                City, 
                                on_delete=models.SET_NULL,
                                null=True,
                                blank=True,
                                help_text='Địa chỉ'
                                )
    
    detail_address = models.TextField(
                                    max_length=1000, 
                                    blank=True, 
                                    null=True, 
                                    help_text='Địa chỉ cụ thể')
    
    contact_info = models.CharField(
                                    max_length=1000, 
                                    null=True, 
                                    blank=True,
                                    help_text='Thông tin liên hệ'
                                    )
    
    created_at = models.DateTimeField(
                                    default=djnow, 
                                    editable=False,
                                    help_text='Được tạo lúc'
                                    )
    
    updated_at = models.DateField(
                                auto_now_add=True,
                                editable=False,
                                help_text='Cập nhật lúc'
                                )
    
    created_by = models.ForeignKey(
                                Account, 
                                to_field= 'username',
                                on_delete=models.SET_NULL,
                                null=True,
                                blank=True,
                                related_name= '%(app_label)s_%(class)s_created_by',
                                editable=False,
                                help_text='Được tạo bởi'
                                )
    
    updated_by = models.ForeignKey(
                                Account, 
                                to_field='username', 
                                on_delete=models.SET_NULL,
                                null=True,
                                blank=True,
                                related_name='%(app_label)s_%(class)s_updated_by', 
                                editable=False,
                                help_text='Cập nhật bởi'
                                )
    
    def __str__(self):
        return self.name
    

class WareHouseCategory(models.Model):
    '''Nhà kho'''
    class Meta:
        verbose_name = _('Nhà kho')
        verbose_name_plural = _('Những nhà kho')
    
    uuid = models.UUIDField(
                            primary_key=True, 
                            unique=True,
                            default=uuid.uuid4, 
                            editable=False,
                            help_text='Khóa chính của kho'
                            )
    
    code = models.CharField(
                            max_length=150, 
                            unique=True, 
                            help_text='Mã kho'
                            )
    
    name = models.CharField(
                            max_length=150, 
                            blank=True, 
                            null=True,
                            help_text='Tên kho'
                            )
    
    status = models.BooleanField(
                                default=True, 
                                help_text='Trạng thái kho'
                                )
    
    manager = models.ForeignKey(
                                Account, 
                                on_delete=models.CASCADE,
                                related_name='manager_name',
                                to_field='username', 
                                help_text='Người quản lý kho'
                                )
    
    created_at = models.DateTimeField(
                                    default=djnow, 
                                    editable=False,
                                    help_text='Được tạo lúc'
                                    )
    
    updated_at = models.DateField(
                                auto_now_add=True,
                                editable=False,
                                help_text='Cập nhật lúc'
                                )
    
    created_by = models.ForeignKey(
                                Account, 
                                on_delete = models.SET_NULL,
                                null=True,
                                blank=True,
                                to_field= 'username',
                                related_name= '%(app_label)s_%(class)s_created_by',
                                editable=False,
                                help_text='Được tạo bởi'
                                )
    
    updated_by = models.ForeignKey(
                                Account, 
                                on_delete = models.SET_NULL,
                                null=True,
                                blank=True,
                                to_field='username', 
                                related_name='%(app_label)s_%(class)s_updated_by', 
                                editable=False,
                                help_text='Cập nhật bởi'
                                )
    
    def __str__(self):
        return self.name
    

class UnitCategory(models.Model):
    '''Đơn vị tính giá trị tài sản (Cái, chiếc,...)'''
    class Meta:
        verbose_name = _('Đơn vị tính')
        verbose_name_plural = _('Những đơn vị tính')
    
    uuid = models.UUIDField(
                            primary_key=True, 
                            unique=True,
                            default=uuid.uuid4, 
                            editable=False,
                            help_text='Khóa chính của đơn vị tính'
                            )
    
    code = models.CharField(
                            max_length=150, 
                            unique=True, 
                            help_text='Mã đơn vị tính'
                            )
    
    name = models.CharField(
                            max_length=150, 
                            unique=True,
                            blank=True, 
                            null=True,
                            help_text='Tên đơn vị tính'
                            )
    
    created_at = models.DateTimeField(
                                    default=djnow, 
                                    editable=False,
                                    help_text='Được tạo lúc'
                                    )
    
    updated_at = models.DateField(
                                auto_now_add=True,
                                editable=False,
                                help_text='Cập nhật lúc'
                                )
    
    created_by = models.ForeignKey(
                                Account, 
                                on_delete = models.SET_NULL,
                                null=True,
                                blank=True,
                                to_field= 'username',
                                related_name= '%(app_label)s_%(class)s_created_by',
                                editable=False,
                                help_text='Được tạo bởi'
                                )
    
    updated_by = models.ForeignKey(
                                Account, 
                                on_delete = models.SET_NULL,
                                null=True,
                                blank=True,
                                to_field='username', 
                                related_name='%(app_label)s_%(class)s_updated_by', 
                                editable=False,
                                help_text='Cập nhật bởi'
                                )
    
    def __str__(self):
        return self.name


class CurrencyUnit(models.Model):
    '''Đơn vị tính giá trị tài sản (Cái, chiếc,...)'''
    class Meta:
        verbose_name = _('Đơn vị tiền tệ')
        verbose_name_plural = _('Những đơn vị tiền tệ')
    
    uuid = models.UUIDField(
                            primary_key=True, 
                            unique=True,
                            default=uuid.uuid4, 
                            editable=False,
                            help_text='Khóa chính của đơn vị tiền tệ'
                            )
    
    code = models.CharField(
                            max_length=150, 
                            unique=True, 
                            help_text='Mã đơn vị tiền tệ'
                            )
    
    name = models.CharField(
                            max_length=150, 
                            unique=True,
                            blank=True, 
                            null=True,
                            help_text='Tên đơn vị tiền tệ'
                            )
    
    created_at = models.DateTimeField(
                                    default=djnow, 
                                    editable=False,
                                    help_text='Được tạo lúc'
                                    )
    
    updated_at = models.DateField(
                                auto_now_add=True,
                                editable=False,
                                help_text='Cập nhật lúc'
                                )
    
    created_by = models.ForeignKey(
                                Account, 
                                on_delete = models.SET_NULL,
                                null=True,
                                blank=True,
                                to_field= 'username',
                                related_name= '%(app_label)s_%(class)s_created_by',
                                editable=False,
                                help_text='Được tạo bởi'
                                )
    
    updated_by = models.ForeignKey(
                                Account, 
                                on_delete = models.SET_NULL,
                                null=True,
                                blank=True,
                                to_field='username', 
                                related_name='%(app_label)s_%(class)s_updated_by', 
                                editable=False,
                                help_text='Cập nhật bởi'
                                )
    
    def __str__(self):
        return self.name
    

class AssetStatus(models.Model):
    '''Tình trạng của thiết bị'''
    class Meta:
        verbose_name = _('Tình trạng tài sản')
        verbose_name_plural = _('Những tình trạng tài sản')
    
    uuid = models.UUIDField(
                            primary_key=True, 
                            unique=True,
                            default=uuid.uuid4, 
                            editable=False,
                            help_text='Khóa chính của tình trạng tài sản'
                            )
    
    code = models.CharField(
                            max_length=150, 
                            unique=True, 
                            help_text='Mã tình trạng'
                            )
    
    name = models.CharField(
                            max_length=150, 
                            blank=True, 
                            null=True,
                            help_text='Tên tình trạng'
                            )
    
    detail_description = models.TextField(
                                        max_length=1000, 
                                        blank=True, 
                                        null=True, 
                                        help_text='Mô tả chi tiết tình trạng thiết bị')
    
    created_at = models.DateTimeField(
                                    default=djnow, 
                                    editable=False,
                                    help_text='Được tạo lúc'
                                    )
    
    updated_at = models.DateField(
                                auto_now_add=True,
                                editable=False,
                                help_text='Cập nhật lúc'
                                )
    
    created_by = models.ForeignKey(
                                Account, 
                                on_delete = models.SET_NULL,
                                null=True,
                                blank=True,
                                to_field= 'username',
                                related_name= '%(app_label)s_%(class)s_created_by',
                                editable=False,
                                help_text='Được tạo bởi'
                                )
    
    updated_by = models.ForeignKey(
                                Account, 
                                on_delete = models.SET_NULL,
                                null=True,
                                blank=True,
                                to_field='username', 
                                related_name='%(app_label)s_%(class)s_updated_by', 
                                editable=False,
                                help_text='Cập nhật bởi'
                                )
    
    def __str__(self):
        return self.name


class OwnStatus(models.Model):
    '''Trạng thái sở hữu'''
    class Meta:
        verbose_name = _('Trạng thái sở hữu')
        verbose_name_plural = _('Những trạng thái sở hữu')
    
    uuid = models.UUIDField(
                            primary_key=True, 
                            unique=True,
                            default=uuid.uuid4, 
                            editable=False,
                            help_text='Khóa chính của trạng thái sở hữu'
                            )
    
    code = models.CharField(
                            max_length=150, 
                            unique=True, 
                            help_text='Mã trạng thái sở hữu'
                            )
    
    name = models.CharField(
                            max_length=150, 
                            blank=True, 
                            null=True,
                            help_text='Tên đơn trạng thái sở hữu'
                            )
    
    detail_description = models.TextField(
                                        max_length=1000, 
                                        blank=True, 
                                        null=True, 
                                        help_text='Mô tả chi tiết trạng thái')
    
    created_at = models.DateTimeField(
                                    default=djnow, 
                                    editable=False,
                                    help_text='Được tạo lúc'
                                    )
    
    updated_at = models.DateField(
                                auto_now_add=True,
                                editable=False,
                                help_text='Cập nhật lúc'
                                )
    
    created_by = models.ForeignKey(
                                Account, 
                                on_delete = models.SET_NULL,
                                null=True,
                                blank=True,
                                to_field= 'username',
                                related_name= '%(app_label)s_%(class)s_created_by',
                                editable=False,
                                help_text='Được tạo bởi'
                                )
    
    updated_by = models.ForeignKey(
                                Account, 
                                on_delete = models.SET_NULL,
                                null=True,
                                blank=True,
                                to_field='username', 
                                related_name='%(app_label)s_%(class)s_updated_by', 
                                editable=False,
                                help_text='Cập nhật bởi'
                                )
    
    def __str__(self):
        return self.name
    

class AssetOfType(models.Model):
    '''Loại hình tài sản (Vô hình hay hữu hình, phần cứng hay mềm)'''
    class Meta:
        verbose_name = _('Loại hình tài sản')
        verbose_name_plural = _('Những loại hình tài sản')
    
    uuid = models.UUIDField(
                            primary_key=True, 
                            unique=True,
                            default=uuid.uuid4, 
                            editable=False,
                            help_text='Khóa chính của loại hình tài sản'
                            )
    
    code = models.CharField(
                            max_length=150, 
                            unique=True, 
                            help_text='Mã loại hình tài sản'
                            )
    
    name = models.CharField(
                            max_length=150, 
                            unique=True,
                            blank=True, 
                            null=True,
                            help_text='Tên loại hình tài sản'
                            )
    
    created_at = models.DateTimeField(
                                    default=djnow, 
                                    editable=False,
                                    help_text='Được tạo lúc'
                                    )
    
    updated_at = models.DateField(
                                auto_now_add=True,
                                editable=False,
                                help_text='Cập nhật lúc'
                                )
    
    created_by = models.ForeignKey(
                                Account, 
                                on_delete = models.SET_NULL,
                                null=True,
                                blank=True,
                                to_field= 'username',
                                related_name= '%(app_label)s_%(class)s_created_by',
                                editable=False,
                                help_text='Được tạo bởi'
                                )
    
    updated_by = models.ForeignKey(
                                Account, 
                                on_delete = models.SET_NULL,
                                null=True,
                                blank=True,
                                to_field='username', 
                                related_name='%(app_label)s_%(class)s_updated_by', 
                                editable=False,
                                help_text='Cập nhật bởi'
                                )
    
    def __str__(self):
        return self.name


class AssetType(models.Model):
    '''Loại tài sản - Thiết bị chi tiết'''
    class Meta:
        verbose_name = _('Loại tài sản')
        verbose_name_plural = _('Những loại tài sản')
    
    uuid = models.UUIDField(
                            primary_key=True, 
                            unique=True,
                            default=uuid.uuid4, 
                            editable=False,
                            help_text='Khóa chính của loại tài sản'
                            )
    
    code = models.CharField(
                            max_length=150, 
                            unique=True, 
                            help_text='Mã loại tài sản'
                            )
    
    name = models.CharField(
                            max_length=150, 
                            unique = True,
                            blank=True, 
                            null=True,
                            help_text='Tên loại tài sản'
                            )
    
    asset_of_type = models.ForeignKey(
                                    AssetOfType, 
                                    on_delete = models.SET_NULL,
                                    null=True,
                                    blank=True,
                                    help_text='Loại hình tài sản'
                                    )
    
    created_at = models.DateTimeField(
                                    default=djnow, 
                                    editable=False,
                                    help_text='Được tạo lúc'
                                    )
    
    updated_at = models.DateField(
                                auto_now_add=True,
                                editable=False,
                                help_text='Cập nhật lúc'
                                )
    
    created_by = models.ForeignKey(
                                Account, 
                                on_delete = models.SET_NULL,
                                null=True,
                                blank=True,
                                to_field= 'username',
                                related_name= '%(app_label)s_%(class)s_created_by',
                                editable=False,
                                help_text='Được tạo bởi'
                                )
    
    updated_by = models.ForeignKey(
                                Account, 
                                on_delete = models.SET_NULL,
                                null=True,
                                blank=True,
                                to_field='username', 
                                related_name='%(app_label)s_%(class)s_updated_by', 
                                editable=False,
                                help_text='Cập nhật bởi'
                                )
    
    def __str__(self):
        return self.name


class AssetDetailTemplate(models.Model):
    '''Template để điền tên cấu hình'''
    class Meta:
        verbose_name = _('Mẫu chi tiết thông số tài sản')
        verbose_name_plural = _('Những mẫu chi tiết thông số tài sản')
    
    uuid = models.UUIDField(
                            primary_key=True, 
                            unique=True,
                            default=uuid.uuid4, 
                            editable=False,
                            help_text='Khóa chính của mẫu thông số'
                            )
    
    code = models.CharField(
                            max_length=150, 
                            unique=True, 
                            help_text='Mã mẫu thông số'
                            )
    
    name = models.CharField(
                            max_length=150, 
                            unique = True,
                            blank=True, 
                            null=True,
                            help_text='Tên thông số'
                            )
    
    asset_type = models.ForeignKey(
                                    AssetType,
                                    on_delete = models.SET_NULL,
                                    null=True,
                                    blank=True, 
                                    related_name='%(app_label)s_%(class)s_asset_type',
                                    help_text='Loai TS'
                                )
    
    created_at = models.DateTimeField(
                                    default=djnow, 
                                    editable=False,
                                    help_text='Được tạo lúc'
                                    )
    
    updated_at = models.DateField(
                                auto_now_add=True,
                                editable=False,
                                help_text='Cập nhật lúc'
                                )
    
    created_by = models.ForeignKey(
                                Account, 
                                on_delete = models.SET_NULL,
                                null=True,
                                blank=True,
                                to_field= 'username',
                                related_name= '%(app_label)s_%(class)s_created_by',
                                editable=False,
                                help_text='Được tạo bởi'
                                )
    
    updated_by = models.ForeignKey(
                                Account, 
                                on_delete = models.SET_NULL,
                                null=True,
                                blank=True,
                                to_field='username', 
                                related_name='%(app_label)s_%(class)s_updated_by', 
                                editable=False,
                                help_text='Cập nhật bởi'
                                )
    
    def __str__(self):
        return self.name


class Asset(models.Model):
    '''Tài sản'''
    class Meta:
        verbose_name = _('Tài sản')
        verbose_name_plural = _('Những Tài sản')
    
    uuid = models.UUIDField(
                            primary_key=True, 
                            unique=True,
                            default=uuid.uuid4, 
                            editable=False,
                            help_text='Khóa chính của tài sản'
                            )
    
    code = models.CharField(
                            max_length=150, 
                            unique=True, 
                            help_text='Mã tài sản'
                            )
    
    name = models.CharField(
                            max_length=150, 
                            blank=True, 
                            null=True,
                            help_text='Tên tài sản'
                            )
    
    asset_name = models.CharField(
                            max_length=150, 
                            blank=True, 
                            null=True,
                            help_text='Tên của Nam'
                            )
    
    price_buy = models.DecimalField(
                                    max_digits=30, 
                                    decimal_places=2,
                                    default=0,
                                    blank=True,
                                    null=True,
                                    help_text='Giá mua',
                                    editable=True
                                    )
    
    date_added = models.DateField(
                                default=date.today, 
                                help_text='Ngày mua'
                                )
    
    #Trường này sẽ tự cập nhật giá khấu hao theo kỳ
    price_current = models.TextField(
                                    null=True,
                                    blank=True,
                                    help_text='Giá trị hiện tại của tài sản'
                                    )
    
    asset_type = models.ForeignKey(
                                    AssetType, 
                                    on_delete = models.SET_NULL,
                                    null=True, 
                                    blank=True, 
                                    related_name='%(app_label)s_%(class)s_asset_type', 
                                    help_text='Loại tài sản'
                                )
    
    warehouse = models.ForeignKey(
                                    WareHouseCategory, 
                                    on_delete = models.SET_NULL,
                                    null = True,
                                    blank=True,
                                    related_name='%(app_label)s_%(class)s_warehouse', 
                                    help_text='Kho'
                                )
    
    supplier = models.ForeignKey(
                                SupplierCategory, 
                                on_delete = models.SET_NULL,
                                null=True,
                                blank=True,
                                related_name='%(app_label)s_%(class)s_supplier'
                                )
    
    # Trường này sẽ tự động cập nhật người đang sở hữu tài sản
    current_asset_user = models.ForeignKey(
                                    Staff, 
                                    on_delete = models.SET_NULL,
                                    null=True,
                                    blank=True, 
                                    related_name='%(app_label)s_%(class)s_using'
                                    )
    
    #Tinh trang so huu
    own_status = models.ForeignKey(
                                    OwnStatus, 
                                    on_delete = models.SET_NULL,
                                    null=True,
                                    blank=True,
                                    related_name='%(app_label)s_%(class)s_own_status', 
                                    help_text='Trạng thái sở hữu'
                                )
    
    asset_status = models.ForeignKey(
                                    AssetStatus, 
                                    on_delete = models.SET_NULL,
                                    null=True,
                                    blank=True,
                                    related_name='%(app_label)s_%(class)s_asset_status', 
                                    help_text='Tình trạng thiết bị'
                                    )
    
    unit = models.ForeignKey(
                            UnitCategory, 
                            on_delete = models.SET_NULL,
                            null=True,
                            blank=True,
                            related_name='%(app_label)s_%(class)s_unit', 
                            help_text='Đơn vị tính'
                            )
    
    currency_unit = models.ForeignKey(
                            CurrencyUnit, 
                            on_delete = models.SET_NULL,
                            null=True,
                            blank=True,
                            related_name='%(app_label)s_%(class)s_currency', 
                            help_text='Đơn vị tiền tệ'
                            )
    
    owned_company = models.ForeignKey(
                                    Company, 
                                    on_delete = models.SET_NULL,
                                    null=True,
                                    blank=True,
                                    related_name='%(app_label)s_%(class)s_owned_company', 
                                    help_text='Công ty sở hữu tài sản'
                                    )
    
    created_at = models.DateTimeField(
                                    default=djnow, 
                                    editable=False,
                                    help_text='Được tạo lúc'
                                    )
    
    updated_at = models.DateField(
                                auto_now_add=True,
                                editable=False,
                                help_text='Cập nhật lúc'
                                )
    
    created_by = models.ForeignKey(
                                Account, 
                                on_delete = models.SET_NULL,
                                null=True,
                                blank=True,
                                to_field= 'username',
                                related_name= '%(app_label)s_%(class)s_created_by',
                                editable=False,
                                help_text='Được tạo bởi'
                                )
    
    updated_by = models.ForeignKey(
                                Account, 
                                on_delete = models.SET_NULL,
                                null=True,
                                blank=True,
                                to_field='username', 
                                related_name='%(app_label)s_%(class)s_updated_by', 
                                editable=False,
                                help_text='Cập nhật bởi'
                                )
    
    def __str__(self):
        return self.name


class AssetDetail(models.Model):
    '''Bản chi tiết của tài sản'''
    class Meta:
        verbose_name = _('Chi tiết tài sản')
        verbose_name_plural = _('Những chi tiết tài sản')
    
    uuid = models.UUIDField(
                            primary_key=True, 
                            unique=True,
                            default=uuid.uuid4, 
                            editable=False,
                            help_text='Khóa chính của chi tiết tài sản'
                            )
    
    code = models.CharField(
                            max_length=150, 
                            unique=True, 
                            help_text='Mã chi tiết tài sản'
                            )
    
    name = models.CharField(
                            max_length=150, 
                            blank=True, 
                            null=True,
                            help_text='Tên chi tiết tài sản'
                            )
    
    value = models.CharField(
                            max_length=1024, 
                            blank=True, 
                            null=True,
                            help_text='Gía trị thông số'
                            )
    
    asset = models.ForeignKey(
                            Asset, 
                            on_delete = models.CASCADE,
                            help_text='mẫu chi tiết tài sản'
                            )
    
    created_at = models.DateTimeField(
                                    default=djnow, 
                                    editable=False,
                                    help_text='Được tạo lúc'
                                    )
    
    updated_at = models.DateField(
                                auto_now_add=True,
                                editable=False,
                                help_text='Cập nhật lúc'
                                )
    
    created_by = models.ForeignKey(
                                Account, 
                                on_delete = models.SET_NULL,
                                null=True,
                                blank=True,
                                to_field= 'username',
                                related_name= '%(app_label)s_%(class)s_created_by',
                                editable=False,
                                help_text='Được tạo bởi'
                                )
    
    updated_by = models.ForeignKey(
                                Account, 
                                on_delete = models.SET_NULL,
                                null=True,
                                blank=True,
                                to_field='username', 
                                related_name='%(app_label)s_%(class)s_updated_by', 
                                editable=False,
                                help_text='Cập nhật bởi'
                                )
    
    def __str__(self):
        return self.name
       