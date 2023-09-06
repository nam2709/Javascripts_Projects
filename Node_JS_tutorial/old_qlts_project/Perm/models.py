from django.db import models

# Create your models here.
from Account.models import Account
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
from django.apps import apps
from django.contrib.auth import get_user_model
from django.db.models.signals import m2m_changed
from django.utils import timezone


Account = get_user_model()

#App
class AppPermission(models.Model):
    class Meta:
        verbose_name = _("app") 
        verbose_name_plural = _("Tên app`")

    uuid = models.UUIDField(primary_key=True, 
                            default=uuid.uuid4, 
                            editable=False,
                            help_text="Id Acc")
    

    name = models.CharField(max_length=100,
                            help_text="Tên App")



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
    
    

    def getAllAppName(ignore_django_apps=False):
        all_app_names = []
        all_apps = apps.get_models()
        for app in all_apps:
            app_name = str(app).split('.')[0][8:]
            if ignore_django_apps is True and str(app_name).islower():
                continue
            # print(str(app.__dict__))
            if app_name not in all_app_names:
                all_app_names.append(str(app_name))
        return all_app_names
    
    def save(self, *args, **kwargs):
        # app_all = self.getAllAppName()
        # for app in app_all:
        #     if app:
        #         self.name = app

        self.updated_at = timezone.now()

        super(AppPermission, self).save(*args,**kwargs)

    def create_with_app_name(app):
        return AppPermission.objects.create(name=app)
    
    
    



def create_app_permission(all_app_name):
    for app_name in all_app_name:
        if not AppPermission.objects.filter(name=app_name).exists():
            AppPermission.create_with_app_name(app_name)    

from core.settings import INSTALLED_APPS
create_app_permission(INSTALLED_APPS)
   
    

#Model
class ModelsPermission(models.Model):

    class Meta:
        verbose_name = _("Model")
        verbose_name_plural = _("Model")
    uuid = models.UUIDField(primary_key=True, 
                            default=uuid.uuid4, 
                            editable=False,
                            help_text="Id Model")
    

    name = models.CharField(max_length=100,
                            help_text="Tên Model Name")
    app = models.CharField(max_length=100,null=True,
                            help_text="Tên App")
    
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
       
    


    # def getAllAppModelName(ignore_django_apps=False):
    #     result = []
    #     all_apps = apps.get_models()
    #     for app in all_apps:
    #         temp = {}

    #         app_name = str(app).split('.')[0][8:]
    #         print('app_name = %s' % app_name)
    #         if ignore_django_apps is True and str(app_name).islower():
    #             continue
    #         temp['app_name'] = app_name
    #         model_name = str(app).split('.')[-1][:-2]
    #         print('model_name = %s' % model_name)
    #         temp['model_name'] = model_name
    #         result.append(temp)
    #         print(result)
    #     return result
    def getAllAppModelName(ignore_django_apps=False):
        result = []
        all_apps = apps.get_models()
        for app in all_apps:
            temp = {}

            app_name = str(app).split('.')[0][8:]
            if ignore_django_apps is True and str(app_name).islower():
                continue
            temp['app_name'] = app_name

            model_name = str(app).split('.')[-1][:-2]
            temp['model_name'] = model_name

            
            model_permission = ModelsPermission.objects.create(name=model_name, app=app_name)
            result.append(model_permission)

        return result
        
    
    def create_with_models_name(model):
        return ModelsPermission.objects.create(name=model)

    
    
    def save(self, *args, **kwargs):

        self.updated_at = timezone.now()

        super(ModelsPermission, self).save(*args,**kwargs)
    def create_model_permission(instance, name, app):
        model_permission = instance(name=name, app=app)
        model_permission.save()
        return model_permission

   



    
     
#Permission
class Permission(models.Model):
    class Meta:
        verbose_name = _('Quyền')
        verbose_name_plural = _('Quyền')

    uuid = models.UUIDField(primary_key=True, 
                            default=uuid.uuid4, 
                            editable=False,
                            help_text="Id quyền")
    name = models.CharField(max_length=100,
                            help_text="Tên quyền")
    app = models.CharField(max_length=100,null=True,
                            help_text="Tên App")
    perm_name = models.CharField(max_length=500, editable=True, null=True, help_text=_('Tên Full App/Model'))
    model = models.CharField(max_length=100,null=True,
                            help_text="Tên Model Name")
    is_add = models.BooleanField(default=False,
                                 null=False,
                                 blank=False)
    #view
    is_view_only = models.BooleanField(default=False,
                                 null=False,
                                 blank=False)
    is_view_all = models.BooleanField(default=False,
                                 null=False,
                                 blank=False)
    is_view_public = models.BooleanField(default=False,
                                 null=False,
                                 blank=False)
    #delete
    is_delete_only = models.BooleanField(default=False,
                                 null=False,
                                 blank=False)
    is_delete_all = models.BooleanField(default=False,
                                 null=False,
                                 blank=False)
    is_delete_public = models.BooleanField(default=False,
                                 null=False,
                                 blank=False)
    #edit
    is_edit_only = models.BooleanField(default=False,
                                 null=False,
                                 blank=False)
    is_edit_all = models.BooleanField(default=False,
                                 null=False,
                                 blank=False)
    is_edit_public = models.BooleanField(default=False,
                                 null=False,
                                 blank=False)
                                

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
    
    def save(self, *args, **kwargs):
        self.updated_at = djnow()
        self.name = str("%s.%s" % (str(self.app_id).lower(),
                                   str(self.model_id).lower()))
        super().save(*args, **kwargs)

    

    
