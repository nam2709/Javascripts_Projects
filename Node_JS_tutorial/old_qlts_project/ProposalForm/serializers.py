from rest_framework import serializers
from .models import ProposalForm
from .models import ProposalFormType
from .models import ProposalFormStatus
from .models import AssetList
from .models import List
from .models import ListType
# from .models import ProposalProcessConfig
from AssetManagement.models import Asset
from company.models import Staff
from django.utils import timezone
import datetime


class ListTypeSerializer(serializers.ModelSerializer):
    fields = serializers.MultipleChoiceField(choices=ListType.FIELDS_FORM)
    class Meta:
        model = ListType
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

class ListSerializer(serializers.ModelSerializer):
    name_list = serializers.CharField(source='list.name', read_only=True)
    code_list = serializers.CharField(source='list.code', read_only=True)
    name_asset = serializers.CharField(source='asset.name', read_only=True)
    name_asset_type = serializers.CharField(source='asset.asset_type', read_only=True)
    name_asset_status = serializers.CharField(source='asset.asset_status', read_only=True)
    name_asset_price = serializers.CharField(source='asset.price_current', read_only=True)
    code_asset = serializers.CharField(source='asset.code', read_only=True)
    class Meta:
        model = List
        fields = [
            'uuid',
            'name',
            'code_list', #(code asset_list)
            'list', #bản thân list là uuid_list
            'name_list',
            'asset', #bản thân asset là uuid_asset
            'name_asset',
            # get asset information
            'code_asset',
            'name_asset_type',
            'name_asset_status',
            'name_asset_price',
        ]

class AssetListSerializer(serializers.ModelSerializer):
    class Meta:
        model = AssetList
        fields = [
            'uuid',
            'name',
            'code',
            'created_at',
            'created_by',
            'updated_at',
            'updated_by',
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


class ProposalFormStatusSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProposalFormStatus
        fields = [
            'uuid',
            'name',
            'code',
            'created_at',
            'created_by',
            'updated_at',
            'updated_by',
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


class ProposalFormTypeSerializer(serializers.ModelSerializer):
    fields = serializers.MultipleChoiceField(choices=ProposalFormType.FIELDS_FORM)
    class Meta:
        model = ProposalFormType
        fields = [
            'uuid',
            'code',
            'name',
            'fields',
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
    
    

class ProposalFormSerializer(serializers.ModelSerializer):
    name_proposal_status = serializers.CharField(source='proposal_status.name', read_only=True)
    name_proposer = serializers.CharField(source='proposer.name', read_only=True)
    name_asset_list = serializers.CharField(source='asset_list.name', read_only=True)
    code_asset_list = serializers.CharField(source='asset_list.code', read_only=True)
    code_company = serializers.CharField(source='company.code', read_only=True)
    name_company = serializers.CharField(source='company.name', read_only=True)
    #add from ListType
    name_proposal_type = serializers.CharField(source='proposal_type.name', read_only=True)
    get_name_staff_receive_property = serializers.CharField(source='staff_receive_property.name', read_only=True)
    get_name_staff_confiscated_asset = serializers.CharField(source='staff_confiscated_asset.name', read_only=True)
    # execution_date = CustomDateField()
    get_company_unit_currently_borrowing = serializers.CharField(source='unit_currently_borrowing.company.name', read_only=True)
    get_unit_currently_borrowing = serializers.CharField(source='unit_currently_borrowing.name', read_only=True)
    get_lending_unit = serializers.CharField(source='lending_unit.name', read_only=True)
    get_company_lending_unit = serializers.CharField(source='lending_unit.company.name', read_only=True)

    get_name_delivered = serializers.CharField(source='delivered.name', read_only=True)
    get_name_received = serializers.CharField(source='received.name', read_only=True)
    class Meta:
        model = ProposalForm
        fields = [
            'uuid',
            'code',
            'name', 
            'reason',
            'company',
            'code_company',
            'name_company',
            'proposal_type',
            'name_proposal_type',
            'proposal_status',
            'name_proposal_status',
            'proposer',
            'name_proposer',
            'asset_list',
            'code_asset_list',
            'name_asset_list',

            #add from ListType
            'execution_date',
            # 'attached_document',
            # 'get_attached_document',
            'delivered',
            'received',
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
            'created_at',
            'created_by',
            'updated_at',
            'updated_by',
            'get_unit_currently_borrowing',
            'get_company_unit_currently_borrowing',
            'get_lending_unit',
            'get_company_lending_unit',
            'get_name_staff_receive_property',
            'get_name_staff_confiscated_asset',
            'get_name_delivered',
            'get_name_received',
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
    



# --------------------------------------------------------------------
# ProposalProcessConfig
# class ProposalProcessConfigSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = ProposalProcessConfig
#         fields = [
#             'uuid',
#             'name',
#             'code',
#             'created_at',
#             'created_by',
#             'updated_at',
#             'updated_by',
#         ]
#     def get_request_user(self):
#         if 'request' in self.context and hasattr(self.context['request'], "user"):
#             request_user = self.context['request'].user
#         return request_user

#     def create(self, validated_data):
#         validated_data["created_by"] = self.get_request_user()
#         return super().create(validated_data)

#     def update(self, instance, validated_data):
#         validated_data["updated_by"] = self.get_request_user()
#         instance.name = validated_data.get('name', instance)
#         return super().update(instance, validated_data)


