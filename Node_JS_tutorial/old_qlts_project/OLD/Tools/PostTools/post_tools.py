#!/usr/bin/env python
# -*- coding: utf-8 -*-

#
#
# __init__.py
__author__ = 'TND - NGUYEN DUC TAM'

import requests


# Post multipart/form-data
def tndpost(url=None, dict=None, headers=None):
    if url is None or dict is None:
        return False, 'Url target or dict is None!', None
    try:
        if headers is None:
            response = requests.post(url,
                                     files=dict)
        else:
            # response = requests.post(url,
            #                          files=dict,
            #                          headers=headers)

            # Work with MPS TTS
            response = requests.post(url,
                                     data=dict,
                                     headers=headers)
        print(response.content)
        return True, response.status_code, response.text
    except Exception as xx:
        print(str(xx))
        return False, str(xx), None

'''
headers = {'api_key': 'xxxx'}

json_string = {
    "text": 'Là Sao Ta?',
    "voices": 'Ngọc Anh',
    "lang": 'vi-VN'
}
url = "http://13.229.42.153:9100/tts/generate"

result, code, data = tndpost(url=url,
                          dict=json_string,
                          headers=headers)

print('result =%s' % result)
print('code =%s' % code)
print('data =%s' % data)

data_dict = ast.literal_eval(data)
print('content = %s' % data_dict['data']['audio'][0]['content'])
'''