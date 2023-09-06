#!/usr/bin/env python
# -*- coding: utf-8 -*-
#region Description
__author__ = 'Tamnd - NGUYEN DUC TAM'
__copyright__ = "Copyright ©2021 Tamnd <ductambka@gmail.com>"
__maintainer__ = "Tamnd"
__email__ = "ductambka@gmail.com"
__status__ = "Production"
__date__ = 6 / 10 / 21
#endregion

#
#
# __init__.py

import sys
import os
import time
import datetime
from django import forms
from django.core.mail import send_mail

class AccountActionForm(forms.Form):
    comment = forms.CharField(
        required=False,
        widget=forms.Textarea,
    )
    send_email = forms.BooleanField(
        required=False,
    )
    @property
    def email_subject_template(self):
        return 'email/account/notification_subject.txt'
    @property
    def email_body_template(self):
        raise NotImplementedError()
    def form_action(self, account, user):
        raise NotImplementedError()
    def save(self, account, user):
        try:
            account, action = self.form_action(account, user)
        except errors.Error as e:
            error_message = str(e)
            self.add_error(None, error_message)
            raise
        # if self.cleaned_data.get('send_email', False):
        #     send_email(
        #         to=[account.user.email],
        #         subject_template=self.email_subject_template,
        #         body_template=self.email_body_template,
        #         context={
        #             "account": account,
        #             "action": action,
        #         }
        #     )
        return account, action

from django.utils import timezone
from .models import Account
class DisableForm(AccountActionForm):
    amount = forms.IntegerField(
        min_value=Account.MIN_WITHDRAW,
        max_value=Account.MAX_WITHDRAW,
        required=True,
        help_text='How much to withdraw?',
    )
    email_body_template = 'email/account/withdraw.txt'
    field_order = (
        'amount',
        'comment',
        'send_email',
    )
    def form_action(self, account, user):
        return Account.withdraw(
            id=account.pk,
            user=account.user,
            amount=self.cleaned_data['amount'],
            withdrawn_by=user,
            comment=self.cleaned_data['comment'],
            asof=timezone.now(),
        )


class EnableForm(AccountActionForm):
    amount = forms.IntegerField(
        min_value=Account.MIN_DEPOSIT,
        max_value=Account.MAX_DEPOSIT,
        required=True,
        help_text='How much to deposit?',
    )
    reference = forms.CharField(
        required=False,
    )
    email_body_template = 'email/account/deposit.txt'
    field_order = (
        'amount',
        'reference_type',
        'reference',
        'comment',
        'send_email',
    )
    def form_action(self, account, user):
        return Account.deposit(
            id=account.pk,
            user=account.user,
            amount=self.cleaned_data['amount'],
            deposited_by=user,
            reference=self.cleaned_data['reference'],
            reference_type=self.cleaned_data['reference_type'],
            comment=self.cleaned_data['comment'],
            asof=timezone.now(),
        )

class ResetPasswordForm(AccountActionForm):
    amount = forms.IntegerField(
        min_value=Account.MIN_DEPOSIT,
        max_value=Account.MAX_DEPOSIT,
        required=True,
        help_text='How much to deposit?',
    )
    reference = forms.CharField(
        required=False,
    )
    email_body_template = 'email/account/deposit.txt'
    field_order = (
        'amount',
        'reference_type',
        'reference',
        'comment',
        'send_email',
    )
    def form_action(self, account, user):
        return Account.reset_password(
            request=None
        )





# End of TFile

