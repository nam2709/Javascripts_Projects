
#!/usr/bin/env python
# -*- coding: utf-8 -*-
# region Description
__author__ = 'TruongNV - NGUYEN VAN TRUONG'
__copyright__ = "Copyright ©2022 TruongNV <truongg.nv@gmail.com>"
__maintainer__ = "TruongNV"
__email__ = "truongg.nv@gmail.com"
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
# from .models import *
        
# from .models import *
# from RunningTaskManagement.models import *
# from RunningTaskManagement.models_genaral import *
from .models import *


class ConfigSerializer(serializers.ModelSerializer):
    class Meta:
        model = Config
        # fields = ('name',
        #           'content',
        #           'default',
        #           'html_mode',
        #           'updated_at',
        #           'created_at')
        fields = '__all__'
        depth = 1
        lookup_field = 'uuid'
        # extra_kwargs = {
        #     'url': {'lookup_field': 'uuid'}
        # }
        # extra_fields = ['author_all']
        # def get_field_names(self, declared_fields, info):
    #     expanded_fields = super(NewspaperSerializer, self).get_field_names(declared_fields, info)

    #     if getattr(self.Meta, 'extra_fields', None):
    #         return expanded_fields + self.Meta.extra_fields
    #     else:
    #         return expanded_fields
    def get_serializer_context(self):
        return self.context['request'].data
    def get_request_user(self):
        return self.context['request'].user
    def create(self, validated_data):
        try:
            request_data = dict(self.get_serializer_context())
            print('request_data = %s' % request_data)
            validated_data["created_by"]=self.get_request_user()
            
            ########### Process BooleanField POST #############
            # if "active" in validated_data:
            #     active = validated_data.pop('active')
            # elif "active" in request_data:
            #     active = request_data.pop('active')
            
            ########### Process BooleanField POST #############
            # if "default" in validated_data:
            #     default = validated_data.pop('default')
            # elif "default" in request_data:
            #     default = request_data.pop('default')
            
            ########### Process BooleanField POST #############
            if "active" in locals():
                if active == "true":
                    validated_data["active"] = True
                else:
                    validated_data["active"] = False
                # instance.save()
            
            ########### Process BooleanField POST #############
            if "default" in locals():
                if default == "true":
                    validated_data["default"] = True
                else:
                    validated_data["default"] = False
                # instance.save()
            
            instance = Config.objects.create(**validated_data)
             
            
            
            ################################################
            return instance
        except Exception as xx:
            print(str(xx))
            return Config.objects.none()
 
    def update(self, instance, validated_data):
        try:
            for attr_name in validated_data:
                print('%s = %s' % (attr_name, validated_data[attr_name]))
            request_data = dict(self.get_serializer_context())
            validated_data["updated_by"]=self.get_request_user()
            print('request_data = %s' % request_data)
        except Exception as xx:
            print(str(xx))
        #instance.save(**validated_data)
        try:
            
            ########### Process BooleanField POST #############
            # if "active" in validated_data:
            #     active = validated_data.pop('active')
            # elif "active" in request_data:
            #     active = request_data.pop('active')
            
            ########### Process BooleanField POST #############
            # if "default" in validated_data:
            #     default = validated_data.pop('default')
            # elif "default" in request_data:
            #     default = request_data.pop('default')
            
            ########### Process BooleanField POST #############
            if "active" in locals():
                if active == "true":
                    validated_data["active"] = True
                else:
                    validated_data["active"] = False
                
                # instance.save()
                
            ########### Process BooleanField POST #############
            if "default" in locals():
                if default == "true":
                    validated_data["default"] = True
                else:
                    validated_data["default"] = False
                
                # instance.save()
                
            super(ConfigSerializer, self).update(instance, validated_data)
            
            return instance
        except Exception as xx:
            print(str(xx))
            return Config.objects.none()
    def to_representation(self, instance):
        ret = super().to_representation(instance)
        # Here we filter the null values and creates a new dictionary
        # We use OrderedDict like in original method
        ret = OrderedDict(filter(itemgetter(1), ret.items()))
        return ret
            
class ConfigRemoveFileSerializer(serializers.ModelSerializer):
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
        # extra_kwargs = {
        #     'url': {'lookup_field': 'uuid'}
        # }
    def get_serializer_context(self):
        return self.context['request'].data
    def get_request_user(self):
        return self.context['request'].user
    def create(self, validated_data):
        try:
            request_data = dict(self.get_serializer_context())
            print('request_data = %s' % request_data)
            validated_data["created_by"]=self.get_request_user()
            
            instance = Config.objects.create(**validated_data)
            
            ################################################
            return instance
        except Exception as xx:
            print(str(xx))
            return Config.objects.none()
            
    def update(self, instance, validated_data):
        try:
            for attr_name in validated_data:
                print('%s = %s' % (attr_name, validated_data[attr_name]))
            request_data = dict(self.get_serializer_context())
            # validated_data["updated_by"]=self.get_request_user()
            if 'attach-field' in request_data:
                validated_data[request_data["attach-field"][0]]=None
            print('request_data = %s' % request_data)
        except Exception as xx:
            print(str(xx))
        
        Config.objects.filter(uuid=instance.uuid).update(**validated_data)
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
        fields = ('uuid',
                    'name',
                    )
        # fields = '__all__'
        lookup_field = 'uuid'
        # extra_kwargs = {
        #     'url': {'lookup_field': 'uuid'}
        # }
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
        #instance.save(**validated_data)
        super(ConfigListSerializer, self).update(instance, validated_data)
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
        fields = ('uuid',
                    'name',
                    )
        # fields = '__all__'
        lookup_field = 'uuid'
        # extra_kwargs = {
        #     'url': {'lookup_field': 'uuid'}
        # }
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
        #instance.save(**validated_data)
        super(ConfigUpdateSerializer, self).update(instance, validated_data)

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
        fields = ('uuid',
                    'name',
                    )
        # fields = '__all__'
        lookup_field = 'uuid'
        # extra_kwargs = {
        #     'url': {'lookup_field': 'uuid'}
        # }
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
        #instance.save(**validated_data)
        # 
        super(ConfigUpdateSerializer, self).update(instance, validated_data)

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
        #           'content',
        #           'default',
        #           'html_mode',
        #           'updated_at',
        #           'created_at')
        fields = '__all__'
        depth = 1
        lookup_field = 'uuid'
        # extra_kwargs = {
        #     'url': {'lookup_field': 'uuid'}
        # }
        # extra_fields = ['author_all']
        # def get_field_names(self, declared_fields, info):
    #     expanded_fields = super(NewspaperSerializer, self).get_field_names(declared_fields, info)

    #     if getattr(self.Meta, 'extra_fields', None):
    #         return expanded_fields + self.Meta.extra_fields
    #     else:
    #         return expanded_fields
    def get_serializer_context(self):
        return self.context['request'].data
    def get_request_user(self):
        return self.context['request'].user
    def create(self, validated_data):
        try:
            request_data = dict(self.get_serializer_context())
            print('request_data = %s' % request_data)
            validated_data["created_by"]=self.get_request_user()
            
            ########### Process BooleanField POST #############
            # if "active" in validated_data:
            #     active = validated_data.pop('active')
            # elif "active" in request_data:
            #     active = request_data.pop('active')
            
            ########### Process BooleanField POST #############
            # if "is_product" in validated_data:
            #     is_product = validated_data.pop('is_product')
            # elif "is_product" in request_data:
            #     is_product = request_data.pop('is_product')
            
            ########### Process BooleanField POST #############
            # if "staff_only" in validated_data:
            #     staff_only = validated_data.pop('staff_only')
            # elif "staff_only" in request_data:
            #     staff_only = request_data.pop('staff_only')
            
            ########### Process BooleanField POST #############
            # if "admin_only" in validated_data:
            #     admin_only = validated_data.pop('admin_only')
            # elif "admin_only" in request_data:
            #     admin_only = request_data.pop('admin_only')
            
            ########### Process BooleanField POST #############
            # if "demo_mode" in validated_data:
            #     demo_mode = validated_data.pop('demo_mode')
            # elif "demo_mode" in request_data:
            #     demo_mode = request_data.pop('demo_mode')
            
            ########### Process BooleanField POST #############
            if "active" in locals():
                if active == "true":
                    validated_data["active"] = True
                else:
                    validated_data["active"] = False
                # instance.save()
            
            ########### Process BooleanField POST #############
            if "is_product" in locals():
                if is_product == "true":
                    validated_data["is_product"] = True
                else:
                    validated_data["is_product"] = False
                # instance.save()
            
            ########### Process BooleanField POST #############
            if "staff_only" in locals():
                if staff_only == "true":
                    validated_data["staff_only"] = True
                else:
                    validated_data["staff_only"] = False
                # instance.save()
            
            ########### Process BooleanField POST #############
            if "admin_only" in locals():
                if admin_only == "true":
                    validated_data["admin_only"] = True
                else:
                    validated_data["admin_only"] = False
                # instance.save()
            
            ########### Process BooleanField POST #############
            if "demo_mode" in locals():
                if demo_mode == "true":
                    validated_data["demo_mode"] = True
                else:
                    validated_data["demo_mode"] = False
                # instance.save()
            
            instance = AllApp.objects.create(**validated_data)
             
            
            
            ################################################
            return instance
        except Exception as xx:
            print(str(xx))
            return AllApp.objects.none()
 
    def update(self, instance, validated_data):
        try:
            for attr_name in validated_data:
                print('%s = %s' % (attr_name, validated_data[attr_name]))
            request_data = dict(self.get_serializer_context())
            validated_data["updated_by"]=self.get_request_user()
            print('request_data = %s' % request_data)
        except Exception as xx:
            print(str(xx))
        #instance.save(**validated_data)
        try:
            
            ########### Process BooleanField POST #############
            # if "active" in validated_data:
            #     active = validated_data.pop('active')
            # elif "active" in request_data:
            #     active = request_data.pop('active')
            
            ########### Process BooleanField POST #############
            # if "is_product" in validated_data:
            #     is_product = validated_data.pop('is_product')
            # elif "is_product" in request_data:
            #     is_product = request_data.pop('is_product')
            
            ########### Process BooleanField POST #############
            # if "staff_only" in validated_data:
            #     staff_only = validated_data.pop('staff_only')
            # elif "staff_only" in request_data:
            #     staff_only = request_data.pop('staff_only')
            
            ########### Process BooleanField POST #############
            # if "admin_only" in validated_data:
            #     admin_only = validated_data.pop('admin_only')
            # elif "admin_only" in request_data:
            #     admin_only = request_data.pop('admin_only')
            
            ########### Process BooleanField POST #############
            # if "demo_mode" in validated_data:
            #     demo_mode = validated_data.pop('demo_mode')
            # elif "demo_mode" in request_data:
            #     demo_mode = request_data.pop('demo_mode')
            
            ########### Process BooleanField POST #############
            if "active" in locals():
                if active == "true":
                    validated_data["active"] = True
                else:
                    validated_data["active"] = False
                
                # instance.save()
                
            ########### Process BooleanField POST #############
            if "is_product" in locals():
                if is_product == "true":
                    validated_data["is_product"] = True
                else:
                    validated_data["is_product"] = False
                
                # instance.save()
                
            ########### Process BooleanField POST #############
            if "staff_only" in locals():
                if staff_only == "true":
                    validated_data["staff_only"] = True
                else:
                    validated_data["staff_only"] = False
                
                # instance.save()
                
            ########### Process BooleanField POST #############
            if "admin_only" in locals():
                if admin_only == "true":
                    validated_data["admin_only"] = True
                else:
                    validated_data["admin_only"] = False
                
                # instance.save()
                
            ########### Process BooleanField POST #############
            if "demo_mode" in locals():
                if demo_mode == "true":
                    validated_data["demo_mode"] = True
                else:
                    validated_data["demo_mode"] = False
                
                # instance.save()
                
            super(AllAppSerializer, self).update(instance, validated_data)
            
            return instance
        except Exception as xx:
            print(str(xx))
            return AllApp.objects.none()
    def to_representation(self, instance):
        ret = super().to_representation(instance)
        # Here we filter the null values and creates a new dictionary
        # We use OrderedDict like in original method
        ret = OrderedDict(filter(itemgetter(1), ret.items()))
        return ret
            
