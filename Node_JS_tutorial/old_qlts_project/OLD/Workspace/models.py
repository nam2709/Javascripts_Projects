import os
import base64
from uuid import uuid4 as UUID4
from time import sleep
from datetime import timedelta
from sys import _getframe

from django.utils.translation import gettext_lazy as _
from django.utils.html import format_html
from django.db.models import Q
from model_utils import FieldTracker
from django.core.files import File as DjFile
from django.utils.timezone import now as djnow
from django.conf import settings
from django.db import models
from django.utils import timezone

# from Tools.tnd_tools import gen_image_id

APPICON_BASE64 = ""
try:
    with open('%s/Workspace/default_app_icon.txt' % settings.BASE_DIR) as f:
        APPICON_BASE64 = f.read().replace("\n", "")
        # print("AVA_BASE64 = %s" % AVA_BASE64)
except Exception as xx:
    print(str(xx))

THEME_CHOICES = (
    ('_default', 'Default'),
    ('_mdbootstrap', 'MDB Admin Template'),
    ('_dptemplate', 'DP Template'),
    ('_testing', 'Testing Template'),
)


class Config(models.Model):
    class Meta:
        verbose_name = _("Thông Tin Cấu Hình")
        verbose_name_plural = _("Thông Tin Cấu Hình")

    name = models.CharField(max_length=64,
                            editable=True,
                            null=False,
                            default="cấu hình",
                            unique=False)
    uuid = models.UUIDField(default=UUID4,
                            unique=True,
                            max_length=64,
                            editable=True)

    value = models.CharField(max_length=50000,
                             editable=True,
                             null=True,
                             unique=False)
    active = models.BooleanField(default=True, null=False)
    default = models.BooleanField(default=True, null=False)
    updated_at = models.DateTimeField(default=djnow)
    created_at = models.DateTimeField(default=djnow, editable=False)
    tracker = FieldTracker()
    class Template:
        # hiển thị chi tiết

        configs = [
            {
                'template_listviews': False,
                'is_add_new': True,
            },
        ]
        dActions = [
            'detail',
            'edit',
            'delete',
        ]
        fieldsets = [
            {
                'title': "Thông tin",
                'attrs': (),
            },
            ('name',),
            ('value'),
             ('default'),
             ('active'),
        ]

        required_field = [
        ]
        in_form_buttons = [

        ]
        currency_fields = [

        ]
        list_actions = [

        ]
        # hiển thị trên bảng
        list_fields = [
            'name',
            'value',
             'default',
             'active',
        ]
        # hiển thị trên bảng thêm mới
        inline_fields = [
             'name',
            'value',
             'default',
             'active',
        ]
        # các trường thông tin search
        search_fields = [
            'name',
        ]
        # các trường thông tin filter
        filter_fields = [
             'name',
        ]
    # endclasstemplate
    def __str__(self):
        return self.name

    def fullname(self):
        module = self.__class__.__module__
        if module is None or module == str.__class__.__module__:
            return self.__class__.__name__  # Avoid reporting __builtin__
        else:
            return module + '.' + self.__class__.__name__

    def save(self, *args, **kwargs):
        self.updated_at = djnow()
        if self.uuid is None:
            self.uuid = UUID4()
        if self.tracker.has_changed('default') and self.default is True:
            # select all other active items
            qs = type(self).objects.filter(default=True)
            # except self (if self already exists)
            if self.pk:
                qs = qs.exclude(pk=self.pk)
            # and deactive them
            qs.update(default=False)
        super(Config, self).save()


