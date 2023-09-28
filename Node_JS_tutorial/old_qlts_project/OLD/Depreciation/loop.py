from Depreciation.models import *
import datetime
from datetime import date
import math
from datetime import datetime
from datetime import datetime, timedelta
from dateutil.relativedelta import relativedelta
from django.db.models import Q

# def first_check():
#     assets = Asset.objects.all()
#     for asset in assets:
#         try:
#             DepreciationDetail.objects.get(aset=asset)
#             print(f"DepreciationDetail exists for asset: {asset}")
#         except DepreciationDetail.DoesNotExist:
#             print(f"DepreciationDetail is missing for asset: {asset}")
#             DepreciationDetail.objects.create(aset=asset)

def prepare_cal(obj):
    if obj.preiod_detail.name == "day":
        end_depre = obj.aset.date_added + timedelta(days=int(obj.time_depreciation-1))
    elif obj.preiod_detail.name == "week":
        end_depre = obj.aset.date_added + timedelta(weeks=int(obj.time_depreciation-1))
    elif obj.preiod_detail.name == "month":
        end_depre = obj.aset.date_added + relativedelta(months=+(obj.time_depreciation-1))
        # print('end_depre', end_depre)
    elif obj.preiod_detail.name == "year":
        day123 = 365
        num_leap_years = sum(1 for year in range(obj.aset.date_added.year, obj.aset.date_added.year + obj.time_depreciation + 1) if (year % 4 == 0 and year % 100 != 0) or year % 400 == 0)
        end_depre = obj.aset.date_added + timedelta(days=int(day123*obj.time_depreciation + num_leap_years))

    # print('end_depre', end_depre)
    return end_depre

def revaluation_origin(obj,all_re,all_repva,date_added):
    some = [obj.aset.date_added]
    for mnm in range(0,all_re):
        some.append(all_repva[mnm].time_revaluation)
    some.append(prepare_cal(obj))
    some = sorted(some)
    somecount = len(some)
    print('some:',some)
    print('somecount:',somecount)

    # Tính khoảng cách số kỳ giữa các ngày
    sometime = []
    for ab in range(0,somecount-1):
        if obj.preiod_detail.name == "day":
            totald = some[ab+1]-some[ab]
            total = totald.days
        elif obj.preiod_detail.name == "week":
            totald = some[ab+1]-some[ab]
            total = round(totald.days/7)
        elif obj.preiod_detail.name == "month":
            total= (some[ab+1].year-some[ab].year)*12 + (some[ab+1].month - some[ab].month)
        elif obj.preiod_detail.name == "year":
            total= some[ab+1].year - some[ab].year 
        sometime.append(total)
    sometime[0] = sometime[0]+1
    print('sometime:',sometime)

    # tính khấu hao theo từng khoản
    depreciation_per = obj.aset.price_buy/obj.time_depreciation
    aset_price_buy = obj.aset.price_buy
    time_depreciation = obj.time_depreciation
    print('time_depreciation',time_depreciation)
    depreciation_per_sss = [depreciation_per]
    total11 = sum(sometime)
    print('total1111111111111111111111111111',total11)
    for nmn in range(0,all_re):
        print('nmn',nmn)
        total = sometime[nmn]
        total11 = total11-total
        if (time_depreciation + all_repva[nmn].addup_time - total) != 0:
            print('total11---------------',total11)
            print('all_repva[nmn].addup_value----------------',all_repva[nmn].addup_value)
            print('total------------',total)
            print('depreciation_per----------------',depreciation_per)
            print('total11------------',total11)
            depreciation_0 = ((aset_price_buy + all_repva[nmn].addup_value)-(total*depreciation_per))/total11
        else:
            depreciation_0 = 1
        time_depreciation = time_depreciation - total
        print('time_depreciation ',time_depreciation )
        print('aset_price_buy 0',aset_price_buy )
        print('all_repva[nmn].addup_value',all_repva[nmn].addup_value)
        print('total',total)
        print('depreciation_per',depreciation_per)
        aset_price_buy =  aset_price_buy + all_repva[nmn].addup_value - (total*depreciation_per)
        print('aset_price_buy ',aset_price_buy )
        depreciation_per = depreciation_0
        print('depreciation_per ',depreciation_per )
        depreciation_per_sss.append(depreciation_0)
    print('hello')
    print('depreciation_per_sss',depreciation_per_sss)

    # lắp phần tính vào bảng
    all_depreciation = 0
    asset_price = obj.aset.price_buy
    number_period = 0
    a = 0
    for n in range(0,somecount-1):
        if n == 0:
            v = 0
            z = sometime[0]
        else:
            v = sometime[n-1]
            z = sometime[n-1] + sometime[n]
            asset_price = asset_price + all_repva[n-1].addup_value
            print('asset_price',asset_price)
        for d in range(v,z):
            asset_detail = DepreciationAssetDetail()
            asset_detail.aet_depreciation = obj.aset
            number_period += 1
            a += 1
            if obj.preiod_detail.name == "day":
                asset_detail.days_depreciation = date_added + timedelta(days=a)
            elif obj.preiod_detail.name == "week":
                asset_detail.days_depreciation = date_added  + timedelta(weeks=a)
            elif obj.preiod_detail.name == "month":
                asset_detail.days_depreciation = date_added + relativedelta(months=+a)
            elif obj.preiod_detail.name == "year":
                day123 = 365
                num_leap_years = sum(1 for year in range(obj.aset.date_added.year, obj.aset.date_added.year + a + 1) if (year % 4 == 0 and year % 100 != 0) or year % 400 == 0)
                asset_detail.days_depreciation = obj.aset.date_added + timedelta(days=int(day123*a + num_leap_years))
            
            asset_detail.count_depreciation = number_period 
            asset_detail.value_depreciaiton = depreciation_per_sss[n]
            asset_detail.value_start = asset_price - all_depreciation 
            asset_detail.value_end = asset_price - all_depreciation - asset_detail.value_depreciaiton
            all_depreciation += asset_detail.value_depreciaiton
            # asset_detail.percent_depreciation = (1/obj.time_depreciation) * 100
            asset_detail.remain_value = asset_detail.value_end
            asset_detail.save()

