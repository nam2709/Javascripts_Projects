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
def Dashboard(request, *args, **kwargs):
    template = loader.get_template('Workspace/default/admin/samples/elements/dashboard.html')
    context = AdminWebContext(request, page_info='Website:testing', *args, **kwargs)
    return HttpResponse(template.render(context, request))



def AlertMessage(request, *args, **kwargs):
    template = loader.get_template('Workspace/default/admin/samples/elements/alert-message.html')
    context = AdminWebContext(request, page_info='Website:testing', *args, **kwargs)
    return HttpResponse(template.render(context, request))


def Spinner(request, *args, **kwargs):
    template = loader.get_template('Workspace/default/admin/samples/elements/spinners.html')
    context = AdminWebContext(request, page_info='Website:testing', *args, **kwargs)
    return HttpResponse(template.render(context, request))


def Pagination(request, *args, **kwargs):
    template = loader.get_template('Workspace/default/admin/samples/elements/pagination.html')
    context = AdminWebContext(request, page_info='Website:testing', *args, **kwargs)
    return HttpResponse(template.render(context, request))


def ProgressBar(request, *args, **kwargs):
    template = loader.get_template('Workspace/default/admin/samples/elements/progress-bar.html')
    context = AdminWebContext(request, page_info='Website:testing', *args, **kwargs)
    return HttpResponse(template.render(context, request))


def Grid(request, *args, **kwargs):
    template = loader.get_template('Workspace/default/admin/samples/elements/grid.html')
    context = AdminWebContext(request, page_info='Website:testing', *args, **kwargs)
    return HttpResponse(template.render(context, request))


def Images(request, *args, **kwargs):
    template = loader.get_template('Workspace/default/admin/samples/elements/images.html')
    context = AdminWebContext(request, page_info='Website:testing', *args, **kwargs)
    return HttpResponse(template.render(context, request))


def BreadScumb(request, *args, **kwargs):
    template = loader.get_template('Workspace/default/admin/samples/elements/breadscumb.html')
    context = AdminWebContext(request, page_info='Website:testing', *args, **kwargs)
    return HttpResponse(template.render(context, request))

def Table(request, *args, **kwargs):
    template = loader.get_template('Workspace/default/admin/samples/elements/tables.html')
    context = AdminWebContext(request, page_info='Website:testing', *args, **kwargs)
    return HttpResponse(template.render(context, request))


def Chart(request, *args, **kwargs):
    template = loader.get_template('Workspace/default/admin/samples/elements/charts.html')
    context = AdminWebContext(request, page_info='Website:testing', *args, **kwargs)
    return HttpResponse(template.render(context, request))


def Button(request, *args, **kwargs):
    template = loader.get_template('Workspace/default/admin/samples/elements/buttons.html')
    context = AdminWebContext(request, page_info='Website:testing', *args, **kwargs)
    return HttpResponse(template.render(context, request))


def ScrollSpy(request, *args, **kwargs):
    template = loader.get_template('Workspace/default/admin/samples/elements/scrollspy.html')
    context = AdminWebContext(request, page_info='Website:testing', *args, **kwargs)
    return HttpResponse(template.render(context, request))


def ToolTip(request, *args, **kwargs):
    template = loader.get_template('Workspace/default/admin/samples/elements/tooltip.html')
    context = AdminWebContext(request, page_info='Website:testing', *args, **kwargs)
    print('context = %s' % context)
    return HttpResponse(template.render(context, request))


def Cards(request, *args, **kwargs):
    template = loader.get_template('Workspace/default/admin/samples/elements/cards.html')
    context = AdminWebContext(request, page_info='Website:testing', *args, **kwargs)
    return HttpResponse(template.render(context, request))

def Animation(request, *args, **kwargs):
    template = loader.get_template('Workspace/default/admin/samples/elements/utilities-animation.html')
    context = AdminWebContext(request, page_info='Website:testing', *args, **kwargs)
    return HttpResponse(template.render(context, request))


def Border(request, *args, **kwargs):
    template = loader.get_template('Workspace/default/admin/samples/elements/utilities-border.html')
    context = AdminWebContext(request, page_info='Website:testing', *args, **kwargs)
    return HttpResponse(template.render(context, request))


def Color(request, *args, **kwargs):
    template = loader.get_template('Workspace/default/admin/samples/elements/utilities-color.html')
    context = AdminWebContext(request, page_info='Website:testing', *args, **kwargs)
    return HttpResponse(template.render(context, request))


def Other(request, *args, **kwargs):
    template = loader.get_template('Workspace/default/admin/samples/elements/utilities-other.html')
    context = AdminWebContext(request, page_info='Website:testing', *args, **kwargs)
    return HttpResponse(template.render(context, request))


################################

#### PAGE TEMPLATE VIEWS
def Blank(request, *args, **kwargs):
    template = loader.get_template('Workspace/default/admin/samples/pages/blank.html')
    context = AdminWebContext(request, page_info='Website:testing', *args, **kwargs)
    return HttpResponse(template.render(context, request))


def T404(request, *args, **kwargs):
    template = loader.get_template('Workspace/default/admin/samples/pages/404.html')
    context = AdminWebContext(request, page_info='Website:testing', *args, **kwargs)
    return HttpResponse(template.render(context, request))


def Register(request, *args, **kwargs):
    template = loader.get_template('Workspace/default/admin/samples/pages/register.html')
    context = AdminWebContext(request, page_info='Website:testing', *args, **kwargs)
    return HttpResponse(template.render(context, request))


