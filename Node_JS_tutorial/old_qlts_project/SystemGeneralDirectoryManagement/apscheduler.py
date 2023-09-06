from apscheduler.schedulers.background import BackgroundScheduler
from django_apscheduler.jobstores import DjangoJobStore
from django_apscheduler.models import DjangoJobExecution
import requests
from .models import *

# Cập nhật lại dữ liệu của tỉnh/thành phố
def Update_Province():
    url_provinces = "https://provinces.open-api.vn/api/"
    response_provinces = requests.get(url_provinces)
    data_provinces = response_provinces.json()
    list_province = Province.objects.all()     
    for province in data_provinces:
        for data_province_dtb in list_province:
            if str(province['code']) == data_province_dtb.code:
                data_province_dtb.name = province['name']
                data_province_dtb.code = province['code']
                data_province_dtb.division_type = province['division_type']
                data_province_dtb.codename = province['codename']
                data_province_dtb.phone_code = province['phone_code']
                data_province_dtb.save()

scheduler = BackgroundScheduler()
scheduler.add_jobstore(DjangoJobStore(), "default")
scheduler.add_job(Update_Province(), 'cron', day='1', hour='8')
scheduler.start()
