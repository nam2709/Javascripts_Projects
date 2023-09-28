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
from SystemGeneralDirectoryManagement.models import Ward , Districts, Province
Account = get_user_model()

#Xã
class Commune(models.Model):
    uuid = models.UUIDField(primary_key=True, 
                            default=uuid.uuid4, 
                            editable=False,
                            help_text="Id Xã")
    name = models.CharField(max_length=1024,
                            editable=True,
                            blank=False,
                            null=False,
                            default="Xã",
                            help_text="Tên Xã")

    
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
    
    class Meta:
        verbose_name = _("Xã")
        verbose_name_plural = _("Xã")

    def __str__(self):
        return self.name


    def save(self,*args, **kwargs):
        if self.name is None:
            self.name = str(self.uuid)
        super().save(*args, **kwargs)
class District(models.Model):
    uuid = models.UUIDField(primary_key=True, 
                            default=uuid.uuid4, 
                            editable=False,
                            help_text="Id Huyện")
    name = models.CharField(max_length=1024,
                            editable=True,
                            blank=False,
                            null=False,
                            default="Huyện",
                            help_text="Tên Huyện")

    commune = models.ForeignKey(Commune,on_delete=models.CASCADE
                                    ,help_text="Thuộc Xã")
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
    
    class Meta:
        verbose_name = _("Huyện")
        verbose_name_plural = _("Huyện")

    def __str__(self):
        return self.name


    def save(self,*args, **kwargs):
        if self.name is None:
            self.name = str(self.uuid)
        super().save(*args, **kwargs)
#Thành Phố
class City(models.Model):
    uuid = models.UUIDField(primary_key=True, 
                            default=uuid.uuid4, 
                            editable=False,
                            help_text="Id Thành Phố")
    name = models.CharField(max_length=1024,
                            editable=True,
                            blank=False,
                            null=False,
                            default="Xã",
                            help_text="Tên Thành Phố")
    district = models.ForeignKey(District,on_delete=models.SET_NULL,null = True, blank=True
                                    ,help_text="Thuộc Huyện")
    commune = models.ForeignKey(Commune,on_delete=models.CASCADE
                                    ,help_text="Thuộc Xã")
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
    
    class Meta:
        verbose_name = _("Thành Phố ")
        verbose_name_plural = _("Thành Phố")

    def __str__(self):
        return self.name


    def save(self,*args, **kwargs):
        if self.name is None:
            self.name = str(self.uuid)
        super().save(*args, **kwargs)
#Tình Trạng Công Ty
class CompanyStatus(models.Model):
    class Meta:
        verbose_name = _("Tình trạng công ty")
        verbose_name_plural = _("Tình trạng công Ty")
    uuid = models.UUIDField(primary_key=True, 
                            default=uuid.uuid4, 
                            editable=False,
                            help_text="Id Tình Trạng")
    name = models.CharField(max_length=1024,
                            editable=True,
                            blank=False,
                            null=False,
                            default="Tình Trạng",
                            help_text="Tên Tình Trạng")
    code = models.CharField(max_length=1024,
                            unique = True,
                            editable=True,
                            blank=False,
                            null=False,
                            default=" MÃ Tình Trạng",
                            help_text="MÃ Tình Trạng")
    desc = models.TextField(
                                max_length=5000,
                                editable=True,
                                null=True,
                                blank=True,
                                help_text=_('Mô tả'))
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
#Công ty

