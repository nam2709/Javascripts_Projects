"""core URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import include, path, re_path
from Router.models import SharedAPIRootRouter
from django.conf import settings
from django.conf.urls.static import static, serve


def api_urls():
    return SharedAPIRootRouter.shared_router.urls
urlpatterns = [
    path('admin_argon/', include('admin_argon.urls')),
    path("", include("Portal.urls")), 
    path('home/', include('home.urls')),
    path("admin/", admin.site.urls),
    path('Account/', include('Account.urls', namespace='Account')),
    path('ProposalForm/', include('ProposalForm.urls')),
    path('api-auth/', include('rest_framework.urls')),
    path('company/',include('company.urls')),
    path('depre/', include('Depreciation.urls')),
    path('AssetManagement/', include('AssetManagement.urls')),
    path('Form/', include('FormManagement.urls')),
    path('Perm/', include('Perm.urls')),
    path('Code/', include('Code.urls')),
    path('SystemGeneralDirectoryManagement/',include('SystemGeneralDirectoryManagement.urls')),
    # path('depre/', include('Depreciation.urls')),
]

if settings.ENABLE_RESTFUL_API is True:
    urlpatterns.append(path('api/v1/', include(api_urls())))

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL,
                          document_root=settings.MEDIA_ROOT)
else:
    urlpatterns.append(re_path(r'^media/(?P<path>.*)$', serve, {'document_root': settings.MEDIA_ROOT}))