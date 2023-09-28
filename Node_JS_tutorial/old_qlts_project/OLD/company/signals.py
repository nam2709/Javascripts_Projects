from django.db.models.signals import post_save
from django.dispatch import receiver
from company.models import *
from django.utils.timezone import now as djnow
from datetime import datetime




@receiver(post_save, sender=Staff)
def create_type_action(sender, instance, created, **kwargs):
    if created:
      
        action = StaffInformation()
      
        now = datetime.now()
        action.full_name = instance.name
        action.staff = instance
        action.company = instance.company
        action.unit = instance.unit
        action.position = instance.position
        action.created_by = instance.created_by
        action.save()
    
@receiver(post_save, sender=Staff)
def update_staff_information(sender, instance, **kwargs):
    staff_information = StaffInformation.objects.filter(staff=instance).first()
    if staff_information:
        staff_information.full_name = instance.name
        staff_information.staff = instance
        staff_information.company = instance.company
        staff_information.unit = instance.unit
        staff_information.position = instance.position
        staff_information.created_by = instance.created_by
        staff_information.save()