class Company(models.Model):
    class Meta:
        verbose_name = _("Công Ty")
        verbose_name_plural = _("Công Ty")
    uuid = models.UUIDField(primary_key=True, 
                            default=uuid.uuid4, 
                            editable=False,
                            help_text="Id Công Ty")
    name = models.CharField(max_length=1024,
                            editable=True,
                            blank=False,
                            null=False,
                            default="Tên Công Ty",
                            help_text="Tên Công Ty")
    code_company = models.CharField(max_length=1024,
                                    unique = True,
                            editable=True,
                            blank=False,
                            null=False,
                            default="Mã Công Ty",
                            help_text="Mã Công Ty")
    ward = models.ForeignKey(Ward,on_delete=models.CASCADE,null = True, blank=True
                                    ,help_text="Thuộc Xã")
    
    districts = models.ForeignKey(Districts,on_delete=models.SET_NULL,null = True, blank=True
                                    ,help_text="Thuộc Huyện")
    province = models.ForeignKey(Province,on_delete=models.CASCADE,null = True, blank=True
                                    ,help_text="Thuộc Tỉnh")
    address = models.CharField(max_length=1024,
                                        editable=True,
                                         blank =False,
                                          null=False,
                                           default="Địa chỉ cụ thể")
    tax_code = models.CharField(max_length=1024,
                                unique = True,
                            editable=True,
                            blank=False,
                            null=False,
                            default="Mã Số Thuế",
                            help_text="Mã Số Thuế")
    phone_number = models.CharField(max_length=1024,
                            editable=True,
                            blank=False,
                            null=False,
                            
                            help_text="Số Điện Thoại liên Hệ")
    companystatus =models.ForeignKey(CompanyStatus,on_delete=models.SET_NULL,null = True, blank=True
                                    ,help_text="Trạng Thái Công Ty")
    
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
#Đơn Vị
class Unit(models.Model):
    class Meta:
        verbose_name = _("Đơn Vị")
        verbose_name_plural = _("Đơn Vị")

    uuid = models.UUIDField(primary_key=True, 
                            default=uuid.uuid4, 
                            editable=False,
                            help_text="Id Đơn Vị")
    name = models.CharField(max_length=1024,
                            editable=True,
                            blank=False,
                            null=False,
                            default="Đơn Vị",
                            help_text="Tên Đơn Vị")
    code = models.CharField(max_length=1024,
                                    unique = True,
                            editable=True,
                            blank=False,
                            null=True,
                            
                            help_text="Mã phòng")
    company = models.ForeignKey(Company,on_delete=models.CASCADE
                                    ,help_text="Thuộc Công Ty")
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

#Chức Vụ
class Position(models.Model):
    class Meta:
        verbose_name = _("Chức Vụ")
        verbose_name_plural = _("Chức vụ")

    uuid = models.UUIDField(primary_key=True, 
                            default=uuid.uuid4, 
                            editable=False,
                            help_text="Id Chức Vụ")
    name = models.CharField(max_length=1024,
                            editable=True,
                            blank=False,
                            null=False,
                            default="Chức Vụ",
                            help_text="Tên Chức Vụ")
    code = models.CharField(max_length=1024,
                                    unique = True,
                            editable=True,
                            blank=False,
                            null=True,
                            
                            help_text="Mã Chức Vụ")

    unit = models.ForeignKey(Unit,on_delete=models.CASCADE
                                    ,help_text="Thuộc Đơn Vị")
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

#Trạng Thái Nhân Viên
class StaffStatus(models.Model):
    class Meta:
        verbose_name = _("Trạng Thái Nhân Viên")
        verbose_name_plural = _("Trạng Thái Nhân Viên")
    uuid = models.UUIDField(primary_key=True, 
                            default=uuid.uuid4, 
                            editable=False,
                            help_text="Id Trạng Thái")
    name = models.CharField(max_length=1024,
                            editable=True,
                            blank=False,
                            null=False,
                            default="Tên Trạng Thái",
                            help_text="Tên Trạng Thái")
    code = models.CharField(max_length=1024,

                            editable=True,
                            blank=False,
                            null=True,
                            
                            help_text="Mã trạng Thái")
    desc = models.TextField(
                                max_length=5000,
                                editable=True,
                                null=True,
                                blank=True,
                                help_text=_('Mô tả'))


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

