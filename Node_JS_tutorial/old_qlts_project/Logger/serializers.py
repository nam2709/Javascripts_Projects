#!/usr/bin/env python
# -*- coding: utf-8 -*-
# region Description
__author__ = 'Tamnd - NGUYEN DUC TAM'
__copyright__ = "Copyright ©2021 Tamnd <ductambka@gmail.com>"
__maintainer__ = "Tamnd"
__email__ = "ductambka@gmail.com"
__status__ = "Production"
__date__ = 4 / 20 / 21
# endregion

#
#
# __init__.py

import sys
import os
import time
import datetime

from rest_framework import serializers
from .models import *


class LogSerializer(serializers.ModelSerializer):
    class Meta:
        model = Log
        fields = '__all__'
    def create(self, validated_data):
        return Log.objects.create(**validated_data)

    def update(self, instance, validated_data):
        instance.save(**validated_data)
        return instance

# End of TFile
