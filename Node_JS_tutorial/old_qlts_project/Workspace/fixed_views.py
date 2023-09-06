#!/usr/bin/env python
# -*- coding: utf-8 -*-
#region Description
__author__ = 'Tamnd - NGUYEN DUC TAM'
__copyright__ = "Copyright ©2021 Tamnd <ductambka@gmail.com>"
__maintainer__ = "Tamnd"
__email__ = "ductambka@gmail.com"
__status__ = "Production"
__date__ = 9 / 20 / 21
#endregion

#
#
# __init__.py

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

import socket

from rest_framework.authentication import TokenAuthentication, SessionAuthentication, BasicAuthentication
from rest_framework_jwt.authentication import JSONWebTokenAuthentication
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework.response import Response
from cpuinfo import get_cpu_info
import psutil
from rest_framework import viewsets
from rest_framework import permissions

from .serializers import *
from .models import *
from Router.models import *


# Create your views here.
def convert_dict(data):
    if isinstance(data, bytes):  return data.decode('ascii')
    if isinstance(data, dict):   return dict(map(convert_dict, data.items()))
    if isinstance(data, tuple):  return map(convert_dict, data)
    return data

class EnviromentParameterRestApiView(APIView):
    serializer_class = ConfigSerializer
    queryset = Config.objects.all()
    pagination_class = SmallResultsSetPagination
    authentication_classes = [
        JWTAuthentication,
        JSONWebTokenAuthentication,
        TokenAuthentication,
        SessionAuthentication,
        BasicAuthentication,
    ]
    permission_classes = [IsAuthenticated]
    def get(self, request, format=None):
        """
        Return a list of all users.
        """
        # Enviroment Parameters
        context = {}
        paras = convert_dict(os.environ._data)
        print(paras)
        context['data'] = []
        for k, v in paras.items():
            context['data'].append([k, v])
        return Response(context)


class ConfigRestApiView(viewsets.ModelViewSet):
    serializer_class = ConfigSerializer
    queryset = Config.objects.all()
    pagination_class = SmallResultsSetPagination
    authentication_classes = [
        JWTAuthentication,
        JSONWebTokenAuthentication,
        TokenAuthentication,
        SessionAuthentication,
        BasicAuthentication,
    ]
    permission_classes = [IsAuthenticated]


class AllAppRestApiView(viewsets.ModelViewSet):
    serializer_class = AllAppSerializer
    queryset = AllApp.objects.all()
    pagination_class = SmallResultsSetPagination
    authentication_classes = [
        JWTAuthentication,
        JSONWebTokenAuthentication,
        TokenAuthentication,
        SessionAuthentication,
        BasicAuthentication,
    ]
    permission_classes = [IsAuthenticated]


class AllViewRestApiView(viewsets.ModelViewSet):
    serializer_class = AllViewSerializer
    queryset = AllView.objects.all()
    pagination_class = SmallResultsSetPagination
    authentication_classes = [
        JWTAuthentication,
        JSONWebTokenAuthentication,
        TokenAuthentication,
        SessionAuthentication,
        BasicAuthentication,
    ]
    permission_classes = [IsAuthenticated]


class AdminMenuGroupRestApiView(viewsets.ModelViewSet):
    serializer_class = AdminMenuGroupSerializer
    queryset = AdminMenuGroup.objects.all()
    pagination_class = SmallResultsSetPagination
    lookup_field = 'name'
    authentication_classes = [
        JWTAuthentication,
        JSONWebTokenAuthentication,
        TokenAuthentication,
        SessionAuthentication,
        BasicAuthentication,
    ]
    permission_classes = [IsAuthenticated, ]


class AllAdminMenuRestApiView(viewsets.ModelViewSet):
    # class AllAdminMenuRestApiView(MultipleFieldLookupMixin, viewsets.ModelViewSet):
    serializer_class = AllAdminMenuSerializer
    queryset = AllAdminMenu.objects.all()
    pagination_class = SmallResultsSetPagination
    lookup_field = 'name'
    # lookup_fields = ['name', 'id']
    authentication_classes = [
        JWTAuthentication,
        JSONWebTokenAuthentication,
        TokenAuthentication,
        SessionAuthentication,
        BasicAuthentication,
    ]
    permission_classes = [IsAuthenticated, ]


class PositionRestApiView(viewsets.ModelViewSet):
    serializer_class = PositionSerializer
    queryset = Position.objects.all()
    pagination_class = SmallResultsSetPagination
    authentication_classes = [
        JWTAuthentication,
        JSONWebTokenAuthentication,
        TokenAuthentication,
        SessionAuthentication,
        BasicAuthentication,
    ]

class FooterItemRestApiView(viewsets.ModelViewSet):
    serializer_class = FooterItemSerializer
    queryset = FooterItem.objects.all()
    pagination_class = SmallResultsSetPagination
    authentication_classes = [
        JWTAuthentication,
        JSONWebTokenAuthentication,
        TokenAuthentication,
        SessionAuthentication,
        BasicAuthentication,
    ]

class WidgetRestApiView(viewsets.ModelViewSet):
    serializer_class = WidgetSerializer
    queryset = Widget.objects.all()
    pagination_class = SmallResultsSetPagination
    authentication_classes = [
        JWTAuthentication,
        JSONWebTokenAuthentication,
        TokenAuthentication,
        SessionAuthentication,
        BasicAuthentication,
    ]

