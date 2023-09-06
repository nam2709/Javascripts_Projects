from rest_framework import viewsets,status
from .models import AppPermission
from .models import ModelsPermission
from .models import Permission 
from .models import PermissionGroup
from .models import UserGroup
from rest_framework import generics
from rest_framework.response import Response
from .kserializers import AppPermissionSerializer
from .kserializers import ModelsPermissionSerializer
from .kserializers import PermissionGroupSerializer
from .kserializers import PermissionSerializer
from .kserializers import UserGroupSerializer
from .kserializers import UserGroupListSerializer
# from .kserializers import PermissionGroupRemoveFileSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
#ViewSets define the view behavior.
from rest_framework import filters
from Router.models import *
class AppPermissionViewSet(viewsets.ModelViewSet):
    queryset = AppPermission.objects.all()
    serializer_class = AppPermissionSerializer
    
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

class ModelsPermissionViewSet(viewsets.ModelViewSet):
    queryset = ModelsPermission.objects.all()
    serializer_class = ModelsPermissionSerializer
    
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

class PermissionViewSet(viewsets.ModelViewSet):
    queryset = Permission.objects.all()
    serializer_class = PermissionSerializer
    
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
    

class PermissionGroupViewSet(viewsets.ModelViewSet):
    queryset = PermissionGroup.objects.all()
    serializer_class = PermissionGroupSerializer
    
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

class UserGroupViewSet(viewsets.ModelViewSet):
    queryset = UserGroup.objects.all()
    serializer_class = UserGroupSerializer
    
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





# Search Nhóm Người
class UserGroupFilterRestApiView(generics.ListAPIView):
    serializer_class = UserGroupSerializer

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

        queryset = UserGroup.objects.all().order_by("-created_at")
    
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
class UserGroupSearchRestApiView(generics.ListCreateAPIView):
    serializer_class = UserGroupSerializer

    queryset = UserGroup.objects.all()
    
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





# Search Nhóm quyền
class PermissionGroupFilterRestApiView(generics.ListAPIView):
    serializer_class = PermissionGroupSerializer

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

        queryset = PermissionGroup.objects.all().order_by("-created_at")
    
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

   
class PermissionGroupSearchRestApiView(generics.ListCreateAPIView):
    serializer_class = PermissionGroupSerializer

    queryset = PermissionGroup.objects.all()
    
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

# class PermissionGroupRemoveFileRestApiView(viewsets.ModelViewSet):
#     serializer_class = PermissionGroupRemoveFileSerializer

#     queryset = PermissionGroup.objects.all().order_by("-created_at")
    
#     # queryset = PermissionGroup.objects.all().order_by("-created_at")
#     pagination_class = StandardResultsSetPagination
#     # lookup_field = 'name'
#     lookup_field = 'uuid'

#     # authentication_classes = [
#     #     JWTAuthentication,
#     #     JSONWebTokenAuthentication,
#     #     TokenAuthentication,
#     #     SessionAuthentication,
#     #     BasicAuthentication,
#     # ]
#     # permission_classes = [IsAuthenticated]
#     permission_classes = [AllowAny,]
#     #
#     # def get(self, request, format=None):
#     #     content = {
#     #         'user': str(request.user),  # `django.contrib.auth.User` instance.
#     #         'auth': str(request.auth),  # None
#     #     }
#     #     return Response(content)
#     #
#     # def put(self, request, filename, format=None):
#     #     file_obj = request.FILES['file']
#     #     # do some stuff with uploaded file
#     #     return Response(status=204)

#     # def perform_create(self, serializer):
#     #     serializer.save(author=self.request.user)

#     # def get_queryset(self):
#     #     user = self.request.user
#     #     return models.Account.objects.filter(author=user)
#     # def get_queryset(self):
#     #     # user = self.request.name
#     #     if 'name' in self.kwargs:
#     #         return Account.objects.filter(name=self.kwargs["name"]).order_by("-created_at")
#     #     else:
#     #         return Account.objects.all().order_by("-created_at")
#     # def retrieve(self, request, *args, **kwargs): # Change is here <<
#     #     serializer = self.get_serializer(self.get_queryset(), many=True)
#     #     return Response(data=serializer.data)
#     def destroy(self, request, *args, **kwargs):
#         instance = self.get_object()
#         self.perform_destroy(instance)
#         return Response(status=status.HTTP_204_NO_CONTENT)

#     def perform_destroy(self, instance):
#         instance.delete()



class UserGroupListRestApiView(viewsets.ModelViewSet):
    serializer_class = UserGroupListSerializer

    queryset = UserGroup.objects.all().order_by("-created_at")
    
    # queryset = Account.objects.all().order_by("-created_at")
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
    class Meta:
        ordering = ['-id']


    