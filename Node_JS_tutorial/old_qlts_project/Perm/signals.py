from django.db.models.signals import pre_save, post_save
from django.dispatch import receiver
from Perm.models import *
from django.utils.timezone import now as djnow
from datetime import datetime
from django.utils.text import slugify



@receiver(pre_save, sender=AppPermission)
def create_type_action(sender, instance, created, **kwargs):
    if not instance.pk:
        
        models_permission = ModelsPermission()
    else:
        
        models_permission = instance.modelspermission

   
    models_permission.name = instance.name
    models_permission.app = slugify(instance.name)  
   
    models_permission.save()
    
@receiver(pre_save, sender=AppPermission)
def update_staff_information(sender, instance, **kwargs):
    model = ModelsPermission.objects.filter(app=instance).first()
    if model:
        
        model.app = instance
       
        model.save()