from rest_framework import viewsets,status
from .models import Province
from .models import Districts
from .models import Ward
from rest_framework import generics
from rest_framework.response import Response
from .kserializers import WardSerializer
from .kserializers import DistrictsSerializer
from .kserializers import ProvinceSerializer


# from .kserializers import PermissionGroupRemoveFileSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
#ViewSets define the view behavior.
from rest_framework import filters
from Router.models import *
class WardViewSet(viewsets.ModelViewSet):
    queryset = Ward.objects.all()
    serializer_class = WardSerializer
    
    # def get_queryset(self):
    #     # return super().get_queryset()
    #     query_set = self.queryset
    #     crr_user = self.request.user
    #     query_set_by_request_user = query_set.filter(created_by =crr_user).all()
    #     return query_set_by_request_user
    def get_queryset(self):
        # return super().get_queryset()
        query_set = self.queryset
        return query_set
class DistrictsViewSet(viewsets.ModelViewSet):
    queryset = Districts.objects.all()
    serializer_class = DistrictsSerializer
    
    # def get_queryset(self):
    #     # return super().get_queryset()
    #     query_set = self.queryset
    #     crr_user = self.request.user
    #     query_set_by_request_user = query_set.filter(created_by =crr_user).all()
    #     return query_set_by_request_user
    def get_queryset(self):
        # return super().get_queryset()
        query_set = self.queryset
        return query_set
class ProvinceViewSet(viewsets.ModelViewSet):
    queryset = Province.objects.all()
    serializer_class = ProvinceSerializer
    
    # def get_queryset(self):
    #     # return super().get_queryset()
    #     query_set = self.queryset
    #     crr_user = self.request.user
    #     query_set_by_request_user = query_set.filter(created_by =crr_user).all()
    #     return query_set_by_request_user
    def get_queryset(self):
        # return super().get_queryset()
        query_set = self.queryset
        return query_set