from django.test import TestCase

# Create your tests here.
# from uuid import uuid4 as UUID4

# from django.conf import settings
# from django.contrib.auth.models import User
# from django.core.files.storage import FileSystemStorage
# from django.db import models
# from django.utils.timezone import now as djnow
# from django.utils.translation import gettext as _

# # from TheCategoryManagement.models import ChildrentMissionType
# # from TheCategoryManagement.models import ParentMissionType

# # Create your models here.
# from django.contrib.auth import get_user_model
# Account = get_user_model()
# upload_storage = FileSystemStorage(location=settings.MEDIA_ROOT, base_url='/media')

# ROLES_QUEUE = {}
# ROLES_THREAD_ACTIVE = False
# ROLES_THREAD_LAST_UPDATE = None
# from django.db.models import Q
# # from ScientificBground.models import ScienceProfile
# # from ScienceStudyHours.models import CommonInformationStudyHours
# # from MainManagement.models import UserProfile
# # from ScienceStudyHours.models import CommonInformationStudyHours

# import re
# import os
# from datetime import datetime

# from django.urls import URLPattern, URLResolver
# from django.urls import resolve

# from django.contrib.auth.decorators import user_passes_test
# # from django.contrib.auth.decorators import available_attrs

# from urllib.parse import urlparse

# from django.conf import settings
# from django.contrib.auth import REDIRECT_FIELD_NAME
# from django.core.exceptions import PermissionDenied
# from django.shortcuts import resolve_url
# from rest_framework import permissions

# login_url = "/admin/"
# redirect_field_name = "/"
# from MenuManagement.models import Menu
# # Unit Name
# from TheCategoryManagement.models import Unit

# # Area Name
# # from TheCategoryManagement.models import Category
# from functools import wraps
# from django.shortcuts import redirect
# from django.urls import reverse
# from django.contrib import messages


# def _upload_to(instance, filename):
#     result = os.path.join(instance._meta.app_label, instance.__class__.__name__, datetime.today().strftime("%Y/%m/%d"),
#                           filename)
#     print('result = %s' % result)
#     return result

# def cap_space(text):
#     new_text = re.sub(r"(\w)([A-Z])", r"\1 \2", text)
#     return new_text
# # ROLES=[]
# # def GetRoleByUser():
# #     lstUser=User.objects.all()
# #     for user in lstUser:
# #         print("Get role for %s " % user.username)
# #         role = Role.objects.all()
# #         rim = MenuInRole.objects.filter(role__in=role).all()
# #         ROLES[user.username]=rim

# # GetRoleByUser()
# # Views

# # MENU
# def tGetAllMenus_ByUser(username):
#     all_menu_perms = []
#     user_obj = User.objects.filter(username=username).first()
#     if user_obj is not None:
#         user_groups = GroupNameUser.objects.filter(users__username=username)
#         for gr in user_groups:
#             if gr.perm_group and gr.perm_group.permissions:
#                 menu_perms = gr.perm_group.permissions.filter(~Q(menu_name=None) | Q(perm_type="menu") | Q(perm_type="Menu"))
#                 for mn in menu_perms:
#                     all_menu_perms.append(str(mn.menu_code).upper())
#     print('all_menu_perms = %s' % all_menu_perms)
#     print('list(set(all_menu_perms)) = %s' % list(set(all_menu_perms)))
#     return list(set(all_menu_perms))

# # UNIT (Đơn Vị)
# def tGetAllUnits_ByUser(username):
#     all_unit_perms = []
#     user_obj = User.objects.filter(username=username).first()
#     if user_obj is not None:
#         user_groups = GroupNameUser.objects.filter(users__username=username)
#         for gr in user_groups:
#             if gr.perm_group and gr.perm_group.permissions:
#                 unit_perms = gr.perm_group.permissions.filter(~Q(unit_name=None) | Q(perm_type="unit") | Q(perm_type="Unit"))
#                 for mn in unit_perms:
#                     all_unit_perms.append(str(mn.unit_code).upper())
#     print('all_unit_perms = %s' % all_unit_perms)
#     print('list(set(all_unit_perms)) = %s' % list(set(all_unit_perms)))
#     return list(set(all_unit_perms))

# # AREA (Vùng)
# def tGetAllAreas_ByUser(username):
#     all_area_perms = []
#     user_obj = User.objects.filter(username=username).first()
#     if user_obj is not None:
#         user_groups = GroupNameUser.objects.filter(users__username=username)
#         for gr in user_groups:
#             if gr.perm_group and gr.perm_group.permissions:
#                 area_perms = gr.perm_group.permissions.filter(~Q(area_name=None) | Q(perm_type="area") | Q(perm_type="Area"))
#                 for mn in area_perms:
#                     all_area_perms.append(str(mn.area_code).upper())
#     print('all_area_perms = %s' % all_area_perms)
#     print('list(set(all_area_perms)) = %s' % list(set(all_area_perms)))
#     return list(set(all_area_perms))

# # FIELD (Lĩnh Vực)
# def tGetAllFields_ByUser(username):
#     all_field_perms = []
#     user_obj = User.objects.filter(username=username).first()
#     if user_obj is not None:
#         user_groups = GroupNameUser.objects.filter(users__username=username)
#         for gr in user_groups:
#             if gr.perm_group and gr.perm_group.permissions:
#                 field_perms = gr.perm_group.permissions.filter(~Q(field_name=None) | Q(perm_type="field") | Q(perm_type="Field"))
#                 for mn in field_perms:
#                     all_field_perms.append(str(mn.field_code).upper())
#     print('all_field_perms = %s' % all_field_perms)
#     print('list(set(all_field_perms)) = %s' % list(set(all_field_perms)))
#     return list(set(all_field_perms))

# # MISSION_TYPE (mission_parent_type Loại Nhiệm Vụ)
# def tGetAll_MissionType_ByUser(username):
#     all_mission_type_perms = []
#     user_obj = User.objects.filter(username=username).first()
#     if user_obj is not None:
#         user_groups = GroupNameUser.objects.filter(users__username=username)
#         for gr in user_groups:
#             if gr.perm_group and gr.perm_group.permissions:
#                 mission_type_perms = gr.perm_group.permissions.filter(~Q(mission_type_name=None) | Q(perm_type="mission_type") | Q(perm_type="MissionType"))
#                 for mn in mission_type_perms:
#                     all_mission_type_perms.append(str(mn.mission_type_code).upper())
#     print('all_mission_type_perms = %s' % all_mission_type_perms)
#     print('list(set(all_mission_type_perms)) = %s' % list(set(all_mission_type_perms)))
#     return list(set(all_mission_type_perms))

# # MISSION_FORM (mission_child_type Dạng Nhiệm Vụ)
# def tGetAll_MissionForm_ByUser(username):
#     all_mission_form_perms = []
#     user_obj = User.objects.filter(username=username).first()
#     if user_obj is not None:
#         user_groups = GroupNameUser.objects.filter(users__username=username)
#         for gr in user_groups:
#             if gr.perm_group and gr.perm_group.permissions:
#                 mission_form_perms = gr.perm_group.permissions.filter(~Q(mission_form_name=None) | Q(perm_type="mission_form") | Q(perm_type="MissionForm"))
#                 for mn in mission_form_perms:
#                     all_mission_form_perms.append(str(mn.mission_form_code).upper())
#     print('all_mission_form_perms = %s' % all_mission_form_perms)
#     print('list(set(all_mission_form_perms)) = %s' % list(set(all_mission_form_perms)))
#     return list(set(all_mission_form_perms))

# # All IN ONE:
# # @tnd: get all cases of fields:
# def tGetAllCases_ByUser(username, field_name):
#     if field_name == "unit":
#         return tGetAllUnits_ByUser(username)
#     elif field_name == "area":
#         return tGetAllAreas_ByUser(username)
#     elif field_name == "field":
#         return tGetAllFields_ByUser(username)
#     elif field_name == "mission_type":
#         return tGetAll_MissionType_ByUser(username)
#     elif field_name == "mission_form":
#         return tGetAll_MissionForm_ByUser(username)
#     elif field_name == "menu":
#         return tGetAllMenus_ByUser(username)
#     else:
#         return []

# ######## TAMND
# # Model Name
# class ModelNamePerm(models.Model):
#     class Meta:
#         verbose_name = _("Model Name")
#         verbose_name_plural = _("(ModelNamePerm) Model Name")

#     uuid = models.UUIDField(default=UUID4, max_length=64,
#                             editable=True, unique=True, primary_key=True)
#     code = models.CharField(max_length=500, editable=True, null=True, blank=True, help_text=_('Mã Model'))
#     verbose_name = models.CharField(max_length=500, editable=True, null=True, blank=True, help_text=_('verbose_name ModelNamePerm'))
#     title = models.CharField(max_length=500, editable=True, null=True, help_text=_('Tiêu đề Full App/Model'))
#     name = models.CharField(max_length=500, editable=True, null=True, help_text=_('Tên Full App/Model'))
#     desc = models.TextField(
#                                 max_length=5000,
#                                 editable=True,
#                                 null=True,
#                                 blank=True,
#                                 help_text=_('Mô tả')
#                             )
#     app_name = models.CharField(max_length=500, editable=True, null=True, help_text=_('Tên Apps'))
#     model_name = models.CharField(max_length=500, editable=True, null=True, help_text=_('Tên Model'))

#     meta_data_logo = models.CharField(
#         max_length=500,
#         editable=True,
#         blank=True,
#         null=True,
#         help_text=_('Meta data của logo')
#     )
#     is_deleted = models.BooleanField(default=False, null=False, editable=True, help_text=_('Trạng thái xóa'))

#     created_by = models.ForeignKey(AUTH_USER_MODEL, to_field='username',
#                                    related_name='%(class)s_created_by',
#                                    on_delete=(models.SET_NULL),
#                                    null=True,
#                                    blank=True,
#                                    help_text=_('người tạo'))
#     updated_by = models.ForeignKey(AUTH_USER_MODEL, to_field='username',
#                                    related_name='%(class)s_updated_by',
#                                    on_delete=(models.SET_NULL),
#                                    null=True,
#                                    blank=True,
#                                    help_text=_('Người cập nhật.'))
#     updated_at = models.DateTimeField(default=djnow)
#     created_at = models.DateTimeField(default=djnow, editable=False)

#     def __str__(self):
#         return str(self.name)

#     def genPermName(self):
#         DEFAULT_PERMS = [
#             'create',
#             'detail',
#             'edit',
#             'delete',
#             'list',
#             # All
#             'create_all',
#             'detail_all',
#             'edit_all',
#             'delete_all',
#             'list_all',
#         ]
#         SPECIAL_MODELS = [

#         ]
#         app_name = self.app_name
#         model_name = self.model_name
#         if model_name not in SPECIAL_MODELS:
#             for prefix_perm in DEFAULT_PERMS:
#                 check_obj = PermissionNamePerm.objects.filter(app_name=app_name,
#                                                               model_name=model_name,
#                                                               perm_name=prefix_perm).first()
#                 if check_obj is None:
#                     check_obj = PermissionNamePerm()
#                 check_obj.app_name = app_name
#                 check_obj.model_name = model_name
#                 check_obj.model_name_obj = self
#                 check_obj.perm_name = prefix_perm
#                 check_obj.perm_type = "model"
#                 try:
#                     check_obj.save()
#                 except Exception as rx:
#                     print(str(rx))

#     def save(self, *args, **kwargs):
#         self.updated_at = djnow()
#         self.name = str("%s.%s" % (str(self.app_name).lower(),
#                                    str(self.model_name).lower()))
#         if self.title is None or self.title is "":
#             self.title = cap_space(str(self.name).replace(".", " ").replace("-", " "))
#         else:
#             self.title = cap_space(self.title).title()
#         super().save(*args, **kwargs)
#         # Update permission name:
#         try:
#             objs = PermissionNamePerm.objects.filter(model_name_obj=self)
#             if objs.count() == 0:
#                 self.genPermName()
#             else:
#                 for obj in objs:
#                     obj.model_name = self.model_name
#                     obj.app_name = self.app_name
#                     obj.save()
#         except Exception as xx:
#             print("Exception: %s" % str(xx))
# from django.apps import apps

# def getAllAppName(ignore_django_apps=False):
#     all_app_names = []
#     all_apps = apps.get_models()
#     for app in all_apps:
#         app_name = str(app).split('.')[0][8:]
#         if ignore_django_apps is True and str(app_name).islower():
#             continue
#         all_app_names.append(app_name)
#     return all_app_names

# def getAllAppModelName(ignore_django_apps=False):
#     result = []
#     all_apps = apps.get_models()
#     for app in all_apps:
#         temp = {}
#         print('app = %s' % app)
#         full_name = str(app).split("'")[1]
#         print('full_name = %s' % full_name)
#         temp['full_name'] = full_name
#         ###
#         app_name = str(app).split('.')[0][8:]
#         print('app_name = %s' % app_name)
#         if ignore_django_apps is True and str(app_name).islower():
#             continue
#         temp['app_name'] = app_name
#         model_name = str(app).split('.')[-1][:-2]
#         print('model_name = %s' % model_name)
#         temp['model_name'] = model_name

#         # Verbose Name:
#         verbose_name = app._meta.verbose_name
#         print('verbose_name = %s' % verbose_name)
#         temp['verbose_name'] = verbose_name
#         result.append(temp)
#     return result

# def clearModelNamePerm():
#     try:
#         ModelNamePerm.objects.all().delete()
#     except Exception as xx:
#         print(str(xx))

# def updateModelNamePerm():
#     try:
#         for model in getAllAppModelName(ignore_django_apps=False):
#             full_name = model['full_name']
#             print("full_name = %s" % full_name)
#             app_name = model['app_name']
#             print("app_name = %s" % app_name)
#             model_name = model['model_name']
#             print("model_name = %s" % model_name)
#             verbose_name = model['verbose_name']
#             print("verbose_name = %s" % verbose_name)
#             check_obj = ModelNamePerm.objects.filter(app_name=app_name,
#                                                      model_name=model_name).first()
#             if check_obj is None:
#                 check_obj = ModelNamePerm()
#             check_obj.name = full_name
#             check_obj.perm_type = "model"
#             check_obj.app_name = app_name
#             check_obj.model_name = model_name
#             check_obj.verbose_name = verbose_name
#             try:
#                 check_obj.save()
#             except Exception as rx:
#                 print(str(rx))
#         return True
#     except Exception as xx:
#         print(str(xx))
#         return False

# # View Name
# class ViewNamePerm(models.Model):
#     class Meta:
#         verbose_name = _("View Name")
#         verbose_name_plural = _("(ViewNamePerm) View Name")

#     uuid = models.UUIDField(default=UUID4, max_length=64,
#                             editable=True, unique=True, primary_key=True)
#     code = models.CharField(max_length=500,
#                             editable=True,
#                             null=True,
#                             blank=True,
#                             help_text=_('Mã View'))
#     title = models.CharField(max_length=500,
#                              editable=True,
#                              null=True,
#                              blank=True,
#                              help_text=_('Tiêu đề ViewNamePerm'))
#     name = models.CharField(max_length=500, editable=True, null=True, help_text=_('Tên Full App/View'))
#     desc = models.TextField(
#                                 max_length=5000,
#                                 editable=True,
#                                 null=True,
#                                 blank=True,
#                                 help_text=_('Mô tả')
#                             )
#     app_name = models.CharField(max_length=500, editable=True, null=True, help_text=_('Tên Apps'))
#     view_name = models.CharField(max_length=500, editable=True, null=True, help_text=_('Tên View'))
#     url_pattern = models.CharField(max_length=2000, editable=True, null=True, blank=True, help_text=_('Url Pattern View'))

#     meta_data_logo = models.CharField(
#         max_length=500,
#         editable=True,
#         blank=True,
#         null=True,
#         help_text=_('Meta data của logo')
#     )
#     is_deleted = models.BooleanField(default=False, null=False, editable=True, help_text=_('Trạng thái xóa'))

#     created_by = models.ForeignKey(AUTH_USER_MODEL, to_field='username',
#                                    related_name='%(class)s_created_by',
#                                    on_delete=(models.SET_NULL),
#                                    null=True,
#                                    blank=True,
#                                    help_text=_('người tạo'))
#     updated_by = models.ForeignKey(AUTH_USER_MODEL, to_field='username',
#                                    related_name='%(class)s_updated_by',
#                                    on_delete=(models.SET_NULL),
#                                    null=True,
#                                    blank=True,
#                                    help_text=_('Người cập nhật.'))
#     updated_at = models.DateTimeField(default=djnow)
#     created_at = models.DateTimeField(default=djnow, editable=False)

#     def __str__(self):
#         return str(self.name)

#     def genPermName(self):
#         DEFAULT_PERMS = [
#             'allow',
#         ]
#         SPECIAL_MODELS = [

#         ]
#         try:
#             app_name = self.app_name
#             view_name = self.view_name
#             if app_name not in SPECIAL_MODELS:
#                 for prefix_perm in DEFAULT_PERMS:
#                     check_obj = PermissionNamePerm.objects.filter(app_name=app_name,
#                                                                   view_name=view_name,
#                                                                   perm_name=prefix_perm).first()
#                     if check_obj is None:
#                         check_obj = PermissionNamePerm()
#                     check_obj.app_name = app_name
#                     check_obj.view_name = view_name
#                     check_obj.view_name_obj = self
#                     check_obj.perm_name = prefix_perm
#                     check_obj.perm_type = "view"
#                     try:
#                         check_obj.save()
#                     except Exception as rx:
#                         print(str(rx))
#         except Exception as xx:
#             print(str(xx))
#             return False

#     def save(self, *args, **kwargs):
#         self.updated_at = djnow()
#         view_name = ""
#         if self.view_name:
#             view_name = str(self.view_name).lower()
#         app_name = ""
#         if self.app_name:
#             app_name = str(self.app_name).lower()
#         self.name = str("%s.%s" % (app_name,
#                                    view_name))
#         if self.title is None or self.title is "":
#             self.title = cap_space(str(self.name).replace(".", " ").replace("-", " "))

#         super().save(*args, **kwargs)
#         # Update permission name:
#         try:
#             objs = PermissionNamePerm.objects.filter(view_name_obj=self)
#             if objs.count() == 0:
#                 self.genPermName()
#             else:
#                 for obj in objs:
#                     obj.view_name = self.view_name
#                     obj.app_name = self.app_name
#                     obj.save()
#         except Exception as xx:
#             print("Exception: %s" % str(xx))

# def get_all_apps():
#     all_models = apps.get_models()
#     all_apps = []
#     for m in all_models:
#         app_name = str(m).split('.')[0].split("'")[-1]
#         if app_name not in all_apps:
#             all_apps.append(app_name)
#     return all_apps

# def get_all_view():
#     print("__import__(settings.ROOT_URLCONF).urls = %s " % __import__(settings.ROOT_URLCONF).urls.__dict__)
#     all_urlpatterns = __import__(settings.ROOT_URLCONF).urls.urlpatterns
#     detail_views_list = []
#     # URLPattern, URLResolver
#     def get_all_view_names(urlpatterns):
#         for pattern in urlpatterns:
#             print('pattern = %s' % pattern.__dict__)
#             if isinstance(pattern, URLResolver):
#                 get_all_view_names(pattern.url_patterns)
#             elif isinstance(pattern, URLPattern):
#                 tmp = {}
#                 print('pattern.callback = %s' % pattern.callback.__dict__)
#                 print('pattern.callback.__name__ = %s' % pattern.callback.__name__)
#                 tmp['name'] = pattern.callback.__name__
#                 tmp['pattern'] = pattern.pattern.__dict__
#                 tmp['module'] = pattern.callback.__module__
#                 arr = pattern.callback.__module__.split(".")
#                 tmp['app_name'] = arr[0]
#                 detail_views_list.append(tmp)

#     get_all_view_names(all_urlpatterns)
#     all_views_list = []

#     # remove redundant entries and specific ones we don't care about
#     print('====================================')
#     print('======= CURRENT VIEW LIST ==========')

#     for each in detail_views_list:
#         if each['name'] not in "serve add_view change_view changelist_view history_view delete_view RedirectView":
#             if each['name'] not in all_views_list:
#                 # print('View: %s' % each)
#                 all_views_list.append(each)
#     print('====================================')

#     return all_views_list

# # get_all_view()
# def clearViewNamePerm():
#     try:
#         ViewNamePerm.objects.all().delete()
#     except Exception as xx:
#         print(str(xx))

# def updateViewNamePerm():
#     try:
#         for view in get_all_view():
#             # full_name = view['name']
#             # print("full_name = %s" % full_name)
#             app_name = ""
#             if "app_name" in view:
#                 app_name = view['app_name']
#                 print("app_name = %s" % app_name)
#             url_pattern = ""
#             if "url_pattern" in view:
#                 url_pattern = view['url_pattern']
#                 print("url_pattern = %s" % url_pattern)
#             view_name = view['name']
#             print("view_name = %s" % view_name)
#             check_obj = ViewNamePerm.objects.filter(app_name=app_name,
#                                                      view_name=view_name).first()
#             if check_obj is None:
#                 check_obj = ViewNamePerm()
#                 check_obj.name = view_name
#                 check_obj.app_name = app_name
#             check_obj.perm_type = "view"
#             check_obj.view_name = view_name
#             check_obj.url_pattern = url_pattern
#             try:
#                 check_obj.save()
#             except Exception as rx:
#                 print(str(rx))
#         return True
#     except Exception as xx:
#         print(str(xx))
#         return False

# # View Name
# class MenuNamePerm(models.Model):
#     class Meta:
#         verbose_name = _("Menu Name")
#         verbose_name_plural = _("(MenuNamePerm) Menu Name")