class AllApp(models.Model):
    class Meta:
        verbose_name = _("Danh Sách Webapp")
        verbose_name_plural = _("Danh Sách Webapp")

    TARGET_CHOICES = (
        ('_blank', 'Opens the linked document in a new window or tab'),
        ('_self', 'Opens the linked document in the same frame as it was clicked (this is default)'),
        ('_parent', 'Opens the linked document in the parent frame'),
        ('_top', 'Opens the linked document in the full body of the window'),
    )

    name = models.CharField(max_length=64,
                            editable=True,
                            null=True,
                            unique=True)
    uuid = models.UUIDField(default=UUID4,
                            unique=True,
                            max_length=64,
                            editable=True)

    short_name = models.CharField(max_length=64,
                                  editable=True,
                                  null=True,
                                  unique=False)
    url = models.CharField(max_length=1024,
                           editable=True,
                           null=True,
                           blank=True,
                           unique=False,
                           help_text='Url for app. If null or blank, app will not be shown on Top Bar!')
    href_target = models.CharField(choices=TARGET_CHOICES,
                                   default="_blank",
                                   max_length=256,
                                   help_text="Target on click!")
    icon = models.ImageField(upload_to='app-icons/%Y/%m/%d/',
                             max_length=2000,
                             null=True,
                             blank=True,
                             help_text='Logo for app. If blank, app will not be shown on Top Bar!')
    icon_base64 = models.TextField(max_length=2000,
                                   null=True,
                                   blank=True,
                                   help_text='Base64 for icon image. When saved, if icon_base64 is null or blank and icon file'
                                             'existing, it will be created automatically.')
    active = models.BooleanField(default=True, null=False)
    is_product = models.BooleanField(default=True,
                                     null=False,
                                     help_text='If not is a product, app will not be shown on Top Bar!')
    staff_only = models.BooleanField(default=True,
                                     null=False,
                                     help_text='Chỉ quyền staff mới truy cập được!')
    admin_only = models.BooleanField(default=True,
                                     null=False,
                                     help_text='Chỉ quyền super admin mới truy cập được!')
    order = models.PositiveIntegerField(default=0)
    demo_mode = models.BooleanField(default=False,
                                    null=False,
                                    help_text='Demo apps!')
    updated_at = models.DateTimeField(default=djnow)
    created_at = models.DateTimeField(default=djnow, editable=False)
    tracker = FieldTracker()
    class Template:
        # hiển thị chi tiết

        configs = [
            {
                'template_listviews': False,
                'is_add_new': True,
            },
        ]
        dActions = [
            'detail',
            'edit',
            'delete',
        ]
        fieldsets = [
            {
                'title': "Thông tin",
                'attrs': (),
            },
            ('name',
            'short_name',),
            ('url','href_target',),
            ('icon',),
            ('active',),
            ('is_product',),
            ('staff_only',),
            ('admin_only',),
            ('order',),

        ]

        required_field = [
        ]
        in_form_buttons = [

        ]
        currency_fields = [

        ]
        list_actions = [

        ]
        # hiển thị trên bảng
        list_fields = [
            'name',
            'url',
            'order',
            'href_target',
            'active',
            'is_product',
            'staff_only',
            'admin_only',
        ]
        # hiển thị trên bảng thêm mới
        inline_fields = [
             'name',
            'url',
            'order',
            'href_target',
            'active',
            'is_product',
            'staff_only',
            'admin_only',
        ]
        # các trường thông tin search
        search_fields = [
            'name',
        ]
        # các trường thông tin filter
        filter_fields = [
             'name',
            'url',
            'href_target',
        ]
        # endclasstemplate
    def __str__(self):
        return self.name

    def __get__(self):
        if self.icon is None or os.path.exists(self.icon.path) is False:
            self.icon = None
            self.icon_base64 = APPICON_BASE64
        return self

    def thumbnail(self):
        try:
            if self.icon and os.path.exists(self.icon.path):
                return format_html('<img src="{}" style="width: 130px; \
                                   height: 100px"/>'.format(self.icon.url))
            else:
                return format_html('<img src="{}" style="width: 130px; \
                                   height: 100px"/>'.format(APPICON_BASE64))
        except:
            return format_html('')

    thumbnail.short_description = 'Icon'
    thumbnail.allow_tags = True

    def fullname(self):
        module = self.__class__.__module__
        if module is None or module == str.__class__.__module__:
            return self.__class__.__name__  # Avoid reporting __builtin__
        else:
            return module + '.' + self.__class__.__name__

    def save(self, *args, **kwargs):
        self.updated_at = djnow()
        # if self.uuid is None:
        #     self.uuid = UUID4()
        if self.short_name is None or self.short_name is "":
            self.short_name = self.name
        if self.icon_base64 is None or self.icon_base64 is "":
            if self.icon and self.icon.path and os.path.exists(self.icon.path):
                # Kiểm tra nếu file không thực sự là jpg; Cái này có thể lưu ở trường riêng nếu muốn giữ nguyên định dạng gốc
                # Ví dụ png, gif
                # if imghdr.what(self.icon.path) in ['png', 'gif']:
                #     print('imghdr.what(self.icon.path) = %s' % imghdr.what(self.icon.path))
                #     current_dir = os.getcwd()
                #     os.chdir(settings.MEDIA_ROOT)
                #     today = date.today()
                #     year = today.strftime("%Y")
                #     month = today.strftime("%m")
                #     day = today.strftime("%d")
                #     tmp_file = str('app-icons/%s/%s/%s/temp-%s.jpg' % (year, month, day, gen_image_id(12)))
                #     if ToJpg(self.icon.path, tmp_file):
                #         print('Convert to jpg Done!')
                #         self.icon = DjFile(open(tmp_file, "rb"))
                with open(self.icon.path, "rb") as image_file:
                    # base64 string will as: str(b'123456') --> [2:-1] remove 2 first characters and last one
                    # print(str(base64.b64encode(image_file.read())))
                    self.icon_base64 = str(base64.b64encode(image_file.read()))[2:-1]
                    # print(self.icon_base64)
            else:
                self.icon_base64 = APPICON_BASE64
        elif self.tracker.has_changed('icon'):
            if self.icon and self.icon.path and os.path.exists(self.icon.path):
                with open(self.icon.path, "rb") as image_file:
                    # base64 string will as: str(b'123456') --> [2:-1] remove 2 first characters and last one
                    self.icon_base64 = str(base64.b64encode(image_file.read()))[2:-1]
        elif self.icon_base64 is not None and self.icon_base64 is not "":
            if self.icon:
                if self.icon.path and os.path.exists(self.icon.path):
                    # saveBase64ToFile(self.icon_base64, self.icon.path)
                    with open(self.icon.path, "wb") as image_file:
                        image_file.write(base64.b64decode(self.icon_base64))
            else:
                current_dir = os.getcwd()
                os.chdir(settings.MEDIA_ROOT)
                # today = date.today()
                # year = today.strftime("%Y")
                # month = today.strftime("%m")
                # day = today.strftime("%d")
                # tmp_file = str('app-icons/%s/%s/%s/temp-%s.jpg' % (year, month, day, gen_image_id(12)))
                # saveBase64ToFile(self.icon_base64, tmp_file)
                #
                # tmp_file = str('temp-%s.jpg' % (gen_image_id(12)))
                # with open(tmp_file, "wb") as temp_file:
                #     temp_file.write(base64.b64decode(self.icon_base64))
                # self.icon = DjFile(open(tmp_file, "rb"))
                # try:
                #     os.system('rm -f %s' % tmp_file)
                # except Exception as xx:
                #     print(str(xx))
        super(AllApp, self).save()
        update_allapps()


class AllView(models.Model):
    class Meta:
        verbose_name = _("Danh Sách View (django)")
        verbose_name_plural = _("Danh Sách View (django)")

    name = models.CharField(max_length=64,
                            editable=True,
                            null=True,
                            unique=True)
    uuid = models.UUIDField(default=UUID4,
                            max_length=64,
                            unique=True,
                            editable=True)

    short_name = models.CharField(max_length=64, editable=True, null=True, unique=False)
    pattern = models.CharField(max_length=2000, editable=True, null=True, blank=True, unique=False)
    icon = models.ImageField(upload_to='app-icons/%Y/%m/%d/',
                             max_length=2000,
                             null=True,
                             blank=True)
    icon_base64 = models.TextField(max_length=2000,
                                   null=True,
                                   blank=True,
                                   help_text='Base64 for icon image. When saved, if icon_base64 is null or blank and icon file'
                                             'existing, it will be created automatically.')
    active = models.BooleanField(default=True, null=False)
    is_product = models.BooleanField(default=True, null=False)
    staff_only = models.BooleanField(default=True, null=False)
    admin_only = models.BooleanField(default=True, null=False)
    order = models.PositiveIntegerField(default=0)
    demo_mode = models.BooleanField(default=False, null=False)
    updated_at = models.DateTimeField(default=djnow)
    created_at = models.DateTimeField(default=djnow, editable=False)
    class Template:
        # hiển thị chi tiết

        configs = [
            {
                'template_listviews': False,
                'is_add_new': True,
            },
        ]
        dActions = [
            'detail',
            'edit',
            'delete',
        ]
        fieldsets = [
            {
                'title': "Thông tin",
                'attrs': (),
            },
            ('name','short_name',),
            ('url','href_target',),
            ('icon',),
            ('active',),
            ('is_product',),
            ('staff_only',),
            ('admin_only',),
            ('order',),

        ]

        required_field = [
        ]
        in_form_buttons = [

        ]
        currency_fields = [

        ]
        list_actions = [

        ]
        # hiển thị trên bảng
        list_fields = [
            'name',
            'url',
            'order',
            'href_target',
            'active',
            'is_product',
            'staff_only',
            'admin_only',
        ]
        # hiển thị trên bảng thêm mới
        inline_fields = [
             'name',
            'url',
            'order',
            'href_target',
            'active',
            'is_product',
            'staff_only',
            'admin_only',
        ]
        # các trường thông tin search
        search_fields = [
            'name',
        ]
        # các trường thông tin filter
        filter_fields = [
             'name',
            'url',
            'href_target',
        ]
        # endclasstemplate
    def __str__(self):
        return self.name

    def fullname(self):
        module = self.__class__.__module__
        if module is None or module == str.__class__.__module__:
            return self.__class__.__name__  # Avoid reporting __builtin__
        else:
            return module + '.' + self.__class__.__name__

    def save(self, *args, **kwargs):
        self.updated_at = djnow()
        if self.uuid is None:
            self.uuid = UUID4()
        super(AllView, self).save()


