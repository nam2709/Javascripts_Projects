#!/usr/bin/env python
# -*- coding: utf-8 -*-

#
#
# __init__.py
__author__ = 'TND - NGUYEN DUC TAM'
import time

import requests

from Logger.models import AsteriskCall
from Logger.models import QueueLog

DATADIR = "/Volumes/data/sources/web/faceapi/Logger"
FILENAME = "log.txt"
DATAPATH = str("%s/%s" % (DATADIR, FILENAME))

URL = "http://localhost:8000/logs/syslog/api/listener/"

DELAY = 0.3

def post(data_file=DATAPATH,
         url=URL,
         delay=0.3):
    try:
        with open(data_file) as f:
            line = f.readline()
            while line:
                print(line)
                data = {'data': line}
                try:
                    result = requests.post(url, data=data)
                    print(result)
                except Exception as xx:
                    print(str(xx))
                time.sleep(delay)
                line = f.readline()
        return True
    except Exception as xx:
        print(str(xx))
        return False

def import_queue_log(data_file=DATAPATH):
    try:
        with open(data_file) as f:
            line = f.readline()
            while line:
                print('line = %s' % line)
                data = str(line).split('|')
                if data[0] and int(data[0]):
                    print('data[0] = %s' % data[0])
                    obj = QueueLog()
                    obj.unix_time = int(data[0])
                    try:
                        print('data[1] = %s' % data[1])
                        call = AsteriskCall.objects.filter(call_id=data[1]).first()
                        if call is None:
                            call = AsteriskCall()
                            call.call_id = data[1]
                        obj.call_id = call
                        try:
                            print('data[2] = %s' % data[2])
                            obj.queue_name = data[2]
                            try:
                                print('data[3] = %s' % data[3])
                                obj.queue_event_channel = data[3]
                                try:
                                    print('data[4] = %s' % data[4])
                                    obj.data_1 = data[4]
                                    try:
                                        print('data[5] = %s' % data[5])
                                        obj.data_2 = data[5]
                                        try:
                                            print('data[6] = %s' % data[6])
                                            obj.data_3 = data[6]
                                        except Exception as xx:
                                            print(str(xx))
                                    except Exception as xx:
                                        print(str(xx))
                                except Exception as xx:
                                    print(str(xx))
                            except Exception as xx:
                                print(str(xx))
                        except Exception as xx:
                            print(str(xx))
                        call.save()
                    except Exception as xx:
                        print(str(xx))
                        continue
                    obj.save()
                line = f.readline()
        return True
    except Exception as xx:
        print(str(xx))
        return False

#post(data_file=DATAPATH,
#     url=URL,
#     delay=DELAY)

#import_queue_log(data_file="/Volumes/data/sources/web/faceapi/Logger/queue_log.txt")