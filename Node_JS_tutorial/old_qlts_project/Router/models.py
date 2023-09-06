#!/usr/bin/env python
# -*- coding: utf-8 -*-
#region Description
__author__ = 'Tamnd - NGUYEN DUC TAM'
__copyright__ = "Copyright ©2021 Tamnd <ductambka@gmail.com>"
__maintainer__ = "Tamnd"
__email__ = "ductambka@gmail.com"
__status__ = "Production"
__date__ = 5 / 18 / 21
#endregion

#
#
# __init__.py

import sys
import os
import time
import datetime

from rest_framework.routers import SimpleRouter, DefaultRouter
from rest_framework.pagination import PageNumberPagination
from rest_framework import permissions

class SharedAPIRootRouter(SimpleRouter):
    shared_router = DefaultRouter()
    def register(self, *args, **kwargs):
        self.shared_router.register(*args, **kwargs)
        super().register(*args, **kwargs)
        # if not py3: super(SharedAPIRootRouter, self).register(*args,**kwargs)

class SharedAPIRootRouter_IncomeTax(SimpleRouter):
    shared_router = DefaultRouter()
    def register(self, *args, **kwargs):
        self.shared_router.register(*args, **kwargs)
        super().register(*args, **kwargs)
        # if not py3: super(SharedAPIRootRouter, self).register(*args,**kwargs)

class SharedAPIRootRouter_Hr360(SimpleRouter):
    shared_router = DefaultRouter()
    def register(self, *args, **kwargs):
        self.shared_router.register(*args, **kwargs)
        super().register(*args, **kwargs)
        # if not py3: super(SharedAPIRootRouter, self).register(*args,**kwargs)

############################################################
################### PAGINATION CONFIG ######################
############################################################
class LargeResultsSetPagination(PageNumberPagination):
    page_size = 10000
    page_size_query_param = 'page_size'
    max_page_size = 10000
class MediumResultsSetPagination(PageNumberPagination):
    page_size = 1000
    page_size_query_param = 'page_size'
    max_page_size = 10000

class StandardResultsSetPagination(PageNumberPagination):
    page_size = 100
    page_size_query_param = 'page_size'
    max_page_size = 10000

class SmallResultsSetPagination(PageNumberPagination):
    page_size = 10
    page_size_query_param = 'page_size'
    max_page_size = 100000
############################################################
###################### END Pagination ######################
############################################################
from django.db.models import Q
import operator
from django.shortcuts import get_object_or_404
from functools import reduce
# from six.moves import reduce

############################################################
############### Multi Lookup Field CONFIG ##################
############################################################
class MultipleFieldLookupMixin(object):
    def get_object(self):
        queryset = self.get_queryset()             # Get the base queryset
        queryset = self.filter_queryset(queryset)  # Apply any filter backends
        filter = {}
        for field in self.lookup_fields:
            if self.kwargs[field]:  # Ignore empty fields.
                filter[field] = self.kwargs[field]
        q = reduce(operator.or_, (Q(x) for x in filter.items()), 1)
        return get_object_or_404(queryset, q)

############################################################
############### END Lookup Field CONFIG ##################
############################################################






# End of TFile



class IsVacationOwner(permissions.BasePermission):
    # for view permission
    def has_permission(self, request, view):
        return request.user and request.user.is_authenticated

    # for object level permissions
    def has_object_permission(self, request, view, vacation_obj):
        if hasattr(vacation_obj, "created_by"):
            return vacation_obj.created_by.id == request.user.id
        elif hasattr(vacation_obj, "owner"):
            return vacation_obj.owner.id == request.user.id
        else:
            return False