#     uuid = models.UUIDField(default=UUID4, max_length=64,
#                             editable=True, unique=True, primary_key=True)
#     code = models.CharField(max_length=500, editable=True, null=True, help_text=_('Mã Menu'))
#     title = models.CharField(max_length=500, editable=True, null=True, blank=True, help_text=_('Tiêu đề MenuNamePerm'))
#     name = models.CharField(max_length=500, editable=True, null=True, help_text=_('Tên Full App/Menu'))
#     desc = models.TextField(
#                                 max_length=5000,
#                                 editable=True,
#                                 null=True,
#                                 blank=True,
#                                 help_text=_('Mô tả')
#                             )
#     app_name = models.CharField(max_length=500, editable=True, null=True, help_text=_('Tên Apps'))
#     menu_name = models.CharField(max_length=500, editable=True, null=True, help_text=_('Tên Menu'))
#     menu_url = models.CharField(max_length=4096, editable=True, null=True, blank=True,
#                                 help_text=_('Url Menu'))
#     parent_uuid = models.UUIDField(null=True, max_length=64, blank=True,
#                                    editable=True, help_text='uuid menu cha')
#     is_parent = models.BooleanField(default=False, null=False, editable=True, help_text='là menu cha')
#     meta_data_logo = models.CharField(
#         max_length=500,
#         editable=True,
#         blank=True,
#         null=True,
#         help_text=_('Meta data của logo')
#     )
#     is_deleted = models.BooleanField(default=False, null=False, editable=True, help_text=_('Trạng thái xóa'))

#     created_by = models.ForeignKey(AUTH_USER_MODEL, to_field='username',
#                                    related_name='%(class)s_created_by',
#                                    on_delete=(models.SET_NULL),
#                                    null=True,
#                                    blank=True,
#                                    help_text=_('người tạo'))
#     updated_by = models.ForeignKey(AUTH_USER_MODEL, to_field='username',
#                                    related_name='%(class)s_updated_by',
#                                    on_delete=(models.SET_NULL),
#                                    null=True,
#                                    blank=True,
#                                    help_text=_('Người cập nhật.'))
#     updated_at = models.DateTimeField(default=djnow)
#     created_at = models.DateTimeField(default=djnow, editable=False)

#     def __str__(self):
#         # if self.parent_uuid:
#         #     pr_menu = Menu.objects.filter(uuid=self.parent_uuid).first()
#         #     if pr_menu is not None:
#         #         return str("[%s] %s" % (pr_menu.name, self.name))
#         #     else:
#         #         return str("[] %s" % (self.name))
#         #     pass
#         # else:
#         #     return str(self.name)
#         return str(self.name)

#     def genPermName(self):
#         DEFAULT_PERMS = [
#             'allow',
#         ]
#         SPECIAL_MODELS = [

#         ]
#         try:
#             DEFAULT_PERM_GROUPS = [
#                 ''
#             ]
#             menu_name = self.name
#             menu_code = self.code
#             if menu_name not in SPECIAL_MODELS:
#                 for prefix_perm in DEFAULT_PERMS:
#                     check_obj = PermissionNamePerm.objects.filter(menu_name=menu_name,
#                                                                   menu_code=menu_code,
#                                                                   perm_type="menu").first()
#                     if check_obj is None:
#                         check_obj = PermissionNamePerm()
#                     check_obj.menu_name = menu_name
#                     check_obj.menu_code = menu_code
#                     check_obj.menu_name_obj = self
#                     check_obj.perm_name = prefix_perm
#                     check_obj.perm_type = "menu"
#                     try:
#                         check_obj.save()
#                         # Create or update Permission Group
#                         group_name = str("[Menu] %s-PermissionGroup" % (menu_name))
#                         perm_group_obj = GroupNamePerm.objects.filter(menu_name=group_name).first()
#                         if perm_group_obj is None:
#                             perm_group_obj = GroupNamePerm()
#                             perm_group_obj.name = group_name
#                             perm_group_obj.menu_name = menu_name
#                             perm_group_obj.save()
#                         perm_group_obj.permissions.add(check_obj)
#                         # Add to AllMenus Permission Group
#                         group_name = str("[AllMenus] Permission Group")
#                         perm_group_obj = GroupNamePerm.objects.filter(menu_name=group_name).first()
#                         if perm_group_obj is not None:
#                             perm_group_obj.permissions.add(check_obj)
#                         # @tnd: Find parent menu group -->
#                         if self.is_parent is True:
#                             parent_menu_obj = Menu.objects.filter(uuid=self.parent_uuid).first()
#                             if parent_menu_obj is not None:
#                                 group_name = str("[Menu] %s-PermissionGroup" % (parent_menu_obj.name))
#                                 perm_group_obj = GroupNamePerm.objects.filter(menu_name=group_name).first()
#                                 if perm_group_obj is not None:
#                                     perm_group_obj.permissions.add(check_obj)
#                         # @tnd: Add to group
#                     except Exception as rx:
#                         print(str(rx))
#         except Exception as xx:
#             print(str(xx))
#             return False
#     def save(self, *args, **kwargs):
#         self.updated_at = djnow()
#         if self.name is None or self.name is "":
#             self.name = str("%s.%s" % (str(self.app_name).lower(),
#                                        str(self.menu_name).lower()))
#         if self.title is None or self.title is "":
#             self.title = cap_space(str(self.name).replace(".", " ").replace("-", " "))
#         else:
#             self.title = cap_space(self.title).title()
#         super().save(*args, **kwargs)
#         # Update permission name:
#         try:
#             objs = PermissionNamePerm.objects.filter(menu_name_obj=self)
#             if objs.count() == 0:
#                 self.genPermName()
#             else:
#                 for obj in objs:
#                     obj.menu_name = self.name
#                     obj.menu_code = self.code
#                     obj.menu_name_obj = self
#                     obj.save()
#         except Exception as xx:
#             print("Exception: %s" % str(xx))

# def getMenuFromOld():
#     try:
#         for menu_obj in Menu.objects.all():
#             # print(menu_obj.__dict__)
#             menu_name = menu_obj.name
#             if menu_obj.is_parent is False and str(menu_obj.parent_uuid) is not "":
#                 pr_obj = Menu.objects.filter(uuid=menu_obj.parent_uuid).first()
#                 if pr_obj is not None:
#                     menu_name = str("[%s] %s" % (pr_obj.name, menu_obj.name))
#                 else:
#                     print('pr_obj is None')
#                     print('menu_obj.parent_uuid = %s' % menu_obj.parent_uuid)

#             new_menu = MenuNamePerm.objects.filter(name=menu_name,
#                                                    menu_url=menu_obj.url).first()
#             if new_menu is None:
#                 new_menu = MenuNamePerm()
#                 new_menu.name = menu_name
#                 new_menu.code = menu_obj.code
#             new_menu.is_parent = menu_obj.is_parent
#             new_menu.parent_uuid = menu_obj.parent_uuid
#             new_menu.title = menu_obj.title
#             new_menu.menu_url = menu_obj.url
#             new_menu.menu_name = menu_obj.name
#             new_menu.save()
#     except Exception as xx:
#         print("[getMenuFromOld] Exception: %s" % str(xx))
#         return False

# class UnitNamePerm(models.Model):
#     class Meta:
#         verbose_name = _("Unit Name")
#         verbose_name_plural = _("(UnitNamePerm) Unit Name")

#     uuid = models.UUIDField(default=UUID4,
#                             max_length=64,
#                             editable=True,
#                             unique=True,
#                             primary_key=True)
#     code = models.CharField(max_length=500,
#                             editable=True,
#                             null=True,
#                             blank=True,
#                             help_text=_('Mã Unit'))
#     title = models.CharField(max_length=500,
#                              editable=True,
#                              null=True,
#                              blank=True,
#                              help_text=_('Tiêu đề UnitNamePerm'))
#     name = models.CharField(max_length=500,
#                             editable=True,
#                             null=True,
#                             # unique=True,
#                             help_text=_('Tên Unit'))
#     desc = models.TextField(
#                                 max_length=5000,
#                                 editable=True,
#                                 null=True,
#                                 blank=True,
#                                 help_text=_('Mô tả')
#                             )
#     meta_data_logo = models.CharField(
#         max_length=500,
#         editable=True,
#         blank=True,
#         null=True,
#         help_text=_('Meta data của logo')
#     )
#     is_deleted = models.BooleanField(default=False,
#                                      null=False,
#                                      editable=True,
#                                      help_text=_('Trạng thái xóa'))
#     unit = models.ForeignKey(Unit, to_field='uuid',
#                              related_name='%(class)s_created_by',
#                              on_delete=(models.SET_NULL),
#                              null=True,
#                              blank=True,
#                              help_text=_('Unit Object'))
#     created_by = models.ForeignKey(AUTH_USER_MODEL, to_field='username',
#                                    related_name='%(class)s_created_by',
#                                    on_delete=(models.SET_NULL),
#                                    null=True,
#                                    blank=True,
#                                    help_text=_('người tạo'))
#     updated_by = models.ForeignKey(AUTH_USER_MODEL, to_field='username',
#                                    related_name='%(class)s_updated_by',
#                                    on_delete=(models.SET_NULL),
#                                    null=True,
#                                    blank=True,
#                                    help_text=_('Người cập nhật.'))
#     updated_at = models.DateTimeField(default=djnow)
#     created_at = models.DateTimeField(default=djnow,
#                                       editable=False)

#     def __str__(self):
#         return str(self.name)

#     def genPermName(self):
#         DEFAULT_PERMS = [
#             'create',
#             'detail',
#             'edit',
#             'delete',
#             'list',
#             # All
#             'create_all',
#             'detail_all',
#             'edit_all',
#             'delete_all',
#             'list_all',
#         ]
#         SPECIAL_MODELS = [

#         ]
#         clearUnit_PermissionNamePerm()
#         try:
#             unit_name = self.name
#             unit_code = str(self.code).lower()
#             for prefix_perm in DEFAULT_PERMS:
#                 check_obj = PermissionNamePerm.objects.filter(unit_name=unit_name,
#                                                               perm_name=prefix_perm).first()
#                 if check_obj is None:
#                     check_obj = PermissionNamePerm()
#                 check_obj.unit_name = unit_name
#                 check_obj.unit_name_obj = self
#                 check_obj.unit_code = unit_code
#                 check_obj.perm_name = prefix_perm
#                 check_obj.perm_type = "unit"
#                 try:
#                     check_obj.save()
#                 except Exception as rx:
#                     print(str(rx))
#         except Exception as xx:
#             print(str(xx))
#             return False

#     def save(self, *args, **kwargs):
#         self.updated_at = djnow()
#         if self.title is None or self.title is "":
#             self.title = cap_space(str(self.name).replace(".", " ").replace("-", " ").replace("_", " ").replace("&", " "))
#         else:
#             self.title = cap_space(self.title).title()
#         # try:
#         #     from Common.views_tools import remove_accents
#         #     self.code = get_code(str(self.name).replace("&", "_").replace("-", "_"))
#         #     self.code = remove_accents(self.code)
#         #     i = 0
#         #     self_code = self.code
#         #     while UnitNamePerm.objects.filter(Q(code=self.code) & ~Q(uuid=self.uuid)).first() is not None:
#         #         i += 1
#         #         self.code = str("%s_%s" % (self_code, i))
#         # except Exception as xx:
#         #     print(str(xx))
#         super().save(*args, **kwargs)
#         # Update permission name:
#         try:
#             objs = PermissionNamePerm.objects.filter(unit_name_obj=self)
#             if objs.count() == 0:
#                 self.genPermName()
#             else:
#                 for obj in objs:
#                     obj.unit_name = self.name
#                     obj.unit_code = self.code
#                     obj.save()
#         except Exception as xx:
#             print("Exception: %s" % str(xx))
# def updateUnitNamePerm():
#     try:
#         for unit_obj in Unit.objects.all():
#             print("unit_obj = %s" % unit_obj.__dict__)
#             check_obj = UnitNamePerm.objects.filter(unit=unit_obj).first()
#             if check_obj is None:
#                 check_obj = UnitNamePerm()
#                 check_obj.unit = unit_obj
#             check_obj.name = unit_obj.name
#             check_obj.code = unit_obj.code
#             try:
#                 check_obj.save()
#             except Exception as rx:
#                 print(str(rx))
#         return True
#     except Exception as xx:
#         print("[updateUnitNamePerm] Exception: %s" % str(xx))
#         return False


# # Bảng danh mục Vùng --> Phân quyền
# class AreaNamePerm(models.Model):
#     class Meta:
#         verbose_name = _("Area Name")
#         verbose_name_plural = _("(AreaNamePerm) Area Name")

#     uuid = models.UUIDField(default=UUID4, max_length=64,
#                             editable=True, unique=True, primary_key=True)
#     code = models.CharField(max_length=500, editable=True, null=True, help_text=_('Mã Area'))
#     title = models.CharField(max_length=500, editable=True, null=True, help_text=_('Tiêu đề AreaNamePerm'))
#     name = models.CharField(max_length=500, editable=True, null=True, help_text=_('Tên Area'))
#     desc = models.TextField(
#                                 max_length=5000,
#                                 editable=True,
#                                 null=True,
#                                 blank=True,
#                                 help_text=_('Mô tả')
#                             )
#     meta_data_logo = models.CharField(
#         max_length=500,
#         editable=True,
#         blank=True,
#         null=True,
#         help_text=_('Meta data của logo')
#     )
#     is_deleted = models.BooleanField(default=False, null=False, editable=True, help_text=_('Trạng thái xóa'))
#     # area = models.ForeignKey(Category, to_field='uuid',
#     #                          related_name='%(class)s_created_by',
#     #                          on_delete=(models.SET_NULL),
#     #                          null=True,
#     #                          blank=True,
#     #                          help_text=_('Unit Object'))
#     created_by = models.ForeignKey(AUTH_USER_MODEL, to_field='username',
#                                    related_name='%(class)s_created_by',
#                                    on_delete=(models.SET_NULL),
#                                    null=True,
#                                    blank=True,
#                                    help_text=_('người tạo'))
#     updated_by = models.ForeignKey(AUTH_USER_MODEL, to_field='username',
#                                    related_name='%(class)s_updated_by',
#                                    on_delete=(models.SET_NULL),
#                                    null=True,
#                                    blank=True,
#                                    help_text=_('Người cập nhật.'))
#     updated_at = models.DateTimeField(default=djnow)
#     created_at = models.DateTimeField(default=djnow, editable=False)

#     def __str__(self):
#         return str(self.name)

#     def genPermName(self):
#         DEFAULT_PERMS = [
#             'create',
#             'detail',
#             'edit',
#             'delete',
#             'list',
#             # All
#             'create_all',
#             'detail_all',
#             'edit_all',
#             'delete_all',
#             'list_all',
#         ]
#         SPECIAL_MODELS = [

#         ]
#         try:
#             area_name = self.name
#             area_code = self.code
#             for prefix_perm in DEFAULT_PERMS:
#                 check_obj = PermissionNamePerm.objects.filter(area_name=area_name,
#                                                               perm_name=prefix_perm).first()
#                 if check_obj is None:
#                     check_obj = PermissionNamePerm()
#                 check_obj.area_name = area_name
#                 check_obj.area_code = area_code
#                 check_obj.area_name_obj = self
#                 check_obj.perm_name = prefix_perm
#                 check_obj.perm_type = "area"
#                 try:
#                     check_obj.save()
#                 except Exception as rx:
#                     print(str(rx))
#         except Exception as xx:
#             print(str(xx))
#             return False

#     def save(self, *args, **kwargs):
#         self.updated_at = djnow()
#         if self.title is None or self.title is "":
#             self.title = cap_space(str(self.name).replace(".", " ").replace("-", " ").replace("_", " ").replace("&", " "))
#         else:
#             self.title = cap_space(self.title).title()
#         # try:
#         #     from Common.views_tools import remove_accents
#         #     self.code = get_code(self.name)
#         #     self.code = remove_accents(self.code)
#         # except Exception as xx:
#         #     print(str(xx))
#         super().save(*args, **kwargs)
#         # Update permission name:
#         try:
#             objs = PermissionNamePerm.objects.filter(area_name_obj=self)
#             if objs.count() == 0:
#                 self.genPermName()
#             else:
#                 for obj in objs:
#                     obj.area_name = self.name
#                     obj.area_code = self.code
#                     obj.save()
#         except Exception as xx:
#             print("Exception: %s" % str(xx))

# def updateAreaNamePerm():
#     try:
#         cat_parent_obj = Category.objects.filter(code="LV").first()
#         if cat_parent_obj is None:
#             print('Not found Category obj code: LV')
#         else:
#             for lv_cat_obj in Category.objects.filter(parent=cat_parent_obj):
#                 check_obj = AreaNamePerm.objects.filter(area=lv_cat_obj).first()
#                 if check_obj is None:
#                     check_obj = AreaNamePerm()
#                     check_obj.area = lv_cat_obj
#                 check_obj.name = lv_cat_obj.name
#                 check_obj.code = lv_cat_obj.code
#                 try:
#                     check_obj.save()
#                 except Exception as rx:
#                     print(str(rx))
#         return True
#     except Exception as xx:
#         print("[updateAreaNamePerm] Exception: %s" % str(xx))
#         return False

# # Bảng danh mục Lĩnh vực --> Phân quyền
# class FieldNamePerm(models.Model):
#     class Meta:
#         verbose_name = _("Field Name")
#         verbose_name_plural = _("(FieldNamePerm) Field Name")

#     uuid = models.UUIDField(default=UUID4, max_length=64,
#                             editable=True, unique=True, primary_key=True)
#     code = models.CharField(max_length=500, editable=True, null=True, help_text=_('Mã Field'))
#     title = models.CharField(max_length=500, editable=True, null=True, help_text=_('Tiêu đề FieldNamePerm'))
#     name = models.CharField(max_length=500, editable=True, null=True, help_text=_('Tên Field'))
#     desc = models.TextField(
#                                 max_length=5000,
#                                 editable=True,
#                                 null=True,
#                                 blank=True,
#                                 help_text=_('Mô tả')
#                             )
#     meta_data_logo = models.CharField(
#         max_length=500,
#         editable=True,
#         blank=True,
#         null=True,
#         help_text=_('Meta data của logo')
#     )
#     is_deleted = models.BooleanField(default=False, null=False, editable=True, help_text=_('Trạng thái xóa'))
#     # area = models.ForeignKey(Category, to_field='uuid',
#     #                          related_name='%(class)s_created_by',
#     #                          on_delete=(models.SET_NULL),
#     #                          null=True,
#     #                          blank=True,
#     #                          help_text=_('Unit Object'))
#     created_by = models.ForeignKey(AUTH_USER_MODEL, to_field='username',
#                                    related_name='%(class)s_created_by',
#                                    on_delete=(models.SET_NULL),
#                                    null=True,
#                                    blank=True,
#                                    help_text=_('người tạo'))
#     updated_by = models.ForeignKey(AUTH_USER_MODEL, to_field='username',
#                                    related_name='%(class)s_updated_by',
#                                    on_delete=(models.SET_NULL),
#                                    null=True,
#                                    blank=True,
#                                    help_text=_('Người cập nhật.'))
#     updated_at = models.DateTimeField(default=djnow)
#     created_at = models.DateTimeField(default=djnow, editable=False)

#     def __str__(self):
#         return str(self.name)

#     def genPermName(self):
#         DEFAULT_PERMS = [
#             'create',
#             'detail',
#             'edit',
#             'delete',
#             'list',
#             # All
#             'create_all',
#             'detail_all',
#             'edit_all',
#             'delete_all',
#             'list_all',
#         ]
#         SPECIAL_MODELS = [

#         ]
#         try:
#             field_name = self.name
#             field_code = self.code
#             for prefix_perm in DEFAULT_PERMS:
#                 check_obj = PermissionNamePerm.objects.filter(field_name=field_name,
#                                                               perm_name=prefix_perm).first()
#                 if check_obj is None:
#                     check_obj = PermissionNamePerm()
#                 check_obj.field_name = field_name
#                 check_obj.field_code = field_code
#                 check_obj.field_name_obj = self
#                 check_obj.perm_name = prefix_perm
#                 check_obj.perm_type = "field"
#                 try:
#                     check_obj.save()
#                 except Exception as rx:
#                     print(str(rx))
#         except Exception as xx:
#             print(str(xx))
#             return False

#     def save(self, *args, **kwargs):
#         self.updated_at = djnow()
#         if self.title is None or self.title is "":
#             self.title = cap_space(str(self.name).replace(".", " ").replace("-", " ").replace("_", " ").replace("&", " "))
#         else:
#             self.title = cap_space(self.title).title()
#         # try:
#         #     from Common.views_tools import remove_accents
#         #     self.code = get_code(self.name)
#         #     self.code = remove_accents(self.code)
#         # except Exception as xx:
#         #     print(str(xx))
#         super().save(*args, **kwargs)
#         # Update permission name:
#         try:
#             objs = PermissionNamePerm.objects.filter(field_name_obj=self)
#             if objs.count() == 0:
#                 self.genPermName()
#             else:
#                 for obj in objs:
#                     obj.field_name = self.name
#                     obj.field_code = self.code
#                     obj.save()
#         except Exception as xx:
#             print("Exception: %s" % str(xx))
# def updateFieldNamePerm():
#     try:
#         cat_parent_obj = Category.objects.filter(code="LV").first()
#         if cat_parent_obj is None:
#             print('Not found Category obj code: LV')
#         else:
#             for lv_cat_obj in Category.objects.filter(parent=cat_parent_obj):
#                 check_obj = FieldNamePerm.objects.filter(area=lv_cat_obj).first()
#                 if check_obj is None:
#                     check_obj = FieldNamePerm()
#                     check_obj.area = lv_cat_obj
#                 check_obj.name = lv_cat_obj.name
#                 check_obj.code = lv_cat_obj.code
#                 try:
#                     check_obj.save()
#                 except Exception as rx:
#                     print(str(rx))
#         return True
#     except Exception as xx:
#         print("[updateFieldNamePerm] Exception: %s" % str(xx))
#         return False

# # Bảng danh mục Loại NV (MISSION_TYPE) --> Phân quyền
# class MissionTypeNamePerm(models.Model):
#     class Meta:
#         verbose_name = _("MissionType Name")
#         verbose_name_plural = _("(MissionTypeNamePerm) MissionType Name")

