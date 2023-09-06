from .models import Ward
from .models import Province
from .models import Districts 
from rest_framework import serializers
from operator import itemgetter
from collections import OrderedDict

    
class ProvinceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Province
        fields = ['uuid',
        'name',
        'code',
        'uuid',
        'codename',
        'division_type',
        'phone_code',
         ]
        # depth = 0
    def get_request_user(self):
        request_user = None
        if 'request' in self.context and hasattr(self.context['request'],'user'):
            request_user = self.context['request'].user   
        return request_user
    def create(self, validated_data):
       
        validated_data["created_by"] = self.context['request'].user
        return super().create(validated_data)
    def update(self, instance, validated_data):
        return super().update(instance, validated_data)
    
class DistrictsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Districts
        fields = ['uuid',
        'name',
        'code',
        'division_type',
        'province',
        'codename',
        'province_code'

         ]
        # depth = 0
    def get_request_user(self):
        request_user = None
        if 'request' in self.context and hasattr(self.context['request'],'user'):
            request_user = self.context['request'].user   
        return request_user
    def create(self, validated_data):
       
        validated_data["created_by"] = self.context['request'].user
        return super().create(validated_data)
    def update(self, instance, validated_data):
        return super().update(instance, validated_data)
    
class WardSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ward
        fields = ['uuid',
        'name',
        'code',
        'division_type',
        'districts',
        'codename',
        'ditrict_code',

         ]
        # depth = 0
    def get_request_user(self):
        request_user = None
        if 'request' in self.context and hasattr(self.context['request'],'user'):
            request_user = self.context['request'].user   
        return request_user
    def create(self, validated_data):
       
        validated_data["created_by"] = self.context['request'].user
        return super().create(validated_data)
    def update(self, instance, validated_data):
        return super().update(instance, validated_data)