class AllAppRemoveFileSerializer(serializers.ModelSerializer):
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
        # extra_kwargs = {
        #     'url': {'lookup_field': 'uuid'}
        # }
    def get_serializer_context(self):
        return self.context['request'].data
    def get_request_user(self):
        return self.context['request'].user
    def create(self, validated_data):
        try:
            request_data = dict(self.get_serializer_context())
            print('request_data = %s' % request_data)
            validated_data["created_by"]=self.get_request_user()
            
            instance = AllApp.objects.create(**validated_data)
            
            ################################################
            return instance
        except Exception as xx:
            print(str(xx))
            return AllApp.objects.none()
            
    def update(self, instance, validated_data):
        try:
            for attr_name in validated_data:
                print('%s = %s' % (attr_name, validated_data[attr_name]))
            request_data = dict(self.get_serializer_context())
            # validated_data["updated_by"]=self.get_request_user()
            if 'attach-field' in request_data:
                validated_data[request_data["attach-field"][0]]=None
            print('request_data = %s' % request_data)
        except Exception as xx:
            print(str(xx))
        
        AllApp.objects.filter(uuid=instance.uuid).update(**validated_data)
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
        fields = ('uuid',
                    'name',
                    )
        # fields = '__all__'
        lookup_field = 'uuid'
        # extra_kwargs = {
        #     'url': {'lookup_field': 'uuid'}
        # }
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
        #instance.save(**validated_data)
        super(AllAppListSerializer, self).update(instance, validated_data)
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
        fields = ('uuid',
                    'name',
                    )
        # fields = '__all__'
        lookup_field = 'uuid'
        # extra_kwargs = {
        #     'url': {'lookup_field': 'uuid'}
        # }
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
        #instance.save(**validated_data)
        super(AllAppUpdateSerializer, self).update(instance, validated_data)

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
        fields = ('uuid',
                    'name',
                    )
        # fields = '__all__'
        lookup_field = 'uuid'
        # extra_kwargs = {
        #     'url': {'lookup_field': 'uuid'}
        # }
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
        #instance.save(**validated_data)
        # 
        super(AllAppUpdateSerializer, self).update(instance, validated_data)

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
        #           'content',
        #           'default',
        #           'html_mode',
        #           'updated_at',
        #           'created_at')
        fields = '__all__'
        depth = 1
        lookup_field = 'uuid'
        # extra_kwargs = {
        #     'url': {'lookup_field': 'uuid'}
        # }
        # extra_fields = ['author_all']
        # def get_field_names(self, declared_fields, info):
    #     expanded_fields = super(NewspaperSerializer, self).get_field_names(declared_fields, info)

    #     if getattr(self.Meta, 'extra_fields', None):
    #         return expanded_fields + self.Meta.extra_fields
    #     else:
    #         return expanded_fields
    def get_serializer_context(self):
        return self.context['request'].data
    def get_request_user(self):
        return self.context['request'].user
    def create(self, validated_data):
        try:
            request_data = dict(self.get_serializer_context())
            print('request_data = %s' % request_data)
            validated_data["created_by"]=self.get_request_user()
            
            ########### Process BooleanField POST #############
            # if "active" in validated_data:
            #     active = validated_data.pop('active')
            # elif "active" in request_data:
            #     active = request_data.pop('active')
            
            ########### Process BooleanField POST #############
            # if "is_product" in validated_data:
            #     is_product = validated_data.pop('is_product')
            # elif "is_product" in request_data:
            #     is_product = request_data.pop('is_product')
            
            ########### Process BooleanField POST #############
            # if "staff_only" in validated_data:
            #     staff_only = validated_data.pop('staff_only')
            # elif "staff_only" in request_data:
            #     staff_only = request_data.pop('staff_only')
            
            ########### Process BooleanField POST #############
            # if "admin_only" in validated_data:
            #     admin_only = validated_data.pop('admin_only')
            # elif "admin_only" in request_data:
            #     admin_only = request_data.pop('admin_only')
            
            ########### Process BooleanField POST #############
            # if "demo_mode" in validated_data:
            #     demo_mode = validated_data.pop('demo_mode')
            # elif "demo_mode" in request_data:
            #     demo_mode = request_data.pop('demo_mode')
            
            ########### Process BooleanField POST #############
            if "active" in locals():
                if active == "true":
                    validated_data["active"] = True
                else:
                    validated_data["active"] = False
                # instance.save()
            
            ########### Process BooleanField POST #############
            if "is_product" in locals():
                if is_product == "true":
                    validated_data["is_product"] = True
                else:
                    validated_data["is_product"] = False
                # instance.save()
            
            ########### Process BooleanField POST #############
            if "staff_only" in locals():
                if staff_only == "true":
                    validated_data["staff_only"] = True
                else:
                    validated_data["staff_only"] = False
                # instance.save()
            
            ########### Process BooleanField POST #############
            if "admin_only" in locals():
                if admin_only == "true":
                    validated_data["admin_only"] = True
                else:
                    validated_data["admin_only"] = False
                # instance.save()
            
            ########### Process BooleanField POST #############
            if "demo_mode" in locals():
                if demo_mode == "true":
                    validated_data["demo_mode"] = True
                else:
                    validated_data["demo_mode"] = False
                # instance.save()
            
            instance = AllView.objects.create(**validated_data)
             
            
            
            ################################################
            return instance
        except Exception as xx:
            print(str(xx))
            return AllView.objects.none()
 
    def update(self, instance, validated_data):
        try:
            for attr_name in validated_data:
                print('%s = %s' % (attr_name, validated_data[attr_name]))
            request_data = dict(self.get_serializer_context())
            validated_data["updated_by"]=self.get_request_user()
            print('request_data = %s' % request_data)
        except Exception as xx:
            print(str(xx))
        #instance.save(**validated_data)
        try:
            
            ########### Process BooleanField POST #############
            # if "active" in validated_data:
            #     active = validated_data.pop('active')
            # elif "active" in request_data:
            #     active = request_data.pop('active')
            
            ########### Process BooleanField POST #############
            # if "is_product" in validated_data:
            #     is_product = validated_data.pop('is_product')
            # elif "is_product" in request_data:
            #     is_product = request_data.pop('is_product')
            
            ########### Process BooleanField POST #############
            # if "staff_only" in validated_data:
            #     staff_only = validated_data.pop('staff_only')
            # elif "staff_only" in request_data:
            #     staff_only = request_data.pop('staff_only')
            
            ########### Process BooleanField POST #############
            # if "admin_only" in validated_data:
            #     admin_only = validated_data.pop('admin_only')
            # elif "admin_only" in request_data:
            #     admin_only = request_data.pop('admin_only')
            
            ########### Process BooleanField POST #############
            # if "demo_mode" in validated_data:
            #     demo_mode = validated_data.pop('demo_mode')
            # elif "demo_mode" in request_data:
            #     demo_mode = request_data.pop('demo_mode')
            
            ########### Process BooleanField POST #############
            if "active" in locals():
                if active == "true":
                    validated_data["active"] = True
                else:
                    validated_data["active"] = False
                
                # instance.save()
                
            ########### Process BooleanField POST #############
            if "is_product" in locals():
                if is_product == "true":
                    validated_data["is_product"] = True
                else:
                    validated_data["is_product"] = False
                
                # instance.save()
                
            ########### Process BooleanField POST #############
            if "staff_only" in locals():
                if staff_only == "true":
                    validated_data["staff_only"] = True
                else:
                    validated_data["staff_only"] = False
                
                # instance.save()
                
            ########### Process BooleanField POST #############
            if "admin_only" in locals():
                if admin_only == "true":
                    validated_data["admin_only"] = True
                else:
                    validated_data["admin_only"] = False
                
                # instance.save()
                
            ########### Process BooleanField POST #############
            if "demo_mode" in locals():
                if demo_mode == "true":
                    validated_data["demo_mode"] = True
                else:
                    validated_data["demo_mode"] = False
                
                # instance.save()
                
            super(AllViewSerializer, self).update(instance, validated_data)
            
            return instance
        except Exception as xx:
            print(str(xx))
            return AllView.objects.none()
    def to_representation(self, instance):
        ret = super().to_representation(instance)
        # Here we filter the null values and creates a new dictionary
        # We use OrderedDict like in original method
        ret = OrderedDict(filter(itemgetter(1), ret.items()))
        return ret
            
