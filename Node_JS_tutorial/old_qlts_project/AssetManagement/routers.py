from rest_framework import routers

from .rest_views import AssetViewSet
from .rest_views import AssetTypeViewSet
from .rest_views import AssetOfTypeViewSet
from .rest_views import SupplierCategoryViewSet
from .rest_views import WareHouseCategoryViewSet
from .rest_views import UnitCategoryViewSet
from .rest_views import CurrencyUnitViewSet
from .rest_views import AssetStatusViewSet
from .rest_views import OwnStatusViewSet
from .rest_views import AssetDetailTemplateViewSet
from .rest_views import AssetDetailViewSet



# Routers provide an easy way of automatically determining the URL conf.
router = routers.DefaultRouter()


router.register(r'Asset', AssetViewSet)
router.register(r'AssetType', AssetTypeViewSet)
router.register(r'AssetOfType', AssetOfTypeViewSet)
router.register(r'SupplierCategory', SupplierCategoryViewSet)
router.register(r'WareHouseCategory', WareHouseCategoryViewSet)
router.register(r'UnitCategory', UnitCategoryViewSet)
router.register(r'CurrencyUnit', CurrencyUnitViewSet)
router.register(r'AssetStatus', AssetStatusViewSet)
router.register(r'OwnStatus', OwnStatusViewSet)
router.register(r'AssetDetailTemplate', AssetDetailTemplateViewSet)
router.register(r'AssetDetail', AssetDetailViewSet)


# router.register(r'search/', AssetSearchRestApiView)