#Nhân Viên
class Staff(models.Model):
    uuid = models.UUIDField(primary_key=True, 
                            default=uuid.uuid4, 
                            editable=False,
                            help_text="Id Thông Tin")
    name = models.CharField(max_length=1024,
                            editable=True,
                            blank=False,
                            null=False,
                            default="Tên Nhân Viên",
                            help_text="Tên Nhân Viên")

    code = models.CharField(max_length=1024,
                            unique = True,
                            editable=True,
                            blank= False,
                            null= False,
                            default= "MÃ Nhân Viên",
                            help_text="MÃ Nhân Viên")

    company = models.ForeignKey(Company,on_delete=models.CASCADE
                                    ,help_text="Thuộc Công ty")
    unit = models.ForeignKey(Unit,on_delete=models.CASCADE
                                    ,help_text="Thuộc Đơn Vị")
    position = models.ForeignKey(Position,on_delete=models.CASCADE
                                    ,help_text="Thuộc Phòng")
    staffstatus =models.ForeignKey(StaffStatus,on_delete=models.SET_NULL,null = True, blank=True
                                    ,help_text="Trạng Thái Nhân Viên")
    
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


    # def validate_unique(self, exclude=None):
    #     super().validate_unique(exclude=exclude)

    #     # Kiểm tra xem đã có bản ghi khác nào có giá trị `code ` giống với bản ghi hiện tại hay không
    #     if Staff.objects.filter(code=self.code).exists():
    #         raise ValidationError(
    #             {'code': 'Tên đã tồn tại.'},
    #             code='unique',
    #         )
    
    
    class Meta:
        verbose_name = _("Nhân Viên")
        verbose_name_plural = _("Nhân Viên")

    def __str__(self):
        return self.name

#Thông Tin Nhân Viên
class StaffInformation(models.Model):
    full_name = models.CharField(max_length=1024,
                                editable=True,  
                                blank = False,
                                null= False,
                                default="Họ Và Tên",
                                help_text="Họ Và Tên")
    uuid = models.UUIDField(primary_key=True, 
                            default=uuid.uuid4, 
                            editable=False,
                            help_text="Id Thông Tin")
    staff = models.ForeignKey(Staff,on_delete=models.CASCADE
                                    ,help_text="Tên Nhân Viên")
    avatar = models.ImageField(upload_to='avatar-images/%Y/%m/%d/',
                               default='company/default-avatar.jpg',
                               max_length=4096,
                               null=True,
                               blank=True)
    email = models.CharField(max_length=1024,
                            editable=True,
                            blank=False,
                            null=False,
                           
                            help_text="email Nhân Viên")
    id_card = models.CharField(max_length=1024,
                            editable=True,
                            blank=False,
                            null=False,
                            
                            help_text="Chứng Minh Thư")
    degree = models.FileField(upload_to=None,
                            max_length=1024,
                            editable=True,
                            blank=True,
                            null=True,
                            default="Bằng cấp",
                            help_text="Bằng cấp")
    phone_number = models.CharField(max_length=1024,
                            editable=True,
                            blank=False,
                            null=False,
                         
                            help_text="Số điện thoại")
    company = models.ForeignKey(Company,on_delete=models.CASCADE, null = True
                                    ,help_text="Thuộc Công ty")
    unit = models.ForeignKey(Unit,on_delete=models.CASCADE,null = True
                                    ,help_text="Thuộc Đơn Vị")
    ward = models.ForeignKey(Ward,on_delete=models.CASCADE,null = True, blank=True
                                    ,help_text="Thuộc Thị Trấn")
    
    districts = models.ForeignKey(Districts,on_delete=models.SET_NULL,null = True, blank=True
                                    ,help_text="Thuộc Huyện")
    province = models.ForeignKey(Province,on_delete=models.CASCADE,null = True, blank=True
                                    ,help_text="Thuộc Tỉnh")
    position = models.ForeignKey(Position,on_delete=models.CASCADE,null = True, blank=True
                                    ,help_text="Thuộc Phòng")
    address = models.CharField(max_length=1024,
                                        editable=True,
                                         blank =False,
                                          null=False,
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
    
    class Meta:
        verbose_name = _("Thông Tin Nhân Viên")
        verbose_name_plural = _("Thông Tin Nhân Viên")

    def __str__(self):
        return self.full_name
    