def origin(obj,total,date_added):
    for a in range(0,total):
        # depreciation = DepreciationDetail()
        asset_detail = DepreciationAssetDetail()
        asset_detail.aet_depreciation = obj.aset
        asset_detail.count_depreciation = a
        asset_detail.value_start = obj.aset.price_buy

        if obj.preiod_detail.name == "day":
            asset_detail.days_depreciation = date_added + timedelta(days=a)
            # depreciation.time_been_depreciation = obj.time_depreciation
            time_depreciation = obj.time_depreciation
        elif obj.preiod_detail.name == "week":
            asset_detail.days_depreciation = date_added  + timedelta(weeks=a)
            time_depreciation = obj.time_depreciation
            # if depreciation.time_been_depreciation >= asset_detail.days_depreciation and depreciation.time_been_depreciation != depreciation.aset.date_added :
            #     continue
        elif obj.preiod_detail.name == "month":
            asset_detail.days_depreciation = date_added + relativedelta(months=+a)
            time_depreciation = obj.time_depreciation
            # if depreciation.time_been_depreciation >= asset_detail.days_depreciation and depreciation.time_been_depreciation != depreciation.aset.date_added:
            #     continue
        elif obj.preiod_detail.name == "year":
            asset_detail.days_depreciation = date_added + relativedelta(months=+a)
            time_depreciation = obj.time_depreciation*12
            # if depreciation.time_been_depreciation >= asset_detail.days_depreciation:
            #     continue
        
        asset_detail.value_depreciaiton = obj.aset.price_buy/time_depreciation
        asset_detail.value_start = obj.aset.price_buy - asset_detail.value_depreciaiton*(a)
        asset_detail.value_end = obj.aset.price_buy - asset_detail.value_depreciaiton*(a+1)
        asset_detail.percent_depreciation = (1/obj.time_depreciation) * 100
        asset_detail.remain_value = asset_detail.value_end
        asset_detail.save()
        # DepreciationDetail.objects.filter(aset__uuid =asset_detail.aet_depreciation).update(time_been_depreciation=asset_detail.days_depreciation)

