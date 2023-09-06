
#!/usr/bin/env python
# -*- coding: utf-8 -*-
# region Description
__author__ = 'Tamnd - NGUYEN DUC TAM'
__copyright__ = "Copyright ©2020 Tamnd <ductambka@gmail.com>"
__maintainer__ = "Tamnd"
__email__ = "ductambka@gmail.com"
__status__ = "Production"
__date__ = 4 / 20 / 21
# endregion

#
#
# __init__.py

import sys
import os
import time
import datetime
from operator import itemgetter
from collections import OrderedDict
from rest_framework import serializers
from .models import *
        
class ConfigSerializer(serializers.ModelSerializer):
    class Meta:
        model = Config
        # fields = ('name',
        #           'tndid',
        #           'content',
        #           'default',
        #           'html_mode',
        #           'updated_at',
        #           'created_at')
        fields = '__all__'
        lookup_field = 'uuid'
        extra_kwargs = {
            'url': {'lookup_field': 'uuid'}
        }
    def get_serializer_context(self):
        return self.context['request'].data

    def create(self, validated_data):
        try:
            request_data = dict(self.get_serializer_context())
            print('request_data = %s' % request_data)
            ########### Process Many2Many POST #############
            # demo_many = validated_data.pop('demo_many')
            instance = Config.objects.create(**validated_data)
            # for obj in demo_many:
            #     instance.demo_many.add(obj)
            ################################################
            return instance
        except Exception as xx:
            print(str(xx))
            return None

    def update(self, instance, validated_data):
        try:
            request_data = dict(self.get_serializer_context())
            print('request_data = %s' % request_data)
        except Exception as xx:
            print(str(xx))
        instance.save(**validated_data)
        return instance
    def to_representation(self, instance):
        ret = super().to_representation(instance)
        # Here we filter the null values and creates a new dictionary
        # We use OrderedDict like in original method
        ret = OrderedDict(filter(itemgetter(1), ret.items()))
        return ret
            
class ConfigListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Config
        fields = ('id',
                    'name',
                    )
        # fields = '__all__'
        lookup_field = 'uuid'
        extra_kwargs = {
            'url': {'lookup_field': 'uuid'}
        }
    def get_serializer_context(self):
        return self.context['request'].data

    def create(self, validated_data):
        try:
            request_data = dict(self.get_serializer_context())
            print('request_data = %s' % request_data)
        except Exception as xx:
            print(str(xx))
        return Config.objects.create(**validated_data)

    def update(self, instance, validated_data):
        try:
            request_data = dict(self.get_serializer_context())
            print('request_data = %s' % request_data)
        except Exception as xx:
            print(str(xx))
        instance.save(**validated_data)
        return instance
    def to_representation(self, instance):
        ret = super().to_representation(instance)
        # Here we filter the null values and creates a new dictionary
        # We use OrderedDict like in original method
        ret = OrderedDict(filter(itemgetter(1), ret.items()))
        return ret
            
class ConfigUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Config
        fields = ('id',
                    'name',
                    )
        # fields = '__all__'
        lookup_field = 'uuid'
        extra_kwargs = {
            'url': {'lookup_field': 'uuid'}
        }
    def get_serializer_context(self):
        return self.context['request'].data

    def create(self, validated_data):
        try:
            request_data = dict(self.get_serializer_context())
            print('request_data = %s' % request_data)
        except Exception as xx:
            print(str(xx))
        return Config.objects.create(**validated_data)

    def update(self, instance, validated_data):
        try:
            request_data = dict(self.get_serializer_context())
            print('request_data = %s' % request_data)
        except Exception as xx:
            print(str(xx))
        instance.save(**validated_data)
        return instance
    def to_representation(self, instance):
        ret = super().to_representation(instance)
        # Here we filter the null values and creates a new dictionary
        # We use OrderedDict like in original method
        ret = OrderedDict(filter(itemgetter(1), ret.items()))
        return ret
            
class ConfigDeleteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Config
        fields = ('id',
                    'name',
                    )
        # fields = '__all__'
        lookup_field = 'uuid'
        extra_kwargs = {
            'url': {'lookup_field': 'uuid'}
        }
    def get_serializer_context(self):
        return self.context['request'].data

    def create(self, validated_data):
        try:
            request_data = dict(self.get_serializer_context())
            print('request_data = %s' % request_data)
        except Exception as xx:
            print(str(xx))
        return Config.objects.create(**validated_data)

    def update(self, instance, validated_data):
        try:
            request_data = dict(self.get_serializer_context())
            print('request_data = %s' % request_data)
        except Exception as xx:
            print(str(xx))
        instance.save(**validated_data)
        return instance
    def to_representation(self, instance):
        ret = super().to_representation(instance)
        # Here we filter the null values and creates a new dictionary
        # We use OrderedDict like in original method
        ret = OrderedDict(filter(itemgetter(1), ret.items()))
        return ret
            
class AllAppSerializer(serializers.ModelSerializer):
    class Meta:
        model = AllApp
        # fields = ('name',
        #           'tndid',
        #           'content',
        #           'default',
        #           'html_mode',
        #           'updated_at',
        #           'created_at')
        fields = '__all__'
        lookup_field = 'uuid'
        extra_kwargs = {
            'url': {'lookup_field': 'uuid'}
        }
    def get_serializer_context(self):
        return self.context['request'].data

    def create(self, validated_data):
        try:
            request_data = dict(self.get_serializer_context())
            print('request_data = %s' % request_data)
            ########### Process Many2Many POST #############
            # demo_many = validated_data.pop('demo_many')
            instance = AllApp.objects.create(**validated_data)
            # for obj in demo_many:
            #     instance.demo_many.add(obj)
            ################################################
            return instance
        except Exception as xx:
            print(str(xx))
            return None

    def update(self, instance, validated_data):
        try:
            request_data = dict(self.get_serializer_context())
            print('request_data = %s' % request_data)
        except Exception as xx:
            print(str(xx))
        instance.save(**validated_data)
        return instance
    def to_representation(self, instance):
        ret = super().to_representation(instance)
        # Here we filter the null values and creates a new dictionary
        # We use OrderedDict like in original method
        ret = OrderedDict(filter(itemgetter(1), ret.items()))
        return ret
            
class AllAppListSerializer(serializers.ModelSerializer):
    class Meta:
        model = AllApp
        fields = ('id',
                    'name',
                    )
        # fields = '__all__'
        lookup_field = 'uuid'
        extra_kwargs = {
            'url': {'lookup_field': 'uuid'}
        }
    def get_serializer_context(self):
        return self.context['request'].data

    def create(self, validated_data):
        try:
            request_data = dict(self.get_serializer_context())
            print('request_data = %s' % request_data)
        except Exception as xx:
            print(str(xx))
        return AllApp.objects.create(**validated_data)

    def update(self, instance, validated_data):
        try:
            request_data = dict(self.get_serializer_context())
            print('request_data = %s' % request_data)
        except Exception as xx:
            print(str(xx))
        instance.save(**validated_data)
        return instance
    def to_representation(self, instance):
        ret = super().to_representation(instance)
        # Here we filter the null values and creates a new dictionary
        # We use OrderedDict like in original method
        ret = OrderedDict(filter(itemgetter(1), ret.items()))
        return ret
            
class AllAppUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = AllApp
        fields = ('id',
                    'name',
                    )
        # fields = '__all__'
        lookup_field = 'uuid'
        extra_kwargs = {
            'url': {'lookup_field': 'uuid'}
        }
    def get_serializer_context(self):
        return self.context['request'].data

    def create(self, validated_data):
        try:
            request_data = dict(self.get_serializer_context())
            print('request_data = %s' % request_data)
        except Exception as xx:
            print(str(xx))
        return AllApp.objects.create(**validated_data)

    def update(self, instance, validated_data):
        try:
            request_data = dict(self.get_serializer_context())
            print('request_data = %s' % request_data)
        except Exception as xx:
            print(str(xx))
        instance.save(**validated_data)
        return instance
    def to_representation(self, instance):
        ret = super().to_representation(instance)
        # Here we filter the null values and creates a new dictionary
        # We use OrderedDict like in original method
        ret = OrderedDict(filter(itemgetter(1), ret.items()))
        return ret
            
