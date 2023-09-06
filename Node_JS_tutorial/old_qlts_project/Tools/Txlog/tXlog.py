#!/usr/bin/env python
# -*- coding: utf-8 -*-
#region Description
__author__ = 'Tamnd - NGUYEN DUC TAM'
__copyright__ = "Copyright ©2022 Tamnd <ductambka@gmail.com>"
__maintainer__ = "Tamnd"
__email__ = "ductambka@gmail.com"
__status__ = "Production"
# __date__ = 2022 - 05 - 10
#endregion

# __init__.py
import sys
import os
import time
import datetime
import json
import logging

from sys import _getframe
from inspect import currentframe, getframeinfo
def t_lineno():
    cf = currentframe()
    return cf.f_back.f_lineno

def t_filen():
    frameinfo = getframeinfo(currentframe().f_back)
    #cf = currentframe()
    #return cf.f_back.f_filename
    return frameinfo.filename

def t_xlog():
    cf = currentframe()
    frameinfo = getframeinfo(cf.f_back)
    return str(f"F.{frameinfo.filename}.L{cf.f_back.f_lineno}")

# End of TFile



