from django.shortcuts import render
from Depreciation.models import *
from Depreciation.loop import autocreate2
from django.db.models.functions import ExtractYear
from django.contrib.auth.decorators import login_required
from datetime import date
import json

# Create your views here.
@login_required(login_url="/Account/signin/")
def depreciaiton(request): 
    return render(request,'Depreciation/arrgon/admin/Depreciation.html')

@login_required(login_url="/Account/signin/")
def year_depreciation(request,year_id): 
    target_date = date(year=year_id, month=9, day=9)
    DepreciationDetail.objects.update(year_views = target_date,curency_change = "VND")
    target_date_year = target_date.year
    return render(request,'Depreciation/arrgon/admin/Year.html',{'target_date_year': target_date_year})

@login_required(login_url="/Account/signin/")
def assetrevaluation(request):
    return render(request,'Depreciation/arrgon/admin/AssetRevaluation.html')

@login_required(login_url="/Account/signin/")
def depreciationasset(request):
    return render(request,'Depreciation/arrgon/admin/DepreciationAssetDetail.html')

@login_required(login_url="/Account/signin/")
def depreciationtype(request):
    autocreate2()
    return render(request,'Depreciation/arrgon/admin/DepreciationType.html')

@login_required(login_url="/Account/signin/")
def adjustment(request):
    return render(request,'Depreciation/arrgon/admin/Adjustment.html')

@login_required(login_url="/Account/signin/")
def createrel(request):
    return render(request,'Depreciation/arrgon/admin/Create_Revaluation.html')

def test(request):
    return render(request,'Depreciation/arrgon/admin/Testing.html')