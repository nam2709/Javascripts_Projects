#!/usr/bin/env python
# -*- coding: utf-8 -*-

#
#
# __init__.py
__author__ = 'TND - NGUYEN DUC TAM'
#####################
# TAMND <DUCTAMBKA@GMAIL.COM>
################################
################################
################################
################################
################################
from django.http import HttpResponse
from django.template import loader

from .views import AdminWebContext


################################

#### ELEMENT TEMPLATE VIEWS
def WhatIsMyIp(request, *args, **kwargs):
    template = loader.get_template('Workspace/default/admin/tools/whatismyip.html')
    context = AdminWebContext(request, page_info='Website:WhatIsMyIp', *args, **kwargs)
    x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
    if x_forwarded_for:
        ip = x_forwarded_for.split(',')[0]
    else:
        ip = request.META.get('REMOTE_ADDR')
    context['ip'] = ip
    return HttpResponse(template.render(context, request))

def MyIp(request, *args, **kwargs):
    template = loader.get_template('Workspace/default/admin/tools/ip.html')
    context = AdminWebContext(request, page_info='Website:WhatIsMyIp', *args, **kwargs)
    x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
    if x_forwarded_for:
        ip = x_forwarded_for.split(',')[0]
    else:
        ip = request.META.get('REMOTE_ADDR')
    context['ip'] = ip
    return HttpResponse(template.render(context, request))
