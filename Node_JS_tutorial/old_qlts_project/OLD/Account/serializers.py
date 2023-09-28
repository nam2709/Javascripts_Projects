
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
        
# class MyUserManagerSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = MyUserManager
#         # fields = ('name',
#         #           'tndid',
#         #           'content',
#         #           'default',
#         #           'html_mode',
#         #           'updated_at',
#         #           'created_at')
#         fields = '__all__'
#         lookup_field = 'uuid'
#         extra_kwargs = {
#             'url': {'lookup_field': 'uuid'}
#         }
#     def get_serializer_context(self):
#         return self.context['request'].data
#
#     def create(self, validated_data):
#         try:
#             request_data = dict(self.get_serializer_context())
#             print('request_data = %s' % request_data)
#             ########### Process Many2Many POST #############
#             # demo_many = validated_data.pop('demo_many')
#             instance = MyUserManager.objects.create(**validated_data)
#             # for obj in demo_many:
#             #     instance.demo_many.add(obj)
#             ################################################
#             return instance
#         except Exception as xx:
#             print(str(xx))
#             return None
#
#     def update(self, instance, validated_data):
#         try:
#             request_data = dict(self.get_serializer_context())
#             print('request_data = %s' % request_data)
#         except Exception as xx:
#             print(str(xx))
#         instance.save(**validated_data)
#         return instance
#     def to_representation(self, instance):
#         ret = super().to_representation(instance)
#         # Here we filter the null values and creates a new dictionary
#         # We use OrderedDict like in original method
#         ret = OrderedDict(filter(itemgetter(1), ret.items()))
#         return ret
#
# class MyUserManagerListSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = MyUserManager
#         fields = ('id',
#                     'name',
#                     )
#         # fields = '__all__'
#         lookup_field = 'uuid'
#         extra_kwargs = {
#             'url': {'lookup_field': 'uuid'}
#         }
#     def get_serializer_context(self):
#         return self.context['request'].data
#
#     def create(self, validated_data):
#         try:
#             request_data = dict(self.get_serializer_context())
#             print('request_data = %s' % request_data)
#         except Exception as xx:
#             print(str(xx))
#         return MyUserManager.objects.create(**validated_data)
#
#     def update(self, instance, validated_data):
#         try:
#             request_data = dict(self.get_serializer_context())
#             print('request_data = %s' % request_data)
#         except Exception as xx:
#             print(str(xx))
#         instance.save(**validated_data)
#         return instance
#     def to_representation(self, instance):
#         ret = super().to_representation(instance)
#         # Here we filter the null values and creates a new dictionary
#         # We use OrderedDict like in original method
#         ret = OrderedDict(filter(itemgetter(1), ret.items()))
#         return ret
#
# class MyUserManagerUpdateSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = MyUserManager
#         fields = ('id',
#                     'name',
#                     )
#         # fields = '__all__'
#         lookup_field = 'uuid'
#         extra_kwargs = {
#             'url': {'lookup_field': 'uuid'}
#         }
#     def get_serializer_context(self):
#         return self.context['request'].data
#
#     def create(self, validated_data):
#         try:
#             request_data = dict(self.get_serializer_context())
#             print('request_data = %s' % request_data)
#         except Exception as xx:
#             print(str(xx))
#         return MyUserManager.objects.create(**validated_data)
#
#     def update(self, instance, validated_data):
#         try:
#             request_data = dict(self.get_serializer_context())
#             print('request_data = %s' % request_data)
#         except Exception as xx:
#             print(str(xx))
#         instance.save(**validated_data)
#         return instance
#     def to_representation(self, instance):
#         ret = super().to_representation(instance)
#         # Here we filter the null values and creates a new dictionary
#         # We use OrderedDict like in original method
#         ret = OrderedDict(filter(itemgetter(1), ret.items()))
#         return ret
#
# class MyUserManagerDeleteSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = MyUserManager
#         fields = ('id',
#                     'name',
#                     )
#         # fields = '__all__'
#         lookup_field = 'uuid'
#         extra_kwargs = {
#             'url': {'lookup_field': 'uuid'}
#         }
#     def get_serializer_context(self):
#         return self.context['request'].data
#
#     def create(self, validated_data):
#         try:
#             request_data = dict(self.get_serializer_context())
#             print('request_data = %s' % request_data)
#         except Exception as xx:
#             print(str(xx))
#         return MyUserManager.objects.create(**validated_data)
#
#     def update(self, instance, validated_data):
#         try:
#             request_data = dict(self.get_serializer_context())
#             print('request_data = %s' % request_data)
#         except Exception as xx:
#             print(str(xx))
#         instance.save(**validated_data)
#         return instance
#     def to_representation(self, instance):
#         ret = super().to_representation(instance)
#         # Here we filter the null values and creates a new dictionary
#         # We use OrderedDict like in original method
#         ret = OrderedDict(filter(itemgetter(1), ret.items()))
#         return ret