#     uuid = models.UUIDField(default=UUID4, max_length=64,
#                             editable=True, unique=True, primary_key=True)
#     code = models.CharField(max_length=500, editable=True, null=True, help_text=_('Mã Mission Type'))
#     title = models.CharField(max_length=500, editable=True, null=True, help_text=_('Tiêu đề MissionTypeNamePerm'))
#     name = models.CharField(max_length=500, editable=True, null=True, help_text=_('Tên Mission Type'))
#     desc = models.TextField(
#                                 max_length=5000,
#                                 editable=True,
#                                 null=True,
#                                 blank=True,
#                                 help_text=_('Mô tả')
#                             )
#     meta_data_logo = models.CharField(
#         max_length=500,
#         editable=True,
#         blank=True,
#         null=True,
#         help_text=_('Meta data của logo')
#     )
#     is_deleted = models.BooleanField(default=False, null=False, editable=True, help_text=_('Trạng thái xóa'))
#     mission_type = models.ForeignKey(ParentMissionType, to_field='uuid',
#                              related_name='%(class)s_created_by',
#                              on_delete=(models.SET_NULL),
#                              null=True,
#                              blank=True,
#                              help_text=_('Unit Object'))
#     created_by = models.ForeignKey(AUTH_USER_MODEL, to_field='username',
#                                    related_name='%(class)s_created_by',
#                                    on_delete=(models.SET_NULL),
#                                    null=True,
#                                    blank=True,
#                                    help_text=_('người tạo'))
#     updated_by = models.ForeignKey(AUTH_USER_MODEL, to_field='username',
#                                    related_name='%(class)s_updated_by',
#                                    on_delete=(models.SET_NULL),
#                                    null=True,
#                                    blank=True,
#                                    help_text=_('Người cập nhật.'))
#     updated_at = models.DateTimeField(default=djnow)
#     created_at = models.DateTimeField(default=djnow, editable=False)

#     def __str__(self):
#         return str(self.name)

#     def genPermName(self):
#         DEFAULT_PERMS = [
#             'create',
#             'detail',
#             'edit',
#             'delete',
#             'list',
#             # All
#             'create_all',
#             'detail_all',
#             'edit_all',
#             'delete_all',
#             'list_all',
#         ]
#         SPECIAL_MODELS = [

#         ]
#         try:
#             mission_type_name = self.name
#             mission_type_code = self.code
#             for prefix_perm in DEFAULT_PERMS:
#                 check_obj = PermissionNamePerm.objects.filter(mission_type_name=mission_type_name,
#                                                               perm_name=prefix_perm).first()
#                 if check_obj is None:
#                     check_obj = PermissionNamePerm()
#                 check_obj.mission_type_name = mission_type_name
#                 check_obj.mission_type_name_obj = self
#                 check_obj.mission_type_code = mission_type_code
#                 check_obj.perm_name = prefix_perm
#                 check_obj.perm_type = "mission_type"
#                 try:
#                     check_obj.save()
#                 except Exception as rx:
#                     print(str(rx))
#         except Exception as xx:
#             print(str(xx))
#             return False
#     def save(self, *args, **kwargs):
#         self.updated_at = djnow()
#         if self.title is None or self.title is "":
#             self.title = cap_space(str(self.name).replace(".", " ").replace("-", " ").replace("_", " ").replace("&", " "))
#         else:
#             self.title = cap_space(self.title).title()
#         # try:
#         #     from Common.views_tools import remove_accents
#         #     self.code = get_code(self.name)
#         #     self.code = remove_accents(self.code)
#         # except Exception as xx:
#         #     print(str(xx))
#         super().save(*args, **kwargs)
#         # Update permission name:
#         try:
#             objs = PermissionNamePerm.objects.filter(mission_type_name_obj=self)
#             if objs.count() == 0:
#                 self.genPermName()
#             else:
#                 for obj in objs:
#                     obj.mission_type_name = self.name
#                     obj.mission_type_code = self.code
#                     obj.save()
#         except Exception as xx:
#             print("Exception: %s" % str(xx))

# def updateMissionTypeNamePerm():
#     try:
#         for lv_cat_obj in ParentMissionType.objects.all():
#             check_obj = MissionTypeNamePerm.objects.filter(mission_type=lv_cat_obj).first()
#             if check_obj is None:
#                 check_obj = MissionTypeNamePerm()
#                 check_obj.mission_type = lv_cat_obj
#             check_obj.name = lv_cat_obj.name
#             check_obj.code = lv_cat_obj.code
#             try:
#                 check_obj.save()
#             except Exception as rx:
#                 print(str(rx))
#         return True
#     except Exception as xx:
#         print("[updateMissionTypeNamePerm] Exception: %s" % str(xx))
#         return False

# # Bảng danh mục Dang NV (MISSION_FORM) --> Phân quyền
# class MissionFormNamePerm(models.Model):
#     class Meta:
#         verbose_name = _("MissionForm Name")
#         verbose_name_plural = _("(MissionFormNamePerm) MissionForm Name")

#     uuid = models.UUIDField(default=UUID4, max_length=64,
#                             editable=True, unique=True, primary_key=True)
#     code = models.CharField(max_length=500, editable=True, null=True, help_text=_('Mã Mission Form'))
#     title = models.CharField(max_length=500, editable=True, null=True, help_text=_('Tiêu đề MissionFormNamePerm'))
#     name = models.CharField(max_length=500, editable=True, null=True, help_text=_('Tên Mission Form'))
#     desc = models.TextField(
#                                 max_length=5000,
#                                 editable=True,
#                                 null=True,
#                                 blank=True,
#                                 help_text=_('Mô tả')
#                             )
#     meta_data_logo = models.CharField(
#         max_length=500,
#         editable=True,
#         blank=True,
#         null=True,
#         help_text=_('Meta data của logo')
#     )
#     is_deleted = models.BooleanField(default=False, null=False, editable=True, help_text=_('Trạng thái xóa'))
#     mission_form = models.ForeignKey(ChildrentMissionType, to_field='uuid',
#                              related_name='%(class)s_created_by',
#                              on_delete=(models.SET_NULL),
#                              null=True,
#                              blank=True,
#                              help_text=_('Unit Object'))
#     created_by = models.ForeignKey(AUTH_USER_MODEL, to_field='username',
#                                    related_name='%(class)s_created_by',
#                                    on_delete=(models.SET_NULL),
#                                    null=True,
#                                    blank=True,
#                                    help_text=_('người tạo'))
#     updated_by = models.ForeignKey(AUTH_USER_MODEL, to_field='username',
#                                    related_name='%(class)s_updated_by',
#                                    on_delete=(models.SET_NULL),
#                                    null=True,
#                                    blank=True,
#                                    help_text=_('Người cập nhật.'))
#     updated_at = models.DateTimeField(default=djnow)
#     created_at = models.DateTimeField(default=djnow, editable=False)

#     def __str__(self):
#         return str(self.name)

#     def genPermName(self):
#         DEFAULT_PERMS = [
#             'create',
#             'detail',
#             'edit',
#             'delete',
#             'list',
#             # All
#             'create_all',
#             'detail_all',
#             'edit_all',
#             'delete_all',
#             'list_all',
#         ]
#         SPECIAL_MODELS = [

#         ]
#         try:
#             mission_form_name = self.name
#             mission_form_code = self.code
#             for prefix_perm in DEFAULT_PERMS:
#                 check_obj = PermissionNamePerm.objects.filter(mission_form_name=mission_form_name,
#                                                               perm_name=prefix_perm).first()
#                 if check_obj is None:
#                     check_obj = PermissionNamePerm()
#                 check_obj.mission_form_name = mission_form_name
#                 check_obj.mission_form_name_obj = self
#                 check_obj.mission_form_code = mission_form_code
#                 check_obj.perm_name = prefix_perm
#                 check_obj.perm_type = "mission_form"
#                 try:
#                     check_obj.save()
#                 except Exception as rx:
#                     print(str(rx))
#         except Exception as xx:
#             print(str(xx))
#             return False
#     def save(self, *args, **kwargs):
#         self.updated_at = djnow()
#         if self.title is None or self.title is "":
#             self.title = cap_space(str(self.name).replace(".", " ").replace("-", " ").replace("_", " ").replace("&", " "))
#         else:
#             self.title = cap_space(self.title).title()
#         # try:
#         #     from Common.views_tools import remove_accents
#         #     self.code = get_code(self.name)
#         #     self.code = remove_accents(self.code)
#         # except Exception as xx:
#         #     print(str(xx))
#         super().save(*args, **kwargs)
#         # Update permission name:
#         try:
#             objs = PermissionNamePerm.objects.filter(mission_form_name_obj=self)
#             if objs.count() == 0:
#                 self.genPermName()
#             else:
#                 for obj in objs:
#                     obj.mission_form_name = self.name
#                     obj.mission_form_code = self.code
#                     obj.save()
#         except Exception as xx:
#             print("Exception: %s" % str(xx))

# def updateMissionFormNamePerm():
#     try:
#         for lv_cat_obj in ChildrentMissionType.objects.all():
#             check_obj = MissionFormNamePerm.objects.filter(mission_form=lv_cat_obj).first()
#             if check_obj is None:
#                 check_obj = MissionFormNamePerm()
#                 check_obj.mission_form = lv_cat_obj
#             check_obj.name = lv_cat_obj.name
#             check_obj.code = lv_cat_obj.code
#             try:
#                 check_obj.save()
#             except Exception as rx:
#                 print(str(rx))
#         return True
#     except Exception as xx:
#         print("[updateMissionFormNamePerm] Exception: %s" % str(xx))
#         return False

# PERMTYPE_CHOICES = (
#     ("model", "Model"),
#     ("view", "View"),
#     ("menu", "Menu"),
#     ("unit", "Unit"),
#     ("area", "Area"),
#     ("field", "Field"),
# )
# # Permission Name
# class PermissionNamePerm(models.Model):
#     class Meta:
#         verbose_name = _("Permission Name")
#         verbose_name_plural = _("(PermissionNamePerm) Permission Name")

#     uuid = models.UUIDField(default=UUID4,
#                             max_length=64,
#                             editable=True,
#                             unique=True,
#                             primary_key=True)
#     code = models.CharField(max_length=500,
#                             editable=True,
#                             null=True,
#                             help_text=_('Mã Permission'))
#     title = models.CharField(max_length=500,
#                              editable=True,
#                              null=True,
#                              help_text=_('Tiêu đề PermissionNamePerm'))
#     name = models.CharField(max_length=500,
#                             editable=True,
#                             null=True,
#                             help_text=_('Tên Đầy đủ PermissionNamePerm'))
#     desc = models.TextField(
#                                 max_length=5000,
#                                 editable=True,
#                                 null=True,
#                                 blank=True,
#                                 help_text=_('Mô tả')
#                             )
#     app_name = models.CharField(max_length=500,
#                                 editable=True,
#                                 null=True,
#                                 help_text=_('Tên Apps'))

#     app_code = models.CharField(max_length=500,
#                                 editable=True,
#                                 null=True,
#                                 help_text=_('Mã Apps'))
#     view_name = models.CharField(max_length=500,
#                                   editable=True,
#                                   null=True,
#                                   help_text=_('Tên View'))
#     view_code = models.CharField(max_length=500,
#                                   editable=True,
#                                   null=True,
#                                   help_text=_('Mã View'))
#     view_name_obj = models.ForeignKey(ViewNamePerm, to_field='uuid',
#                                        related_name='%(class)s_view_name_obj',
#                                        on_delete=(models.CASCADE),
#                                        null=True,
#                                        blank=True,
#                                        help_text=_('ViewNamePerm'))
#     model_name = models.CharField(max_length=500,
#                                   editable=True,
#                                   null=True,
#                                   help_text=_('Tên Model'))
#     model_name_obj = models.ForeignKey(ModelNamePerm, to_field='uuid',
#                                        related_name='%(class)s_model_name_obj',
#                                        on_delete=(models.CASCADE),
#                                        null=True,
#                                        blank=True,
#                                        help_text=_('ModelNamePerm'))

#     menu_name = models.CharField(max_length=500,
#                                   editable=True,
#                                   null=True,
#                                   help_text=_('Tên Menu'))
#     menu_code = models.CharField(max_length=500,
#                                   editable=True,
#                                   null=True,
#                                   help_text=_('Mã Menu'))

#     menu_name_obj = models.ForeignKey(MenuNamePerm, to_field='uuid',
#                                        related_name='%(class)s_menu_name_obj',
#                                        on_delete=(models.CASCADE),
#                                        null=True,
#                                        blank=True,
#                                        help_text=_('MenuNamePerm'))

#     perm_name = models.CharField(max_length=500,
#                                  editable=True,
#                                  null=True,
#                                  help_text=_('Tên Quyền cụ thể'))

#     unit_name = models.CharField(max_length=500,
#                                  editable=True,
#                                  null=True,
#                                  help_text=_('Tên Unit'))
#     unit_code = models.CharField(max_length=500,
#                                  editable=True,
#                                  null=True,
#                                  help_text=_('Code Unit'))
#     unit_name_obj = models.ForeignKey(UnitNamePerm, to_field='uuid',
#                                        related_name='%(class)s_unit_name_obj',
#                                        on_delete=(models.CASCADE),
#                                        null=True,
#                                        blank=True,
#                                        help_text=_('UnitNamePerm'))

#     area_name = models.CharField(max_length=500,
#                                  editable=True,
#                                  null=True,
#                                  help_text=_('Tên Area'))

#     area_code = models.CharField(max_length=500,
#                                  editable=True,
#                                  null=True,
#                                  help_text=_('Code Area'))
#     area_name_obj = models.ForeignKey(AreaNamePerm, to_field='uuid',
#                                        related_name='%(class)s_area_name_obj',
#                                        on_delete=(models.CASCADE),
#                                        null=True,
#                                        blank=True,
#                                        help_text=_('AreaNamePerm'))
#     field_name = models.CharField(max_length=500,
#                                   editable=True,
#                                   null=True,
#                                   blank=True,
#                                   help_text=_('Tên Field'))
#     field_code = models.CharField(max_length=500,
#                                   editable=True,
#                                   null=True,
#                                   blank=True,
#                                   help_text=_('Mã Field'))
#     field_name_obj = models.ForeignKey(FieldNamePerm, to_field='uuid',
#                                        related_name='%(class)s_field_name_obj',
#                                        on_delete=(models.CASCADE),
#                                        null=True,
#                                        blank=True,
#                                        help_text=_('FieldNamePerm'))

#     mission_type_name = models.CharField(max_length=500,
#                                   editable=True,
#                                   null=True,
#                                   blank=True,
#                                   help_text=_('Tên MissionType'))
#     mission_type_code = models.CharField(max_length=500,
#                                   editable=True,
#                                   null=True,
#                                   blank=True,
#                                   help_text=_('Mã MissionType'))
#     mission_type_name_obj = models.ForeignKey(MissionTypeNamePerm, to_field='uuid',
#                                        related_name='%(class)s_mission_type_name_obj',
#                                        on_delete=(models.CASCADE),
#                                        null=True,
#                                        blank=True,
#                                        help_text=_('MissionTypeNamePerm'))

#     mission_form_name = models.CharField(max_length=500,
#                                   editable=True,
#                                   null=True,
#                                   blank=True,
#                                   help_text=_('Tên MissionForm'))
#     mission_form_code = models.CharField(max_length=500,
#                                   editable=True,
#                                   null=True,
#                                   blank=True,
#                                   help_text=_('Mã MissionForm'))
#     mission_form_name_obj = models.ForeignKey(MissionFormNamePerm, to_field='uuid',
#                                        related_name='%(class)s_mission_form_name_obj',
#                                        on_delete=(models.CASCADE),
#                                        null=True,
#                                        blank=True,
#                                        help_text=_('MissionFormNamePerm'))
#     perm_type = models.CharField(max_length=500,
#                                  editable=True,
#                                  null=True,
#                                  choices=PERMTYPE_CHOICES,
#                                  help_text=_('Loại quyền (Dữ liệu; View/ApiView; Menu'))

#     related_perms = models.ManyToManyField(
#         "self",
#         related_name='%(class)s_related_perms',
#         blank=True,
#         help_text=_('Các quyền liên quan (cần enable để sử dụng)'))

#     meta_data_logo = models.CharField(
#         max_length=500,
#         editable=True,
#         blank=True,
#         null=True,
#         help_text=_('Meta data của logo')
#     )
#     is_default = models.BooleanField(default=True, null=False, editable=True,
#                                      help_text=_('Trạng thái mặc định cho User mới tạo'))

#     is_deleted = models.BooleanField(default=False,
#                                      null=False,
#                                      editable=True,
#                                      help_text=_('Trạng thái xóa'))

#     created_by = models.ForeignKey(AUTH_USER_MODEL, to_field='username',
#                                    related_name='%(class)s_created_by',
#                                    on_delete=(models.SET_NULL),
#                                    null=True,
#                                    blank=True,
#                                    help_text=_('người tạo'))
#     updated_by = models.ForeignKey(AUTH_USER_MODEL, to_field='username',
#                                    related_name='%(class)s_updated_by',
#                                    on_delete=(models.SET_NULL),
#                                    null=True,
#                                    blank=True,
#                                    help_text=_('Người cập nhật.'))
#     updated_at = models.DateTimeField(default=djnow)
#     created_at = models.DateTimeField(default=djnow, editable=False)

#     def __str__(self):
#         return str(self.name)

#     def addToDefault(self):
#         DEFAULT_GROUPS = [
#             '[Entire] All Permissions Group (Full)',
#         ]
#         # Thêm vào nhóm quyền tất cả
#         for gr in GroupNamePerm.objects.filter(name__in=DEFAULT_GROUPS):
#             try:
#                 if self not in gr.permissions.all():
#                     gr.permissions.add(self)
#                     print('[addToDefault] Added to group: %s' % str(gr.name))
#             except Exception as xx:
#                 print(str(xx))
#         MODEL_GROUPS = [
#             '[Model] All Permissions Group (Full)',
#         ]
#         if self.perm_type == "model":
#             for gr in GroupNamePerm.objects.filter(name__in=MODEL_GROUPS):
#                 try:
#                     if self not in gr.permissions.all():
#                         gr.permissions.add(self)
#                         print('[addToDefault] Added to group: %s' % str(gr.name))

#                 except Exception as xx:
#                     print(str(xx))
#             group_name = str("[Model] %s (Full)" % (self.app_name))
#             perm_group_obj = GroupNamePerm.objects.filter(name=group_name).first()
#             if perm_group_obj is not None:
#                 if self not in perm_group_obj.permissions.all():
#                     perm_group_obj.permissions.add(self)
#                     print('[addToDefault] Added to group: %s' % str(perm_group_obj.name))

#         MENU_GROUPS = [
#             '[AllMenus] Permission Group',
#         ]
#         if self.perm_type == "menu":
#             for gr in GroupNamePerm.objects.filter(name__in=MENU_GROUPS):
#                 try:
#                     if self not in gr.permissions.all():
#                         gr.permissions.add(self)
#                         print('[addToDefault] Added to group: %s' % str(gr.name))

#                 except Exception as xx:
#                     print(str(xx))
#             # Add to parent Menu Group:
#             # Get parent Menu group name:
#             menu_name_obj = self.menu_name_obj
#             pr_menu_obj = Menu.objects.filter(parent_uuid=menu_name_obj.parent_uuid).first()
#             if pr_menu_obj is not None:
#                 group_name = str("[Menu] %s-PermissionGroup" % (pr_menu_obj.name))
#                 pr_menu_group = GroupNamePerm.objects.filter(name=group_name).first()
#                 if pr_menu_group is not None:
#                     if self not in pr_menu_group.permissions.all():
#                         pr_menu_group.permissions.add(self)
#                         print('[addToDefault] Added to group: %s' % str(group_name))

#         # VIEW GROUPS
#         VIEW_GROUPS = [
#             '[AllView] All Views Permission Group',
#         ]
#         if self.perm_type == "view":
#             for gr in GroupNamePerm.objects.filter(name__in=VIEW_GROUPS):
#                 try:
#                     if self not in gr.permissions.all():
#                         gr.permissions.add(self)
#                         print('[addToDefault] Added to group: %s' % str(gr.name))
#                 except Exception as xx:
#                     print(str(xx))
#             group_name = str("[Model] %s (Full)" % (self.app_name))
#             perm_group_obj = GroupNamePerm.objects.filter(name=group_name).first()
#             if perm_group_obj is not None:
#                 if self not in perm_group_obj.permissions.all():
#                     perm_group_obj.permissions.add(self)
#                     print('[addToDefault] Added to group: %s' % str(perm_group_obj.name))

#         ##### UNIT GROUPS
#         UNIT_GROUPS = [
#             '[AllUnit] All Unit Permission Group',
#         ]
#         for gr in GroupNamePerm.objects.filter(name__in=UNIT_GROUPS):
#             try:
#                 if self not in gr.permissions.all():
#                     gr.permissions.add(self)
#                     print('[addToDefault] Added to group: %s' % str(gr.name))
#             except Exception as xx:
#                 print(str(xx))

#         if self.unit_name:
#             unit_name = self.unit_name
#             unit_code = self.unit_code

#             group_name = str("[Unit] %s-PermissionGroup" % (unit_name))
#             perm_group_obj = GroupNamePerm.objects.filter(name=group_name).first()
#             if perm_group_obj is None:
#                 perm_group_obj = GroupNamePerm()
#                 perm_group_obj.name = group_name
#                 perm_group_obj.unit_name = unit_name
#                 perm_group_obj.unit_code = unit_code
#                 perm_group_obj.save()
#             if self not in perm_group_obj.permissions.all():
#                 perm_group_obj.permissions.add(self)
#                 print('[addToDefault] Added to group: %s' % str(perm_group_obj.name))

#         ##### FIELD GROUPS
#         FIELD_GROUPS = [
#             '[AllField] All Field Permission Group',
#         ]
#         for gr in GroupNamePerm.objects.filter(name__in=FIELD_GROUPS):
#             try:
#                 if self not in gr.permissions.all():
#                     gr.permissions.add(self)
#                     print('[addToDefault] Added to group: %s' % str(gr.name))
#             except Exception as xx:
#                 print(str(xx))
#         if self.field_name:
#             field_name = self.field_name
#             field_code = self.field_code

#             group_name = str("[Field] %s-PermissionGroup" % (field_name))
#             perm_group_obj = GroupNamePerm.objects.filter(name=group_name).first()
#             if perm_group_obj is None:
#                 perm_group_obj = GroupNamePerm()
#                 perm_group_obj.name = group_name
#                 perm_group_obj.field_name = field_name
#                 perm_group_obj.field_code = field_code
#                 perm_group_obj.save()
#             if self not in perm_group_obj.permissions.all():
#                 perm_group_obj.permissions.add(self)
#                 print('[addToDefault] Added to group: %s' % str(perm_group_obj.name))

