from rest_framework import serializers

from .models import Asset
from .models import AssetType
from .models import AssetOfType
from .models import SupplierCategory
from .models import WareHouseCategory
from .models import UnitCategory
from .models import CurrencyUnit
from .models import AssetStatus
from .models import OwnStatus
from .models import AssetDetailTemplate
from .models import AssetDetail

from django_filters import FilterSet

# Serializers define the API representation.


class AssetSerializer(serializers.ModelSerializer):
    name_asset_type = serializers.CharField(source='asset_type.name',read_only=True)
    name_asset_status = serializers.CharField(source='asset_status.name',read_only=True)
    name_warehouse = serializers.CharField(source='warehouse.name',read_only=True)
    name_supplier = serializers.CharField(source='supplier.name',read_only=True)
    name_current_asset_user = serializers.CharField(source='current_asset_user.name',read_only=True)
    name_own_status = serializers.CharField(source='own_status.name',read_only=True)
    name_unit = serializers.CharField(source='unit.name',read_only=True)
    name_currency_unit = serializers.CharField(source='currency_unit.name',read_only=True)
    name_owned_company = serializers.CharField(source='owned_company.name',read_only=True)
    class Meta:
        model = Asset
        fields = [
            'uuid',
            'code',
            'name',
            'date_added',
            
            'name_asset_type',
            'asset_type',
            
            'name_asset_status',
            'asset_status',
            
            'price_buy',
            'price_current',
            
            'name_warehouse',
            'warehouse',
            
            'name_supplier',
            'supplier',
            
            'name_current_asset_user',
            'current_asset_user',
            
            'name_own_status',
            'own_status',
            
            'name_unit',
            'unit',
            
            'name_currency_unit',
            'currency_unit',
            
            'name_owned_company',
            'owned_company',
            
            'created_at',
            'updated_at'
        ]

    def get_request_user(self):
        request_user = None
        if 'request' in self.context and hasattr(self.context['request'], "user"):
            request_user = self.context['request'].user
        return request_user

    def create(self, validated_data):
        validated_data['created_by'] = self.get_request_user()
        return super().create(validated_data)

    def update(self, instance, validated_data):
        validated_data['updated_by'] = self.get_request_user()
        return super().update(instance, validated_data)


class AssetSmallSerializer(serializers.ModelSerializer):
    class Meta:
        model = Asset
        fields = (
            "uuid",
            "code",
            "name",
        )
  
    
class AssetTypeSerializer(serializers.ModelSerializer):
    name_asset_of_type = serializers.CharField(source='asset_of_type.name',read_only=True)
    class Meta:
        model = AssetType
        fields = [
            'uuid',
            'code',
            'name',
            'name_asset_of_type',
            'asset_of_type',
            'created_at',
            'updated_at',
            'created_by',
        ]

    def get_request_user(self):
        request_user = None
        if 'request' in self.context and hasattr(self.context['request'], "user"):
            request_user = self.context['request'].user
        return request_user

    def create(self, validated_data):
        validated_data['created_by'] = self.get_request_user()
        return super().create(validated_data)

    def update(self, instance, validated_data):
        validated_data['updated_by'] = self.get_request_user()
        return super().update(instance, validated_data)
    
    
class AssetOfTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = AssetOfType
        fields = [
            'uuid',
            'code',
            'name',
            'created_at',
            'updated_at',
            'created_by',
        ]

    def get_request_user(self):
        request_user = None
        if 'request' in self.context and hasattr(self.context['request'], "user"):
            request_user = self.context['request'].user
        return request_user

    def create(self, validated_data):
        validated_data['created_by'] = self.get_request_user()
        return super().create(validated_data)

    def update(self, instance, validated_data):
        validated_data['updated_by'] = self.get_request_user()
        return super().update(instance, validated_data)


class SupplierCategorySerializer(serializers.ModelSerializer):
    name_address = serializers.CharField(source='address.name',read_only=True)
    class Meta:
        model = SupplierCategory
        fields = [
            'uuid',
            'code',
            'name_address',
            'name',
            'address',
            'detail_address',
            'contact_info',
            'created_at',
            'updated_at',
            'created_by',
        ]

    def get_request_user(self):
        request_user = None
        if 'request' in self.context and hasattr(self.context['request'], "user"):
            request_user = self.context['request'].user
        return request_user

    def create(self, validated_data):
        validated_data['created_by'] = self.get_request_user()
        return super().create(validated_data)

    def update(self, instance, validated_data):
        validated_data['updated_by'] = self.get_request_user()
        return super().update(instance, validated_data)
    

#SC Short
class SupplierCategoryShortSerializer(serializers.ModelSerializer):
    class Meta:
        model = SupplierCategory
        fields = (
            'uuid',
            'name',
        )
    


class WareHouseCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = WareHouseCategory
        fields = (
            'uuid',
            'code',
            'name',
            'status',
            'manager',
            'updated_at',
            'created_at',
            'created_by',
        )

    def get_request_user(self):
        request_user = None
        if 'request' in self.context and hasattr(self.context['request'], "user"):
            request_user = self.context['request'].user
        return request_user

    def create(self, validated_data):
        validated_data['created_by'] = self.get_request_user()
        return super().create(validated_data)

    def update(self, instance, validated_data):
        validated_data['updated_by'] = self.get_request_user()
        return super().update(instance, validated_data)
    

# WH Short
class WareHouseCategoryShortSerializer(serializers.ModelSerializer):
    class Meta:
        model = WareHouseCategory
        fields = (
            'uuid',
            'name',
        )

# Own Status Short
class OwnStatusShortSerializer(serializers.ModelSerializer):
    class Meta:
        model = OwnStatus
        fields = (
            'uuid',
            'name',
        )
        

class UnitCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = UnitCategory
        fields = [
            'uuid',
            'code',
            'name',
            'created_at',
            'updated_at',
            'created_by',
        ]

    def get_request_user(self):
        request_user = None
        if 'request' in self.context and hasattr(self.context['request'], "user"):
            request_user = self.context['request'].user
        return request_user

    def create(self, validated_data):
        validated_data['created_by'] = self.get_request_user()
        return super().create(validated_data)

    def update(self, instance, validated_data):
        validated_data['updated_by'] = self.get_request_user()
        return super().update(instance, validated_data)


class CurrencyUnitSerializer(serializers.ModelSerializer):
    class Meta:
        model = CurrencyUnit
        fields = [
            'uuid',
            'code',
            'name',
            'created_at',
            'updated_at',
            'created_by',
        ]

    def get_request_user(self):
        request_user = None
        if 'request' in self.context and hasattr(self.context['request'], "user"):
            request_user = self.context['request'].user
        return request_user

    def create(self, validated_data):
        validated_data['created_by'] = self.get_request_user()
        return super().create(validated_data)

    def update(self, instance, validated_data):
        validated_data['updated_by'] = self.get_request_user()
        return super().update(instance, validated_data)
 

class AssetStatusSerializer(serializers.ModelSerializer):
    class Meta:
        model = AssetStatus
        fields = [
            'uuid',
            'code',
            'name',
            'detail_description',
            'created_at',
            'updated_at',
            'created_by',
        ]

    def get_request_user(self):
        request_user = None
        if 'request' in self.context and hasattr(self.context['request'], "user"):
            request_user = self.context['request'].user
        return request_user

    def create(self, validated_data):
        validated_data['created_by'] = self.get_request_user()
        return super().create(validated_data)

    def update(self, instance, validated_data):
        validated_data['updated_by'] = self.get_request_user()
        return super().update(instance, validated_data)


class OwnStatusSerializer(serializers.ModelSerializer):
    class Meta:
        model = OwnStatus
        fields = [
            'uuid',
            'code',
            'name',
            'detail_description',
            'created_at',
            'updated_at',
            'created_by',
        ]

    def get_request_user(self):
        request_user = None
        if 'request' in self.context and hasattr(self.context['request'], "user"):
            request_user = self.context['request'].user
        return request_user

    def create(self, validated_data):
        validated_data['created_by'] = self.get_request_user()
        return super().create(validated_data)

    def update(self, instance, validated_data):
        validated_data['updated_by'] = self.get_request_user()
        return super().update(instance, validated_data)
    

class AssetDetailTemplateSerializer(serializers.ModelSerializer):
    name_asset_type = serializers.CharField(source='asset_type.name',read_only=True)
    class Meta:
        model = AssetDetailTemplate
        fields = [
            'uuid',
            'code',
            'name',
            'name_asset_type',
            'asset_type',
            'created_at',
            'created_by',
            'updated_at',
            'updated_by',
        ]

    def get_request_user(self):
        request_user = None
        if 'request' in self.context and hasattr(self.context['request'], "user"):
            request_user = self.context['request'].user
        return request_user

    def create(self, validated_data):
        validated_data['created_by'] = self.get_request_user()
        return super().create(validated_data)

    def update(self, instance, validated_data):
        validated_data['updated_by'] = self.get_request_user()
        return super().update(instance, validated_data)


class AssetDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = AssetDetail
        fields = [
            'uuid',
            'code',
            'name',
            'value',
            'asset'
        ]

    def get_request_user(self):
        request_user = None
        if 'request' in self.context and hasattr(self.context['request'], "user"):
            request_user = self.context['request'].user
        return request_user

    def create(self, validated_data):
        validated_data['created_by'] = self.get_request_user()
        return super().create(validated_data)

    def update(self, instance, validated_data):
        validated_data['updated_by'] = self.get_request_user()
        return super().update(instance, validated_data)