class AdminMenuGroup(models.Model):
    class Meta:
        verbose_name = _("Nhóm Admin Menu")
        verbose_name_plural = _("Nhóm Admin Menu")

    name = models.CharField(max_length=64, editable=True, null=True)
    uuid = models.UUIDField(default=UUID4,
                            max_length=64,
                            unique=True,
                            editable=True)
    title = models.CharField(max_length=64, editable=True, null=True)
    icon_class = models.CharField(max_length=256, editable=True, null=True,
                                  blank=True)  # https://fontawesome.com/icons/
    desc = models.TextField(null=True, blank=True)
    order = models.PositiveIntegerField(default=0)
    active = models.BooleanField(default=True, null=False)
    is_base = models.BooleanField(default=True, null=False)
    staff_only = models.BooleanField(default=False, null=False)
    superuser_only = models.BooleanField(default=False, null=False)
    app = models.ForeignKey(AllApp,
                            on_delete=models.SET_NULL,
                            to_field='uuid',
                            null=True,
                            blank=True)
    # related_apps = models.ManyToManyField(AllApp, related_name='%(app_label)s_%(class)s_AdminMenuRelation',default=None, blank=True)
    related_apps = models.ForeignKey(AllApp,
                                     # to_field='uuid',
                                     related_name='%(app_label)s_%(class)s_%(class)s_related_apps_uuid',
                                     on_delete=models.SET_NULL,
                                     null=True,
                                     blank=True)
    updated_at = models.DateTimeField(default=djnow)
    created_at = models.DateTimeField(default=djnow, editable=False)

    def count_menu(self, request=None):
        if not request or not request.user:
            return AllAdminMenu.objects.filter(Q(menu_group=self)
                                               & Q(parent_menu=None)
                                               & Q(active=True)
                                               & ~Q(staff_only=True)
                                               & ~Q(superuser_only=True)).count()
        elif request and request.user:
            if request.user.is_superuser:
                return AllAdminMenu.objects.filter(Q(menu_group=self)
                                                   & Q(parent_menu=None)).count()
            elif request.user.is_staff:
                return AllAdminMenu.objects.filter(Q(menu_group=self)
                                                   & Q(active=True)
                                                   & Q(parent_menu=None)
                                                   & ~Q(superuser_only=True)).count()
            else:
                return AllAdminMenu.objects.filter(Q(menu_group=self)
                                                   & Q(parent_menu=None)
                                                   & Q(active=True)
                                                   & ~Q(staff_only=True)
                                                   & ~Q(superuser_only=True)).count()
    class Template:
        # hiển thị chi tiết

        configs = [
            {
                'template_listviews': False,
                'is_add_new': True,
            },
        ]
        dActions = [
            'detail',
            'edit',
            'delete',
        ]
        fieldsets = [
            {
                'title': "Thông tin",
                'attrs': (),
            },
            ('name','title',),
            ('icon_class',),
            ('active','related_apps',),
            ('is_product',),
            ('staff_only',),
            ('superuser_only',),
            ('order',),

        ]

        required_field = [
        ]
        in_form_buttons = [

        ]
        currency_fields = [

        ]
        list_actions = [

        ]
        # hiển thị trên bảng
        list_fields = [
            'name',
            'order',
            'active',
            'related_apps',
            'is_product',
            'staff_only',
            'superuser_only',
        ]
        # hiển thị trên bảng thêm mới
        inline_fields = [
             'name',
            'order',
            'active',
            'related_apps',
            'is_product',
            'staff_only',
            'superuser_only',
        ]
        # các trường thông tin search
        search_fields = [
            'name',
        ]
        # các trường thông tin filter
        filter_fields = [
             'name',
            'url',
            'href_target',
        ]
        # endclasstemplate
    def __str__(self):
        return self.name

    def fullname(self):
        module = self.__class__.__module__
        if module is None or module == str.__class__.__module__:
            return self.__class__.__name__  # Avoid reporting __builtin__
        else:
            return module + '.' + self.__class__.__name__

    def save(self, *args, **kwargs):
        self.updated_at = djnow()
        if self.uuid is None:
            self.uuid = UUID4()
        # if not self.related_apps_uuid and self.related_apps:
        #     self.related_apps_uuid = self.related_apps
        if self.title is None or str(self.title).strip() == "":
            self.title = self.name
        super(AdminMenuGroup, self).save()
        update_adminmenugroup()

    def icon_preview(self, *args, **kwargs):
        return format_html('<i class="%s"></i>' % self.icon_class)

    def regen_uuid(self, *args, **kwargs):
        self.uuid = UUID4()
        sleep(0.5)
        self.updated_at = djnow()
        super(AdminMenuGroup, self).save()

    def menus(self):
        result = AllAdminMenu.objects.filter(menu_group=self,
                                             active=True,
                                             parent_menu=None,
                                             in_main_menu=True).order_by('order')
        return result

    def menus_list(self):
        html_string = str("""
        <ul>
        """)
        menus = self.menus()
        if menus:
            for mn in menus:
                html_string += str(f"""
                <li>{mn.title}</li>
                """)
        html_string += str("""
        </ul>
        """)
        return format_html(html_string)

