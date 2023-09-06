import random
import string
from django import forms
from django.contrib.auth.models import Group
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.contrib.auth.forms import ReadOnlyPasswordHashField

from django.contrib import admin
from import_export import resources
from import_export.admin import ImportExportModelAdmin
from import_export.admin import ImportExportActionModelAdmin

from django.utils.html import format_html
from django.urls import path, include
from django.template.response import TemplateResponse
from django.http import HttpResponse, HttpResponseRedirect
# from .models import AppPermission
from django.urls import reverse
from django.utils.translation import gettext_lazy as _

from .admin_actions import *

# admin.site.register(AppPermission)
from .models import *
from .forms import *

'''
class AccountAdmin(GuardedModelAdmin):
    pass

admin.site.register(Account, AccountAdmin)
'''


class UserCreationForm(forms.ModelForm):
    """A form for creating new users. Includes all the required
    fields, plus a repeated password."""
    password1 = forms.CharField(label='Password', widget=forms.PasswordInput)
    password2 = forms.CharField(label='Password confirmation', widget=forms.PasswordInput)

    class Meta:
        model = Account
        # fields = ('email', 'date_of_birth')
        fields = ('username',
                  'email',
                  'first_name', 'last_name',
                  'password',
                  'email_activated', 'is_active',

                  'signup_ipv4',
                  'onetime_passwd',
                  'is_staff', 'is_superuser',
                  'salt',
                  'telephone',
                  'age',
                  'tndid',
                  'avatar',
                  'manager',
                  'log_confirm_by_email', 'logged_with_password', 'created_free_license',
                  'website_template',
                  'language', 'timezone',
                  'groups',
                  # 'updated_at', 'created_at',
                  )

    def clean_password2(self):
        # Check that the two password entries match
        password1 = self.cleaned_data.get("password1")
        password2 = self.cleaned_data.get("password2")
        if password1 and password2 and password1 != password2:
            raise forms.ValidationError("Passwords don't match")
        return password2

    def save(self, commit=True):
        # Save the provided password in hashed format
        user = super(UserCreationForm, self).save(commit=False)
        user.set_password(self.cleaned_data["password1"])
        if commit:
            user.save()
        return user



class UserChangeForm(forms.ModelForm):
    """A form for updating users. Includes all the fields on
    the user, but replaces the password field with admin's
    password hash display field.
    """
    password = ReadOnlyPasswordHashField()
    """A form for creating new users. Includes all the required
    fields, plus a repeated password."""
    password1 = forms.CharField(label='Password', widget=forms.PasswordInput)
    password2 = forms.CharField(label='Password confirmation', widget=forms.PasswordInput)

    class Meta:
        model = Account
        # fields = ('email', 'password', 'date_of_birth', 'is_active', 'is_admin')
        fields = ('username',
                  'email',
                  'first_name', 'last_name',
                  'password',
                  # ('password1', 'password2'),
                  'email_activated', 'is_active',
                  'signup_ipv4',
                  'onetime_passwd',
                  'is_staff', 'is_superuser',
                  'salt',
                  'telephone',
                  'age',
                  'tndid',
                  'avatar',
                  'manager',
                  'log_confirm_by_email', 'logged_with_password', 'created_free_license',
                  'website_template',
                  'language', 'timezone',
                  'groups',
                  # 'updated_at', 'created_at',
                  )

    def clean_password(self):
        # Regardless of what the user provides, return the initial value.
        # This is done here, rather than on the field, because the
        # field does not have access to the initial value
        return self.initial["password"]

    def clean_password2(self):
        # Check that the two password entries match
        password1 = self.cleaned_data.get("password1")
        password2 = self.cleaned_data.get("password2")
        if password1 and password2 and password1 != password2:
            raise forms.ValidationError("Passwords don't match")
        return password2

    def save(self, commit=True):
        # Save the provided password in hashed format
        user = super(UserChangeForm, self).save(commit=False)
        user.set_password(self.cleaned_data["password1"])
        if commit:
            user.save()
        return user


class AccountResource(resources.ModelResource):
    class Meta:
        model = Account


class AccountImportAdmin(ImportExportActionModelAdmin):
    resource_class = AccountResource
#
# class BookAdmin(ImportExportActionModelAdmin):
#     pass