class AllViewRemoveFileSerializer(serializers.ModelSerializer):
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
        # extra_kwargs = {
        #     'url': {'lookup_field': 'uuid'}
        # }
    def get_serializer_context(self):
        return self.context['request'].data
    def get_request_user(self):
        return self.context['request'].user
    def create(self, validated_data):
        try:
            request_data = dict(self.get_serializer_context())
            print('request_data = %s' % request_data)
            validated_data["created_by"]=self.get_request_user()
            
            instance = AllView.objects.create(**validated_data)
            
            ################################################
            return instance
        except Exception as xx:
            print(str(xx))
            return AllView.objects.none()
            
    def update(self, instance, validated_data):
        try:
            for attr_name in validated_data:
                print('%s = %s' % (attr_name, validated_data[attr_name]))
            request_data = dict(self.get_serializer_context())
            # validated_data["updated_by"]=self.get_request_user()
            if 'attach-field' in request_data:
                validated_data[request_data["attach-field"][0]]=None
            print('request_data = %s' % request_data)
        except Exception as xx:
            print(str(xx))
        
        AllView.objects.filter(uuid=instance.uuid).update(**validated_data)
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
        fields = ('uuid',
                    'name',
                    )
        # fields = '__all__'
        lookup_field = 'uuid'
        # extra_kwargs = {
        #     'url': {'lookup_field': 'uuid'}
        # }
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
        #instance.save(**validated_data)
        super(AllViewListSerializer, self).update(instance, validated_data)
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
        fields = ('uuid',
                    'name',
                    )
        # fields = '__all__'
        lookup_field = 'uuid'
        # extra_kwargs = {
        #     'url': {'lookup_field': 'uuid'}
        # }
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
        #instance.save(**validated_data)
        super(AllViewUpdateSerializer, self).update(instance, validated_data)

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
        fields = ('uuid',
                    'name',
                    )
        # fields = '__all__'
        lookup_field = 'uuid'
        # extra_kwargs = {
        #     'url': {'lookup_field': 'uuid'}
        # }
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
        #instance.save(**validated_data)
        # 
        super(AllViewUpdateSerializer, self).update(instance, validated_data)

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
        #           'content',
        #           'default',
        #           'html_mode',
        #           'updated_at',
        #           'created_at')
        fields = '__all__'
        depth = 1
        lookup_field = 'uuid'
        # extra_kwargs = {
        #     'url': {'lookup_field': 'uuid'}
        # }
        # extra_fields = ['author_all']
        # def get_field_names(self, declared_fields, info):
    #     expanded_fields = super(NewspaperSerializer, self).get_field_names(declared_fields, info)

    #     if getattr(self.Meta, 'extra_fields', None):
    #         return expanded_fields + self.Meta.extra_fields
    #     else:
    #         return expanded_fields
    def get_serializer_context(self):
        return self.context['request'].data
    def get_request_user(self):
        return self.context['request'].user
    def create(self, validated_data):
        try:
            request_data = dict(self.get_serializer_context())
            print('request_data = %s' % request_data)
            validated_data["created_by"]=self.get_request_user()
            
            ########### Process BooleanField POST #############
            # if "active" in validated_data:
            #     active = validated_data.pop('active')
            # elif "active" in request_data:
            #     active = request_data.pop('active')
            
            ########### Process BooleanField POST #############
            # if "is_base" in validated_data:
            #     is_base = validated_data.pop('is_base')
            # elif "is_base" in request_data:
            #     is_base = request_data.pop('is_base')
            
            ########### Process BooleanField POST #############
            # if "staff_only" in validated_data:
            #     staff_only = validated_data.pop('staff_only')
            # elif "staff_only" in request_data:
            #     staff_only = request_data.pop('staff_only')
            
            ########### Process BooleanField POST #############
            # if "superuser_only" in validated_data:
            #     superuser_only = validated_data.pop('superuser_only')
            # elif "superuser_only" in request_data:
            #     superuser_only = request_data.pop('superuser_only')
            
            ########### Process ForeignKey POST #############
            if "app" in validated_data:
                app = validated_data.pop('app')
            elif "app" in request_data:
                app = request_data.pop('app')
            ########### Process ForeignKey POST #############
            if "related_apps" in validated_data:
                related_apps = validated_data.pop('related_apps')
            elif "related_apps" in request_data:
                related_apps = request_data.pop('related_apps')
            ########### Process BooleanField POST #############
            if "active" in locals():
                if active == "true":
                    validated_data["active"] = True
                else:
                    validated_data["active"] = False
                # instance.save()
            
            ########### Process BooleanField POST #############
            if "is_base" in locals():
                if is_base == "true":
                    validated_data["is_base"] = True
                else:
                    validated_data["is_base"] = False
                # instance.save()
            
            ########### Process BooleanField POST #############
            if "staff_only" in locals():
                if staff_only == "true":
                    validated_data["staff_only"] = True
                else:
                    validated_data["staff_only"] = False
                # instance.save()
            
            ########### Process BooleanField POST #############
            if "superuser_only" in locals():
                if superuser_only == "true":
                    validated_data["superuser_only"] = True
                else:
                    validated_data["superuser_only"] = False
                # instance.save()
            
            if "app" in validated_data:
                for obj in validated_data["app"]:
                    if obj is not None and isinstance(obj,AllApp):
                        validated_data["app"] = obj
                        
            else:
                if "app" in locals():
                    for obj_id in app:
                        obj = None
                        if obj_id is '' or obj_id is None:
                            break
                        if obj_id.isdigit():
                            obj = AllApp.objects.filter(id=obj_id).first()
                        else:
                            try:
                                obj = AllApp.objects.filter(uuid=obj_id).first()
                            except Exception as xx:
                                print(xx)
                        if obj is not None:
                            validated_data["app"] = obj
                            # instance.save()
                            break
                        
            if "related_apps" in validated_data:
                for obj in validated_data["related_apps"]:
                    if obj is not None and isinstance(obj,AllApp):
                        validated_data["related_apps"] = obj
                        
            else:
                if "related_apps" in locals():
                    for obj_id in related_apps:
                        obj = None
                        if obj_id is '' or obj_id is None:
                            break
                        if obj_id.isdigit():
                            obj = AllApp.objects.filter(id=obj_id).first()
                        else:
                            try:
                                obj = AllApp.objects.filter(uuid=obj_id).first()
                            except Exception as xx:
                                print(xx)
                        if obj is not None:
                            validated_data["related_apps"] = obj
                            # instance.save()
                            break
                        
            instance = AdminMenuGroup.objects.create(**validated_data)
             
            
            
            ################################################
            return instance
        except Exception as xx:
            print(str(xx))
            return AdminMenuGroup.objects.none()
 
    def update(self, instance, validated_data):
        try:
            for attr_name in validated_data:
                print('%s = %s' % (attr_name, validated_data[attr_name]))
            request_data = dict(self.get_serializer_context())
            validated_data["updated_by"]=self.get_request_user()
            print('request_data = %s' % request_data)
        except Exception as xx:
            print(str(xx))
        #instance.save(**validated_data)
        try:
            
            ########### Process BooleanField POST #############
            # if "active" in validated_data:
            #     active = validated_data.pop('active')
            # elif "active" in request_data:
            #     active = request_data.pop('active')
            
            ########### Process BooleanField POST #############
            # if "is_base" in validated_data:
            #     is_base = validated_data.pop('is_base')
            # elif "is_base" in request_data:
            #     is_base = request_data.pop('is_base')
            
            ########### Process BooleanField POST #############
            # if "staff_only" in validated_data:
            #     staff_only = validated_data.pop('staff_only')
            # elif "staff_only" in request_data:
            #     staff_only = request_data.pop('staff_only')
            
            ########### Process BooleanField POST #############
            # if "superuser_only" in validated_data:
            #     superuser_only = validated_data.pop('superuser_only')
            # elif "superuser_only" in request_data:
            #     superuser_only = request_data.pop('superuser_only')
            
            ########### Process ForeignKey POST #############
            if "app" in validated_data:
                app = validated_data.pop('app')
            elif "app" in request_data:
                app = request_data.pop('app')
            ########### Process ForeignKey POST #############
            if "related_apps" in validated_data:
                related_apps = validated_data.pop('related_apps')
            elif "related_apps" in request_data:
                related_apps = request_data.pop('related_apps')
            ########### Process BooleanField POST #############
            if "active" in locals():
                if active == "true":
                    validated_data["active"] = True
                else:
                    validated_data["active"] = False
                
                # instance.save()
                
            ########### Process BooleanField POST #############
            if "is_base" in locals():
                if is_base == "true":
                    validated_data["is_base"] = True
                else:
                    validated_data["is_base"] = False
                
                # instance.save()
                
            ########### Process BooleanField POST #############
            if "staff_only" in locals():
                if staff_only == "true":
                    validated_data["staff_only"] = True
                else:
                    validated_data["staff_only"] = False
                
                # instance.save()
                
            ########### Process BooleanField POST #############
            if "superuser_only" in locals():
                if superuser_only == "true":
                    validated_data["superuser_only"] = True
                else:
                    validated_data["superuser_only"] = False
                
                # instance.save()
                
            if "app" in validated_data:
                for obj in validated_data["app"]:
                    if obj is not None and isinstance(obj,AllApp):
                        validated_data["app"] = obj
            else:
                if "app" in locals():
                    for obj_id in app:
                        obj = None
                        if obj_id is '' or obj_id is None:
                            break
                        if obj_id.isdigit():
                            obj = AllApp.objects.filter(id=obj_id).first()
                        else:
                            try:
                                obj = AllApp.objects.filter(uuid=obj_id).first()
                            except Exception as xx:
                                print(xx)
                        if obj is not None:
                            
                            validated_data["app"] = obj
                            # instance.save()
                            break
                        
            if "related_apps" in validated_data:
                for obj in validated_data["related_apps"]:
                    if obj is not None and isinstance(obj,AllApp):
                        validated_data["related_apps"] = obj
            else:
                if "related_apps" in locals():
                    for obj_id in related_apps:
                        obj = None
                        if obj_id is '' or obj_id is None:
                            break
                        if obj_id.isdigit():
                            obj = AllApp.objects.filter(id=obj_id).first()
                        else:
                            try:
                                obj = AllApp.objects.filter(uuid=obj_id).first()
                            except Exception as xx:
                                print(xx)
                        if obj is not None:
                            
                            validated_data["related_apps"] = obj
                            # instance.save()
                            break
                        
            super(AdminMenuGroupSerializer, self).update(instance, validated_data)
            
            return instance
        except Exception as xx:
            print(str(xx))
            return AdminMenuGroup.objects.none()
    def to_representation(self, instance):
        ret = super().to_representation(instance)
        # Here we filter the null values and creates a new dictionary
        # We use OrderedDict like in original method
        ret = OrderedDict(filter(itemgetter(1), ret.items()))
        return ret
            
