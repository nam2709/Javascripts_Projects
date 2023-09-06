from django.urls import path, include
from django.contrib.auth.models import User
from rest_framework import routers, serializers
from .models import *
import math
from AssetManagement.models import *
import requests
from decimal import Decimal

class AssetTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = AssetType
        fields = '__all__'

class AssetSerializer(serializers.ModelSerializer):
    asset_type = serializers.PrimaryKeyRelatedField(queryset=AssetType.objects.all())

    class Meta:
        model = Asset
        fields = ['name',
            'code',
            'price_buy',
            'date_added',
            'asset_type',
            'uuid',]
    
    def create(self, validated_data):
        asset_type_obj = validated_data.pop('asset_type')
        asset = Asset.objects.create(**validated_data, asset_type=asset_type_obj)
        return asset

        # asset_type_value = validated_data.pop('asset_type')
        # asset = Asset.objects.create(**validated_data)
        # asset.asset_type = asset_type_value
        # asset.save()
        # return asset
        
class AssetOfTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = AssetOfType
        fields = '__all__'

class DepreciationPeriodSerializer(serializers.ModelSerializer):
    class Meta:
        model = DepreciationPeriod
        fields = ['name',
            'uuid',]
        
class YearViewsSerializer(serializers.ModelSerializer):
    class Meta:
        model = YearViews
        fields = ['name',
            'uuid',]
        
class AssetRevaluationSerializer(serializers.ModelSerializer):
    asset_revaluation_name = serializers.SerializerMethodField()
    class Meta:
        model = AssetRevaluation
        fields = ['name',
            'uuid',
            'asset_revaluation',
            'asset_revaluation_name',
            'time_revaluation',
            'addup_value',
            'addup_time',
            ]
        
    def get_asset_revaluation_name(self, obj):
        return f"{obj.asset_revaluation.name} - {obj.asset_revaluation.code}"
        
class DepreciationTypeSerializer(serializers.ModelSerializer):
    asset_type_name = serializers.CharField(source='asset_type.name',read_only=True)
    asset_type_code = serializers.CharField(source='asset_type.code',read_only=True)
    class Meta:
        model = DepreciationType
        fields = ['name',
            'asset_type',
            'asset_type_name',
            'asset_type_code',
            'uuid',
            'time',
            'asset_type',
            ]

class AdjustmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Adjustment
        fields = ['name',
            'uuid',
            'number',
            ]
        
class DepreciationAssetDetailSerializer(serializers.ModelSerializer):
    name_aet_depreciation = serializers.CharField(source='aet_depreciation.name',read_only=True)
    class Meta:
        model = DepreciationAssetDetail
        fields = ['name',
            'uuid',
            'aet_depreciation',
            'name_aet_depreciation',
            'asset_depreciations',
            'count_depreciation',
            'days_depreciation',
            'value_start',
            'value_end',
            'percent_depreciation',
            'value_depreciaiton',
            'remain_value',
            ]
    
