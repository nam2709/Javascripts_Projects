
class Account(AbstractUser):
    class Meta:
        verbose_name = "Thông tin người dùng"
        verbose_name_plural = "Thông tin người dùng"
    name = models.CharField(max_length=1024, blank=True, null=True)
    uuid = models.UUIDField(default=UUID4,
                            max_length=64,
                            unique=True,
                            null=True,
                            editable=True)
    tndid = models.CharField(default=TNDID, max_length=128,
                             unique=True,
                             editable=True)
    nick_name = models.CharField(max_length=1024, blank=True, null=True)
    username = models.CharField(max_length=1024, blank=True, null=True)
    full_name = models.CharField(max_length=1024, blank=True, null=True)
    email = models.CharField(max_length=1024, blank=True, null=True)
    groups = models.ManyToManyField(Group,
                                    related_name='%(app_label)s_%(class)s_account_groups',
                                    blank=True, )
    user_permissions = models.ManyToManyField(Permission,
                                              related_name='%(app_label)s_%(class)s_account_permissions',
                                              blank=True,
                                              )
    date_of_birth = models.DateField(null=True,
                                     blank=True)
    age = models.IntegerField(blank=True, null=True)
    telephone = models.CharField(max_length=15, blank=True, null=True)
    salt = models.CharField(max_length=5, blank=True, null=True)
    onetime_passwd = models.CharField(max_length=1024, blank=True, null=True)
    avatar = models.ImageField(upload_to='avatar-images/%Y/%m/%d/',
                               default='default/default-avatar.jpg',
                               max_length=4096,
                               null=True,
                               blank=True)
    is_callbot = models.BooleanField(default=False,
                                 null=False,
                                 blank=False)
    callbot_endpoint = models.CharField(max_length=2048,
                                        blank=True,
                                        null=True)
    is_chatbot = models.BooleanField(default=False,
                                 null=False,
                                 blank=False)
    chatbot_endpoint = models.CharField(max_length=2048,
                                        blank=True,
                                        null=True)
    # self.avatar.path
    avatar_base64 = AVA_BASE64
    manager = models.ForeignKey('self', on_delete=models.SET_DEFAULT, default=None, null=True, blank=True)
    log_confirm_by_email = models.BooleanField(default=True, null=False, blank=False)
    logged_with_password = models.BooleanField(default=True, null=False, blank=False)
    created_free_license = models.BooleanField(default=False, null=False, blank=False)
    email_activated = models.BooleanField(default=True, null=False, blank=False)
    website_template = models.ForeignKey(WebsiteTemplate,
                                         on_delete=models.SET_NULL,
                                         null=True,
                                         blank=True)
    language = models.CharField(max_length=10,
                                choices=LANGUAGES,
                                default=LANGUAGE_CODE)
    timezone = models.CharField(max_length=255,
                                choices=TIMEZONES,
                                default=settings.TIME_ZONE)
    app_permissions = models.ManyToManyField(AppPermission, default=None,
                                             blank=True,
                                             related_name='%(app_label)s_%(class)s_account_app_permission')
    signup_ipv4 = CidrAddressField(null=True, blank=True,
                                   default=None)
    signup_at = models.DateTimeField(default=djnow, editable=False)
    last_login_ipv4 = CidrAddressField(null=True, blank=True,
                                       default=None)
    last_login_at = models.DateTimeField(default=djnow, editable=False)
    extend_field = models.ManyToManyField(ExtendInfo, blank=True)
    password = models.CharField(_("password"), max_length=128)
    updated_at = models.DateTimeField(default=djnow, editable=False)
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
                'title': "Thông tin chung",
                'attrs': ('username', 'full_name',),
            },
            '__hr__',
            ('email','telephone',),
            ('date_of_birth', 'password',),
            ('avatar',),
        ]

        required_field = [
            'username',
            'full_name',
            'email',
            'password',
        ]
        in_form_buttons = [

        ]
        currency_fields = [

        ]
        # hiển thị trên bảng
        list_fields = [
            'username',
            'full_name',
            'email',
            'telephone',
            'date_of_birth',
        ]
        # hiển thị trên bảng thêm mới
        inline_fields = [
            'username',
            'full_name',
            'email',
            'telephone',
            'password',
            'date_of_birth',
        ]
        # các trường thông tin search
        search_fields = [
            'full_name',

        ]
        # các trường thông tin filter
        filter_fields = [
            'full_name',
            'created_by',
        ]
        # endclasstemplate