class AccountAdmin(BaseUserAdmin):
    class Meta:
        model = AccountImportAdmin
    class Media:
        js = (
            'Workspace/admin/fontawesome/js/all.js',
            'Workspace/admin/js/jquery-3.5.1.min.js',
            'Workspace/admin/js/popper.min.js',
            'Workspace/admin/js/bootstrap.min.js',
            # 'Workspace/admin/js/r.js',

            'Workspace/admin/js/axios.min.js',
            'Workspace/admin/js/require.js',

            'Workspace/admin/js/tnd.js',
        )
        css = {
            'all': (
                'Workspace/admin/fontawesome/css/all.css',
                'Workspace/admin/css/bootstrap.min.css',
            )
        }
    # The forms to add and change user instances
    form = UserChangeForm
    add_form = UserCreationForm

    # resource_class = AccountResource
    fieldsets = (
        (None, {
            'classes': ('wide', 'extrapretty',),
            'fields': ('username',
                       'email',
                       ('first_name', 'last_name'),
                       'password',
                       ('password1', 'password2'),
                       ('email_activated', 'is_active',),
                       )
        }),
        ('Advanced options', {
            'classes': ('wide', 'extrapretty'),
            'fields': ('signup_ipv4',
                       'onetime_passwd',
                       ('is_staff', 'is_superuser',),
                       ('log_confirm_by_email', 'logged_with_password', 'created_free_license',),
                       ('groups',),
                       'user_permissions',
                       'salt',
                       'telephone',
                       'age',
                       'tndid',
                       'avatar',
                       'manager',
                       'website_template',
                       ('language', 'timezone',),
                       ('last_login', 'date_joined'),
                       ('updated_at', 'created_at',)
                       ),
        }),
    )
    # add_fieldsets is not a standard ModelAdmin attribute. UserAdmin
    # overrides get_fieldsets to use this attribute when creating a user.
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('username',
                       'email',
                       ('password1', 'password2'),
                       ('is_staff', 'is_superuser',),
                       )}
         ),
    )

    '''
    fields = ('username', 'password', 'signup_ipv4', 'onetime_passwd',
              'is_staff', 'is_superuser', 'is_active', 'salt', 'email', 'telephone',
              'age', 'tndid', 'avatar', 'manager', 'log_confirm_by_email',
              'logged_with_password', 'created_free_license', 'email_activated',
              'website_template', 'language', 'timezone',)
    '''
    readonly_fields = (
        'last_login',
        'date_joined',
        'updated_at',
        'uuid',
        'tndid',
        'signup_at',
        'last_login_at',
        'created_at',
        'account_actions',
    )
    list_display = (
        'username',
        'email',
        'email_activated',
        'is_active',
        'is_superuser',
        'thumbnail',
        'avatar',
        'account_actions',
        'updated_at',
    )
    list_select_related = (
        'manager',
    )
    actions = [
        make_inactive,
        make_active,
        make_is_superuser,
        make_insuperuser,
        make_is_staff,
        make_instaff,
        reset_password
    ]

    def thumbnail(self, obj):
        try:
            return format_html(
                str('<img src="%s" style="width: 130px;                                ">' % obj.avatar.url))
        except Exception as xx:
            try:
                print('Cannot get avatar thumbnail, Error: %s ' % str(xx))
                return format_html('')
            finally:
                xx = None
                del xx

    thumbnail.short_description = 'Image'
    thumbnail.allow_tags = True

    def get_urls(self):
        urls = super().get_urls()
        custom_urls = [
            path(
                '<account_id>/disable/',
                self.admin_site.admin_view(self.disable_account),
                name='account-disable',
            ),
            path(
                '<account_id>/enable/',
                self.admin_site.admin_view(self.enable_account),
                name='account-enable',
            ),
            path(
                '<account_id>/reset-password/',
                self.admin_site.admin_view(self.reset_password),
                name='account-reset-password',
            ),
        ]
        return custom_urls + urls


    def account_actions(self, obj):
        return format_html(
            '<a id="disableBtnId-{}" accountId="{}" class="disable-account-btn button btn btn-primary" href="{}">Disable</a>&nbsp;'
            '<a id="enableBtnId-{}" accountId="{}" class="enable-account-btn button btn btn-primary" href="{}">Enable</a>&nbsp;'
            '<a id="resetPasswordBtnId-{}" accountId="{}" class="reset-password-btn button btn btn-primary" href="{}">Reset Email</a>',
            str(obj.pk), str(obj.pk),
            reverse('admin:account-disable', args=[obj.pk]),
            str(obj.pk), str(obj.pk),
            reverse('admin:account-enable', args=[obj.pk]),
            str(obj.pk), str(obj.pk),
            reverse('admin:account-reset-password', args=[obj.pk]),
        )

    account_actions.short_description = _('Account Actions')
    account_actions.allow_tags = True

    # @admin.action(description=_('Mark selected as disabled'))
    def disable_account(self, request, account_id, *args, **kwargs):
        return self.process_action(
            request=request,
            account_id=account_id,
            action_form=DisableForm,
            action_title='Disable',
        )
    def enable_account(self, request, account_id, *args, **kwargs):
        return self.process_action(
            request=request,
            account_id=account_id,
            action_form=EnableForm,
            action_title='Enable',
        )

    def reset_password(self, request, account_id, *args, **kwargs):
        return self.process_action(
            request=request,
            account_id=account_id,
            action_form=ResetPasswordForm,
            action_title='Reset Password',
        )

    def process_action(
        self,
        request,
        account_id,
        action_form,
        action_title
    ):
        account = self.get_object(request, account_id)
        if request.method != 'POST':
            form = action_form()
        else:
            form = action_form(request.POST)
            if form.is_valid():
                try:
                    form.save(account, request.user)
                except Exception as e:
                    print(str(e))
                    # If save() raised, the form will a have a non
                    # field error containing an informative message.
                    pass
                else:
                    self.message_user(request, 'Success')
                    url = reverse(
                        'admin:account_account_change',
                       args=[account.pk],
                        current_app=self.admin_site.name,
                    )
                    return HttpResponseRedirect(url)
        context = self.admin_site.each_context(request)
        context['opts'] = self.model._meta
        context['form'] = form
        context['account'] = account
        context['title'] = action_title
        return TemplateResponse(
            request,
            'admin/account/account_action.html',
            context,
        )


# admin.site.register(Account, AccountAdmin)
# admin.site.unregister(Group)


###############################################


# admin.site.register(BackendEmail, BackendEmailAdmin)

###############################################

class WebsiteTemplateResource(resources.ModelResource):
    class Meta:
        model = WebsiteTemplate


class WebsiteTemplateAdmin(ImportExportModelAdmin):
    resource_class = WebsiteTemplateResource
    fields = ('name',
              'tndid',
              'updated_at',
              'created_at')
    readonly_fields = ('updated_at',
                       'created_at')
    list_display = ('name',
                    'tndid',
                    'updated_at',
                    'created_at')


# admin.site.register(WebsiteTemplate, WebsiteTemplateAdmin)

def GEN_SALT():
    rand = ''.join(random.choices((string.ascii_uppercase + string.ascii_lowercase + string.digits), k=5))
    return rand

from .Tadmin import *
