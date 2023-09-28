from rest_framework import viewsets, status
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
            
from rest_framework import generics
from rest_framework import filters
# from .models import *
from Router.models import *
import django_filters.rest_framework


from .models import Asset
from .models import AssetType
from .models import AssetOfType
from .models import SupplierCategory
from .models import WareHouseCategory
from .models import UnitCategory
from .models import CurrencyUnit
from .models import AssetStatus
from .models import OwnStatus
from .models import AssetDetailTemplate
from .models import AssetDetail

from .serializers import AssetSerializer
from .serializers import AssetTypeSerializer
from .serializers import AssetOfTypeSerializer
from .serializers import SupplierCategorySerializer
from .serializers import WareHouseCategorySerializer
from .serializers import UnitCategorySerializer
from .serializers import CurrencyUnitSerializer
from .serializers import AssetStatusSerializer
from .serializers import OwnStatusSerializer
from .serializers import AssetDetailTemplateSerializer
from .serializers import AssetDetailSerializer

# from .serializers import AssetDetailFilter

# Khac
from .serializers import AssetSmallSerializer
from .serializers import WareHouseCategoryShortSerializer
from .serializers import OwnStatusShortSerializer
from .serializers import SupplierCategoryShortSerializer


class AssetViewSet(viewsets.ModelViewSet):
    queryset = Asset.objects.order_by("-created_at")
    serializer_class = AssetSerializer
    http_method_names=("get", "post", "delete", "put", "patch")
    filter_backends = [django_filters.rest_framework.DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filter_fields = {'name': ['icontains'],
                     'asset_type': ['exact'],
                     'owned_company': ['exact'],
                     'warehouse': ['exact'],
                     'own_status': ['exact'],
                    }

# Short API Asset
class AssetSmallViewSet(viewsets.ModelViewSet):
    queryset = Asset.objects.order_by("-created_at")
    serializer_class = AssetSmallSerializer
    http_method_names=("get",)
        
        
class AssetTypeViewSet(viewsets.ModelViewSet):
    queryset = AssetType.objects.all()
    serializer_class = AssetTypeSerializer
    filter_backends = [django_filters.rest_framework.DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filter_fields = {'name': ['icontains'],
                     'asset_of_type': ['exact'],
                    }
    

class AssetOfTypeViewSet(viewsets.ModelViewSet):
    queryset = AssetOfType.objects.all()
    serializer_class = AssetOfTypeSerializer
    

class SupplierCategoryViewSet(viewsets.ModelViewSet):
    queryset = SupplierCategory.objects.all()
    serializer_class = SupplierCategorySerializer
    

class SupplierCategoryShortViewSet(viewsets.ModelViewSet):
    queryset = SupplierCategory.objects.all()
    serializer_class = SupplierCategoryShortSerializer
    http_method_names = ("get",)
 
 
class WareHouseCategoryViewSet(viewsets.ModelViewSet):
    queryset = WareHouseCategory.objects.all()
    serializer_class = WareHouseCategorySerializer

# Short API WareHouse
class WareHouseCategoryShortViewSet(viewsets.ModelViewSet):
    queryset = WareHouseCategory.objects.filter(status=True).all()
    serializer_class = WareHouseCategoryShortSerializer
    http_method_names=("get",)


# Short API Owned Status
class OwnStatusShortViewSet(viewsets.ModelViewSet):
    queryset = OwnStatus.objects.all()
    serializer_class = OwnStatusShortSerializer
    http_method_names=("get",)
    
    
class CurrencyUnitViewSet(viewsets.ModelViewSet):
    queryset = CurrencyUnit.objects.all()
    serializer_class = CurrencyUnitSerializer
    # filter_backends = [django_filters.rest_framework.DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    # filter_fields = {'name': ['icontains'],
    #                  'asset_type': ['exact'],
    #                  'owned_company': ['exact'],
    #                  'warehouse': ['exact'],
    #                  'own_status': ['exact'],
    #                  }


class UnitCategoryViewSet(viewsets.ModelViewSet):
    queryset = UnitCategory.objects.all()
    serializer_class = UnitCategorySerializer


class AssetStatusViewSet(viewsets.ModelViewSet):
    queryset = AssetStatus.objects.all()
    serializer_class = AssetStatusSerializer


class OwnStatusViewSet(viewsets.ModelViewSet):
    queryset = OwnStatus.objects.all()
    serializer_class = OwnStatusSerializer


class AssetDetailTemplateViewSet(viewsets.ModelViewSet):
    queryset = AssetDetailTemplate.objects.all()
    serializer_class = AssetDetailTemplateSerializer
    filter_backends = [django_filters.rest_framework.DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filter_fields = {'name': ['icontains'],'asset_type': ['exact']}
    

class AssetDetailViewSet(viewsets.ModelViewSet):
    queryset = AssetDetail.objects.all()
    serializer_class = AssetDetailSerializer


# Search Asset
class AssetSearchRestApiView(generics.ListCreateAPIView):
    serializer_class = AssetSerializer

    queryset = Asset.objects.all()
    
    pagination_class = StandardResultsSetPagination
    # lookup_field = 'id'
    search_fields = ['name', 'code']
    # search_fields = ['name']

    filter_backends = (filters.SearchFilter,)
    # authentication_classes = [1
    #     JWTAuthentication,
    #     JSONWebTokenAuthentication,
    #     TokenAuthentication,
    #     SessionAuthentication,
    #     BasicAuthentication,
    # ]
    # permission_classes = [IsAuthenticated]
    permission_classes = [AllowAny,]
    #
    # def get(self, request, format=None):
    #     content = {
    #         'user': str(request.user),  # `django.contrib.auth.User` instance.
    #         'auth': str(request.auth),  # None
    #     }
    #     return Response(content)
    #
    # def put(self, request, filename, format=None):
    #     file_obj = request.FILES['file']
    #     # do some stuff with uploaded file
    #     return Response(status=204)

    # def perform_create(self, serializer):
    #     serializer.save(author=self.request.user)

    # def get_queryset(self):
    #     return Account.objects.all().order_by("-created_at")

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response(status=status.HTTP_204_NO_CONTENT)

    def perform_destroy(self, instance):
        instance.delete()


class AssetFilterRestApiView(generics.ListAPIView):
    serializer_class = AssetSerializer

    # queryset = Account.objects.all().order_by("-created_at")
    
    # queryset = Account.objects.all().order_by("-created_at")
    pagination_class = StandardResultsSetPagination
    # lookup_field = 'id'
    # authentication_classes = [
    #     JWTAuthentication,
    #     JSONWebTokenAuthentication,
    #     TokenAuthentication,
    #     SessionAuthentication,
    #     BasicAuthentication,
    # ]
    # permission_classes = [IsAuthenticated]
    permission_classes = [AllowAny,]
    #
    # def get(self, request, format=None):
    #     content = {
    #         'user': str(request.user),  # `django.contrib.auth.User` instance.
    #         'auth': str(request.auth),  # None
    #     }
    #     return Response(content)
    #
    # def put(self, request, filename, format=None):
    #     file_obj = request.FILES['file']
    #     # do some stuff with uploaded file
    #     return Response(status=204)

    # def perform_create(self, serializer):
    #     serializer.save(author=self.request.user)

    def get_queryset(self):

        queryset = Asset.objects.all().order_by("-created_at")
    
        # queryset =  Account.objects.all().order_by("-created_at")
        query_params = self.request.query_params
        if '_' in query_params:
            query_params._mutable=True
            print(query_params['_'])
            query_params.pop('_')
            query_params._mutable=False

        if 'page' in query_params:
            query_params._mutable=True
            print(query_params['page'])
            query_params.pop('page')
            query_params._mutable=False

        if 'start_date__gte' in query_params:
            query_params._mutable=True
            print(query_params['start_date__gte'])
            start_date = str(query_params.pop('start_date__gte')[0])
            query_params._mutable=False

        if 'end_date__lte' in query_params:
            query_params._mutable=True
            print(query_params['end_date__lte'])
            end_date = str(query_params.pop('end_date__lte')[0])
            query_params._mutable=False
            
        if 'expriry_date__lte' in query_params:
            query_params._mutable=True
            print(query_params['expriry_date__lte'])
            expriry_date = str(query_params.pop('expriry_date__lte')[0])
            query_params._mutable=False
        try:
            if 'start_date' in locals():
                if 'expriry_date' in locals():
                    queryset = queryset.filter(start_date__gte=start_date,expriry_date__lte=expriry_date)
                else:
                    queryset = queryset.filter(start_date__gte=start_date)

            elif 'end_date' in locals():
                if 'start_date' in locals():
                    queryset = queryset.filter(start_date__gte=start_date,end_date__lte=end_date)
                else:
                    queryset = queryset.filter(end_date__lte=end_date)

            elif 'expriry_date' in locals():
                if 'start_date' in locals():
                    queryset = queryset.filter(start_date__gte=start_date,expriry_date__lte=expriry_date)
                else:
                    queryset = queryset.filter(expriry_date__lte=expriry_date)
        except Exception as xx:
            print("[sFilterRestApiView] Error: %s" % str(xx))
            pass
        if len(query_params)>0:
            # return queryset.filter(**query_params.dict())
            return queryset.filter(reduce(operator.and_, 
                                    (Q(**d) for d in (dict([i]) for i in query_params.dict().items()))))
        else:
            return queryset

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response(status=status.HTTP_204_NO_CONTENT)

    def perform_destroy(self, instance):
        instance.delete()


# Search WareHouseCategory
class WareHouseCategorySearchRestApiView(generics.ListCreateAPIView):
    serializer_class = WareHouseCategorySerializer

    queryset = WareHouseCategory.objects.all()
    
    pagination_class = StandardResultsSetPagination

    search_fields = ['name', 'code']

    filter_backends = (filters.SearchFilter,)

    permission_classes = [AllowAny,]

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response(status=status.HTTP_204_NO_CONTENT)

    def perform_destroy(self, instance):
        instance.delete()


class WareHouseCategoryFilterRestApiView(generics.ListAPIView):
    serializer_class = WareHouseCategorySerializer

    pagination_class = StandardResultsSetPagination
    permission_classes = [AllowAny,]

    def get_queryset(self):

        queryset = WareHouseCategory.objects.all().order_by("-created_at")
    
        # queryset =  Account.objects.all().order_by("-created_at")
        query_params = self.request.query_params
        if '_' in query_params:
            query_params._mutable=True
            print(query_params['_'])
            query_params.pop('_')
            query_params._mutable=False

        if 'page' in query_params:
            query_params._mutable=True
            print(query_params['page'])
            query_params.pop('page')
            query_params._mutable=False

        if 'start_date__gte' in query_params:
            query_params._mutable=True
            print(query_params['start_date__gte'])
            start_date = str(query_params.pop('start_date__gte')[0])
            query_params._mutable=False

        if 'end_date__lte' in query_params:
            query_params._mutable=True
            print(query_params['end_date__lte'])
            end_date = str(query_params.pop('end_date__lte')[0])
            query_params._mutable=False
            
        if 'expriry_date__lte' in query_params:
            query_params._mutable=True
            print(query_params['expriry_date__lte'])
            expriry_date = str(query_params.pop('expriry_date__lte')[0])
            query_params._mutable=False
        try:
            if 'start_date' in locals():
                if 'expriry_date' in locals():
                    queryset = queryset.filter(start_date__gte=start_date,expriry_date__lte=expriry_date)
                else:
                    queryset = queryset.filter(start_date__gte=start_date)

            elif 'end_date' in locals():
                if 'start_date' in locals():
                    queryset = queryset.filter(start_date__gte=start_date,end_date__lte=end_date)
                else:
                    queryset = queryset.filter(end_date__lte=end_date)

            elif 'expriry_date' in locals():
                if 'start_date' in locals():
                    queryset = queryset.filter(start_date__gte=start_date,expriry_date__lte=expriry_date)
                else:
                    queryset = queryset.filter(expriry_date__lte=expriry_date)
        except Exception as xx:
            print("[sFilterRestApiView] Error: %s" % str(xx))
            pass
        if len(query_params)>0:
            # return queryset.filter(**query_params.dict())
            return queryset.filter(reduce(operator.and_, 
                                    (Q(**d) for d in (dict([i]) for i in query_params.dict().items()))))
        else:
            return queryset

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response(status=status.HTTP_204_NO_CONTENT)

    def perform_destroy(self, instance):
        instance.delete()


# Search Unit Category
class UnitCategorySearchRestApiView(generics.ListCreateAPIView):
    serializer_class = UnitCategorySerializer

    queryset = UnitCategory.objects.all()
    
    pagination_class = StandardResultsSetPagination

    search_fields = ['name', 'code']


    filter_backends = (filters.SearchFilter,)

    permission_classes = [AllowAny,]


    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response(status=status.HTTP_204_NO_CONTENT)

    def perform_destroy(self, instance):
        instance.delete()


class UnitCategoryFilterRestApiView(generics.ListAPIView):
    serializer_class = UnitCategorySerializer

    pagination_class = StandardResultsSetPagination

    permission_classes = [AllowAny,]

    def get_queryset(self):

        queryset = UnitCategory.objects.all().order_by("-created_at")
    
        # queryset =  Account.objects.all().order_by("-created_at")
        query_params = self.request.query_params
        if '_' in query_params:
            query_params._mutable=True
            print(query_params['_'])
            query_params.pop('_')
            query_params._mutable=False

        if 'page' in query_params:
            query_params._mutable=True
            print(query_params['page'])
            query_params.pop('page')
            query_params._mutable=False

        if 'start_date__gte' in query_params:
            query_params._mutable=True
            print(query_params['start_date__gte'])
            start_date = str(query_params.pop('start_date__gte')[0])
            query_params._mutable=False

        if 'end_date__lte' in query_params:
            query_params._mutable=True
            print(query_params['end_date__lte'])
            end_date = str(query_params.pop('end_date__lte')[0])
            query_params._mutable=False
            
        if 'expriry_date__lte' in query_params:
            query_params._mutable=True
            print(query_params['expriry_date__lte'])
            expriry_date = str(query_params.pop('expriry_date__lte')[0])
            query_params._mutable=False
        try:
            if 'start_date' in locals():
                if 'expriry_date' in locals():
                    queryset = queryset.filter(start_date__gte=start_date,expriry_date__lte=expriry_date)
                else:
                    queryset = queryset.filter(start_date__gte=start_date)

            elif 'end_date' in locals():
                if 'start_date' in locals():
                    queryset = queryset.filter(start_date__gte=start_date,end_date__lte=end_date)
                else:
                    queryset = queryset.filter(end_date__lte=end_date)

            elif 'expriry_date' in locals():
                if 'start_date' in locals():
                    queryset = queryset.filter(start_date__gte=start_date,expriry_date__lte=expriry_date)
                else:
                    queryset = queryset.filter(expriry_date__lte=expriry_date)
        except Exception as xx:
            print("[sFilterRestApiView] Error: %s" % str(xx))
            pass
        if len(query_params)>0:
            # return queryset.filter(**query_params.dict())
            return queryset.filter(reduce(operator.and_, 
                                    (Q(**d) for d in (dict([i]) for i in query_params.dict().items()))))
        else:
            return queryset

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response(status=status.HTTP_204_NO_CONTENT)

    def perform_destroy(self, instance):
        instance.delete()


# Search Unit Category
class CurrencyUnitSearchRestApiView(generics.ListCreateAPIView):
    serializer_class = CurrencyUnitSerializer

    queryset = CurrencyUnit.objects.all()
    
    pagination_class = StandardResultsSetPagination

    search_fields = ['name', 'code']


    filter_backends = (filters.SearchFilter,)

    permission_classes = [AllowAny,]


# Search Supplier Category
class SupplierCategorySearchRestApiView(generics.ListCreateAPIView):
    serializer_class = SupplierCategorySerializer

    queryset = SupplierCategory.objects.all()
    
    pagination_class = StandardResultsSetPagination

    search_fields = ['name', 'code']


    filter_backends = (filters.SearchFilter,)

    permission_classes = [AllowAny,]


    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response(status=status.HTTP_204_NO_CONTENT)

    def perform_destroy(self, instance):
        instance.delete()


class SupplierCategoryFilterRestApiView(generics.ListAPIView):
    serializer_class = SupplierCategorySerializer

    pagination_class = StandardResultsSetPagination

    permission_classes = [AllowAny,]

    def get_queryset(self):

        queryset = SupplierCategory.objects.all().order_by("-created_at")
    
        # queryset =  Account.objects.all().order_by("-created_at")
        query_params = self.request.query_params
        if '_' in query_params:
            query_params._mutable=True
            print(query_params['_'])
            query_params.pop('_')
            query_params._mutable=False

        if 'page' in query_params:
            query_params._mutable=True
            print(query_params['page'])
            query_params.pop('page')
            query_params._mutable=False

        if 'start_date__gte' in query_params:
            query_params._mutable=True
            print(query_params['start_date__gte'])
            start_date = str(query_params.pop('start_date__gte')[0])
            query_params._mutable=False

        if 'end_date__lte' in query_params:
            query_params._mutable=True
            print(query_params['end_date__lte'])
            end_date = str(query_params.pop('end_date__lte')[0])
            query_params._mutable=False
            
        if 'expriry_date__lte' in query_params:
            query_params._mutable=True
            print(query_params['expriry_date__lte'])
            expriry_date = str(query_params.pop('expriry_date__lte')[0])
            query_params._mutable=False
        try:
            if 'start_date' in locals():
                if 'expriry_date' in locals():
                    queryset = queryset.filter(start_date__gte=start_date,expriry_date__lte=expriry_date)
                else:
                    queryset = queryset.filter(start_date__gte=start_date)

            elif 'end_date' in locals():
                if 'start_date' in locals():
                    queryset = queryset.filter(start_date__gte=start_date,end_date__lte=end_date)
                else:
                    queryset = queryset.filter(end_date__lte=end_date)

            elif 'expriry_date' in locals():
                if 'start_date' in locals():
                    queryset = queryset.filter(start_date__gte=start_date,expriry_date__lte=expriry_date)
                else:
                    queryset = queryset.filter(expriry_date__lte=expriry_date)
        except Exception as xx:
            print("[sFilterRestApiView] Error: %s" % str(xx))
            pass
        if len(query_params)>0:
            # return queryset.filter(**query_params.dict())
            return queryset.filter(reduce(operator.and_, 
                                    (Q(**d) for d in (dict([i]) for i in query_params.dict().items()))))
        else:
            return queryset

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response(status=status.HTTP_204_NO_CONTENT)

    def perform_destroy(self, instance):
        instance.delete()


# Search Asset Status
class AssetStatusSearchRestApiView(generics.ListCreateAPIView):
    serializer_class = AssetStatusSerializer

    queryset = AssetStatus.objects.all()
    
    pagination_class = StandardResultsSetPagination

    search_fields = ['name', 'code']


    filter_backends = (filters.SearchFilter,)

    permission_classes = [AllowAny,]


    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response(status=status.HTTP_204_NO_CONTENT)

    def perform_destroy(self, instance):
        instance.delete()


class AssetStatusFilterRestApiView(generics.ListAPIView):
    serializer_class = AssetStatusSerializer

    pagination_class = StandardResultsSetPagination

    permission_classes = [AllowAny,]

    def get_queryset(self):

        queryset = AssetStatus.objects.all().order_by("-created_at")
    
        # queryset =  Account.objects.all().order_by("-created_at")
        query_params = self.request.query_params
        if '_' in query_params:
            query_params._mutable=True
            print(query_params['_'])
            query_params.pop('_')
            query_params._mutable=False

        if 'page' in query_params:
            query_params._mutable=True
            print(query_params['page'])
            query_params.pop('page')
            query_params._mutable=False

        if 'start_date__gte' in query_params:
            query_params._mutable=True
            print(query_params['start_date__gte'])
            start_date = str(query_params.pop('start_date__gte')[0])
            query_params._mutable=False

        if 'end_date__lte' in query_params:
            query_params._mutable=True
            print(query_params['end_date__lte'])
            end_date = str(query_params.pop('end_date__lte')[0])
            query_params._mutable=False
            
        if 'expriry_date__lte' in query_params:
            query_params._mutable=True
            print(query_params['expriry_date__lte'])
            expriry_date = str(query_params.pop('expriry_date__lte')[0])
            query_params._mutable=False
        try:
            if 'start_date' in locals():
                if 'expriry_date' in locals():
                    queryset = queryset.filter(start_date__gte=start_date,expriry_date__lte=expriry_date)
                else:
                    queryset = queryset.filter(start_date__gte=start_date)

            elif 'end_date' in locals():
                if 'start_date' in locals():
                    queryset = queryset.filter(start_date__gte=start_date,end_date__lte=end_date)
                else:
                    queryset = queryset.filter(end_date__lte=end_date)

            elif 'expriry_date' in locals():
                if 'start_date' in locals():
                    queryset = queryset.filter(start_date__gte=start_date,expriry_date__lte=expriry_date)
                else:
                    queryset = queryset.filter(expriry_date__lte=expriry_date)
        except Exception as xx:
            print("[sFilterRestApiView] Error: %s" % str(xx))
            pass
        if len(query_params)>0:
            # return queryset.filter(**query_params.dict())
            return queryset.filter(reduce(operator.and_, 
                                    (Q(**d) for d in (dict([i]) for i in query_params.dict().items()))))
        else:
            return queryset

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response(status=status.HTTP_204_NO_CONTENT)

    def perform_destroy(self, instance):
        instance.delete()


# Search Own Status
class OwnStatusSearchRestApiView(generics.ListCreateAPIView):
    serializer_class = OwnStatusSerializer

    queryset = OwnStatus.objects.all()
    
    pagination_class = StandardResultsSetPagination

    search_fields = ['name', 'code']


    filter_backends = (filters.SearchFilter,)

    permission_classes = [AllowAny,]


    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response(status=status.HTTP_204_NO_CONTENT)

    def perform_destroy(self, instance):
        instance.delete()


class OwnStatusFilterRestApiView(generics.ListAPIView):
    serializer_class = OwnStatusSerializer

    pagination_class = StandardResultsSetPagination

    permission_classes = [AllowAny,]

    def get_queryset(self):

        queryset = OwnStatus.objects.all().order_by("-created_at")
    
        # queryset =  Account.objects.all().order_by("-created_at")
        query_params = self.request.query_params
        if '_' in query_params:
            query_params._mutable=True
            print(query_params['_'])
            query_params.pop('_')
            query_params._mutable=False

        if 'page' in query_params:
            query_params._mutable=True
            print(query_params['page'])
            query_params.pop('page')
            query_params._mutable=False

        if 'start_date__gte' in query_params:
            query_params._mutable=True
            print(query_params['start_date__gte'])
            start_date = str(query_params.pop('start_date__gte')[0])
            query_params._mutable=False

        if 'end_date__lte' in query_params:
            query_params._mutable=True
            print(query_params['end_date__lte'])
            end_date = str(query_params.pop('end_date__lte')[0])
            query_params._mutable=False
            
        if 'expriry_date__lte' in query_params:
            query_params._mutable=True
            print(query_params['expriry_date__lte'])
            expriry_date = str(query_params.pop('expriry_date__lte')[0])
            query_params._mutable=False
        try:
            if 'start_date' in locals():
                if 'expriry_date' in locals():
                    queryset = queryset.filter(start_date__gte=start_date,expriry_date__lte=expriry_date)
                else:
                    queryset = queryset.filter(start_date__gte=start_date)

            elif 'end_date' in locals():
                if 'start_date' in locals():
                    queryset = queryset.filter(start_date__gte=start_date,end_date__lte=end_date)
                else:
                    queryset = queryset.filter(end_date__lte=end_date)

            elif 'expriry_date' in locals():
                if 'start_date' in locals():
                    queryset = queryset.filter(start_date__gte=start_date,expriry_date__lte=expriry_date)
                else:
                    queryset = queryset.filter(expriry_date__lte=expriry_date)
        except Exception as xx:
            print("[sFilterRestApiView] Error: %s" % str(xx))
            pass
        if len(query_params)>0:
            # return queryset.filter(**query_params.dict())
            return queryset.filter(reduce(operator.and_, 
                                    (Q(**d) for d in (dict([i]) for i in query_params.dict().items()))))
        else:
            return queryset

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response(status=status.HTTP_204_NO_CONTENT)

    def perform_destroy(self, instance):
        instance.delete()


# Search Asset OF Type
class AssetOfTypeSearchRestApiView(generics.ListCreateAPIView):
    serializer_class = AssetOfTypeSerializer

    queryset = AssetOfType.objects.all()
    
    pagination_class = StandardResultsSetPagination

    search_fields = ['name', 'code']


    filter_backends = (filters.SearchFilter,)

    permission_classes = [AllowAny,]


    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response(status=status.HTTP_204_NO_CONTENT)

    def perform_destroy(self, instance):
        instance.delete()


class AssetOfTypeFilterRestApiView(generics.ListAPIView):
    serializer_class = AssetOfTypeSerializer

    pagination_class = StandardResultsSetPagination

    permission_classes = [AllowAny,]

    def get_queryset(self):

        queryset = AssetOfType.objects.all().order_by("-created_at")
    
        # queryset =  Account.objects.all().order_by("-created_at")
        query_params = self.request.query_params
        if '_' in query_params:
            query_params._mutable=True
            print(query_params['_'])
            query_params.pop('_')
            query_params._mutable=False

        if 'page' in query_params:
            query_params._mutable=True
            print(query_params['page'])
            query_params.pop('page')
            query_params._mutable=False

        if 'start_date__gte' in query_params:
            query_params._mutable=True
            print(query_params['start_date__gte'])
            start_date = str(query_params.pop('start_date__gte')[0])
            query_params._mutable=False

        if 'end_date__lte' in query_params:
            query_params._mutable=True
            print(query_params['end_date__lte'])
            end_date = str(query_params.pop('end_date__lte')[0])
            query_params._mutable=False
            
        if 'expriry_date__lte' in query_params:
            query_params._mutable=True
            print(query_params['expriry_date__lte'])
            expriry_date = str(query_params.pop('expriry_date__lte')[0])
            query_params._mutable=False
        try:
            if 'start_date' in locals():
                if 'expriry_date' in locals():
                    queryset = queryset.filter(start_date__gte=start_date,expriry_date__lte=expriry_date)
                else:
                    queryset = queryset.filter(start_date__gte=start_date)

            elif 'end_date' in locals():
                if 'start_date' in locals():
                    queryset = queryset.filter(start_date__gte=start_date,end_date__lte=end_date)
                else:
                    queryset = queryset.filter(end_date__lte=end_date)

            elif 'expriry_date' in locals():
                if 'start_date' in locals():
                    queryset = queryset.filter(start_date__gte=start_date,expriry_date__lte=expriry_date)
                else:
                    queryset = queryset.filter(expriry_date__lte=expriry_date)
        except Exception as xx:
            print("[sFilterRestApiView] Error: %s" % str(xx))
            pass
        if len(query_params)>0:
            # return queryset.filter(**query_params.dict())
            return queryset.filter(reduce(operator.and_, 
                                    (Q(**d) for d in (dict([i]) for i in query_params.dict().items()))))
        else:
            return queryset

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response(status=status.HTTP_204_NO_CONTENT)

    def perform_destroy(self, instance):
        instance.delete()


# Search Asset Type
class AssetTypeSearchRestApiView(generics.ListCreateAPIView):
    serializer_class = AssetTypeSerializer

    queryset = AssetType.objects.all()
    
    pagination_class = StandardResultsSetPagination

    search_fields = ['name', 'code']


    filter_backends = (filters.SearchFilter,)

    permission_classes = [AllowAny,]


    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response(status=status.HTTP_204_NO_CONTENT)

    def perform_destroy(self, instance):
        instance.delete()


class AssetTypeFilterRestApiView(generics.ListAPIView):
    serializer_class = AssetTypeSerializer

    pagination_class = StandardResultsSetPagination

    permission_classes = [AllowAny,]
    filter_backends = [django_filters.rest_framework.DjangoFilterBackend, filters.SearchFilter]

    filter_fields = {'name': ['icontains'],'asset_of_type': ['exact']} 

    def get_queryset(self):

        queryset = AssetType.objects.all().order_by("-created_at")
    
        # queryset =  Account.objects.all().order_by("-created_at")
        query_params = self.request.query_params
        if '_' in query_params:
            query_params._mutable=True
            print(query_params['_'])
            query_params.pop('_')
            query_params._mutable=False

        if 'page' in query_params:
            query_params._mutable=True
            print(query_params['page'])
            query_params.pop('page')
            query_params._mutable=False

        if 'start_date__gte' in query_params:
            query_params._mutable=True
            print(query_params['start_date__gte'])
            start_date = str(query_params.pop('start_date__gte')[0])
            query_params._mutable=False

        if 'end_date__lte' in query_params:
            query_params._mutable=True
            print(query_params['end_date__lte'])
            end_date = str(query_params.pop('end_date__lte')[0])
            query_params._mutable=False
            
        if 'expriry_date__lte' in query_params:
            query_params._mutable=True
            print(query_params['expriry_date__lte'])
            expriry_date = str(query_params.pop('expriry_date__lte')[0])
            query_params._mutable=False
        try:
            if 'start_date' in locals():
                if 'expriry_date' in locals():
                    queryset = queryset.filter(start_date__gte=start_date,expriry_date__lte=expriry_date)
                else:
                    queryset = queryset.filter(start_date__gte=start_date)

            elif 'end_date' in locals():
                if 'start_date' in locals():
                    queryset = queryset.filter(start_date__gte=start_date,end_date__lte=end_date)
                else:
                    queryset = queryset.filter(end_date__lte=end_date)

            elif 'expriry_date' in locals():
                if 'start_date' in locals():
                    queryset = queryset.filter(start_date__gte=start_date,expriry_date__lte=expriry_date)
                else:
                    queryset = queryset.filter(expriry_date__lte=expriry_date)
        except Exception as xx:
            print("[sFilterRestApiView] Error: %s" % str(xx))
            pass
        if len(query_params)>0:
            # return queryset.filter(**query_params.dict())
            return queryset.filter(reduce(operator.and_, 
                                    (Q(**d) for d in (dict([i]) for i in query_params.dict().items()))))
        else:
            return queryset

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response(status=status.HTTP_204_NO_CONTENT)

    def perform_destroy(self, instance):
        instance.delete()


# Search AssetDetail
class AssetDetailSearchRestApiView(generics.ListCreateAPIView):
    serializer_class = AssetDetailSerializer

    queryset = AssetDetail.objects.all()
    
    pagination_class = StandardResultsSetPagination
    # lookup_field = 'id'
    # search_fields = ['name']

    filter_backends = (filters.SearchFilter,)  
    search_fields = ['name', 'code']

    # authentication_classes = [1
    #     JWTAuthentication,
    #     JSONWebTokenAuthentication,
    #     TokenAuthentication,
    #     SessionAuthentication,
    #     BasicAuthentication,
    # ]
    # permission_classes = [IsAuthenticated]
    permission_classes = [AllowAny,]
    #
    # def get(self, request, format=None):
    #     content = {
    #         'user': str(request.user),  # `django.contrib.auth.User` instance.
    #         'auth': str(request.auth),  # None
    #     }
    #     return Response(content)
    #
    # def put(self, request, filename, format=None):
    #     file_obj = request.FILES['file']
    #     # do some stuff with uploaded file
    #     return Response(status=204)

    # def perform_create(self, serializer):
    #     serializer.save(author=self.request.user)

    # def get_queryset(self):
    #     return Account.objects.all().order_by("-created_at")

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response(status=status.HTTP_204_NO_CONTENT)

    def perform_destroy(self, instance):
        instance.delete()


class AssetDetailFilterRestApiView(generics.ListAPIView):
    serializer_class = AssetDetailSerializer

    # queryset = Account.objects.all().order_by("-created_at")
    
    # queryset = Account.objects.all().order_by("-created_at")
    pagination_class = StandardResultsSetPagination
    # lookup_field = 'id'
    # authentication_classes = [
    #     JWTAuthentication,
    #     JSONWebTokenAuthentication,
    #     TokenAuthentication,
    #     SessionAuthentication,
    #     BasicAuthentication,
    # ]
    # permission_classes = [IsAuthenticated]
    permission_classes = [AllowAny,]
    filter_backends = [django_filters.rest_framework.DjangoFilterBackend, filters.SearchFilter]

    filter_fields = {'name': ['icontains'],'asset': ['exact']} 
    #
    # def get(self, request, format=None):
    #     content = {
    #         'user': str(request.user),  # `django.contrib.auth.User` instance.
    #         'auth': str(request.auth),  # None
    #     }
    #     return Response(content)
    #
    # def put(self, request, filename, format=None):
    #     file_obj = request.FILES['file']
    #     # do some stuff with uploaded file
    #     return Response(status=204)

    # def perform_create(self, serializer):
    #     serializer.save(author=self.request.user)

    def get_queryset(self):

        queryset = AssetDetail.objects.all().order_by("-created_at")
    
        # queryset =  Account.objects.all().order_by("-created_at")
        query_params = self.request.query_params
        if '_' in query_params:
            query_params._mutable=True
            print(query_params['_'])
            query_params.pop('_')
            query_params._mutable=False

        if 'page' in query_params:
            query_params._mutable=True
            print(query_params['page'])
            query_params.pop('page')
            query_params._mutable=False

        if 'start_date__gte' in query_params:
            query_params._mutable=True
            print(query_params['start_date__gte'])
            start_date = str(query_params.pop('start_date__gte')[0])
            query_params._mutable=False

        if 'end_date__lte' in query_params:
            query_params._mutable=True
            print(query_params['end_date__lte'])
            end_date = str(query_params.pop('end_date__lte')[0])
            query_params._mutable=False
            
        if 'expriry_date__lte' in query_params:
            query_params._mutable=True
            print(query_params['expriry_date__lte'])
            expriry_date = str(query_params.pop('expriry_date__lte')[0])
            query_params._mutable=False
        try:
            if 'start_date' in locals():
                if 'expriry_date' in locals():
                    queryset = queryset.filter(start_date__gte=start_date,expriry_date__lte=expriry_date)
                else:
                    queryset = queryset.filter(start_date__gte=start_date)

            elif 'end_date' in locals():
                if 'start_date' in locals():
                    queryset = queryset.filter(start_date__gte=start_date,end_date__lte=end_date)
                else:
                    queryset = queryset.filter(end_date__lte=end_date)

            elif 'expriry_date' in locals():
                if 'start_date' in locals():
                    queryset = queryset.filter(start_date__gte=start_date,expriry_date__lte=expriry_date)
                else:
                    queryset = queryset.filter(expriry_date__lte=expriry_date)
        except Exception as xx:
            print("[sFilterRestApiView] Error: %s" % str(xx))
            pass
        if len(query_params)>0:
            # return queryset.filter(**query_params.dict())
            return queryset.filter(reduce(operator.and_, 
                                    (Q(**d) for d in (dict([i]) for i in query_params.dict().items()))))
        else:
            return queryset

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response(status=status.HTTP_204_NO_CONTENT)

    def perform_destroy(self, instance):
        instance.delete()

