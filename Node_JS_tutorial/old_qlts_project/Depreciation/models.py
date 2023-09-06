from django.db import models
from django.utils.translation import gettext as _
from django.contrib.auth.models import User
from django.dispatch import receiver
from django.db.models.signals import post_save
from datetime import date

import uuid

from django.utils import timezone
from django.utils.timezone import now as djnow
from AssetManagement.models import Asset,AssetType

import datetime
from datetime import datetime, timedelta
from django.contrib.auth import get_user_model
from datetime import datetime, timedelta
from dateutil.relativedelta import relativedelta

Account = get_user_model()

class DepreciationPeriod(models.Model):
    uuid = models.UUIDField(
                            primary_key=True, 
                            default=uuid.uuid4, 
                            editable=False, 
                            help_text="UUID"
                            )
    
    name = models.CharField(
                            max_length=1024,  
                            editable=True,
                            blank=False,
                            null=False,
                            default="KỲ KHẤU HAO",
                            help_text="KỲ KHẤU HAO"
                            )
    
    created_by = models.ForeignKey(
                                    Account,
                                    to_field= 'username',
                                    on_delete=models.SET_NULL,
                                    null=True,
                                    blank=True,
                                    related_name= '%(class)s_created_by',
                                    editable=False,
                                    help_text='Được tạo bởi'
                                    )

    updated_by = models.ForeignKey(
                                    Account, 
                                    to_field='username', 
                                    on_delete=models.SET_NULL,
                                    null=True,
                                    blank=True,
                                    related_name='%(class)s_updated_by', 
                                    editable=False,
                                    help_text='Cập nhật bởi'
                                    )
                                 
    updated_at = models.DateTimeField(
                                    default=djnow,
                                    editable=False,
                                    help_text='Thời điểm cập nhật'
                                    )
    
    created_at = models.DateTimeField(
                                    default=djnow,
                                    editable=False,
                                    help_text='Ngày đăng tải'
                                    )
    
    class Meta:
        verbose_name = _("KIỂU KHẤU HAO")
        verbose_name_plural = _("NHỮNG KIỂU KHẤU HAO")

    def __str__(self):
        return self.name
    
    def save(self,*args, **kwargs):
        if self.name is None:
            self.name = str(self.uuid)
        super().save(*args, **kwargs)   
   
class YearViews(models.Model):
    uuid = models.UUIDField(
                            primary_key=True, 
                            default=uuid.uuid4, 
                            editable=False, 
                            help_text="UUID"
                            )
    
    name = models.IntegerField(
                            editable=True,
                            blank=True,
                            null=True,
                            help_text="SỐ KHẤU HAO CHI TIẾT"
                            )
    
    created_by = models.ForeignKey(
                                    Account,
                                    to_field= 'username',
                                    on_delete=models.SET_NULL,
                                    null=True,
                                    blank=True,
                                    related_name= '%(class)s_created_by',
                                    editable=False,
                                    help_text='Được tạo bởi'
                                    )

    updated_by = models.ForeignKey(
                                    Account, 
                                    to_field='username', 
                                    on_delete=models.SET_NULL,
                                    null=True,
                                    blank=True,
                                    related_name='%(class)s_updated_by', 
                                    editable=False,
                                    help_text='Cập nhật bởi'
                                    )
                                 
    updated_at = models.DateTimeField(
                                    default=djnow,
                                    editable=False,
                                    help_text='Thời điểm cập nhật'
                                    )
    
    created_at = models.DateTimeField(
                                    default=djnow,
                                    editable=False,
                                    help_text='Ngày đăng tải'
                                    )
    
    class Meta:
        verbose_name = _("NĂM")
        verbose_name_plural = _("NHỮNG NĂM")

    def __str__(self):
        return str(self.name)
    

    def save(self,*args, **kwargs):

        if self.name is None:
            self.name = str(self.uuid)
        super().save(*args, **kwargs)

