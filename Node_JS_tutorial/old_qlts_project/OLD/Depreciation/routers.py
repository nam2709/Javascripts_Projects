from django.urls import path, include
from django.contrib.auth.models import User
from rest_framework import routers, serializers, viewsets
from .rest_views import *


# Routers provide an easy way of automatically determining the URL conf.
router = routers.DefaultRouter()

router.register(r'DepreciationDetail', DepreciationDetailViewSet)
router.register(r'DepreciationDetailSmall', DepreciationDetailViewSetSmall)
router.register(r'DepreciationAssetDetail', DepreciationAssetDetaiViewSet)
router.register(r'Asset', AssetViewSet)
router.register(r'Assettype', AssetTypeViewSet)
router.register(r'AssetOftype', AssetOfTypeViewSet)
router.register(r'AssetRevaluation', AssetRevaluationViewSet)
router.register(r'DepreciationPeriod', DepreciationPeriodViewSet)
router.register(r'DepreciationType', DepreciationTypeViewSet)
router.register(r'Adjustment', AdjustmentViewSet)
router.register(r'AssetAll', AssetViewSetAll)

