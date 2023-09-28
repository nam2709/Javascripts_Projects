#!/usr/bin/env python
# -*- coding: utf-8 -*-

#
#
# __init__.py
__author__ = 'TND - NGUYEN DUC TAM'

#####################
# TAMND <DUCTAMBKA@GMAIL.COM>
################################
################################
################################
################################
################################
__author__ = 'root'
import os
import re
from sys import _getframe
from datetime import date
from datetime import datetime as dtime

from django.contrib.auth import authenticate
from django.http import HttpResponseRedirect
from django.conf import settings
from django.core.files.images import ImageFile

from Logger.admin import log_write
from Tools import tnd_tools
from Account.models import *


def process_post(request, slug=None):
    all_data = request.POST
    context = {}
    context['alerts'] = []
    if request.user.is_authenticated:
        if request.user.is_superuser and slug is not None:
            checker = Account.objects.filter(username=slug).first()
        else:
            checker = Account.objects.filter(username=(request.user)).first()
        if checker is not None:
            current_user = checker
            action = all_data['action']
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

        else:
            pass

        if action == 'change-profile':
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
                        today = date.today()
                        year = today.strftime('%Y')
                        month = today.strftime('%m')
                        day = today.strftime('%d')
                        DIR = str('avatar-images/%s/%s/%s' % (
                            year,
                            month,
                            day))
                        if not os.path.exists(DIR):
                            os.makedirs(DIR)
                        local_file = str('%s/%s-avatar-%s%s' % (
                            DIR,
                            name,
                            tnd_tools.gen_image_id(6),
                            ext))
                        log_write(msg=(str('local_file = %s' % local_file)), request=request,
                                  func_name=_getframe().f_code.co_name)
                        with open(local_file, 'wb+') as destination:
                            for chunk in f.chunks():
                                destination.write(chunk)

                        log_write(msg=(str('Save successfull!')), request=request,
                                  func_name=_getframe().f_code.co_name)
                        avatar_file = ImageFile(open(local_file, 'rb'))
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
                context['alerts'].append({'level': 'info', 'message': str('Update Profile success!')})
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
                        # return HttpResponseRedirect('Account:Signin')
                else:
                    change_status = 'Repassword and new password are not the same!'
                    log_write(msg=(str(change_status)), request=request, func_name=_getframe().f_code.co_name)
            else:
                return HttpResponseRedirect('Account:Signin')
            return HttpResponseRedirect('Account:Signin')

        elif action == 'change-profile-detail':
            try:
                print("all_data = %s" % all_data)
                new_language = all_data['language']
                new_timezone = all_data['timezone']
                new_template = all_data['website_template']
                template_obj = WebsiteTemplate.objects.filter(name=new_template).first()
                if template_obj is None:
                    template_obj = WebsiteTemplate.objects.filter(name='default').first()
                current_user.language = new_language
                current_user.timezone = new_timezone
                current_user.website_template = template_obj

                super(Account, current_user).save()
                log_write(msg=(str('Update language and timezone Done!')), request=request,
                          func_name=_getframe().f_code.co_name)
            except Exception as xx:
                try:
                    print(str(xx))
                    log_write(msg=(str('Update language and timezone Failed! Exception: %s' % str(xx))),
                              request=request, func_name=_getframe().f_code.co_name)
                except Exception as xx:
                    print(str(xx))
            finally:
                xx = None
                del xx
        elif action=='change-all-profile-detail':

            first_name = ''
            full_name = ''
            phone_number = ''
            dob = ''
            log_by_face_checkbox = False
            if 'first-name' in all_data:
                first_name = all_data['first-name']
            if 'full-name' in all_data:
                full_name = all_data['full-name']
            if 'phone_number' in all_data:
                phone_number = all_data['phone_number']
            if 'date_of_birth' in all_data:
                # dob = all_data['date_of_birth']
                bod_list = re.split(r'[\-|/%&!.]', all_data['date_of_birth'])
                try:
                    if len(bod_list) == 3:
                        if len(bod_list[-2])==1:
                            bod_list[-2] = '0' + str(bod_list[-2])
                        if len(bod_list[-3])==1:
                            bod_list[-3] = '0' + str(bod_list[-3])
                        bod_str = str(bod_list[-3]) + '/' + str(bod_list[-2]) + '/' + str(bod_list[-1])
                    elif len(bod_list) == 2:
                        if len(bod_list[-2])==1:
                            bod_list[-2] = '0' + str(bod_list[-2])
                        bod_str = '01' + '/' + str(bod_list[-2]) + '/' + str(bod_list[-1])
                    dob = dtime.strptime(bod_str, '%d/%m/%Y')
                except Exception as xx:
                    dob = ''
                    print(xx)
            if 'log-by-face-mode' in all_data:
                log_by_face_checkbox = all_data['log-by-face-mode']

            log_by_face = False
            if log_by_face_checkbox=='True':
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
                        today = date.today()
                        year = today.strftime('%Y')
                        month = today.strftime('%m')
                        day = today.strftime('%d')
                        DIR = str('avatar-images/%s/%s/%s' % (
                            year,
                            month,
                            day))
                        if not os.path.exists(DIR):
                            os.makedirs(DIR)
                        local_file = str('%s/%s-avatar-%s%s' % (
                            DIR,
                            name,
                            tnd_tools.gen_image_id(6),
                            ext))
                        log_write(msg=(str('local_file = %s' % local_file)), request=request,
                            func_name=_getframe().f_code.co_name)
                        with open(local_file, 'wb+') as destination:
                            for chunk in f.chunks():
                                destination.write(chunk)

                        log_write(msg=(str('Save successfull!')), request=request,
                            func_name=_getframe().f_code.co_name)
                        avatar_file = ImageFile(open(local_file, 'rb'))
                    except Exception as rx:
                        try:
                            print(str(rx))
                        finally:
                            rx = None
                            del rx

            try:
                current_user.first_name = first_name
                current_user.full_name = full_name
                current_user.telephone = phone_number
                if dob != '':
                    current_user.date_of_birth = dob
                current_user.log_by_face = log_by_face
                if avatar_file is not None:
                    current_user.avatar = avatar_file
                current_user.save()
                context['alerts'].append({'level': 'info', 'message': str('Update Profile success!')})
            except Exception as xx:
                try:
                    log_write(msg=(str(str(xx))), request=request, func_name=_getframe().f_code.co_name)
                    profile_status = str('Cannot update profile. Error: %s' % str(xx))
                finally:
                    xx = None
                    del xx
            try:
                print("all_data = %s" % all_data)
                new_language = ''
                new_timezone = ''
                new_template = ''

                if 'language' in all_data:
                    new_language = all_data['language']
                if 'timezone' in all_data:
                    new_timezone = all_data['timezone']
                if 'website_template' in all_data:
                    new_template = all_data['website_template']

                template_obj = WebsiteTemplate.objects.filter(name=new_template).first()
                if template_obj is None:
                    template_obj = WebsiteTemplate.objects.filter(name='default').first()
                current_user.language = new_language
                current_user.timezone = new_timezone
                current_user.website_template = template_obj

                super(Account, current_user).save()
                log_write(msg=(str('Update language and timezone Done!')), request=request,
                    func_name=_getframe().f_code.co_name)
            except Exception as xx:
                try:
                    print(str(xx))
                    log_write(msg=(str('Update language and timezone Failed! Exception: %s' % str(xx))),
                        request=request, func_name=_getframe().f_code.co_name)
                except Exception as xx:
                    print(str(xx))
            finally:
                xx = None
                del xx
    else:
        return HttpResponseRedirect('Account:Signin')


