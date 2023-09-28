from django.shortcuts import render

from .models import Company
from rest_framework.renderers import TemplateHTMLRenderer
from rest_framework.response import Response
from rest_framework.views import APIView
from .kserializers import CompanySerializer
from django.http import HttpResponse
from django.template import loader
from .models import *
from django.views.generic import ListView
from django.core.paginator import Paginator
from django.views.generic.detail import DetailView
from django.contrib.auth.decorators import login_required

import requests
# from .RequestHandler.TAccountRequestHandler import account_post_handle, account_get_handle

# def Index(request, *args, **kwargs):
#     context = {}
#     # context['company_template'] = 'arrgon'
#     template = loader.get_template('company/index.html')
#     context = Company.objects.all()
#     return HttpResponse(template.render({'context': context}, request))
@login_required(login_url="/Account/signin/")
def CompanyDetails(request, *args, **kwargs):
    context = {}
    # context['company_template'] = 'arrgon'
    template = loader.get_template('company/company.html')
    context['Company_count'] = Company.objects.all().count()     
    

    return HttpResponse(template.render(context, request))


# class PostDetailView(DetailView):
#     model = Company
#     template_name = 'company/Company-Include.html'



@login_required(login_url="/Account/signin/")
def StaffDetails(request, *args, **kwargs):
    context = {}
    # context['company_template'] = 'arrgon'
    template = loader.get_template('Staff/Staff.html')
    context['Staff_count'] = Staff.objects.all().count()     
    

    return HttpResponse(template.render(context, request))

@login_required(login_url="/Account/signin/")
def StaffInformationDetails(request, *args, **kwargs):
    context = {}
    # context['company_template'] = 'arrgon'
    template = loader.get_template('StaffInformation/StaffInformation.html')
    context['Staff_count'] = StaffInformation.objects.all().count()     

    return HttpResponse(template.render(context, request))

# @login_required(login_url="/account/signin/")
# def Staff_CreateView(request, *args, **kwargs):

#     context = {}
#     context['website_template'] = 'arrgon'

#     template = loader.get_template(str('company/%s/Staff/Staff--Create.html' % context['website_template']))
#     if request.method == 'POST':
#         more_context = account_post_handle(request)
#         if more_context:
#             context.update(more_context)
#     all_of_objs = Staff.objects.all().order_by('-updated_at')

#     paginator = Paginator(all_of_objs, 100) # Show 100 contacts per page

#     page = request.GET.get('page')
#     context['all_accounts'] = paginator.get_page(page)

#     context['current_uuid'] = UUID4()

#     result = HttpResponse(template.render(context, request))
#     return result