class AssetRevaluation(models.Model):
    uuid = models.UUIDField(
                            primary_key=True, 
                            default=uuid.uuid4, 
                            editable=False, 
                            help_text="UUID"
                            )
    
    name = models.CharField(
                            max_length=1024,  
                            editable=True,
                            blank=False,
                            null=False,
                            default="TÊN KHẤU HAO",
                            help_text="TÊN KHẤU HAO"
                            )

    asset_revaluation = models.ForeignKey(
                                        Asset,
                                        related_name="asset_revaluation",
                                        on_delete=(models.CASCADE),
                                        null=True,
                                        blank=True
                                        )     
                 
    time_revaluation = models.DateField(
                                    default=date.today,
                                    help_text='Thời điểm thay đổi'
                                    )
                                
    addup_value = models.IntegerField(
                                    editable=True,
                                    blank=True,
                                    null=True,
                                    help_text="gia tri them + / giam -",
                                    default=0
                                    )
    
    addup_time = models.IntegerField(
                                    editable=True,
                                    blank=True,
                                    null=True,
                                    help_text="nam them + / giam -",
                                    default=0
                                    )
    
    created_by = models.ForeignKey(
                                    Account,
                                    to_field= 'username',
                                    on_delete=models.SET_NULL,
                                    null=True,
                                    blank=True,
                                    related_name= '%(class)s_created_by',
                                    editable=False,
                                    help_text='Được tạo bởi'
                                    )

    updated_by = models.ForeignKey(
                                    Account, 
                                    to_field='username', 
                                    on_delete=models.SET_NULL,
                                    null=True,
                                    blank=True,
                                    related_name='%(class)s_updated_by', 
                                    editable=False,
                                    help_text='Cập nhật bởi'
                                    )
                                 
    updated_at = models.DateTimeField(
                                    default=djnow,
                                    editable=False,
                                    help_text='Thời điểm cập nhật'
                                    )
    
    created_at = models.DateTimeField(
                                    default=djnow,
                                    editable=False,
                                    help_text='Ngày đăng tải'
                                    )


class DepreciationType(models.Model):
    uuid = models.UUIDField(
                            primary_key=True, 
                            default=uuid.uuid4, 
                            editable=False, 
                            help_text="UUID"
                            )
    
    name = models.CharField(
                            max_length=1024,  
                            editable=True,
                            blank=False,
                            null=False,
                            default="TÊN KHẤU HAO TÀI SẢN",
                            help_text="TÊN KHẤU HAO TÀI SẢN"
                            )
    
    asset_type = models.ForeignKey(
                                    AssetType,
                                    related_name="assetype",
                                    on_delete=(models.CASCADE),
                                    null=True,
                                    blank=True
                                    )
    
    time = models.IntegerField(
                                editable=True,
                                blank=True,
                                null=True,
                                help_text=" Thời gian sua doi "
                                )

    created_by = models.ForeignKey(
                                    Account,
                                    to_field= 'username',
                                    on_delete=models.SET_NULL,
                                    null=True,
                                    blank=True,
                                    related_name= '%(class)s_created_by',
                                    editable=False,
                                    help_text='Được tạo bởi'
                                    )

    updated_by = models.ForeignKey(
                                    Account, 
                                    to_field='username', 
                                    on_delete=models.SET_NULL,
                                    null=True,
                                    blank=True,
                                    related_name='%(class)s_updated_by', 
                                    editable=False,
                                    help_text='Cập nhật bởi'
                                    )
                                 
    updated_at = models.DateTimeField(
                                    default=djnow,
                                    editable=False,
                                    help_text='Thời điểm cập nhật'
                                    )
    
    created_at = models.DateTimeField(
                                    default=djnow,
                                    editable=False,
                                    help_text='Ngày đăng tải'
                                    )
    
    
    class Meta:
        verbose_name = _("Kiểu Tài Sản Khấu Hao Chi Tiết")
        verbose_name_plural = _("Những Kiểu Tài Sản Khấu Hao Chi Tiết")

    def __str__(self):
        return str(self.name)
    

    def save(self,*args, **kwargs):

        if self.name is None:
            self.name = str(self.uuid)
        super().save(*args, **kwargs)


