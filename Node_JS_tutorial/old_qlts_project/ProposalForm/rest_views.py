from rest_framework import viewsets, status
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
import django_filters.rest_framework
from rest_framework import generics
from rest_framework import filters

from Router.models import *


from .models import ProposalForm
from .models import ProposalFormType
from .models import ProposalFormStatus
from .models import AssetList
from .models import List
from .models import ListType
# from .models import ProposalProcessConfig

from .serializers import ProposalFormSerializer
from .serializers import ProposalFormTypeSerializer
from .serializers import ProposalFormStatusSerializer
from .serializers import AssetListSerializer
from .serializers import ListSerializer
from .serializers import ListTypeSerializer
# from .serializers import ProposalProcessConfigSerializer



# class ProposalProcessConfigViewSet(viewsets.ModelViewSet):
#     queryset = ProposalProcessConfig.objects.all().order_by('-updated_at')
#     serializer_class = ProposalProcessConfigSerializer
#     http_method_names=("get", "post", "delete", "put", "patch")

#     def get_queryset(self):
#         query_set = self.queryset
#         crr_user = self.request.user
#         query_set_by_request_user = query_set.filter(created_by=crr_user)
#         return query_set_by_request_user
# ------------------------------------------------------------------------




class ProposalFormViewSet(viewsets.ModelViewSet):
    queryset = ProposalForm.objects.all().order_by('-updated_at')
    serializer_class = ProposalFormSerializer
    http_method_names=("get", "post", "delete", "put", "patch")

    def get_queryset(self):
        query_set = self.queryset
        crr_user = self.request.user
        query_set_by_request_user = query_set.filter(created_by=crr_user)
        return query_set_by_request_user
    
        
class ProposalFormTypeViewSet(viewsets.ModelViewSet):
    queryset = ProposalFormType.objects.all()
    serializer_class = ProposalFormTypeSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['name', 'code']

    def get_queryset(self):
        query_set = self.queryset
        crr_user = self.request.user
        query_set_by_request_user = query_set.filter(created_by=crr_user)
        return query_set_by_request_user
    

class ProposalFormStatusViewSet(viewsets.ModelViewSet):
    queryset = ProposalFormStatus.objects.all()
    serializer_class = ProposalFormStatusSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['name', 'code']

    def get_queryset(self):
        query_set = self.queryset
        crr_user = self.request.user
        query_set_by_request_user = query_set.filter(created_by=crr_user)
        return query_set_by_request_user
    

class AssetListViewSet(viewsets.ModelViewSet):
    queryset = AssetList.objects.all()
    serializer_class = AssetListSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['name', 'code']

    def get_queryset(self):
        query_set = self.queryset
        crr_user = self.request.user
        query_set_by_request_user = query_set.filter(created_by=crr_user)
        return query_set_by_request_user
    

class ListViewSet(viewsets.ModelViewSet):
    queryset = List.objects.all()
    serializer_class = ListSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['list']


class ListTypeViewSet(viewsets.ModelViewSet):
    queryset = ListType.objects.all()
    serializer_class = ListTypeSerializer
    filter_backends = [django_filters.rest_framework.DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filter_fields = {'name': ['icontains'], 'code': ['icontains']}
    search_fields = ['name', 'code']

    def get_queryset(self):
        query_set = self.queryset
        crr_user = self.request.user
        query_set_by_request_user = query_set.filter(created_by=crr_user)
        return query_set_by_request_user


#ProposalForm Search

class ProposalFormSearchRestApiView(generics.ListCreateAPIView):
    serializer_class = ProposalFormSerializer

    queryset = ProposalForm.objects.all()

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

class ProposalFormFilterRestApiView(generics.ListAPIView):
    serializer_class = ProposalFormSerializer

    pagination_class = StandardResultsSetPagination

    permission_classes = [AllowAny,]

    def get_queryset(self):

        queryset = ProposalForm.objects.all().order_by("-created_at")
    
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


# ProposalFormType
class ProposalFormTypeSearchRestApiView(generics.ListCreateAPIView):
    serializer_class = ProposalFormTypeSerializer

    queryset = ProposalFormType.objects.all()

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

class ProposalFormTypeFilterRestApiView(generics.ListAPIView):
    serializer_class = ProposalFormTypeSerializer

    pagination_class = StandardResultsSetPagination

    permission_classes = [AllowAny,]

    def get_queryset(self):

        queryset = ProposalFormType.objects.all().order_by("-created_at")
    
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



# ProposalFormStatus
class ProposalFormStatusSearchRestApiView(generics.ListCreateAPIView):
    serializer_class = ProposalFormStatusSerializer

    queryset = ProposalFormStatus.objects.all()

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

class ProposalFormStatusFilterRestApiView(generics.ListAPIView):
    serializer_class = ProposalFormStatusSerializer

    pagination_class = StandardResultsSetPagination

    permission_classes = [AllowAny,]

    def get_queryset(self):

        queryset = ProposalFormStatus.objects.all().order_by("-created_at")
    
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


    
# AssetList
class AssetListSearchRestApiView(generics.ListCreateAPIView):
    serializer_class = AssetListSerializer

    queryset = AssetList.objects.all()

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

class AssetListFilterRestApiView(generics.ListAPIView):
    serializer_class = AssetListSerializer

    pagination_class = StandardResultsSetPagination

    permission_classes = [AllowAny,]

    def get_queryset(self):

        queryset = AssetList.objects.all().order_by("-created_at")
    
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



# List
class ListSearchRestApiView(generics.ListCreateAPIView):
    serializer_class = ListSerializer

    queryset = List.objects.all()

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

class ListFilterRestApiView(generics.ListAPIView):
    serializer_class = ListSerializer

    pagination_class = StandardResultsSetPagination

    permission_classes = [AllowAny,]

    def get_queryset(self):

        queryset = List.objects.all().order_by("-created_at")
    
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