class AllAppDeleteSerializer(serializers.ModelSerializer):
    class Meta:
        model = AllApp
        fields = ('id',
                    'name',
                    )
        # fields = '__all__'
        lookup_field = 'uuid'
        extra_kwargs = {
            'url': {'lookup_field': 'uuid'}
        }
    def get_serializer_context(self):
        return self.context['request'].data

    def create(self, validated_data):
        try:
            request_data = dict(self.get_serializer_context())
            print('request_data = %s' % request_data)
        except Exception as xx:
            print(str(xx))
        return AllApp.objects.create(**validated_data)

    def update(self, instance, validated_data):
        try:
            request_data = dict(self.get_serializer_context())
            print('request_data = %s' % request_data)
        except Exception as xx:
            print(str(xx))
        instance.save(**validated_data)
        return instance
    def to_representation(self, instance):
        ret = super().to_representation(instance)
        # Here we filter the null values and creates a new dictionary
        # We use OrderedDict like in original method
        ret = OrderedDict(filter(itemgetter(1), ret.items()))
        return ret
            
class AllViewSerializer(serializers.ModelSerializer):
    class Meta:
        model = AllView
        # fields = ('name',
        #           'tndid',
        #           'content',
        #           'default',
        #           'html_mode',
        #           'updated_at',
        #           'created_at')
        fields = '__all__'
        lookup_field = 'uuid'
        extra_kwargs = {
            'url': {'lookup_field': 'uuid'}
        }
    def get_serializer_context(self):
        return self.context['request'].data

    def create(self, validated_data):
        try:
            request_data = dict(self.get_serializer_context())
            print('request_data = %s' % request_data)
            ########### Process Many2Many POST #############
            # demo_many = validated_data.pop('demo_many')
            instance = AllView.objects.create(**validated_data)
            # for obj in demo_many:
            #     instance.demo_many.add(obj)
            ################################################
            return instance
        except Exception as xx:
            print(str(xx))
            return None

    def update(self, instance, validated_data):
        try:
            request_data = dict(self.get_serializer_context())
            print('request_data = %s' % request_data)
        except Exception as xx:
            print(str(xx))
        instance.save(**validated_data)
        return instance
    def to_representation(self, instance):
        ret = super().to_representation(instance)
        # Here we filter the null values and creates a new dictionary
        # We use OrderedDict like in original method
        ret = OrderedDict(filter(itemgetter(1), ret.items()))
        return ret
            
class AllViewListSerializer(serializers.ModelSerializer):
    class Meta:
        model = AllView
        fields = ('id',
                    'name',
                    )
        # fields = '__all__'
        lookup_field = 'uuid'
        extra_kwargs = {
            'url': {'lookup_field': 'uuid'}
        }
    def get_serializer_context(self):
        return self.context['request'].data

    def create(self, validated_data):
        try:
            request_data = dict(self.get_serializer_context())
            print('request_data = %s' % request_data)
        except Exception as xx:
            print(str(xx))
        return AllView.objects.create(**validated_data)

    def update(self, instance, validated_data):
        try:
            request_data = dict(self.get_serializer_context())
            print('request_data = %s' % request_data)
        except Exception as xx:
            print(str(xx))
        instance.save(**validated_data)
        return instance
    def to_representation(self, instance):
        ret = super().to_representation(instance)
        # Here we filter the null values and creates a new dictionary
        # We use OrderedDict like in original method
        ret = OrderedDict(filter(itemgetter(1), ret.items()))
        return ret
            
class AllViewUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = AllView
        fields = ('id',
                    'name',
                    )
        # fields = '__all__'
        lookup_field = 'uuid'
        extra_kwargs = {
            'url': {'lookup_field': 'uuid'}
        }
    def get_serializer_context(self):
        return self.context['request'].data

    def create(self, validated_data):
        try:
            request_data = dict(self.get_serializer_context())
            print('request_data = %s' % request_data)
        except Exception as xx:
            print(str(xx))
        return AllView.objects.create(**validated_data)

    def update(self, instance, validated_data):
        try:
            request_data = dict(self.get_serializer_context())
            print('request_data = %s' % request_data)
        except Exception as xx:
            print(str(xx))
        instance.save(**validated_data)
        return instance
    def to_representation(self, instance):
        ret = super().to_representation(instance)
        # Here we filter the null values and creates a new dictionary
        # We use OrderedDict like in original method
        ret = OrderedDict(filter(itemgetter(1), ret.items()))
        return ret
            
class AllViewDeleteSerializer(serializers.ModelSerializer):
    class Meta:
        model = AllView
        fields = ('id',
                    'name',
                    )
        # fields = '__all__'
        lookup_field = 'uuid'
        extra_kwargs = {
            'url': {'lookup_field': 'uuid'}
        }
    def get_serializer_context(self):
        return self.context['request'].data

    def create(self, validated_data):
        try:
            request_data = dict(self.get_serializer_context())
            print('request_data = %s' % request_data)
        except Exception as xx:
            print(str(xx))
        return AllView.objects.create(**validated_data)

    def update(self, instance, validated_data):
        try:
            request_data = dict(self.get_serializer_context())
            print('request_data = %s' % request_data)
        except Exception as xx:
            print(str(xx))
        instance.save(**validated_data)
        return instance
    def to_representation(self, instance):
        ret = super().to_representation(instance)
        # Here we filter the null values and creates a new dictionary
        # We use OrderedDict like in original method
        ret = OrderedDict(filter(itemgetter(1), ret.items()))
        return ret
            
class AdminMenuGroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = AdminMenuGroup
        # fields = ('name',
        #           'tndid',
        #           'content',
        #           'default',
        #           'html_mode',
        #           'updated_at',
        #           'created_at')
        fields = '__all__'
        lookup_field = 'uuid'
        extra_kwargs = {
            'url': {'lookup_field': 'uuid'}
        }
    def get_serializer_context(self):
        return self.context['request'].data

    def create(self, validated_data):
        try:
            request_data = dict(self.get_serializer_context())
            print('request_data = %s' % request_data)
            ########### Process Many2Many POST #############
            # demo_many = validated_data.pop('demo_many')
            instance = AdminMenuGroup.objects.create(**validated_data)
            # for obj in demo_many:
            #     instance.demo_many.add(obj)
            ################################################
            return instance
        except Exception as xx:
            print(str(xx))
            return None

    def update(self, instance, validated_data):
        try:
            request_data = dict(self.get_serializer_context())
            print('request_data = %s' % request_data)
        except Exception as xx:
            print(str(xx))
        instance.save(**validated_data)
        return instance
    def to_representation(self, instance):
        ret = super().to_representation(instance)
        # Here we filter the null values and creates a new dictionary
        # We use OrderedDict like in original method
        ret = OrderedDict(filter(itemgetter(1), ret.items()))
        return ret
            
class AdminMenuGroupListSerializer(serializers.ModelSerializer):
    class Meta:
        model = AdminMenuGroup
        fields = ('id',
                    'name',
                    )
        # fields = '__all__'
        lookup_field = 'uuid'
        extra_kwargs = {
            'url': {'lookup_field': 'uuid'}
        }
    def get_serializer_context(self):
        return self.context['request'].data

    def create(self, validated_data):
        try:
            request_data = dict(self.get_serializer_context())
            print('request_data = %s' % request_data)
        except Exception as xx:
            print(str(xx))
        return AdminMenuGroup.objects.create(**validated_data)

    def update(self, instance, validated_data):
        try:
            request_data = dict(self.get_serializer_context())
            print('request_data = %s' % request_data)
        except Exception as xx:
            print(str(xx))
        instance.save(**validated_data)
        return instance
    def to_representation(self, instance):
        ret = super().to_representation(instance)
        # Here we filter the null values and creates a new dictionary
        # We use OrderedDict like in original method
        ret = OrderedDict(filter(itemgetter(1), ret.items()))
        return ret
            
class AdminMenuGroupUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = AdminMenuGroup
        fields = ('id',
                    'name',
                    )
        # fields = '__all__'
        lookup_field = 'uuid'
        extra_kwargs = {
            'url': {'lookup_field': 'uuid'}
        }
    def get_serializer_context(self):
        return self.context['request'].data

    def create(self, validated_data):
        try:
            request_data = dict(self.get_serializer_context())
            print('request_data = %s' % request_data)
        except Exception as xx:
            print(str(xx))
        return AdminMenuGroup.objects.create(**validated_data)

    def update(self, instance, validated_data):
        try:
            request_data = dict(self.get_serializer_context())
            print('request_data = %s' % request_data)
        except Exception as xx:
            print(str(xx))
        instance.save(**validated_data)
        return instance
    def to_representation(self, instance):
        ret = super().to_representation(instance)
        # Here we filter the null values and creates a new dictionary
        # We use OrderedDict like in original method
        ret = OrderedDict(filter(itemgetter(1), ret.items()))
        return ret
            
class AdminMenuGroupDeleteSerializer(serializers.ModelSerializer):
    class Meta:
        model = AdminMenuGroup
        fields = ('id',
                    'name',
                    )
        # fields = '__all__'
        lookup_field = 'uuid'
        extra_kwargs = {
            'url': {'lookup_field': 'uuid'}
        }
    def get_serializer_context(self):
        return self.context['request'].data

    def create(self, validated_data):
        try:
            request_data = dict(self.get_serializer_context())
            print('request_data = %s' % request_data)
        except Exception as xx:
            print(str(xx))
        return AdminMenuGroup.objects.create(**validated_data)

    def update(self, instance, validated_data):
        try:
            request_data = dict(self.get_serializer_context())
            print('request_data = %s' % request_data)
        except Exception as xx:
            print(str(xx))
        instance.save(**validated_data)
        return instance
    def to_representation(self, instance):
        ret = super().to_representation(instance)
        # Here we filter the null values and creates a new dictionary
        # We use OrderedDict like in original method
        ret = OrderedDict(filter(itemgetter(1), ret.items()))
        return ret
            
class AllAdminMenuSerializer(serializers.ModelSerializer):
    class Meta:
        model = AllAdminMenu
        # fields = ('name',
        #           'tndid',
        #           'content',
        #           'default',
        #           'html_mode',
        #           'updated_at',
        #           'created_at')
        fields = '__all__'
        lookup_field = 'uuid'
        extra_kwargs = {
            'url': {'lookup_field': 'uuid'}
        }
    def get_serializer_context(self):
        return self.context['request'].data

    def create(self, validated_data):
        try:
            request_data = dict(self.get_serializer_context())
            print('request_data = %s' % request_data)
            ########### Process Many2Many POST #############
            # demo_many = validated_data.pop('demo_many')
            instance = AllAdminMenu.objects.create(**validated_data)
            # for obj in demo_many:
            #     instance.demo_many.add(obj)
            ################################################
            return instance
        except Exception as xx:
            print(str(xx))
            return None

    def update(self, instance, validated_data):
        try:
            request_data = dict(self.get_serializer_context())
            print('request_data = %s' % request_data)
        except Exception as xx:
            print(str(xx))
        instance.save(**validated_data)
        return instance
    def to_representation(self, instance):
        ret = super().to_representation(instance)
        # Here we filter the null values and creates a new dictionary
        # We use OrderedDict like in original method
        ret = OrderedDict(filter(itemgetter(1), ret.items()))
        return ret
            
class AllAdminMenuListSerializer(serializers.ModelSerializer):
    class Meta:
        model = AllAdminMenu
        fields = ('id',
                    'name',
                    )
        # fields = '__all__'
        lookup_field = 'uuid'
        extra_kwargs = {
            'url': {'lookup_field': 'uuid'}
        }
    def get_serializer_context(self):
        return self.context['request'].data

    def create(self, validated_data):
        try:
            request_data = dict(self.get_serializer_context())
            print('request_data = %s' % request_data)
        except Exception as xx:
            print(str(xx))
        return AllAdminMenu.objects.create(**validated_data)

    def update(self, instance, validated_data):
        try:
            request_data = dict(self.get_serializer_context())
            print('request_data = %s' % request_data)
        except Exception as xx:
            print(str(xx))
        instance.save(**validated_data)
        return instance
    def to_representation(self, instance):
        ret = super().to_representation(instance)
        # Here we filter the null values and creates a new dictionary
        # We use OrderedDict like in original method
        ret = OrderedDict(filter(itemgetter(1), ret.items()))
        return ret
            
class AllAdminMenuUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = AllAdminMenu
        fields = ('id',
                    'name',
                    )
        # fields = '__all__'
        lookup_field = 'uuid'
        extra_kwargs = {
            'url': {'lookup_field': 'uuid'}
        }
    def get_serializer_context(self):
        return self.context['request'].data

    def create(self, validated_data):
        try:
            request_data = dict(self.get_serializer_context())
            print('request_data = %s' % request_data)
        except Exception as xx:
            print(str(xx))
        return AllAdminMenu.objects.create(**validated_data)

    def update(self, instance, validated_data):
        try:
            request_data = dict(self.get_serializer_context())
            print('request_data = %s' % request_data)
        except Exception as xx:
            print(str(xx))
        instance.save(**validated_data)
        return instance
    def to_representation(self, instance):
        ret = super().to_representation(instance)
        # Here we filter the null values and creates a new dictionary
        # We use OrderedDict like in original method
        ret = OrderedDict(filter(itemgetter(1), ret.items()))
        return ret
            
class AllAdminMenuDeleteSerializer(serializers.ModelSerializer):
    class Meta:
        model = AllAdminMenu
        fields = ('id',
                    'name',
                    )
        # fields = '__all__'
        lookup_field = 'uuid'
        extra_kwargs = {
            'url': {'lookup_field': 'uuid'}
        }
    def get_serializer_context(self):
        return self.context['request'].data

    def create(self, validated_data):
        try:
            request_data = dict(self.get_serializer_context())
            print('request_data = %s' % request_data)
        except Exception as xx:
            print(str(xx))
        return AllAdminMenu.objects.create(**validated_data)

    def update(self, instance, validated_data):
        try:
            request_data = dict(self.get_serializer_context())
            print('request_data = %s' % request_data)
        except Exception as xx:
            print(str(xx))
        instance.save(**validated_data)
        return instance
    def to_representation(self, instance):
        ret = super().to_representation(instance)
        # Here we filter the null values and creates a new dictionary
        # We use OrderedDict like in original method
        ret = OrderedDict(filter(itemgetter(1), ret.items()))
        return ret
            
class PositionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Position
        # fields = ('name',
        #           'tndid',
        #           'content',
        #           'default',
        #           'html_mode',
        #           'updated_at',
        #           'created_at')
        fields = '__all__'
        lookup_field = 'uuid'
        extra_kwargs = {
            'url': {'lookup_field': 'uuid'}
        }
    def get_serializer_context(self):
        return self.context['request'].data

    def create(self, validated_data):
        try:
            request_data = dict(self.get_serializer_context())
            print('request_data = %s' % request_data)
            ########### Process Many2Many POST #############
            # demo_many = validated_data.pop('demo_many')
            instance = Position.objects.create(**validated_data)
            # for obj in demo_many:
            #     instance.demo_many.add(obj)
            ################################################
            return instance
        except Exception as xx:
            print(str(xx))
            return None

    def update(self, instance, validated_data):
        try:
            request_data = dict(self.get_serializer_context())
            print('request_data = %s' % request_data)
        except Exception as xx:
            print(str(xx))
        instance.save(**validated_data)
        return instance
    def to_representation(self, instance):
        ret = super().to_representation(instance)
        # Here we filter the null values and creates a new dictionary
        # We use OrderedDict like in original method
        ret = OrderedDict(filter(itemgetter(1), ret.items()))
        return ret
            
class PositionListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Position
        fields = ('id',
                    'name',
                    )
        # fields = '__all__'
        lookup_field = 'uuid'
        extra_kwargs = {
            'url': {'lookup_field': 'uuid'}
        }
    def get_serializer_context(self):
        return self.context['request'].data

    def create(self, validated_data):
        try:
            request_data = dict(self.get_serializer_context())
            print('request_data = %s' % request_data)
        except Exception as xx:
            print(str(xx))
        return Position.objects.create(**validated_data)

    def update(self, instance, validated_data):
        try:
            request_data = dict(self.get_serializer_context())
            print('request_data = %s' % request_data)
        except Exception as xx:
            print(str(xx))
        instance.save(**validated_data)
        return instance
    def to_representation(self, instance):
        ret = super().to_representation(instance)
        # Here we filter the null values and creates a new dictionary
        # We use OrderedDict like in original method
        ret = OrderedDict(filter(itemgetter(1), ret.items()))
        return ret
            
class PositionUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Position
        fields = ('id',
                    'name',
                    )
        # fields = '__all__'
        lookup_field = 'uuid'
        extra_kwargs = {
            'url': {'lookup_field': 'uuid'}
        }
    def get_serializer_context(self):
        return self.context['request'].data

    def create(self, validated_data):
        try:
            request_data = dict(self.get_serializer_context())
            print('request_data = %s' % request_data)
        except Exception as xx:
            print(str(xx))
        return Position.objects.create(**validated_data)

    def update(self, instance, validated_data):
        try:
            request_data = dict(self.get_serializer_context())
            print('request_data = %s' % request_data)
        except Exception as xx:
            print(str(xx))
        instance.save(**validated_data)
        return instance
    def to_representation(self, instance):
        ret = super().to_representation(instance)
        # Here we filter the null values and creates a new dictionary
        # We use OrderedDict like in original method
        ret = OrderedDict(filter(itemgetter(1), ret.items()))
        return ret
            
class PositionDeleteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Position
        fields = ('id',
                    'name',
                    )
        # fields = '__all__'
        lookup_field = 'uuid'
        extra_kwargs = {
            'url': {'lookup_field': 'uuid'}
        }
    def get_serializer_context(self):
        return self.context['request'].data

    def create(self, validated_data):
        try:
            request_data = dict(self.get_serializer_context())
            print('request_data = %s' % request_data)
        except Exception as xx:
            print(str(xx))
        return Position.objects.create(**validated_data)

    def update(self, instance, validated_data):
        try:
            request_data = dict(self.get_serializer_context())
            print('request_data = %s' % request_data)
        except Exception as xx:
            print(str(xx))
        instance.save(**validated_data)
        return instance
    def to_representation(self, instance):
        ret = super().to_representation(instance)
        # Here we filter the null values and creates a new dictionary
        # We use OrderedDict like in original method
        ret = OrderedDict(filter(itemgetter(1), ret.items()))
        return ret
            
class FooterItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = FooterItem
        # fields = ('name',
        #           'tndid',
        #           'content',
        #           'default',
        #           'html_mode',
        #           'updated_at',
        #           'created_at')
        fields = '__all__'
        lookup_field = 'uuid'
        extra_kwargs = {
            'url': {'lookup_field': 'uuid'}
        }
    def get_serializer_context(self):
        return self.context['request'].data

    def create(self, validated_data):
        try:
            request_data = dict(self.get_serializer_context())
            print('request_data = %s' % request_data)
            ########### Process Many2Many POST #############
            # demo_many = validated_data.pop('demo_many')
            instance = FooterItem.objects.create(**validated_data)
            # for obj in demo_many:
            #     instance.demo_many.add(obj)
            ################################################
            return instance
        except Exception as xx:
            print(str(xx))
            return None

    def update(self, instance, validated_data):
        try:
            request_data = dict(self.get_serializer_context())
            print('request_data = %s' % request_data)
        except Exception as xx:
            print(str(xx))
        instance.save(**validated_data)
        return instance
    def to_representation(self, instance):
        ret = super().to_representation(instance)
        # Here we filter the null values and creates a new dictionary
        # We use OrderedDict like in original method
        ret = OrderedDict(filter(itemgetter(1), ret.items()))
        return ret
            
class FooterItemListSerializer(serializers.ModelSerializer):
    class Meta:
        model = FooterItem
        fields = ('id',
                    'name',
                    )
        # fields = '__all__'
        lookup_field = 'uuid'
        extra_kwargs = {
            'url': {'lookup_field': 'uuid'}
        }
    def get_serializer_context(self):
        return self.context['request'].data

    def create(self, validated_data):
        try:
            request_data = dict(self.get_serializer_context())
            print('request_data = %s' % request_data)
        except Exception as xx:
            print(str(xx))
        return FooterItem.objects.create(**validated_data)

    def update(self, instance, validated_data):
        try:
            request_data = dict(self.get_serializer_context())
            print('request_data = %s' % request_data)
        except Exception as xx:
            print(str(xx))
        instance.save(**validated_data)
        return instance
    def to_representation(self, instance):
        ret = super().to_representation(instance)
        # Here we filter the null values and creates a new dictionary
        # We use OrderedDict like in original method
        ret = OrderedDict(filter(itemgetter(1), ret.items()))
        return ret
            
class FooterItemUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = FooterItem
        fields = ('id',
                    'name',
                    )
        # fields = '__all__'
        lookup_field = 'uuid'
        extra_kwargs = {
            'url': {'lookup_field': 'uuid'}
        }
    def get_serializer_context(self):
        return self.context['request'].data

    def create(self, validated_data):
        try:
            request_data = dict(self.get_serializer_context())
            print('request_data = %s' % request_data)
        except Exception as xx:
            print(str(xx))
        return FooterItem.objects.create(**validated_data)

    def update(self, instance, validated_data):
        try:
            request_data = dict(self.get_serializer_context())
            print('request_data = %s' % request_data)
        except Exception as xx:
            print(str(xx))
        instance.save(**validated_data)
        return instance
    def to_representation(self, instance):
        ret = super().to_representation(instance)
        # Here we filter the null values and creates a new dictionary
        # We use OrderedDict like in original method
        ret = OrderedDict(filter(itemgetter(1), ret.items()))
        return ret
            
class FooterItemDeleteSerializer(serializers.ModelSerializer):
    class Meta:
        model = FooterItem
        fields = ('id',
                    'name',
                    )
        # fields = '__all__'
        lookup_field = 'uuid'
        extra_kwargs = {
            'url': {'lookup_field': 'uuid'}
        }
    def get_serializer_context(self):
        return self.context['request'].data

    def create(self, validated_data):
        try:
            request_data = dict(self.get_serializer_context())
            print('request_data = %s' % request_data)
        except Exception as xx:
            print(str(xx))
        return FooterItem.objects.create(**validated_data)

    def update(self, instance, validated_data):
        try:
            request_data = dict(self.get_serializer_context())
            print('request_data = %s' % request_data)
        except Exception as xx:
            print(str(xx))
        instance.save(**validated_data)
        return instance
    def to_representation(self, instance):
        ret = super().to_representation(instance)
        # Here we filter the null values and creates a new dictionary
        # We use OrderedDict like in original method
        ret = OrderedDict(filter(itemgetter(1), ret.items()))
        return ret
            