class AdminMenuGroupRemoveFileSerializer(serializers.ModelSerializer):
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
        # extra_kwargs = {
        #     'url': {'lookup_field': 'uuid'}
        # }
    def get_serializer_context(self):
        return self.context['request'].data
    def get_request_user(self):
        return self.context['request'].user
    def create(self, validated_data):
        try:
            request_data = dict(self.get_serializer_context())
            print('request_data = %s' % request_data)
            validated_data["created_by"]=self.get_request_user()
            
            instance = AdminMenuGroup.objects.create(**validated_data)
            
            ################################################
            return instance
        except Exception as xx:
            print(str(xx))
            return AdminMenuGroup.objects.none()
            
    def update(self, instance, validated_data):
        try:
            for attr_name in validated_data:
                print('%s = %s' % (attr_name, validated_data[attr_name]))
            request_data = dict(self.get_serializer_context())
            # validated_data["updated_by"]=self.get_request_user()
            if 'attach-field' in request_data:
                validated_data[request_data["attach-field"][0]]=None
            print('request_data = %s' % request_data)
        except Exception as xx:
            print(str(xx))
        
        AdminMenuGroup.objects.filter(uuid=instance.uuid).update(**validated_data)
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
        fields = ('uuid',
                    'name',
                    )
        # fields = '__all__'
        lookup_field = 'uuid'
        # extra_kwargs = {
        #     'url': {'lookup_field': 'uuid'}
        # }
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
        #instance.save(**validated_data)
        super(AdminMenuGroupListSerializer, self).update(instance, validated_data)
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
        fields = ('uuid',
                    'name',
                    )
        # fields = '__all__'
        lookup_field = 'uuid'
        # extra_kwargs = {
        #     'url': {'lookup_field': 'uuid'}
        # }
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
        #instance.save(**validated_data)
        super(AdminMenuGroupUpdateSerializer, self).update(instance, validated_data)

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
        fields = ('uuid',
                    'name',
                    )
        # fields = '__all__'
        lookup_field = 'uuid'
        # extra_kwargs = {
        #     'url': {'lookup_field': 'uuid'}
        # }
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
        #instance.save(**validated_data)
        # 
        super(AdminMenuGroupUpdateSerializer, self).update(instance, validated_data)

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
        #           'content',
        #           'default',
        #           'html_mode',
        #           'updated_at',
        #           'created_at')
        fields = '__all__'
        depth = 1
        lookup_field = 'uuid'
        # extra_kwargs = {
        #     'url': {'lookup_field': 'uuid'}
        # }
        # extra_fields = ['author_all']
        # def get_field_names(self, declared_fields, info):
    #     expanded_fields = super(NewspaperSerializer, self).get_field_names(declared_fields, info)

    #     if getattr(self.Meta, 'extra_fields', None):
    #         return expanded_fields + self.Meta.extra_fields
    #     else:
    #         return expanded_fields
    def get_serializer_context(self):
        return self.context['request'].data
    def get_request_user(self):
        return self.context['request'].user
    def create(self, validated_data):
        try:
            request_data = dict(self.get_serializer_context())
            print('request_data = %s' % request_data)
            validated_data["created_by"]=self.get_request_user()
            
            ########### Process BooleanField POST #############
            # if "in_main_menu" in validated_data:
            #     in_main_menu = validated_data.pop('in_main_menu')
            # elif "in_main_menu" in request_data:
            #     in_main_menu = request_data.pop('in_main_menu')
            
            ########### Process ForeignKey POST #############
            if "menu_group" in validated_data:
                menu_group = validated_data.pop('menu_group')
            elif "menu_group" in request_data:
                menu_group = request_data.pop('menu_group')
            ########### Process ForeignKey POST #############
            if "parent_menu" in validated_data:
                parent_menu = validated_data.pop('parent_menu')
            elif "parent_menu" in request_data:
                parent_menu = request_data.pop('parent_menu')
            ########### Process BooleanField POST #############
            # if "login_redirect" in validated_data:
            #     login_redirect = validated_data.pop('login_redirect')
            # elif "login_redirect" in request_data:
            #     login_redirect = request_data.pop('login_redirect')
            
            ########### Process BooleanField POST #############
            # if "active" in validated_data:
            #     active = validated_data.pop('active')
            # elif "active" in request_data:
            #     active = request_data.pop('active')
            
            ########### Process BooleanField POST #############
            # if "staff_only" in validated_data:
            #     staff_only = validated_data.pop('staff_only')
            # elif "staff_only" in request_data:
            #     staff_only = request_data.pop('staff_only')
            
            ########### Process BooleanField POST #############
            # if "superuser_only" in validated_data:
            #     superuser_only = validated_data.pop('superuser_only')
            # elif "superuser_only" in request_data:
            #     superuser_only = request_data.pop('superuser_only')
            
            ########### Process BooleanField POST #############
            # if "split_marked" in validated_data:
            #     split_marked = validated_data.pop('split_marked')
            # elif "split_marked" in request_data:
            #     split_marked = request_data.pop('split_marked')
            
            ########### Process BooleanField POST #############
            if "in_main_menu" in locals():
                if in_main_menu == "true":
                    validated_data["in_main_menu"] = True
                else:
                    validated_data["in_main_menu"] = False
                # instance.save()
            
            if "menu_group" in validated_data:
                for obj in validated_data["menu_group"]:
                    if obj is not None and isinstance(obj,AdminMenuGroup):
                        validated_data["menu_group"] = obj
                        
            else:
                if "menu_group" in locals():
                    for obj_id in menu_group:
                        obj = None
                        if obj_id is '' or obj_id is None:
                            break
                        if obj_id.isdigit():
                            obj = AdminMenuGroup.objects.filter(id=obj_id).first()
                        else:
                            try:
                                obj = AdminMenuGroup.objects.filter(uuid=obj_id).first()
                            except Exception as xx:
                                print(xx)
                        if obj is not None:
                            validated_data["menu_group"] = obj
                            # instance.save()
                            break
                        
            if "parent_menu" in validated_data:
                for obj in validated_data["parent_menu"]:
                    if obj is not None and isinstance(obj,AllAdminMenu):
                        validated_data["parent_menu"] = obj
                        
            else:
                if "parent_menu" in locals():
                    for obj_id in parent_menu:
                        obj = None
                        if obj_id is '' or obj_id is None:
                            break
                        if obj_id.isdigit():
                            obj = AllAdminMenu.objects.filter(id=obj_id).first()
                        else:
                            try:
                                obj = AllAdminMenu.objects.filter(uuid=obj_id).first()
                            except Exception as xx:
                                print(xx)
                        if obj is not None:
                            validated_data["parent_menu"] = obj
                            # instance.save()
                            break
                        
            ########### Process BooleanField POST #############
            if "login_redirect" in locals():
                if login_redirect == "true":
                    validated_data["login_redirect"] = True
                else:
                    validated_data["login_redirect"] = False
                # instance.save()
            
            ########### Process BooleanField POST #############
            if "active" in locals():
                if active == "true":
                    validated_data["active"] = True
                else:
                    validated_data["active"] = False
                # instance.save()
            
            ########### Process BooleanField POST #############
            if "staff_only" in locals():
                if staff_only == "true":
                    validated_data["staff_only"] = True
                else:
                    validated_data["staff_only"] = False
                # instance.save()
            
            ########### Process BooleanField POST #############
            if "superuser_only" in locals():
                if superuser_only == "true":
                    validated_data["superuser_only"] = True
                else:
                    validated_data["superuser_only"] = False
                # instance.save()
            
            ########### Process BooleanField POST #############
            if "split_marked" in locals():
                if split_marked == "true":
                    validated_data["split_marked"] = True
                else:
                    validated_data["split_marked"] = False
                # instance.save()
            
            instance = AllAdminMenu.objects.create(**validated_data)
             
            
            
            ################################################
            return instance
        except Exception as xx:
            print(str(xx))
            return AllAdminMenu.objects.none()
 
    def update(self, instance, validated_data):
        try:
            for attr_name in validated_data:
                print('%s = %s' % (attr_name, validated_data[attr_name]))
            request_data = dict(self.get_serializer_context())
            validated_data["updated_by"]=self.get_request_user()
            print('request_data = %s' % request_data)
        except Exception as xx:
            print(str(xx))
        #instance.save(**validated_data)
        try:
            
            ########### Process BooleanField POST #############
            # if "in_main_menu" in validated_data:
            #     in_main_menu = validated_data.pop('in_main_menu')
            # elif "in_main_menu" in request_data:
            #     in_main_menu = request_data.pop('in_main_menu')
            
            ########### Process ForeignKey POST #############
            if "menu_group" in validated_data:
                menu_group = validated_data.pop('menu_group')
            elif "menu_group" in request_data:
                menu_group = request_data.pop('menu_group')
            ########### Process ForeignKey POST #############
            if "parent_menu" in validated_data:
                parent_menu = validated_data.pop('parent_menu')
            elif "parent_menu" in request_data:
                parent_menu = request_data.pop('parent_menu')
            ########### Process BooleanField POST #############
            # if "login_redirect" in validated_data:
            #     login_redirect = validated_data.pop('login_redirect')
            # elif "login_redirect" in request_data:
            #     login_redirect = request_data.pop('login_redirect')
            
            ########### Process BooleanField POST #############
            # if "active" in validated_data:
            #     active = validated_data.pop('active')
            # elif "active" in request_data:
            #     active = request_data.pop('active')
            
            ########### Process BooleanField POST #############
            # if "staff_only" in validated_data:
            #     staff_only = validated_data.pop('staff_only')
            # elif "staff_only" in request_data:
            #     staff_only = request_data.pop('staff_only')
            
            ########### Process BooleanField POST #############
            # if "superuser_only" in validated_data:
            #     superuser_only = validated_data.pop('superuser_only')
            # elif "superuser_only" in request_data:
            #     superuser_only = request_data.pop('superuser_only')
            
            ########### Process BooleanField POST #############
            # if "split_marked" in validated_data:
            #     split_marked = validated_data.pop('split_marked')
            # elif "split_marked" in request_data:
            #     split_marked = request_data.pop('split_marked')
            
            ########### Process BooleanField POST #############
            if "in_main_menu" in locals():
                if in_main_menu == "true":
                    validated_data["in_main_menu"] = True
                else:
                    validated_data["in_main_menu"] = False
                
                # instance.save()
                
            if "menu_group" in validated_data:
                for obj in validated_data["menu_group"]:
                    if obj is not None and isinstance(obj,AdminMenuGroup):
                        validated_data["menu_group"] = obj
            else:
                if "menu_group" in locals():
                    for obj_id in menu_group:
                        obj = None
                        if obj_id is '' or obj_id is None:
                            break
                        if obj_id.isdigit():
                            obj = AdminMenuGroup.objects.filter(id=obj_id).first()
                        else:
                            try:
                                obj = AdminMenuGroup.objects.filter(uuid=obj_id).first()
                            except Exception as xx:
                                print(xx)
                        if obj is not None:
                            
                            validated_data["menu_group"] = obj
                            # instance.save()
                            break
                        
            if "parent_menu" in validated_data:
                for obj in validated_data["parent_menu"]:
                    if obj is not None and isinstance(obj,AllAdminMenu):
                        validated_data["parent_menu"] = obj
            else:
                if "parent_menu" in locals():
                    for obj_id in parent_menu:
                        obj = None
                        if obj_id is '' or obj_id is None:
                            break
                        if obj_id.isdigit():
                            obj = AllAdminMenu.objects.filter(id=obj_id).first()
                        else:
                            try:
                                obj = AllAdminMenu.objects.filter(uuid=obj_id).first()
                            except Exception as xx:
                                print(xx)
                        if obj is not None:
                            
                            validated_data["parent_menu"] = obj
                            # instance.save()
                            break
                        
            ########### Process BooleanField POST #############
            if "login_redirect" in locals():
                if login_redirect == "true":
                    validated_data["login_redirect"] = True
                else:
                    validated_data["login_redirect"] = False
                
                # instance.save()
                
            ########### Process BooleanField POST #############
            if "active" in locals():
                if active == "true":
                    validated_data["active"] = True
                else:
                    validated_data["active"] = False
                
                # instance.save()
                
            ########### Process BooleanField POST #############
            if "staff_only" in locals():
                if staff_only == "true":
                    validated_data["staff_only"] = True
                else:
                    validated_data["staff_only"] = False
                
                # instance.save()
                
            ########### Process BooleanField POST #############
            if "superuser_only" in locals():
                if superuser_only == "true":
                    validated_data["superuser_only"] = True
                else:
                    validated_data["superuser_only"] = False
                
                # instance.save()
                
            ########### Process BooleanField POST #############
            if "split_marked" in locals():
                if split_marked == "true":
                    validated_data["split_marked"] = True
                else:
                    validated_data["split_marked"] = False
                
                # instance.save()
                
            super(AllAdminMenuSerializer, self).update(instance, validated_data)
            
            return instance
        except Exception as xx:
            print(str(xx))
            return AllAdminMenu.objects.none()
    def to_representation(self, instance):
        ret = super().to_representation(instance)
        # Here we filter the null values and creates a new dictionary
        # We use OrderedDict like in original method
        ret = OrderedDict(filter(itemgetter(1), ret.items()))
        return ret
            
