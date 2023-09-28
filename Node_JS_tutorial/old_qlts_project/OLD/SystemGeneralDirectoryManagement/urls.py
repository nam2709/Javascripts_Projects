from django.urls import path, include
from .krouter import Ward_router
from .krouter import Districts_router
from .krouter import Province_router
from . import views
from . import krest_view


urlpatterns = [
path('UpdatePDW/', views.UpdatePDW, name="UpdateProvinceDistrictWard"),

path('but/', views.UpdatePDW, name="UpdateProvince"),

path('ward/', include(Ward_router.urls)),
path('province/', include(Province_router.urls)),
path('districts/', include(Districts_router.urls)),

]