class Adjustment(models.Model):
    uuid = models.UUIDField(
                            primary_key=True, 
                            default=uuid.uuid4, 
                            editable=False, 
                            help_text="UUID"
                            )
    
    name = models.CharField(
                            max_length=1024,  
                            editable=True,
                            blank=False,
                            null=False,
                            default="TÊN KHẤU HAO TÀI SẢN",
                            help_text="TÊN KHẤU HAO TÀI SẢN"
                            )
    
    number = models.DecimalField(
                                max_digits=30, 
                                decimal_places=2,
                                default = 0,
                                editable=True,
                                blank=True,
                                null=True,
                                help_text=" Hệ số điều chỉnh "
                                )
    
    created_by = models.ForeignKey(
                                    Account,
                                    to_field= 'username',
                                    on_delete=models.SET_NULL,
                                    null=True,
                                    blank=True,
                                    related_name= '%(class)s_created_by',
                                    editable=False,
                                    help_text='Được tạo bởi'
                                    )

    updated_by = models.ForeignKey(
                                    Account, 
                                    to_field='username', 
                                    on_delete=models.SET_NULL,
                                    null=True,
                                    blank=True,
                                    related_name='%(class)s_updated_by', 
                                    editable=False,
                                    help_text='Cập nhật bởi'
                                    )
                                 
    updated_at = models.DateTimeField(
                                    default=djnow,
                                    editable=False,
                                    help_text='Thời điểm cập nhật'
                                    )
    
    created_at = models.DateTimeField(
                                    default=djnow,
                                    editable=False,
                                    help_text='Ngày đăng tải'
                                    )
    
    
    class Meta:
        verbose_name = _("Hệ Số Điều Chỉnh")
        verbose_name_plural = _("Những Hệ Số Điều Chỉnh")

    def __str__(self):
        return str(self.name)
    

    def save(self,*args, **kwargs):

        if self.name is None:
            self.name = str(self.uuid)
        super().save(*args, **kwargs)