class TimeZoneRestApiView(viewsets.ModelViewSet):
    serializer_class = TimeZoneSerializer
    queryset = TimeZone.objects.all()
    pagination_class = SmallResultsSetPagination
    authentication_classes = [
        JWTAuthentication,
        JSONWebTokenAuthentication,
        TokenAuthentication,
        SessionAuthentication,
        BasicAuthentication,
    ]

class PageInfoRestApiView(viewsets.ModelViewSet):
    serializer_class = PageInfoSerializer
    queryset = PageInfo.objects.all()
    pagination_class = SmallResultsSetPagination
    authentication_classes = [
        JWTAuthentication,
        JSONWebTokenAuthentication,
        TokenAuthentication,
        SessionAuthentication,
        BasicAuthentication,
    ]

class BotUARestApiView(viewsets.ModelViewSet):
    serializer_class = BotUASerializer
    queryset = BotUA.objects.all()
    pagination_class = SmallResultsSetPagination
    authentication_classes = [
        JWTAuthentication,
        JSONWebTokenAuthentication,
        TokenAuthentication,
        SessionAuthentication,
        BasicAuthentication,
    ]

class RobotsArgRestApiView(viewsets.ModelViewSet):
    serializer_class = RobotsArgSerializer
    queryset = RobotsArg.objects.all()
    pagination_class = SmallResultsSetPagination
    authentication_classes = [
        JWTAuthentication,
        JSONWebTokenAuthentication,
        TokenAuthentication,
        SessionAuthentication,
        BasicAuthentication,
    ]

class SystemInfoApiView(APIView):
    """
    View to list all users in the system.

    * Requires token authentication.
    * Only admin users are able to access this view.
    """
    authentication_classes = [
        JWTAuthentication,
        JSONWebTokenAuthentication,
        TokenAuthentication,
        SessionAuthentication,
        BasicAuthentication,
    ]
    permission_classes = [permissions.IsAdminUser]

    def get(self, request, format=None):
        """
        Return a list of system information
        """
        context = {}
        cpu_info = get_cpu_info()

        #### CPU
        cpu_usage = psutil.cpu_percent()
        context['cpu_info'] = cpu_info
        context['cpu_usage'] = cpu_usage

        #### MEMORY
        ram_info = None
        ram_percent = psutil.virtual_memory().percent
        ram_total = psutil.virtual_memory().total/1024**2
        ram_usage = ram_total - psutil.virtual_memory().available/1024**2
        context['ram_total'] = ram_total

        context['ram_usage'] = ram_usage
        context['ram_percent'] = ram_percent
        context['ram_info'] = ram_info

        #### STORAGE
        storage_info = None
        hdd = psutil.disk_usage('/')
        hdd_total = hdd.total / (2**30)
        hdd_used = hdd.used / (2**30)
        hdd_free = hdd.free / (2**30)
        context['hdd_total'] = hdd_total
        context['hdd_used'] = hdd_used
        context['hdd_percent'] = round(hdd_used * 100 / hdd_total, 2)
        context['hdd_free'] = round(hdd_free, 2)

        #### Parameters
        try:
            configs = settings.ALL_CONFIGS
            context['configs'] = configs
        except Exception as xx:
            print(str('Can not get settings.ALL_CONFIGS... Error: %s' % str(xx)))

        #### Networks
        hostname = socket.gethostname()
        local_ip = socket.gethostbyname(hostname)
        context['hostname'] = hostname
        context['local_ip'] = local_ip

        context['storage_info'] = storage_info
        return Response(context)

from rest_framework.views import APIView
from rest_framework_simplejwt.token_blacklist.models import OutstandingToken
from rest_framework import permissions, status
from rest_framework_simplejwt.tokens import RefreshToken


class LogoutAndBlacklistRefreshTokenForUserView(APIView):
    permission_classes = (permissions.AllowAny,)
    authentication_classes = ()

    def delete(self, request):
        # find all tokens by user and blacklists them, forcing them to log out.
        try:
            tokens = OutstandingToken.objects.filter(user=request.user)
            for token in tokens:
                token = RefreshToken(token.token)
                token.blacklist()
        except:
            token = RefreshToken(request.data.refresh_token)
            token.blacklist()
        return Response(status=status.HTTP_205_RESET_CONTENT)  # 204 means no content, 205 means no content and refresh

    def post(self, request):
        # Post is for logging out in current browser
        print('request.data = %s' % request.data)
        try:
            if 'refresh_token' in request.data:
                refresh_token = request.data["refresh_token"]
                bl_token = RefreshToken(refresh_token)
                bl_token.blacklist()
                # token = RefreshToken(refresh_token)
                # token.blacklist()
                print('Set refresh_token --> blacklist... ')
            if 'access_token' in request.data:
                access_token = request.data["access_token"]
                token = RefreshToken(access_token)
                token.blacklist()
                print('Set access_token --> blacklist... ')

            return Response(status=status.HTTP_205_RESET_CONTENT)
        except Exception as xx:
            print(str(xx))
            return Response(status=status.HTTP_400_BAD_REQUEST)
# End of TFile










# End of TFile