#         ##### AREA GROUPS
#         AREA_GROUPS = [
#             '[AllArea] All Area Permission Group',
#         ]
#         for gr in GroupNamePerm.objects.filter(name__in=AREA_GROUPS):
#             try:
#                 if self not in gr.permissions.all():
#                     gr.permissions.add(self)
#                     print('[addToDefault] Added to group: %s' % str(gr.name))
#             except Exception as xx:
#                 print(str(xx))

#         if self.area_name:
#             area_name = self.area_name
#             area_code = self.area_code

#             group_name = str("[Area] %s-PermissionGroup" % (area_name))
#             perm_group_obj = GroupNamePerm.objects.filter(name=group_name).first()
#             if perm_group_obj is None:
#                 perm_group_obj = GroupNamePerm()
#                 perm_group_obj.name = group_name
#                 perm_group_obj.area_name = area_name
#                 perm_group_obj.area_code = area_code
#                 perm_group_obj.save()
#             if self not in perm_group_obj.permissions.all():
#                 perm_group_obj.permissions.add(self)
#                 print('[addToDefault] Added to group: %s' % str(perm_group_obj.name))

#         ##### MISSION_TYPE GROUPS
#         MISSION_TYPE_GROUPS = [
#             '[AllMissionType] All Mission Type Permission Group',
#         ]

#         for gr in GroupNamePerm.objects.filter(name__in=MISSION_TYPE_GROUPS):
#             try:
#                 if self not in gr.permissions.all():
#                     gr.permissions.add(self)
#                     print('[addToDefault] Added to group: %s' % str(gr.name))
#             except Exception as xx:
#                 print(str(xx))


#         if self.mission_type_name:
#             mission_type_name = self.mission_type_name
#             mission_type_code = self.mission_type_code

#             group_name = str("[MissionType] %s-PermissionGroup" % (mission_type_name))
#             perm_group_obj = GroupNamePerm.objects.filter(name=group_name).first()
#             if perm_group_obj is None:
#                 perm_group_obj = GroupNamePerm()
#                 perm_group_obj.name = group_name
#                 perm_group_obj.mission_type_name = mission_type_name
#                 perm_group_obj.mission_type_code = mission_type_code
#                 perm_group_obj.save()
#             if self not in perm_group_obj.permissions.all():
#                 perm_group_obj.permissions.add(self)
#                 print('[addToDefault] Added to group: %s' % str(perm_group_obj.name))

#         ##### MISSION_FORM GROUPS
#         MISSION_FORM_GROUPS = [
#             '[AllMissionForm] All Mission Form Permission Group'
#         ]

#         for gr in GroupNamePerm.objects.filter(name__in=MISSION_FORM_GROUPS):
#             try:
#                 if self not in gr.permissions.all():
#                     gr.permissions.add(self)
#                     print('[addToDefault] Added to group: %s' % str(gr.name))
#             except Exception as xx:
#                 print(str(xx))

#         if self.mission_form_name:
#             mission_form_name = self.mission_form_name
#             mission_form_code = self.mission_form_code

#             group_name = str("[MissionForm] %s-PermissionGroup" % (mission_form_name))
#             perm_group_obj = GroupNamePerm.objects.filter(name=group_name).first()
#             if perm_group_obj is None:
#                 perm_group_obj = GroupNamePerm()
#                 perm_group_obj.name = group_name
#                 perm_group_obj.mission_form_name = mission_form_name
#                 perm_group_obj.mission_form_code = mission_form_code
#                 perm_group_obj.save()

#             if self not in perm_group_obj.permissions.all():
#                 perm_group_obj.permissions.add(self)
#                 print('[addToDefault] Added to group: %s' % str(perm_group_obj.name))

#         #
#         return True
#     def save(self, *args, **kwargs):
#         self.updated_at = djnow()
#         if self.perm_type is None:
#             self.perm_type == 'model'
#         try:
#             if self.perm_type == 'view':
#                 perm_string = self.view_name
#             elif self.perm_type == "model":
#                 perm_string = self.model_name
#             elif self.perm_type == 'menu':
#                 perm_string = self.menu_name
#             elif self.perm_type == 'unit':
#                 perm_string = "unit"
#             elif self.perm_type == 'area':
#                 perm_string = "area"
#             elif self.perm_type == 'field':
#                 perm_string = "field"
#             elif self.perm_type == 'mission_type':
#                 perm_string = "mission_type"
#             elif self.perm_type == 'mission_form':
#                 perm_string = "mission_form"
#             else:
#                 perm_string = ""
#             unit_code_string = ""
#             if self.unit_code is not None:
#                 unit_code_string = str(self.unit_code).lower()
#             area_code_string = ""
#             if self.area_code is not None:
#                 area_code_string = str(self.area_code).lower()
#             self.name = str("%s.%s.%s......%s.%s.%s" % (str(self.app_name).lower(),
#                                                 str(self.perm_type).lower(),
#                                                 str(perm_string).lower(),
#                                                 unit_code_string,
#                                                 area_code_string,
#                                                 str(self.perm_name).lower()))
#         except Exception as xx:
#             print(str(xx))
#         if self.title is None or self.title is "":
#             self.title = cap_space(str(self.name).replace(".", " ").replace("-", " ").replace("_", " ").replace("&", " "))
#         else:
#             self.title = cap_space(self.title).title()
#         super().save(*args, **kwargs)
#         # Add to default groups
#         self.addToDefault()

# def clearPermissionNamePerm():
#     try:
#         PermissionNamePerm.objects.all().delete()
#     except Exception as xx:
#         print(str(xx))

# def updateDataPermissionNamePerm():
#     DEFAULT_PERMS = [
#         'create',
#         'detail',
#         'edit',
#         'delete',
#         'list',
#         # All
#         'create_all',
#         'detail_all',
#         'edit_all',
#         'delete_all',
#         'list_all',
#     ]
#     SPECIAL_MODELS = [

#     ]
#     try:
#         for model_obj in ModelNamePerm.objects.all():
#             app_name = model_obj.app_name
#             model_name = model_obj.model_name
#             if model_name not in SPECIAL_MODELS:
#                 for prefix_perm in DEFAULT_PERMS:
#                     check_obj = PermissionNamePerm.objects.filter(app_name=app_name,
#                                                                   model_name=model_name,
#                                                                   perm_name=prefix_perm).first()
#                     if check_obj is None:
#                         check_obj = PermissionNamePerm()
#                         check_obj.app_name = app_name
#                         check_obj.model_name = model_name
#                         check_obj.perm_name = prefix_perm
#                         check_obj.perm_type = "model"
#                     try:
#                         check_obj.save()
#                     except Exception as rx:
#                         print(str(rx))
#         return True
#     except Exception as xx:
#         print(str(xx))
#         return False

# def updateViewPermissionNamePerm():
#     DEFAULT_PERMS = [
#         'allow',
#     ]
#     SPECIAL_MODELS = [

#     ]
#     try:
#         for model_obj in ViewNamePerm.objects.all():
#             app_name = model_obj.app_name
#             view_name = model_obj.view_name
#             if app_name not in SPECIAL_MODELS:
#                 for prefix_perm in DEFAULT_PERMS:
#                     check_obj = PermissionNamePerm.objects.filter(app_name=app_name,
#                                                                   view_name=view_name,
#                                                                   perm_name=prefix_perm).first()
#                     if check_obj is None:
#                         check_obj = PermissionNamePerm()
#                         check_obj.app_name = app_name
#                         check_obj.view_name = view_name
#                         check_obj.perm_name = prefix_perm
#                         check_obj.perm_type = "view"
#                     try:
#                         check_obj.save()
#                     except Exception as rx:
#                         print(str(rx))
#         return True
#     except Exception as xx:
#         print(str(xx))
#         return False

# def updateMenuPermissionNamePerm():
#     DEFAULT_PERMS = [
#         'allow',
#     ]
#     SPECIAL_MODELS = [

#     ]
#     # Clear:
#     for obj in PermissionNamePerm.objects.filter(Q(perm_type="menu") | ~Q(menu_name=None)):
#         obj.delete()
#     try:
#         for menu_obj in MenuNamePerm.objects.all():
#             menu_name = menu_obj.name
#             menu_code = menu_obj.code
#             if menu_name not in SPECIAL_MODELS:
#                 for prefix_perm in DEFAULT_PERMS:
#                     check_obj = PermissionNamePerm.objects.filter(menu_name=menu_name,
#                                                                   menu_code=menu_code,
#                                                                   perm_type="menu").first()
#                     if check_obj is None:
#                         check_obj = PermissionNamePerm()
#                         check_obj.menu_name = menu_name
#                         check_obj.menu_code = menu_code
#                         check_obj.perm_name = prefix_perm
#                         check_obj.perm_type = "menu"
#                     try:
#                         check_obj.save()
#                     except Exception as rx:
#                         print(str(rx))
#         return True
#     except Exception as xx:
#         print(str(xx))
#         return False

# def clearUnit_PermissionNamePerm(unit_name=None,
#                                  unit_code=None):
#     try:
#         if unit_name is None and unit_code is None:
#             PermissionNamePerm.objects.filter(~Q(unit_name=None)).delete()
#         else:
#             if unit_code is not None:
#                 PermissionNamePerm.objects.filter(Q(unit_code=unit_code)).delete()
#             else:
#                 PermissionNamePerm.objects.filter(Q(unit_name=unit_name)).delete()
#     except Exception as xx:
#         print(str(xx))

# def updateUnit_PermissionNamePerm():
#     DEFAULT_PERMS = [
#         'create',
#         'detail',
#         'edit',
#         'delete',
#         'list',
#         # All
#         'create_all',
#         'detail_all',
#         'edit_all',
#         'delete_all',
#         'list_all',
#     ]
#     SPECIAL_MODELS = [

#     ]
#     clearUnit_PermissionNamePerm()
#     try:
#         for unit_name_obj in UnitNamePerm.objects.all():
#             unit_name = unit_name_obj.name
#             unit_code = str(unit_name_obj.code).lower()
#             for prefix_perm in DEFAULT_PERMS:
#                 check_obj = PermissionNamePerm.objects.filter(unit_name=unit_name,
#                                                               perm_name=prefix_perm).first()
#                 if check_obj is None:
#                     check_obj = PermissionNamePerm()
#                     check_obj.unit_name = unit_name
#                     check_obj.unit_code = unit_code
#                     check_obj.perm_name = prefix_perm
#                 check_obj.perm_type = "unit"
#                 try:
#                     check_obj.save()
#                 except Exception as rx:
#                     print(str(rx))
#         return True
#     except Exception as xx:
#         print(str(xx))
#         return False

# def clearArea_PermissionNamePerm():
#     try:
#         PermissionNamePerm.objects.filter(~Q(area_name=None)).delete()
#     except Exception as xx:
#         print(str(xx))

# def updateArea_PermissionNamePerm():
#     clearArea_PermissionNamePerm()
#     DEFAULT_PERMS = [
#         'create',
#         'detail',
#         'edit',
#         'delete',
#         'list',
#         # All
#         'create_all',
#         'detail_all',
#         'edit_all',
#         'delete_all',
#         'list_all',
#     ]
#     SPECIAL_MODELS = [

#     ]
#     try:
#         for area_name_obj in AreaNamePerm.objects.all():
#             area_name = area_name_obj.name
#             area_code = str(area_name_obj.code).lower()
#             for prefix_perm in DEFAULT_PERMS:
#                 check_obj = PermissionNamePerm.objects.filter(area_name=area_name,
#                                                               perm_name=prefix_perm).first()
#                 if check_obj is None:
#                     check_obj = PermissionNamePerm()
#                     check_obj.area_name = area_name
#                     check_obj.area_code = area_code
#                     check_obj.perm_name = prefix_perm
#                     check_obj.perm_type = "area"
#                 try:
#                     check_obj.save()
#                 except Exception as rx:
#                     print(str(rx))
#         return True
#     except Exception as xx:
#         print(str(xx))
#         return False

# def clearField_PermissionNamePerm():
#     try:
#         PermissionNamePerm.objects.filter(~Q(field_name=None)).delete()
#     except Exception as xx:
#         print(str(xx))

# def updateField_PermissionNamePerm():
#     clearField_PermissionNamePerm()
#     DEFAULT_PERMS = [
#         'create',
#         'detail',
#         'edit',
#         'delete',
#         'list',
#         # All
#         'create_all',
#         'detail_all',
#         'edit_all',
#         'delete_all',
#         'list_all',
#     ]
#     SPECIAL_MODELS = [

#     ]
#     try:
#         for field_name_obj in FieldNamePerm.objects.all():
#             field_name = field_name_obj.name
#             field_code = str(field_name_obj.code).lower()
#             for prefix_perm in DEFAULT_PERMS:
#                 check_obj = PermissionNamePerm.objects.filter(field_name=field_name,
#                                                               perm_name=prefix_perm).first()
#                 if check_obj is None:
#                     check_obj = PermissionNamePerm()
#                     check_obj.field_name = field_name
#                     check_obj.field_code = field_code
#                     check_obj.perm_name = prefix_perm
#                     check_obj.perm_type = "field"
#                 try:
#                     check_obj.save()
#                 except Exception as rx:
#                     print(str(rx))
#         return True
#     except Exception as xx:
#         print(str(xx))
#         return False


# def clearMissionType_PermissionNamePerm():
#     try:
#         PermissionNamePerm.objects.filter(~Q(mission_type_name=None)).delete()
#     except Exception as xx:
#         print(str(xx))

# def updateMissionType_PermissionNamePerm():
#     clearMissionType_PermissionNamePerm()
#     DEFAULT_PERMS = [
#         'create',
#         'detail',
#         'edit',
#         'delete',
#         'list',
#         # All
#         'create_all',
#         'detail_all',
#         'edit_all',
#         'delete_all',
#         'list_all',
#     ]
#     SPECIAL_MODELS = [

#     ]
#     try:
#         for mission_type_name_obj in MissionTypeNamePerm.objects.all():
#             mission_type_name = mission_type_name_obj.name
#             mission_type_code = str(mission_type_name_obj.code).lower()
#             for prefix_perm in DEFAULT_PERMS:
#                 check_obj = PermissionNamePerm.objects.filter(mission_type_name=mission_type_name,
#                                                               perm_name=prefix_perm).first()
#                 if check_obj is None:
#                     check_obj = PermissionNamePerm()
#                     check_obj.mission_type_name = mission_type_name
#                     check_obj.mission_type_code = mission_type_code
#                     check_obj.perm_name = prefix_perm
#                     check_obj.perm_type = "mission_type"
#                 try:
#                     check_obj.save()
#                 except Exception as rx:
#                     print(str(rx))
#         return True
#     except Exception as xx:
#         print(str(xx))
#         return False

# def clearMissionForm_PermissionNamePerm():
#     try:
#         PermissionNamePerm.objects.filter(~Q(mission_type_name=None)).delete()
#     except Exception as xx:
#         print(str(xx))

# def updateMissionForm_PermissionNamePerm():
#     clearMissionForm_PermissionNamePerm()
#     DEFAULT_PERMS = [
#         'create',
#         'detail',
#         'edit',
#         'delete',
#         'list',
#         # All
#         'create_all',
#         'detail_all',
#         'edit_all',
#         'delete_all',
#         'list_all',
#     ]
#     SPECIAL_MODELS = [

#     ]
#     try:
#         for mission_form_name_obj in MissionFormNamePerm.objects.all():
#             mission_form_name = mission_form_name_obj.name
#             mission_form_code = str(mission_form_name_obj.code).lower()
#             for prefix_perm in DEFAULT_PERMS:
#                 check_obj = PermissionNamePerm.objects.filter(mission_form_name=mission_form_name,
#                                                               perm_name=prefix_perm).first()
#                 if check_obj is None:
#                     check_obj = PermissionNamePerm()
#                     check_obj.mission_form_name = mission_form_name
#                     check_obj.mission_form_code = mission_form_code
#                     check_obj.perm_name = prefix_perm
#                     check_obj.perm_type = "mission_form"
#                 try:
#                     check_obj.save()
#                 except Exception as rx:
#                     print(str(rx))
#         return True
#     except Exception as xx:
#         print(str(xx))
#         return False

# ### Permission Group
# class GroupNamePerm(models.Model):
#     class Meta:
#         verbose_name = _("Permission Group")
#         verbose_name_plural = _("(GroupNamePerm) Permission Group")

#     uuid = models.UUIDField(default=UUID4, max_length=64,
#                             editable=True, unique=True, primary_key=True)
#     code = models.CharField(max_length=500, editable=True, null=True, blank=True, help_text=_('Mã Nhóm Quyền'))
#     title = models.CharField(max_length=500, editable=True, null=True, help_text=_('Tiêu đề Nhóm quyền'))
#     name = models.CharField(max_length=500, editable=True, null=True, help_text=_('Tên Nhóm Quyền'))
#     desc = models.TextField(
#                                 max_length=5000,
#                                 editable=True,
#                                 null=True,
#                                 blank=True,
#                                 help_text=_('Mô tả')
#                             )
#     is_deleted = models.BooleanField(default=False, null=False, editable=True, help_text=_('Trạng thái xóa'))
#     permissions = models.ManyToManyField(PermissionNamePerm,
#                                          related_name='%(class)s_permissions',
#                                          blank=True,
#                                          help_text=_('Các quyền thuộc nhóm'))
#     app_name = models.CharField(max_length=500,
#                                 editable=True,
#                                 null=True,
#                                 blank=True,
#                                 help_text=_('Tên Apps'))
#     view_name = models.CharField(max_length=500,
#                                   editable=True,
#                                   null=True,
#                                  blank=True,
#                                  help_text=_('Tên View'))
#     model_name = models.CharField(max_length=500,
#                                   editable=True,
#                                   null=True,
#                                   blank=True,
#                                   help_text=_('Tên Model'))
#     menu_name = models.CharField(max_length=500,
#                                   editable=True,
#                                   null=True,
#                                  blank=True,
#                                  help_text=_('Tên Menu'))
#     menu_code = models.CharField(max_length=500,
#                                   editable=True,
#                                   null=True,
#                                  blank=True,
#                                  help_text=_('Mã Menu'))
#     perm_name = models.CharField(max_length=500,
#                                  editable=True,
#                                  null=True,
#                                  blank=True,
#                                  help_text=_('Tên Quyền cụ thể'))

#     unit_name = models.CharField(max_length=500,
#                                  editable=True,
#                                  null=True,
#                                  blank=True,
#                                  help_text=_('Tên Unit'))
#     area_name = models.CharField(max_length=500,
#                                  editable=True,
#                                  null=True,
#                                  blank=True,
#                                  help_text=_('Tên Area'))
#     unit_code = models.CharField(max_length=500,
#                                  editable=True,
#                                  null=True,
#                                  blank=True,
#                                  help_text=_('Code Unit'))
#     area_code = models.CharField(max_length=500,
#                                  editable=True,
#                                  null=True,
#                                  blank=True,
#                                  help_text=_('Code Area'))
#     field_name = models.CharField(max_length=500,
#                                   editable=True,
#                                   null=True,
#                                   blank=True,
#                                   help_text=_('Tên Field'))
#     field_code = models.CharField(max_length=500,
#                                   editable=True,
#                                   null=True,
#                                   blank=True,
#                                   help_text=_('Mã Field'))
#     mission_type_name = models.CharField(max_length=500,
#                                   editable=True,
#                                   null=True,
#                                   blank=True,
#                                   help_text=_('Tên MissionType'))
#     mission_type_code = models.CharField(max_length=500,
#                                   editable=True,
#                                   null=True,
#                                   blank=True,
#                                   help_text=_('Mã MissionType'))
#     mission_form_name = models.CharField(max_length=500,
#                                   editable=True,
#                                   null=True,
#                                   blank=True,
#                                   help_text=_('Tên MissionForm'))
#     mission_form_code = models.CharField(max_length=500,
#                                   editable=True,
#                                   null=True,
#                                   blank=True,
#                                   help_text=_('Mã MissionForm'))
#     created_by = models.ForeignKey(AUTH_USER_MODEL, to_field='username',
#                                    related_name='%(class)s_created_by',
#                                    on_delete=(models.SET_NULL),
#                                    null=True,
#                                    blank=True,
#                                    help_text=_('người tạo'))
#     updated_by = models.ForeignKey(AUTH_USER_MODEL, to_field='username',
#                                    related_name='%(class)s_updated_by',
#                                    on_delete=(models.SET_NULL),
#                                    null=True,
#                                    blank=True,
#                                    help_text=_('Người cập nhật.'))
#     updated_at = models.DateTimeField(default=djnow)
#     created_at = models.DateTimeField(default=djnow, editable=False)

#     def __str__(self):
#         return str(self.name)

#     def save(self, *args, **kwargs):
#         self.updated_at = djnow()
#         if self.title is None or self.title is "":
#             self.title = cap_space(str(self.name).replace(".", " ").replace("-", " ").replace("_", " ").replace("&", " "))
#         super().save(*args, **kwargs)
#         try:
#             ug_obj = GroupNameUser.objects.filter(perm_group=self).first()
#             if ug_obj is None:
#                 ug_obj = GroupNameUser()
#                 ug_obj.name = str("%s-Users" % self.name)
#                 ug_obj.perm_group = self
#                 ug_obj.save()
#         except Exception as xx:
#             print('Can not create Usergroup... Exception: %s' % str(xx))

# ### User Group
# class GroupNameUser(models.Model):
#     class Meta:
#         verbose_name = _("User Group")
#         verbose_name_plural = _("(GroupNameUser) User Group")

