__author__ = 'root'

import base64

from PIL import Image

#from uuid import UUID as UUID4
import io
import hashlib
import random
import string
import socket
from uuid import UUID as UUID4
# import numpy as np
# import cv2
from uuid import uuid4 as UUID4
from uuid import uuid1 as UUID1
from uuid import UUID

from urllib import request
import json

# from gtts import gTTS
from PIL import Image as PilImage
import requests
from io import BytesIO

def TNDID():
    tndid = str('t%s-n-%sd' %(UUID1(), UUID4()))
    return tndid

def md5(fname):
    hash_md5 = hashlib.md5()
    with open(fname, "rb") as f:
        for chunk in iter(lambda: f.read(4096), b""):
            hash_md5.update(chunk)
    return hash_md5.hexdigest()


def gen_image_id(LENGTH):
    rand = ''.join(random.choices(string.ascii_uppercase + string.ascii_lowercase + string.digits, k=LENGTH))
    return(rand)

def APIKEYGEN(LENGTH=128):
    rand = ''.join(random.choices(string.ascii_uppercase + string.ascii_lowercase + string.digits, k=LENGTH))
    return(rand)

def get_hostname():
    host_name = socket.gethostname()
    print(host_name)
    return(host_name)

def post_json_bk(target_url=None, json_string=None):
    if target_url is not None:
        try:
            req = request.Request(target_url)
            req.add_header('Content-Type', 'application/json; charset=utf-8')
            jsondata = json.dumps(json_string)
            jsondataasbytes = jsondata.encode('utf-8')   # needs to be bytes
            req.add_header('Content-Length', len(jsondataasbytes))
            print (jsondataasbytes)
            response = request.urlopen(req, jsondataasbytes).read().decode("utf-8")
        except Exception as xx:
            print(str(xx))
            response = str(xx)
    else:
        print('Target Url is None!')
        response = None
    return(str(response))

def post_json(target_url=None, json_string=None):
    if target_url is not None:
        try:
            # sending post request and saving response as response object
            r = requests.post(url = target_url, data = json_string)
            # extracting response text
            pastebin_url = r.text
            print("The pastebin URL is:%s" % pastebin_url)
            response = pastebin_url
        except Exception as xx:
            print(str(xx))
            response = str(xx)
    else:
        print('Target Url is None!')
        response = None
    return(str(response))

def post_raw_data(target_url=None, rawdata=None):
    if target_url is not None:
        try:
            data = bytes(rawdata.encode())
            handler = request.Request( target_url, data=data)
            response = request.urlopen(handler).read().decode('utf-8')
            print(str(response))
        except Exception as xx:
            print(str(xx))
            response = str(xx)
    else:
        print('Target Url is None!')
        response = None
    return(str(response))

def get_data_urllib(target_url=None, **kwargs):
    if target_url is not None:
        try:
            fix_target_url = target_url
            if kwargs is not None:
                fix_target_url = target_url + '?'
                for key, value in kwargs.items():
                    print ("%s == %s" %(key, value))
                    fix_target_url += key + '=' + value
        except Exception as xx:
            print('kwargs error: %s ' % str(xx))
            contents = str(xx)
            return contents
        contents = str(request.urlopen(fix_target_url).read().decode("utf-8"))
        print (contents)
    else:
        print('None Url target!')
        contents = None
    return contents

def get_data(target_url=None, **kwargs):
    if target_url is not None:
        try:
            fix_target_url = target_url
            if kwargs is not None:
                fix_target_url = target_url + '?'
                for key, value in kwargs.items():
                    print ("%s == %s" %(key, value))
                    fix_target_url += key + '=' + value
        except Exception as xx:
            print('kwargs error: %s ' % str(xx))
            contents = str(xx)
            return contents
        contents = str(request.urlopen(fix_target_url).read().decode("utf-8"))
        print (contents)
    else:
        print('None Url target!')
        contents = None
    return contents