class WidgetSerializer(serializers.ModelSerializer):
    class Meta:
        model = Widget
        # fields = ('name',
        #           'tndid',
        #           'content',
        #           'default',
        #           'html_mode',
        #           'updated_at',
        #           'created_at')
        fields = '__all__'
        lookup_field = 'uuid'
        extra_kwargs = {
            'url': {'lookup_field': 'uuid'}
        }
    def get_serializer_context(self):
        return self.context['request'].data

    def create(self, validated_data):
        try:
            request_data = dict(self.get_serializer_context())
            print('request_data = %s' % request_data)
            ########### Process Many2Many POST #############
            # demo_many = validated_data.pop('demo_many')
            instance = Widget.objects.create(**validated_data)
            # for obj in demo_many:
            #     instance.demo_many.add(obj)
            ################################################
            return instance
        except Exception as xx:
            print(str(xx))
            return None

    def update(self, instance, validated_data):
        try:
            request_data = dict(self.get_serializer_context())
            print('request_data = %s' % request_data)
        except Exception as xx:
            print(str(xx))
        instance.save(**validated_data)
        return instance
    def to_representation(self, instance):
        ret = super().to_representation(instance)
        # Here we filter the null values and creates a new dictionary
        # We use OrderedDict like in original method
        ret = OrderedDict(filter(itemgetter(1), ret.items()))
        return ret
            
class WidgetListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Widget
        fields = ('id',
                    'name',
                    )
        # fields = '__all__'
        lookup_field = 'uuid'
        extra_kwargs = {
            'url': {'lookup_field': 'uuid'}
        }
    def get_serializer_context(self):
        return self.context['request'].data

    def create(self, validated_data):
        try:
            request_data = dict(self.get_serializer_context())
            print('request_data = %s' % request_data)
        except Exception as xx:
            print(str(xx))
        return Widget.objects.create(**validated_data)

    def update(self, instance, validated_data):
        try:
            request_data = dict(self.get_serializer_context())
            print('request_data = %s' % request_data)
        except Exception as xx:
            print(str(xx))
        instance.save(**validated_data)
        return instance
    def to_representation(self, instance):
        ret = super().to_representation(instance)
        # Here we filter the null values and creates a new dictionary
        # We use OrderedDict like in original method
        ret = OrderedDict(filter(itemgetter(1), ret.items()))
        return ret
            
class WidgetUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Widget
        fields = ('id',
                    'name',
                    )
        # fields = '__all__'
        lookup_field = 'uuid'
        extra_kwargs = {
            'url': {'lookup_field': 'uuid'}
        }
    def get_serializer_context(self):
        return self.context['request'].data

    def create(self, validated_data):
        try:
            request_data = dict(self.get_serializer_context())
            print('request_data = %s' % request_data)
        except Exception as xx:
            print(str(xx))
        return Widget.objects.create(**validated_data)

    def update(self, instance, validated_data):
        try:
            request_data = dict(self.get_serializer_context())
            print('request_data = %s' % request_data)
        except Exception as xx:
            print(str(xx))
        instance.save(**validated_data)
        return instance
    def to_representation(self, instance):
        ret = super().to_representation(instance)
        # Here we filter the null values and creates a new dictionary
        # We use OrderedDict like in original method
        ret = OrderedDict(filter(itemgetter(1), ret.items()))
        return ret
            
class WidgetDeleteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Widget
        fields = ('id',
                    'name',
                    )
        # fields = '__all__'
        lookup_field = 'uuid'
        extra_kwargs = {
            'url': {'lookup_field': 'uuid'}
        }
    def get_serializer_context(self):
        return self.context['request'].data

    def create(self, validated_data):
        try:
            request_data = dict(self.get_serializer_context())
            print('request_data = %s' % request_data)
        except Exception as xx:
            print(str(xx))
        return Widget.objects.create(**validated_data)

    def update(self, instance, validated_data):
        try:
            request_data = dict(self.get_serializer_context())
            print('request_data = %s' % request_data)
        except Exception as xx:
            print(str(xx))
        instance.save(**validated_data)
        return instance
    def to_representation(self, instance):
        ret = super().to_representation(instance)
        # Here we filter the null values and creates a new dictionary
        # We use OrderedDict like in original method
        ret = OrderedDict(filter(itemgetter(1), ret.items()))
        return ret
            
class TimeZoneSerializer(serializers.ModelSerializer):
    class Meta:
        model = TimeZone
        # fields = ('name',
        #           'tndid',
        #           'content',
        #           'default',
        #           'html_mode',
        #           'updated_at',
        #           'created_at')
        fields = '__all__'
        lookup_field = 'uuid'
        extra_kwargs = {
            'url': {'lookup_field': 'uuid'}
        }
    def get_serializer_context(self):
        return self.context['request'].data

    def create(self, validated_data):
        try:
            request_data = dict(self.get_serializer_context())
            print('request_data = %s' % request_data)
            ########### Process Many2Many POST #############
            # demo_many = validated_data.pop('demo_many')
            instance = TimeZone.objects.create(**validated_data)
            # for obj in demo_many:
            #     instance.demo_many.add(obj)
            ################################################
            return instance
        except Exception as xx:
            print(str(xx))
            return None

    def update(self, instance, validated_data):
        try:
            request_data = dict(self.get_serializer_context())
            print('request_data = %s' % request_data)
        except Exception as xx:
            print(str(xx))
        instance.save(**validated_data)
        return instance
    def to_representation(self, instance):
        ret = super().to_representation(instance)
        # Here we filter the null values and creates a new dictionary
        # We use OrderedDict like in original method
        ret = OrderedDict(filter(itemgetter(1), ret.items()))
        return ret
            
class TimeZoneListSerializer(serializers.ModelSerializer):
    class Meta:
        model = TimeZone
        fields = ('id',
                    'name',
                    )
        # fields = '__all__'
        lookup_field = 'uuid'
        extra_kwargs = {
            'url': {'lookup_field': 'uuid'}
        }
    def get_serializer_context(self):
        return self.context['request'].data

    def create(self, validated_data):
        try:
            request_data = dict(self.get_serializer_context())
            print('request_data = %s' % request_data)
        except Exception as xx:
            print(str(xx))
        return TimeZone.objects.create(**validated_data)

    def update(self, instance, validated_data):
        try:
            request_data = dict(self.get_serializer_context())
            print('request_data = %s' % request_data)
        except Exception as xx:
            print(str(xx))
        instance.save(**validated_data)
        return instance
    def to_representation(self, instance):
        ret = super().to_representation(instance)
        # Here we filter the null values and creates a new dictionary
        # We use OrderedDict like in original method
        ret = OrderedDict(filter(itemgetter(1), ret.items()))
        return ret
            
class TimeZoneUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = TimeZone
        fields = ('id',
                    'name',
                    )
        # fields = '__all__'
        lookup_field = 'uuid'
        extra_kwargs = {
            'url': {'lookup_field': 'uuid'}
        }
    def get_serializer_context(self):
        return self.context['request'].data

    def create(self, validated_data):
        try:
            request_data = dict(self.get_serializer_context())
            print('request_data = %s' % request_data)
        except Exception as xx:
            print(str(xx))
        return TimeZone.objects.create(**validated_data)

    def update(self, instance, validated_data):
        try:
            request_data = dict(self.get_serializer_context())
            print('request_data = %s' % request_data)
        except Exception as xx:
            print(str(xx))
        instance.save(**validated_data)
        return instance
    def to_representation(self, instance):
        ret = super().to_representation(instance)
        # Here we filter the null values and creates a new dictionary
        # We use OrderedDict like in original method
        ret = OrderedDict(filter(itemgetter(1), ret.items()))
        return ret
            
