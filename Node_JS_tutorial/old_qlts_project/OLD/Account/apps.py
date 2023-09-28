from django.apps import AppConfig
from django.utils.translation import gettext_lazy as _

app_name = 'Account'

class AccountConfig(AppConfig):
    name = 'Account'
    verbose_name = _("Quản Lý Tài Khoản")
