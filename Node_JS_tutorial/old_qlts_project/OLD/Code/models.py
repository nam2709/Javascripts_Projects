from django.db import models
from django.utils.translation import gettext as _
from django.contrib.auth.models import User
from django.dispatch import receiver
from django.db.models.signals import post_save
from datetime import date

import uuid
import time

from django.utils import timezone
from django.utils.timezone import now as djnow
from AssetManagement.models import Asset,AssetType

import datetime
from datetime import datetime, timedelta
from django.contrib.auth import get_user_model
from datetime import datetime, timedelta
from dateutil.relativedelta import relativedelta
from django.db import transaction
from django.db.utils import IntegrityError

Account = get_user_model()
# Create your models here.

class GenerateCode(models.Model):
    uuid = models.UUIDField(
                            primary_key=True, 
                            default=uuid.uuid4, 
                            editable=False, 
                            help_text="UUID"
                            )
    
    company_code = models.CharField(
                                    max_length=1024,  
                                    editable=True,
                                    blank=True,
                                    null=True,
                                    help_text="Company_Code"
                                    )
    
    app_name = models.CharField(
                                max_length=1024,  
                                editable=True,
                                blank=True,
                                null=True,
                                default="app_name",
                                help_text="app_name"
                                )
    
    mode_name = models.CharField(
                                max_length=1024,  
                                editable=True,
                                blank=True,
                                null=True,
                                default="mode_name",
                                help_text="mode_name"
                                )
    
    prefix = models.CharField(
                                max_length=1024,  
                                editable=True,
                                blank=True,
                                null=True,
                                default="prefix",
                                help_text="prefix"
                                )
    
    length_code = models.CharField(
                                max_length=1024,  
                                editable=True,
                                blank=True,
                                null=True,
                                default="8",
                                help_text="length_code"
                                )
    
    current_code = models.CharField(
                                    max_length=1024, 
                                    editable=True,
                                    blank=True,
                                    null=True,
                                    help_text="current_code"
                                    )
    
    type_gen_code = models.IntegerField(
                                        editable=True,
                                        blank=True,
                                        null=True,
                                        default=0,
                                        help_text="type_gen_code"
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
        verbose_name = _("CODE")
        verbose_name_plural = _("NHỮNG CODE")


    def __str__(self):
        return self.app_name
    def get_code(self):
        crr_code = None
        crr_length = None
        try:
            crr_length = int(self.length_code)
            if self.current_code is None:
                self.current_code = str(1).zfill(crr_length)
                crr_code = int(self.current_code)
            else:
                crr_code = int(self.current_code)
        except Exception as xx:
            print("Error " + str(xx))
        if crr_length and crr_code and self.prefix:
            crr_code = crr_code + 1
            # check lai ham nay
            code = str(crr_code).zfill(crr_length)
            self.current_code = code
            # co the bo "-" neu muon
            full_code = f"{str(self.company_code)}{self.app_name}{self.mode_name}{str(self.prefix)}-{code}"
            # self.save()
            return full_code
        else:
            return None
            
    def save(self, *args, **kwargs):
        # time.sleep(0.15)
        # if self.app_name is None:
        #     self.app_name = str(self.uuid)

        # last_instance = GenerateCode.objects.filter(prefix=self.prefix).order_by('-type_gen_code').first()
        # if last_instance:
        #     last_code = int(last_instance.type_gen_code)
        #     self.type_gen_code = last_code + 1

        # # Format the integer field with leading zeros
        # formatted_integer = str(self.type_gen_code).zfill(6)

        # # Generate the new code
        # self.current_code = self.prefix + formatted_integer

        # # Check for duplicate current_code values and adjust if necessary
        # while True:
        #     if GenerateCode.objects.filter(current_code=self.current_code).exists():
        #         self.type_gen_code += 1
        #         formatted_integer = str(self.type_gen_code).zfill(6)
        #         self.current_code = self.prefix + formatted_integer
        #     else:
        #         break

        # Perform the save operation
        super().save(*args, **kwargs)