class TimeZoneDeleteSerializer(serializers.ModelSerializer):
    class Meta:
        model = TimeZone
        fields = ('id',
                    'name',
                    )
        # fields = '__all__'
        lookup_field = 'uuid'
        extra_kwargs = {
            'url': {'lookup_field': 'uuid'}
        }
    def get_serializer_context(self):
        return self.context['request'].data

    def create(self, validated_data):
        try:
            request_data = dict(self.get_serializer_context())
            print('request_data = %s' % request_data)
        except Exception as xx:
            print(str(xx))
        return TimeZone.objects.create(**validated_data)

    def update(self, instance, validated_data):
        try:
            request_data = dict(self.get_serializer_context())
            print('request_data = %s' % request_data)
        except Exception as xx:
            print(str(xx))
        instance.save(**validated_data)
        return instance
    def to_representation(self, instance):
        ret = super().to_representation(instance)
        # Here we filter the null values and creates a new dictionary
        # We use OrderedDict like in original method
        ret = OrderedDict(filter(itemgetter(1), ret.items()))
        return ret
            
class AlertMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = AlertMessage
        # fields = ('name',
        #           'tndid',
        #           'content',
        #           'default',
        #           'html_mode',
        #           'updated_at',
        #           'created_at')
        fields = '__all__'
        lookup_field = 'uuid'
        extra_kwargs = {
            'url': {'lookup_field': 'uuid'}
        }
    def get_serializer_context(self):
        return self.context['request'].data

    def create(self, validated_data):
        try:
            request_data = dict(self.get_serializer_context())
            print('request_data = %s' % request_data)
            ########### Process Many2Many POST #############
            # demo_many = validated_data.pop('demo_many')
            instance = AlertMessage.objects.create(**validated_data)
            # for obj in demo_many:
            #     instance.demo_many.add(obj)
            ################################################
            return instance
        except Exception as xx:
            print(str(xx))
            return None

    def update(self, instance, validated_data):
        try:
            request_data = dict(self.get_serializer_context())
            print('request_data = %s' % request_data)
        except Exception as xx:
            print(str(xx))
        instance.save(**validated_data)
        return instance
    def to_representation(self, instance):
        ret = super().to_representation(instance)
        # Here we filter the null values and creates a new dictionary
        # We use OrderedDict like in original method
        ret = OrderedDict(filter(itemgetter(1), ret.items()))
        return ret
            
class AlertMessageListSerializer(serializers.ModelSerializer):
    class Meta:
        model = AlertMessage
        fields = ('id',
                    'name',
                    )
        # fields = '__all__'
        lookup_field = 'uuid'
        extra_kwargs = {
            'url': {'lookup_field': 'uuid'}
        }
    def get_serializer_context(self):
        return self.context['request'].data

    def create(self, validated_data):
        try:
            request_data = dict(self.get_serializer_context())
            print('request_data = %s' % request_data)
        except Exception as xx:
            print(str(xx))
        return AlertMessage.objects.create(**validated_data)

    def update(self, instance, validated_data):
        try:
            request_data = dict(self.get_serializer_context())
            print('request_data = %s' % request_data)
        except Exception as xx:
            print(str(xx))
        instance.save(**validated_data)
        return instance
    def to_representation(self, instance):
        ret = super().to_representation(instance)
        # Here we filter the null values and creates a new dictionary
        # We use OrderedDict like in original method
        ret = OrderedDict(filter(itemgetter(1), ret.items()))
        return ret
            
class AlertMessageUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = AlertMessage
        fields = ('id',
                    'name',
                    )
        # fields = '__all__'
        lookup_field = 'uuid'
        extra_kwargs = {
            'url': {'lookup_field': 'uuid'}
        }
    def get_serializer_context(self):
        return self.context['request'].data

    def create(self, validated_data):
        try:
            request_data = dict(self.get_serializer_context())
            print('request_data = %s' % request_data)
        except Exception as xx:
            print(str(xx))
        return AlertMessage.objects.create(**validated_data)

    def update(self, instance, validated_data):
        try:
            request_data = dict(self.get_serializer_context())
            print('request_data = %s' % request_data)
        except Exception as xx:
            print(str(xx))
        instance.save(**validated_data)
        return instance
    def to_representation(self, instance):
        ret = super().to_representation(instance)
        # Here we filter the null values and creates a new dictionary
        # We use OrderedDict like in original method
        ret = OrderedDict(filter(itemgetter(1), ret.items()))
        return ret
            
class AlertMessageDeleteSerializer(serializers.ModelSerializer):
    class Meta:
        model = AlertMessage
        fields = ('id',
                    'name',
                    )
        # fields = '__all__'
        lookup_field = 'uuid'
        extra_kwargs = {
            'url': {'lookup_field': 'uuid'}
        }
    def get_serializer_context(self):
        return self.context['request'].data

    def create(self, validated_data):
        try:
            request_data = dict(self.get_serializer_context())
            print('request_data = %s' % request_data)
        except Exception as xx:
            print(str(xx))
        return AlertMessage.objects.create(**validated_data)

    def update(self, instance, validated_data):
        try:
            request_data = dict(self.get_serializer_context())
            print('request_data = %s' % request_data)
        except Exception as xx:
            print(str(xx))
        instance.save(**validated_data)
        return instance
    def to_representation(self, instance):
        ret = super().to_representation(instance)
        # Here we filter the null values and creates a new dictionary
        # We use OrderedDict like in original method
        ret = OrderedDict(filter(itemgetter(1), ret.items()))
        return ret
            
class PageInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = PageInfo
        # fields = ('name',
        #           'tndid',
        #           'content',
        #           'default',
        #           'html_mode',
        #           'updated_at',
        #           'created_at')
        fields = '__all__'
        lookup_field = 'uuid'
        extra_kwargs = {
            'url': {'lookup_field': 'uuid'}
        }
    def get_serializer_context(self):
        return self.context['request'].data

    def create(self, validated_data):
        try:
            request_data = dict(self.get_serializer_context())
            print('request_data = %s' % request_data)
            ########### Process Many2Many POST #############
            # demo_many = validated_data.pop('demo_many')
            instance = PageInfo.objects.create(**validated_data)
            # for obj in demo_many:
            #     instance.demo_many.add(obj)
            ################################################
            return instance
        except Exception as xx:
            print(str(xx))
            return None

    def update(self, instance, validated_data):
        try:
            request_data = dict(self.get_serializer_context())
            print('request_data = %s' % request_data)
        except Exception as xx:
            print(str(xx))
        instance.save(**validated_data)
        return instance
    def to_representation(self, instance):
        ret = super().to_representation(instance)
        # Here we filter the null values and creates a new dictionary
        # We use OrderedDict like in original method
        ret = OrderedDict(filter(itemgetter(1), ret.items()))
        return ret
            
class PageInfoListSerializer(serializers.ModelSerializer):
    class Meta:
        model = PageInfo
        fields = ('id',
                    'name',
                    )
        # fields = '__all__'
        lookup_field = 'uuid'
        extra_kwargs = {
            'url': {'lookup_field': 'uuid'}
        }
    def get_serializer_context(self):
        return self.context['request'].data

    def create(self, validated_data):
        try:
            request_data = dict(self.get_serializer_context())
            print('request_data = %s' % request_data)
        except Exception as xx:
            print(str(xx))
        return PageInfo.objects.create(**validated_data)

    def update(self, instance, validated_data):
        try:
            request_data = dict(self.get_serializer_context())
            print('request_data = %s' % request_data)
        except Exception as xx:
            print(str(xx))
        instance.save(**validated_data)
        return instance
    def to_representation(self, instance):
        ret = super().to_representation(instance)
        # Here we filter the null values and creates a new dictionary
        # We use OrderedDict like in original method
        ret = OrderedDict(filter(itemgetter(1), ret.items()))
        return ret
            
class PageInfoUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = PageInfo
        fields = ('id',
                    'name',
                    )
        # fields = '__all__'
        lookup_field = 'uuid'
        extra_kwargs = {
            'url': {'lookup_field': 'uuid'}
        }
    def get_serializer_context(self):
        return self.context['request'].data

    def create(self, validated_data):
        try:
            request_data = dict(self.get_serializer_context())
            print('request_data = %s' % request_data)
        except Exception as xx:
            print(str(xx))
        return PageInfo.objects.create(**validated_data)

    def update(self, instance, validated_data):
        try:
            request_data = dict(self.get_serializer_context())
            print('request_data = %s' % request_data)
        except Exception as xx:
            print(str(xx))
        instance.save(**validated_data)
        return instance
    def to_representation(self, instance):
        ret = super().to_representation(instance)
        # Here we filter the null values and creates a new dictionary
        # We use OrderedDict like in original method
        ret = OrderedDict(filter(itemgetter(1), ret.items()))
        return ret
            
class PageInfoDeleteSerializer(serializers.ModelSerializer):
    class Meta:
        model = PageInfo
        fields = ('id',
                    'name',
                    )
        # fields = '__all__'
        lookup_field = 'uuid'
        extra_kwargs = {
            'url': {'lookup_field': 'uuid'}
        }
    def get_serializer_context(self):
        return self.context['request'].data

    def create(self, validated_data):
        try:
            request_data = dict(self.get_serializer_context())
            print('request_data = %s' % request_data)
        except Exception as xx:
            print(str(xx))
        return PageInfo.objects.create(**validated_data)

    def update(self, instance, validated_data):
        try:
            request_data = dict(self.get_serializer_context())
            print('request_data = %s' % request_data)
        except Exception as xx:
            print(str(xx))
        instance.save(**validated_data)
        return instance
    def to_representation(self, instance):
        ret = super().to_representation(instance)
        # Here we filter the null values and creates a new dictionary
        # We use OrderedDict like in original method
        ret = OrderedDict(filter(itemgetter(1), ret.items()))
        return ret
            
class BotUASerializer(serializers.ModelSerializer):
    class Meta:
        model = BotUA
        # fields = ('name',
        #           'tndid',
        #           'content',
        #           'default',
        #           'html_mode',
        #           'updated_at',
        #           'created_at')
        fields = '__all__'
        lookup_field = 'uuid'
        extra_kwargs = {
            'url': {'lookup_field': 'uuid'}
        }
    def get_serializer_context(self):
        return self.context['request'].data

    def create(self, validated_data):
        try:
            request_data = dict(self.get_serializer_context())
            print('request_data = %s' % request_data)
            ########### Process Many2Many POST #############
            # demo_many = validated_data.pop('demo_many')
            instance = BotUA.objects.create(**validated_data)
            # for obj in demo_many:
            #     instance.demo_many.add(obj)
            ################################################
            return instance
        except Exception as xx:
            print(str(xx))
            return None

    def update(self, instance, validated_data):
        try:
            request_data = dict(self.get_serializer_context())
            print('request_data = %s' % request_data)
        except Exception as xx:
            print(str(xx))
        instance.save(**validated_data)
        return instance
    def to_representation(self, instance):
        ret = super().to_representation(instance)
        # Here we filter the null values and creates a new dictionary
        # We use OrderedDict like in original method
        ret = OrderedDict(filter(itemgetter(1), ret.items()))
        return ret
            
class BotUAListSerializer(serializers.ModelSerializer):
    class Meta:
        model = BotUA
        fields = ('id',
                    'name',
                    )
        # fields = '__all__'
        lookup_field = 'uuid'
        extra_kwargs = {
            'url': {'lookup_field': 'uuid'}
        }
    def get_serializer_context(self):
        return self.context['request'].data

    def create(self, validated_data):
        try:
            request_data = dict(self.get_serializer_context())
            print('request_data = %s' % request_data)
        except Exception as xx:
            print(str(xx))
        return BotUA.objects.create(**validated_data)

    def update(self, instance, validated_data):
        try:
            request_data = dict(self.get_serializer_context())
            print('request_data = %s' % request_data)
        except Exception as xx:
            print(str(xx))
        instance.save(**validated_data)
        return instance
    def to_representation(self, instance):
        ret = super().to_representation(instance)
        # Here we filter the null values and creates a new dictionary
        # We use OrderedDict like in original method
        ret = OrderedDict(filter(itemgetter(1), ret.items()))
        return ret
            
class BotUAUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = BotUA
        fields = ('id',
                    'name',
                    )
        # fields = '__all__'
        lookup_field = 'uuid'
        extra_kwargs = {
            'url': {'lookup_field': 'uuid'}
        }
    def get_serializer_context(self):
        return self.context['request'].data

    def create(self, validated_data):
        try:
            request_data = dict(self.get_serializer_context())
            print('request_data = %s' % request_data)
        except Exception as xx:
            print(str(xx))
        return BotUA.objects.create(**validated_data)

    def update(self, instance, validated_data):
        try:
            request_data = dict(self.get_serializer_context())
            print('request_data = %s' % request_data)
        except Exception as xx:
            print(str(xx))
        instance.save(**validated_data)
        return instance
    def to_representation(self, instance):
        ret = super().to_representation(instance)
        # Here we filter the null values and creates a new dictionary
        # We use OrderedDict like in original method
        ret = OrderedDict(filter(itemgetter(1), ret.items()))
        return ret
            
class BotUADeleteSerializer(serializers.ModelSerializer):
    class Meta:
        model = BotUA
        fields = ('id',
                    'name',
                    )
        # fields = '__all__'
        lookup_field = 'uuid'
        extra_kwargs = {
            'url': {'lookup_field': 'uuid'}
        }
    def get_serializer_context(self):
        return self.context['request'].data

    def create(self, validated_data):
        try:
            request_data = dict(self.get_serializer_context())
            print('request_data = %s' % request_data)
        except Exception as xx:
            print(str(xx))
        return BotUA.objects.create(**validated_data)

    def update(self, instance, validated_data):
        try:
            request_data = dict(self.get_serializer_context())
            print('request_data = %s' % request_data)
        except Exception as xx:
            print(str(xx))
        instance.save(**validated_data)
        return instance
    def to_representation(self, instance):
        ret = super().to_representation(instance)
        # Here we filter the null values and creates a new dictionary
        # We use OrderedDict like in original method
        ret = OrderedDict(filter(itemgetter(1), ret.items()))
        return ret
            
class RobotsArgSerializer(serializers.ModelSerializer):
    class Meta:
        model = RobotsArg
        # fields = ('name',
        #           'tndid',
        #           'content',
        #           'default',
        #           'html_mode',
        #           'updated_at',
        #           'created_at')
        fields = '__all__'
        lookup_field = 'uuid'
        extra_kwargs = {
            'url': {'lookup_field': 'uuid'}
        }
    def get_serializer_context(self):
        return self.context['request'].data

    def create(self, validated_data):
        try:
            request_data = dict(self.get_serializer_context())
            print('request_data = %s' % request_data)
            ########### Process Many2Many POST #############
            # demo_many = validated_data.pop('demo_many')
            instance = RobotsArg.objects.create(**validated_data)
            # for obj in demo_many:
            #     instance.demo_many.add(obj)
            ################################################
            return instance
        except Exception as xx:
            print(str(xx))
            return None

    def update(self, instance, validated_data):
        try:
            request_data = dict(self.get_serializer_context())
            print('request_data = %s' % request_data)
        except Exception as xx:
            print(str(xx))
        instance.save(**validated_data)
        return instance
    def to_representation(self, instance):
        ret = super().to_representation(instance)
        # Here we filter the null values and creates a new dictionary
        # We use OrderedDict like in original method
        ret = OrderedDict(filter(itemgetter(1), ret.items()))
        return ret
            
