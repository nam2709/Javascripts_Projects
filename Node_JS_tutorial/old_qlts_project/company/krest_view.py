from rest_framework import viewsets,status
from .models import Commune 
from .models import City 
from .models import CompanyStatus 
from .models import Company
from .models import Unit 
from .models import Position 
from .models import StaffStatus 
from .models import Staff 
from .models import StaffInformation 
from .models import District
from rest_framework import generics
from rest_framework.response import Response
from .kserializers import CommuneSerializer
from .kserializers import CitySerializer
from .kserializers import CompanyStatusSerializer
from .kserializers import CompanySerializer
from .kserializers import UnitSerializer
from .kserializers import PositionSerializer
from .kserializers import StaffStatusSerializer
from .kserializers import StaffSerializer
from .kserializers import StaffInformationSerializer
from .kserializers import DistrictSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
#ViewSets define the view behavior.
from rest_framework import filters
from Router.models import *




#Chi Tiết Nhân Viên
class StaffinformationFilterRestApiView(generics.ListAPIView):
    serializer_class = StaffInformationSerializer

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

        queryset = Staff.objects.all().order_by("-created_at")
    
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
class StaffInformationSearchRestApiView(generics.ListCreateAPIView):
    serializer_class = StaffInformationSerializer

    queryset = StaffInformation.objects.all()
    
    pagination_class = StandardResultsSetPagination
    # lookup_field = 'id'
    search_fields = ['staff__name',]
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
# Nhân Viên
class StaffSearchRestApiView(generics.ListCreateAPIView):
    serializer_class = StaffSerializer

    queryset = Staff.objects.all()
    
    pagination_class = StandardResultsSetPagination
    # lookup_field = 'id'
    search_fields = ['name','code']
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

class StaffFilterRestApiView(generics.ListAPIView):
    serializer_class = StaffSerializer

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

        queryset = Staff.objects.all().order_by("-created_at")
    
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



        instance.delete()
#Công Ty
class CompanySearchRestApiView(generics.ListCreateAPIView):
    serializer_class = CompanySerializer

    queryset = Company.objects.all()
    
    pagination_class = StandardResultsSetPagination
    # lookup_field = 'id'
    search_fields = ['name',]
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

class CompanyFilterRestApiView(generics.ListAPIView):
    serializer_class = CompanySerializer

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

        queryset = Company.objects.all().order_by("-created_at")
    
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
#Xã
class CommuneViewSet(viewsets.ModelViewSet):
    queryset = Commune.objects.all()
    serializer_class = CommuneSerializer
    # template_name = 'CompanyManagement/company_list.html'
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
#huyện
class DistrictViewSet(viewsets.ModelViewSet):
    queryset = District.objects.all()
    serializer_class = DistrictSerializer
    def get_queryset(self):
        # return super().get_queryset()
        query_set = self.queryset
        crr_user = self.request.user
        query_set_by_request_user = query_set.filter(created_by =crr_user).all()
        return query_set_by_request_user
#City
class CityViewSet(viewsets.ModelViewSet):
    queryset = City.objects.all()
    serializer_class = CitySerializer
    def get_queryset(self):
        # return super().get_queryset()
        query_set = self.queryset
        crr_user = self.request.user
        query_set_by_request_user = query_set.filter(created_by =crr_user).all()
        return query_set_by_request_user

#tình trạng cty
class CompanyStatusViewSet(viewsets.ModelViewSet):
    queryset = CompanyStatus.objects.all()
    serializer_class = CompanyStatusSerializer
    def get_queryset(self):
        # return super().get_queryset()
        query_set = self.queryset
        crr_user = self.request.user
        query_set_by_request_user = query_set.filter(created_by =crr_user).all()
        return query_set_by_request_user
class CompanyStatusFilterRestApiView(generics.ListAPIView):
    serializer_class = CompanyStatusSerializer

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

        queryset = CompanyStatus.objects.all().order_by("-created_at")
    
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
class CompanyStatusSearchRestApiView(generics.ListCreateAPIView):
    serializer_class = CompanyStatusSerializer

    queryset = CompanyStatus.objects.all()
    
    pagination_class = StandardResultsSetPagination
    # lookup_field = 'id'
    search_fields = ['name',]
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
#Công ty
class CompanyViewSet(viewsets.ModelViewSet):
    queryset = Company.objects.all()
    serializer_class = CompanySerializer
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

