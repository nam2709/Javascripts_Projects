#!/usr/bin/env python
# -*- coding: utf-8 -*-
#region Description
__author__ = 'Tamnd - NGUYEN DUC TAM'
__copyright__ = "Copyright ©2021 Tamnd <ductambka@gmail.com>"
__maintainer__ = "Tamnd"
__email__ = "ductambka@gmail.com"
__status__ = "Production"
__date__ = 3 / 29 / 21
#endregion

#
#
# __init__.py

import sys
import os
import time
import datetime

from .selenium import *

def testGetCaptchaImageFromElement():
    br = brStart()
    try:
        br.get('http://tracuunnt.gdt.gov.vn/tcnnt/mstcn.jsp')
        time.sleep(3)
    except Exception as xx:
        print(str(xx))
    # eles = brGetElements(br, tag='img', cls='lazy lazied')
    eles = br.find_elements_by_xpath('/html/body/div/div[1]/div[4]/div[2]/div[2]/div/div/form/table/tbody/tr[6]/td[2]/table/tbody/tr/td[2]/div/img')
    if len(eles) > 0:
        ele = eles[0]
        img_path = brGetCaptchaImage(br, ele)
        print(img_path)
    else:
        return None

def testGetImageFromElement():
    br = brStart()
    try:
        br.get('http://tracuunnt.gdt.gov.vn/tcnnt/mstcn.jsp')
        time.sleep(3)
    except Exception as xx:
        print(str(xx))
    # eles = brGetElements(br, tag='img', cls='lazy lazied')
    eles = br.find_elements_by_xpath('/html/body/div/div[1]/div[4]/div[2]/div[2]/div/div/form/table/tbody/tr[6]/td[2]/table/tbody/tr/td[2]/div/img')
    if len(eles) > 0:
        ele = eles[0]
        img_path = brGetImage(br, ele)
        print(img_path)
    else:
        return None


# End of TFile



