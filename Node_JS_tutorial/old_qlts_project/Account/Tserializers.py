
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


class AccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = Account
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
            # validated_data["created_by"]=self.get_request_user()
            
            ########### Process BooleanField POST #############
            # if "is_callbot" in validated_data:
            #     is_callbot = validated_data.pop('is_callbot')
            # elif "is_callbot" in request_data:
            #     is_callbot = request_data.pop('is_callbot')
            
            ########### Process BooleanField POST #############
            # if "is_chatbot" in validated_data:
            #     is_chatbot = validated_data.pop('is_chatbot')
            # elif "is_chatbot" in request_data:
            #     is_chatbot = request_data.pop('is_chatbot')
            
            ########### Process ForeignKey POST #############
            if "manager" in validated_data:
                manager = validated_data.pop('manager')
            elif "manager" in request_data:
                manager = request_data.pop('manager')
            ########### Process BooleanField POST #############
            # if "log_confirm_by_email" in validated_data:
            #     log_confirm_by_email = validated_data.pop('log_confirm_by_email')
            # elif "log_confirm_by_email" in request_data:
            #     log_confirm_by_email = request_data.pop('log_confirm_by_email')
            
            ########### Process BooleanField POST #############
            # if "logged_with_password" in validated_data:
            #     logged_with_password = validated_data.pop('logged_with_password')
            # elif "logged_with_password" in request_data:
            #     logged_with_password = request_data.pop('logged_with_password')
            
            ########### Process BooleanField POST #############
            # if "created_free_license" in validated_data:
            #     created_free_license = validated_data.pop('created_free_license')
            # elif "created_free_license" in request_data:
            #     created_free_license = request_data.pop('created_free_license')
            
            ########### Process BooleanField POST #############
            # if "email_activated" in validated_data:
            #     email_activated = validated_data.pop('email_activated')
            # elif "email_activated" in request_data:
            #     email_activated = request_data.pop('email_activated')
            
            ########### Process ForeignKey POST #############
            if "website_template" in validated_data:
                website_template = validated_data.pop('website_template')
            elif "website_template" in request_data:
                website_template = request_data.pop('website_template')
            ########### Process BooleanField POST #############
            if "is_callbot" in locals():
                if is_callbot == "true":
                    validated_data["is_callbot"] = True
                else:
                    validated_data["is_callbot"] = False
                # instance.save()
            
            ########### Process BooleanField POST #############
            if "is_chatbot" in locals():
                if is_chatbot == "true":
                    validated_data["is_chatbot"] = True
                else:
                    validated_data["is_chatbot"] = False
                # instance.save()
            
            if "manager" in validated_data:
                for obj in validated_data["manager"]:
                    if obj is not None and isinstance(obj,Account):
                        validated_data["manager"] = obj
                        
            else:
                if "manager" in locals():
                    for obj_id in manager:
                        obj = None
                        if obj_id is '' or obj_id is None:
                            break
                        if obj_id.isdigit():
                            obj = Account.objects.filter(id=obj_id).first()
                        else:
                            try:
                                obj = Account.objects.filter(uuid=obj_id).first()
                            except Exception as xx:
                                print(xx)
                        if obj is not None:
                            validated_data["manager"] = obj
                            # instance.save()
                            break
                        
            ########### Process BooleanField POST #############
            if "log_confirm_by_email" in locals():
                if log_confirm_by_email == "true":
                    validated_data["log_confirm_by_email"] = True
                else:
                    validated_data["log_confirm_by_email"] = False
                # instance.save()
            
            ########### Process BooleanField POST #############
            if "logged_with_password" in locals():
                if logged_with_password == "true":
                    validated_data["logged_with_password"] = True
                else:
                    validated_data["logged_with_password"] = False
                # instance.save()
            
            ########### Process BooleanField POST #############
            if "created_free_license" in locals():
                if created_free_license == "true":
                    validated_data["created_free_license"] = True
                else:
                    validated_data["created_free_license"] = False
                # instance.save()
            
            ########### Process BooleanField POST #############
            if "email_activated" in locals():
                if email_activated == "true":
                    validated_data["email_activated"] = True
                else:
                    validated_data["email_activated"] = False
                # instance.save()
            
            if "website_template" in validated_data:
                for obj in validated_data["website_template"]:
                    if obj is not None and isinstance(obj,WebsiteTemplate):
                        validated_data["website_template"] = obj
                        
            else:
                if "website_template" in locals():
                    for obj_id in website_template:
                        obj = None
                        if obj_id is '' or obj_id is None:
                            break
                        if obj_id.isdigit():
                            obj = WebsiteTemplate.objects.filter(id=obj_id).first()
                        else:
                            try:
                                obj = WebsiteTemplate.objects.filter(uuid=obj_id).first()
                            except Exception as xx:
                                print(xx)
                        if obj is not None:
                            validated_data["website_template"] = obj
                            # instance.save()
                            break
                        
            instance = Account.objects.create(**validated_data)
            
            ########### Process Many2Many POST #############
            if "groups" in validated_data:
                groups = validated_data.pop('groups')
            elif "groups" in request_data:
                groups = request_data.pop('groups')
            ########### Process Many2Many POST #############
            if "user_permissions" in validated_data:
                user_permissions = validated_data.pop('user_permissions')
            elif "user_permissions" in request_data:
                user_permissions = request_data.pop('user_permissions')
            ########### Process Many2Many POST #############
            if "app_permissions" in validated_data:
                app_permissions = validated_data.pop('app_permissions')
            elif "app_permissions" in request_data:
                app_permissions = request_data.pop('app_permissions')
            ########### Process Many2Many POST #############
            if "extend_field" in validated_data:
                extend_field = validated_data.pop('extend_field')
            elif "extend_field" in request_data:
                extend_field = request_data.pop('extend_field')
            if "groups" in locals():
                instance.groups.clear()
                for obj in groups:
                    instance.groups.add(obj)
                        
            if "user_permissions" in locals():
                instance.user_permissions.clear()
                for obj in user_permissions:
                    instance.user_permissions.add(obj)
                        
            if "app_permissions" in locals():
                instance.app_permissions.clear()
                for obj in app_permissions:
                    instance.app_permissions.add(obj)
                        
            if "extend_field" in locals():
                instance.extend_field.clear()
                for obj in extend_field:
                    instance.extend_field.add(obj)
                         
            
            
            ################################################
            return instance
        except Exception as xx:
            print(str(xx))
            return Account.objects.none()
 
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
            # if "is_callbot" in validated_data:
            #     is_callbot = validated_data.pop('is_callbot')
            # elif "is_callbot" in request_data:
            #     is_callbot = request_data.pop('is_callbot')
            
            ########### Process BooleanField POST #############
            # if "is_chatbot" in validated_data:
            #     is_chatbot = validated_data.pop('is_chatbot')
            # elif "is_chatbot" in request_data:
            #     is_chatbot = request_data.pop('is_chatbot')
            
            ########### Process ForeignKey POST #############
            if "manager" in validated_data:
                manager = validated_data.pop('manager')
            elif "manager" in request_data:
                manager = request_data.pop('manager')
            ########### Process BooleanField POST #############
            # if "log_confirm_by_email" in validated_data:
            #     log_confirm_by_email = validated_data.pop('log_confirm_by_email')
            # elif "log_confirm_by_email" in request_data:
            #     log_confirm_by_email = request_data.pop('log_confirm_by_email')
            
            ########### Process BooleanField POST #############
            # if "logged_with_password" in validated_data:
            #     logged_with_password = validated_data.pop('logged_with_password')
            # elif "logged_with_password" in request_data:
            #     logged_with_password = request_data.pop('logged_with_password')
            
            ########### Process BooleanField POST #############
            # if "created_free_license" in validated_data:
            #     created_free_license = validated_data.pop('created_free_license')
            # elif "created_free_license" in request_data:
            #     created_free_license = request_data.pop('created_free_license')
            
            ########### Process BooleanField POST #############
            # if "email_activated" in validated_data:
            #     email_activated = validated_data.pop('email_activated')
            # elif "email_activated" in request_data:
            #     email_activated = request_data.pop('email_activated')
            
            ########### Process ForeignKey POST #############
            if "website_template" in validated_data:
                website_template = validated_data.pop('website_template')
            elif "website_template" in request_data:
                website_template = request_data.pop('website_template')
            ########### Process BooleanField POST #############
            if "is_callbot" in locals():
                if is_callbot == "true":
                    validated_data["is_callbot"] = True
                else:
                    validated_data["is_callbot"] = False
                
                # instance.save()
                
            ########### Process BooleanField POST #############
            if "is_chatbot" in locals():
                if is_chatbot == "true":
                    validated_data["is_chatbot"] = True
                else:
                    validated_data["is_chatbot"] = False
                
                # instance.save()
                
            if "manager" in validated_data:
                for obj in validated_data["manager"]:
                    if obj is not None and isinstance(obj,Account):
                        validated_data["manager"] = obj
            else:
                if "manager" in locals():
                    for obj_id in manager:
                        obj = None
                        if obj_id is '' or obj_id is None:
                            break
                        if obj_id.isdigit():
                            obj = Account.objects.filter(id=obj_id).first()
                        else:
                            try:
                                obj = Account.objects.filter(uuid=obj_id).first()
                            except Exception as xx:
                                print(xx)
                        if obj is not None:
                            
                            validated_data["manager"] = obj
                            # instance.save()
                            break
                        
            ########### Process BooleanField POST #############
            if "log_confirm_by_email" in locals():
                if log_confirm_by_email == "true":
                    validated_data["log_confirm_by_email"] = True
                else:
                    validated_data["log_confirm_by_email"] = False
                
                # instance.save()
                
            ########### Process BooleanField POST #############
            if "logged_with_password" in locals():
                if logged_with_password == "true":
                    validated_data["logged_with_password"] = True
                else:
                    validated_data["logged_with_password"] = False
                
                # instance.save()
                
            ########### Process BooleanField POST #############
            if "created_free_license" in locals():
                if created_free_license == "true":
                    validated_data["created_free_license"] = True
                else:
                    validated_data["created_free_license"] = False
                
                # instance.save()
                
            ########### Process BooleanField POST #############
            if "email_activated" in locals():
                if email_activated == "true":
                    validated_data["email_activated"] = True
                else:
                    validated_data["email_activated"] = False
                
                # instance.save()
                
            if "website_template" in validated_data:
                for obj in validated_data["website_template"]:
                    if obj is not None and isinstance(obj,WebsiteTemplate):
                        validated_data["website_template"] = obj
            else:
                if "website_template" in locals():
                    for obj_id in website_template:
                        obj = None
                        if obj_id is '' or obj_id is None:
                            break
                        if obj_id.isdigit():
                            obj = WebsiteTemplate.objects.filter(id=obj_id).first()
                        else:
                            try:
                                obj = WebsiteTemplate.objects.filter(uuid=obj_id).first()
                            except Exception as xx:
                                print(xx)
                        if obj is not None:
                            
                            validated_data["website_template"] = obj
                            # instance.save()
                            break
                        
            super(AccountSerializer, self).update(instance, validated_data)
            
            ########### Process Many2Many POST #############
            if "groups" in validated_data:
                groups = validated_data.pop('groups')
            elif "groups" in request_data:
                groups = request_data.pop('groups')
            ########### Process Many2Many POST #############
            if "user_permissions" in validated_data:
                user_permissions = validated_data.pop('user_permissions')
            elif "user_permissions" in request_data:
                user_permissions = request_data.pop('user_permissions')
            ########### Process Many2Many POST #############
            if "app_permissions" in validated_data:
                app_permissions = validated_data.pop('app_permissions')
            elif "app_permissions" in request_data:
                app_permissions = request_data.pop('app_permissions')
            ########### Process Many2Many POST #############
            if "extend_field" in validated_data:
                extend_field = validated_data.pop('extend_field')
            elif "extend_field" in request_data:
                extend_field = request_data.pop('extend_field')
            if "groups" in locals():
                instance.groups.clear()
                for obj in groups:
                    instance.groups.add(obj)
                    # instance.save()
                    
            if "user_permissions" in locals():
                instance.user_permissions.clear()
                for obj in user_permissions:
                    instance.user_permissions.add(obj)
                    # instance.save()
                    
            if "app_permissions" in locals():
                instance.app_permissions.clear()
                for obj in app_permissions:
                    instance.app_permissions.add(obj)
                    # instance.save()
                    
            if "extend_field" in locals():
                instance.extend_field.clear()
                for obj in extend_field:
                    instance.extend_field.add(obj)
                    # instance.save()
                    
            return instance
        except Exception as xx:
            print(str(xx))
            return Account.objects.none()
    def to_representation(self, instance):
        ret = super().to_representation(instance)
        # Here we filter the null values and creates a new dictionary
        # We use OrderedDict like in original method
        ret = OrderedDict(filter(itemgetter(1), ret.items()))
        return ret
            
class AccountRemoveFileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Account
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
            
            ########### Process Many2Many POST #############
            groups = validated_data.pop('groups')

                    
            ########### Process Many2Many POST #############
            user_permissions = validated_data.pop('user_permissions')

                    
            ########### Process Many2Many POST #############
            app_permissions = validated_data.pop('app_permissions')

                    
            ########### Process Many2Many POST #############
            extend_field = validated_data.pop('extend_field')

                    
            instance = Account.objects.create(**validated_data)
            
            if "groups" in locals():
                instance.groups.clear()
                for obj in groups:
                    instance.groups.add(obj)
                    
            if "user_permissions" in locals():
                instance.user_permissions.clear()
                for obj in user_permissions:
                    instance.user_permissions.add(obj)
                    
            if "app_permissions" in locals():
                instance.app_permissions.clear()
                for obj in app_permissions:
                    instance.app_permissions.add(obj)
                    
            if "extend_field" in locals():
                instance.extend_field.clear()
                for obj in extend_field:
                    instance.extend_field.add(obj)
                    
            ################################################
            return instance
        except Exception as xx:
            print(str(xx))
            return Account.objects.none()
            
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
        
        Account.objects.filter(uuid=instance.uuid).update(**validated_data)
        return instance
    def to_representation(self, instance):
        ret = super().to_representation(instance)
        # Here we filter the null values and creates a new dictionary
        # We use OrderedDict like in original method
        ret = OrderedDict(filter(itemgetter(1), ret.items()))
        return ret
            
class AccountListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Account
        fields = ('uuid',
                  'id',
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
        return Account.objects.create(**validated_data)

    def update(self, instance, validated_data):
        try:
            request_data = dict(self.get_serializer_context())
            print('request_data = %s' % request_data)
        except Exception as xx:
            print(str(xx))
        #instance.save(**validated_data)
        super(AccountListSerializer, self).update(instance, validated_data)
        return instance
    def to_representation(self, instance):
        ret = super().to_representation(instance)
        # Here we filter the null values and creates a new dictionary
        # We use OrderedDict like in original method
        ret = OrderedDict(filter(itemgetter(1), ret.items()))
        return ret
            
class AccountUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Account
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
        return Account.objects.create(**validated_data)

    def update(self, instance, validated_data):
        try:
            request_data = dict(self.get_serializer_context())
            print('request_data = %s' % request_data)
        except Exception as xx:
            print(str(xx))
        #instance.save(**validated_data)
        super(AccountUpdateSerializer, self).update(instance, validated_data)

        return instance
    def to_representation(self, instance):
        ret = super().to_representation(instance)
        # Here we filter the null values and creates a new dictionary
        # We use OrderedDict like in original method
        ret = OrderedDict(filter(itemgetter(1), ret.items()))
        return ret
            
class AccountDeleteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Account
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
        return Account.objects.create(**validated_data)

    def update(self, instance, validated_data):
        try:
            request_data = dict(self.get_serializer_context())
            print('request_data = %s' % request_data)
        except Exception as xx:
            print(str(xx))
        #instance.save(**validated_data)
        # 
        super(AccountUpdateSerializer, self).update(instance, validated_data)

        return instance
    def to_representation(self, instance):
        ret = super().to_representation(instance)
        # Here we filter the null values and creates a new dictionary
        # We use OrderedDict like in original method
        ret = OrderedDict(filter(itemgetter(1), ret.items()))
        return ret
            