class DepreciationDetailSerializerSmall(serializers.ModelSerializer):
    aset_type = serializers.CharField(source='aset.asset_type.uuid',read_only=True)
    revaluation = AssetRevaluationSerializer(many=True, required=False)
    aset_price_buy = serializers.CharField(source='aset.price_buy',read_only=True)
    aset_name = serializers.SerializerMethodField()
    aset_date_added = serializers.CharField(source='aset.date_added',read_only=True)
    preiod_detail_name = serializers.CharField(source= 'preiod_detail.name',read_only=True)
    type_depreciation_name = serializers.CharField(source= 'type_depreciation.name',read_only=True)
    adjustment_aset_name = serializers.CharField(source= 'adjustment_aset.name',read_only=True)
    namesasetstype = serializers.CharField(source='aset.asset_type',read_only=True)
    # currency_unit_name = serializers.CharField(source='aset.name_currency_unit',read_only=True)
    currency_unit = serializers.CharField(source='aset.currency_unit',read_only=True)
    revaluation_name = serializers.SerializerMethodField()
    # value_by_currency = serializers.SerializerMethodField()


    class Meta:
        model = DepreciationDetail
        fields = [
            'uuid',
            'time_been_depreciation',
            # 'currency_unit_name',
            'currency_unit',
            # 'value_by_currency',
            'aset_type',
            'adjustment_aset_name',
            'adjustment_aset',
            'adjustment_number',
            'type_depreciation_name',
            'namesasetstype',
            'type_depreciation',
            'name',
            'revaluation_name',
            'aset',
            'revaluation',
            'date_been_add',
            'aset_name',
            'time_depreciation',
            'aset_price_buy',
            'aset_date_added',
            'preiod_detail_name',
            'preiod_detail',
            ]
        
        read_only_fields = [
            'depreciation_value',
            'adjustment_aset_name',
            'adjustment_number','namesasetstype']
        
    def get_revaluation_name(self, obj):
        return "-".join([f"{related_object.name}" for related_object in obj.revaluation.all()])
    
    def get_aset_name(self, obj):
        return f"{obj.aset.name} - {obj.aset.code}"
    
    def get_serializer_context(self):
        return self.context['request'].data
    
    def update(self, instance, validated_data):
        request_data = dict(self.get_serializer_context())
        revaluation_data = None  # define revaluation_data before the conditional statement
        if request_data and 'revaluation' in request_data:
            revaluation_data = request_data.pop('revaluation')
        # update the instance's non-nested fields
        instance = super().update(instance, validated_data)
        # update the nested assets
        if not revaluation_data:
            instance.revaluation.clear()
        else:
            instance.revaluation.clear()
            for reval_data in revaluation_data:
                revaluation_obj = AssetRevaluation.objects.get(uuid=reval_data)
                if revaluation_obj:
                    instance.revaluation.add(revaluation_obj)
                # revaluation.save()
        return instance
    
    def create(self, validated_data):
        request_data = dict(self.get_serializer_context())
        revaluation_data = None  # define revaluation_data before the conditional statement
        if request_data and 'revaluation' in request_data:
            revaluation_data = request_data.pop('revaluation')
        
        asset_uuid = validated_data['aset'].uuid
        asset = Asset.objects.get(uuid=asset_uuid)
        date_added = asset.date_added

        validated_data['time_been_depreciation'] = date_added
        # update the instance's non-nested fields
        instance = super().create(validated_data)
        # update the nested assets
        if not revaluation_data:
            instance.revaluation.clear()
        else:
            instance.revaluation.clear()
            for reval_data in revaluation_data:
                revaluation_obj = AssetRevaluation.objects.get(uuid=reval_data)
                if revaluation_obj:
                    instance.revaluation.add(revaluation_obj)
        return instance

 