#Phòng Ban đơn vị
class UnitViewSet(viewsets.ModelViewSet):
    queryset = Unit.objects.all()
    serializer_class = UnitSerializer
    def get_queryset(self):
        query_set = self.queryset
        crr_user = self.request.user
        query_set_by_request_user = query_set.filter(created_by =crr_user).all()
        return query_set_by_request_user
class UnitFilterRestApiView(generics.ListAPIView):
    serializer_class = UnitSerializer

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

        queryset = Unit.objects.all().order_by("-created_at")
    
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
class UnitSearchRestApiView(generics.ListCreateAPIView):
    serializer_class = UnitSerializer

    queryset = Unit.objects.all()
    
    pagination_class = StandardResultsSetPagination
    # lookup_field = 'id'
    search_fields = ['name','code',]
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



#Chức Vụ
class PositionViewSet(viewsets.ModelViewSet):
    queryset = Position.objects.all()
    serializer_class = PositionSerializer
    def get_queryset(self):
        # return super().get_queryset()
        query_set = self.queryset
        crr_user = self.request.user
        query_set_by_request_user = query_set.filter(created_by =crr_user).all()
        return query_set_by_request_user
class PositionFilterRestApiView(generics.ListAPIView):
    serializer_class = PositionSerializer

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

        queryset = Position.objects.all().order_by("-created_at")
    
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
class PositionSearchRestApiView(generics.ListCreateAPIView):
    serializer_class = PositionSerializer

    queryset = Position.objects.all()
    
    pagination_class = StandardResultsSetPagination
    # lookup_field = 'id'
    search_fields = ['name',]
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

#Tình Trạng Nhân Viên
class StaffStatusViewSet(viewsets.ModelViewSet):
    queryset = StaffStatus.objects.all()
    serializer_class = StaffStatusSerializer
    def get_queryset(self):
        # return super().get_queryset()
        query_set = self.queryset
        crr_user = self.request.user
        query_set_by_request_user = query_set.filter(created_by =crr_user).all()
        return query_set_by_request_user
class  StaffStatusFilterRestApiView(generics.ListAPIView):
    serializer_class =  StaffStatusSerializer

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

        queryset =  StaffStatus.objects.all().order_by("-created_at")
    
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
class  StaffStatusSearchRestApiView(generics.ListCreateAPIView):
    serializer_class =  StaffStatusSerializer

    queryset =  StaffStatus.objects.all()
    
    pagination_class = StandardResultsSetPagination
    # lookup_field = 'id'
    search_fields = ['name',]
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
#Nhân Viên
class StaffViewSet(viewsets.ModelViewSet):
    queryset = Staff.objects.all()
    serializer_class = StaffSerializer
    def get_queryset(self):
        # return super().get_queryset()
        query_set = self.queryset
        crr_user = self.request.user
        query_set_by_request_user = query_set.filter(created_by =crr_user).all()
        return query_set_by_request_user
    
# def Staff_Check_Duplicate_Create(request):
#     response = {}
#     response["status"] = "Fail"
#     if request.is_ajax and request.method == "POST":
#         obj = (json.loads(request.body))
#         if 'organization' in obj:
#             org_code = str(obj['organization'])
#         else:
#             response["status"] = "Fail"
#             response["result"] = "Organization_Nofound"
#             return JsonResponse(response)
#         if 'staff_code' in obj:
#             staff_code = str(obj['staff_code'])
#         else:
#             staff_code = None
#         if 'email' in obj:
#             email = str(obj['email'])
#         else:
#             email = None
#         # if staff_code is not None and org_id is not None and email is not None:
#         if staff_code is not None or staff_code != '':
#             try:
#                 org_obj = Organization.objects.filter(code=org_code).first()
#                 account_obj_check_code = Staff.objects.filter(Q(organization=org_obj) & Q(staff_code=staff_code))
#             except Exception as xx:
#                 account_obj_check_code = None
#                 print(xx)
#             if account_obj_check_code is None:
#                 response["status"] = "Fail"
#                 response["result"] = "Duplicate"
#                 return JsonResponse(response)
#         else:
#             response["status"] = "Fail"
#             response["result"] = "Duplicate"
       
