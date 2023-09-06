from rest_framework import routers
from .krest_view import WardViewSet
from .krest_view import DistrictsViewSet
from .krest_view import ProvinceViewSet



Ward_router = routers.DefaultRouter()
Ward_router.register(r'ward', WardViewSet)
##
Districts_router = routers.DefaultRouter()
Districts_router.register(r'districts', DistrictsViewSet)
##
Province_router = routers.DefaultRouter()
Province_router.register(r'province', ProvinceViewSet)