# class AllViewEnableSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = AllViewEnable
#         # fields = ('name',
#         #           'tndid',
#         #           'content',
#         #           'default',
#         #           'html_mode',
#         #           'updated_at',
#         #           'created_at')
#         fields = '__all__'
#         lookup_field = 'uuid'
#         extra_kwargs = {
#             'url': {'lookup_field': 'uuid'}
#         }
#     def get_serializer_context(self):
#         return self.context['request'].data
#
#     def create(self, validated_data):
#         try:
#             request_data = dict(self.get_serializer_context())
#             print('request_data = %s' % request_data)
#             ########### Process Many2Many POST #############
#             # demo_many = validated_data.pop('demo_many')
#             instance = AllViewEnable.objects.create(**validated_data)
#             # for obj in demo_many:
#             #     instance.demo_many.add(obj)
#             ################################################
#             return instance
#         except Exception as xx:
#             print(str(xx))
#             return None
#
#     def update(self, instance, validated_data):
#         try:
#             request_data = dict(self.get_serializer_context())
#             print('request_data = %s' % request_data)
#         except Exception as xx:
#             print(str(xx))
#         instance.save(**validated_data)
#         return instance
#     def to_representation(self, instance):
#         ret = super().to_representation(instance)
#         # Here we filter the null values and creates a new dictionary
#         # We use OrderedDict like in original method
#         ret = OrderedDict(filter(itemgetter(1), ret.items()))
#         return ret
#
# class AllViewEnableListSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = AllViewEnable
#         fields = ('id',
#                     'name',
#                     )
#         # fields = '__all__'
#         lookup_field = 'uuid'
#         extra_kwargs = {
#             'url': {'lookup_field': 'uuid'}
#         }
#     def get_serializer_context(self):
#         return self.context['request'].data
#
#     def create(self, validated_data):
#         try:
#             request_data = dict(self.get_serializer_context())
#             print('request_data = %s' % request_data)
#         except Exception as xx:
#             print(str(xx))
#         return AllViewEnable.objects.create(**validated_data)
#
#     def update(self, instance, validated_data):
#         try:
#             request_data = dict(self.get_serializer_context())
#             print('request_data = %s' % request_data)
#         except Exception as xx:
#             print(str(xx))
#         instance.save(**validated_data)
#         return instance
#     def to_representation(self, instance):
#         ret = super().to_representation(instance)
#         # Here we filter the null values and creates a new dictionary
#         # We use OrderedDict like in original method
#         ret = OrderedDict(filter(itemgetter(1), ret.items()))
#         return ret
#
# class AllViewEnableUpdateSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = AllViewEnable
#         fields = ('id',
#                     'name',
#                     )
#         # fields = '__all__'
#         lookup_field = 'uuid'
#         extra_kwargs = {
#             'url': {'lookup_field': 'uuid'}
#         }
#     def get_serializer_context(self):
#         return self.context['request'].data
#
#     def create(self, validated_data):
#         try:
#             request_data = dict(self.get_serializer_context())
#             print('request_data = %s' % request_data)
#         except Exception as xx:
#             print(str(xx))
#         return AllViewEnable.objects.create(**validated_data)
#
#     def update(self, instance, validated_data):
#         try:
#             request_data = dict(self.get_serializer_context())
#             print('request_data = %s' % request_data)
#         except Exception as xx:
#             print(str(xx))
#         instance.save(**validated_data)
#         return instance
#     def to_representation(self, instance):
#         ret = super().to_representation(instance)
#         # Here we filter the null values and creates a new dictionary
#         # We use OrderedDict like in original method
#         ret = OrderedDict(filter(itemgetter(1), ret.items()))
#         return ret
#
# class AllViewEnableDeleteSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = AllViewEnable
#         fields = ('id',
#                     'name',
#                     )
#         # fields = '__all__'
#         lookup_field = 'uuid'
#         extra_kwargs = {
#             'url': {'lookup_field': 'uuid'}
#         }
#     def get_serializer_context(self):
#         return self.context['request'].data
#
#     def create(self, validated_data):
#         try:
#             request_data = dict(self.get_serializer_context())
#             print('request_data = %s' % request_data)
#         except Exception as xx:
#             print(str(xx))
#         return AllViewEnable.objects.create(**validated_data)
#
#     def update(self, instance, validated_data):
#         try:
#             request_data = dict(self.get_serializer_context())
#             print('request_data = %s' % request_data)
#         except Exception as xx:
#             print(str(xx))
#         instance.save(**validated_data)
#         return instance
#     def to_representation(self, instance):
#         ret = super().to_representation(instance)
#         # Here we filter the null values and creates a new dictionary
#         # We use OrderedDict like in original method
#         ret = OrderedDict(filter(itemgetter(1), ret.items()))
#         return ret
#!/usr/bin/env python
# -*- coding: utf-8 -*-
# region Description
__author__ = 'Tamnd - NGUYEN DUC TAM'
__copyright__ = "Copyright ©2021 Tamnd <ductambka@gmail.com>"
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

