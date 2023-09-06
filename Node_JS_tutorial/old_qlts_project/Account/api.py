#!/usr/bin/env python
# -*- coding: utf-8 -*-

#
#
# __init__.py
__author__ = 'TND - NGUYEN DUC TAM'
import json
from sys import _getframe
import os

from django.http import HttpResponse
from django.contrib.auth import authenticate
from django.views.decorators.csrf import csrf_exempt
from django.http import HttpResponseRedirect
from django.core.files.images import ImageFile
from django.conf import settings

from Logger.admin import log_write
from Tools import tnd_tools
from Account.models import Account
# from Workspace import tnd_tools as web_tnd_tools


@csrf_exempt
def AccountApiView(request):
    current_dir = os.getcwd()
    os.chdir(settings.MEDIA_ROOT)
    response = {}
    response['status'] = 'Failed'
    response['data'] = {}
    response['data']['reason'] = None
    response['data']['alerts'] = None
    if request.method == 'POST':
        try:
            new_response = api_process_post(request)
        except Exception as xx:
            try:
                print(str(xx))
            finally:
                xx = None
                del xx

    else:
        try:
            new_response = api_process_get(request)
        except Exception as xx:
            try:
                print(str(xx))
            finally:
                xx = None
                del xx

    print('new_response = %s' % new_response)
    response.update(new_response)
    result = HttpResponse((json.dumps(response)), content_type='application/json')
    os.chdir(current_dir)
    return result


