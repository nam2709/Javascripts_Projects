from django.urls import path, include
from .krouters import AppPermission_router
from .krouters import ModelsPermission_router
from .krouters import Permission_router
from .krouters import PermissionGroup_router
from .krouters import UserGroup_router
from . import views
from . import krest_view



urlpatterns = [

    #API
    path('app/', include(AppPermission_router.urls)),
    path('models/', include(ModelsPermission_router.urls)),
    path('permission/', include(Permission_router.urls)),
    path('permissiongroup/', include(PermissionGroup_router.urls)),
    path('usergroup/', include(UserGroup_router.urls)),
   #############
    path('GenAppModel/', views.GenAppModel, name="GenAppModel"),

    path('permissiongroup/detail/', views.PermissionGroupDetails, name="permissiongrouplist"),
    path('permissiongroup/search/', krest_view.PermissionGroupSearchRestApiView.as_view(), name='PermissionGroupSearchRestApiView'),
    path('permissiongroup/filter/', krest_view.PermissionGroupFilterRestApiView.as_view(), name='PermissionGroupFilterRestApiView'),
    # path('permissiongroup/remove/', krest_view.PermissionGroupRemoveFileRestApiView, name='PermissionGroupRemoveFileRestApiView'),

   #############
    path('usergroup/detail/', views.UserGroupDetails, name="uresgroupdetail"),
    path('usergroup/search/', krest_view.UserGroupSearchRestApiView.as_view(), name='UserGroupSearchRestApiView'),
    path('usergroup/filter/', krest_view.UserGroupFilterRestApiView.as_view(), name='UserGroupFilterRestApiView'),
    # path('usergroup/list/', krest_view.UserGroupListRestApiView, name='UserGroupFilterRestApiView'),
 
 

]######