#Nhóm quyền
class PermissionGroup(models.Model):

    class Meta:
        verbose_name = _("Nhóm Quyền ")
        verbose_name_plural = _("Nhóm Quyền")
    uuid = models.UUIDField(primary_key=True, 
                            default=uuid.uuid4, 
                            editable=False,
                            help_text="Id ")
    name = models.CharField(max_length=1024,
                            editable=True,
                            blank=False,
                            null=False,
                            default="Nhóm quyền",
                            help_text="Tên Nhóm Quyền")
    account = models.ManyToManyField(Account,
                                    related_name='%(app_label)s_%(class)s_account',
                                    blank=True, )
    desc = models.TextField(
                                max_length=5000,
                                editable=True,
                                null=True,
                                blank=True,
                                help_text=_('Mô tả'))
    permissions = models.ManyToManyField(Permission,
                                              related_name='%(app_label)s_%(class)s_permissions',
                                              blank=True,
                                              )
    permissions_text = models.CharField(max_length=10000,
                            editable=True,
                            blank=True,
                            null=True,
                            help_text="Tên Quyền")
    account_text = models.CharField(max_length=10000,
                            editable=True,
                            blank=True,
                            null=True,
                            help_text="Tên Account")

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
    

    def get_account(self):
        return ",".join(str(p) for p in self.account.all())
    def get_permissions(self):
        return ",".join(str(p) for p in self.permissions.all())
    # def get_account(self):
    #     return "\n".join([p.Account for p in self.account.all()])
    # def get_permissions(self):
    #     return "\n".join([p.Permissions for p in self.permissions.all()])
    

    def __str__(self):
        return self.name
    # def Update_Permissions(self, *args, **kwargs):
    #     self.permissions_text = ""
    #     for per in self.permissions.all():
    #         self.permissions_text += str(per.name)
    #         # self.save()

    def save(self, *args,**kwargs):
        self.updated_at = djnow()
        super(PermissionGroup, self).save(*args,**kwargs)


    def update_permission_text(self, permission):
        per = Permission.objects.filter(uuid=str(permission)).first()
        if per:
            if self.permissions_text != None:
                try:
                    self.permissions_text = self.permissions_text + ', ' + per.name 
                    self.save()
                except Exception as xx:
                    print(xx)
            else:
                try:
                    self.permissions_text = per.name
                    self.save()
                except Exception as xx:
                    print(xx)



    # def clear_permission_text(self, permission):
    #     per = Permission.objects.filter(uuid=str(permission)).first()
    #     if per:
    #         if self.permissions_text != None:
    #             try:
    #                 self.permissions_text = self.permissions_text  
                    
    #                 self.save()
    #             except Exception as xx:
    #                 print(xx)
    #         else:
    #             try:
    #                 self.permissions_text = per.name
    #             except Exception as xx:
    #                 print(xx)
    

    def clear_permissions_text(self):
        try:
            self.permissions_text = None
            self.save()
        except Exception as xx:
            print(xx)



    def clear_account_text(self):
        try:
            self.account_text = None
            self.save()
        except Exception as xx:
            print(xx)



   
    

    def update_account_text(self, account): 
        acc = Account.objects.filter(id=int(account)).first()
        if acc:
            if self.account_text != None:
                try:
                    self.account_text = self.account_text + ', ' + acc.name 
                    
                    self.save()
                except Exception as xx:
                    print(xx)
            else:
                try:
                    self.account_text = acc.name
                    self.save()
                except Exception as xx:
                    print(xx)

def PermissionGroup_permission_changed(sender, instance, **kwargs):
    action = kwargs.pop('action', None)
    if action == 'post_add':
        pk_set = kwargs.pop('pk_set', None)
        for pk in pk_set:
            instance.update_permission_text(pk)
    if action == 'post_remove':
        pk_set = kwargs.pop('pk_set', None)
        for pk in pk_set:
            instance.clear_permissions_text()