#     uuid = models.UUIDField(default=UUID4, max_length=64,
#                             editable=True, unique=True, primary_key=True)
#     code = models.CharField(max_length=500,
#                             editable=True,
#                             null=True,
#                             blank=True,
#                             help_text=_('Mã Nhóm Người Dùng'))
#     title = models.CharField(max_length=500,
#                              editable=True,
#                              null=True,
#                              blank=True,
#                              help_text=_('Tiêu đề Nhóm Người Dùng'))
#     name = models.CharField(max_length=500, editable=True, null=True, help_text=_('Tên Nhóm Người Dùng'))
#     desc = models.TextField(
#                                 max_length=5000,
#                                 editable=True,
#                                 null=True,
#                                 blank=True,
#                                 help_text=_('Mô tả')
#                             )
#     is_deleted = models.BooleanField(default=False, null=False, editable=True, help_text=_('Trạng thái xóa'))
#     perm_group = models.OneToOneField(GroupNamePerm, to_field='uuid',
#                                    related_name='%(class)s_perm_group',
#                                    on_delete=(models.CASCADE),
#                                    null=True,
#                                    blank=True,
#                                    help_text=_('Nhóm Quyền Tương Ứng'))
#     other_perm_groups = models.ManyToManyField(GroupNamePerm,
#                                          related_name='%(class)s_other_perm_groups',
#                                          blank=True,
#                                          help_text=_('Các Nhóm Quyền Khác'))
#     users = models.ManyToManyField(User,
#                                          related_name='%(class)s_users',
#                                          blank=True,
#                                          help_text=_('Các người dùng thuộc nhóm'))
#     app_name = models.CharField(max_length=500,
#                                 editable=True,
#                                 null=True,
#                                 blank=True,
#                                 help_text=_('Tên Apps'))
#     view_name = models.CharField(max_length=500,
#                                   editable=True,
#                                   null=True,
#                                  blank=True,
#                                  help_text=_('Tên View'))
#     model_name = models.CharField(max_length=500,
#                                   editable=True,
#                                   null=True,
#                                   blank=True,
#                                   help_text=_('Tên Model'))
#     menu_name = models.CharField(max_length=500,
#                                   editable=True,
#                                   null=True,
#                                  blank=True,
#                                  help_text=_('Tên Menu'))
#     menu_code = models.CharField(max_length=500,
#                                   editable=True,
#                                   null=True,
#                                  blank=True,
#                                  help_text=_('Mã Menu'))
#     perm_name = models.CharField(max_length=500,
#                                  editable=True,
#                                  null=True,
#                                  blank=True,
#                                  help_text=_('Tên Quyền cụ thể'))

#     unit_name = models.CharField(max_length=500,
#                                  editable=True,
#                                  null=True,
#                                  blank=True,
#                                  help_text=_('Tên Unit'))
#     area_name = models.CharField(max_length=500,
#                                  editable=True,
#                                  null=True,
#                                  blank=True,
#                                  help_text=_('Tên Area'))
#     unit_code = models.CharField(max_length=500,
#                                  editable=True,
#                                  null=True,
#                                  blank=True,
#                                  help_text=_('Code Unit'))
#     area_code = models.CharField(max_length=500,
#                                  editable=True,
#                                  null=True,
#                                  blank=True,
#                                  help_text=_('Code Area'))
#     field_name = models.CharField(max_length=500,
#                                   editable=True,
#                                   null=True,
#                                   blank=True,
#                                   help_text=_('Tên Field'))
#     field_code = models.CharField(max_length=500,
#                                   editable=True,
#                                   null=True,
#                                   blank=True,
#                                   help_text=_('Mã Field'))
#     mission_type_name = models.CharField(max_length=500,
#                                   editable=True,
#                                   null=True,
#                                   blank=True,
#                                   help_text=_('Tên MissionType'))
#     mission_type_code = models.CharField(max_length=500,
#                                   editable=True,
#                                   null=True,
#                                   blank=True,
#                                   help_text=_('Mã MissionType'))
#     mission_form_name = models.CharField(max_length=500,
#                                   editable=True,
#                                   null=True,
#                                   blank=True,
#                                   help_text=_('Tên MissionForm'))
#     mission_form_code = models.CharField(max_length=500,
#                                   editable=True,
#                                   null=True,
#                                   blank=True,
#                                   help_text=_('Mã MissionForm'))
#     created_by = models.ForeignKey(AUTH_USER_MODEL, to_field='username',
#                                    related_name='%(class)s_created_by',
#                                    on_delete=(models.SET_NULL),
#                                    null=True,
#                                    blank=True,
#                                    help_text=_('người tạo'))
#     updated_by = models.ForeignKey(AUTH_USER_MODEL, to_field='username',
#                                    related_name='%(class)s_updated_by',
#                                    on_delete=(models.SET_NULL),
#                                    null=True,
#                                    blank=True,
#                                    help_text=_('Người cập nhật.'))
#     updated_at = models.DateTimeField(default=djnow)
#     created_at = models.DateTimeField(default=djnow, editable=False)

#     def __str__(self):
#         return str(self.name)

#     def save(self, *args, **kwargs):
#         self.updated_at = djnow()
#         try:
#             if self.perm_group is not None:
#                 self.app_name = self.perm_group.app_name
#                 self.model_name = self.perm_group.model_name
#                 self.view_name = self.perm_group.view_name
#                 self.menu_name = self.perm_group.menu_name
#                 self.unit_name = self.perm_group.unit_name
#                 self.unit_code = self.perm_group.unit_code
#                 self.area_name = self.perm_group.area_name
#                 self.area_code = self.perm_group.area_code
#             if self.title is None or self.title is "":
#                 self.title = cap_space(str(self.name).replace(".", " ").replace("-", " ").replace("_", " ").replace("&", " "))
#         except Exception as xx:
#             print(str(xx))
#         super().save(*args, **kwargs)

# def clearDummyPermName():
#     for obj in GroupNamePerm.objects.filter(
#         Q(menu_name=None) & Q(app_name=None) & Q(model_name=None) & Q(view_name=None)):
#         obj.delete()

# def clearDummyGroupUser():
#     for obj in GroupNameUser.objects.filter(perm_group=None):
#         obj.delete()

# # Delete None perm_group
# def cleanDummyGroupUser():
#     for obj in GroupNameUser.objects.filter(~Q(name__contains="MPS") & Q(perm_group=None)):
#         obj.delete()

# ######################### GENERATE GROUPS:
# # [Entire] All Permissions Group (Full)
# def genGroupNamePerm_AllFull():
#     group_name = str("[Entire] All Permissions Group (Full)")
#     perm_group_obj = GroupNamePerm.objects.filter(name=group_name).first()
#     if perm_group_obj is None:
#         perm_group_obj = GroupNamePerm()
#         perm_group_obj.name = group_name
#         perm_group_obj.save()
#     for perm_obj in PermissionNamePerm.objects.all():
#         perm_group_obj.permissions.add(perm_obj)
#     user_group_obj = GroupNameUser.objects.filter(name=str("%s-Users" % group_name)).first()
#     if user_group_obj is not None:
#         for u_obj in User.objects.filter(Q(is_superuser=True) & Q(is_active=True)):
#             user_group_obj.users.add(u_obj)
#             print('[genGroupNamePerm_AllFull] Added: %s' % u_obj.username)
# # GuestPermission-Users
# def genGroupNamePerm_GuestPermission():
#     group_name = str("(Default) GuestPermission")
#     perm_group_obj = GroupNamePerm.objects.filter(name=group_name).first()
#     if perm_group_obj is None:
#         perm_group_obj = GroupNamePerm()
#         perm_group_obj.name = group_name
#         perm_group_obj.title = "(Default) Guest Permission"
#         perm_group_obj.save()
#     for perm_obj in PermissionNamePerm.objects.filter(Q(app_name__in=["Portal", "NewsManagement"])):
#         perm_group_obj.permissions.add(perm_obj)
#     # group_obj = GroupNameUser.objects.filter(name="(Default) GuestUser").first()
#     # if group_obj is None:
#     #     group_obj = GroupNameUser()
#     #     group_obj.name = "(Default) GuestUser"
#     #     group_obj.perm_group = perm_group_obj
#     #     group_obj.save()
#     # from MainManagement.submodels.Usersmodels import UserProfile
#     # for user_profile_obj in UserProfile.objects.all():
#     #     if user_profile_obj.is_newspaper_author is True:
#     #         continue
#     #     else:
#     #         group_obj.users.add(user_profile_obj.user)

# # BasicDefaultPermission-Users
# def genGroupNamePerm_BasicPermission():
#     group_name = str("BasicDefaultPermission")
#     perm_group_obj = GroupNamePerm.objects.filter(name=group_name).first()
#     if perm_group_obj is None:
#         perm_group_obj = GroupNamePerm()
#         perm_group_obj.name = group_name
#         perm_group_obj.title = "Basic Default Permission"
#         perm_group_obj.save()
#     BASIC_APPS = [
#         'app',
#         'core',
#         # 'Portal',
#         # 'NewsManagement',
#     ]
#     for perm_obj in PermissionNamePerm.objects.filter(Q(app_name__in=BASIC_APPS) & Q(unit_name=None) & Q(area_name=None) & Q(field_name=None)):
#         perm_group_obj.permissions.add(perm_obj)
#     for perm_obj in PermissionNamePerm.objects.filter(Q(perm_type="menu") & Q(menu_name="Dashboard")):
#         perm_group_obj.permissions.add(perm_obj)
#     for perm_obj in PermissionNamePerm.objects.filter(Q(perm_type="view") & Q(view_name="dashboard")):
#         perm_group_obj.permissions.add(perm_obj)
#     group_obj = GroupNameUser.objects.filter(name="BasicDefaultPermission-Users").first()
#     if group_obj is not None:
#         from MainManagement.submodels.Usersmodels import UserProfile
#         for user_profile_obj in UserProfile.objects.filter(user__is_active=True):
#             if user_profile_obj.is_newspaper_author is True or user_profile_obj.user.is_active is False:
#                 continue
#             else:
#                 group_obj.users.add(user_profile_obj.user)

# # DefaultPermission-Users
# def genGroupNamePerm_DefaultPermission():
#     group_name = str("DefaultPermission")
#     perm_group_obj = GroupNamePerm.objects.filter(name=group_name).first()
#     if perm_group_obj is None:
#         perm_group_obj = GroupNamePerm()
#         perm_group_obj.name = group_name
#         perm_group_obj.title = "Default Permission"
#         perm_group_obj.save()
#     for perm_obj in PermissionNamePerm.objects.filter((~Q(perm_name__contains="_all")
#                                                        | Q(perm_name="allow"))
#                                                       & (Q(unit_name=None)
#                                                          & Q(area_name=None)
#                                                          & Q(field_name=None))):
#         perm_group_obj.permissions.add(perm_obj)
#     # group_obj = GroupNameUser.objects.filter(name="DefaultPermission-Users").first()
#     # if group_obj is None:
#     #     group_obj = GroupNameUser()
#     #     group_obj.name = "DefaultUser"
#     #     group_obj.perm_group = perm_group_obj
#     #     group_obj.save()
#     # from MainManagement.submodels.Usersmodels import UserProfile
#     # for user_profile_obj in UserProfile.objects.all():
#     #     if user_profile_obj.is_newspaper_author is True:
#     #         continue
#     #     else:
#     #         group_obj.users.add(user_profile_obj.user)

# # AdminDefaultPermission-Users
# def genGroupNamePerm_AdminDefaultPermission():
#     group_name = str("AdminDefaultPermission")
#     perm_group_obj = GroupNamePerm.objects.filter(name=group_name).first()
#     if perm_group_obj is None:
#         perm_group_obj = GroupNamePerm()
#         perm_group_obj.name = group_name
#         perm_group_obj.title = "Admin Default Permission"
#         perm_group_obj.save()
#     for perm_obj in PermissionNamePerm.objects.filter(Q(perm_name__contains="_all") | Q(perm_name="allow")):
#         perm_group_obj.permissions.add(perm_obj)
#     group_obj = GroupNameUser.objects.filter(name="AdminDefaultPermission-Users").first()
#     if group_obj is not None:
#         for user_obj in User.objects.all():
#             if user_obj.is_staff is True and user_obj.is_active is True:
#                 group_obj.users.add(user_obj)

# # Bo qua
# def genGroupNamePerm_ByAppName():
#     for obj in GroupNamePerm.objects.filter(~Q(app_name=None)):
#         try:
#             obj.delete()
#         except Exception as xx:
#             print(str(xx))
#     all_apps = getAllAppName(ignore_django_apps=True)
#     for app in all_apps:
#         perm_group_obj = GroupNamePerm.objects.filter(name=app).first()
#         if perm_group_obj is None:
#             perm_group_obj = GroupNamePerm()
#             perm_group_obj.name = str("[App] %s-Users" % (app))
#             perm_group_obj.app_name = app
#             perm_group_obj.save()
#         for perm_obj in PermissionNamePerm.objects.filter(app_name=app):
#             perm_group_obj.permissions.add(perm_obj)
#         group_obj = GroupNameUser.objects.filter(name=str("[App] %s-Users" % (app))).first()
#         if group_obj is None:
#             group_obj = GroupNameUser()
#             group_obj.name = str("[App] %s-Users" % (app))
#             group_obj.perm_group = perm_group_obj
#             group_obj.save()

# # Bo Qua
# def genGroupNamePerm_ByModelName():
#     for obj in GroupNamePerm.objects.filter(~Q(model_name=None)):
#         try:
#             obj.delete()
#         except Exception as xx:
#             print(str(xx))
#     all_apps = getAllAppModelName(ignore_django_apps=True)
#     for app in all_apps:
#         app_name = app['app_name']
#         model_name = app['model_name']
#         group_name = str("[Model] %s.%s" % (app_name, model_name))
#         perm_group_obj = GroupNamePerm.objects.filter(name=group_name).first()
#         if perm_group_obj is None:
#             perm_group_obj = GroupNamePerm()
#             perm_group_obj.name = str("[Model] %s.%s" % (app_name, model_name))
#             perm_group_obj.app_name = app_name
#             perm_group_obj.model_name = model_name
#             perm_group_obj.save()
#         for perm_obj in PermissionNamePerm.objects.filter(app_name=app_name,
#                                                           model_name=model_name):
#             perm_group_obj.permissions.add(perm_obj)
#         group_obj = GroupNameUser.objects.filter(name=str("[Model] %s.%s-Users" % (app_name, model_name))).first()
#         if group_obj is None:
#             group_obj = GroupNameUser()
#             group_obj.name = str("[Model] %s.%s-Users" % (app_name, model_name))
#             group_obj.perm_group = perm_group_obj
#             group_obj.save()

# # [Model] %s (Basic)-Users
# def genGroupNamePerm_ByModelGroup_Basic():
#     for obj in GroupNamePerm.objects.filter(Q(name__contains="(Basic)") & Q(name__contains="[Model]")):
#         try:
#             obj.delete()
#         except Exception as xx:
#             print(str(xx))
#     all_apps = get_all_apps()
#     for app_name in all_apps:
#         group_name = str("[Model] %s (Basic)" % (app_name))
#         perm_group_obj = GroupNamePerm.objects.filter(name=group_name).first()
#         if perm_group_obj is None:
#             perm_group_obj = GroupNamePerm()
#             perm_group_obj.name = str("[Model] %s (Basic)" % (app_name))
#             perm_group_obj.app_name = app_name
#             perm_group_obj.save()
#         for perm_obj in PermissionNamePerm.objects.filter(Q(app_name=app_name) &
#                                                           ~Q(model_name=None) &
#                                                           ~Q(perm_name__contains="_all")):
#             perm_group_obj.permissions.add(perm_obj)

# # [Model] All Permissions Group (Basic)
# def genGroupNamePerm_ByModelGroup_AllBasic():
#     group_name = str("[Model] All Permissions Group (Basic)")
#     perm_group_obj = GroupNamePerm.objects.filter(name=group_name).first()
#     if perm_group_obj is None:
#         perm_group_obj = GroupNamePerm()
#         perm_group_obj.name = group_name
#         perm_group_obj.save()
#     for perm_obj in PermissionNamePerm.objects.filter(~Q(model_name=None) &
#                                                       ~Q(perm_name__contains="_all")):
#         perm_group_obj.permissions.add(perm_obj)

# # [Model] %s (Full)
# def genGroupNamePerm_ByModelGroup_Full():
#     for obj in GroupNamePerm.objects.filter(Q(name__contains="(Full)") & Q(name__contains="[Model]")):
#         try:
#             obj.delete()
#         except Exception as xx:
#             print(str(xx))
#     all_apps = get_all_apps()
#     for app_name in all_apps:
#         group_name = str("[Model] %s (Full)" % (app_name))
#         perm_group_obj = GroupNamePerm.objects.filter(name=group_name).first()
#         if perm_group_obj is None:
#             perm_group_obj = GroupNamePerm()
#             perm_group_obj.name = str("[Model] %s (Full)" % (app_name))
#             perm_group_obj.app_name = app_name
#             perm_group_obj.save()
#         for perm_obj in PermissionNamePerm.objects.filter(Q(app_name=app_name) &
#                                                           ~Q(model_name=None)):
#             perm_group_obj.permissions.add(perm_obj)

# # [Model] All Permissions Group (Full)
# def genGroupNamePerm_ByModelGroup_AllFull():
#     group_name = str("[Model] All Permissions Group (Full)")
#     perm_group_obj = GroupNamePerm.objects.filter(name=group_name).first()
#     if perm_group_obj is None:
#         perm_group_obj = GroupNamePerm()
#         perm_group_obj.name = group_name
#         perm_group_obj.save()
#     for perm_obj in PermissionNamePerm.objects.filter(~Q(model_name=None)):
#         perm_group_obj.permissions.add(perm_obj)

# # [View] %s.%s-Users
# def genGroupNamePerm_ByViewName():
#     for obj in GroupNamePerm.objects.filter(~Q(view_name=None)):
#         try:
#             obj.delete()
#         except Exception as xx:
#             print(str(xx))
#     all_apps = get_all_view()
#     for app in all_apps:
#         app_name = app['app_name']
#         view_name = app['name']
#         group_name = str("[View] %s.%s" % (app_name, view_name))
#         perm_group_obj = GroupNamePerm.objects.filter(name=group_name).first()
#         if perm_group_obj is None:
#             perm_group_obj = GroupNamePerm()
#             perm_group_obj.name = str("[View] %s.%s" % (app_name, view_name))
#             perm_group_obj.app_name = app_name
#             perm_group_obj.view_name = view_name
#             perm_group_obj.save()
#         for perm_obj in PermissionNamePerm.objects.filter(app_name=app_name,
#                                                           view_name=view_name):
#             perm_group_obj.permissions.add(perm_obj)
#         group_obj = GroupNameUser.objects.filter(name=str("[View] %s.%s-Users" % (app_name, view_name))).first()
#         if group_obj is None:
#             group_obj = GroupNameUser()
#             group_obj.name = str("[View] %s.%s-Users" % (app_name, view_name))
#             group_obj.perm_group = perm_group_obj
#             group_obj.save()

# # [View] %s --> All Views for APP_NAME
# def genGroupNamePerm_ByViewGroup():
#     # for obj in GroupNamePerm.objects.filter(~Q(view_name=None) | Q(name__contains="[View]")):
#     #     try:
#     #         obj.delete()
#     #     except Exception as xx:
#     #         print(str(xx))
#     all_apps = get_all_apps()
#     for app_name in all_apps:
#         group_name = str("[View] %s" % (app_name))
#         perm_group_obj = GroupNamePerm.objects.filter(name=group_name).first()
#         if perm_group_obj is None:
#             perm_group_obj = GroupNamePerm()
#             perm_group_obj.name = group_name
#             perm_group_obj.app_name = app_name
#             perm_group_obj.save()
#         for perm_obj in PermissionNamePerm.objects.filter(Q(app_name=app_name) &
#                                                           ~Q(view_name=None)):
#             perm_group_obj.permissions.add(perm_obj)
#         # group_obj = GroupNameUser.objects.filter(name=str("[View] %s.%s-Users" % (app_name, view_name))).first()
#         # if group_obj is None:
#         #     group_obj = GroupNameUser()
#         #     group_obj.name = str("[View] %s.%s-Users" % (app_name, view_name))
#         #     group_obj.perm_group = perm_group_obj
#         #     group_obj.save()

# def genGroupNamePerm_ByView_AllView():
#     # for obj in GroupNamePerm.objects.filter(~Q(view_name=None) | Q(name__contains="[AllView]")):
#     #     try:
#     #         obj.delete()
#     #     except Exception as xx:
#     #         print(str(xx))

#     group_name = str("[AllView] All Views Permission Group")
#     perm_group_obj = GroupNamePerm.objects.filter(name=group_name).first()
#     if perm_group_obj is None:
#         perm_group_obj = GroupNamePerm()
#         perm_group_obj.name = group_name
#         perm_group_obj.save()
#     for perm_obj in PermissionNamePerm.objects.filter(~Q(view_name=None)):
#         perm_group_obj.permissions.add(perm_obj)
#     # group_obj = GroupNameUser.objects.filter(name=str("[View] %s.%s-Users" % (app_name, view_name))).first()
#     # if group_obj is None:
#     #     group_obj = GroupNameUser()
#     #     group_obj.name = str("[View] %s.%s-Users" % (app_name, view_name))
#     #     group_obj.perm_group = perm_group_obj
#     #     group_obj.save()

# def genGroupNamePerm_ByMenuName():
#     # Clear:
#     # for obj in GroupNamePerm.objects.filter(~Q(menu_name=None)):
#     #     try:
#     #         obj.delete()
#     #     except Exception as xx:
#     #         print(str(xx))
#     for menu_obj in MenuNamePerm.objects.all():
#         menu_name = menu_obj.name
#         menu_code = menu_obj.code
#         group_name = str("[Menu] %s-PermissionGroup" % (menu_name))
#         perm_group_obj = GroupNamePerm.objects.filter(menu_name=group_name).first()
#         if perm_group_obj is None:
#             perm_group_obj = GroupNamePerm()
#             perm_group_obj.name = group_name
#             perm_group_obj.menu_name = menu_name
#         perm_group_obj.menu_code = menu_code
#         perm_group_obj.save()
#         for perm_obj in PermissionNamePerm.objects.filter(Q(menu_code=menu_code) | Q(menu_name=menu_name)):
#             perm_group_obj.permissions.add(perm_obj)
#         # group_obj = GroupNameUser.objects.filter(name=str("%s-Users" % (menu_name))).first()
#         # if group_obj is None:
#         #     group_obj = GroupNameUser()
#         #     group_obj.name = str("%s-Users" % (menu_name))
#         #     group_obj.perm_group = perm_group_obj
#         #     group_obj.save()

