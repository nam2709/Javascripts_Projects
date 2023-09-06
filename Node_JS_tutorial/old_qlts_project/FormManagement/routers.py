from rest_framework import routers
from .rest_views import FormManagementViewSet, FormManagementTempleViewSet
from .rest_views import ListTypeFormViewSet
from .rest_views import ListAssetViewSet, ListAssetSimpleViewSet
from .rest_views import HistoryUseAssetViewSet
from .rest_views import AssetViewAllList
from .rest_views import UnitViewSet
from .rest_views import StaffViewSet
from .rest_views import TypeActionViewSet
# from .rest_views import His
from AssetManagement.models import Asset
from company.models import Staff

routers_form = routers.DefaultRouter()

routers_form.register(r'list_form', FormManagementViewSet)
routers_form.register(r'list_form_temp', FormManagementTempleViewSet)
routers_form.register(r'type_form', ListTypeFormViewSet)
routers_form.register(r'list_asset', ListAssetViewSet)
routers_form.register(r'list_asset_simple', ListAssetSimpleViewSet)
routers_form.register(r'history_use_asset', HistoryUseAssetViewSet)
routers_form.register(r'type_action', TypeActionViewSet)
routers_form.register(r'AssetAllList', AssetViewAllList)
routers_form.register(r'UnitTemp', UnitViewSet)
routers_form.register(r'StaffTemp', StaffViewSet)

