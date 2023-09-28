from .models import AppPermission
from .models import ModelsPermission
from .models import Permission 
from .models import PermissionGroup
from .models import UserGroup
from rest_framework import serializers
from operator import itemgetter
from collections import OrderedDict


#App
class AppPermissionSerializer(serializers.ModelSerializer):
    class Meta:
        model = AppPermission
        fields = ['name',
        'uuid',
        
        
        'created_at',
        'updated_at',

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
    
#Models
class ModelsPermissionSerializer(serializers.ModelSerializer):
    class Meta:
        model = ModelsPermission
        fields = ['name',
        'uuid',
        'app_id',
        'desc',
        'created_at',
        'updated_at',

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
    
#Quyền
class PermissionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Permission
        fields = ['name',
        'uuid',
        'model_id',
        'is_add',
        'is_view_only',
        'is_view_all',
        'is_view_public',
        'is_delete_only',
        'is_delete_all',
        'is_delete_public',
        'is_edit_only',
        'is_edit_all',
        'is_edit_public',
        'created_at',
        'updated_at',
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
    
#Nhóm quyền
class PermissionGroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = PermissionGroup
        fields = ['name',
        'uuid',
        'account',
        'permissions',
        'account_text',
        'permissions_text',
        'desc',
        'created_at',
        'updated_at',
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
    

#Nhóm Người
class UserGroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserGroup
        fields = ['name',
        'uuid',
        'account',
        'permissions_group',
        'account_text',
        'permissions_group_text',
        'desc',
        'created_at',
        'updated_at',

         ]
        # depth = 0
    def get_request_user(self):
        request_user = None
        if 'request' in self.context and hasattr(self.context['request'],'user'):
            request_user = self.context['request'].user   
        return request_user
    def create(self, validated_data):
        print('validated_data = ', validated_data)
        validated_data["created_by"] = self.context['request'].user
        return super().create(validated_data)
    def update(self, instance, validated_data):
        return super().update(instance, validated_data)
    

class UserGroupListSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserGroup
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
        return UserGroup.objects.create(**validated_data)

    def update(self, instance, validated_data):
        try:
            request_data = dict(self.get_serializer_context())
            print('request_data = %s' % request_data)
        except Exception as xx:
            print(str(xx))
        #instance.save(**validated_data)
        super(UserGroupListSerializer, self).update(instance, validated_data)
        return instance
    def to_representation(self, instance):
        ret = super().to_representation(instance)
        # Here we filter the null values and creates a new dictionary
        # We use OrderedDict like in original method
        ret = OrderedDict(filter(itemgetter(1), ret.items()))
        return ret
    


# class  PermissionGroupRemoveFileSerializer(serializers.ModelSerializer):
#     class Meta:
#         model =  PermissionGroup
      
#         fields = '__all__'


#         lookup_field = 'uuid'
  
#     def get_serializer_context(self):
#         return self.context['request'].data
#     def get_request_user(self):
#         return self.context['request'].user
#     def create(self, validated_data):
#         try:
#             request_data = dict(self.get_serializer_context())
#             print('request_data = %s' % request_data)
#             validated_data["created_by"]=self.get_request_user()
            
         
                    
#             ########### Process Many2Many POST #############
#             account = validated_data.pop('account')

                    
#             ########### Process Many2Many POST #############
#             permissions = validated_data.pop('permissions')


                    
#             instance =  PermissionGroup.objects.create(**validated_data)
            
        
                    
#             if "permissions" in locals():
#                 instance.permissions.clear()
#                 for obj in permissions:
#                     instance.permissions.add(obj)
                    
#             if "account" in locals():
#                 instance.account.clear()
#                 for obj in account:
#                     instance.account.add(obj)
                
                    
#             ################################################
#             return instance
#         except Exception as xx:
#             print(str(xx))
#             return  PermissionGroup.objects.none()
            
#     def update(self, instance, validated_data):
#         try:
#             for attr_name in validated_data:
#                 print('%s = %s' % (attr_name, validated_data[attr_name]))
#             request_data = dict(self.get_serializer_context())
#             # validated_data["updated_by"]=self.get_request_user()
#             if 'attach-field' in request_data:
#                 validated_data[request_data["attach-field"][0]]=None
#             print('request_data = %s' % request_data)
#         except Exception as xx:
#             print(str(xx))
        
#         PermissionGroup.objects.filter(uuid=instance.uuid).update(**validated_data)
#         return instance
#     def to_representation(self, instance):
#         ret = super().to_representation(instance)
#         # Here we filter the null values and creates a new dictionary
#         # We use OrderedDict like in original method
#         ret = OrderedDict(filter(itemgetter(1), ret.items()))
#         return ret
    

# class PermissionGroupListSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = PermissionGroup
#         fields = '__all__'
#         # fields = '__all__'
#         lookup_field = 'uuid'
#         # extra_kwargs = {
#         #     'url': {'lookup_field': 'uuid'}
#         # }
#     def get_serializer_context(self):
#         return self.context['request'].data

#     def create(self, validated_data):
#         try:
#             request_data = dict(self.get_serializer_context())
#             print('request_data = %s' % request_data)
#         except Exception as xx:
#             print(str(xx))
#         return PermissionGroup.objects.create(**validated_data)

#     def update(self, instance, validated_data):
#         try:
#             request_data = dict(self.get_serializer_context())
#             print('request_data = %s' % request_data)
#         except Exception as xx:
#             print(str(xx))
#         #instance.save(**validated_data)
#         super(PermissionGroupListSerializer, self).update(instance, validated_data)
#         return instance
#     def to_representation(self, instance):
#         ret = super().to_representation(instance)
#         # Here we filter the null values and creates a new dictionary
#         # We use OrderedDict like in original method
#         ret = OrderedDict(filter(itemgetter(1), ret.items()))
#         return ret
            
