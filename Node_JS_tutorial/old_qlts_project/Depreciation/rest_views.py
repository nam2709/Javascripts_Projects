from django.urls import path, include
from django.contrib.auth.models import User
from rest_framework.filters import SearchFilter, OrderingFilter
from rest_framework import routers, serializers, viewsets
# from rest_framework.pagination import PageNumberPagination
# from .pagination import CustomPagination
from .models import *
from AssetManagement.models import *
from .serializers import *
import django_filters.rest_framework
from rest_framework import filters
from rest_framework.pagination import PageNumberPagination

class MyCustomPagination(PageNumberPagination):
    page_size = 10000
    page_size_query_param = 'page_size'

    def get_page_number(self, request, paginator):
        page_number = request.query_params.get('page', 1)
        return super().get_page_number(request, paginator)
    
class DepreciationDetailViewSet(viewsets.ModelViewSet):
    queryset = DepreciationDetail.objects.all().order_by('-created_at')
    # pagination_class = CustomPagination
    serializer_class = DepreciationDetailSerializer
    filter_backends = [filters.SearchFilter, django_filters.rest_framework.DjangoFilterBackend]
    search_fields = ['name']
    filter_fields = {'name': ['icontains'],'aset': ['exact']}

class DepreciationDetailViewSetSmall(viewsets.ModelViewSet):
    queryset = DepreciationDetail.objects.all().order_by('-created_at')
    pagination_class = MyCustomPagination
    serializer_class = DepreciationDetailSerializerSmall
    filter_backends = [filters.SearchFilter, django_filters.rest_framework.DjangoFilterBackend ,  OrderingFilter]
    search_fields = ['name','aset__uuid']
    filter_fields = {'type_depreciation': ['exact'],'preiod_detail': ['exact'],'aset': ['exact']}
    ordering_fields = ['name', 'aset__name','aset__asset_type__name','aset__date_added','aset__price_buy','preiod_detail__name']

    # permission_classes = [AllowAny,]

class AssetViewSet(viewsets.ModelViewSet):
    queryset = Asset.objects.all()
    serializer_class = AssetSerializer
    pagination_class = MyCustomPagination
    filter_backends = [filters.SearchFilter, django_filters.rest_framework.DjangoFilterBackend]
    search_fields = ['name']

class AssetViewSetAll(viewsets.ModelViewSet):
    queryset = Asset.objects.all()
    serializer_class = AssetSerializer
    filter_backends = [filters.SearchFilter, django_filters.rest_framework.DjangoFilterBackend]
    search_fields = ['name', 'code']

class AssetTypeViewSet(viewsets.ModelViewSet):
    queryset = AssetType.objects.all()
    serializer_class = AssetTypeSerializer

class AssetOfTypeViewSet(viewsets.ModelViewSet):
    queryset = AssetOfType.objects.all()
    serializer_class = AssetOfTypeSerializer

class DepreciationPeriodViewSet(viewsets.ModelViewSet):
    queryset = DepreciationPeriod.objects.all()
    serializer_class = DepreciationPeriodSerializer

class DepreciationTypeViewSet(viewsets.ModelViewSet):
    queryset =DepreciationType.objects.all()
    serializer_class = DepreciationTypeSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['asset_type__uuid']


class AdjustmentViewSet(viewsets.ModelViewSet):
    queryset = Adjustment.objects.all()
    serializer_class = AdjustmentSerializer
    filter_backends = [filters.SearchFilter, django_filters.rest_framework.DjangoFilterBackend]
    search_fields = ['name']



class DepreciationAssetDetaiViewSet(viewsets.ModelViewSet):
    queryset = DepreciationAssetDetail.objects.all()
    serializer_class = DepreciationAssetDetailSerializer
    filter_backends = [filters.SearchFilter, django_filters.rest_framework.DjangoFilterBackend]
    search_fields = ['asset_name']
    filter_fields = {'aet_depreciation': ['exact']}

class AssetRevaluationViewSet(viewsets.ModelViewSet):
    queryset = AssetRevaluation.objects.all()
    serializer_class = AssetRevaluationSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['asset_revaluation__uuid']

#     # ve doc tiep
#     def get_queryset(self):
#         # goi lai cai query set ben tren
#         # return super().get_queryset()
#         query_set = self.queryset
#         crr_user = self.request.user
#         query_set_by_request_user = query_set.filter(created_by=crr_user).all()
#         return query_set_by_request_user
#         # filter theo request user

# class StaffViewSet(viewsets.ModelViewSet):
#     pagination_class = CustomPagination
#     queryset = Staff.objects.all().order_by('-updated_at')
#     serializer_class = StaffSerializer

# class UnitViewSet(viewsets.ModelViewSet):
#     queryset = Unit.objects.all()
#     serializer_class = UnitSerializer