# def genGroupNamePerm_ByMenuGroup():
#     # Clear:
#     # for obj in GroupNamePerm.objects.filter(~Q(menu_name=None)):
#     #     try:
#     #         obj.delete()
#     #     except Exception as xx:
#     #         print(str(xx))
#     for menu_obj in MenuNamePerm.objects.all():
#         if "[" in menu_obj.name and "]" in menu_obj.name:
#             continue
#         menu_name = menu_obj.name
#         menu_code = menu_obj.code
#         group_name = str("[Menu] %s-PermissionGroup" % (menu_name))
#         perm_group_obj = GroupNamePerm.objects.filter(menu_name=group_name).first()
#         if perm_group_obj is None:
#             perm_group_obj = GroupNamePerm()
#             perm_group_obj.name = group_name
#             perm_group_obj.menu_name = menu_name
#         perm_group_obj.menu_code = menu_code
#         perm_group_obj.save()
#         for perm_obj in PermissionNamePerm.objects.filter(Q(menu_name__contains=str("[%s]" % menu_obj.name)) | Q(menu_code=menu_code)):
#             perm_group_obj.permissions.add(perm_obj)
#         # group_obj = GroupNameUser.objects.filter(name=str("%s-Users" % (menu_name))).first()
#         # if group_obj is None:
#         #     group_obj = GroupNameUser()
#         #     group_obj.name = str("%s-Users" % (menu_name))
#         #     group_obj.perm_group = perm_group_obj
#         #     group_obj.save()

# def genGroupNamePerm_ByAllMenuName():
#     group_name = str("[AllMenus] Permission Group")
#     perm_group_obj = GroupNamePerm.objects.filter(menu_name=group_name).first()
#     if perm_group_obj is None:
#         perm_group_obj = GroupNamePerm()
#         perm_group_obj.name = group_name
#         perm_group_obj.menu_name = group_name
#     perm_group_obj.menu_code = "all_menu"
#     perm_group_obj.save()
#     for perm_obj in PermissionNamePerm.objects.filter(perm_type="menu"):
#         perm_group_obj.permissions.add(perm_obj)
#     group_obj = GroupNameUser.objects.filter(name=str("[AllMenus] Permission Group-Users")).first()
#     for user_obj in User.objects.all():
#         if user_obj.is_staff is True and user_obj.is_active is True:
#             group_obj.users.add(user_obj)
#     # group_obj = GroupNameUser.objects.filter(name=str("[AllMenus] AllMenus-Users")).first()
#     # if group_obj is None:
#     #     group_obj = GroupNameUser()
#     #     group_obj.name = str("[AllMenus] AllMenus-Users")
#     #     group_obj.perm_group = perm_group_obj
#     #     group_obj.save()
#     #     # Add User:
#     #     all_usernames = [
#     #         'admin',
#     #         'vnuf',
#     #     ]
#     #     for u in User.objects.filter(username__in=all_usernames):
#     #         group_obj.users.add(u)

# def genGroupNamePerm_ByBasicMenus():
#     basic_menus = [
#         'Dashboard'
#     ]
#     group_name = str("[BasicMenus] PermissionGroup")
#     perm_group_obj = GroupNamePerm.objects.filter(menu_name=group_name).first()
#     if perm_group_obj is None:
#         perm_group_obj = GroupNamePerm()
#         perm_group_obj.name = group_name
#         perm_group_obj.menu_name = group_name
#     perm_group_obj.menu_code = "all_menu"
#     perm_group_obj.save()
#     for perm_obj in PermissionNamePerm.objects.filter(perm_type="menu", menu_name__in=basic_menus):
#         perm_group_obj.permissions.add(perm_obj)
#     # group_obj = GroupNameUser.objects.filter(name=str("[BasicMenus] Users")).first()
#     # if group_obj is None:
#     #     group_obj = GroupNameUser()
#     #     group_obj.name = str("[BasicMenus] Users")
#     #     group_obj.perm_group = perm_group_obj
#     #     group_obj.save()

# def genGroupNamePerm_ByStudentMenus():
#     student_menus = [
#         'Dashboard',
#         'HĐKH sinh viên',
#         'Nghiệm thu',
#         'Thực hiện',
#         'Dự thi các cấp',
#         'Đăng ký',
#     ]
#     student_menu_urls = [
#         '/dashboard/',
#         '/activities/topic/running/',
#         '/activities/topic/result/',
#         '/activities/topic/acceptance/',
#         '/activities/topic/list/',
#     ]
#     group_name = str("[StudentMenus] PermissionGroup")
#     perm_group_obj = GroupNamePerm.objects.filter(menu_name=group_name).first()
#     if perm_group_obj is None:
#         perm_group_obj = GroupNamePerm()
#         perm_group_obj.name = group_name
#         perm_group_obj.menu_name = group_name
#     perm_group_obj.menu_code = "all_menu"
#     perm_group_obj.save()
#     for perm_obj in PermissionNamePerm.objects.filter(perm_type="menu", menu_name__in=student_menus):
#         perm_group_obj.permissions.add(perm_obj)
#     # group_obj = GroupNameUser.objects.filter(name=str("[StudentMenus]-Users")).first()
#     # if group_obj is None:
#     #     group_obj = GroupNameUser()
#     #     group_obj.name = str("[StudentMenus]-Users")
#     #     group_obj.perm_group = perm_group_obj
#     #     group_obj.save()

# def genGroupNamePerm_ByUnitName():
#     # Clear:
#     # for obj in GroupNamePerm.objects.filter(~Q(unit_name=None)):
#     #     try:
#     #         obj.delete()
#     #     except Exception as xx:
#     #         print(str(xx))
#     for unit_obj in UnitNamePerm.objects.all():
#         unit_name = unit_obj.name
#         unit_code = unit_obj.code
#         group_name = str("[Unit] %s-PermissionGroup" % (unit_name))
#         perm_group_obj = GroupNamePerm.objects.filter(name=group_name).first()
#         if perm_group_obj is None:
#             perm_group_obj = GroupNamePerm()
#             perm_group_obj.name = group_name
#             perm_group_obj.unit_name = unit_name
#         perm_group_obj.unit_code = unit_code
#         perm_group_obj.save()
#         for perm_obj in PermissionNamePerm.objects.filter(Q(unit_name=unit_name) | Q(unit_code=unit_code)):
#             perm_group_obj.permissions.add(perm_obj)
#         # group_obj = GroupNameUser.objects.filter(name=str("[Menu] %s-Users" % (unit_name))).first()
#         # if group_obj is None:
#         #     group_obj = GroupNameUser()
#         #     group_obj.uuid = UUID4()
#         #     group_obj.name = str("[Menu] %s-Users" % (unit_name))
#         #     group_obj.perm_group = perm_group_obj
#         #     group_obj.save()

# def genGroupNamePerm_ByUnitName_AllUnit():
#     group_name = str("[AllUnit] All Unit Permission Group")
#     perm_group_obj = GroupNamePerm.objects.filter(name=group_name).first()
#     if perm_group_obj is None:
#         perm_group_obj = GroupNamePerm()
#         perm_group_obj.name = group_name
#     perm_group_obj.save()
#     for perm_obj in PermissionNamePerm.objects.filter(~Q(unit_name=None) | ~Q(unit_code=None)):
#         perm_group_obj.permissions.add(perm_obj)
#     # group_obj = GroupNameUser.objects.filter(name=str("[Menu] %s-Users" % (unit_name))).first()
#     # if group_obj is None:
#     #     group_obj = GroupNameUser()
#     #     group_obj.uuid = UUID4()
#     #     group_obj.name = str("[Menu] %s-Users" % (unit_name))
#     #     group_obj.perm_group = perm_group_obj
#     #     group_obj.save()

# def genGroupNamePerm_ByAreaName():
#     # Clear:
#     for obj in GroupNamePerm.objects.filter(~Q(area_name=None)):
#         try:
#             obj.delete()
#         except Exception as xx:
#             print(str(xx))
#     for area_obj in AreaNamePerm.objects.all():
#         area_name = area_obj.name
#         area_code = area_obj.code
#         group_name = str("%s-PermissionGroup" % (area_name))
#         perm_group_obj = GroupNamePerm.objects.filter(name=group_name).first()
#         if perm_group_obj is None:
#             perm_group_obj = GroupNamePerm()
#             perm_group_obj.name = group_name
#             perm_group_obj.area_name = area_name
#         perm_group_obj.area_code = area_code
#         perm_group_obj.save()
#         for perm_obj in PermissionNamePerm.objects.filter(area_name=area_name):
#             perm_group_obj.permissions.add(perm_obj)
#         # group_obj = GroupNameUser.objects.filter(name=str("%s-Users" % (area_name))).first()
#         # if group_obj is None:
#         #     group_obj = GroupNameUser()
#         #     group_obj.name = str("%s-Users" % (area_name))
#         #     group_obj.perm_group = perm_group_obj
#         #     group_obj.save()

# # [AllArea] All Area Permission Group
# def genGroupNamePerm_ByAreaName_AllArea():
#     group_name = str("[AllArea] All Area Permission Group")
#     perm_group_obj = GroupNamePerm.objects.filter(name=group_name).first()
#     if perm_group_obj is None:
#         perm_group_obj = GroupNamePerm()
#         perm_group_obj.name = group_name
#     perm_group_obj.save()
#     for perm_obj in PermissionNamePerm.objects.filter(~Q(area_name=None) | ~Q(area_code=None)):
#         perm_group_obj.permissions.add(perm_obj)

# def genGroupNamePerm_ByFieldName():
#     # Clear:
#     for obj in GroupNamePerm.objects.filter(~Q(field_name=None)):
#         try:
#             obj.delete()
#         except Exception as xx:
#             print(str(xx))
#     for field_obj in FieldNamePerm.objects.all():
#         field_name = field_obj.name
#         field_code = field_obj.code
#         group_name = str("[Field] %s-PermissionGroup" % (field_name))
#         perm_group_obj = GroupNamePerm.objects.filter(name=group_name).first()
#         if perm_group_obj is None:
#             perm_group_obj = GroupNamePerm()
#             perm_group_obj.name = group_name
#             perm_group_obj.field_name = field_name
#         perm_group_obj.field_code = field_code
#         perm_group_obj.save()
#         for perm_obj in PermissionNamePerm.objects.filter(field_name=field_name):
#             perm_group_obj.permissions.add(perm_obj)
#         # group_obj = GroupNameUser.objects.filter(name=str("[Field] %s-Users" % (field_name))).first()
#         # if group_obj is None:
#         #     group_obj = GroupNameUser()
#         #     group_obj.name = str("[Field] %s-Users" % (field_name))
#         #     group_obj.perm_group = perm_group_obj
#         #     group_obj.save()

# def genGroupNamePerm_ByFieldName_AllField():
#     group_name = str("[AllField] All Field Permission Group")
#     perm_group_obj = GroupNamePerm.objects.filter(name=group_name).first()
#     if perm_group_obj is None:
#         perm_group_obj = GroupNamePerm()
#         perm_group_obj.name = group_name
#     perm_group_obj.save()
#     for perm_obj in PermissionNamePerm.objects.filter(~Q(field_name=None) | ~Q(field_code=None)):
#         perm_group_obj.permissions.add(perm_obj)

# def genGroupNamePerm_ByMissionTypeName():
#     # Clear:
#     # for obj in GroupNamePerm.objects.filter(~Q(mission_type_name=None)):
#         # try:
#         #     obj.delete()
#         # except Exception as xx:
#         #     print(str(xx))
#     for mission_type_obj in MissionTypeNamePerm.objects.all():
#         mission_type_name = mission_type_obj.name
#         mission_type_code = mission_type_obj.code
#         group_name = str("[MissionType] %s-PermissionGroup" % (mission_type_name))
#         perm_group_obj = GroupNamePerm.objects.filter(name=group_name).first()
#         if perm_group_obj is None:
#             perm_group_obj = GroupNamePerm()
#             perm_group_obj.name = group_name
#             perm_group_obj.mission_type_name = mission_type_name
#         perm_group_obj.mission_type_code = mission_type_code
#         perm_group_obj.save()
#         for perm_obj in PermissionNamePerm.objects.filter(mission_type_name=mission_type_name):
#             perm_group_obj.permissions.add(perm_obj)
#         # group_obj = GroupNameUser.objects.filter(name=str("[Field] %s-Users" % (mission_type_name))).first()
#         # if group_obj is None:
#         #     group_obj = GroupNameUser()
#         #     group_obj.name = str("[Field] %s-Users" % (mission_type_name))
#         #     group_obj.perm_group = perm_group_obj
#         #     group_obj.save()

# def genGroupNamePerm_ByMissionTypeName_AllMissionType():
#     group_name = str("[AllMissionType] All Mission Type Permission Group")
#     perm_group_obj = GroupNamePerm.objects.filter(name=group_name).first()
#     if perm_group_obj is None:
#         perm_group_obj = GroupNamePerm()
#         perm_group_obj.name = group_name
#     perm_group_obj.save()
#     for perm_obj in PermissionNamePerm.objects.filter(~Q(mission_type_name=None) | ~Q(mission_type_code=None)):
#         perm_group_obj.permissions.add(perm_obj)

# def genGroupNamePerm_ByMissionFormName():
#     # Clear:
#     for obj in GroupNamePerm.objects.filter(~Q(mission_type_name=None)):
#         try:
#             obj.delete()
#         except Exception as xx:
#             print(str(xx))
#     for mission_form_obj in MissionFormNamePerm.objects.all():
#         mission_form_name = mission_form_obj.name
#         mission_form_code = mission_form_obj.code
#         group_name = str("[MissionForm] %s-PermissionGroup" % (mission_form_name))
#         perm_group_obj = GroupNamePerm.objects.filter(name=group_name).first()
#         if perm_group_obj is None:
#             perm_group_obj = GroupNamePerm()
#             perm_group_obj.name = group_name
#             perm_group_obj.mission_form_name = mission_form_name
#         perm_group_obj.mission_form_code = mission_form_code
#         perm_group_obj.save()
#         for perm_obj in PermissionNamePerm.objects.filter(mission_form_name=mission_form_name):
#             perm_group_obj.permissions.add(perm_obj)
#         # group_obj = GroupNameUser.objects.filter(name=str("[Field] %s-Users" % (mission_form_name))).first()
#         # if group_obj is None:
#         #     group_obj = GroupNameUser()
#         #     group_obj.name = str("[Field] %s-Users" % (mission_form_name))
#         #     group_obj.perm_group = perm_group_obj
#         #     group_obj.save()

# def genGroupNamePerm_ByMissionFormName_AllMissionForm():
#     group_name = str("[AllMissionForm] All Mission Form Permission Group")
#     perm_group_obj = GroupNamePerm.objects.filter(name=group_name).first()
#     if perm_group_obj is None:
#         perm_group_obj = GroupNamePerm()
#         perm_group_obj.name = group_name
#     perm_group_obj.save()
#     for perm_obj in PermissionNamePerm.objects.filter(~Q(mission_form_name=None) | ~Q(mission_form_code=None)):
#         perm_group_obj.permissions.add(perm_obj)

# # [BasicUser] VNUF-GroupPermision-Users
# def genGroupNamePerm_BasicUser_VNUF_GroupPermision_Users():
#     group_name = str("[BasicUser] VNUF-GroupPermision")
#     perm_group_obj = GroupNamePerm.objects.filter(name=group_name).first()
#     if perm_group_obj is None:
#         perm_group_obj = GroupNamePerm()
#         perm_group_obj.name = group_name
#     perm_group_obj.save()
#     MENUS_CODE = [
#         "D", # Dashboard
#         "TH", # Thực hiện
#         "TQ_2",  # [Thực hiện] Tổng quan
#         "DX_1",  # Đề Xuất
#         "TQ_5",  # [Đề Xuất] Tổng quan
#         "KT",  # Kiểm Tra
#         "TQ_3",  # [Kiểm tra] Tổng quan
#         "DC",  # Điều Chỉnh
#         "TQ",  # [Điều Chỉnh] Tổng quan
#         "NT",  # Nghiệm Thu
#         "TQ_1",  # [Nghiệm thu] Tổng quan
#         "CB",  # Công Bố
#         "TQ_4",  # [Công bố] Tổng quan
#         "LLKH_1",# Lý Lịch Khoa học
#         "LLKH_2",
#         "GNC", # "Giờ Nghiên Cứu"
#         "TGN", # Tính giờ NCKH
#         "ST", # Soạn thảo
#         "BB",
#         "HSV", # Sinh viên nghiên cứu KH
#         "TH_1",
#         "NT_1",
#         "DTCC",
#         "DK",
#     ]
#     APP_NAMES = [
#         'app',
#         'RunningTaskManagement',
#         'SuggestionManagement',
#         'EvaluateTaskManagement',
#         'AdjustTaskManagement',
#         'AcceptanceTaskManagement',
#         'AnnouncedTaskManagement',
#         'ScientificActivities',
#         'ScienceStudyHours',
#         'NewspaperManagement',
#         'NewsManagement',
#         'PrizeManagement',
#         'ScientificBground',
#     ]
#     VIEWS = [

#     ]
#     MODELS = [

#     ]
#     PERMS_NAME = [
#         'create',
#         'detail',
#         'update',
#         'delete',
#         'list',
#     ]
#     # Q(menu_code__in=MENUS_CODE) |
#     # Add menus:
#     for perm_obj in PermissionNamePerm.objects.filter(Q(perm_name="allow") & Q(menu_code__in=MENUS_CODE)):
#         perm_group_obj.permissions.add(perm_obj)
#     # Add model (owner):
#     for perm_obj in PermissionNamePerm.objects.filter(Q(perm_name__in=PERMS_NAME) & Q(app_name__in=APP_NAMES)):
#         perm_group_obj.permissions.add(perm_obj)
#     # Add views:
#     for perm_obj in PermissionNamePerm.objects.filter(Q(perm_name="allow") & Q(app_name__in=APP_NAMES)):
#         perm_group_obj.permissions.add(perm_obj)

#     EXCEPT_PARAMS = [
#         # Thực hiện
#             {
#             'app_name': "RunningTaskManagement",
#             'model_name': "RunningTask",
#             'perm_name': 'create',
#             },
#             {
#                 'app_name': "RunningTaskManagement",
#                 'model_name': "RunningTask",
#                 'perm_name': 'delete',
#             },

#             {
#                 'app_name': "RunningTaskManagement",
#                 'model_name': "RunningTask",
#                 'perm_name': 'delete_all',
#             },
#             {
#                 'app_name': "RunningTaskManagement",
#                 'model_name': "RunningTask",
#                 'perm_name': 'edit',
#             },
#             {
#                 'app_name': "RunningTaskManagement",
#                 'model_name': "RunningTask",
#                 'perm_name': 'edit_all',
#             },
#         #### Kiểm tra
#         {
#             'app_name': "EvaluateTaskManagement",
#             'model_name': "RunningTask",
#             'perm_name': 'create',
#         },
#         {
#             'app_name': "EvaluateTaskManagement",
#             'model_name': "RunningTask",
#             'perm_name': 'delete',
#         },

#         {
#             'app_name': "EvaluateTaskManagement",
#             'model_name': "RunningTask",
#             'perm_name': 'delete_all',
#         },
#         {
#             'app_name': "EvaluateTaskManagement",
#             'model_name': "RunningTask",
#             'perm_name': 'edit',
#         },
#         {
#             'app_name': "EvaluateTaskManagement",
#             'model_name': "RunningTask",
#             'perm_name': 'edit_all',
#         },
#         #### Điều chỉnh
#         {
#             'app_name': "AdjustTaskManagement",
#             'model_name': "RunningTask",
#             'perm_name': 'create',
#         },
#         {
#             'app_name': "AdjustTaskManagement",
#             'model_name': "RunningTask",
#             'perm_name': 'delete',
#         },

#         {
#             'app_name': "AdjustTaskManagement",
#             'model_name': "RunningTask",
#             'perm_name': 'delete_all',
#         },
#         {
#             'app_name': "AdjustTaskManagement",
#             'model_name': "RunningTask",
#             'perm_name': 'edit',
#         },
#         {
#             'app_name': "AdjustTaskManagement",
#             'model_name': "RunningTask",
#             'perm_name': 'edit_all',
#         },
#         #### Nghiệm thu
#         {
#             'app_name': "AcceptanceTaskManagement",
#             'model_name': "AcceptanceTask",
#             'perm_name': 'create',
#         },
#         {
#             'app_name': "AcceptanceTaskManagement",
#             'model_name': "AcceptanceTask",
#             'perm_name': 'delete',
#         },

#         {
#             'app_name': "AcceptanceTaskManagement",
#             'model_name': "AcceptanceTask",
#             'perm_name': 'delete_all',
#         },
#         {
#             'app_name': "AcceptanceTaskManagement",
#             'model_name': "AcceptanceTask",
#             'perm_name': 'edit',
#         },
#         {
#             'app_name': "AcceptanceTaskManagement",
#             'model_name': "AcceptanceTask",
#             'perm_name': 'edit_all',
#         },
#         #### Công bố
#         {
#             'app_name': "AnnouncedTaskManagement",
#             'model_name': "AnnouncedTask",
#             'perm_name': 'create',
#         },
#         {
#             'app_name': "AnnouncedTaskManagement",
#             'model_name': "AnnouncedTask",
#             'perm_name': 'delete',
#         },

#         {
#             'app_name': "AnnouncedTaskManagement",
#             'model_name': "AnnouncedTask",
#             'perm_name': 'delete_all',
#         },
#         {
#             'app_name': "AnnouncedTaskManagement",
#             'model_name': "AnnouncedTask",
#             'perm_name': 'edit',
#         },
#         {
#             'app_name': "AnnouncedTaskManagement",
#             'model_name': "AnnouncedTask",
#             'perm_name': 'edit_all',
#         },
#     ]
#     # except_params['app_name']
#     for except_params in EXCEPT_PARAMS:
#         perm_group_obj.permissions.remove(*perm_group_obj.permissions.filter(**except_params))