class AllAdminMenu(models.Model):
    class Meta:
        verbose_name = _("Admin Menu")
        verbose_name_plural = _("Admin Menu")

    name = models.CharField(max_length=64,
                            unique=True,
                            editable=True,
                            null=True)
    uuid = models.UUIDField(default=UUID4,
                            max_length=64,
                            unique=True,
                            editable=True)
    title = models.CharField(max_length=64, editable=True, null=True)
    icon_class = models.CharField(max_length=256,
                                  help_text=_('https://fontawesome.com/icons/'),
                                  editable=True, null=True,
                                  blank=True)  # https://fontawesome.com/icons/
    data_feather = models.CharField(max_length=256,
                                    editable=True,
                                    null=True,
                                    blank=True,
                                    help_text=_("https://feathericons.com/"),
                                    )  # https://feathericons.com/
    url = models.CharField(max_length=1024, editable=True, unique=False)
    icon = models.ImageField(upload_to='icons/%Y/%m/%d/',
                             max_length=2000,
                             null=True,
                             blank=True)
    icon_base64 = models.TextField(max_length=2000,
                                   null=True,
                                   blank=True,
                                   help_text='Base64 for icon image. When saved, if icon_base64 is null or blank and icon file'
                                             'existing, it will be created automatically.')
    desc = models.TextField(null=True, blank=True)
    order = models.PositiveIntegerField(default=0)
    in_main_menu = models.BooleanField(default=True, null=False)
    # menu_group = models.ForeignKey(AdminMenuGroup,
    #                                on_delete=models.SET_DEFAULT,
    #                                default=1,
    #                                null=False,
    #                                blank=True)
    menu_group = models.ForeignKey(AdminMenuGroup,
                                   on_delete=models.SET_NULL,
                                   related_name='%(app_label)s_%(class)s_%(class)s_menu_group_uuid',
                                   to_field='uuid',
                                   null=True,
                                   blank=True)
    # parent_menu = models.ForeignKey("self",
    #                                 on_delete=models.SET_DEFAULT,
    #                                 default=None,
    #                                 null=True,
    #                                 blank=True)
    parent_menu = models.ForeignKey("self",
                                    on_delete=models.SET_DEFAULT,
                                    default=None,
                                    to_field="uuid",
                                    related_name='%(app_label)s_%(class)s_%(class)s_parent_menu_uuid',
                                    null=True,
                                    blank=True)
    login_redirect = models.BooleanField(default=False,
                                         null=True,
                                         blank=True,
                                         help_text='Redirect to this link after login...')
    active = models.BooleanField(default=True, null=False)
    staff_only = models.BooleanField(default=False, null=False)
    superuser_only = models.BooleanField(default=False, null=False)
    split_marked = models.BooleanField(default=False, null=False)
    split_label = models.CharField(max_length=64, editable=True, null=True, blank=True)
    updated_at = models.DateTimeField(default=djnow)
    created_at = models.DateTimeField(default=djnow, editable=False)
    tracker = FieldTracker()
    class Template:
        # hiển thị chi tiết

        configs = [
            {
                'template_listviews': False,
                'is_add_new': True,
            },
        ]
        dActions = [
            'detail',
            'edit',
            'delete',
        ]
        fieldsets = [
            {
                'title': "Thông tin",
                'attrs': (),
            },
            ('name','title',),
            ('icon_class','data_feather',),
            ('active','related_apps',),
            ('desc','in_main_menu','order',),
            ('menu_group','parent_menu',),
            ('login_redirect',),
             ('active',),
            ('superuser_only','staff_only',),
        ]

        required_field = [
        ]
        in_form_buttons = [

        ]
        currency_fields = [

        ]
        list_actions = [

        ]
        # hiển thị trên bảng
        list_fields = [
            'name',
            'title',
            'icon_class',
            'data_feather',
            'active',
            'related_apps',
            'desc',
            'in_main_menu',
            'order',
            'menu_group',
            'parent_menu',
            'login_redirect',
            'active',
            'superuser_only',
            'staff_only',
        ]
        # hiển thị trên bảng thêm mới
        inline_fields = [
            'name',
            'title',
            'icon_class',
            'data_feather',
            'active',
            'related_apps',
            'desc',
            'in_main_menu',
            'order',
            'menu_group',
            'parent_menu',
            'login_redirect',
            'active',
            'superuser_only',
            'staff_only',
        ]
        # các trường thông tin search
        search_fields = [
             'name',
            'title',
        ]
        # các trường thông tin filter
        filter_fields = [
             'name',
            'title',
            'related_apps',
            'in_main_menu',
            'menu_group',
            'parent_menu',
        ]
        # endclasstemplate
    def __str__(self, *args, **kwargs):
        if self.parent_menu:
            if self.parent_menu.parent_menu:
                return str(f"[{self.parent_menu.parent_menu.name}] [{self.parent_menu.name}] {self.name}")
            else:
                return str(f"[{self.parent_menu.name}] {self.name}")
        else:
            return str(f"{self.name}")

    def fullname(self, *args, **kwargs):
        module = self.__class__.__module__
        if module is None or module == str.__class__.__module__:
            return self.__class__.__name__  # Avoid reporting __builtin__
        else:
            return module + '.' + self.__class__.__name__

    def save(self, *args, **kwargs):
        self.updated_at = djnow()
        if self.uuid is None:
            self.uuid = UUID4()
        # if not self.menu_group_uuid and self.menu_group:
        #     try:
        #         self.menu_group_uuid = self.menu_group
        #     except Exception as xx:
        #         print('Can not create menu_group_uuid (AllAdminMenu): %s ERROR: %s' % (self.uuid, str(xx)))
        # if not self.parent_menu_uuid and self.parent_menu:
        #     try:
        #         self.parent_menu_uuid = self.parent_menu
        #     except Exception as xx:
        #         print('Can not create parent_menu_uuid (AllAdminMenu): %s ERROR: %s' % (self.uuid, str(xx)))
        if self.tracker.has_changed('login_redirect') and self.login_redirect is True:
            # select all other active items
            qs = type(self).objects.filter(login_redirect=True)
            # except self (if self already exists)
            if self.pk:
                qs = qs.exclude(pk=self.pk)
            # and deactive them
            qs.update(login_redirect=False)
        if self.title is None or str(self.title).strip() == "":
            self.title = self.name
        super(AllAdminMenu, self).save()
        update_adminmenu()

    def icon_preview(self, *args, **kwargs):
        return format_html('<i class="%s"></i>' % self.icon_class)

    def regen_uuid(self, *args, **kwargs):
        self.uuid = UUID4()
        sleep(0.5)
        self.updated_at = djnow()
        super(AllAdminMenu, self).save()

    def sub_menus(self):
        result = AllAdminMenu.objects.filter(parent_menu=self,
                                             active=True).order_by('order')
        return result

    def sub_menus_list(self):
        html_string = str("""
        <ul>
        """)
        sub_menus = self.sub_menus()
        if sub_menus:
            for mn in self.sub_menus():
                html_string += str(f"""
                <li>{mn.title}</li>
                """)
        html_string += str("""
        </ul>
        """)
        return format_html(html_string)

