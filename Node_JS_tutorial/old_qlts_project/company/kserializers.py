from rest_framework import serializers
from .models import Commune 
from .models import City 
from .models import CompanyStatus 
from .models import Company
from .models import Unit 
from .models import Position 
from .models import StaffStatus 
from .models import Staff 
from .models import StaffInformation 
from .models import District 



from operator import itemgetter
from collections import OrderedDict

#xa
class CommuneSerializer(serializers.ModelSerializer):
    class Meta:
        model = Commune
        fields = ['uuid',
                    'name', 
                    # 'created_by',
                    # 'updated_by',

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
#huyện
class DistrictSerializer(serializers.ModelSerializer):
    class Meta:
        model = District
        fields = ['uuid',
                    'name',
                    'commune' 
                    # 'created_by',
                    # 'updated_by',

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
#thanh pho 
class CitySerializer(serializers.ModelSerializer):
    class Meta:
        model = City
        fields = ['uuid',
                    'name',
                    'district',
                    'commune', 
                    # 'created_by',
                    # 'updated_by',

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
#tinh trang cty
class CompanyStatusSerializer(serializers.ModelSerializer):
    class Meta:
        model = CompanyStatus
        fields = ['uuid',
                    'name',
                    'desc',
                    'code' ,
                    # 'created_by',
                    # 'updated_by',

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
    
#congty
class CompanySerializer(serializers.ModelSerializer):
    get_name_city = serializers.CharField(source='province.name', read_only=True)
    get_name_commune = serializers.CharField(source='ward.name', read_only=True)
    get_name_district = serializers.CharField(source='districts.name', read_only=True)
    get_name_companystatus = serializers.CharField(source='companystatus.name', read_only=True)
    class Meta:
        model = Company
        fields = ['name',
        'uuid',
        'companystatus',
        'code_company',
        'province',
        'districts',
        'ward',
        'address',
        'tax_code',
        'phone_number',
        'get_name_city',
        'get_name_commune',
        'get_name_district',
        'get_name_companystatus',
                    # 'created_by',
                    # 'updated_by',

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
    
#Đơn vị Phòng Ban
class UnitSerializer(serializers.ModelSerializer):
    get_name_company = serializers.CharField(source='company.name', read_only=True)
    class Meta:
        model = Unit
        fields = ['uuid',
                    'name',
                    'code',
                    'company',
                    'get_name_company',
                    # 'updated_by',

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
    

#Chức Vụ
class PositionSerializer(serializers.ModelSerializer):
    get_name_unit = serializers.CharField(source='unit.name', read_only=True)
    class Meta:
        model = Position
        fields = ['uuid',
                    'name',
                    'code',
                    'unit',
                    'get_name_unit',
                    # 'created_by',
                    # 'updated_by',

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
    
#trạng Thái Nhân Viên
class StaffStatusSerializer(serializers.ModelSerializer):

    class Meta:
        model = StaffStatus
        fields = ['uuid',
                    'name',
                    'desc',
                    'code',
                    # 'created_by',
                    # 'updated_by',

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
    

#Nhân Viên
class StaffSerializer(serializers.ModelSerializer):
    get_name_staffstatus = serializers.CharField(source='staffstatus.name', read_only=True)
    get_name_company = serializers.CharField(source='company.name', read_only=True)
    get_name_unit = serializers.CharField(source='unit.name', read_only=True)
    get_name_position = serializers.CharField(source='position.name', read_only=True)
    class Meta:
        model = Staff
        fields = ['uuid',
        'name',
        'staffstatus',
        'code',
        'company',
        'unit',
        'position',
        'get_name_staffstatus',
        'get_name_company',
        'get_name_unit',
        'get_name_position',


                    # 'created_by',
                    # 'updated_by',

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



class StaffInformationSerializer(serializers.ModelSerializer):
   
    get_name_city = serializers.CharField(source='province.name', read_only=True)
    get_name_commune = serializers.CharField(source='ward.name', read_only=True)
    get_name_district = serializers.CharField(source='districts.name', read_only=True)
    get_name_staff = serializers.CharField(source='staff.name', read_only=True)
    get_name_company = serializers.CharField(source='company.name', read_only=True)
    get_name_unit = serializers.CharField(source='unit.name', read_only=True)
    get_name_position = serializers.CharField(source='position.name', read_only=True)
  
    class Meta:

        model = StaffInformation
        fields = [ 'uuid',
        'staff',
        'full_name',
        'email',
        'id_card',
        'phone_number',
        'province',
        'districts',
        'ward',
        'position',
        'address',
        'get_name_company',
        'get_name_unit',
        'get_name_position',
        'degree',
        'avatar',
        'get_name_city',
        'get_name_district',
        'get_name_staff',
        'get_name_commune',
                    # 'created_by',
                    # 'updated_by',

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
    





class CompanyUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Company
      
                    
        fields = '__all__'
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
        return Company.objects.create(**validated_data)

    def update(self, instance, validated_data):
        try:
            request_data = dict(self.get_serializer_context())
            print('request_data = %s' % request_data)
        except Exception as xx:
            print(str(xx))
        #instance.save(**validated_data)
        super(CompanyUpdateSerializer, self).update(instance, validated_data)

        return instance
    def to_representation(self, instance):
        ret = super().to_representation(instance)
        # Here we filter the null values and creates a new dictionary
        # We use OrderedDict like in original method
        ret = OrderedDict(filter(itemgetter(1), ret.items()))
        return ret
class CompanyDeleteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Company
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
        return Company.objects.create(**validated_data)

    def update(self, instance, validated_data):
        try:
            request_data = dict(self.get_serializer_context())
            print('request_data = %s' % request_data)
        except Exception as xx:
            print(str(xx))
        #instance.save(**validated_data)
        # 
        super(CompanyUpdateSerializer, self).update(instance, validated_data)

        return instance
    def to_representation(self, instance):
        ret = super().to_representation(instance)
        # Here we filter the null values and creates a new dictionary
        # We use OrderedDict like in original method
        ret = OrderedDict(filter(itemgetter(1), ret.items()))
        return ret
########
class SStaffSerializer(serializers.ModelSerializer):

    class Meta:
        model = Staff
        fields = ['uuid',
        'code',



                    # 'created_by',
                    # 'updated_by',

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