class AllAdminMenuRemoveFileSerializer(serializers.ModelSerializer):
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
        # extra_kwargs = {
        #     'url': {'lookup_field': 'uuid'}
        # }
    def get_serializer_context(self):
        return self.context['request'].data
    def get_request_user(self):
        return self.context['request'].user
    def create(self, validated_data):
        try:
            request_data = dict(self.get_serializer_context())
            print('request_data = %s' % request_data)
            validated_data["created_by"]=self.get_request_user()
            
            instance = AllAdminMenu.objects.create(**validated_data)
            
            ################################################
            return instance
        except Exception as xx:
            print(str(xx))
            return AllAdminMenu.objects.none()
            
    def update(self, instance, validated_data):
        try:
            for attr_name in validated_data:
                print('%s = %s' % (attr_name, validated_data[attr_name]))
            request_data = dict(self.get_serializer_context())
            # validated_data["updated_by"]=self.get_request_user()
            if 'attach-field' in request_data:
                validated_data[request_data["attach-field"][0]]=None
            print('request_data = %s' % request_data)
        except Exception as xx:
            print(str(xx))
        
        AllAdminMenu.objects.filter(uuid=instance.uuid).update(**validated_data)
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
        fields = ('uuid',
                    'name',
                    )
        # fields = '__all__'
        lookup_field = 'uuid'
        # extra_kwargs = {
        #     'url': {'lookup_field': 'uuid'}
        # }
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
        #instance.save(**validated_data)
        super(AllAdminMenuListSerializer, self).update(instance, validated_data)
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
        fields = ('uuid',
                    'name',
                    )
        # fields = '__all__'
        lookup_field = 'uuid'
        # extra_kwargs = {
        #     'url': {'lookup_field': 'uuid'}
        # }
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
        #instance.save(**validated_data)
        super(AllAdminMenuUpdateSerializer, self).update(instance, validated_data)

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
        fields = ('uuid',
                    'name',
                    )
        # fields = '__all__'
        lookup_field = 'uuid'
        # extra_kwargs = {
        #     'url': {'lookup_field': 'uuid'}
        # }
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
        #instance.save(**validated_data)
        # 
        super(AllAdminMenuUpdateSerializer, self).update(instance, validated_data)

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
        #           'content',
        #           'default',
        #           'html_mode',
        #           'updated_at',
        #           'created_at')
        fields = '__all__'
        depth = 1
        lookup_field = 'uuid'
        # extra_kwargs = {
        #     'url': {'lookup_field': 'uuid'}
        # }
        # extra_fields = ['author_all']
        # def get_field_names(self, declared_fields, info):
    #     expanded_fields = super(NewspaperSerializer, self).get_field_names(declared_fields, info)

    #     if getattr(self.Meta, 'extra_fields', None):
    #         return expanded_fields + self.Meta.extra_fields
    #     else:
    #         return expanded_fields
    def get_serializer_context(self):
        return self.context['request'].data
    def get_request_user(self):
        return self.context['request'].user
    def create(self, validated_data):
        try:
            request_data = dict(self.get_serializer_context())
            print('request_data = %s' % request_data)
            validated_data["created_by"]=self.get_request_user()
            
            ########### Process BooleanField POST #############
            # if "active" in validated_data:
            #     active = validated_data.pop('active')
            # elif "active" in request_data:
            #     active = request_data.pop('active')
            
            ########### Process BooleanField POST #############
            if "active" in locals():
                if active == "true":
                    validated_data["active"] = True
                else:
                    validated_data["active"] = False
                # instance.save()
            
            instance = Position.objects.create(**validated_data)
             
            
            
            ################################################
            return instance
        except Exception as xx:
            print(str(xx))
            return Position.objects.none()
 
    def update(self, instance, validated_data):
        try:
            for attr_name in validated_data:
                print('%s = %s' % (attr_name, validated_data[attr_name]))
            request_data = dict(self.get_serializer_context())
            validated_data["updated_by"]=self.get_request_user()
            print('request_data = %s' % request_data)
        except Exception as xx:
            print(str(xx))
        #instance.save(**validated_data)
        try:
            
            ########### Process BooleanField POST #############
            # if "active" in validated_data:
            #     active = validated_data.pop('active')
            # elif "active" in request_data:
            #     active = request_data.pop('active')
            
            ########### Process BooleanField POST #############
            if "active" in locals():
                if active == "true":
                    validated_data["active"] = True
                else:
                    validated_data["active"] = False
                
                # instance.save()
                
            super(PositionSerializer, self).update(instance, validated_data)
            
            return instance
        except Exception as xx:
            print(str(xx))
            return Position.objects.none()
    def to_representation(self, instance):
        ret = super().to_representation(instance)
        # Here we filter the null values and creates a new dictionary
        # We use OrderedDict like in original method
        ret = OrderedDict(filter(itemgetter(1), ret.items()))
        return ret
            
class PositionRemoveFileSerializer(serializers.ModelSerializer):
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
        # extra_kwargs = {
        #     'url': {'lookup_field': 'uuid'}
        # }
    def get_serializer_context(self):
        return self.context['request'].data
    def get_request_user(self):
        return self.context['request'].user
    def create(self, validated_data):
        try:
            request_data = dict(self.get_serializer_context())
            print('request_data = %s' % request_data)
            validated_data["created_by"]=self.get_request_user()
            
            instance = Position.objects.create(**validated_data)
            
            ################################################
            return instance
        except Exception as xx:
            print(str(xx))
            return Position.objects.none()
            
    def update(self, instance, validated_data):
        try:
            for attr_name in validated_data:
                print('%s = %s' % (attr_name, validated_data[attr_name]))
            request_data = dict(self.get_serializer_context())
            # validated_data["updated_by"]=self.get_request_user()
            if 'attach-field' in request_data:
                validated_data[request_data["attach-field"][0]]=None
            print('request_data = %s' % request_data)
        except Exception as xx:
            print(str(xx))
        
        Position.objects.filter(uuid=instance.uuid).update(**validated_data)
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
        fields = ('uuid',
                    'name',
                    )
        # fields = '__all__'
        lookup_field = 'uuid'
        # extra_kwargs = {
        #     'url': {'lookup_field': 'uuid'}
        # }
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
        #instance.save(**validated_data)
        super(PositionListSerializer, self).update(instance, validated_data)
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
        fields = ('uuid',
                    'name',
                    )
        # fields = '__all__'
        lookup_field = 'uuid'
        # extra_kwargs = {
        #     'url': {'lookup_field': 'uuid'}
        # }
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
        #instance.save(**validated_data)
        super(PositionUpdateSerializer, self).update(instance, validated_data)

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
        fields = ('uuid',
                    'name',
                    )
        # fields = '__all__'
        lookup_field = 'uuid'
        # extra_kwargs = {
        #     'url': {'lookup_field': 'uuid'}
        # }
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
        #instance.save(**validated_data)
        # 
        super(PositionUpdateSerializer, self).update(instance, validated_data)

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
        #           'content',
        #           'default',
        #           'html_mode',
        #           'updated_at',
        #           'created_at')
        fields = '__all__'
        depth = 1
        lookup_field = 'uuid'
        # extra_kwargs = {
        #     'url': {'lookup_field': 'uuid'}
        # }
        # extra_fields = ['author_all']
        # def get_field_names(self, declared_fields, info):
    #     expanded_fields = super(NewspaperSerializer, self).get_field_names(declared_fields, info)

    #     if getattr(self.Meta, 'extra_fields', None):
    #         return expanded_fields + self.Meta.extra_fields
    #     else:
    #         return expanded_fields
    def get_serializer_context(self):
        return self.context['request'].data
    def get_request_user(self):
        return self.context['request'].user
    def create(self, validated_data):
        try:
            request_data = dict(self.get_serializer_context())
            print('request_data = %s' % request_data)
            validated_data["created_by"]=self.get_request_user()
            
            ########### Process ForeignKey POST #############
            if "position" in validated_data:
                position = validated_data.pop('position')
            elif "position" in request_data:
                position = request_data.pop('position')
            ########### Process BooleanField POST #############
            # if "active" in validated_data:
            #     active = validated_data.pop('active')
            # elif "active" in request_data:
            #     active = request_data.pop('active')
            
            if "position" in validated_data:
                for obj in validated_data["position"]:
                    if obj is not None and isinstance(obj,Position):
                        validated_data["position"] = obj
                        
            else:
                if "position" in locals():
                    for obj_id in position:
                        obj = None
                        if obj_id is '' or obj_id is None:
                            break
                        if obj_id.isdigit():
                            obj = Position.objects.filter(id=obj_id).first()
                        else:
                            try:
                                obj = Position.objects.filter(uuid=obj_id).first()
                            except Exception as xx:
                                print(xx)
                        if obj is not None:
                            validated_data["position"] = obj
                            # instance.save()
                            break
                        
            ########### Process BooleanField POST #############
            if "active" in locals():
                if active == "true":
                    validated_data["active"] = True
                else:
                    validated_data["active"] = False
                # instance.save()
            
            instance = FooterItem.objects.create(**validated_data)
             
            
            
            ################################################
            return instance
        except Exception as xx:
            print(str(xx))
            return FooterItem.objects.none()
 
    def update(self, instance, validated_data):
        try:
            for attr_name in validated_data:
                print('%s = %s' % (attr_name, validated_data[attr_name]))
            request_data = dict(self.get_serializer_context())
            validated_data["updated_by"]=self.get_request_user()
            print('request_data = %s' % request_data)
        except Exception as xx:
            print(str(xx))
        #instance.save(**validated_data)
        try:
            
            ########### Process ForeignKey POST #############
            if "position" in validated_data:
                position = validated_data.pop('position')
            elif "position" in request_data:
                position = request_data.pop('position')
            ########### Process BooleanField POST #############
            # if "active" in validated_data:
            #     active = validated_data.pop('active')
            # elif "active" in request_data:
            #     active = request_data.pop('active')
            
            if "position" in validated_data:
                for obj in validated_data["position"]:
                    if obj is not None and isinstance(obj,Position):
                        validated_data["position"] = obj
            else:
                if "position" in locals():
                    for obj_id in position:
                        obj = None
                        if obj_id is '' or obj_id is None:
                            break
                        if obj_id.isdigit():
                            obj = Position.objects.filter(id=obj_id).first()
                        else:
                            try:
                                obj = Position.objects.filter(uuid=obj_id).first()
                            except Exception as xx:
                                print(xx)
                        if obj is not None:
                            
                            validated_data["position"] = obj
                            # instance.save()
                            break
                        
            ########### Process BooleanField POST #############
            if "active" in locals():
                if active == "true":
                    validated_data["active"] = True
                else:
                    validated_data["active"] = False
                
                # instance.save()
                
            super(FooterItemSerializer, self).update(instance, validated_data)
            
            return instance
        except Exception as xx:
            print(str(xx))
            return FooterItem.objects.none()
    def to_representation(self, instance):
        ret = super().to_representation(instance)
        # Here we filter the null values and creates a new dictionary
        # We use OrderedDict like in original method
        ret = OrderedDict(filter(itemgetter(1), ret.items()))
        return ret
            