class Position(models.Model):
    class Meta:
        verbose_name = _("Vị trí hiển thị")
        verbose_name_plural = _("Vị trí hiển thị")

    name = models.CharField(max_length=32, editable=True, null=True)
    uuid = models.UUIDField(default=UUID4,
                            max_length=64,
                            unique=True,
                            editable=True)

    desc = models.TextField(null=True, blank=True, default=None)
    css = models.TextField(null=True, blank=True, default=None)
    order = models.PositiveIntegerField(default=0)
    active = models.BooleanField(default=True, null=False)
    updated_at = models.DateTimeField(default=djnow)
    created_at = models.DateTimeField(default=djnow, editable=False)
    class Template:
        # hiển thị chi tiết

        configs = [
            {
                'template_listviews': False,
                'is_add_new': True,
            },
        ]
        dActions = [
            'detail',
            'edit',
            'delete',
        ]
        fieldsets = [
            {
                'title': "Thông tin",
                'attrs': (),
            },
            ('name',),
            ('css',),
            ('desc','order',),
             ('active',),
        ]

        required_field = [
        ]
        in_form_buttons = [

        ]
        currency_fields = [

        ]
        list_actions = [

        ]
        # hiển thị trên bảng
        list_fields = [
             'name',
            'css',
            'desc',
            'order',
            'active',
        ]
        # hiển thị trên bảng thêm mới
        inline_fields = [
            'name',
            'css',
            'desc',
            'order',
            'active',
        ]
        # các trường thông tin search
        search_fields = [
             'name',
            'title',
        ]
        # các trường thông tin filter
        filter_fields = [
             'name',
        ]
        # endclasstemplate

    def __str__(self):
        return self.name

    def fullname(self):
        module = self.__class__.__module__
        if module is None or module == str.__class__.__module__:
            return self.__class__.__name__  # Avoid reporting __builtin__
        else:
            return module + '.' + self.__class__.__name__

    def save(self, *args, **kwargs):
        self.updated_at = djnow()
        if self.uuid is None:
            self.uuid = UUID4()
        super(Position, self).save()


class FooterItem(models.Model):
    class Meta:
        verbose_name = _("FooterItem")
        verbose_name_plural = _("FooterItem")

    name = models.CharField(max_length=32, editable=True, null=True)
    uuid = models.UUIDField(default=UUID4,
                            unique=True,
                            max_length=64,
                            editable=True)

    desc = models.TextField(null=True, blank=True, default=None)
    html_code = models.TextField(null=True, blank=True, default=None)
    css_code = models.TextField(null=True, blank=True, default=None)
    js_code = models.TextField(null=True, blank=True, default=None)
    order = models.PositiveIntegerField(default=0)
    position = models.ForeignKey(Position,
                                 on_delete=models.CASCADE,
                                 null=True,
                                 blank=True,
                                 to_field="uuid")
    active = models.BooleanField(default=True, null=False)
    updated_at = models.DateTimeField(default=djnow)
    created_at = models.DateTimeField(default=djnow, editable=False)
    class Template:
        # hiển thị chi tiết

        configs = [
            {
                'template_listviews': False,
                'is_add_new': True,
            },
        ]
        dActions = [
            'detail',
            'edit',
            'delete',
        ]
        fieldsets = [
            {
                'title': "Thông tin",
                'attrs': (),
            },
            ('name',),
            ('css',),
            ('desc','order',),
             ('active',),
        ]

        required_field = [
        ]
        in_form_buttons = [

        ]
        currency_fields = [

        ]
        list_actions = [

        ]
        # hiển thị trên bảng
        list_fields = [
             'name',
            'css',
            'desc',
            'order',
            'active',
        ]
        # hiển thị trên bảng thêm mới
        inline_fields = [
            'name',
            'css',
            'desc',
            'order',
            'active',
        ]
        # các trường thông tin search
        search_fields = [
             'name',
            'title',
        ]
        # các trường thông tin filter
        filter_fields = [
             'name',
        ]
        # endclasstemplate

    def __str__(self):
        return self.name

    def fullname(self):
        module = self.__class__.__module__
        if module is None or module == str.__class__.__module__:
            return self.__class__.__name__  # Avoid reporting __builtin__
        else:
            return module + '.' + self.__class__.__name__

    def save(self, *args, **kwargs):
        self.updated_at = djnow()
        if self.uuid is None:
            self.uuid = UUID4()
        super(FooterItem, self).save()


class Widget(models.Model):
    class Meta:
        verbose_name = _("Widget")
        verbose_name_plural = _("Widget")

    name = models.CharField(max_length=32, editable=True, null=True)
    uuid = models.UUIDField(default=UUID4,
                            max_length=64,
                            unique=True,
                            editable=True)

    title = models.CharField(max_length=64, editable=True, unique=False, null=True, blank=True)
    url = models.CharField(max_length=1024, editable=True, unique=False, null=True, blank=True)
    desc = models.TextField(null=True, blank=True)
    html_code = models.TextField(null=True, blank=True)
    css_code = models.TextField(null=True, blank=True)
    js_code = models.TextField(null=True, blank=True)
    position = models.ForeignKey(Position,
                                 on_delete=models.CASCADE,
                                 null=True,
                                 blank=True,
                                 to_field='uuid',
                                 default=None)
    order = models.PositiveIntegerField(default=0)
    active = models.BooleanField(default=True, null=False)
    updated_at = models.DateTimeField(default=djnow)
    created_at = models.DateTimeField(default=djnow, editable=False)
    class Template:
        # hiển thị chi tiết

        configs = [
            {
                'template_listviews': False,
                'is_add_new': True,
            },
        ]
        dActions = [
            'detail',
            'edit',
            'delete',
        ]
        fieldsets = [
            {
                'title': "Thông tin",
                'attrs': (),
            },
            ('name','title',),
            ('url',),
            ('desc','html_code','css_code',),
             ('js_code','css_code',),
             ('position','order','active'),
        ]

        required_field = [
        ]
        in_form_buttons = [

        ]
        currency_fields = [

        ]
        list_actions = [

        ]
        # hiển thị trên bảng
        list_fields = [
            'name',
            'title',
            'url',
            'desc',
            'html_code',
            'css_code',
             'js_code',
             'css_code',
             'position',
             'order',
             'active'
        ]
        # hiển thị trên bảng thêm mới
        inline_fields = [
            'name',
            'title',
            'url',
            'desc',
            'html_code',
            'css_code',
             'js_code',
             'css_code',
             'position',
             'order',
             'active'
        ]
        # các trường thông tin search
        search_fields = [
             'name',
            'title',
            'url',
            'desc',
            'html_code',
            'css_code',
             'js_code',
             'css_code',
             'order',
             'active'
        ]
        # các trường thông tin filter
        filter_fields = [
             'name',
        ]
        # endclasstemplate
    def __str__(self):
        return self.name

    def fullname(self):
        module = self.__class__.__module__
        if module is None or module == str.__class__.__module__:
            return self.__class__.__name__  # Avoid reporting __builtin__
        else:
            return module + '.' + self.__class__.__name__

    def save(self, *args, **kwargs):
        self.updated_at = djnow()
        if self.uuid is None:
            self.uuid = UUID4()
        super(Widget, self).save()


