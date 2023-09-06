#!/usr/bin/env python
# -*- coding: utf-8 -*-
#region Description
__author__ = 'Tamnd - NGUYEN DUC TAM'
__copyright__ = "Copyright ©2021 Tamnd <ductambka@gmail.com>"
__maintainer__ = "Tamnd"
__email__ = "ductambka@gmail.com"
__status__ = "Production"
__date__ = 4 / 20 / 21
#endregion

#
#
# __init__.py

import sys
import os
import time
import datetime

from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from .serializers import *
from .models import *
from Router.models import *

# Create your views here.

class LogRestApiView(viewsets.ModelViewSet):
    serializer_class = LogSerializer
    queryset = Log.objects.all()
    pagination_class = SmallResultsSetPagination
    authentication_classes = [SessionAuthentication, BasicAuthentication]
    permission_classes = [IsAuthenticated]

# End of TFile



