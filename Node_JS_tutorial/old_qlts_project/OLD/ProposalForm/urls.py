from django.urls import path, include
from .routers import router
from . import views

from .rest_views import ProposalFormSearchRestApiView
from .rest_views import ProposalFormFilterRestApiView
from .rest_views import ProposalFormTypeSearchRestApiView
from .rest_views import ProposalFormTypeFilterRestApiView
from .rest_views import ProposalFormStatusSearchRestApiView
from .rest_views import ProposalFormStatusFilterRestApiView
from .rest_views import AssetListSearchRestApiView
from .rest_views import AssetListFilterRestApiView
from .rest_views import ListSearchRestApiView
from .rest_views import ListFilterRestApiView


from .views import ProposalFormView
from .views import ProposalFormTypeView
from .views import ProposalFormStatusView
from .views import AssetListView
from .views import ListView
# from .views import ProposalProcessConfigView

urlpatterns = [
    path('api/', include(router.urls)),
    path('List/', views.ListView, name='list'),
    path('AssetList/', views.AssetListView, name='asset_list'),
    path('ProposalFormStatus/', views.ProposalFormStatusView, name='proposal_form_status'),
    path('ProposalFormType/', views.ProposalFormTypeView, name='proposal_form_type'),
    path('ProposalForm/', views.ProposalFormView, name='proposal_form'),
    # ProposalProcessConfig
    # path("ProposalProcessConfig/", views.ProposalProcessConfigView, name="proposal_process_config"),


    #Search
    path('ProposalForm/search/', ProposalFormSearchRestApiView.as_view(), name='proposal_search'),
    path('ProposalForm/filter', ProposalFormFilterRestApiView.as_view(), name='proposal_filter'),
    path('ProposalFormType/search/', ProposalFormTypeSearchRestApiView.as_view(), name='proposal_type_search'),
    path('ProposalFormType/filter', ProposalFormTypeFilterRestApiView.as_view(), name='proposal_type_filter'),
    path('ProposalFormStatus/search/', ProposalFormStatusSearchRestApiView.as_view(), name='proposal_status_search'),
    path('ProposalFormStatus/filter', ProposalFormStatusFilterRestApiView.as_view(), name='proposal_status_filter'),
    path('AssetList/search/', AssetListSearchRestApiView.as_view(), name='asset_list_search'),
    path('AssetList/filter', AssetListFilterRestApiView.as_view(), name='asset_list_filter'),
    path('List/search/', ListSearchRestApiView.as_view(), name='list_search'),
    path('List/filter', ListFilterRestApiView.as_view(), name='list_filter'),

]