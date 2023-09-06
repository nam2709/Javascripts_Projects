
#!/usr/bin/env python
# -*- coding: utf-8 -*-
#region Description
__author__ = 'Tamnd - NGUYEN DUC TAM'
__copyright__ = "Copyright ©2020 Tamnd <ductambka@gmail.com>"
__maintainer__ = "Tamnd"
__email__ = "ductambka@gmail.com"
__status__ = "Production"
__date__ = 4 / 20 / 21
#endregion

#
#
# __init__.py

from django.urls import path

from . import views

app_name = 'Account'

#######################################
from .rest_views import *
from Router.models import SharedAPIRootRouter

router = SharedAPIRootRouter()