# def Staff_Check_Duplicate_Create(request):
#     response = {}
#     response["status"] = "Fail"
#     if request.is_ajax and request.method == "POST":
#         obj = (json.loads(request.body))
#         if 'organization' in obj:
#             org_code = str(obj['organization'])
#         else:
#             response["status"] = "Fail"
#             response["result"] = "Organization_Nofound"
#             return JsonResponse(response)
#         if 'staff_code' in obj:
#             staff_code = str(obj['staff_code'])
#         else:
#             staff_code = None
      
       
#         if staff_code is not None or staff_code != '':
#             try:
#                 org_obj = Staff.objects.filter(code=org_code).first()
#                 staff_obj_check_code = Staff.objects.filter(Q(organization=org_obj) & Q(staff_code=staff_code))
#             except Exception as xx:
#                 staff_obj_check_code = None
#                 print(xx)
#             if staff_obj_check_code is None:
#                 response["status"] = "Fail"
#                 response["result"] = "Duplicate"
#                 return JsonResponse(response)
#         else:
#             response["status"] = "Fail"
#             response["result"] = "Duplicate"
#         if staff_obj_check_code is not None 
#             # check duplicate of field industry_colleagues, colleagues, self_manager
#             duplicate_list = []
#             industry_colleagues = []
#             colleagues = []
#             self_manager = []
#             if 'industry_colleagues' in obj:
#                 industry_colleagues = obj['industry_colleagues']
#                 if len(industry_colleagues) > 0:
#                     duplicate_list = industry_colleagues
#             if 'colleagues' in obj:
#                 colleagues = obj['colleagues']
#                 if len(colleagues) > 0:
#                     duplicate_list = duplicate_list + colleagues
#             if 'self_manager' in obj and obj['self_manager'] is not None:
#                 self_manager = obj['self_manager']
#             if len(self_manager) > 0:
#                 duplicate_list.append(self_manager)
#             count_list = Counter(duplicate_list)
#             for key, value in count_list.items():
#                 if int(value) > 1 and key != '':
#                     response["status"] = "Fail"
#                     response["result"] = "Duplicate-Colleagues"
#                     return JsonResponse(response)
#             if len(staff_obj_check_code) == 0 
#                 response["status"] = "OK"
#                 response["result"] = "Not_Duplicate"
#                 return JsonResponse(response)
#             else:
#                 response["status"] = "Fail"
#                 response["result"] = "Duplicate"
#                 return JsonResponse(response)
#     else:
#         response["status"] = "NotFound"
#     return JsonResponse(response)
# # Create your tests here.
@login_required(login_url="/Account/signin/")
def UnitDetails(request, *args, **kwargs):
    context = {}
    # context['company_template'] = 'arrgon'
    template = loader.get_template('Unit/Unit.html')
    context['Unit_count'] = Unit.objects.all().count()     
    

    return HttpResponse(template.render(context, request))


@login_required(login_url="/Account/signin/")
def PositionDetails(request, *args, **kwargs):
    context = {}
    # context['company_template'] = 'arrgon'
    template = loader.get_template('Position/Position.html')
    context['Position_count'] = Position.objects.all().count()     
    

    return HttpResponse(template.render(context, request))

@login_required(login_url="/Account/signin/")
def CompanyStatusDetails(request, *args, **kwargs):
    context = {}
    # context['company_template'] = 'arrgon'
    template = loader.get_template('CompanyStatus/CompanyStatus.html')
    context['CompanyStatus_count'] = CompanyStatus.objects.all().count()     
    

    return HttpResponse(template.render(context, request))

@login_required(login_url="/Account/signin/")
def StaffStatusDetails(request, *args, **kwargs):
    context = {}
    # context['company_template'] = 'arrgon'
    template = loader.get_template('StaffStatus/StaffStatus.html')
    context['StaffStatus_count'] = StaffStatus.objects.all().count()     
    

    return HttpResponse(template.render(context, request))


@login_required(login_url="/Account/signin/")
def UpdatePDW(request, *args, **kwargs):
    context = {}
    # context['company_template'] = 'arrgon'
    # template = loader.get_template('company/company.html')
    # context['Company_count'] = Company.objects.all().count()     
    

    # Tỉnh/Thành phố
    url_provinces = "https://provinces.open-api.vn/api/"

    response_provinces = requests.get(url_provinces)
    data_provinces = response_provinces.json()

    for province in data_provinces:

        obj_province = Commune()
        obj_province.name = province['name']
        obj_province.code = province['code']
        obj_province.save()


    # Quận/Huyện
    url_districts = "https://provinces.open-api.vn/api/"

    response_districts = requests.get(url_districts)
    data_districts = response_districts.json()

    for district in data_districts:
        list_province = City.objects.all()     
        for province in list_province:
            if district['province_code'] == province.code:
                obj_district = District()
                obj_district.name = district['name']
                obj_district.code = district['code']
                obj_district.provice = province.uuid
                obj_district.save()

                
    # Xã/thị trấn
    url_districts = "https://provinces.open-api.vn/api/"

    response_districts = requests.get(url_districts)
    data_districts = response_districts.json()

    for district in data_districts:
        list_province = City.objects.all()     
        for province in list_province:
            if district['province_code'] == province.code:
                obj_district = District()
                obj_district.name = district['name']
                obj_district.code = district['code']
                obj_district.provice = province.uuid
                obj_district.save()

    # return HttpResponse(template.render(context, request))