class TimeZone(models.Model):
    class Meta:
        verbose_name = _("TimeZone")
        verbose_name_plural = _("TimeZone")

    name = models.CharField(max_length=64, editable=False, null=True, blank=True)

    class Meta:
        managed = False
        db_table = "website_timezones"

    def __str__(self):
        return self.name


class AlertMessage():
    def __init__(self, level=None, message=None):
        if level is not None:
            self.level = level
        else:
            self.level = 'info'
        if message is not None:
            self.message = message
        else:
            self.message = ""


class PageInfo(models.Model):
    class Meta:
        verbose_name = _("PageInfo")
        verbose_name_plural = _("Pages Info")

    name = models.CharField(max_length=128,
                            editable=False,
                            unique=True,
                            null=True)
    uuid = models.UUIDField(default=UUID4,
                            max_length=64,
                            unique=True,
                            editable=True)
    title = models.TextField(max_length=70, null=True, blank=True)
    charset = models.CharField(max_length=32, editable=True, default="UTF-8")
    # timezone = models.ForeignKey(TimeZone, on_delete=models.CASCADE, null=True, blank=True)
    header = models.TextField(null=True, blank=True)
    desc = models.TextField(max_length=160, null=True, blank=True)
    meta_description = models.TextField(max_length=160, null=True, blank=True)
    meta_keywords = models.TextField(null=True, blank=True)
    active = models.BooleanField(default=True)
    updated_at = models.DateTimeField(default=djnow)
    created_at = models.DateTimeField(default=djnow, editable=False)
    class Template:
        # hiển thị chi tiết

        configs = [
            {
                'template_listviews': False,
                'is_add_new': True,
            },
        ]
        dActions = [
            'detail',
            'edit',
            'delete',
        ]
        fieldsets = [
            {
                'title': "Thông tin",
                'attrs': (),
            },
            ('name','title',),
            ('charset',),
            ('desc','header',),
             ('meta_description','meta_keywords',),
             ('active'),
        ]

        required_field = [
        ]
        in_form_buttons = [

        ]
        currency_fields = [

        ]
        list_actions = [

        ]
        # hiển thị trên bảng
        list_fields = [
            'name',
            'title',
            'charset',
            'desc',
            'header',
             'meta_description',
             'meta_keywords',
             'active',
        ]
        # hiển thị trên bảng thêm mới
        inline_fields = [
            'name',
            'title',
            'charset',
            'desc',
            'header',
             'meta_description',
             'meta_keywords',
             'active',
        ]
        # các trường thông tin search
        search_fields = [
            'name',
            'title',
            'charset',
            'desc',
            'header',
             'meta_description',
        ]
        # các trường thông tin filter
        filter_fields = [
             'name',
        ]
        # endclasstemplate
    def __str__(self):
        return self.name

    def fullname(self):
        module = self.__class__.__module__
        if module is None or module == str.__class__.__module__:
            return self.__class__.__name__  # Avoid reporting __builtin__
        else:
            return module + '.' + self.__class__.__name__

    def save(self, *args, **kwargs):
        if self.uuid is None:
            self.uuid = UUID4()
        if self.active:
            # select all other active items
            qs = type(self).objects.filter(active=True)
            # except self (if self already exists)
            if self.pk:
                qs = qs.exclude(pk=self.pk)
            # and deactive them
            qs.update(active=False)
        super(PageInfo, self).save()
        update_allpageinfos()


class BotUA(models.Model):
    class Meta:
        verbose_name = _("BotUA")
        verbose_name_plural = _("BotUA")

    name = models.CharField(max_length=1024, editable=True, null=True)
    uuid = models.UUIDField(default=UUID4,
                            max_length=64,
                            unique=True,
                            editable=True)
    active = models.BooleanField(default=True)
    updated_at = models.DateTimeField(default=djnow)
    created_at = models.DateTimeField(default=djnow, editable=False)
    class Template:
        # hiển thị chi tiết

        configs = [
            {
                'template_listviews': False,
                'is_add_new': True,
            },
        ]
        dActions = [
            'detail',
            'edit',
            'delete',
        ]
        fieldsets = [
            {
                'title': "Thông tin",
                'attrs': (),
            },
            ('name',),
             ('active'),
        ]

        required_field = [
        ]
        in_form_buttons = [

        ]
        currency_fields = [

        ]
        list_actions = [

        ]
        # hiển thị trên bảng
        list_fields = [
            'name',
             'active',
        ]
        # hiển thị trên bảng thêm mới
        inline_fields = [
            'name',
             'active',
        ]
        # các trường thông tin search
        search_fields = [
            'name',
             'active',
        ]
        # các trường thông tin filter
        filter_fields = [
             'name',
        ]
        # endclasstemplate
    def __str__(self):
        return self.name

    def fullname(self):
        module = self.__class__.__module__
        if module is None or module == str.__class__.__module__:
            return self.__class__.__name__  # Avoid reporting __builtin__
        else:
            return module + '.' + self.__class__.__name__

    def save(self, *args, **kwargs):
        self.updated_at = djnow()
        if self.uuid is None:
            self.uuid = UUID4()
        super(BotUA, self).save()


class RobotsArg(models.Model):
    class Meta:
        verbose_name = _("RobotsArg")
        verbose_name_plural = _("RobotsArg")

    name = models.CharField(max_length=32, editable=True, null=True)
    uuid = models.UUIDField(default=UUID4,
                            max_length=64,
                            unique=True,
                            editable=True)
    value = models.TextField(max_length=2000, null=True, blank=True)
    ua = models.ForeignKey(BotUA, on_delete=models.CASCADE, null=True, blank=True)
    active = models.BooleanField(default=True)
    updated_at = models.DateTimeField(default=djnow)
    created_at = models.DateTimeField(default=djnow, editable=False)
    class Template:
        # hiển thị chi tiết

        configs = [
            {
                'template_listviews': False,
                'is_add_new': True,
            },
        ]
        dActions = [
            'detail',
            'edit',
            'delete',
        ]
        fieldsets = [
            {
                'title': "Thông tin",
                'attrs': (),
            },
            ('name','value',),
            ('ua',),
             ('active'),
        ]

        required_field = [
        ]
        in_form_buttons = [

        ]
        currency_fields = [

        ]
        list_actions = [

        ]
        # hiển thị trên bảng
        list_fields = [
            'name',
            'value',
            'ua',
             'active',
        ]
        # hiển thị trên bảng thêm mới
        inline_fields = [
            'name',
             'active',
        ]
        # các trường thông tin search
        search_fields = [
            'name',
             'value',
            'ua',
             'active',
        ]
        # các trường thông tin filter
        filter_fields = [
             'name',
        ]
        # endclasstemplate
    def __str__(self):
        return self.name

    def fullname(self):
        module = self.__class__.__module__
        if module is None or module == str.__class__.__module__:
            return self.__class__.__name__  # Avoid reporting __builtin__
        else:
            return module + '.' + self.__class__.__name__

    def save(self, *args, **kwargs):
        self.updated_at = djnow()
        if self.uuid is None:
            self.uuid = UUID4()
        super(RobotsArg, self).save()