from django.contrib.auth import authenticate, get_user_model
from django.utils.translation import gettext_lazy as _
from rest_framework import serializers

from rest_framework_jwt.settings import api_settings
from rest_framework_jwt.compat import get_username_field, PasswordField

from rest_framework import serializers
from .models import *

User = get_user_model()
# jwt_payload_handler = api_settings.JWT_PAYLOAD_HANDLER
# jwt_encode_handler = api_settings.JWT_ENCODE_HANDLER
# jwt_decode_handler = api_settings.JWT_DECODE_HANDLER
# jwt_get_username_from_payload = api_settings.JWT_PAYLOAD_GET_USERNAME_HANDLER

class Serializer(serializers.Serializer):
    @property
    def object(self):
        return self.validated_data

class LoginJsonWebTokenSerializer(Serializer):
    """
    Serializer class used to validate a username and password.

    'username' is identified by the custom UserModel.USERNAME_FIELD.

    Returns a JSON Web Token that can be used to authenticate later calls.
    """
    def __init__(self, *args, **kwargs):
        """
        Dynamically add the USERNAME_FIELD to self.fields.
        """
        super(LoginJsonWebTokenSerializer, self).__init__(*args, **kwargs)

        self.fields[self.username_field] = serializers.CharField()
        self.fields['password'] = PasswordField(write_only=True)

    @property
    def username_field(self):
        return get_username_field()

    def validate(self, attrs):
        credentials = {
            self.username_field: attrs.get(self.username_field),
            'password': attrs.get('password')
        }

        if all(credentials.values()):
            user = authenticate(**credentials)

            if user:
                if not user.is_active:
                    msg = _('User account is disabled.')
                    raise serializers.ValidationError(msg)

                payload = jwt_payload_handler(user)

                return {
                    'token': jwt_encode_handler(payload),
                    'user': user
                }
            else:
                msg = _('Unable to log in with provided credentials.')
                raise serializers.ValidationError(msg)
        else:
            msg = _('Must include "{username_field}" and "password".')
            msg = msg.format(username_field=self.username_field)
            raise serializers.ValidationError(msg)

class AuthorizationTokenSerializer(serializers.Serializer):
    account = serializers.HyperlinkedRelatedField(
        queryset=Account.objects.all(),
        required=True,
        view_name='api:account-detail',
    )

    class Meta:
        fields = ['account']

# End of TFile
