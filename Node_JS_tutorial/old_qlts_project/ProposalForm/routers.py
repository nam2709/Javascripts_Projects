from rest_framework import routers
from .rest_views import ProposalFormViewSet
from .rest_views import ProposalFormTypeViewSet
from .rest_views import ProposalFormStatusViewSet
from .rest_views import AssetListViewSet
from .rest_views import ListViewSet
from .rest_views import ListTypeViewSet
# from .rest_views import ProposalProcessConfigViewSet

# Routers provide an easy way of automatically determining the URL conf.
router = routers.DefaultRouter()
router.register(r'List', ListViewSet)
router.register(r'AssetList', AssetListViewSet)
router.register(r'ProposalFormType', ListTypeViewSet)
router.register(r'ProposalFormStatus', ProposalFormStatusViewSet)
router.register(r'ProposalForm', ProposalFormViewSet)
# 
# router.register(r'ProposalProcessConfig', ProposalProcessConfigViewSet)
