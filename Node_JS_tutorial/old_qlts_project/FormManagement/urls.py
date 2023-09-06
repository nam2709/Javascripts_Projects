
from django.urls import path, include
# from .routers import form_management_router
# from .routers import type_form_router
# from .routers import list_asset_router, list_asset_simple_router
# from .routers import history_use_asset_router
from .routers import routers_form
from . import views

urlpatterns = [
    path('form/', include(routers_form.urls)),
    # path('type_form/', include(type_form_router.urls)),
    # path('list_asset/', include(list_asset_router.urls)),
    # path('list_asset_simple/', include(list_asset_simple_router.urls)),
    # path('history_use_asset/', include(history_use_asset_router.urls)),
    


    path('', views.Index, name='Index'),
    path('form_list/', views.FormListView, name="FormView"),
    path('asset_list_by_form/', views.AssetListView, name="AssetListView"),
    path('form_type/', views.TypeFormView, name='TypeFormView'),
    path('history/', views.HistoryUseAssetFormView, name='HistoryUseAssetFormView'),
    path('type_action/', views.TypeActionFormView, name='TypeActionFormView'),
    path('history/<uuid:pk>/', views.TimelineHistoryUseAssetFormView, name='timeline'),
    # path('timeline/<uuid:pk>/', views.TimelineHistoryUseAssetFormView, name='timeline'),
    # path('details/<slug>/', views.Form_DetailView, name='Form_DetailView'),
    # path('test1/',views.test1,name='test1'),
]   