class DepreciationDetail(models.Model):
    uuid = models.UUIDField(
                            primary_key=True, 
                            default=uuid.uuid4, 
                            editable=False, 
                            help_text="UUID"
                            )
    
    name = models.CharField(
                            max_length=1024,  
                            editable=True,
                            blank=False,
                            null=False,
                            default="TÊN KHẤU HAO",
                            help_text="TÊN KHẤU HAO"
                            )
    
    aset =  models.OneToOneField(
                            Asset, 
                            related_name="time",
                            null=True,
                            blank=True,
                            on_delete=models.CASCADE,
                            help_text="TÀI SẢN1",
                            )

    date_been_add =  models.DateField(
                                    default=date.today,
                                    help_text='Thời điểm khấu hao'
                                    )
    
    add_value = models.DecimalField(   
                                    max_digits=30, 
                                    decimal_places=2,
                                    default=0,
                                    blank=True,
                                    null=True,
                                    help_text="Tang/giam gia trị",
                                    editable=True
                                    )

    depreciation_value = models.DecimalField(
                                            max_digits=30, 
                                            decimal_places=2,
                                            default=0,
                                            blank=True,
                                            null=True,
                                            help_text=" Giá trị để khấu hao",
                                            editable=False
                                            )

    preiod_detail = models.ForeignKey(
                                    DepreciationPeriod,
                                    related_name="depre",
                                    on_delete=(models.CASCADE),
                                    null=True,
                                    blank=True
                                    )
    
    adjustment_aset = models.ForeignKey(
                                    Adjustment,
                                    related_name="adjustment_tyoe",
                                    on_delete=(models.CASCADE),
                                    null=True,
                                    blank=True
                                    )
    
    adjustment_number = models.DecimalField(
                                            max_digits=30, 
                                            decimal_places=2,
                                            default=0,
                                            blank=True,
                                            null=True,
                                            help_text=" he so ",
                                            editable=False
                                            )
    
    revaluation = models.ManyToManyField(
                                        AssetRevaluation,
                                        null=True,
                                        blank=True
                                        )

    time_depreciation = models.IntegerField(
                                            editable=True,
                                            blank=True,
                                            null=True,
                                            help_text="Thời gian khấu hao"
                                            )
    
    year_views = models.DateField(
                                default=date.today,
                                help_text='Thời điểm khấu hao'
                                )
    # testdepreciation = models.IntegerField(
    #                                         editable=False,
    #                                         blank=True,
    #                                         null=True,
    #                                         help_text="Thời gian khấu hao"
    #                                         )

    time_been_depreciation = models.DateField(
                                            default=date.today,
                                            help_text='Thời gian đã khấu hao'
                                            )
    
    curency_change = models.CharField(
                                    max_length=1024,  
                                    editable=True,
                                    blank=False,
                                    null=False,
                                    default="TÊN KHẤU HAO",
                                    help_text="TÊN KHẤU HAO"
                                    )

    type_depreciation = models.ForeignKey(
                                        DepreciationType,
                                        related_name="type_depreciation",
                                        on_delete=(models.CASCADE),
                                        null=True,
                                        blank=True
                                        )
    
    created_by = models.ForeignKey(
                                    Account,
                                    to_field= 'username',
                                    on_delete=models.SET_NULL,
                                    null=True,
                                    blank=True,
                                    related_name= '%(class)s_created_by',
                                    editable=False,
                                    help_text='Được tạo bởi'
                                    )

    updated_by = models.ForeignKey(
                                    Account, 
                                    to_field='username', 
                                    on_delete=models.SET_NULL,
                                    null=True,
                                    blank=True,
                                    related_name='%(class)s_updated_by', 
                                    editable=False,
                                    help_text='Cập nhật bởi'
                                    )
                                 
    updated_at = models.DateTimeField(
                                    default=djnow,
                                    editable=False,
                                    help_text='Thời điểm cập nhật'
                                    )
    
    created_at = models.DateTimeField(
                                    default=djnow,
                                    editable=False,
                                    help_text='Ngày đăng tải'
                                    )
    
    class Meta:
        verbose_name = _("KHẤU HAO CHI TIẾT")
        verbose_name_plural = _("NHỮNG KHẤU HAO CHI TIẾT")


    def __str__(self):
        return self.name
    
    def save(self,*args, **kwargs):
        if self.name is None:
            self.name = str(self.uuid)
        elif self.aset is None:
            pass
        # elif self.add_value is None:
        #     self.add_value = 0
        # elif self.aset is not None:
        #     self.depreciation_value = self.aset.price_buy + self.add_value

        if self.type_depreciation is None:
            self.time_depreciation = 0
        elif self.type_depreciation is not None:
            self.time_depreciation = self.type_depreciation.time 

        if self.adjustment_aset is None:
            self.adjustment_number = 0
        elif self.adjustment_aset is not None:
            self.adjustment_number = self.adjustment_aset.number

        super().save(*args, **kwargs)   
    

# @receiver(post_save, sender=Asset)
# def create_depreciation(sender, instance, created, **kwargs):
#     if created:
#         depreciation = DepreciationDetail(aset=instance)
#         depreciation.save()
        # instance.depreciation_detail.save()


# @receiver(post_save, sender=Asset)
# def save_depreciation(sender, instance, **kwargs):
#     instance.DepreciationDetail.save()

