from django.db.models.signals import post_save
from django.dispatch import receiver
from FormManagement.models import *
from django.utils.timezone import now as djnow
from datetime import datetime
from ProposalForm.models import ListType

@receiver(post_save, sender=ListAsset)
def create_history_use_asset(sender, instance, created, **kwargs):
    if created:
        form = FormManagement.objects.get(uuid=instance.code_form.uuid)
        type_form_a = ListTypeForm.objects.get(uuid=instance.code_form.type_form.uuid)
        type_action = TypeAction.objects.get(type_form=type_form_a.uuid)
        # for asset in assets:
        history = HistoryUseAsset()
        now = datetime.now()
        history.code = instance.code + form.code
        history.name = instance.name + " " + form.name
        history.asset = instance.asset
        history.form = instance.code_form
        history.status_current = instance.current_status_asset
        history.type_action = type_action
        if (form.staff_receive_property != None) :
            history.user = form.staff_receive_property
        elif (form.staff_confiscated_asset != None) :
            history.user = form.staff_confiscated_asset
        elif (form.received != None):
            history.user = form.received
        # elif (form.warehouse != None):
        #     history.user = form.warehouse

        history.started_using = now.strftime("%Y-%m-%d %H:%M:%S%z")
        history.created_by = form.created_by
        history.save()

@receiver(post_save, sender=ListTypeForm)
def create_type_action(sender, instance, created, **kwargs):
    if created:
        # for asset in assets:
        action = TypeAction()
        now = datetime.now()
        action.name = str(instance.name).replace("Phiếu ", "")
        action.type_form = instance
        action.code = str(instance.code) + "AC"
        action.created_by = instance.created_by
        action.save()

@receiver(post_save, sender=ListType)
def create_list_type_form(sender, instance, created, **kwargs):
    if created:
        form_type = ListTypeForm()
        form_type.name = str(instance.name).replace("Đơn ", "Phiếu ")
        form_type.code = str(instance.code) + "FM"
        form_type.fields = instance.fields
        form_type.created_by = instance.created_by
        form_type.save()


# @receiver(post_save, sender=ProposalForm)
# def create_type_action(sender, instance, created, **kwargs):
#     if created:
#         i = 1
#         # for asset in assets:
#         form = FormManagement()
#         now = datetime.now()
#         form.name = str(instance.name).replace("Đơn ", "Phiếu ")
#         form.type_form = instance
#         form.code = str(instance.code) + "AC-" + str(i)
#         form.created_by = instance.created_by
#         form.save()
#         i += 1