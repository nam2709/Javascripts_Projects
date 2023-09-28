from django.urls import path, include
from .krouters import commune_router
from .krouters import city_router
from .krouters import companystatus_router
from .krouters import company_router
from .krouters import unit_router
from .krouters import position_router
from .krouters import staffstatus_router
from .krouters import staff_router
from .krouters import staffinformation_router
from .krouters import district_router
from .krouters import companyupdate_router
from .krouters import companydelete_router
from . import views
from . import krest_view


urlpatterns = [
    path('commune/', include(commune_router.urls)),
    path('district/', include(district_router.urls)),
    path('city/', include(city_router.urls)),
    path('companystatus/', include(companystatus_router.urls)),
    path('company/', include(company_router.urls)),
    path('unit/', include(unit_router.urls)),
    path('position/', include(position_router.urls)),
    path('staffstatus/', include(staffstatus_router.urls)),
    path('staff/', include(staff_router.urls)),
    path('staffinformation/', include(staffinformation_router.urls)),
    

 
 ##################
    path('company/delete/', include(companydelete_router.urls)),
    # path('company/check_duplcate/', include(companydelete_router.urls)),
    path('company/update/', include(companyupdate_router.urls)),
####################
    # path('', views.Index, name='company'),
    path('company/Detail/', views.CompanyDetails, name="companylist"),
    path('company/search/', krest_view.CompanySearchRestApiView.as_view(), name='CompanySearchRestApiView'),
    path('company/filter/', krest_view.CompanyFilterRestApiView.as_view(), name='CompanyFilterRestApiView'),
    # path('staff/', include(tnv_staff_router.urls)),
    # path('api-auth/', include('rest_framework.urls', namespace='rest_framework'))
##############
    path('Staff/Detail/', views.StaffDetails, name="Stafflist"),
    path('staff/search/', krest_view.StaffSearchRestApiView.as_view(), name='StaffSearchRestApiView'),
    path('staff/filter/', krest_view.StaffFilterRestApiView.as_view(), name='StaffFilterRestApiView'),
   
    #############
    path('StaffInformation/Detail/', views.StaffInformationDetails, name="StafflInformationist"),
    path('StaffInformation/search/', krest_view.StaffInformationSearchRestApiView.as_view(), name='StaffInformationSearchRestApiView'),
    path('StaffInformation/filter/', krest_view.StaffInformationSearchRestApiView.as_view(), name='StaffInformationFilterRestApiView'),
    ##################################
    path('Unit/Detail/', views.UnitDetails, name="Unitlist"),
    path('Unit/search/', krest_view.UnitSearchRestApiView.as_view(), name='UnitSearchRestApiView'),
    path('Unit/filter/', krest_view.UnitFilterRestApiView.as_view(), name='UnitFilterRestApiView'),
#     ##################################
    path('Position/Detail/', views.PositionDetails, name="Positionlist"),
    path('Position/search/', krest_view.PositionSearchRestApiView.as_view(), name='PositionSearchRestApiView'),
    path('Position/filter/', krest_view.PositionFilterRestApiView.as_view(), name='PositionFilterRestApiView'),
#     #####################
    path('CompanyStatus/Detail/', views.CompanyStatusDetails, name="CompanyStatuslist"),
    path('CompanyStatus/search/', krest_view.CompanyStatusSearchRestApiView.as_view(), name='CompanyStatusSearchRestApiView'),
    path('CompanyStatus/filter/', krest_view.CompanyStatusFilterRestApiView.as_view(), name='CompanyStatusFilterRestApiView'),
#     #############################
    path('StaffStatus/Detail/', views.StaffStatusDetails, name="StaffStatuslist"),
    path('StaffStatus/search/', krest_view.StaffStatusSearchRestApiView.as_view(), name='StaffStatusSearchRestApiView'),
    path('StaffStatus/filter/', krest_view.StaffStatusFilterRestApiView.as_view(), name='StaffStatusFilterRestApiView'),

    #     #############################
    path('UpdatePDW/', views.UpdatePDW, name="UpdateProvinceDistrictWard"),
 ]######