def Login(request, *args, **kwargs):
    template = loader.get_template('Workspace/default/admin/samples/pages/login.html')
    context = AdminWebContext(request, page_info='Website:testing', *args, **kwargs)
    return HttpResponse(template.render(context, request))


def ForgotPassword(request, *args, **kwargs):
    template = loader.get_template('Workspace/default/admin/samples/pages/forgot-password.html')
    context = AdminWebContext(request, page_info='Website:testing', *args, **kwargs)
    return HttpResponse(template.render(context, request))


def PdfObject(request, *args, **kwargs):
    template = loader.get_template('Workspace/default/admin/samples/pages/pdf-object.html')
    context = AdminWebContext(request, page_info='Website:testing', *args, **kwargs)
    return HttpResponse(template.render(context, request))

def PdfJs(request, *args, **kwargs):
    template = loader.get_template('Workspace/default/admin/samples/pages/pdf-js.html')
    context = AdminWebContext(request, page_info='Website:testing', *args, **kwargs)
    return HttpResponse(template.render(context, request))

def PdfJsIframe(request, *args, **kwargs):
    template = loader.get_template('Workspace/default/admin/samples/pages/pdf/web/pdf-viewer.html')
    context = AdminWebContext(request, page_info='Website:testing', *args, **kwargs)
    try:
        if request.GET['url']:
            context['file_url'] = request.GET['url']
            print('%s' % context['file_url'])
    except Exception as xx:
        print(str(xx))
    return HttpResponse(template.render(context, request))

def PdfJsViewer(request, *args, **kwargs):
    template = loader.get_template('Workspace/default/admin/samples/pages/pdf-js-viewer.html')
    context = AdminWebContext(request, page_info='Website:PdfJsViewer', *args, **kwargs)
    return HttpResponse(template.render(context, request))

def Chat(request, *args, **kwargs):
    template = loader.get_template('Workspace/default/admin/samples/pages/chat.html')
    context = AdminWebContext(request, page_info='Website:testing', *args, **kwargs)
    return HttpResponse(template.render(context, request))

def Chat1(request, *args, **kwargs):
    template = loader.get_template('Workspace/default/admin/samples/pages/chat1.html')
    context = AdminWebContext(request, page_info='Website:testing', *args, **kwargs)
    return HttpResponse(template.render(context, request))

def Chat2(request, *args, **kwargs):
    template = loader.get_template('Workspace/default/admin/samples/pages/chat2.html')
    context = AdminWebContext(request, page_info='Website:testing', *args, **kwargs)
    return HttpResponse(template.render(context, request))

def Chat3(request, *args, **kwargs):
    template = loader.get_template('Workspace/default/admin/samples/pages/chat3.html')
    context = AdminWebContext(request, page_info='Website:testing', *args, **kwargs)
    return HttpResponse(template.render(context, request))

def Chat3Iframe(request, *args, **kwargs):
    template = loader.get_template('Workspace/default/admin/samples/pages/chat3iframe.html')
    context = AdminWebContext(request, page_info='Website:testing', *args, **kwargs)
    return HttpResponse(template.render(context, request))

def Chat4(request, *args, **kwargs):
    template = loader.get_template('Workspace/default/admin/samples/pages/chat4.html')
    context = AdminWebContext(request, page_info='Website:testing', *args, **kwargs)
    return HttpResponse(template.render(context, request))



def SlideShow(request, *args, **kwargs):
    template = loader.get_template('Workspace/default/admin/samples/pages/slideshow.html')
    context = AdminWebContext(request, page_info='Website:testing', *args, **kwargs)
    return HttpResponse(template.render(context, request))


def CountDown(request, *args, **kwargs):
    template = loader.get_template('Workspace/default/admin/samples/pages/countdown.html')
    context = AdminWebContext(request, page_info='Website:testing', *args, **kwargs)
    return HttpResponse(template.render(context, request))

def SelectView(request, *args, **kwargs):
    template = loader.get_template('Workspace/default/admin/samples/pages/selects.html')
    context = AdminWebContext(request, page_info='Website:SelectView', *args, **kwargs)
    return HttpResponse(template.render(context, request))

def DocViewer(request, *args, **kwargs):
    template = loader.get_template('Workspace/default/admin/samples/pages/doc-viewer.html')
    context = AdminWebContext(request, page_info='Website:DocViewer', *args, **kwargs)
    return HttpResponse(template.render(context, request))
################################
# MDB
def PricingMdb(request, *args, **kwargs):
    template = loader.get_template('Workspace/default/admin/samples/pages/pricing-mdb.html')
    context = AdminWebContext(request, page_info='Website:testing', *args, **kwargs)
    return HttpResponse(template.render(context, request))

def AboutUsMdb(request, *args, **kwargs):
    template = loader.get_template('Workspace/default/admin/samples/pages/about-us-mdb.html')
    context = AdminWebContext(request, page_info='Website:testing', *args, **kwargs)
    return HttpResponse(template.render(context, request))

def ContactUsMdb(request, *args, **kwargs):
    template = loader.get_template('Workspace/default/admin/samples/pages/contact-us-mdb.html')
    context = AdminWebContext(request, page_info='Website:testing', *args, **kwargs)
    return HttpResponse(template.render(context, request))
################################

#### FORMS TEMPLATE VIEWS
def DatetimePickerMdb(request, *args, **kwargs):
    template = loader.get_template('Workspace/default/admin/samples/forms/datetime-picker-mdb.html')
    context = AdminWebContext(request, page_info='Website:testing', *args, **kwargs)
    return HttpResponse(template.render(context, request))