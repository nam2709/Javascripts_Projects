# def Staff_Check_Duplicate_Create(request):
#     response = {}
#     response["status"] = "Fail"
#     if request.is_ajax and request.method == "POST":
#         obj = (json.loads(request.body))
#         if 'organization' in obj:
#             org_code = str(obj['organization'])
#         else:
#             response["status"] = "Fail"
#             response["result"] = "Organization_Nofound"
#             return JsonResponse(response)
#         if 'staff_code' in obj:
#             staff_code = str(obj['staff_code'])
#         else:
#             staff_code = None
      
       
#         if staff_code is not None or staff_code != '':
#             try:
#                 org_obj = Organization.objects.filter(code=org_code).first()
#                 staff_obj_check_code = Staff.objects.filter(Q(organization=org_obj) & Q(staff_code=staff_code))
#             except Exception as xx:
#                 staff_obj_check_code = None
#                 print(xx)
#             if staff_obj_check_code is None:
#                 response["status"] = "Fail"
#                 response["result"] = "Duplicate"
#                 return JsonResponse(response)
#         else:
#             response["status"] = "Fail"
#             response["result"] = "Duplicate"
#         if staff_obj_check_code is not None 
#             # check duplicate of field industry_colleagues, colleagues, self_manager
#             duplicate_list = []
#             industry_colleagues = []
#             colleagues = []
#             self_manager = []
#             if 'industry_colleagues' in obj:
#                 industry_colleagues = obj['industry_colleagues']
#                 if len(industry_colleagues) > 0:
#                     duplicate_list = industry_colleagues
#             if 'colleagues' in obj:
#                 colleagues = obj['colleagues']
#                 if len(colleagues) > 0:
#                     duplicate_list = duplicate_list + colleagues
#             if 'self_manager' in obj and obj['self_manager'] is not None:
#                 self_manager = obj['self_manager']
#             if len(self_manager) > 0:
#                 duplicate_list.append(self_manager)
#             count_list = Counter(duplicate_list)
#             for key, value in count_list.items():
#                 if int(value) > 1 and key != '':
#                     response["status"] = "Fail"
#                     response["result"] = "Duplicate-Colleagues"
#                     return JsonResponse(response)
#             if len(staff_obj_check_code) == 0 
#                 response["status"] = "OK"
#                 response["result"] = "Not_Duplicate"
#                 return JsonResponse(response)
#             else:
#                 response["status"] = "Fail"
#                 response["result"] = "Duplicate"
#                 return JsonResponse(response)
#     else:
#         response["status"] = "NotFound"
#     return JsonResponse(response)











# class Commune(models.Model):
#     uuid = models.UUIDField(primary_key=True, 
#                             default=uuid.uuid4, 
#                             editable=False,
#                             help_text="Id Xã")
#     name = models.CharField(max_length=1024,
#                             editable=True,
#                             blank=False,
#                             null=False,
#                             default="Xã",
#                             help_text="Tên Xã")

    
#     created_by = models.ForeignKey(Account,
#                                    to_field='username',
#                                    related_name='%(app_label)s_%(class)s_created_by',
#                                    on_delete=(models.SET_NULL),
#                                    null=True,
#                                    blank=True,
#                                    help_text='Người tạo'
#                                    )

#     updated_by = models.ForeignKey(Account,
#                                    to_field='username',
#                                    related_name='%(app_label)s_%(class)s_updated_by',
#                                    on_delete=(models.SET_NULL),
#                                    null=True,
#                                    blank=True,
#                                    help_text='Người cập nhật'
#                                    )
#     updated_at = models.DateTimeField(
#         default=djnow,
#         help_text='Thời điểm cập nhật'
#     )
#     created_at = models.DateTimeField(
#         default=djnow,
#         editable=False,
#         help_text='Ngày đăng tải')
    
#     class Meta:
#         verbose_name = _("Xã")
#         verbose_name_plural = _("Xã")

#     def __str__(self):
#         return self.name


#     def save(self,*args, **kwargs):
#         if self.name is None:
#             self.name = str(self.uuid)
#         super().save(*args, **kwargs)
        