SUPER_ALL_ADMIN_MENUGROUP = []
STAFF_ALL_ADMIN_MENUGROUP = []
NORMAL_ALL_ADMIN_MENUGROUP = []
GUEST_ALL_ADMIN_MENUGROUP = []


def update_adminmenugroup():
    global SUPER_ALL_ADMIN_MENUGROUP
    global STAFF_ALL_ADMIN_MENUGROUP
    global NORMAL_ALL_ADMIN_MENUGROUP
    global GUEST_ALL_ADMIN_MENUGROUP
    try:
        # SUPER_ALL_ADMIN_MENUGROUP = []

        # ALL_MENUGROUP_LIST = AdminMenuGroup.objects.filter(Q(active=True)).order_by('order').values()

        for temp in AdminMenuGroup.objects.filter(Q(active=True)).order_by('order'):
            temp2 = temp.__dict__
            menus = temp.menus()
            temp2['menus'] = []
            for mn in list(menus):
                temp2['menus'].append(mn.__dict__)

            for menu in temp2['menus']:
                menu_obj = menus.filter(uuid=menu['uuid']).first()
                if menu_obj != None:
                    menu['sub_menus'] = []
                    for sub_menu in menu_obj.sub_menus():
                        menu['sub_menus'].append(sub_menu.__dict__)
            SUPER_ALL_ADMIN_MENUGROUP.append(temp2)
        # ##################
        # STAFF_ALL_ADMIN_MENUGROUP = AdminMenuGroup.objects.filter(Q(active=True)
        #                                                           & ~Q(superuser_only=True)).order_by('order').values()

        
        
        for temp in AdminMenuGroup.objects.filter(Q(active=True)
                                                                  & ~Q(superuser_only=True)).order_by('order'):
            temp2 = temp.__dict__
            menus = temp.menus()
            temp2['menus'] = []
            for mn in list(menus):
                temp2['menus'].append(mn.__dict__)

            for menu in temp2['menus']:
                menu_obj = menus.filter(uuid=menu['uuid']).first()
                if menu_obj != None:
                    menu['sub_menus'] = []
                    for sub_menu in menu_obj.sub_menus():
                        menu['sub_menus'].append(sub_menu.__dict__)
            STAFF_ALL_ADMIN_MENUGROUP.append(temp2)
        ##################
        # NORMAL_ALL_ADMIN_MENUGROUP = AdminMenuGroup.objects.filter(Q(active=True)
        #                                                            & ~Q(staff_only=True)
        #                                                            & ~Q(superuser_only=True)).order_by('order').values()

        
        for temp in AdminMenuGroup.objects.filter(Q(active=True)
                                                & ~Q(staff_only=True)
                                                & ~Q(superuser_only=True)).order_by('order'):
            temp2 = temp.__dict__
            menus = temp.menus()
            temp2['menus'] = []
            for mn in list(menus):
                temp2['menus'].append(mn.__dict__)

            for menu in temp2['menus']:
                menu_obj = menus.filter(uuid=menu['uuid']).first()
                if menu_obj != None:
                    menu['sub_menus'] = []
                    for sub_menu in menu_obj.sub_menus():
                        menu['sub_menus'].append(sub_menu.__dict__)
            NORMAL_ALL_ADMIN_MENUGROUP.append(temp2)
        ###################
        # GUEST_ALL_ADMIN_MENUGROUP = AdminMenuGroup.objects.filter(Q(active=True)
        #                                                           & ~Q(staff_only=True)
        #                                                           & ~Q(superuser_only=True)).order_by('order').values()
        
        for temp in AdminMenuGroup.objects.filter(Q(active=True)
                                                & ~Q(staff_only=True)
                                                & ~Q(superuser_only=True)).order_by('order'):
            temp2 = temp.__dict__
            menus = temp.menus()
            temp2['menus'] = []
            for mn in list(menus):
                temp2['menus'].append(mn.__dict__)

            for menu in temp2['menus']:
                menu_obj = menus.filter(uuid=menu['uuid']).first()
                if menu_obj != None:
                    menu['sub_menus'] = []
                    for sub_menu in menu_obj.sub_menus():
                        menu['sub_menus'].append(sub_menu.__dict__)
            GUEST_ALL_ADMIN_MENUGROUP.append(temp2)
    except Exception as xx:
        msg = str(xx)
        print(msg)
        from Logger.admin import log_write
        log_write(msg=msg, request=None, func_name=_getframe().f_code.co_name)
        pass


SUPER_ALL_MENU_ITEMS = None
SUPER_MAINMENU_ITEMS = None
STAFF_ALL_MENU_ITEMS = None
STAFF_MAINMENU_ITEMS = None
NORMAL_ALL_MENU_ITEMS = None
NORMAL_MAINMENU_ITEMS = None
GUEST_ALL_MENU_ITEMS = None
GUEST_MAINMENU_ITEMS = None


def update_adminmenu():
    global SUPER_ALL_MENU_ITEMS
    global SUPER_MAINMENU_ITEMS
    global STAFF_ALL_MENU_ITEMS
    global STAFF_MAINMENU_ITEMS
    global NORMAL_ALL_MENU_ITEMS
    global NORMAL_MAINMENU_ITEMS
    global GUEST_ALL_MENU_ITEMS
    global GUEST_MAINMENU_ITEMS
    try:
        pass
        # tạm thời comment vì đang không sử dụng
        
        # SUPER_ALL_MENU_ITEMS = AllAdminMenu.objects.filter(Q(active=True)).order_by('order').values()
        # # for temp in SUPER_ALL_MENU_ITEMS:
        # #     temp['menus'] = 
        # SUPER_MAINMENU_ITEMS = AllAdminMenu.objects.filter(Q(active=True)
        #                                                    & Q(in_main_menu=True)).order_by('order').values()

        
        # ##################
        # STAFF_ALL_MENU_ITEMS = AllAdminMenu.objects.filter(Q(active=True)
        #                                                    & ~Q(superuser_only=True)).order_by('order').values()
        # STAFF_MAINMENU_ITEMS = AllAdminMenu.objects.filter(Q(active=True)
        #                                                    & Q(in_main_menu=True)
        #                                                    & ~Q(superuser_only=True)).order_by('order').values()

        # ##################
        # NORMAL_ALL_MENU_ITEMS = AllAdminMenu.objects.filter(Q(active=True)
        #                                                     & ~Q(staff_only=True)
        #                                                     & ~Q(superuser_only=True)).order_by('order').values()
        # NORMAL_MAINMENU_ITEMS = AllAdminMenu.objects.filter(Q(active=True)
        #                                                     & Q(in_main_menu=True)
        #                                                     & ~Q(staff_only=True)
        #                                                     & ~Q(superuser_only=True)).order_by('order').values()
        # ###################
        # GUEST_ALL_MENU_ITEMS = AllAdminMenu.objects.filter(Q(active=True)
        #                                                    & ~Q(staff_only=True)
        #                                                    & ~Q(superuser_only=True)).order_by('order').values()
        # GUEST_MAINMENU_ITEMS = AllAdminMenu.objects.filter(Q(active=True)
        #                                                    & Q(in_main_menu=True)
        #                                                    & ~Q(staff_only=True)
        #                                                    & ~Q(superuser_only=True)).order_by('order').values()
    except Exception as xx:
        msg = str(xx)
        print(msg)
        from Logger.admin import log_write

        log_write(msg=msg, request=None, func_name=_getframe().f_code.co_name)
        pass


