from django.db import models
from django.utils.translation import gettext as _
# Create your models here.
from django.db import models
from django.contrib.auth.models import User
# Create your models here.
import uuid
from django.conf.global_settings import AUTH_USER_MODEL
# import settings.user
from django.utils.timezone import now as djnow
import datetime
from django.contrib.auth import get_user_model

Account = get_user_model()

class Province (models.Model):
    class Meta:
        verbose_name = _("Tỉnh")
        verbose_name_plural = _("Tỉnh")
    uuid = models.UUIDField(primary_key=True, 
                            default=uuid.uuid4, 
                            editable=False,
                            help_text="UUID Tỉnh")
    name = models.CharField(max_length=1024,
                            editable=True,
                            blank=False,
                            null=False,
                            default="Xã",
                            help_text="Tên Tỉnh")
    code = models.CharField(max_length=1024,
                            editable=True,
                            blank=False,
                            null=False,
                            unique=True,
                            help_text="Code Tỉnh"
                            )
    codename = models.CharField(max_length=1024,
                            editable=True,
                            blank=False,
                            null=False,
                            help_text="Codename Tỉnh"
                            )
    division_type = models.CharField(max_length=1024,
                            editable=True,
                            blank=False,
                            null=False,
                            help_text="loại"
                            )
    phone_code = models.CharField(max_length=1024,
                            editable=True,
                            blank=False,
                            null=False,
                            unique=True,
                            help_text=" Số "
                            )
    

    
    created_by = models.ForeignKey(Account,
                                   to_field='username',
                                   related_name='%(app_label)s_%(class)s_created_by',
                                   on_delete=(models.SET_NULL),
                                   null=True,
                                   blank=True,
                                   help_text='Người tạo'
                                   )

    updated_by = models.ForeignKey(Account,
                                   to_field='username',
                                   related_name='%(app_label)s_%(class)s_updated_by',
                                   on_delete=(models.SET_NULL),
                                   null=True,
                                   blank=True,
                                   help_text='Người cập nhật'
                                   )
    updated_at = models.DateTimeField(
        default=djnow,
        help_text='Thời điểm cập nhật'
    )
    created_at = models.DateTimeField(
        default=djnow,
        editable=False,
        help_text='Ngày đăng tải')
    
    

    def __str__(self):
        return self.name


    def save(self,*args, **kwargs):
        if self.name is None:
            self.name = str(self.uuid)
        super().save(*args, **kwargs)
        
class Districts(models.Model):
    class Meta:
        verbose_name = _("Huyện")
        verbose_name_plural = _("Huyện")

    uuid = models.UUIDField(primary_key=True, 
                            default=uuid.uuid4, 
                            editable=False,
                            help_text="Id quận/huyện"
                            )
    name = models.CharField(max_length=1024,
                            editable=True,
                            blank=False,
                            null=False,
                            default="Huyện",
                            help_text="Tên quận/huyện"
                            )
    code = models.CharField(max_length=1024,
                            editable=True,
                            blank=False,
                            null=False,
                            unique=True,
                            help_text="Code huyện"
                            )
    division_type = models.CharField(max_length=1024,
                            editable=True,
                            blank=False,
                            null=False,
                            help_text="loại quận/huyện"
                            )
    province = models.ForeignKey(Province,on_delete=models.SET_NULL,null = True, blank=True
                                    ,help_text="Thuộc Thành Phố")
  
    codename = models.CharField(max_length=1024,
                            editable=True,
                            blank=False,
                            null=False,
                            help_text="Codename quận/huyện"
                            )
    province_code = models.CharField(max_length=1024,
                            editable=True,
                            blank=False,
                            null=False,
                            help_text="Code tỉnh/thành phộ"
                            ) 
    created_by = models.ForeignKey(Account,
                                   to_field='username',
                                   related_name='%(app_label)s_%(class)s_created_by',
                                   on_delete=(models.SET_NULL),
                                   null=True,
                                   blank=True,
                                   help_text='Người tạo'
                                   )
    updated_by = models.ForeignKey(Account,
                                   to_field='username',
                                   related_name='%(app_label)s_%(class)s_updated_by',
                                   on_delete=(models.SET_NULL),
                                   null=True,
                                   blank=True,
                                   help_text='Người cập nhật'
                                   )
    updated_at = models.DateTimeField(
        default=djnow,
        help_text='Thời điểm cập nhật'
    )
    created_at = models.DateTimeField(
        default=djnow,
        editable=False,
        help_text='Ngày đăng tải')
    
    
    def __str__(self):
        return self.name


    def save(self,*args, **kwargs):
        if self.name is None:
            self.name = str(self.uuid)
        super().save(*args, **kwargs)
#Thị Trấn
class Ward(models.Model):
    class Meta:
        verbose_name = _("Thị Trấn")
        verbose_name_plural = _("Thị Trấn")
    
    uuid = models.UUIDField(primary_key=True, 
                            default=uuid.uuid4, 
                            editable=False,
                            help_text="Id Thị Trấn")
    name = models.CharField(max_length=1024,
                            editable=True,
                            blank=False,
                            null=False,
                            default="Tên Thị Trấn",
                            help_text="Tên Thị Trấn")
    code = models.CharField(max_length=1024,
                            editable=True,
                            blank=False,
                            null=False,
                            unique=True,
                            help_text="code Thị Trấn")
    division_type = models.CharField(max_length=1024,
                            editable=True,
                            blank=False,
                            null=False,
                            help_text="loại thị trấn"
                            )
    districts = models.ForeignKey(Districts,on_delete=models.SET_NULL,null = True, blank=True
                                    ,help_text="Thuộc Huyện")
    codename = models.CharField(max_length=1024,
                            editable=True,
                            blank=False,
                            null=False,
                            help_text="Codename Thị Trấn"
                            )
    ditrict_code = models.CharField(max_length=1024,
                            editable=True,
                            blank=False,
                            null=False,
                            help_text="Code quận/huyện"
                            )
    
    created_by = models.ForeignKey(Account,
                                   to_field='username',
                                   related_name='%(app_label)s_%(class)s_created_by',
                                   on_delete=(models.SET_NULL),
                                   null=True,
                                   blank=True,
                                   help_text='Người tạo'
                                   )

    updated_by = models.ForeignKey(Account,
                                   to_field='username',
                                   related_name='%(app_label)s_%(class)s_updated_by',
                                   on_delete=(models.SET_NULL),
                                   null=True,
                                   blank=True,
                                   help_text='Người cập nhật'
                                   )
    updated_at = models.DateTimeField(
        default=djnow,
        help_text='Thời điểm cập nhật'
    )
    created_at = models.DateTimeField(
        default=djnow,
        editable=False,
        help_text='Ngày đăng tải')
    
   

    def __str__(self):
        return self.name


    def save(self,*args, **kwargs):
        if self.name is None:
            self.name = str(self.uuid)
        super().save(*args, **kwargs)