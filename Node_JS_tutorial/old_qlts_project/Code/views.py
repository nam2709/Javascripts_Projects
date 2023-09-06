from django.shortcuts import render
from django.http import JsonResponse
from .views import *
from .models import *
# Create your views here.

def GetCode(request,company_code=None,app_code=None,class_code=None):
    # do something with the your data

    data = {}
    data["status_code"] = 400
    data["status"] = "fail"
    data["msg"] = "fail"

    crr_config = GenerateCode.objects.filter(company_code=company_code,app_name=app_code,mode_name=class_code).first()
    if crr_config:
        
        crr_code = crr_config.get_code()
        crr_config.save()
        if crr_code:
            data["code"] = crr_code
            data["status_code"] = 200
            data["status"] = "success"
            data["msg"] = "success"
        else:
            return JsonResponse(data)

    else:
        crr_config = GenerateCode()
        crr_config.company_code = company_code
        crr_config.app_name = app_code
        crr_config.mode_name = class_code
        crr_config.length_code = "8"
        crr_config.prefix = "NS"
        crr_config.type_gen_code = 0
        crr_config.save()
        crr_code = crr_config.get_code()
        crr_config.save()
        if crr_code:
            data["code"] = crr_code
            data["status_code"] = 200
            data["status"] = "success"
            data["msg"] = "success"
        else:
            return JsonResponse(data)

    # just return a JsonResponse
    return JsonResponse(data)

def CheckExistCode(request,company_code=None,app_code=None,class_code=None,crr_code=None):

    # do something with the your data
    crr_config = GenerateCode.objects.filter(company_code=company_code,app_name=app_code,mode_name=class_code).first()

    data = {}
    if crr_config:
        crr_code_int = int(crr_config.current_code)
        crr_check_code_int = None

        crr_check_code = crr_code.split('-')
        if len(crr_check_code) < 2:
            pass
        else:
            try:
                crr_check_code_int = int(crr_check_code[1])
            except Exception as xx:
                print("Error convert crr_check_code to int ", xx)
        if crr_check_code_int and isinstance(crr_check_code_int, int):
            if crr_check_code_int <= crr_code_int:
                data["status_code"] = 409
                data["status"] = "exist"
                data["msg"] = "code is exisiting"
            else:
                data["status_code"] = 200
                data["status"] = "success"
                data["msg"] = "success"
        else:
            return JsonResponse(data)

    else:
        crr_config = GenerateCode()
        crr_config.company_code = company_code
        crr_config.app_name = app_code
        crr_config.mode_name = class_code
        crr_config.length_code = "8"
        crr_config.prefix = "ADFC"
        crr_config.type_gen_code = 0
        crr_config.save()
        data["status_code"] = 200
        data["status"] = "success"
        data["msg"] = "not existing"
        return JsonResponse(data)

    # just return a JsonResponse
    return JsonResponse(data)