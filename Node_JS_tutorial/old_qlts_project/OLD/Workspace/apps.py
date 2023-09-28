from django.apps import AppConfig
from django.utils.translation import gettext_lazy as _


class WorkspaceConfig(AppConfig):
    name = 'Workspace'
    verbose_name = _("Quản Lý Workspace")
