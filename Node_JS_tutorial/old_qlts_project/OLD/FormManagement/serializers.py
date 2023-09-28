from rest_framework import serializers
from .models import FormManagement
from .models import ListTypeForm
from .models import ListAsset
from .models import HistoryUseAsset
from .models import TypeAction
from AssetManagement.models import Asset
from company.models import Staff, Unit, Company

from django.utils import timezone
import datetime


class CustomDateField(serializers.DateField):
    def to_internal_value(self, value):
        if isinstance(value, datetime.datetime):
            value = timezone.localtime(value).date()
        return super().to_internal_value(value)
class ListTypeFormSerializer(serializers.ModelSerializer):
    fields = serializers.MultipleChoiceField(choices=ListTypeForm.FIELDS_FORM)
    class Meta:
        model = ListTypeForm
        fields = [
            'uuid',
            'name', 
            'code',
            'fields',
            'created_by',
            'updated_by',
            'updated_at',
            'created_at',
        ]
    def get_request_user(self):
        if 'request' in self.context and hasattr(self.context['request'], "user"):
            request_user = self.context['request'].user
        return request_user

    def create(self, validated_data):
        validated_data["created_by"] = self.get_request_user()
        return super().create(validated_data)

    def update(self, instance, validated_data):
        validated_data["updated_by"] = self.get_request_user()
        instance.name = validated_data.get('name', instance)
        return super().update(instance, validated_data)

class UnitTempSerializer(serializers.ModelSerializer):
    get_name_company = serializers.CharField(source='company.name', read_only=True)
    class Meta:
        model = Unit
        fields = [
            'uuid',
            'name',
            'company',
            'get_name_company',
        ]
class FormManagementSerializer(serializers.ModelSerializer):
    # uuid = serializers.UUIDField(format='hex', read_only=True)
    get_name_type_form = serializers.CharField(source='type_form.name', read_only=True)
    get_name_staff_receive_property = serializers.CharField(source='staff_receive_property.name', read_only=True)
    get_name_staff_confiscated_asset = serializers.CharField(source='staff_confiscated_asset.name', read_only=True)
    # execution_date = CustomDateField()
    get_attached_document = serializers.CharField(source='attached_document.name', read_only=True)
    get_company_unit_currently_borrowing = serializers.CharField(source='unit_currently_borrowing.company.name', read_only=True)
    get_unit_currently_borrowing = serializers.CharField(source='unit_currently_borrowing.name', read_only=True)
    get_lending_unit = serializers.CharField(source='lending_unit.name', read_only=True)
    get_company_lending_unit = serializers.CharField(source='lending_unit.company.name', read_only=True)

    get_name_delivered = serializers.CharField(source='delivered.name', read_only=True)
    get_name_received = serializers.CharField(source='received.name', read_only=True)

    get_warehouse = serializers.CharField(source='warehouse.name', read_only=True)
    get_supplier = serializers.CharField(source='supplier.name', read_only=True)
    class Meta:
        model = FormManagement
        fields = [
            'uuid',
            'name',
            'code',
            'type_form',
            'content',
            'is_confirm',
            # 'getList',
            # 'warehouse',
            'execution_date',
            'attached_document',
            'get_attached_document',
            'delivered',
            'received',
            'supplier',
            'warehouse',
            # 'inventory_checker',
            'staff_receive_property',
            'staff_confiscated_asset',
            'reason_asset_recovery',
            'lending_unit',
            'loan_period',
            'unit_currently_borrowing',
            'buyer',
            'price',
            'liquidation_reason',
            'created_by',
            'updated_by',
            'updated_at',
            'created_at',
            # 'get_json_asset_list',
            'get_unit_currently_borrowing',
            'get_company_unit_currently_borrowing',
            'get_lending_unit',
            'get_company_lending_unit',
            "get_name_type_form",
            'get_name_staff_receive_property',
            'get_name_staff_confiscated_asset',
            'get_name_delivered',
            'get_name_received',
            'get_warehouse',
            'get_supplier',
        ]


    def get_request_user(self):
        if 'request' in self.context and hasattr(self.context['request'], "user"):
            request_user = self.context['request'].user
        return request_user

    def create(self, validated_data):
        validated_data["created_by"] = self.get_request_user()
        return super().create(validated_data)

    def update(self, instance, validated_data):
        validated_data["updated_by"] = self.get_request_user()
        instance.name = validated_data.get('name', instance)
        return super().update(instance, validated_data)


class ListAssetSerializer(serializers.ModelSerializer):
    # uuid = serializers.UUIDField(format='hex', read_only=True)
    get_name_asset = serializers.CharField(source='asset.name', read_only=True)
    get_code_asset_warehouse = serializers.CharField(source='asset.code', read_only=True)
    get_code_form = serializers.CharField(source='code_form.code', read_only=True)
    get_type = serializers.CharField(source='code_form.name', read_only=True)
    current_status_asset = serializers.CharField(source='asset.asset_status', read_only=True)
    class Meta:
        model = ListAsset
        fields = [
            'uuid',
            'code',
            'name',
            'asset',
            'code_form',
            'current_status_asset',
            'is_exits_when_inventory',
            'created_by',
            'updated_by',
            'updated_at',
            'created_at',
            # 'get_info_asset',
            'get_name_asset',
            'get_code_form',
            'get_code_asset_warehouse',
            'get_type',
            # 'get_status'

        ]

    def get_request_user(self):
        if 'request' in self.context and hasattr(self.context['request'], "user"):
            request_user = self.context['request'].user
        return request_user

    def create(self, validated_data):
        validated_data["created_by"] = self.get_request_user()
        return super().create(validated_data)

    def update(self, instance, validated_data):
        validated_data["updated_by"] = self.get_request_user()
        instance.name = validated_data.get('name', instance)
        return super().update(instance, validated_data)