'''
def add_years(d, years):
    """Return a date that's `years` years after the date (or datetime)
    object `d`. Return the same calendar date (month and day) in the
    destination year, if it exists, otherwise use the following day
    (thus changing February 29 to March 1).

    """
    try:
        return d.replace(year = d.year + years)
    except ValueError:
        return d + (date(d.year + years, 1, 1) - date(d.year, 1, 1))

def add_years2(d, years):
    """Return a date that's `years` years after the date (or datetime)
    object `d`. Return the same calendar date (month and day) in the
    destination year, if it exists, otherwise use the following day
    (thus changing February 29 to March 1).

    """
    try:
        new_date = d + relativedelta(years=years)
        return new_date
    except ValueError:
        return d + (date(d.year + years, 1, 1) - date(d.year, 1, 1))

'''

def get_last_line_contain_string(FILE_PATH, CONTAIN_STRING):
    f = open(FILE_PATH, "r")
    lines = f.readlines()
    f.close()
    last_line_holder = []
    for line in lines:
        if CONTAIN_STRING in line:
            last_line_holder.append(line)
    print(last_line_holder[-1])
    return last_line_holder[-1]

# def text_to_sound(content, lang='vi'):
#     tts = gTTS(content, lang=lang)
#     file_name = gen_image_id(6) + ".mp3"
#     tts.save(file_name)
#     return file_name
#     #playsound(file_name)

def get_image_from_url(url, output_file):
    try:
        response = requests.get(url)
        img = PilImage.open(BytesIO(response.content))
        img.save(output_file)
        return True
    except Exception as xx:
        print(str(xx))
        return False

def export_model(appname=None, model_name=None, outfile=None, filetype="csv"):
    if appname and model_name and outfile:
        try:
            import_str = str("from %s.admin import %sResource;" % (appname, model_name))
            exec(import_str)
            exec(str("dataset = %sResource().export();" % model_name))
            exec("dataout = (dataset.%s);" % filetype)
            exec(str("output = open('%s', 'w');" % (outfile)))
            exec("n = output.write(dataout)")
            exec("output.close();")
            return True
        except Exception as xx:
            print(str(xx))
            return False

def import_model(appname=None, model_name=None, infile=None, filetype="csv"):
    if appname and model_name and infile:
        try:
            import_str = str("from %s.admin import %sResource;" % (appname, model_name))
            exec(import_str)
            import_str = str("""
from %s.models import %s;
from tablib import Dataset;
from importlib import import_module;
from pathlib import Path;
from import_export import resources;
""" % (appname, model_name))
            exec(import_str)
            exec(str("book_resource = resources.modelresource_factory(model=%s)();" % model_name))
            #exec("contents = Path('%s').read_text();" % infile)
            exec(str("imported_data = Dataset().load(open('%s').read(),format='%s');" % (infile, filetype)))
            #Test:
            #exec(str("result = book_resource.import_data(imported_data, dry_run=True);"))
            exec(str("result = book_resource.import_data(imported_data, dry_run=False);"))
            exec(str("print(result.has_errors())"))
            return True
        except Exception as xx:
            print(str(xx))
            return False

def md5(fname):
    hash_md5 = hashlib.md5()
    with open(fname, "rb") as f:
        for chunk in iter(lambda: f.read(4096), b""):
            hash_md5.update(chunk)
    return hash_md5.hexdigest()

def gen_image_id(LENGTH):
    rand = ''.join(random.choices(string.ascii_uppercase + string.ascii_lowercase + string.digits, k=LENGTH))
    return(rand)

# Take in base64 string and return cv image
# def StringToRGB(base64_string):
#     try:
#         imgdata = base64.b64decode(str(base64_string))
#         image = PilImage.open(io.BytesIO(imgdata))
#         return cv2.cvtColor(np.array(image), cv2.COLOR_BGR2RGB)
#     except Exception as xx:
#         print(str(xx))
#         return None
# def saveBase64ToFile(encoded_data, filename):
#     try:
#         nparr = np.fromstring(encoded_data, np.uint8)
#         img = cv2.imdecode(nparr, cv2.IMREAD_ANYCOLOR)
#         return cv2.imwrite(filename, img)
#     except Exception as xx:
#         print(str(xx))
#         return None
def ToJpg(input_file, output_file, background=(255, 255, 255)):
    # background = (255, 255, 255) mean white color transparent
    try:
        im1 = PilImage.open(input_file)
        im1.load() # required for png.split()
        background = Image.new("RGB", im1.size, background)
        background.paste(im1, mask=im1.split()[3]) # 3 is the alpha channel
        background.save(output_file, 'JPEG', quality=100)
        return True
    except Exception as xx:
        print(str(xx))
        return False