def process_get(request, slug=None):
    all_data = request.POST
    context = {}
    context['alerts'] = []
    if request.user.is_authenticated:
        if request.user.is_superuser and slug is not None:
            checker = Account.objects.filter(username=slug).first()
        else:
            checker = Account.objects.filter(username=(request.user)).first()
        if checker is not None:
            current_user = checker
            action = all_data['action']
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

        else:
            pass


        if action == 'change-profile':
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
                        today = date.today()
                        year = today.strftime('%Y')
                        month = today.strftime('%m')
                        day = today.strftime('%d')
                        DIR = str('avatar-images/%s/%s/%s' % (
                            year,
                            month,
                            day))
                        if not os.path.exists(DIR):
                            os.makedirs(DIR)
                        local_file = str('%s/%s-avatar-%s%s' % (
                            DIR,
                            name,
                            tnd_tools.gen_image_id(6),
                            ext))
                        log_write(msg=(str('local_file = %s' % local_file)), request=request,
                                  func_name=_getframe().f_code.co_name)
                        with open(local_file, 'wb+') as destination:
                            for chunk in f.chunks():
                                destination.write(chunk)

                        log_write(msg=(str('Save successfull!')), request=request,
                                  func_name=_getframe().f_code.co_name)
                        avatar_file = ImageFile(open(local_file, 'rb'))
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
                context['alerts'].append({'level': 'info', 'message': str('Update Profile success!')})
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
                    log_write(msg=(str('Update language and timezone Failed! Exception: %s' % str(xx))),
                              request=request, func_name=_getframe().f_code.co_name)
                finally:
                    xx = None
                    del xx

    else:
        return HttpResponseRedirect('Account:Signin')

################################