#         if account_obj_check_code is not None and account_obj_check_email is not None:
#             # check duplicate of field industry_colleagues, colleagues, self_manager
#             duplicate_list = []
#             industry_colleagues = []
#             colleagues = []
#             self_manager = []
#             if 'industry_colleagues' in obj:
#                 industry_colleagues = obj['industry_colleagues']
#                 if len(industry_colleagues) > 0:
#                     duplicate_list = industry_colleagues
#             if 'colleagues' in obj:
#                 colleagues = obj['colleagues']
#                 if len(colleagues) > 0:
#                     duplicate_list = duplicate_list + colleagues
#             if 'self_manager' in obj and obj['self_manager'] is not None:
#                 self_manager = obj['self_manager']
#             if len(self_manager) > 0:
#                 duplicate_list.append(self_manager)
#             count_list = Counter(duplicate_list)
#             for key, value in count_list.items():
#                 if int(value) > 1 and key != '':
#                     response["status"] = "Fail"
#                     response["result"] = "Duplicate-Colleagues"
#                     return JsonResponse(response)
#             if len(account_obj_check_code) == 0 and len(account_obj_check_email) == 0:
#                 response["status"] = "OK"
#                 response["result"] = "Not_Duplicate"
#                 return JsonResponse(response)
#             else:
#                 response["status"] = "Fail"
#                 response["result"] = "Duplicate"
#                 return JsonResponse(response)
#     else:
#         response["status"] = "NotFound"
#     return JsonResponse(response)

#Thông tin nhân viên
class StaffInformationViewSet(viewsets.ModelViewSet):
    queryset = StaffInformation.objects.all()
    serializer_class = StaffInformationSerializer
    def get_queryset(self):
        # return super().get_queryset()
        query_set = self.queryset
        crr_user = self.request.user
        query_set_by_request_user = query_set.filter(created_by =crr_user).all()
        return query_set_by_request_user


from .kserializers import CompanyUpdateSerializer

class CompanyUpdateRestApiView(viewsets.ModelViewSet):
    serializer_class = CompanyUpdateSerializer

    queryset = Company.objects.all().order_by("-created_at")
    
    #queryset = Account.objects.all().order_by("-created_at")
    # pagination_class = StandardResultsSetPagination
    lookup_field = 'id'

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

    # def get_queryset(self):
    #     user = self.request.user
    #     return models.Account.objects.filter(author=user)

    # def destroy(self, request, *args, **kwargs):
    #     instance = self.get_object()
    #     self.perform_destroy(instance)
    #     return Response(status=status.HTTP_204_NO_CONTENT)
    #
    # def perform_destroy(self, instance):
    #     instance.delete()


from .kserializers import SStaffSerializer
class SStaffRestApiView(viewsets.ModelViewSet):
    serializer_class = SStaffSerializer

    queryset = Staff.objects.all().order_by("-created_at")
    
    #queryset = Account.objects.all().order_by("-created_at")
    # pagination_class = StandardResultsSetPagination
    lookup_field = 'id'

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


from .kserializers import CompanyDeleteSerializer
class CompanyDeleteRestApiView(viewsets.ModelViewSet):
    serializer_class = CompanyDeleteSerializer

    queryset = Company.objects.all().order_by("-created_at")
    
    #queryset = Account.objects.all().order_by("-created_at")
    # pagination_class = StandardResultsSetPagination
    lookup_field = 'id'

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

    # def get_queryset(self):
    #     user = self.request.user
    #     return models.Account.objects.filter(author=user)

    # def destroy(self, request, *args, **kwargs):
    #     instance = self.get_object()
    #     self.perform_destroy(instance)
    #     return Response(status=status.HTTP_204_NO_CONTENT)
    #
    # def perform_destroy(self, instance):
    #     instance.delete()