class FooterItemRemoveFileSerializer(serializers.ModelSerializer):
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
        # extra_kwargs = {
        #     'url': {'lookup_field': 'uuid'}
        # }
    def get_serializer_context(self):
        return self.context['request'].data
    def get_request_user(self):
        return self.context['request'].user
    def create(self, validated_data):
        try:
            request_data = dict(self.get_serializer_context())
            print('request_data = %s' % request_data)
            validated_data["created_by"]=self.get_request_user()
            
            instance = FooterItem.objects.create(**validated_data)
            
            ################################################
            return instance
        except Exception as xx:
            print(str(xx))
            return FooterItem.objects.none()
            
    def update(self, instance, validated_data):
        try:
            for attr_name in validated_data:
                print('%s = %s' % (attr_name, validated_data[attr_name]))
            request_data = dict(self.get_serializer_context())
            # validated_data["updated_by"]=self.get_request_user()
            if 'attach-field' in request_data:
                validated_data[request_data["attach-field"][0]]=None
            print('request_data = %s' % request_data)
        except Exception as xx:
            print(str(xx))
        
        FooterItem.objects.filter(uuid=instance.uuid).update(**validated_data)
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
        fields = ('uuid',
                    'name',
                    )
        # fields = '__all__'
        lookup_field = 'uuid'
        # extra_kwargs = {
        #     'url': {'lookup_field': 'uuid'}
        # }
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
        #instance.save(**validated_data)
        super(FooterItemListSerializer, self).update(instance, validated_data)
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
        fields = ('uuid',
                    'name',
                    )
        # fields = '__all__'
        lookup_field = 'uuid'
        # extra_kwargs = {
        #     'url': {'lookup_field': 'uuid'}
        # }
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
        #instance.save(**validated_data)
        super(FooterItemUpdateSerializer, self).update(instance, validated_data)

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
        fields = ('uuid',
                    'name',
                    )
        # fields = '__all__'
        lookup_field = 'uuid'
        # extra_kwargs = {
        #     'url': {'lookup_field': 'uuid'}
        # }
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
        #instance.save(**validated_data)
        # 
        super(FooterItemUpdateSerializer, self).update(instance, validated_data)

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
        #           'content',
        #           'default',
        #           'html_mode',
        #           'updated_at',
        #           'created_at')
        fields = '__all__'
        depth = 1
        lookup_field = 'uuid'
        # extra_kwargs = {
        #     'url': {'lookup_field': 'uuid'}
        # }
        # extra_fields = ['author_all']
        # def get_field_names(self, declared_fields, info):
    #     expanded_fields = super(NewspaperSerializer, self).get_field_names(declared_fields, info)

    #     if getattr(self.Meta, 'extra_fields', None):
    #         return expanded_fields + self.Meta.extra_fields
    #     else:
    #         return expanded_fields
    def get_serializer_context(self):
        return self.context['request'].data
    def get_request_user(self):
        return self.context['request'].user
    def create(self, validated_data):
        try:
            request_data = dict(self.get_serializer_context())
            print('request_data = %s' % request_data)
            validated_data["created_by"]=self.get_request_user()
            
            ########### Process ForeignKey POST #############
            if "position" in validated_data:
                position = validated_data.pop('position')
            elif "position" in request_data:
                position = request_data.pop('position')
            ########### Process BooleanField POST #############
            # if "active" in validated_data:
            #     active = validated_data.pop('active')
            # elif "active" in request_data:
            #     active = request_data.pop('active')
            
            if "position" in validated_data:
                for obj in validated_data["position"]:
                    if obj is not None and isinstance(obj,Position):
                        validated_data["position"] = obj
                        
            else:
                if "position" in locals():
                    for obj_id in position:
                        obj = None
                        if obj_id is '' or obj_id is None:
                            break
                        if obj_id.isdigit():
                            obj = Position.objects.filter(id=obj_id).first()
                        else:
                            try:
                                obj = Position.objects.filter(uuid=obj_id).first()
                            except Exception as xx:
                                print(xx)
                        if obj is not None:
                            validated_data["position"] = obj
                            # instance.save()
                            break
                        
            ########### Process BooleanField POST #############
            if "active" in locals():
                if active == "true":
                    validated_data["active"] = True
                else:
                    validated_data["active"] = False
                # instance.save()
            
            instance = Widget.objects.create(**validated_data)
             
            
            
            ################################################
            return instance
        except Exception as xx:
            print(str(xx))
            return Widget.objects.none()
 
    def update(self, instance, validated_data):
        try:
            for attr_name in validated_data:
                print('%s = %s' % (attr_name, validated_data[attr_name]))
            request_data = dict(self.get_serializer_context())
            validated_data["updated_by"]=self.get_request_user()
            print('request_data = %s' % request_data)
        except Exception as xx:
            print(str(xx))
        #instance.save(**validated_data)
        try:
            
            ########### Process ForeignKey POST #############
            if "position" in validated_data:
                position = validated_data.pop('position')
            elif "position" in request_data:
                position = request_data.pop('position')
            ########### Process BooleanField POST #############
            # if "active" in validated_data:
            #     active = validated_data.pop('active')
            # elif "active" in request_data:
            #     active = request_data.pop('active')
            
            if "position" in validated_data:
                for obj in validated_data["position"]:
                    if obj is not None and isinstance(obj,Position):
                        validated_data["position"] = obj
            else:
                if "position" in locals():
                    for obj_id in position:
                        obj = None
                        if obj_id is '' or obj_id is None:
                            break
                        if obj_id.isdigit():
                            obj = Position.objects.filter(id=obj_id).first()
                        else:
                            try:
                                obj = Position.objects.filter(uuid=obj_id).first()
                            except Exception as xx:
                                print(xx)
                        if obj is not None:
                            
                            validated_data["position"] = obj
                            # instance.save()
                            break
                        
            ########### Process BooleanField POST #############
            if "active" in locals():
                if active == "true":
                    validated_data["active"] = True
                else:
                    validated_data["active"] = False
                
                # instance.save()
                
            super(WidgetSerializer, self).update(instance, validated_data)
            
            return instance
        except Exception as xx:
            print(str(xx))
            return Widget.objects.none()
    def to_representation(self, instance):
        ret = super().to_representation(instance)
        # Here we filter the null values and creates a new dictionary
        # We use OrderedDict like in original method
        ret = OrderedDict(filter(itemgetter(1), ret.items()))
        return ret
            
class WidgetRemoveFileSerializer(serializers.ModelSerializer):
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
        # extra_kwargs = {
        #     'url': {'lookup_field': 'uuid'}
        # }
    def get_serializer_context(self):
        return self.context['request'].data
    def get_request_user(self):
        return self.context['request'].user
    def create(self, validated_data):
        try:
            request_data = dict(self.get_serializer_context())
            print('request_data = %s' % request_data)
            validated_data["created_by"]=self.get_request_user()
            
            instance = Widget.objects.create(**validated_data)
            
            ################################################
            return instance
        except Exception as xx:
            print(str(xx))
            return Widget.objects.none()
            
    def update(self, instance, validated_data):
        try:
            for attr_name in validated_data:
                print('%s = %s' % (attr_name, validated_data[attr_name]))
            request_data = dict(self.get_serializer_context())
            # validated_data["updated_by"]=self.get_request_user()
            if 'attach-field' in request_data:
                validated_data[request_data["attach-field"][0]]=None
            print('request_data = %s' % request_data)
        except Exception as xx:
            print(str(xx))
        
        Widget.objects.filter(uuid=instance.uuid).update(**validated_data)
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
        fields = ('uuid',
                    'name',
                    )
        # fields = '__all__'
        lookup_field = 'uuid'
        # extra_kwargs = {
        #     'url': {'lookup_field': 'uuid'}
        # }
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
        #instance.save(**validated_data)
        super(WidgetListSerializer, self).update(instance, validated_data)
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
        fields = ('uuid',
                    'name',
                    )
        # fields = '__all__'
        lookup_field = 'uuid'
        # extra_kwargs = {
        #     'url': {'lookup_field': 'uuid'}
        # }
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
        #instance.save(**validated_data)
        super(WidgetUpdateSerializer, self).update(instance, validated_data)

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
        fields = ('uuid',
                    'name',
                    )
        # fields = '__all__'
        lookup_field = 'uuid'
        # extra_kwargs = {
        #     'url': {'lookup_field': 'uuid'}
        # }
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
        #instance.save(**validated_data)
        # 
        super(WidgetUpdateSerializer, self).update(instance, validated_data)

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
        #           'content',
        #           'default',
        #           'html_mode',
        #           'updated_at',
        #           'created_at')
        fields = '__all__'
        depth = 1
        lookup_field = 'uuid'
        # extra_kwargs = {
        #     'url': {'lookup_field': 'uuid'}
        # }
        # extra_fields = ['author_all']
        # def get_field_names(self, declared_fields, info):
    #     expanded_fields = super(NewspaperSerializer, self).get_field_names(declared_fields, info)

    #     if getattr(self.Meta, 'extra_fields', None):
    #         return expanded_fields + self.Meta.extra_fields
    #     else:
    #         return expanded_fields
    def get_serializer_context(self):
        return self.context['request'].data
    def get_request_user(self):
        return self.context['request'].user
    def create(self, validated_data):
        try:
            request_data = dict(self.get_serializer_context())
            print('request_data = %s' % request_data)
            validated_data["created_by"]=self.get_request_user()
            
            instance = TimeZone.objects.create(**validated_data)
             
            
            
            ################################################
            return instance
        except Exception as xx:
            print(str(xx))
            return TimeZone.objects.none()
 
    def update(self, instance, validated_data):
        try:
            for attr_name in validated_data:
                print('%s = %s' % (attr_name, validated_data[attr_name]))
            request_data = dict(self.get_serializer_context())
            validated_data["updated_by"]=self.get_request_user()
            print('request_data = %s' % request_data)
        except Exception as xx:
            print(str(xx))
        #instance.save(**validated_data)
        try:
            
            super(TimeZoneSerializer, self).update(instance, validated_data)
            
            return instance
        except Exception as xx:
            print(str(xx))
            return TimeZone.objects.none()
    def to_representation(self, instance):
        ret = super().to_representation(instance)
        # Here we filter the null values and creates a new dictionary
        # We use OrderedDict like in original method
        ret = OrderedDict(filter(itemgetter(1), ret.items()))
        return ret
            