class DepreciationAssetDetail(models.Model):
    uuid = models.UUIDField(
                            primary_key=True, 
                            default=uuid.uuid4, 
                            editable=False, 
                            help_text="UUID"
                            )
    
    name = models.CharField(
                            max_length=1024,  
                            editable=True,
                            blank=False,
                            null=False,
                            default="TÊN KHẤU HAO TÀI SẢN",
                            help_text="TÊN KHẤU HAO TÀI SẢN"
                            )
    
    aet_depreciation = models.ForeignKey(
                                    Asset, 
                                    related_name="tai_san_depre",
                                    null=True,
                                    blank=True,
                                    on_delete=models.CASCADE,
                                    help_text="TÀI SẢN2",
                                    )
    
    asset_depreciations = models.CharField(
                                            max_length=1024,  
                                            editable=True,
                                            blank=False,
                                            null=False,
                                            default="TÊN TÀI SẢN ",
                                            help_text="TTÊN TÀI SẢN"
                                            )
    
    count_depreciation = models.IntegerField(
                                            editable=True,
                                            blank=True,
                                            null=True,
                                            help_text=" Số lần khấu hao "
                                            )
    
    days_depreciation = models.DateField(
                                        default=date.today,
                                        help_text='Thời điểm khấu hao'
                                        )
    
    value_start = models.DecimalField(
                                        max_digits=30, 
                                        decimal_places=2,
                                        default = 0,
                                        editable=True,
                                        blank=True,
                                        null=True,
                                        help_text=" Giá trị đầu kỳ"
                                        )
    
    value_end = models.DecimalField(
                                        max_digits=30, 
                                        decimal_places=2,
                                        default = 0,
                                        editable=True,
                                        blank=True,
                                        null=True,
                                        help_text=" Giá trị cuối kỳ "
                                        )
    
    percent_depreciation = models.DecimalField(
                                                max_digits=30, 
                                                decimal_places=2,
                                                default = 0,
                                                editable=True,
                                                blank=True,
                                                null=True,
                                                help_text=" % Khấu Hao "
                                                )
    
    value_depreciaiton = models.DecimalField(
                                            max_digits=30, 
                                            decimal_places=2,
                                            default = 0,
                                            editable=True,
                                            blank=True,
                                            null=True,
                                            help_text=" Giá trị Khấu Haos"
                                            )
    
    remain_value = models.DecimalField(
                                        max_digits=30, 
                                        decimal_places=2,
                                        default = 0,
                                        editable=True,
                                        blank=True,
                                        null=True,
                                        help_text=" Giá trị còn lại "
                                        )

    yearviews = models.DateField(
                                default=date.today,
                                help_text='Thời điểm khấu hao'
                                )
    
    created_by = models.ForeignKey(
                                    Account,
                                    to_field= 'username',
                                    on_delete=models.SET_NULL,
                                    null=True,
                                    blank=True,
                                    related_name= '%(class)s_created_by',
                                    editable=False,
                                    help_text='Được tạo bởi'
                                    )

    updated_by = models.ForeignKey(
                                    Account, 
                                    to_field='username', 
                                    on_delete=models.SET_NULL,
                                    null=True,
                                    blank=True,
                                    related_name='%(class)s_updated_by', 
                                    editable=False,
                                    help_text='Cập nhật bởi'
                                    )
                                 
    updated_at = models.DateTimeField(
                                    default=djnow,
                                    editable=False,
                                    help_text='Thời điểm cập nhật'
                                    )
    
    created_at = models.DateTimeField(
                                    default=djnow,
                                    editable=False,
                                    help_text='Ngày đăng tải'
                                    )
    
    
    class Meta:
        verbose_name = _("Tài Sản Khấu Hao Chi Tiết")
        verbose_name_plural = _("Những Tài Sản Khấu Hao Chi Tiết")

    def __str__(self):
        return str(self.name)
    

    def save(self,*args, **kwargs):

        if self.name is None:
            self.name = str(self.uuid)
        super().save(*args, **kwargs)