def get_hostname():
    host_name = socket.gethostname()
    print(host_name)
    return(host_name)

def post_json_bk(target_url=None, json_string=None):
    if target_url is not None:
        try:
            req = request.Request(target_url)
            req.add_header('Content-Type', 'application/json; charset=utf-8')
            jsondata = json.dumps(json_string)
            jsondataasbytes = jsondata.encode('utf-8')   # needs to be bytes
            req.add_header('Content-Length', len(jsondataasbytes))
            print (jsondataasbytes)
            response = request.urlopen(req, jsondataasbytes).read().decode("utf-8")
        except Exception as xx:
            print(str(xx))
            response = str(xx)
    else:
        print('Target Url is None!')
        response = None
    return(str(response))

def post_json(target_url=None, json_string=None):
    if target_url is not None:
        try:
            # sending post request and saving response as response object
            r = requests.post(url = target_url, data = json_string)
            # extracting response text
            pastebin_url = r.text
            print("The pastebin URL is:%s" % pastebin_url)
            response = pastebin_url
        except Exception as xx:
            print(str(xx))
            response = str(xx)
    else:
        print('Target Url is None!')
        response = None
    return(str(response))

def post_raw_data(target_url=None, rawdata=None):
    if target_url is not None:
        try:
            data = bytes(rawdata.encode())
            handler = request.Request( target_url, data=data)
            response = request.urlopen(handler).read().decode('utf-8')
            print(str(response))
        except Exception as xx:
            print(str(xx))
            response = str(xx)
    else:
        print('Target Url is None!')
        response = None
    return(str(response))

def get_data_urllib(target_url=None, **kwargs):
    if target_url is not None:
        try:
            fix_target_url = target_url
            if kwargs is not None:
                fix_target_url = target_url + '?'
                for key, value in kwargs.items():
                    print ("%s == %s" %(key, value))
                    fix_target_url += key + '=' + value
        except Exception as xx:
            print('kwargs error: %s ' % str(xx))
            contents = str(xx)
            return contents
        contents = str(request.urlopen(fix_target_url).read().decode("utf-8"))
        print (contents)
    else:
        print('None Url target!')
        contents = None
    return contents

def get_data(target_url=None, **kwargs):
    if target_url is not None:
        try:
            fix_target_url = target_url
            if kwargs is not None:
                fix_target_url = target_url + '?'
                for key, value in kwargs.items():
                    print ("%s == %s" %(key, value))
                    fix_target_url += key + '=' + value
        except Exception as xx:
            print('kwargs error: %s ' % str(xx))
            contents = str(xx)
            return contents
        contents = str(request.urlopen(fix_target_url).read().decode("utf-8"))
        print (contents)
    else:
        print('None Url target!')
        contents = None
    return contents

'''
def add_years(d, years):
    """Return a date that's `years` years after the date (or datetime)
    object `d`. Return the same calendar date (month and day) in the
    destination year, if it exists, otherwise use the following day
    (thus changing February 29 to March 1).

    """
    try:
        return d.replace(year = d.year + years)
    except ValueError:
        return d + (date(d.year + years, 1, 1) - date(d.year, 1, 1))

def add_years2(d, years):
    """Return a date that's `years` years after the date (or datetime)
    object `d`. Return the same calendar date (month and day) in the
    destination year, if it exists, otherwise use the following day
    (thus changing February 29 to March 1).

    """
    try:
        new_date = d + relativedelta(years=years)
        return new_date
    except ValueError:
        return d + (date(d.year + years, 1, 1) - date(d.year, 1, 1))

'''

def is_uuid(uuid_to_test, version=4):
    try:
        uuid_obj = UUID(uuid_to_test, version=version)
        return True
    except ValueError:
        return False

def get_last_line_contain_string(FILE_PATH, CONTAIN_STRING):
    f = open(FILE_PATH, "r")
    lines = f.readlines()
    f.close()
    last_line_holder = []
    for line in lines:
        if CONTAIN_STRING in line:
            last_line_holder.append(line)
    print(last_line_holder[-1])
    return last_line_holder[-1]

# def text_to_sound(content, lang='vi'):
#     tts = gTTS(content, lang=lang)
#     file_name = gen_image_id(6) + ".mp3"
#     tts.save(file_name)
#     return file_name
#     #playsound(file_name)