# # [BasicUser] KHCN-GroupPermision-Users
# # @tnd: coding
# def genGroupNamePerm_BasicUser_KHCN_GroupPermision_Users():
#     group_name = str("[BasicUser] KHCN-GroupPermision")
#     perm_group_obj = GroupNamePerm.objects.filter(name=group_name).first()
#     if perm_group_obj is None:
#         perm_group_obj = GroupNamePerm()
#         perm_group_obj.name = group_name
#     perm_group_obj.save()
#     MENUS_CODE = [
#         "D", # Dashboard
#         # "TH", # Thực hiện
#         # "TQ_2",  # [Thực hiện] Tổng quan
#         # "DX_1",  # Đề Xuất
#         # "TQ_5",  # [Đề Xuất] Tổng quan
#         # "KT",  # Kiểm Tra
#         # "TQ_3",  # [Kiểm tra] Tổng quan
#         # "DC",  # Điều Chỉnh
#         # "TQ",  # [Điều Chỉnh] Tổng quan
#         # "NT",  # Nghiệm Thu
#         # "TQ_1",  # [Nghiệm thu] Tổng quan
#         # "CB",  # Công Bố
#         # "TQ_4",  # [Công bố] Tổng quan
#         # "LLKH_1",# Lý Lịch Khoa học
#         # "LLKH_2",
#         # "GNC", # "Giờ Nghiên Cứu"
#         # "TGN", # Tính giờ NCKH
#         # "ST", # Soạn thảo
#         # "BB",
#         # "HSV", # Sinh viên nghiên cứu KH
#         # "TH_1",
#         # "NT_1",
#         # "DTCC",
#         # "DK",
#     ]
#     APP_NAMES = [
#         'app',
#         # 'RunningTaskManagement',
#         # 'SuggestionManagement',
#         # 'EvaluateTaskManagement',
#         # 'AdjustTaskManagement',
#         # 'AcceptanceTaskManagement',
#         # 'AnnouncedTaskManagement',
#         # 'ScientificActivities',
#         # 'ScienceStudyHours',
#         # 'NewspaperManagement',
#         # 'NewsManagement',
#         # 'PrizeManagement',
#         # 'ScientificBground',
#     ]
#     VIEWS = [

#     ]
#     MODELS = [

#     ]
#     PERMS_NAME = [
#         'create',
#         'detail',
#         'update',
#         'delete',
#         'list',
#     ]
#     # Q(menu_code__in=MENUS_CODE) |
#     # Add menus:
#     for perm_obj in PermissionNamePerm.objects.filter(Q(perm_name="allow") & Q(menu_code__in=MENUS_CODE)):
#         perm_group_obj.permissions.add(perm_obj)
#     # Add model (owner):
#     for perm_obj in PermissionNamePerm.objects.filter(Q(perm_name__in=PERMS_NAME) & Q(app_name__in=APP_NAMES)):
#         perm_group_obj.permissions.add(perm_obj)
#     # Add views:
#     for perm_obj in PermissionNamePerm.objects.filter(Q(perm_name="allow") & Q(app_name__in=APP_NAMES)):
#         perm_group_obj.permissions.add(perm_obj)

#     EXCEPT_PARAMS = [
#         # Thực hiện
#             {
#             'app_name': "RunningTaskManagement",
#             'model_name': "RunningTask",
#             'perm_name': 'create',
#             },
#             {
#                 'app_name': "RunningTaskManagement",
#                 'model_name': "RunningTask",
#                 'perm_name': 'delete',
#             },

#             {
#                 'app_name': "RunningTaskManagement",
#                 'model_name': "RunningTask",
#                 'perm_name': 'delete_all',
#             },
#             {
#                 'app_name': "RunningTaskManagement",
#                 'model_name': "RunningTask",
#                 'perm_name': 'edit',
#             },
#             {
#                 'app_name': "RunningTaskManagement",
#                 'model_name': "RunningTask",
#                 'perm_name': 'edit_all',
#             },
#         #### Kiểm tra
#         {
#             'app_name': "EvaluateTaskManagement",
#             'model_name': "RunningTask",
#             'perm_name': 'create',
#         },
#         {
#             'app_name': "EvaluateTaskManagement",
#             'model_name': "RunningTask",
#             'perm_name': 'delete',
#         },

#         {
#             'app_name': "EvaluateTaskManagement",
#             'model_name': "RunningTask",
#             'perm_name': 'delete_all',
#         },
#         {
#             'app_name': "EvaluateTaskManagement",
#             'model_name': "RunningTask",
#             'perm_name': 'edit',
#         },
#         {
#             'app_name': "EvaluateTaskManagement",
#             'model_name': "RunningTask",
#             'perm_name': 'edit_all',
#         },
#         #### Điều chỉnh
#         {
#             'app_name': "AdjustTaskManagement",
#             'model_name': "RunningTask",
#             'perm_name': 'create',
#         },
#         {
#             'app_name': "AdjustTaskManagement",
#             'model_name': "RunningTask",
#             'perm_name': 'delete',
#         },

#         {
#             'app_name': "AdjustTaskManagement",
#             'model_name': "RunningTask",
#             'perm_name': 'delete_all',
#         },
#         {
#             'app_name': "AdjustTaskManagement",
#             'model_name': "RunningTask",
#             'perm_name': 'edit',
#         },
#         {
#             'app_name': "AdjustTaskManagement",
#             'model_name': "RunningTask",
#             'perm_name': 'edit_all',
#         },
#         #### Nghiệm thu
#         {
#             'app_name': "AcceptanceTaskManagement",
#             'model_name': "AcceptanceTask",
#             'perm_name': 'create',
#         },
#         {
#             'app_name': "AcceptanceTaskManagement",
#             'model_name': "AcceptanceTask",
#             'perm_name': 'delete',
#         },

#         {
#             'app_name': "AcceptanceTaskManagement",
#             'model_name': "AcceptanceTask",
#             'perm_name': 'delete_all',
#         },
#         {
#             'app_name': "AcceptanceTaskManagement",
#             'model_name': "AcceptanceTask",
#             'perm_name': 'edit',
#         },
#         {
#             'app_name': "AcceptanceTaskManagement",
#             'model_name': "AcceptanceTask",
#             'perm_name': 'edit_all',
#         },
#         #### Công bố
#         {
#             'app_name': "AnnouncedTaskManagement",
#             'model_name': "AnnouncedTask",
#             'perm_name': 'create',
#         },
#         {
#             'app_name': "AnnouncedTaskManagement",
#             'model_name': "AnnouncedTask",
#             'perm_name': 'delete',
#         },

#         {
#             'app_name': "AnnouncedTaskManagement",
#             'model_name': "AnnouncedTask",
#             'perm_name': 'delete_all',
#         },
#         {
#             'app_name': "AnnouncedTaskManagement",
#             'model_name': "AnnouncedTask",
#             'perm_name': 'edit',
#         },
#         {
#             'app_name': "AnnouncedTaskManagement",
#             'model_name': "AnnouncedTask",
#             'perm_name': 'edit_all',
#         },
#     ]
#     # except_params['app_name']
#     for except_params in EXCEPT_PARAMS:
#         pass
#         # perm_group_obj.permissions.remove(*perm_group_obj.permissions.filter(**except_params))

# # User Permission Table
# class UserPermissionTable(models.Model):
#     class Meta:
#         verbose_name = _("User Permission Table")
#         verbose_name_plural = _("(UserPermissionTable) User Permission Table")
#     uuid = models.UUIDField(default=UUID4,
#                             max_length=64,
#                             editable=True,
#                             unique=True,
#                             primary_key=True)
#     name = models.CharField(max_length=500,
#                             editable=True,
#                             null=True,
#                             help_text=_('Tên Đầy đủ UserPermissionTable'))
#     user = models.ForeignKey(AUTH_USER_MODEL, to_field='username',
#                                    related_name='%(class)s_user',
#                                    on_delete=(models.SET_NULL),
#                                    null=True,
#                                    blank=True,
#                                    help_text=_('Người sử dụng.'))
#     username = models.CharField(max_length=500,
#                             editable=True,
#                             null=True,
#                             help_text=_('Tên Username'))
#     app_name = models.CharField(max_length=500,
#                                 editable=True,
#                                 null=True,
#                                 help_text=_('Tên Apps'))
#     view_name = models.CharField(max_length=500,
#                                   editable=True,
#                                   null=True,
#                                   help_text=_('Tên View'))
#     model_name = models.CharField(max_length=500,
#                                   editable=True,
#                                   null=True,
#                                   help_text=_('Tên Model'))
#     menu_name = models.CharField(max_length=500,
#                                   editable=True,
#                                   null=True,
#                                   help_text=_('Tên Menu'))
#     perm_name = models.CharField(max_length=500,
#                                  editable=True,
#                                  null=True,
#                                  help_text=_('Tên Quyền cụ thể'))
#     unit_name = models.CharField(max_length=500,
#                                  editable=True,
#                                  null=True,
#                                  help_text=_('Tên Unit'))
#     area_name = models.CharField(max_length=500,
#                                  editable=True,
#                                  null=True,
#                                  help_text=_('Tên Area'))
#     unit_code = models.CharField(max_length=500,
#                                  editable=True,
#                                  null=True,
#                                  help_text=_('Code Unit'))
#     area_code = models.CharField(max_length=500,
#                                  editable=True,
#                                  null=True,
#                                  help_text=_('Code Area'))
#     perm = models.ForeignKey(PermissionNamePerm, to_field='uuid',
#                                    related_name='%(class)s_created_by',
#                                    on_delete=(models.SET_NULL),
#                                    null=True,
#                                    blank=True,
#                                    help_text=_('Quyền'))
#     perm_name = models.CharField(max_length=500,
#                                  editable=True,
#                                  null=True,
#                                  help_text=_('Tên quyền (lấy từ bảng quyền, ví dụ: Edit, Delete...'))
#     perm_type = models.CharField(max_length=500,
#                                  editable=True,
#                                  null=True,
#                                  choices=PERMTYPE_CHOICES,
#                                  help_text=_('Loại quyền (Dữ liệu; View/ApiView; Menu'))

#     is_enabled = models.BooleanField(default=True, null=False, editable=True,
#                                      help_text=_('Enable'))

#     created_by = models.ForeignKey(AUTH_USER_MODEL, to_field='username',
#                                    related_name='%(class)s_created_by',
#                                    on_delete=(models.SET_NULL),
#                                    null=True,
#                                    blank=True,
#                                    help_text=_('người tạo'))
#     updated_by = models.ForeignKey(AUTH_USER_MODEL, to_field='username',
#                                    related_name='%(class)s_updated_by',
#                                    on_delete=(models.SET_NULL),
#                                    null=True,
#                                    blank=True,
#                                    help_text=_('Người cập nhật.'))
#     valid_to = models.DateTimeField(default=None,
#                                       null=True,
#                                       blank=True)
#     valid_from = models.DateTimeField(default=None,
#                                       null=True,
#                                       blank=True)
#     updated_at = models.DateTimeField(default=djnow)
#     created_at = models.DateTimeField(default=djnow,
#                                       editable=False)

#     def __str__(self):
#         return str(self.name)

#     def save(self, *args, **kwargs):
#         self.updated_at = djnow()
#         if self.user and self.user.username:
#             self.username = self.user.username

#         if self.perm:
#             self.perm_type = self.perm.perm_type
#             self.perm_name = self.perm.perm_name
#             self.app_name = self.perm.app_name
#             self.model_name = self.perm.model_name
#             self.view_name = self.perm.view_name
#             self.menu_name = self.perm.menu_name

#             self.unit_name = self.perm.unit_name
#             self.unit_code = self.perm.unit_code
#             self.area_name = self.perm.area_name
#             self.area_code = self.perm.area_code
#             if self.is_enabled is None and self.perm.is_default is True:
#                 self.is_enabled = True
#         try:
#             if self.perm_type == "model":
#                 perm_type = "model"
#                 perm_string = str(self.model_name).lower()
#             elif self.perm_type == "view":
#                 perm_type = "view"
#                 perm_string = str(self.view_name).lower()
#             elif self.perm_type == "menu":
#                 perm_type = "menu"
#                 perm_string = str(self.menu_name).lower()
#             if (self.unit_code is None or self.unit_code == "") or (self.area_code is None or self.area_code == ""):

#                 self.name = str("%s.%s.%s.%s...%s" % (str(self.username).lower(),
#                                                       str(self.app_name).lower(),
#                                                       perm_type,
#                                                       perm_string,
#                                                         str(self.perm_name).lower()))
#             else:
#                 self.name = str("%s.%s.%s.%s.%s.%s.%s" % (str(self.username).lower(),
#                                                     str(self.app_name).lower(),
#                                                           perm_type,
#                                                           perm_string,
#                                                     str(self.unit_code).lower(),
#                                                     str(self.area_code).lower(),
#                                                     str(self.perm_name).lower()))
#         except Exception as xx:
#             print(str(xx))
#         if self.title is None or self.title is "":
#             self.title = cap_space(str(self.name).replace(".", " ").replace("-", " ").replace("_", " ").replace("&", " "))
#         else:
#             self.title = cap_space(self.title).title()
#         super().save(*args, **kwargs)

# def clearUserPermissionTable():
#     try:
#         UserPermissionTable.objects.all().delete()
#     except Exception as xx:
#         print(str(xx))

# def updateUserPermissionTable():
#     try:
#         from MainManagement.submodels.Usersmodels import UserProfile
#         for user_profile_obj in UserProfile.objects.filter(user__is_active=True):
#             if user_profile_obj.is_newspaper_author is True:
#                 continue
#             user_obj = user_profile_obj.user
#             for perm_obj in PermissionNamePerm.objects.all():
#                 check_obj = UserPermissionTable.objects.filter(username=user_obj.username,
#                                                                perm=perm_obj).first()
#                 if check_obj is None:
#                     check_obj = UserPermissionTable()
#                     check_obj.user = user_obj
#                     check_obj.perm = perm_obj
#                 check_obj.save()
#         return True
#     except Exception as xx:
#         print(str(xx))
#         return False

# def genAllPermissionForUsername(username=None):
#     try:
#         if username is None:
#             return False
#         from MainManagement.submodels.Usersmodels import UserProfile
#         if User.objects.filter(username=username, is_active=True).first() is not None:
#             for perm_obj in PermissionNamePerm.objects.all():
#                 check_obj = UserPermissionTable.objects.filter(username=username,
#                                                                perm=perm_obj).first()
#                 if check_obj is None:
#                     check_obj = UserPermissionTable()
#                     check_obj.user = user_obj
#                     check_obj.perm = perm_obj
#                 check_obj.save()
#         return True
#     except Exception as xx:
#         print(str(xx))
#         return False

# # Test:
# # from MainManagement.submodels.Rolesmodels import *
# # tCheckUsernamePermissionByGroup('admin', 'evaluatetaskmanagement.view.notexpensestateupdaterestapiview........allow') # --> True
# # tCheckUsernamePermissionByGroup('truongnv1', 'prizemanagement.model.prizeattachment........detail_all') # --> True
# # tCheckUsernamePermissionByGroup('yennt1', 'prizemanagement.model.prizeattachment........detail_all') # --> False
# # tCheckUsernamePermissionByGroup('yennt', 'prizemanagement.model.prizeattachment........detail_all') # --> False
# # tCheckUsernamePermissionByGroup('yennt', 'prizemanagement.model.prizeattachment........detail') # --> True

# # def tCheckUsernamePermissionByGroup(username,
# #                                    app_name=None,
# #                                    view_name=None,
# #                                    perm_name=None,
# #                                    perm_group=None):
# def tCheckUsernamePermissionByGroup(username, *args, **kwargs):
#     try:
#         valid_fields = [
#             'username',
#             'app_name',
#             'model_name',
#             'view_name',
#             'menu_name',
#             'perm_name',
#             'name',
#         ]
#         other_fields = [
#             'unit_code',
#             'field_code',
#             'area_code',
#             'mission_type_code',
#             'mission_form_code',
#             'action',
#         ]
#         print("[tCheckUsernamePermissionByGroup] Raw kwargs = %s" % str(kwargs))
#         other_params = {}
#         perm_obj = PermissionNamePerm()
#         x_keys = list(kwargs.keys())
#         for key in x_keys:
#             try:
#                 if hasattr(perm_obj, key) is False or kwargs[key] is None:
#                     locals()[key] = kwargs.pop(key)
#                 else:
#                     if key in other_fields:
#                         other_params[key] = kwargs.pop(key)
#                     # Xử lý perm_name --> perm_name__in=['edit', 'edit_all']'
#                     else:
#                         if 'perm_name' in kwargs:
#                             perm_name = kwargs['perm_name']
#                             if perm_name[-4:] == "_all":
#                                 pass
#                             elif perm_name == "allow":
#                                 pass
#                             else:
#                                 perm_name = kwargs.pop('perm_name')
#                                 kwargs["perm_name__in"] = [perm_name, perm_name + "_all"]
#                         pass
#             except Exception as tx:
#                 print("[tCheckUsernamePermissionByGroup] str(tx) = %s" % str(tx))
#         print("[tCheckUsernamePermissionByGroup] other_params = %s" % str(other_params))
#         print("[tCheckUsernamePermissionByGroup] kwargs = %s" % str(kwargs))
#         user_groups = GroupNameUser.objects.filter(users__username=username)
#         checker1 = False
#         checker2 = False
#         checker3 = False
#         for gr in user_groups:
#             # Nếu có cả model_name và view_name --> Check riêng
#             if 'model_name' in kwargs and 'view_name' in kwargs:
#                 model_name = kwargs.pop('model_name')
#                 view_name = kwargs.pop('view_name')
#                 # Filter app_name
#                 if gr.perm_group:
#                     qs = gr.perm_group.permissions.filter(**kwargs)
#                     # Filter hoặc:
#                     qs = qs.filter(Q(model_name=model_name) | Q(view_name=view_name))
#             else:
#                 if gr.perm_group:
#                     qs = gr.perm_group.permissions.filter(**kwargs)
#             if qs.count() > 0:
#                 checker1 = True
#                 print("[tCheckUsernamePermissionByGroup] qs.count() = %s" % qs.count())
#                 break
#         # Nếu check không thấy thì tiếp tục tìm trong ManyToManyField (các nhóm quyền khác)
#         if checker1 is False:
#             for gr in user_groups:
#                 perm_groups = gr.other_perm_groups.all()
#                 for pg in perm_groups:
#                     # Nếu có cả model_name và view_name --> Check riêng
#                     if 'model_name' in kwargs and 'view_name' in kwargs:
#                         model_name = kwargs.pop('model_name')
#                         view_name = kwargs.pop('view_name')
#                         # Filter app_name
#                         if pg.permissions:
#                             qs = pg.permissions.filter(**kwargs)
#                             # Filter hoặc:
#                             qs = qs.filter(Q(model_name=model_name) | Q(view_name=view_name))
#                     else:
#                         if pg.permissions:
#                             qs = pg.permissions.filter(**kwargs)
#                     if qs.count() > 0:
#                         checker1 = True
#                         print("[tCheckUsernamePermissionByGroup] qs.count() = %s" % qs.count())
#                         break
#                 # Nếu thấy rồi thì break, không cần tìm tiếp
#                 if checker1 is True:
#                     break
#         if len(other_params) > 0:
#             checker2 = True
#             check_results = {}
#             for k2 in other_params:
#                 check_results[k2] = False
#             for k2 in other_params:
#                 # Check pass rồi thì không check nữa: @tnd: Có thể không cần thiết
#                 if check_results[k2] is True:
#                     continue
#                 # Mã code --> chuyển lower()
#                 locals()[k2] = str(other_params[k2]).lower()
#                 print('%s = %s' % (k2, locals()[k2]))
#                 for gr in user_groups:
#                     kw2 = {}
#                     kw2[k2] = locals()[k2]
#                     if gr.perm_group:
#                         qs2 = gr.perm_group.permissions.filter(**kw2)
#                         print('[tCheckUsernamePermissionByGroup] Checked group: %s' % gr.name)
#                         if qs2.count() > 0:
#                             check_results[k2] = True
#                             print("[tCheckUsernamePermissionByGroup] check_results[k2] = %s" % check_results[k2])
#                             break
#                 # Nếu không thấy thì tiếp tục tìm trong other permission Groups:
#                 if check_results[k2] is False:
#                     for gr in user_groups:
#                         perm_groups = gr.other_perm_groups.all()
#                         for pg in perm_groups:
#                             kw2 = {}
#                             kw2[k2] = locals()[k2]
#                             if pg.permissions:
#                                 qs2 = pg.permissions.filter(**kw2)
#                                 print('[tCheckUsernamePermissionByGroup] Checked group: %s' % gr.name)
#                                 if qs2.count() > 0:
#                                     check_results[k2] = True
#                                     print("[tCheckUsernamePermissionByGroup] check_results[k2] = %s" % check_results[k2])
#                                     break
#                         # Nếu thấy rồi thì thôi
#                         if check_results[k2] is True:
#                             break
#             for k in check_results.keys():
#                 if check_results[k] is False:
#                     checker2 = False
#                     break
#             print('check_results.items() = %s' % str(check_results.items()))
#         else:
#             checker2 = True
#         print('checker1 = %s; checker2 = %s' % (checker1, checker2))
#         if checker1 is True and checker2 is True:
#             return True
#         return False
#     except Exception as xx:
#         print("[tCheckUsernamePermissionByGroup] Exception: %s" % str(xx))
#         return False

# def t_check_perms(user, perm):
#     if isinstance(perm, str):
#         perms = (perm,)
#     else:
#         perms = perm
#     # First check if the user has the permission (even anon users)
#     if user.has_perms(perms):
#         return True
#     # In case the 403 handler should be called raise the exception
#     if raise_exception:
#         raise PermissionDenied
#     # As the last resort, show the login form
#     return False

# # CHeck web view for access
# def tCheckPermission(function, *targs, **tkwargs):
#     @wraps(function)
#     def wrap(request, *args, **kwargs):
#         try:
#             print('[tCheckPermission] targs = %s' % str(targs))
#             view_full_name = resolve(request.get_full_path())
#             print('[tCheckPermission] request.user.username = %s' % request.user.username)
#             # app_name = str(view_full_name._func_path).split('.')[0]
#             # print('app_name = %s' % app_name)
#             # view_name = str(view_full_name._func_path).split('.')[-1]
#             # print('view_name = %s' % view_name)

#             if not kwargs or "app_name" not in kwargs:
#                 app_name = str(view_full_name._func_path).split('.')[0]
#                 print('[tCheckPermission] app_name = %s' % app_name)
#                 kwargs['app_name'] = app_name
#             if not kwargs or "view_name" not in kwargs:
#                 view_name = str(view_full_name._func_path).split('.')[-1]
#                 print('[tCheckPermission] view_name = %s' % view_name)
#                 kwargs['view_name'] = view_name

#             checker = tCheckUsernamePermissionByGroup(request.user.username, **kwargs)
#             if checker is True:
#                 # messages.add_message(request, messages.SUCCESS, "TEST SUCCESS!")
#                 # actual_decorator = user_passes_test(
#                 #     lambda u: u.is_authenticated()
#                 # )
#                 if function:
#                     try:
#                         # return function(request, *args)
#                         return function(request, *args, **kwargs)
#                         # return function(request)
#                     except Exception as xx:
#                         print("[tCheckPermission] Exception: %s" % str(xx))
#             else:
#                 # messages.add_message(request, messages.WARNING, "XXX")
#                 messages.add_message(request, messages.WARNING, 'You have not permission to access!')
#                 return redirect(reverse("Portal:HomePortal"))
#         except Exception as xx:
#             print("[tCheckPermission] Exception: %s" % str(xx))
#             return redirect(reverse("Portal:HomePortal"))
#     return wrap