SUPER_ALLAPPS = None
STAFF_ALLAPPS = None
NORMAL_ALLAPPS = None
GUEST_ALLAPPS = None


def update_allapps():
    global SUPER_ALLAPPS
    global STAFF_ALLAPPS
    global NORMAL_ALLAPPS
    global GUEST_ALLAPPS
    try:
        SUPER_ALLAPPS = list(AllApp.objects.filter(~Q(url=None)
                                              & ~Q(url="")
                                              & Q(active=True)
                                              & Q(is_product=True)).order_by('order')) #.values()

        ##################
        STAFF_ALLAPPS = AllApp.objects.filter(~Q(url=None)
                                              & ~Q(url="")
                                              & Q(active=True)
                                              & Q(is_product=True)
                                              & ~Q(admin_only=True)).order_by('order').values()
        ##################
        NORMAL_ALLAPPS = AllApp.objects.filter(~Q(url=None)
                                               & ~Q(url="")
                                               & Q(active=True)
                                               & Q(is_product=True)
                                               & ~Q(staff_only=True)
                                               & ~Q(admin_only=True)).order_by('order').values()

        ###################
        GUEST_ALLAPPS = AllApp.objects.filter(~Q(url=None)
                                              & ~Q(url="")
                                              & Q(active=True)
                                              & Q(is_product=True)
                                              & ~Q(staff_only=True)
                                              & ~Q(admin_only=True)).order_by('order').values()

        # Ghi configs vao bien setting:
        for obj in Config.objects.all():
            settings.ALL_CONFIGS[str(obj.name)] = obj.value
    except Exception as xx:
        msg = str(xx)
        print("[update_allapps] %s" % msg)
        from Logger.admin import log_write
        log_write(msg=msg, request=None, func_name=_getframe().f_code.co_name)
        pass


def update_allconfigs():
    try:
        # Ghi configs vao bien setting:
        for obj in Config.objects.all():
            settings.ALL_CONFIGS[str(obj.name)] = obj.value
    except Exception as xx:
        msg = str(xx)
        print(msg)
        print("[update_allconfigs] %s" % msg)

        from Logger.admin import log_write

        log_write(msg=msg, request=None, func_name=_getframe().f_code.co_name)
        pass


ALL_PAGE_INFOS = None


def update_allpageinfos():
    global ALL_PAGE_INFOS
    try:
        ALL_PAGE_INFOS = PageInfo.objects.all()
    except Exception as xx:
        msg = str(xx)
        print(msg)
        print("[update_allpageinfos] " % msg)

        from Logger.admin import log_write

        log_write(msg=msg, request=None, func_name=_getframe().f_code.co_name)
        pass


update_adminmenugroup()
update_adminmenu()
update_allapps()
update_allconfigs()
update_allpageinfos()


class LogoImages(models.Model):
    class Meta:
        verbose_name = _("LogoImages")
        verbose_name_plural = _("LogoImages")

    name = models.CharField(max_length=64,
                            unique=True,
                            editable=True,
                            null=True)
    uuid = models.UUIDField(default=UUID4,
                            max_length=64,
                            unique=True,
                            editable=True)
    file = models.ImageField(upload_to='LogoImages/%Y/%m/%d/',
                             max_length=2000,
                             null=True,
                             blank=True)
    is_favicon = models.BooleanField(default=False,
                                     null=True,
                                     blank=True)
    desc = models.TextField(null=True, blank=True)

    updated_at = models.DateTimeField(default=djnow)
    created_at = models.DateTimeField(default=djnow, editable=False)
    tracker = FieldTracker()
    class Template:
        # hiển thị chi tiết

        configs = [
            {
                'template_listviews': False,
                'is_add_new': True,
            },
        ]
        dActions = [
            'detail',
            'edit',
            'delete',
        ]
        fieldsets = [
            {
                'title': "Thông tin",
                'attrs': (),
            },
            ('name',),
            ('file'),
             ('is_favicon'),
             ('desc'),
        ]

        required_field = [
        ]
        in_form_buttons = [

        ]
        currency_fields = [

        ]
        list_actions = [

        ]
        # hiển thị trên bảng
        list_fields = [
            'name',
            'file',
             'is_favicon',
             'desc',
        ]
        # hiển thị trên bảng thêm mới
        inline_fields = [
            'name',
            'file',
             'is_favicon',
             'desc',
        ]
        # các trường thông tin search
        search_fields = [
            'name',
             'active',
        ]
        # các trường thông tin filter
        filter_fields = [
             'name',
        ]
    # endclasstemplate
    def __str__(self):
        return self.name

    def fullname(self):
        module = self.__class__.__module__
        if module is None or module == str.__class__.__module__:
            return self.__class__.__name__  # Avoid reporting __builtin__
        else:
            return module + '.' + self.__class__.__name__

    def save(self, *args, **kwargs):
        self.updated_at = djnow()
        if self.uuid is None:
            self.uuid = UUID4()
        if self.tracker.has_changed('is_favicon') and self.is_favicon is True:
            # select all other active items
            qs = type(self).objects.filter(is_favicon=True)
            # except self (if self already exists)
            if self.pk:
                qs = qs.exclude(pk=self.pk)
            # and deactive them
            qs.update(is_favicon=False)
        super(LogoImages, self).save()

    def regen_uuid(self, *args, **kwargs):
        self.uuid = UUID4()
        sleep(0.5)
        self.updated_at = djnow()
        super(LogoImages, self).save()