class TimeZoneRemoveFileSerializer(serializers.ModelSerializer):
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
        # extra_kwargs = {
        #     'url': {'lookup_field': 'uuid'}
        # }
    def get_serializer_context(self):
        return self.context['request'].data
    def get_request_user(self):
        return self.context['request'].user
    def create(self, validated_data):
        try:
            request_data = dict(self.get_serializer_context())
            print('request_data = %s' % request_data)
            validated_data["created_by"]=self.get_request_user()
            
            instance = TimeZone.objects.create(**validated_data)
            
            ################################################
            return instance
        except Exception as xx:
            print(str(xx))
            return TimeZone.objects.none()
            
    def update(self, instance, validated_data):
        try:
            for attr_name in validated_data:
                print('%s = %s' % (attr_name, validated_data[attr_name]))
            request_data = dict(self.get_serializer_context())
            # validated_data["updated_by"]=self.get_request_user()
            if 'attach-field' in request_data:
                validated_data[request_data["attach-field"][0]]=None
            print('request_data = %s' % request_data)
        except Exception as xx:
            print(str(xx))
        
        TimeZone.objects.filter(uuid=instance.uuid).update(**validated_data)
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
        fields = ('uuid',
                    'name',
                    )
        # fields = '__all__'
        lookup_field = 'uuid'
        # extra_kwargs = {
        #     'url': {'lookup_field': 'uuid'}
        # }
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
        #instance.save(**validated_data)
        super(TimeZoneListSerializer, self).update(instance, validated_data)
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
        fields = ('uuid',
                    'name',
                    )
        # fields = '__all__'
        lookup_field = 'uuid'
        # extra_kwargs = {
        #     'url': {'lookup_field': 'uuid'}
        # }
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
        #instance.save(**validated_data)
        super(TimeZoneUpdateSerializer, self).update(instance, validated_data)

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
        fields = ('uuid',
                    'name',
                    )
        # fields = '__all__'
        lookup_field = 'uuid'
        # extra_kwargs = {
        #     'url': {'lookup_field': 'uuid'}
        # }
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
        #instance.save(**validated_data)
        # 
        super(TimeZoneUpdateSerializer, self).update(instance, validated_data)

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
        #           'content',
        #           'default',
        #           'html_mode',
        #           'updated_at',
        #           'created_at')
        fields = '__all__'
        depth = 1
        lookup_field = 'uuid'
        # extra_kwargs = {
        #     'url': {'lookup_field': 'uuid'}
        # }
        # extra_fields = ['author_all']
        # def get_field_names(self, declared_fields, info):
    #     expanded_fields = super(NewspaperSerializer, self).get_field_names(declared_fields, info)

    #     if getattr(self.Meta, 'extra_fields', None):
    #         return expanded_fields + self.Meta.extra_fields
    #     else:
    #         return expanded_fields
    def get_serializer_context(self):
        return self.context['request'].data
    def get_request_user(self):
        return self.context['request'].user
    def create(self, validated_data):
        try:
            request_data = dict(self.get_serializer_context())
            print('request_data = %s' % request_data)
            validated_data["created_by"]=self.get_request_user()
            
            ########### Process BooleanField POST #############
            # if "active" in validated_data:
            #     active = validated_data.pop('active')
            # elif "active" in request_data:
            #     active = request_data.pop('active')
            
            ########### Process BooleanField POST #############
            if "active" in locals():
                if active == "true":
                    validated_data["active"] = True
                else:
                    validated_data["active"] = False
                # instance.save()
            
            instance = PageInfo.objects.create(**validated_data)
             
            
            
            ################################################
            return instance
        except Exception as xx:
            print(str(xx))
            return PageInfo.objects.none()
 
    def update(self, instance, validated_data):
        try:
            for attr_name in validated_data:
                print('%s = %s' % (attr_name, validated_data[attr_name]))
            request_data = dict(self.get_serializer_context())
            validated_data["updated_by"]=self.get_request_user()
            print('request_data = %s' % request_data)
        except Exception as xx:
            print(str(xx))
        #instance.save(**validated_data)
        try:
            
            ########### Process BooleanField POST #############
            # if "active" in validated_data:
            #     active = validated_data.pop('active')
            # elif "active" in request_data:
            #     active = request_data.pop('active')
            
            ########### Process BooleanField POST #############
            if "active" in locals():
                if active == "true":
                    validated_data["active"] = True
                else:
                    validated_data["active"] = False
                
                # instance.save()
                
            super(PageInfoSerializer, self).update(instance, validated_data)
            
            return instance
        except Exception as xx:
            print(str(xx))
            return PageInfo.objects.none()
    def to_representation(self, instance):
        ret = super().to_representation(instance)
        # Here we filter the null values and creates a new dictionary
        # We use OrderedDict like in original method
        ret = OrderedDict(filter(itemgetter(1), ret.items()))
        return ret
            
class PageInfoRemoveFileSerializer(serializers.ModelSerializer):
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
        # extra_kwargs = {
        #     'url': {'lookup_field': 'uuid'}
        # }
    def get_serializer_context(self):
        return self.context['request'].data
    def get_request_user(self):
        return self.context['request'].user
    def create(self, validated_data):
        try:
            request_data = dict(self.get_serializer_context())
            print('request_data = %s' % request_data)
            validated_data["created_by"]=self.get_request_user()
            
            instance = PageInfo.objects.create(**validated_data)
            
            ################################################
            return instance
        except Exception as xx:
            print(str(xx))
            return PageInfo.objects.none()
            
    def update(self, instance, validated_data):
        try:
            for attr_name in validated_data:
                print('%s = %s' % (attr_name, validated_data[attr_name]))
            request_data = dict(self.get_serializer_context())
            # validated_data["updated_by"]=self.get_request_user()
            if 'attach-field' in request_data:
                validated_data[request_data["attach-field"][0]]=None
            print('request_data = %s' % request_data)
        except Exception as xx:
            print(str(xx))
        
        PageInfo.objects.filter(uuid=instance.uuid).update(**validated_data)
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
        fields = ('uuid',
                    'name',
                    )
        # fields = '__all__'
        lookup_field = 'uuid'
        # extra_kwargs = {
        #     'url': {'lookup_field': 'uuid'}
        # }
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
        #instance.save(**validated_data)
        super(PageInfoListSerializer, self).update(instance, validated_data)
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
        fields = ('uuid',
                    'name',
                    )
        # fields = '__all__'
        lookup_field = 'uuid'
        # extra_kwargs = {
        #     'url': {'lookup_field': 'uuid'}
        # }
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
        #instance.save(**validated_data)
        super(PageInfoUpdateSerializer, self).update(instance, validated_data)

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
        fields = ('uuid',
                    'name',
                    )
        # fields = '__all__'
        lookup_field = 'uuid'
        # extra_kwargs = {
        #     'url': {'lookup_field': 'uuid'}
        # }
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
        #instance.save(**validated_data)
        # 
        super(PageInfoUpdateSerializer, self).update(instance, validated_data)

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
        #           'content',
        #           'default',
        #           'html_mode',
        #           'updated_at',
        #           'created_at')
        fields = '__all__'
        depth = 1
        lookup_field = 'uuid'
        # extra_kwargs = {
        #     'url': {'lookup_field': 'uuid'}
        # }
        # extra_fields = ['author_all']
        # def get_field_names(self, declared_fields, info):
    #     expanded_fields = super(NewspaperSerializer, self).get_field_names(declared_fields, info)

    #     if getattr(self.Meta, 'extra_fields', None):
    #         return expanded_fields + self.Meta.extra_fields
    #     else:
    #         return expanded_fields
    def get_serializer_context(self):
        return self.context['request'].data
    def get_request_user(self):
        return self.context['request'].user
    def create(self, validated_data):
        try:
            request_data = dict(self.get_serializer_context())
            print('request_data = %s' % request_data)
            validated_data["created_by"]=self.get_request_user()
            
            ########### Process BooleanField POST #############
            # if "active" in validated_data:
            #     active = validated_data.pop('active')
            # elif "active" in request_data:
            #     active = request_data.pop('active')
            
            ########### Process BooleanField POST #############
            if "active" in locals():
                if active == "true":
                    validated_data["active"] = True
                else:
                    validated_data["active"] = False
                # instance.save()
            
            instance = BotUA.objects.create(**validated_data)
             
            
            
            ################################################
            return instance
        except Exception as xx:
            print(str(xx))
            return BotUA.objects.none()
 
    def update(self, instance, validated_data):
        try:
            for attr_name in validated_data:
                print('%s = %s' % (attr_name, validated_data[attr_name]))
            request_data = dict(self.get_serializer_context())
            validated_data["updated_by"]=self.get_request_user()
            print('request_data = %s' % request_data)
        except Exception as xx:
            print(str(xx))
        #instance.save(**validated_data)
        try:
            
            ########### Process BooleanField POST #############
            # if "active" in validated_data:
            #     active = validated_data.pop('active')
            # elif "active" in request_data:
            #     active = request_data.pop('active')
            
            ########### Process BooleanField POST #############
            if "active" in locals():
                if active == "true":
                    validated_data["active"] = True
                else:
                    validated_data["active"] = False
                
                # instance.save()
                
            super(BotUASerializer, self).update(instance, validated_data)
            
            return instance
        except Exception as xx:
            print(str(xx))
            return BotUA.objects.none()
    def to_representation(self, instance):
        ret = super().to_representation(instance)
        # Here we filter the null values and creates a new dictionary
        # We use OrderedDict like in original method
        ret = OrderedDict(filter(itemgetter(1), ret.items()))
        return ret
            
