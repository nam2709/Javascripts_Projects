#!/usr/bin/env python
# -*- coding: utf-8 -*-
#region Description
__author__ = 'Tamnd - NGUYEN DUC TAM'
__copyright__ = "Copyright ©2021 Tamnd <ductambka@gmail.com>"
__maintainer__ = "Tamnd"
__email__ = "ductambka@gmail.com"
__status__ = "Production"
__date__ = 8 / 27 / 21
#endregion

#
#
# __init__.py

import sys
import os
import time
import datetime





class BackendEmail(models.Model):
    uuid = models.UUIDField(default=UUID4,
                            max_length=64,
                            unique=True,
                            null=True,
                            editable=True)
    tndid = models.CharField(default=TNDID, max_length=128,
                             unique=True,
                             editable=True)
    host = models.CharField(max_length=5000,
                            unique=False,
                            editable=True)
    port = models.IntegerField(default=587,
                               editable=True)
    username = models.CharField(max_length=1024,
                                unique=False,
                                editable=True)
    password = models.CharField(max_length=1024,
                                unique=False,
                                editable=True)
    enable_ssl = models.BooleanField(default=False,
                                     unique=False,
                                     editable=True)
    enable_tls = models.BooleanField(default=True,
                                     unique=False,
                                     editable=True)
    default = models.BooleanField(default=False,
                                  unique=False,
                                  editable=True)
    active = models.BooleanField(default=True,
                                 unique=False,
                                 editable=True)
    last_used_at = models.DateTimeField(default=djnow,
                                        editable=False)
    last_used_status = models.CharField(max_length=5000,
                                        blank=True,
                                        null=True,
                                        unique=False,
                                        editable=True)
    updated_at = models.DateTimeField(default=djnow, editable=False)
    created_at = models.DateTimeField(default=djnow, editable=False)
    tracker = FieldTracker()

    def __str__(self):
        return self.username

    def fullname(self):
        module = self.__class__.__module__
        if module is None or (module == str.__class__.__module__):
            return self.__class__.__name__
        return module + '.' + self.__class__.__name__

    def save(self, *args, **kwargs):
        self.updated_at = djnow()
        if self.tracker.has_changed('default') and self.default is True:
            # select all other active items
            qs = type(self).objects.filter(default=True)
            # except self (if self already exists)
            if self.pk:
                qs = qs.exclude(pk=self.pk)
            # and deactive them
            qs.update(default=False)
        super(BackendEmail, self).save(*args, **kwargs)








# End of TFile



