from rest_framework import routers
from .krest_view import AppPermissionViewSet
from .krest_view import ModelsPermissionViewSet
from .krest_view import PermissionViewSet
from .krest_view import PermissionGroupViewSet
from .krest_view import UserGroupViewSet

AppPermission_router = routers.DefaultRouter()
AppPermission_router.register(r'app', AppPermissionViewSet)
##
ModelsPermission_router = routers.DefaultRouter()
ModelsPermission_router.register(r'models', ModelsPermissionViewSet)
##
Permission_router = routers.DefaultRouter()
Permission_router.register(r'permission', PermissionViewSet)
##
PermissionGroup_router = routers.DefaultRouter()
PermissionGroup_router.register(r'permission_gr',PermissionGroupViewSet)
##
UserGroup_router = routers.DefaultRouter()
UserGroup_router.register(r'usergroup', UserGroupViewSet)
