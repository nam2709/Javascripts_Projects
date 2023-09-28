from django.urls import path, include

from .routers import router
from .routers_short import router_short
# Search
from .rest_views import AssetSearchRestApiView
from .rest_views import AssetFilterRestApiView
from .rest_views import WareHouseCategorySearchRestApiView
from .rest_views import WareHouseCategoryFilterRestApiView
from .rest_views import UnitCategorySearchRestApiView
from .rest_views import UnitCategoryFilterRestApiView
from .rest_views import CurrencyUnitSearchRestApiView
from .rest_views import SupplierCategorySearchRestApiView
from .rest_views import SupplierCategoryFilterRestApiView
from .rest_views import AssetStatusSearchRestApiView
from .rest_views import AssetStatusFilterRestApiView
from .rest_views import OwnStatusSearchRestApiView
from .rest_views import OwnStatusFilterRestApiView
from .rest_views import AssetOfTypeSearchRestApiView
from .rest_views import AssetOfTypeFilterRestApiView
from .rest_views import AssetTypeSearchRestApiView
from .rest_views import AssetTypeFilterRestApiView
from .rest_views import AssetDetailSearchRestApiView
from .rest_views import AssetDetailFilterRestApiView

# from .rest_views import AssetDetailFilterViewSet


from .views import AssetView
from .views import assettype_view
from .views import assetoftype_view
from .views import assetdetail_view
from .views import assetdetailtemplate_view
from .views import assetstatus_view
from .views import ownstatus_view
from .views import suppliercategory_view
from .views import unitcategory_view
from .views import currency_unit_view
from .views import warehousecategory_view
from .views import postasset_view

urlpatterns = [
    # path('dashboard/', views.dashboard, name='dashboard'),
    path('api/', include(router.urls)),
    path('api-short/', include(router_short.urls)),
    
    path('Asset/', AssetView, name='asset'),
    path('AssetType/', assettype_view, name='asset_type'),
    path('AssetOfType/', assetoftype_view, name='asset_of_type'),
    path('AssetDetail/', assetdetail_view, name='asset_detail'),
    path('AssetDetailTemplate/', assetdetailtemplate_view, name='asset_detail_template'),
    path('AssetStatus/', assetstatus_view, name='asset_status'),
    path('OwnStatus/', ownstatus_view, name='own_status'),
    path('SupplierCategory/', suppliercategory_view, name='supplier_category'),
    path('UnitCategory/', unitcategory_view, name='unit_category'),
    path('CurrencyUnit/', currency_unit_view, name='currency_unit'),
    path('WareHouseCategory/', warehousecategory_view, name='ware_house_category'),
    path('CreateAsset/', postasset_view, name='postasset_view'),
    
    # Search
    path('Asset/search/', AssetSearchRestApiView.as_view(), name='asset_search'),
    path('Asset/filter/', AssetFilterRestApiView.as_view(), name='asset_filter'),
    
    path('WareHouseCategory/search/', WareHouseCategorySearchRestApiView.as_view(), name='WareHouseCategory_search'),
    path('WareHouseCategory/filter/', WareHouseCategoryFilterRestApiView.as_view(), name='WareHouseCategory_filter'),
    
    path('UnitCategory/search/', UnitCategorySearchRestApiView.as_view(), name='UnitCategory_search'),
    path('UnitCategory/filter/', UnitCategoryFilterRestApiView.as_view(), name='UnitCategory_filter'),
    
    path('CurrencyUnit/search/', CurrencyUnitSearchRestApiView.as_view(), name='CurrencyUnit_search'),
    
    path('SupplierCategory/search/', SupplierCategorySearchRestApiView.as_view(), name='SupplierCategory_search'),
    path('SupplierCategory/filter/', SupplierCategoryFilterRestApiView.as_view(), name='SupplierCategory_filter'),
    
    path('AssetStatus/search/', AssetStatusSearchRestApiView.as_view(), name='AssetStatus_search'),
    path('AssetStatus/filter/', AssetStatusFilterRestApiView.as_view(), name='AssetStatus_filter'),
    
    path('OwnStatus/search/', OwnStatusSearchRestApiView.as_view(), name='OwnStatus_search'),
    path('OwnStatus/filter/', OwnStatusFilterRestApiView.as_view(), name='OwnStatus_filter'),
    
    path('AssetOfType/search/', AssetOfTypeSearchRestApiView.as_view(), name='AssetOfType_search'),
    path('AssetOfType/filter/', AssetOfTypeFilterRestApiView.as_view(), name='AssetOfType_filter'),
    
    path('AssetType/search/', AssetTypeSearchRestApiView.as_view(), name='AssetType_search'),
    path('AssetType/filter/', AssetTypeFilterRestApiView.as_view(), name='AssetType_filter'),
    
    path('AssetDetail/search/', AssetDetailSearchRestApiView.as_view(), name='AssetDetail_search'),
    path('AssetDetail/filter/', AssetDetailFilterRestApiView.as_view(), name='AssetDetail_filter'),
    
    # path('api/AssetDetail/Filter/', AssetDetailFilterViewSet.as_view(), name='AssetDetail_filter'),
    
]