class HistoryUseAssetSerializer(serializers.ModelSerializer):
    get_name_asset = serializers.CharField(source='asset.name', read_only=True)
    get_name_user = serializers.CharField(source='user.name', read_only=True)
    get_type_action = serializers.CharField(source='type_action.name', read_only=True)
    class Meta:
        model = HistoryUseAsset
        fields = [
            'uuid',
            'code',
            'name',
            'asset',
            'user',
            'form',
            'type_action',
            'status_current',
            'started_using',
            'end_use',
            'created_by',
            'updated_by',
            'updated_at',
            'created_at',
            'get_name_user',
            'get_name_asset',
            'get_type_action',
        ]
    def get_request_user(self):
        if 'request' in self.context and hasattr(self.context['request'], "user"):
            request_user = self.context['request'].user
        return request_user

    def create(self, validated_data):
        validated_data["created_by"] = self.get_request_user()
        return super().create(validated_data)

    def update(self, instance, validated_data):
        validated_data["updated_by"] = self.get_request_user()
        instance.name = validated_data.get('name', instance)
        return super().update(instance, validated_data)

class FormManagementSimpleSerializer(serializers.ModelSerializer):
    # uuid = serializers.UUIDField(format='hex', read_only=True)
    get_name_type_form = serializers.CharField(source='type_form.name', read_only=True)

    class Meta:
        model = FormManagement
        fields = [
            'uuid',
            'name',
            'code',
            'type_form',
            'is_confirm',
            # 'content',
            # # 'getList',
            # # 'warehouse',
            # 'execution_date',
            # 'attached_document',
            # 'get_attached_document',
            # 'delivered',
            # 'received',
            # # 'inventory_checker',
            # 'staff_receive_property',
            # 'staff_confiscated_asset',
            # 'reason_asset_recovery',
            # 'lending_unit',
            # 'loan_period',
            # 'unit_currently_borrowing',
            # 'buyer',
            # 'price',
            # 'liquidation_reason',
            'created_by',
            # 'updated_by',
            # 'updated_at',
            'created_at',
            # # 'get_json_asset_list',
            "get_name_type_form",
            # 'get_name_staff_receive_property',
            # 'get_name_staff_confiscated_asset',
        ]


    def get_request_user(self):
        if 'request' in self.context and hasattr(self.context['request'], "user"):
            request_user = self.context['request'].user
        return request_user

    def create(self, validated_data):
        validated_data["created_by"] = self.get_request_user()
        return super().create(validated_data)

    def update(self, instance, validated_data):
        validated_data["updated_by"] = self.get_request_user()
        instance.name = validated_data.get('name', instance)
        return super().update(instance, validated_data)


class ListAssetSimpleSerializer(serializers.ModelSerializer):
    # uuid = serializers.UUIDField(format='hex', read_only=True)
    get_name_asset = serializers.CharField(source='asset.name', read_only=True)
    get_code_asset_warehouse = serializers.CharField(source='asset.code', read_only=True)
    # get_code_form = serializers.CharField(source='code_form.code', read_only=True)
    # get_type = serializers.CharField(source='code_form.name', read_only=True)
    current_status_asset = serializers.CharField(source='asset.asset_status', read_only=True)

    get_status = serializers.CharField(source='asset.asset_status', read_only=True)
    class Meta:
        model = ListAsset
        fields = [
            'uuid',
            # 'code',
            # 'name',
            'asset',
            'code_form',
            'get_name_asset',
            # 'get_code_form',
            'get_code_asset_warehouse',
            # 'get_type',
            'get_status',
            'current_status_asset',


        ]

    def get_request_user(self):
        if 'request' in self.context and hasattr(self.context['request'], "user"):
            request_user = self.context['request'].user
        return request_user

    def create(self, validated_data):
        validated_data["created_by"] = self.get_request_user()
        return super().create(validated_data)

    def update(self, instance, validated_data):
        validated_data["updated_by"] = self.get_request_user()
        instance.name = validated_data.get('name', instance)
        return super().update(instance, validated_data)

class AssetTempSerializer(serializers.ModelSerializer):
    class Meta:
        model = Asset
        fields = [
            'uuid',
            'name',
            'code',
        ]

class StaffTempSerializer(serializers.ModelSerializer):
    class Meta:
        model = Staff
        fields = [
            'uuid',
            'name',
        ]

class TypeActionSerializer(serializers.ModelSerializer):
    get_type_form = serializers.CharField(source='type_form.name', read_only=True)

    class Meta:
        model = TypeAction
        fields = [
            'uuid',
            'code',
            'name',
            'color_code',
            'icon',
            'type_form',
            'created_by',
            'updated_by',
            'updated_at',
            'created_at',
            'get_type_form',
        ]
    def get_request_user(self):
        if 'request' in self.context and hasattr(self.context['request'], "user"):
            request_user = self.context['request'].user
        return request_user

    def create(self, validated_data):
        validated_data["created_by"] = self.get_request_user()
        return super().create(validated_data)

    def update(self, instance, validated_data):
        validated_data["updated_by"] = self.get_request_user()
        instance.name = validated_data.get('name', instance)
        return super().update(instance, validated_data)