# class District(models.Model):
#     uuid = models.UUIDField(primary_key=True, 
#                             default=uuid.uuid4, 
#                             editable=False,
#                             help_text="Id quận/huyện"
#                             )
#     name = models.CharField(max_length=1024,
#                             editable=True,
#                             blank=False,
#                             null=False,
#                             default="Huyện",
#                             help_text="Tên quận/huyện"
#                             )
#     code = models.CharField(max_length=1024,
#                             editable=True,
#                             blank=False,
#                             null=False,
#                             unique=True,
#                             help_text="Code huyện"
#                             )
#     division_type = models.CharField(max_length=1024,
#                             editable=True,
#                             blank=False,
#                             null=False,
#                             help_text="loại quận/huyện"
#                             )
#     codename = models.CharField(max_length=1024,
#                             editable=True,
#                             blank=False,
#                             null=False,
#                             help_text="Codename quận/huyện"
#                             )
#     province_code = models.CharField(max_length=1024,
#                             editable=True,
#                             blank=False,
#                             null=False,
#                             help_text="Code tỉnh/thành phộ"
#                             )
#     province = models.ForeignKey(Province,
#                                 on_delete=models.CASCADE,
#                                 null=True,
#                                 blank=True,
#                                 help_text="Thuộc tỉnh/thành phố"
#                                 )
#     created_by = models.ForeignKey(Account,
#                                    to_field='username',
#                                    related_name='%(app_label)s_%(class)s_created_by',
#                                    on_delete=(models.SET_NULL),
#                                    null=True,
#                                    blank=True,
#                                    help_text='Người tạo'
#                                    )
#     provice = models.ForeignKey(City,
#                                     on_delete=models.SET_NULL,
#                                     null = True, blank=True
#                                     ,help_text="Thuộc Huyện"
#                                 )
#     updated_by = models.ForeignKey(Account,
#                                    to_field='username',
#                                    related_name='%(app_label)s_%(class)s_updated_by',
#                                    on_delete=(models.SET_NULL),
#                                    null=True,
#                                    blank=True,
#                                    help_text='Người cập nhật'
#                                    )
#     updated_at = models.DateTimeField(
#         default=djnow,
#         help_text='Thời điểm cập nhật'
#     )
#     created_at = models.DateTimeField(
#         default=djnow,
#         editable=False,
#         help_text='Ngày đăng tải')
    
#     class Meta:
#         verbose_name = _("Huyện")
#         verbose_name_plural = _("Huyện")

#     def __str__(self):
#         return self.name


#     def save(self,*args, **kwargs):
#         if self.name is None:
#             self.name = str(self.uuid)
#         super().save(*args, **kwargs)
# #Thành Phố
# class City(models.Model):
#     uuid = models.UUIDField(primary_key=True, 
#                             default=uuid.uuid4, 
#                             editable=False,
#                             help_text="Id Thành Phố")
#     name = models.CharField(max_length=1024,
#                             editable=True,
#                             blank=False,
#                             null=False,
#                             default="Xã",
#                             help_text="Tên Thành Phố")
#     district = models.ForeignKey(District,on_delete=models.SET_NULL,null = True, blank=True
#                                     ,help_text="Thuộc Huyện")
#     commune = models.ForeignKey(Commune,on_delete=models.CASCADE
#                                     ,help_text="Thuộc Xã")
    
#     code = models.CharField(max_length=1024,
#                             editable=True,
#                             blank=False,
#                             null=False,
#                             unique=True,
#                             help_text="Tên Thành Phố")
    
#     created_by = models.ForeignKey(Account,
#                                    to_field='username',
#                                    related_name='%(app_label)s_%(class)s_created_by',
#                                    on_delete=(models.SET_NULL),
#                                    null=True,
#                                    blank=True,
#                                    help_text='Người tạo'
#                                    )

#     updated_by = models.ForeignKey(Account,
#                                    to_field='username',
#                                    related_name='%(app_label)s_%(class)s_updated_by',
#                                    on_delete=(models.SET_NULL),
#                                    null=True,
#                                    blank=True,
#                                    help_text='Người cập nhật'
#                                    )
#     updated_at = models.DateTimeField(
#         default=djnow,
#         help_text='Thời điểm cập nhật'
#     )
#     created_at = models.DateTimeField(
#         default=djnow,
#         editable=False,
#         help_text='Ngày đăng tải')
    
#     class Meta:
#         verbose_name = _("Thành Phố ")
#         verbose_name_plural = _("Thành Phố")

#     def __str__(self):
#         return self.name


#     def save(self,*args, **kwargs):
#         if self.name is None:
#             self.name = str(self.uuid)
#         super().save(*args, **kwargs)