class DepreciationDetailSerializer(serializers.ModelSerializer):
    revaluation = AssetRevaluationSerializer(many=True, required=False)
    aset_price_buy = serializers.CharField(source='aset.price_buy',read_only=True)
    aset_name = serializers.SerializerMethodField()
    aset_type = serializers.CharField(source='aset.asset_type.uuid',read_only=True)
    aset_date_added = serializers.CharField(source='aset.date_added',read_only=True)
    preiod_detail_name = serializers.CharField(source= 'preiod_detail.name',read_only=True)
    type_depreciation_name = serializers.CharField(source= 'type_depreciation.name',read_only=True)
    adjustment_aset_name = serializers.CharField(source= 'adjustment_aset.name',read_only=True)
    namesasetstype = serializers.CharField(source='aset.asset_type',read_only=True)
    currency_unit = serializers.CharField(source='aset.currency_unit',read_only=True)
    revaluation_name = serializers.SerializerMethodField()
    # value_to_depreciation = serializers.SerializerMethodField()
    month_1 = serializers.SerializerMethodField()
    month_2 = serializers.SerializerMethodField()
    month_3 = serializers.SerializerMethodField()
    month_4 = serializers.SerializerMethodField()
    month_5 = serializers.SerializerMethodField()
    month_6 = serializers.SerializerMethodField()
    month_7 = serializers.SerializerMethodField()
    month_8 = serializers.SerializerMethodField()
    month_9 = serializers.SerializerMethodField()
    month_10 = serializers.SerializerMethodField()
    month_11 = serializers.SerializerMethodField()
    month_12 = serializers.SerializerMethodField()



    class Meta:
        model = DepreciationDetail
        fields = [
            'time_been_depreciation',
            'aset_type',
            'currency_unit',
            'adjustment_aset_name',
            'adjustment_aset',
            'adjustment_number',
            'type_depreciation_name',
            'namesasetstype',
            'type_depreciation',
            'name',
            'revaluation_name',
            'aset',
            'revaluation',
            'date_been_add',
            'aset_name',
            'time_depreciation',
            'aset_price_buy',
            'aset_date_added',
            'preiod_detail_name',
            'preiod_detail',
            'add_value',
            'depreciation_value',
            'year_views',
            'curency_change',
            # 'value_to_depreciation',
            'uuid', 'month_1', 'month_2', 'month_3', 'month_4', 'month_5', 'month_6', 'month_7', 'month_8', 'month_9', 'month_10', 'month_11', 'month_12']
        
        read_only_fields = [
            'depreciation_value',
            'adjustment_aset_name',
            'adjustment_number','namesasetstype','year_views','month_1', 'month_2', 'month_3', 'month_4', 'month_5', 'month_6', 'month_7', 'month_8', 'month_9', 'month_10', 'month_11', 'month_12']

    def get_revaluation_name(self, obj):
         return "\n".join([f"{related_object.name}: {related_object.time_revaluation} " for related_object in obj.revaluation.all()])
    
    # def get_value_to_depreciation(self, obj):
    #     currency_unit = obj.aset.currency_unit
    #     if currency_unit is not None:
    #         currency_unit = currency_unit.name
    #     else:
    #         currency_unit = None
    #     print('currency_unit',currency_unit)
    #     currency_change = obj.curency_change
    #     response = requests.get('https://v6.exchangerate-api.com/v6/545c751c13b7291b25ccbab4/latest/USD')
    #     if response.status_code == 200:
    #         data = response.json()
    #         if currency_unit == currency_change:
    #             obj.value_to_depreciation = obj.aset.price_buy
    #         else:
    #             a = data['conversion_rates'].get(currency_unit)
    #             b = data['conversion_rates'].get(currency_change)
    #             if a and b:
    #                 obj.value_to_depreciation = (float(obj.aset.price_buy) / a) * b
    #             else:
    #                 # Handle case where conversion rates are not available for the specified currencies
    #                 obj.value_to_depreciation = None
       
    #     return  obj.value_to_depreciation
    
    def get_serializer_context(self):
        return self.context['request'].data
    
    def get_aset_name(self, obj):
        return f"{obj.aset.name} - {obj.aset.code}"
    
    def round_number(self, number):
        decimal_part = number - math.floor(number)
        if decimal_part > 0.9:
            return int(number) + 1
        elif decimal_part < 0.1:
            return int(number)
        else:
            return number
    
    def get_month_sum(self, obj, month):
        queryset = DepreciationAssetDetail.objects.filter(
            aet_depreciation=obj.aset,
            days_depreciation__year=obj.year_views.year,
            days_depreciation__month=month
        )
        sum_query = sum(queryset.values_list('value_depreciaiton', flat=True))
        round_sum_query = self.round_number(sum_query)
        return round_sum_query
    
    def get_month_1(self, obj):
        return self.get_month_sum(obj, 1)

    def get_month_2(self, obj):
        return self.get_month_sum(obj, 2)

    def get_month_3(self, obj):
        return self.get_month_sum(obj, 3)

    def get_month_4(self, obj):
        return self.get_month_sum(obj, 4)

    def get_month_5(self, obj):
        return self.get_month_sum(obj, 5)

    def get_month_6(self, obj):
        return self.get_month_sum(obj, 6)

    def get_month_7(self, obj):
        return self.get_month_sum(obj, 7)

    def get_month_8(self, obj):
        return self.get_month_sum(obj, 8)

    def get_month_9(self, obj):
        return self.get_month_sum(obj, 9)

    def get_month_10(self, obj):
        return self.get_month_sum(obj, 10)

    def get_month_11(self, obj):
        return self.get_month_sum(obj, 11)

    def get_month_12(self, obj):
        return self.get_month_sum(obj, 12)
    
    def update(self, instance, validated_data):
        request_data = dict(self.get_serializer_context())
        revaluation_data = None  # define revaluation_data before the conditional statement
        if request_data and 'revaluation' in request_data:
            revaluation_data = request_data.pop('revaluation')
        # update the instance's non-nested fields
        instance = super().update(instance, validated_data)
        # update the nested assets
        if not revaluation_data:
            instance.revaluation.clear()
        else:
            instance.revaluation.clear()
            for reval_data in revaluation_data:
                revaluation_obj = AssetRevaluation.objects.get(uuid=reval_data)
                if revaluation_obj:
                    instance.revaluation.add(revaluation_obj)
                # revaluation.save()
        return instance
    
    def create(self, validated_data):
        print(validated_data.keys())
        request_data = dict(self.get_serializer_context())
        revaluation_data = None  # define revaluation_data before the conditional statement
        if request_data and 'revaluation' in request_data:
            revaluation_data = request_data.pop('revaluation')
        
        asset_uuid = validated_data['aset']
        asset = Asset.objects.get(uuid=asset_uuid)
        date_added = asset.date_added
        print(date_added)

        validated_data['time_been_depreciation'] = date_added
        # update the instance's non-nested fields
        instance = super().create(validated_data)
        # update the nested assets
        if not revaluation_data:
            instance.revaluation.clear()
        else:
            instance.revaluation.clear()
            for reval_data in revaluation_data:
                revaluation_obj = AssetRevaluation.objects.get(uuid=reval_data)
                if revaluation_obj:
                    instance.revaluation.add(revaluation_obj)
        return instance


