from django.apps import AppConfig


class FormmanagementConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'FormManagement'

    def ready(self):
        import FormManagement.signals