class BotUARemoveFileSerializer(serializers.ModelSerializer):
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
        # extra_kwargs = {
        #     'url': {'lookup_field': 'uuid'}
        # }
    def get_serializer_context(self):
        return self.context['request'].data
    def get_request_user(self):
        return self.context['request'].user
    def create(self, validated_data):
        try:
            request_data = dict(self.get_serializer_context())
            print('request_data = %s' % request_data)
            validated_data["created_by"]=self.get_request_user()
            
            instance = BotUA.objects.create(**validated_data)
            
            ################################################
            return instance
        except Exception as xx:
            print(str(xx))
            return BotUA.objects.none()
            
    def update(self, instance, validated_data):
        try:
            for attr_name in validated_data:
                print('%s = %s' % (attr_name, validated_data[attr_name]))
            request_data = dict(self.get_serializer_context())
            # validated_data["updated_by"]=self.get_request_user()
            if 'attach-field' in request_data:
                validated_data[request_data["attach-field"][0]]=None
            print('request_data = %s' % request_data)
        except Exception as xx:
            print(str(xx))
        
        BotUA.objects.filter(uuid=instance.uuid).update(**validated_data)
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
        fields = ('uuid',
                    'name',
                    )
        # fields = '__all__'
        lookup_field = 'uuid'
        # extra_kwargs = {
        #     'url': {'lookup_field': 'uuid'}
        # }
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
        #instance.save(**validated_data)
        super(BotUAListSerializer, self).update(instance, validated_data)
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
        fields = ('uuid',
                    'name',
                    )
        # fields = '__all__'
        lookup_field = 'uuid'
        # extra_kwargs = {
        #     'url': {'lookup_field': 'uuid'}
        # }
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
        #instance.save(**validated_data)
        super(BotUAUpdateSerializer, self).update(instance, validated_data)

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
        fields = ('uuid',
                    'name',
                    )
        # fields = '__all__'
        lookup_field = 'uuid'
        # extra_kwargs = {
        #     'url': {'lookup_field': 'uuid'}
        # }
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
        #instance.save(**validated_data)
        # 
        super(BotUAUpdateSerializer, self).update(instance, validated_data)

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
        #           'content',
        #           'default',
        #           'html_mode',
        #           'updated_at',
        #           'created_at')
        fields = '__all__'
        depth = 1
        lookup_field = 'uuid'
        # extra_kwargs = {
        #     'url': {'lookup_field': 'uuid'}
        # }
        # extra_fields = ['author_all']
        # def get_field_names(self, declared_fields, info):
    #     expanded_fields = super(NewspaperSerializer, self).get_field_names(declared_fields, info)

    #     if getattr(self.Meta, 'extra_fields', None):
    #         return expanded_fields + self.Meta.extra_fields
    #     else:
    #         return expanded_fields
    def get_serializer_context(self):
        return self.context['request'].data
    def get_request_user(self):
        return self.context['request'].user
    def create(self, validated_data):
        try:
            request_data = dict(self.get_serializer_context())
            print('request_data = %s' % request_data)
            validated_data["created_by"]=self.get_request_user()
            
            ########### Process ForeignKey POST #############
            if "ua" in validated_data:
                ua = validated_data.pop('ua')
            elif "ua" in request_data:
                ua = request_data.pop('ua')
            ########### Process BooleanField POST #############
            # if "active" in validated_data:
            #     active = validated_data.pop('active')
            # elif "active" in request_data:
            #     active = request_data.pop('active')
            
            if "ua" in validated_data:
                for obj in validated_data["ua"]:
                    if obj is not None and isinstance(obj,BotUA):
                        validated_data["ua"] = obj
                        
            else:
                if "ua" in locals():
                    for obj_id in ua:
                        obj = None
                        if obj_id is '' or obj_id is None:
                            break
                        if obj_id.isdigit():
                            obj = BotUA.objects.filter(id=obj_id).first()
                        else:
                            try:
                                obj = BotUA.objects.filter(uuid=obj_id).first()
                            except Exception as xx:
                                print(xx)
                        if obj is not None:
                            validated_data["ua"] = obj
                            # instance.save()
                            break
                        
            ########### Process BooleanField POST #############
            if "active" in locals():
                if active == "true":
                    validated_data["active"] = True
                else:
                    validated_data["active"] = False
                # instance.save()
            
            instance = RobotsArg.objects.create(**validated_data)
             
            
            
            ################################################
            return instance
        except Exception as xx:
            print(str(xx))
            return RobotsArg.objects.none()
 
    def update(self, instance, validated_data):
        try:
            for attr_name in validated_data:
                print('%s = %s' % (attr_name, validated_data[attr_name]))
            request_data = dict(self.get_serializer_context())
            validated_data["updated_by"]=self.get_request_user()
            print('request_data = %s' % request_data)
        except Exception as xx:
            print(str(xx))
        #instance.save(**validated_data)
        try:
            
            ########### Process ForeignKey POST #############
            if "ua" in validated_data:
                ua = validated_data.pop('ua')
            elif "ua" in request_data:
                ua = request_data.pop('ua')
            ########### Process BooleanField POST #############
            # if "active" in validated_data:
            #     active = validated_data.pop('active')
            # elif "active" in request_data:
            #     active = request_data.pop('active')
            
            if "ua" in validated_data:
                for obj in validated_data["ua"]:
                    if obj is not None and isinstance(obj,BotUA):
                        validated_data["ua"] = obj
            else:
                if "ua" in locals():
                    for obj_id in ua:
                        obj = None
                        if obj_id is '' or obj_id is None:
                            break
                        if obj_id.isdigit():
                            obj = BotUA.objects.filter(id=obj_id).first()
                        else:
                            try:
                                obj = BotUA.objects.filter(uuid=obj_id).first()
                            except Exception as xx:
                                print(xx)
                        if obj is not None:
                            
                            validated_data["ua"] = obj
                            # instance.save()
                            break
                        
            ########### Process BooleanField POST #############
            if "active" in locals():
                if active == "true":
                    validated_data["active"] = True
                else:
                    validated_data["active"] = False
                
                # instance.save()
                
            super(RobotsArgSerializer, self).update(instance, validated_data)
            
            return instance
        except Exception as xx:
            print(str(xx))
            return RobotsArg.objects.none()
    def to_representation(self, instance):
        ret = super().to_representation(instance)
        # Here we filter the null values and creates a new dictionary
        # We use OrderedDict like in original method
        ret = OrderedDict(filter(itemgetter(1), ret.items()))
        return ret
            
class RobotsArgRemoveFileSerializer(serializers.ModelSerializer):
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
        # extra_kwargs = {
        #     'url': {'lookup_field': 'uuid'}
        # }
    def get_serializer_context(self):
        return self.context['request'].data
    def get_request_user(self):
        return self.context['request'].user
    def create(self, validated_data):
        try:
            request_data = dict(self.get_serializer_context())
            print('request_data = %s' % request_data)
            validated_data["created_by"]=self.get_request_user()
            
            instance = RobotsArg.objects.create(**validated_data)
            
            ################################################
            return instance
        except Exception as xx:
            print(str(xx))
            return RobotsArg.objects.none()
            
    def update(self, instance, validated_data):
        try:
            for attr_name in validated_data:
                print('%s = %s' % (attr_name, validated_data[attr_name]))
            request_data = dict(self.get_serializer_context())
            # validated_data["updated_by"]=self.get_request_user()
            if 'attach-field' in request_data:
                validated_data[request_data["attach-field"][0]]=None
            print('request_data = %s' % request_data)
        except Exception as xx:
            print(str(xx))
        
        RobotsArg.objects.filter(uuid=instance.uuid).update(**validated_data)
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
        fields = ('uuid',
                    'name',
                    )
        # fields = '__all__'
        lookup_field = 'uuid'
        # extra_kwargs = {
        #     'url': {'lookup_field': 'uuid'}
        # }
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
        #instance.save(**validated_data)
        super(RobotsArgListSerializer, self).update(instance, validated_data)
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
        fields = ('uuid',
                    'name',
                    )
        # fields = '__all__'
        lookup_field = 'uuid'
        # extra_kwargs = {
        #     'url': {'lookup_field': 'uuid'}
        # }
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
        #instance.save(**validated_data)
        super(RobotsArgUpdateSerializer, self).update(instance, validated_data)

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
        fields = ('uuid',
                    'name',
                    )
        # fields = '__all__'
        lookup_field = 'uuid'
        # extra_kwargs = {
        #     'url': {'lookup_field': 'uuid'}
        # }
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
        #instance.save(**validated_data)
        # 
        super(RobotsArgUpdateSerializer, self).update(instance, validated_data)

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
        #           'content',
        #           'default',
        #           'html_mode',
        #           'updated_at',
        #           'created_at')
        fields = '__all__'
        depth = 1
        lookup_field = 'uuid'
        # extra_kwargs = {
        #     'url': {'lookup_field': 'uuid'}
        # }
        # extra_fields = ['author_all']
        # def get_field_names(self, declared_fields, info):
    #     expanded_fields = super(NewspaperSerializer, self).get_field_names(declared_fields, info)

    #     if getattr(self.Meta, 'extra_fields', None):
    #         return expanded_fields + self.Meta.extra_fields
    #     else:
    #         return expanded_fields
    def get_serializer_context(self):
        return self.context['request'].data
    def get_request_user(self):
        return self.context['request'].user
    def create(self, validated_data):
        try:
            request_data = dict(self.get_serializer_context())
            print('request_data = %s' % request_data)
            validated_data["created_by"]=self.get_request_user()
            
            ########### Process BooleanField POST #############
            # if "is_favicon" in validated_data:
            #     is_favicon = validated_data.pop('is_favicon')
            # elif "is_favicon" in request_data:
            #     is_favicon = request_data.pop('is_favicon')
            
            ########### Process BooleanField POST #############
            if "is_favicon" in locals():
                if is_favicon == "true":
                    validated_data["is_favicon"] = True
                else:
                    validated_data["is_favicon"] = False
                # instance.save()
            
            instance = LogoImages.objects.create(**validated_data)
             
            
            
            ################################################
            return instance
        except Exception as xx:
            print(str(xx))
            return LogoImages.objects.none()
 
    def update(self, instance, validated_data):
        try:
            for attr_name in validated_data:
                print('%s = %s' % (attr_name, validated_data[attr_name]))
            request_data = dict(self.get_serializer_context())
            validated_data["updated_by"]=self.get_request_user()
            print('request_data = %s' % request_data)
        except Exception as xx:
            print(str(xx))
        #instance.save(**validated_data)
        try:
            
            ########### Process BooleanField POST #############
            # if "is_favicon" in validated_data:
            #     is_favicon = validated_data.pop('is_favicon')
            # elif "is_favicon" in request_data:
            #     is_favicon = request_data.pop('is_favicon')
            
            ########### Process BooleanField POST #############
            if "is_favicon" in locals():
                if is_favicon == "true":
                    validated_data["is_favicon"] = True
                else:
                    validated_data["is_favicon"] = False
                
                # instance.save()
                
            super(LogoImagesSerializer, self).update(instance, validated_data)
            
            return instance
        except Exception as xx:
            print(str(xx))
            return LogoImages.objects.none()
    def to_representation(self, instance):
        ret = super().to_representation(instance)
        # Here we filter the null values and creates a new dictionary
        # We use OrderedDict like in original method
        ret = OrderedDict(filter(itemgetter(1), ret.items()))
        return ret
            
class LogoImagesRemoveFileSerializer(serializers.ModelSerializer):
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
        # extra_kwargs = {
        #     'url': {'lookup_field': 'uuid'}
        # }
    def get_serializer_context(self):
        return self.context['request'].data
    def get_request_user(self):
        return self.context['request'].user
    def create(self, validated_data):
        try:
            request_data = dict(self.get_serializer_context())
            print('request_data = %s' % request_data)
            validated_data["created_by"]=self.get_request_user()
            
            instance = LogoImages.objects.create(**validated_data)
            
            ################################################
            return instance
        except Exception as xx:
            print(str(xx))
            return LogoImages.objects.none()
            
    def update(self, instance, validated_data):
        try:
            for attr_name in validated_data:
                print('%s = %s' % (attr_name, validated_data[attr_name]))
            request_data = dict(self.get_serializer_context())
            # validated_data["updated_by"]=self.get_request_user()
            if 'attach-field' in request_data:
                validated_data[request_data["attach-field"][0]]=None
            print('request_data = %s' % request_data)
        except Exception as xx:
            print(str(xx))
        
        LogoImages.objects.filter(uuid=instance.uuid).update(**validated_data)
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
        fields = ('uuid',
                    'name',
                    )
        # fields = '__all__'
        lookup_field = 'uuid'
        # extra_kwargs = {
        #     'url': {'lookup_field': 'uuid'}
        # }
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
        #instance.save(**validated_data)
        super(LogoImagesListSerializer, self).update(instance, validated_data)
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
        fields = ('uuid',
                    'name',
                    )
        # fields = '__all__'
        lookup_field = 'uuid'
        # extra_kwargs = {
        #     'url': {'lookup_field': 'uuid'}
        # }
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
        #instance.save(**validated_data)
        super(LogoImagesUpdateSerializer, self).update(instance, validated_data)

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
        fields = ('uuid',
                    'name',
                    )
        # fields = '__all__'
        lookup_field = 'uuid'
        # extra_kwargs = {
        #     'url': {'lookup_field': 'uuid'}
        # }
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
        #instance.save(**validated_data)
        # 
        super(LogoImagesUpdateSerializer, self).update(instance, validated_data)

        return instance
    def to_representation(self, instance):
        ret = super().to_representation(instance)
        # Here we filter the null values and creates a new dictionary
        # We use OrderedDict like in original method
        ret = OrderedDict(filter(itemgetter(1), ret.items()))
        return ret
            