def api_process_post(request):
    response = {}
    response['status'] = 'Failed'
    response['data'] = {}
    response['data']['code'] = None
    response['data']['reason'] = None
    response['data']['alerts'] = []
    alert = {}
    alert['level'] = 'info'
    alert['message'] = None
    all_data = request.POST
    print('all_data = %s' % all_data)
    try:
        session_key = all_data['session_id']
    except Exception as xx:
        try:
            msg = str('Error while get session_id from Post: %s' % str(xx))
            alert['message'] = msg
            alert['level'] = 'warning'
            log_write(msg=msg, request=request, func_name=_getframe().f_code.co_name)
            response['data']['alerts'].append(alert)
            try:
                session_key = request.GET['session_id']
            except Exception as rx:
                try:
                    msg = str('Error while get session_id from Get: %s' % str(rx))
                    alert['message'] = msg
                    alert['level'] = 'error'
                    log_write(msg=msg, request=request, func_name=_getframe().f_code.co_name)
                    response['data']['alerts'].append(alert)
                    return response
                finally:
                    rx = None
                    del rx

        finally:
            xx = None
            del xx

    print('session_key = %s' % session_key)
    try:
        action = all_data['action']
    except Exception as xx:
        try:
            msg = str('Error while get action from Post: %s' % str(xx))
            alert['message'] = msg
            alert['level'] = 'warning'
            log_write(msg=msg, request=request, func_name=_getframe().f_code.co_name)
            response['data']['alerts'].append(alert)
            try:
                action = request.GET['action']
            except Exception as rx:
                try:
                    msg = str('Error while get action from Get: %s' % str(rx))
                    alert['message'] = msg
                    alert['level'] = 'error'
                    log_write(msg=msg, request=request, func_name=_getframe().f_code.co_name)
                    response['data']['alerts'].append(alert)
                    return response
                finally:
                    rx = None
                    del rx

        finally:
            xx = None
            del xx

    print('action = %s' % action)
    user_obj = web_tnd_tools.get_user_from_session(session_key)
    if user_obj is None:
        msg = str('Can not found user_obj for session_key: %s' % session_key)
        alert['message'] = msg
        alert['level'] = 'error'
        log_write(msg=msg, request=request, func_name=_getframe().f_code.co_name)
        response['data']['alerts'].append(alert)
        return response
    print('user_obj = %s' % user_obj.username)
    current_user = user_obj
    log_write(msg=(str('action = %s' % action)), request=request, func_name=_getframe().f_code.co_name)
    if action == 'add-site':
        url = all_data['site-url']
        log_write(msg=(str('url = %s' % url)), request=request, func_name=_getframe().f_code.co_name)
        try:
            profile_status = current_user.add_website(url)
        except Exception as px:
            try:
                profile_status = str('Cannot add website. Error: %s' % str(px))
                log_write(msg=(str(profile_status)), request=request, func_name=_getframe().f_code.co_name)
            finally:
                px = None
                del px

    elif action == 'change-profile':
        first_name = all_data['first-name']
        last_name = all_data['last-name']
        phone_number = all_data['phone_number']
        log_by_face_checkbox = all_data['log-by-face-mode']
        log_by_face = False
        if log_by_face_checkbox == 'True':
            log_by_face = True
        current_user = Account.objects.get(username=(request.user))
        avatar_file = None
        print(request.FILES)
        if request.FILES:
            current_dir = os.getcwd()
            log_write(msg=(str('current_dir = %s' % current_dir)), request=request,
                      func_name=_getframe().f_code.co_name)
            os.chdir(settings.MEDIA_ROOT)
            for f in request.FILES.getlist('avatar-file-upload'):
                try:
                    name, ext = os.path.splitext(f.name)
                    print(name)
                    local_file = str('%s-avatar-%s%s' % (
                        name,
                        tnd_tools.gen_image_id(6),
                        ext))
                    log_write(msg=(str('local_file = %s' % local_file)), request=request,
                              func_name=_getframe().f_code.co_name)
                    with open(local_file, 'wb+') as destination:
                        for chunk in f.chunks():
                            destination.write(chunk)

                    log_write(msg=(str('Save successfull!')), request=request, func_name=_getframe().f_code.co_name)
                    avatar_file = ImageFile(open(local_file, 'rb'))
                    try:
                        os.system('rm -f "%s"' % local_file)
                    except Exception as xx:
                        try:
                            print(str(xx))
                        finally:
                            xx = None
                            del xx

                except Exception as rx:
                    try:
                        print(str(rx))
                    finally:
                        rx = None
                        del rx

        try:
            current_user.first_name = first_name
            current_user.last_name = last_name
            current_user.telephone = phone_number
            current_user.log_by_face = log_by_face
            if avatar_file is not None:
                current_user.avatar = avatar_file
            current_user.save()
            response['alerts'].append({'level': 'info', 'message': str('Update Profile success!')})
        except Exception as xx:
            try:
                log_write(msg=(str(str(xx))), request=request, func_name=_getframe().f_code.co_name)
                profile_status = str('Cannot update profile. Error: %s' % str(xx))
            finally:
                xx = None
                del xx

    elif action == 'change-password-action':
        if request.user.is_authenticated:
            current_password = all_data['current_passwd']
            new_password = all_data['new_password']
            new_repasswd = all_data['new_repasswd']
            if new_password == new_repasswd:
                checker = Account.objects.filter(username=(request.user))
                if checker.count() == 0:
                    change_status = 'User is not existed! May be fake!'
                    log_write(msg=(str(change_status)), request=request, func_name=_getframe().f_code.co_name)
                else:
                    current_user = checker[0]
                    user = authenticate(username=(current_user.username), password=current_password)
                    if user is None:
                        change_status = 'Wrong current password!'
                        log_write(msg=(str(change_status)), request=request, func_name=_getframe().f_code.co_name)
                    else:
                        change_status = 'Let wait for change password!'
                        log_write(msg=(str(change_status)), request=request, func_name=_getframe().f_code.co_name)
            else:
                change_status = 'Repassword and new password are not the same!'
                log_write(msg=(str(change_status)), request=request, func_name=_getframe().f_code.co_name)
        else:
            return HttpResponseRedirect('Account:Signin')

    elif action == 'change-profile-detail':
        try:
            new_language = all_data['language']
            new_timezone = all_data['timezone']
            current_user.language = new_language
            current_user.timezone = new_timezone
            super(Account, current_user).save()
            log_write(msg=(str('Update language and timezone Done!')), request=request,
                      func_name=_getframe().f_code.co_name)
        except Exception as xx:
            try:
                log_write(msg=(str('Update language and timezone Failed! Exception: %s' % str(xx))), request=request,
                          func_name=_getframe().f_code.co_name)
            finally:
                xx = None
                del xx


    if len(response['data']['alerts']) == 0:
        response['data']['alerts'].append(alert)
    return response


def api_process_get(request):
    response = {}
    response['status'] = 'Failed'
    response['data'] = {}
    response['data']['reason'] = None
    response['data']['alerts'] = None
    all_data = request.GET
    session_key = all_data['session_key']
    user_obj = web_tnd_tools.get_user_from_session(session_key)