def adjustment_origin(obj,date_added):
    if obj.preiod_detail.name == "year":
        adjustment_number = obj.adjustment_number
        time_depreciation = obj.time_depreciation
        depreciation_period = (100/time_depreciation)*float(adjustment_number)
        endtime_depre = math.floor(100 / depreciation_period) 

        print('time_depreciation',time_depreciation)
        print('adjustment_number',adjustment_number)
        print('depreciation_period',depreciation_period)
        print('endtime_depre',endtime_depre)
        keep_value_depreciaiton = obj.aset.price_buy
        price_buy = obj.aset.price_buy
        price_buy1 = obj.aset.price_buy
        keep = -12
        for a in range(1,time_depreciation+1-endtime_depre):
            keep += 12
            
            price_buy1 = keep_value_depreciaiton
            for b in range(0+keep,12+keep):
                asset_detail = DepreciationAssetDetail()
                asset_detail.aet_depreciation = obj.aset
                asset_detail.count_depreciation = b
                asset_detail.value_start = obj.aset.price_buy
                asset_detail.days_depreciation = date_added + relativedelta(months=+b)
                if asset_detail.days_depreciation > datetime.now().date():
                    break
                asset_detail.value_depreciaiton =  float(price_buy1)*(depreciation_period/1200)
                asset_detail.value_start = float(price_buy)
                asset_detail.value_end = float(price_buy) - asset_detail.value_depreciaiton
                price_buy = asset_detail.value_end
                asset_detail.percent_depreciation = (1/ obj.time_depreciation) * 100
                asset_detail.remain_value = asset_detail.value_end
                keep_value_depreciaiton = asset_detail.value_end
                asset_detail.save()

        keep_value_depreciaiton1 = keep_value_depreciaiton
        for a in range(time_depreciation+1-endtime_depre,time_depreciation+1):
            keep += 12
            price_buy1 = keep_value_depreciaiton
            for b in range(0+keep,12+keep):
                asset_detail = DepreciationAssetDetail()
                asset_detail.aet_depreciation = obj.aset
                asset_detail.count_depreciation = b
                asset_detail.value_start = obj.aset.price_buy
                asset_detail.days_depreciation = date_added + relativedelta(months=+b)
                asset_detail.value_depreciaiton =  keep_value_depreciaiton1/(endtime_depre*12)
                asset_detail.value_start = keep_value_depreciaiton
                asset_detail.value_end = keep_value_depreciaiton - asset_detail.value_depreciaiton 
                keep_value_depreciaiton = asset_detail.value_end
                asset_detail.percent_depreciation = (1/ obj.time_depreciation) * 100
                asset_detail.remain_value = asset_detail.value_end
                asset_detail.save()
    else:
        adjustment_number = obj.adjustment_number
        time_depreciation = obj.time_depreciation
        depreciation_period = (100/time_depreciation)*float(adjustment_number)
        endtime_depre = math.floor(100 / depreciation_period) 

        print('time_depreciation',time_depreciation)
        print('adjustment_number',adjustment_number)
        print('depreciation_period',depreciation_period)
        print('endtime_depre',endtime_depre)
        keep_value_depreciaiton = 0 
        price_buy = obj.aset.price_buy
        for a in range(0,time_depreciation-endtime_depre):
            asset_detail = DepreciationAssetDetail()
            asset_detail.aet_depreciation = obj.aset
            asset_detail.count_depreciation = a
            asset_detail.value_start = obj.aset.price_buy

            if obj.preiod_detail.name == "day":
                asset_detail.days_depreciation = date_added + timedelta(days=a)
                if asset_detail.days_depreciation > datetime.now().date():
                    break
            elif obj.preiod_detail.name == "week":
                asset_detail.days_depreciation = date_added  + timedelta(weeks=a)
                if asset_detail.days_depreciation > datetime.now().date():
                    break
            elif obj.preiod_detail.name == "month":
                asset_detail.days_depreciation = date_added + relativedelta(months=+a)
                if asset_detail.days_depreciation > datetime.now().date():
                    break
            elif obj.preiod_detail.name == "year":
                day123 = 365
                num_leap_years = sum(1 for year in range(obj.aset.date_added.year, obj.aset.date_added.year + a + 1) if (year % 4 == 0 and year % 100 != 0) or year % 400 == 0)
                asset_detail.days_depreciation = obj.aset.date_added + timedelta(days=int(day123*a + num_leap_years))
                if asset_detail.days_depreciation > datetime.now().date():
                    break

            asset_detail.value_depreciaiton =  float(price_buy)*(depreciation_period/100)
            asset_detail.value_start = float(price_buy)
            asset_detail.value_end = float(price_buy) - asset_detail.value_depreciaiton
            price_buy = asset_detail.value_end
            asset_detail.percent_depreciation = (1/ obj.time_depreciation) * 100
            asset_detail.remain_value = asset_detail.value_end
            keep_value_depreciaiton = asset_detail.value_end - asset_detail.value_depreciaiton
            asset_detail.save()

        keep_value_depreciaiton1 = keep_value_depreciaiton
        for a in range(time_depreciation-endtime_depre,time_depreciation):
            asset_detail = DepreciationAssetDetail()
            asset_detail.aet_depreciation = obj.aset
            asset_detail.count_depreciation = a
            asset_detail.value_start = obj.aset.price_buy

            if obj.preiod_detail.name == "day":
                asset_detail.days_depreciation = date_added + timedelta(days=a)
            elif obj.preiod_detail.name == "week":
                asset_detail.days_depreciation = date_added  + timedelta(weeks=a)
            elif obj.preiod_detail.name == "month":
                asset_detail.days_depreciation = date_added + relativedelta(months=+a)
            elif obj.preiod_detail.name == "year":
                day123 = 365
                num_leap_years = sum(1 for year in range(obj.aset.date_added.year, obj.aset.date_added.year + a + 1) if (year % 4 == 0 and year % 100 != 0) or year % 400 == 0)
                asset_detail.days_depreciation = obj.aset.date_added + timedelta(days=int(day123*a + num_leap_years))
            
            asset_detail.value_depreciaiton =  keep_value_depreciaiton1/endtime_depre
            asset_detail.value_start = keep_value_depreciaiton
            asset_detail.value_end = keep_value_depreciaiton - asset_detail.value_depreciaiton 
            keep_value_depreciaiton = asset_detail.value_end
            asset_detail.percent_depreciation = (1/ obj.time_depreciation) * 100
            asset_detail.remain_value = asset_detail.value_end
            asset_detail.save()