# def tPassTest(test_func, login_url=None, redirect_field_name=REDIRECT_FIELD_NAME):
#     def decorator(view_func):
#         @wraps(view_func)
#         def _wrapped_view(request, *args, **kwargs):
#             if test_func(request.user):
#                 return view_func(request, *args, **kwargs)
#             path = request.build_absolute_uri()
#             resolved_login_url = resolve_url(login_url or settings.LOGIN_URL)
#             # If the login url is the same scheme and net location then just
#             # use the path as the "next" url.
#             login_scheme, login_netloc = urlparse(resolved_login_url)[:2]
#             current_scheme, current_netloc = urlparse(path)[:2]
#             if ((not login_scheme or login_scheme == current_scheme) and
#                     (not login_netloc or login_netloc == current_netloc)):
#                 path = request.get_full_path()
#             from django.contrib.auth.views import redirect_to_login
#             return redirect_to_login(
#                 path, resolved_login_url, redirect_field_name)
#         return _wrapped_view
#     return decorator

# def tHasPerm(perm, *args, **kwargs):
#     def check_perms(user):
#         if isinstance(perm, str):
#             perms = (perm,)
#         else:
#             perms = perm
#         # First check if the user has the permission (even anon users)
#         if user.has_perms(perms):
#             return True
#         # In case the 403 handler should be called raise the exception
#         if raise_exception:
#             raise PermissionDenied
#         # As the last resort, show the login form
#         return False
#     return user_passes_test(check_perms, login_url=login_url)


# PERM_FIELDS_LIST = [
#     # 'unit',
#     # 'area',
#     'field',
#     'mission_type',
#     # 'mission_form',
# ]

# PARAM_FIELDS = {
#     'SuggestionManagement':{
#         'TaskSuggestion': {
#              'area': 'area',
#              # 'field': 'field_index_task',
#              'unit': 'unit',
#              'mission_type': 'mission_parent_type',
#              'mission_form': 'mission_child_type',
#              'science_field_index_task': 'science_field_index_task',
#              'managers_level_index_task': 'managers_level_index_task',
#             '__perms__': [
#                 'unit',
#                 # 'area',
#                 'field',
#                 'mission_type',
#                 'mission_form',
#             ],
#             }
#         },
#     'OrderTaskManagement': {
#         'TaskOrder': {
#             'area': 'area',
#             # 'field': 'field_index_task',
#             'unit': 'unit',
#             'mission_type': 'mission_parent_type',
#             'mission_form': 'mission_child_type',
#             'science_field_index_task': 'science_field_index_task',
#             'managers_level_index_task': 'managers_level_index_task',
#             '__perms__': [
#                 'unit',
#                 # 'area',
#                 'field',
#                 'mission_type',
#                 'mission_form',
#             ],
#         }
#     },
#     'RunningTaskManagement': {
#         'RunningTask': {
#             'area': 'area',
#             # 'field': 'field_index_task',
#             'unit': 'unit',
#             'mission_type': 'mission_parent_type',
#             'mission_form': 'mission_child_type',
#             'science_field_index_task': 'science_field_index_task',
#             'managers_level_index_task': 'managers_level_index_task',
#             '__perms__': [
#                 # 'unit',
#                 # 'area',
#                 'field',
#                 'mission_type',
#                 'mission_form',
#             ],
#         }
#     },

#     'EvaluateTaskManagement': {
#         'RunningTask': {
#             'area': 'area',
#             # 'field': 'field_index_task',
#             'unit': 'unit',
#             'mission_type': 'mission_parent_type',
#             'mission_form': 'mission_child_type',
#             'science_field_index_task': 'science_field_index_task',
#             'managers_level_index_task': 'managers_level_index_task',
#             '__perms__': [
#                 # 'unit',
#                 # 'area',
#                 'field',
#                 'mission_type',
#                 'mission_form',
#             ],
#         }
#     },
#     'AdjustTaskManagement': {
#         'RunningTask': {
#             'area': 'area',
#             # 'field': 'field_index_task',
#             'unit': 'unit',
#             'mission_type': 'mission_parent_type',
#             'mission_form': 'mission_child_type',
#             'science_field_index_task': 'science_field_index_task',
#             'managers_level_index_task': 'managers_level_index_task',
#             '__perms__': [
#                 # 'unit',
#                 # 'area',
#                 'field',
#                 'mission_type',
#                 'mission_form',
#             ],
#         }
#     },
#     'AcceptanceTaskManagement': {
#         'AcceptanceTask': {
#             'area': 'area',
#             # 'field': 'field_index_task',
#             'unit': 'unit',
#             'mission_type': 'mission_parent_type',
#             'mission_form': 'mission_child_type',
#             'science_field_index_task': 'science_field_index_task',
#             'managers_level_index_task': 'managers_level_index_task',
#             '__perms__': [
#                 # 'unit',
#                 # 'area',
#                 'field',
#                 'mission_type',
#                 'mission_form',
#             ],
#         }
#     },
#     'AnnouncedTaskManagement': {
#         'AnnouncedTask': {
#             'area': 'area',
#             # 'field': 'field_index_task',
#             'unit': 'unit',
#             'mission_type': 'mission_parent_type',
#             'mission_form': 'mission_child_type',
#             'science_field_index_task': 'science_field_index_task',
#             'managers_level_index_task': 'managers_level_index_task',
#             '__perms__': [
#                 # 'unit',
#                 # 'area',
#                 'field',
#                 'mission_type',
#                 'mission_form',
#             ],
#         }
#     },
#     'ScientificActivities': {
#         'ScientificReport': {
#             'area': 'area',
#             # 'field': 'field_index_task',
#             'unit': 'unit',
#             'mission_type': 'mission_parent_type',
#             'mission_form': 'mission_child_type',
#             'science_field_index_task': 'science_field_index_task',
#             'managers_level_index_task': 'managers_level_index_task',
#             '__perms__': [
#                 'unit',
#                 # 'area',
#                 # 'field',
#                 # 'mission_type',
#                 # 'mission_form',
#             ],
#         },
#         'AcceptanceTask': {
#             'area': 'area',
#             # 'field': 'field_index_task',
#             'unit': 'unit',
#             'mission_type': 'mission_parent_type',
#             'mission_form': 'mission_child_type',
#             'science_field_index_task': 'science_field_index_task',
#             'managers_level_index_task': 'managers_level_index_task',
#             '__perms__': [
#                 'unit',
#                 # 'area',
#                 # 'field',
#                 # 'mission_type',
#                 # 'mission_form',
#             ],
#         },
#     },
# }


# def getMapAttrName(app_name, model_name, field_name):
#     if app_name in PARAM_FIELDS:
#         app = PARAM_FIELDS[app_name]
#         if model_name in app:
#             model = app[model_name]
#             if field_name in model:
#                 return model[field_name]
#     return field_name

# def getMapPermList(app_name, model_name):
#     if app_name in PARAM_FIELDS:
#         app = PARAM_FIELDS[app_name]
#         if model_name in app:
#             model = app[model_name]
#             if "__perms__" in model:
#                 return model["__perms__"]
#     return []

# # Test: getMapAttrName("RunningTaskManagement", "RunningTask", "field")
# # Test: getMapAttrName("RunningTaskManagement", "RunningTask", "area")
# # Test: getMapAttrName("RunningTaskManagement", "RunningTask", "unit")
# # Test: getMapAttrName("RunningTaskManagement", "RunningTask", "mission_type")
# # Test: getMapAttrName("RunningTaskManagement", "RunningTask", "mission_form")

# # Check perm for API VIEW to response data
# from functools import reduce
# import operator
# from django.db.models import Q
# # reduce(operator.or_,  (Q(**d) for d in (dict([i]) for i in query_params.dict().items())))
# class tCheckApiViewPermission(permissions.BasePermission):
#     # Map methods into required permission codes.
#     # Override this if you need to also provide 'view' permissions,
#     # or if you want to provide custom permission codes.
#     perms_map = {
#         'GET': [],
#         'OPTIONS': [],
#         'HEAD': [],
#         'POST': ['%(app_label)s.add_%(model_name)s'],
#         'PUT': ['%(app_label)s.change_%(model_name)s'],
#         'PATCH': ['%(app_label)s.change_%(model_name)s'],
#         'DELETE': ['%(app_label)s.delete_%(model_name)s'],
#     }
#     FIELDS_MAP = {
#         "app_name": {
#             'model_name':{
#                 "unit": "unit",
#                 "field": "field",
#                 "area": "area",
#                 "mission_type": "mission_type",
#                 "mission_form": "mission_form",
#             },
#         },
#     }

#     def get_required_permissions(self, method, model_cls):
#         """
#         Given a model and an HTTP method, return the list of permission
#         codes that the user is required to have.
#         """
#         kwargs = {
#             'app_label': model_cls._meta.app_label,
#             'model_name': model_cls._meta.model_name
#         }

#         if method not in self.perms_map:
#             raise exceptions.MethodNotAllowed(method)

#         return [perm % kwargs for perm in self.perms_map[method]]

#     def _queryset(self, view):
#         assert hasattr(view, 'get_queryset') \
#                or getattr(view, 'queryset', None) is not None, (
#             'Cannot apply {} on a view that does not set '
#             '`.queryset` or have a `.get_queryset()` method.'
#         ).format(self.__class__.__name__)

#         if hasattr(view, 'get_queryset'):
#             queryset = view.get_queryset()
#             assert queryset is not None, (
#                 '{}.get_queryset() returned None'.format(view.__class__.__name__)
#             )
#             return queryset
#         return view.queryset

#     def filter_queryset(self, user_obj, perm, queryset=None):
#         model_fullname = str(queryset.model).split("'")[1]  # <class 'ScientificBground.models.ScienceProfile'>
#         model_name = str(model_fullname).split(".")[-1]

#         # # Refix queryset of view
#         objModel = globals()[model_name]
#         obj = objModel()

#         if not queryset.model == "SomeModel":
#             return queryset

#         if not user_obj.is_authenticated:
#             return queryset.none()

#         return queryset.filter(related_model_fk__in=user_obj.related_model_m2m.all())

#     # for view permission
#     def has_permission(self, request, view):
#         global PERM_FIELDS_LIST
#         global PARAM_FIELDS
#         try:
#             print("queryset.model = %s" % view.queryset.model.__dict__)
#             params = {}
#             queryset = view.queryset
#             model_fullname = str(queryset.model).split("'")[1] # <class 'ScientificBground.models.ScienceProfile'>
#             app_name = str(model_fullname).split(".")[0]
#             params['app_name'] = app_name

#             model_name = str(model_fullname).split(".")[-1]
#             params['model_name'] = model_name
            
#             # @tnd: How to load (Import) Model Object????
#             obj = None
#             try:
#                 obj = view.queryset.model()
#                 print("[tCheckApiViewPermission] [has_permission] generated sample Object (%s)..." % model_name)
#             except Exception as rx:
#                 print(str(rx))
#             # Refix queryset of view
#             userprofile_obj = UserProfile.objects.filter(name=request.user.username, user__is_active=True).first()
#             # @tnd: Recheck quyền theo đơn vị được gán --> cần lấy list đơn vị phụ trách
#             # Rồi check unit__name__in=[List đơn vị]
#             others_qs = None
#             if tCheckUsernamePermissionByGroup(request.user.username,
#                                                 **{"app_name": app_name,
#                                                    "model_name": model_name,
#                                                    "perm_name": "list_all"}):
#                 others_qs = queryset.filter()
#             else:
#                 if obj is not None:
#                     qs_params = {}
#                     print("[tCheckApiViewPermission] [has_permission] checking object attributes (%s)..." % model_name)
#                     PERM_LIST = getMapPermList(app_name, model_name)
#                     for field_name in PERM_LIST:
#                         attr_name = getMapAttrName(app_name, model_name, field_name)
#                         if hasattr(obj, attr_name):
#                             qs_params[attr_name + "__code__in"] = tGetAllCases_ByUser(request.user.username, field_name)

#                     if qs_params:
#                         other_filters = reduce(operator.or_,  (Q(**d) for d in (dict([i]) for i in qs_params.items())))
#                         others_qs = queryset.filter(other_filters)

#                     # if hasattr(obj, 'field'):
#                     #     field_codes = tGetAllFields_ByUser(request.user.username)
#                     #     print("[tCheckApiViewPermission] [has_permission] field_codes = (%s) (%s)" % (field_codes, type(field_codes)))
#                     #     # view.queryset = queryset.filter(Q(created_by=request.user) | Q(field__code__in=field_codes) | Q(field=None))
#                     #     fields_qs = queryset.filter(Q(field__code__in=field_codes))
#                     #
#                     # if hasattr(obj, 'area'):
#                     #     area_codes = tGetAllAreas_ByUser(request.user.username)
#                     #     # view.queryset = queryset.filter(Q(created_by=request.user) | Q(area__code__in=area_codes) | Q(area=None))
#                     #     areas_qs = queryset.filter(Q(area__code__in=area_codes))
#                     # if hasattr(obj, 'unit'):
#                     #     unit_codes = tGetAllUnits_ByUser(request.user.username)
#                     #     # view.queryset = queryset.filter(Q(created_by=request.user) | Q(unit__code__in=unit_codes) | Q(unit=None))
#                     #     units_qs = queryset.filter(Q(unit__code__in=unit_codes))
#                 # # Nếu không thấy quyền phạm vi nào thì trả về các cái đã tạo
#                 # else:
#                 #     print("[tCheckApiViewPermission] [has_permission] CAN NOT generate Object (%s)..." % model_name)
#             if others_qs is not None:
#                 view.queryset = queryset.filter(created_by=request.user) | others_qs
#             else:
#                 view.queryset = queryset.filter(created_by=request.user)
#             username = None
#             if request.user and request.user.username:
#                 username = request.user.username
#             view_name = None
#             try:
#                 if hasattr(view, "basename"):
#                     view_name = view.basename
#                     params['view_name'] = view_name
#                     print('[tCheckApiViewPermission][has_permission] view_name = %s' % view_name)

#                 if hasattr(view, "action"):
#                     action = view.action
#                     print('[tCheckApiViewPermission][has_permission] action = %s' % action)
#                     if action == 'create':
#                         params['perm_name'] = action
#                         pass
#                     elif action == 'list':
#                         params['perm_name'] = action
#                         pass
#                     elif action == 'retrieve':
#                         params['perm_name'] = "detail"
#                         pass
#                     elif action == 'destroy':
#                         params['perm_name'] = "delete"
#                         pass
#                     elif action == 'partial_update':
#                         params['perm_name'] = "edit"

#                     params['action'] = action

#             except Exception as xx:
#                 print(str(xx))
#             print('[tCheckApiViewPermission][has_permission] params = %s' % params)
#             checker = tCheckUsernamePermissionByGroup(username, **params)
#             return checker
#         except Exception as xx:
#             print("[tCheckApiViewPermission][has_permission] Exception: %s" % str(xx))
#             return False

#     # for object level permissions
#     def has_object_permission(self, request, view, vacation_obj):
#         # return True
#         try:
#             params = {}
#             model_name = vacation_obj._meta.model.__name__
#             print("[tCheckApiViewPermission][has_object_permission] model_name = %s" % model_name)
#             params['model_name'] = model_name
#             username = None
#             if request.user and request.user.username:
#                 username = request.user.username
#                 # params['username'] = username
#             view_name = None

#             view_full_name = str(view)
#             print('[tCheckApiViewPermission][has_object_permission] view_full_name = %s' % view_full_name)
#             app_name = str(view_full_name).split('.')[0][1:]
#             params['app_name'] = app_name
#             # Nếu là người tạo --> return True:
#             if hasattr(vacation_obj, "created_by") and vacation_obj.created_by == request.user:
#                 return True
#             # Nếu có quyền tất cả --> return True
#             if tCheckUsernamePermissionByGroup(request.user.username,
#                                               **{"app_name": app_name,
#                                                  "model_name": model_name,
#                                                  "perm_name": "list_all"}):
#                 return True
#             view_name = None
#             try:
#                 if hasattr(view, "basename"):
#                     view_name = view.basename
#                     params['view_name'] = view_name
#                     print('[tCheckApiViewPermission][has_object_permission] view_name = %s' % view_name)

#                 if hasattr(view, "action"):
#                     action = view.action
#                     print('[tCheckApiViewPermission][has_object_permission] action = %s' % action)
#                     if action == 'create':
#                         params['perm_name'] = action
#                         pass
#                     elif action == 'list':
#                         params['perm_name'] = action
#                         pass
#                     elif action == 'retrieve':
#                         params['perm_name'] = "detail"
#                         pass
#                     elif action == 'destroy':
#                         params['perm_name'] = "delete"
#                         pass
#                     elif action == 'partial_update':
#                         params['perm_name'] = "edit"

#                     params['action'] = action

#             except Exception as xx:
#                 print(str(xx))
#             qs_params = {}
#             PERM_LIST = getMapPermList(app_name, model_name)

#             for field_name in PERM_LIST:
#                 print('[tCheckApiViewPermission][has_object_permission] field_name = %s' % field_name)
#                 attr_name = getMapAttrName(app_name, model_name, field_name)
#                 print('[tCheckApiViewPermission][has_object_permission] attr_name = %s' % attr_name)
#                 if hasattr(vacation_obj, attr_name) and getattr(vacation_obj, attr_name) is not None:
#                     attr_obj = getattr(vacation_obj, attr_name)
#                     print('[tCheckApiViewPermission][has_object_permission] attr_obj = %s' % attr_obj)

#                     field_code = getattr(attr_obj, "code")
#                     print('[tCheckApiViewPermission][has_object_permission] vacation_obj.[field_name].code = %s' % field_code)
#                     # Nếu nằm trong danh sách các code thuộc quyền của user --> True
#                     all_cases = tGetAllCases_ByUser(request.user.username, field_name)
#                     if field_code in all_cases:
#                         return True
#                         # tGetAllCases_ByUser(request.user.username, field_name)

#             # if hasattr(vacation_obj, "unit") and vacation_obj.unit is not None and vacation_obj.unit.code is not None:
#             #     unit_code = vacation_obj.unit.code
#             #     params['unit_code'] = unit_code
#             # if hasattr(vacation_obj, "area") and vacation_obj.area is not None and vacation_obj.area.code is not None:
#             #     area_code = vacation_obj.area.code
#             #     params['area_code'] = area_code
#             # if hasattr(vacation_obj, "field") and vacation_obj.field is not None and vacation_obj.field.code is not None:
#             #     field_code = vacation_obj.field.code
#             #     params['field_code'] = field_code
#             print('[tCheckApiViewPermission][has_object_permission] params = %s' % params)

#             checker = tCheckUsernamePermissionByGroup(username, **params)
#             if checker is False:
#                 params['perm_name'] = "list"
#                 checker = tCheckUsernamePermissionByGroup(username, **params)
#             return checker
#             #
#             # # SAFE_MTHODS: GET , HEAD or OPTIONS
#             # if request.method in permissions.SAFE_METHODS:
#             #     return True
#             # if hasattr(vacation_obj, "created_by"):
#             #     return vacation_obj.created_by.id == request.user.id
#             # elif hasattr(vacation_obj, "owner"):
#             #     return vacation_obj.owner.id == request.user.id
#             # else:
#             #     return False
#         except Exception as xx:
#             print("[tCheckApiViewPermission][has_object_permission] Exception:" % str(xx))
#             return False

# def checkUsernamePermissionByPermName(username, perm_name=None):
#     try:
#         return True
#     except Exception as xx:
#         print(str(xx))
#         return False

# def addUserToGroup_ByAppViews(username, app_name=None, view_name=None):
#     user = User.objects.filter(username=username, is_active=True).first()
#     if user is not None:
#         if view_name is None:
#             for gr in GroupNameUser.objects.filter(app_name=app_name):
#                 gr.users.add(user)

# def 8(username):
#     system_apps = [
#         'authentication',
#         'core',
#         'MainManagement',
#         'NewsManagement',
#         'rest_framework',
#         'rest_framework_jwt',
#         'django',
#         'social_django',
#         'import_export',
#     ]
#     for app_name in system_apps:
#         addUserToGroup_ByAppViews(username, app_name=app_name)
# # models

# def getAllPermName_NoForeignKey():
#     return PermissionNamePerm.objects.filter(
#         Q(model_name_obj=None)
#         & Q(view_name_obj=None)
#         & Q(menu_name_obj=None)
#         & Q(area_name_obj=None)
#         & Q(unit_name_obj=None)
#         & Q(field_name_obj=None)
#         & Q(mission_type_name_obj=None)
#         & Q(mission_form_name_obj=None)
#     )

# def getAllPermName_HaveForeignKey():
#     return PermissionNamePerm.objects.filter(
#         ~Q(model_name_obj=None)
#         | ~Q(view_name_obj=None)
#         | ~Q(menu_name_obj=None)
#         | ~Q(area_name_obj=None)
#         | ~Q(unit_name_obj=None)
#         | ~Q(field_name_obj=None)
#         | ~Q(mission_type_name_obj=None)
#         | ~Q(mission_form_name_obj=None)
#     )

# def getAllPermGroup_Empty():
#     return GroupNamePerm.objects.filter(permissions=None)

# def removeInActiveAccount():
#     INACTIVE_USERS = []
#     for u in User.objects.filter(is_active=False):
#         INACTIVE_USERS.append(u)

#     for gr in GroupNameUser.objects.filter(users__in=INACTIVE_USERS):
#         for user in INACTIVE_USERS:
#             gr.users.remove(user)

# def setInActiveUser():
#     KEEP_USERS = [
#         'admin',
#         'tamnd',
#         'vnuf',
#     ]
#     for u in User.objects.filter(~Q(username__in=KEEP_USERS) & ~Q(username__contains='dhln') & ~Q(username__contains='qlkh') & ~Q(username__contains='tamnd') & ~Q(username__contains='truongnv') & ~Q(username__contains='mps') & ~Q(username__contains='demo') & ~Q(username__contains='linhttk')  & ~Q(username__contains='admin')):
#         u.is_active = False
#         u.save()

