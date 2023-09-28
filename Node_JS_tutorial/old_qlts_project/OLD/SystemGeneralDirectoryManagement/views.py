from django.shortcuts import render
import json
from django.http import HttpResponse
from .models import *
from django.contrib.auth.decorators import login_required
import requests

# Create your views here.
@login_required(login_url="/Account/signin/")
def UpdatePDW(request, *args, **kwargs):
    context = {}
    # context['company_template'] = 'arrgon'
    # template = loader.get_template('company/company.html')
    # context['Company_count'] = Company.objects.all().count()     
    
    # context = AdminWebContext(request, page_info='Logger:SyslogListener', *args, **kwargs)
    response = {}
    response['result'] = "failed"

    if request.method == 'POST':
        data = request.POST
        print(str(data))
    else:
        print('Method Not accepted!')

    # Tỉnh/Thành phố
    url_provinces = "https://provinces.open-api.vn/api/"
    response_provinces = requests.get(url_provinces)
    # data_provinces = response_provinces.json()
    # for province in data_provinces:
    #     obj_province = Province()
    #     obj_province.name = province['name']
    #     obj_province.code = province['code']
    #     obj_province.division_type = province['division_type']
    #     obj_province.codename = province['codename']
    #     obj_province.phone_code = province['phone_code']
    #     obj_province.save()

    # Cập nhật lại dữ liệu của tỉnh/thành phố
    # data_provinces = response_provinces.json()
    # list_province = Province.objects.all()     
    # for province in data_provinces:
    #     for data_province_dtb in list_province:
    #         if str(province['code']) == data_province_dtb.code:
    #             data_province_dtb.name = province['name']


    # Quận/Huyện
    url_districts = "https://provinces.open-api.vn/api/d/"
    response_districts = requests.get(url_districts)
    # data_districts = response_districts.json()
    # for district in data_districts:
    #     list_province = Province.objects.all()     
    #     for province in list_province:
    #         if str(district['province_code']) == province.code:
    #             obj_district = Districts()
    #             obj_district.name = district['name']
    #             obj_district.code = district['code']
    #             obj_district.division_type = district['division_type']
    #             obj_district.codename = district['codename']
    #             obj_district.province_code = district['province_code']
    #             obj_district.province = province
    #             obj_district.save()

                
    # Xã/thị trấn
    url_ward = "    "
    response_ward = requests.get(url_ward)
    data_ward = response_ward.json()

    for ward in data_ward:
        list_districts =Districts.objects.all()     
        for district in list_districts:
            if str(ward['district_code']) == district.code:
                list_province = Province.objects.all()
                for province in list_province:
                    if str(district.province_code) == province.code:
                        obj_ward = Ward()
                        obj_ward.name = ward['name']
                        obj_ward.code = ward['code']
                        obj_ward.division_type = ward['division_type']
                        obj_ward.codename = ward['codename']
                        obj_ward.ditrict_code = ward['district_code']
                        obj_ward.districts = district
                        obj_ward.save()

    result = HttpResponse(json.dumps(response_provinces), content_type="application/json")

    return result
    # return HttpResponse(template.render(context, request))