def autocreate2():
    DepreciationAssetDetail.objects.all().delete()
    alldepre = DepreciationDetail.objects.all()
    print('alldepre.count()',alldepre.count())
    for i in alldepre:
        now = datetime.now().date()
        if i.preiod_detail != None:
            if now <= prepare_cal(i): 
                now = now
            elif now > prepare_cal(i):
                now = prepare_cal(i)

            # date_added = obj.date_been_add
            date_added = i.aset.date_added
            if i.preiod_detail.name == "day":
                totald = now - date_added
                total = totald.days
                print('now',now)
                print('date_added',date_added)
            elif i.preiod_detail.name == "week":
                totald = now - date_added
                total = totald.days//7
                print('now',now)
                print('date_added',date_added)
            elif i.preiod_detail.name == "month":
                total= (now.year - date_added.year)*12 + (now.month - date_added.month)
                print('now',now)
                print('date_added',date_added)
            elif i.preiod_detail.name == "year":
                total= (now.year - date_added.year)*12 + (now.month - date_added.month)
                print('now',now)
                print('date_added',date_added)
            print('total',total)
            # Thêm những ngày vào trong list
            all_re = 0
            all_repvan = i.revaluation.all()
            all_repva = all_repvan.exclude(
                Q(time_revaluation__lt = i.aset.date_added) |  Q(time_revaluation__gt = now)
                )
            all_re = all_repva.count()
            print('all_re',all_re)
            print('all_repva',all_repva)



            # tach 2 phan

            if all_re != 0 and i.adjustment_number == 0:
                revaluation_origin(i,all_re,all_repva,date_added)
            
            elif i.adjustment_number != 0 and all_re == 0:
                adjustment_origin(i,date_added)

            else:
                origin(i,total,date_added)
        else:   
            pass
           

