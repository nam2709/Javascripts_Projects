from rest_framework import routers

# Short
from .rest_views import AssetSmallViewSet
from .rest_views import WareHouseCategoryShortViewSet
from .rest_views import OwnStatusShortViewSet
from .rest_views import SupplierCategoryShortViewSet




# API Short
router_short = routers.DefaultRouter()

router_short.register(r'AssetShort', AssetSmallViewSet)
router_short.register(r'WareHouseShort', WareHouseCategoryShortViewSet)
router_short.register(r'SupplierShort', SupplierCategoryShortViewSet)
router_short.register(r'OwnStatusShort', OwnStatusShortViewSet)

# router.register(r'search/', AssetSearchRestApiView)