class RobotsArgListSerializer(serializers.ModelSerializer):
    class Meta:
        model = RobotsArg
        fields = ('id',
                    'name',
                    )
        # fields = '__all__'
        lookup_field = 'uuid'
        extra_kwargs = {
            'url': {'lookup_field': 'uuid'}
        }
    def get_serializer_context(self):
        return self.context['request'].data

    def create(self, validated_data):
        try:
            request_data = dict(self.get_serializer_context())
            print('request_data = %s' % request_data)
        except Exception as xx:
            print(str(xx))
        return RobotsArg.objects.create(**validated_data)

    def update(self, instance, validated_data):
        try:
            request_data = dict(self.get_serializer_context())
            print('request_data = %s' % request_data)
        except Exception as xx:
            print(str(xx))
        instance.save(**validated_data)
        return instance
    def to_representation(self, instance):
        ret = super().to_representation(instance)
        # Here we filter the null values and creates a new dictionary
        # We use OrderedDict like in original method
        ret = OrderedDict(filter(itemgetter(1), ret.items()))
        return ret
            
class RobotsArgUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = RobotsArg
        fields = ('id',
                    'name',
                    )
        # fields = '__all__'
        lookup_field = 'uuid'
        extra_kwargs = {
            'url': {'lookup_field': 'uuid'}
        }
    def get_serializer_context(self):
        return self.context['request'].data

    def create(self, validated_data):
        try:
            request_data = dict(self.get_serializer_context())
            print('request_data = %s' % request_data)
        except Exception as xx:
            print(str(xx))
        return RobotsArg.objects.create(**validated_data)

    def update(self, instance, validated_data):
        try:
            request_data = dict(self.get_serializer_context())
            print('request_data = %s' % request_data)
        except Exception as xx:
            print(str(xx))
        instance.save(**validated_data)
        return instance
    def to_representation(self, instance):
        ret = super().to_representation(instance)
        # Here we filter the null values and creates a new dictionary
        # We use OrderedDict like in original method
        ret = OrderedDict(filter(itemgetter(1), ret.items()))
        return ret
            
class RobotsArgDeleteSerializer(serializers.ModelSerializer):
    class Meta:
        model = RobotsArg
        fields = ('id',
                    'name',
                    )
        # fields = '__all__'
        lookup_field = 'uuid'
        extra_kwargs = {
            'url': {'lookup_field': 'uuid'}
        }
    def get_serializer_context(self):
        return self.context['request'].data

    def create(self, validated_data):
        try:
            request_data = dict(self.get_serializer_context())
            print('request_data = %s' % request_data)
        except Exception as xx:
            print(str(xx))
        return RobotsArg.objects.create(**validated_data)

    def update(self, instance, validated_data):
        try:
            request_data = dict(self.get_serializer_context())
            print('request_data = %s' % request_data)
        except Exception as xx:
            print(str(xx))
        instance.save(**validated_data)
        return instance
    def to_representation(self, instance):
        ret = super().to_representation(instance)
        # Here we filter the null values and creates a new dictionary
        # We use OrderedDict like in original method
        ret = OrderedDict(filter(itemgetter(1), ret.items()))
        return ret
            
class LogoImagesSerializer(serializers.ModelSerializer):
    class Meta:
        model = LogoImages
        # fields = ('name',
        #           'tndid',
        #           'content',
        #           'default',
        #           'html_mode',
        #           'updated_at',
        #           'created_at')
        fields = '__all__'
        lookup_field = 'uuid'
        extra_kwargs = {
            'url': {'lookup_field': 'uuid'}
        }
    def get_serializer_context(self):
        return self.context['request'].data

    def create(self, validated_data):
        try:
            request_data = dict(self.get_serializer_context())
            print('request_data = %s' % request_data)
            ########### Process Many2Many POST #############
            # demo_many = validated_data.pop('demo_many')
            instance = LogoImages.objects.create(**validated_data)
            # for obj in demo_many:
            #     instance.demo_many.add(obj)
            ################################################
            return instance
        except Exception as xx:
            print(str(xx))
            return None

    def update(self, instance, validated_data):
        try:
            request_data = dict(self.get_serializer_context())
            print('request_data = %s' % request_data)
        except Exception as xx:
            print(str(xx))
        instance.save(**validated_data)
        return instance
    def to_representation(self, instance):
        ret = super().to_representation(instance)
        # Here we filter the null values and creates a new dictionary
        # We use OrderedDict like in original method
        ret = OrderedDict(filter(itemgetter(1), ret.items()))
        return ret
            
class LogoImagesListSerializer(serializers.ModelSerializer):
    class Meta:
        model = LogoImages
        fields = ('id',
                    'name',
                    )
        # fields = '__all__'
        lookup_field = 'uuid'
        extra_kwargs = {
            'url': {'lookup_field': 'uuid'}
        }
    def get_serializer_context(self):
        return self.context['request'].data

    def create(self, validated_data):
        try:
            request_data = dict(self.get_serializer_context())
            print('request_data = %s' % request_data)
        except Exception as xx:
            print(str(xx))
        return LogoImages.objects.create(**validated_data)

    def update(self, instance, validated_data):
        try:
            request_data = dict(self.get_serializer_context())
            print('request_data = %s' % request_data)
        except Exception as xx:
            print(str(xx))
        instance.save(**validated_data)
        return instance
    def to_representation(self, instance):
        ret = super().to_representation(instance)
        # Here we filter the null values and creates a new dictionary
        # We use OrderedDict like in original method
        ret = OrderedDict(filter(itemgetter(1), ret.items()))
        return ret
            
class LogoImagesUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = LogoImages
        fields = ('id',
                    'name',
                    )
        # fields = '__all__'
        lookup_field = 'uuid'
        extra_kwargs = {
            'url': {'lookup_field': 'uuid'}
        }
    def get_serializer_context(self):
        return self.context['request'].data

    def create(self, validated_data):
        try:
            request_data = dict(self.get_serializer_context())
            print('request_data = %s' % request_data)
        except Exception as xx:
            print(str(xx))
        return LogoImages.objects.create(**validated_data)

    def update(self, instance, validated_data):
        try:
            request_data = dict(self.get_serializer_context())
            print('request_data = %s' % request_data)
        except Exception as xx:
            print(str(xx))
        instance.save(**validated_data)
        return instance
    def to_representation(self, instance):
        ret = super().to_representation(instance)
        # Here we filter the null values and creates a new dictionary
        # We use OrderedDict like in original method
        ret = OrderedDict(filter(itemgetter(1), ret.items()))
        return ret
            
class LogoImagesDeleteSerializer(serializers.ModelSerializer):
    class Meta:
        model = LogoImages
        fields = ('id',
                    'name',
                    )
        # fields = '__all__'
        lookup_field = 'uuid'
        extra_kwargs = {
            'url': {'lookup_field': 'uuid'}
        }
    def get_serializer_context(self):
        return self.context['request'].data

    def create(self, validated_data):
        try:
            request_data = dict(self.get_serializer_context())
            print('request_data = %s' % request_data)
        except Exception as xx:
            print(str(xx))
        return LogoImages.objects.create(**validated_data)

    def update(self, instance, validated_data):
        try:
            request_data = dict(self.get_serializer_context())
            print('request_data = %s' % request_data)
        except Exception as xx:
            print(str(xx))
        instance.save(**validated_data)
        return instance
    def to_representation(self, instance):
        ret = super().to_representation(instance)
        # Here we filter the null values and creates a new dictionary
        # We use OrderedDict like in original method
        ret = OrderedDict(filter(itemgetter(1), ret.items()))
        return ret
            