class HistoryDepreciationAssetDetail(models.Model):
    uuid = models.UUIDField(
                            primary_key=True, 
                            default=uuid.uuid4, 
                            editable=False, 
                            help_text="UUID"
                            )
    
    history_name = models.CharField(
                            max_length=1024,  
                            editable=True,
                            blank=False,
                            null=False,
                            default="TÊN KHẤU HAO TÀI SẢN",
                            help_text="TÊN KHẤU HAO TÀI SẢN"
                            )
    
    history_aet_depreciation = models.CharField(
                                    max_length=1024,  
                                    editable=True,
                                    blank=False,
                                    null=False,
                                    help_text="TÀI SẢN2",
                                    )
    
    history_asset_depreciations = models.CharField(
                                            max_length=1024,  
                                            editable=True,
                                            blank=False,
                                            null=False,
                                            default="TÊN TÀI SẢN ",
                                            help_text="TTÊN TÀI SẢN"
                                            )
    
    history_count_depreciation = models.IntegerField(
                                            editable=True,
                                            blank=True,
                                            null=True,
                                            help_text=" Số lần khấu hao "
                                            )
    
    history_days_depreciation = models.DateField(
                                        default=date.today,
                                        help_text='Thời điểm khấu hao'
                                        )
    
    history_value_start = models.DecimalField(
                                        max_digits=30, 
                                        decimal_places=2,
                                        default = 0,
                                        editable=True,
                                        blank=True,
                                        null=True,
                                        help_text=" Giá trị đầu kỳ"
                                        )
    
    history_value_end = models.DecimalField(
                                        max_digits=30, 
                                        decimal_places=2,
                                        default = 0,
                                        editable=True,
                                        blank=True,
                                        null=True,
                                        help_text=" Giá trị cuối kỳ "
                                        )
    
    history_percent_depreciation = models.DecimalField(
                                                max_digits=30, 
                                                decimal_places=2,
                                                default = 0,
                                                editable=True,
                                                blank=True,
                                                null=True,
                                                help_text=" % Khấu Hao "
                                                )
    
    history_value_depreciaiton = models.DecimalField(
                                            max_digits=30, 
                                            decimal_places=2,
                                            default = 0,
                                            editable=True,
                                            blank=True,
                                            null=True,
                                            help_text=" Giá trị Khấu Haos"
                                            )
    
    history_remain_value = models.DecimalField(
                                        max_digits=30, 
                                        decimal_places=2,
                                        default = 0,
                                        editable=True,
                                        blank=True,
                                        null=True,
                                        help_text=" Giá trị còn lại "
                                        )

    history_yearviews = models.DateField(
                                default=date.today,
                                help_text='Thời điểm khấu hao'
                                )
    
    created_by = models.ForeignKey(
                                    Account,
                                    to_field= 'username',
                                    on_delete=models.SET_NULL,
                                    null=True,
                                    blank=True,
                                    related_name= '%(class)s_created_by',
                                    editable=False,
                                    help_text='Được tạo bởi'
                                    )

    updated_by = models.ForeignKey(
                                    Account, 
                                    to_field='username', 
                                    on_delete=models.SET_NULL,
                                    null=True,
                                    blank=True,
                                    related_name='%(class)s_updated_by', 
                                    editable=False,
                                    help_text='Cập nhật bởi'
                                    )
                                 
    updated_at = models.DateTimeField(
                                    default=djnow,
                                    editable=False,
                                    help_text='Thời điểm cập nhật'
                                    )
    
    created_at = models.DateTimeField(
                                    default=djnow,
                                    editable=False,
                                    help_text='Ngày đăng tải'
                                    )
    
    class Meta:
        verbose_name = _("Lich Su Tài Sản Khấu Hao Chi Tiết")
        verbose_name_plural = _("Những Lich Su Tài Sản Khấu Hao Chi Tiết")

    def __str__(self):
        return str(self.history_name)



    
