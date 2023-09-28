from rest_framework import routers
from .krest_view import CommuneViewSet
from .krest_view import CityViewSet
from .krest_view import CompanyStatusViewSet
from .krest_view import CompanyViewSet
from .krest_view import UnitViewSet
from .krest_view import PositionViewSet
from .krest_view import StaffStatusViewSet
from .krest_view import StaffViewSet
from .krest_view import StaffInformationViewSet
from .krest_view import DistrictViewSet
from .krest_view import CompanyUpdateRestApiView
from .krest_view import CompanyDeleteRestApiView
#Xa
commune_router = routers.DefaultRouter()
commune_router.register(r'comuner', CommuneViewSet)
##
district_router = routers.DefaultRouter()
district_router.register(r'district', DistrictViewSet)
##
city_router = routers.DefaultRouter()
city_router.register(r'city', CityViewSet)
##
companystatus_router = routers.DefaultRouter()
companystatus_router.register(r'companystatus', CompanyStatusViewSet)
##
company_router = routers.DefaultRouter()
company_router.register(r'company', CompanyViewSet)
##
unit_router = routers.DefaultRouter()
unit_router.register(r'unit', UnitViewSet)
##
position_router = routers.DefaultRouter()
position_router.register(r'position', PositionViewSet)
##
staffstatus_router = routers.DefaultRouter()
staffstatus_router.register(r'staffstatus', StaffStatusViewSet)
##
staff_router = routers.DefaultRouter()
staff_router.register(r'staff', StaffViewSet)
##
staffinformation_router = routers.DefaultRouter()
staffinformation_router.register(r'staffinformation', StaffInformationViewSet)


companyupdate_router = routers.DefaultRouter()
companyupdate_router.register(r'company/update', CompanyUpdateRestApiView)

companydelete_router = routers.DefaultRouter()
companydelete_router.register(r'company/delete', CompanyDeleteRestApiView)