m2m_changed.connect(PermissionGroup_permission_changed,sender=PermissionGroup.permissions.through)





def PermissionGroup_account_changed(sender, instance, **kwargs):
    action = kwargs.pop('action', None)
    if action == 'post_add':
        pk_set = kwargs.pop('pk_set', None)
        for pk in pk_set:
            instance.update_account_text(pk)
    if action == 'post_remove':
        pk_set = kwargs.pop('pk_set', None)
        for pk in pk_set:
            instance.clear_account_text()


m2m_changed.connect(PermissionGroup_account_changed, sender=PermissionGroup.account.through )
    
#Nhóm người
class UserGroup(models.Model):
    uuid = models.UUIDField(primary_key=True, 
                            default=uuid.uuid4, 
                            editable=False,
                            help_text="uuid ")
    name = models.CharField(max_length=1024,
                            editable=True,
                            blank=False,
                            null=False,
                            default="Nhóm user",
                            help_text="Tên nhóm user")
    account = models.ManyToManyField(Account,
                                    related_name='%(app_label)s_%(class)s_account',
                                    blank=True, )
    
    permissions_group = models.ManyToManyField(PermissionGroup,
                                              related_name='%(app_label)s_%(class)s_group_permissions',
                                              blank=True,
                                              )
    permissions = models.ManyToManyField(Permission,
                                              related_name='%(app_label)s_%(class)s_permissions',
                                              blank=True,
                                              null = True,
                                              )
    permissions_group_text = models.CharField(max_length=10000,
                            editable=True,
                            blank=True,
                            null=True,
                            help_text="Tên Quyền")
    account_text = models.CharField(max_length=10000,
                            editable=True,
                            blank=True,
                            null=True,
                            help_text="Tên Account")

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
    
    # def get_account(self):
    #     return ",".join([str(p) for p in self.account.all()])
    # def get_permissions_group(self):
    #     return ",".join([str(p) for p in self.permissions_group.all()])
    

    # def get_account(self):
    #     return "\n".join([p.account for p in self.account.all()])
    # def get_permissions_group(self):
    #     return "\n".join([p.permissions_group for p in self.permissions_group.all()])
    
    class Meta:
        verbose_name = _("Nhóm Người ")
        verbose_name_plural = _("Nhóm Người")

    def __str__(self):
        return self.name
    # def Update_Permissions(self, *args, **kwargs):
    #     self.permissions_text = ""
    #     for per in self.permissions.all():
    #         self.permissions_text += str(per.name)
    #         # self.save()

    def save(self, *args,**kwargs):
        self.updated_at = djnow()
        super(UserGroup, self).save(*args,**kwargs)


    def clear_permissions_group_text(self):
        try:
            self.permissions_group_text = None
            self.save()
        except Exception as xx:
            print(xx)



    def clear_account_text(self):
        try:
            self.account_text = None
            self.save()
        except Exception as xx:
            print(xx)

        
    

    def update_permissiongroup_text(self, permissiongroup):
        per = PermissionGroup.objects.filter(uuid=str(permissiongroup)).first()
        if per:
            if self.permissions_group_text != None:
                try:
                    self.permissions_group_text = self.permissions_group_text + ', ' + per.name 
                    
                    self.save()
                except Exception as xx:
                    print(xx)
            else:
                try:
                    self.permissions_group_text = per.name
                    self.save()
                except Exception as xx:
                    print(xx)


    def update_account_text(self, account): 
        acc = Account.objects.filter(id=int(account)).first()
        if acc:
            if self.account_text != None:
                try:
                    self.account_text = self.account_text + ', ' + acc.name 
                    
                    self.save()
                except Exception as xx:
                    print(xx)
            else:
                try:
                    self.account_text = acc.name
                    self.save()
                except Exception as xx:
                    print(xx)

def PermissionGroup_permission_changed(sender, instance, **kwargs):
    action = kwargs.pop('action', None)
    if action == 'post_add':
            pk_set = kwargs.pop('pk_set', None)
            for pk in pk_set:
                instance.update_permissiongroup_text(pk)
    if action == 'post_remove':
        pk_set = kwargs.pop('pk_set', None)
        for pk in pk_set:
            instance.clear_permissions_group_text()

m2m_changed.connect(PermissionGroup_permission_changed,sender=UserGroup.permissions_group.through)





def PermissionGroup_account_changed(sender, instance, **kwargs):
    action = kwargs.pop('action', None)
    if action == 'post_add':
        pk_set = kwargs.pop('pk_set', None)
        for pk in pk_set:
            instance.update_account_text(pk)
    if action == 'post_remove':
        pk_set = kwargs.pop('pk_set', None)
        for pk in pk_set:
            instance.clear_account_text()


m2m_changed.connect(PermissionGroup_account_changed, sender=UserGroup.account.through )
