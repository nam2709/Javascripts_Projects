#!/usr/bin/env python
# -*- coding: utf-8 -*-

#
#
# __init__.py
__author__ = 'TND - NGUYEN DUC TAM'
from datetime import date
import json
import base64
from uuid import uuid4 as UUID4
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
from Workspace import tnd_tools as web_tnd_tools


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

    elif action == 'verify-site':
        data_type = all_data['data-type']
        log_write(msg=(str('data_type = %s' % data_type)), request=request, func_name=_getframe().f_code.co_name)
        if data_type == 'uuid':
            try:
                web_uuid = all_data['uuid']
                log_write(msg=(str('web_uuid = %s ' % web_uuid)), request=request,
                          func_name=_getframe().f_code.co_name)
                from FaceAuth.models import Website
                web_obj = Website.objects.get(uuid=web_uuid)
                log_write(msg=(str('web_obj = %s ' % web_obj)), request=request, func_name=_getframe().f_code.co_name)
                if web_obj is None:
                    profile_status = 'Can not found the web_obj!'
                    log_write(msg=(str('Can not found the web_obj!')), request=request,
                              func_name=_getframe().f_code.co_name)
                else:
                    profile_status = web_obj.verify()
                    log_write(msg=(str('profile_status = %s' % profile_status)), request=request,
                              func_name=_getframe().f_code.co_name)
            except Exception as xx:
                try:
                    log_write(msg=(str(str(xx))), request=request, func_name=_getframe().f_code.co_name)
                    profile_status = str('Cannot verify. Error: %s' % str(xx))
                finally:
                    xx = None
                    del xx

    elif action == 'remove-site':
        data_type = all_data['data-type']
        log_write(msg=(str('data_type = %s' % data_type)), request=request, func_name=_getframe().f_code.co_name)
        if data_type == 'uuid':
            try:
                web_uuid = all_data['uuid']
                log_write(msg=(str('web_uuid = %s ' % web_uuid)), request=request,
                          func_name=_getframe().f_code.co_name)
                from FaceAuth.models import Website
                web_obj = Website.objects.filter(uuid=web_uuid, dp_user_tndid=(request.user.tndid)).first()
                if web_obj is not None:
                    print('Remove Site...')
                    print('web_obj.dp_user = %s' % web_obj.dp_user())
                    print('request.user = %s' % request.user)
                    if web_obj.dp_user_tndid == request.user.tndid:
                        web_obj.delete()
                        log_write(msg=(str('Deleted!')), request=request, func_name=_getframe().f_code.co_name)
                    else:
                        log_write(msg=(str('User %s tried remove site %s (account: %s) but have no permission!' % (
                        request.user, web_obj.uuid, web_obj.dp_user))), request=request,
                                  func_name=_getframe().f_code.co_name)
                    profile_status = str('Remove success!')
                else:
                    log_write(msg=(str('Try remove not existing site: %s' % web_uuid)), request=request,
                              func_name=_getframe().f_code.co_name)
            except Exception as xx:
                try:
                    log_write(msg=(str(str(xx))), request=request, func_name=_getframe().f_code.co_name)
                    profile_status = str('Cannot delete. Error: %s' % str(xx))
                finally:
                    xx = None
                    del xx

    elif action == 'gen-secret-token':
        data_type = all_data['data-type']
        log_write(msg=(str('data_type = %s' % data_type)), request=request, func_name=_getframe().f_code.co_name)
        if data_type == 'uuid':
            try:
                web_uuid = all_data['uuid']
                log_write(msg=(str('web_uuid = %s ' % web_uuid)), request=request,
                          func_name=_getframe().f_code.co_name)
                from FaceAuth.models import Website
                web_name = Website.objects.get(uuid=web_uuid)
                log_write(msg=(str('web_name = %s ' % web_name)), request=request,
                          func_name=_getframe().f_code.co_name)
                profile_status = web_name.gen_token(dp_user=(request.user))
                current_user = Account.objects.get(username=(request.user))
                web_user = WebsiteUser()
                web_user.uuid = UUID4()
                web_user.username = current_user.username
                web_user.manager = current_user
                web_user.website = web_name
                web_user.save()
                log_write(msg=(str('web_user.website = %s' % web_user.website)), request=request,
                          func_name=_getframe().f_code.co_name)
                for item in current_user.face_images.all():
                    web_user.face_images.add(item)

                for item in current_user.raw_images.all():
                    web_user.raw_images.add(item)

                for item in current_user.unknown_images.all():
                    web_user.unknown_images.add(item)

                web_user.save()
            except Exception as xx:
                try:
                    log_write(msg=(str(str(xx))), request=request, func_name=_getframe().f_code.co_name)
                    profile_status = str('Cannot verify. Error: %s' % str(xx))
                finally:
                    xx = None
                    del xx

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
    elif action == 'link-website-license':
        website_uuid = all_data['web-uuid']
        license_uuid = all_data['license-uuid']
        user_uuid = all_data['user-uuid']
        from FaceAuth.models import Website
        web_obj = Website.objects.get(uuid=website_uuid)
        if web_obj is not None:
            from Payment.models import License
            License.objects.filter(uuid=license_uuid).update(website=web_obj)
            profile_status = str('Link website done!')
        else:
            log_write(msg=(str('Website is null or not found!')), request=request,
                      func_name=_getframe().f_code.co_name)
            profile_status = str('Can not link license website. Website is null or not found!')
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

    elif action == 'delete-raw-image':
        try:
            raw_image_id = all_data['raw-image-id']
            from FaceAuth.img_models import RawImages
            raw_image_obj = RawImages.objects.filter(id=raw_image_id,
                                                     dp_users_tndid__contains=[current_user.tndid]).first()
            if raw_image_obj is not None:
                raw_image_obj.delete()
                msg = str('Deleted raw image: %s' % raw_image_obj.image.path)
                log_write(msg=msg, request=request, func_name=_getframe().f_code.co_name)
            else:
                alert['level'] = 'warning'
                msg = str('Can not found Raw image id: %s' % raw_image_id)
                log_write(msg=msg, request=request, func_name=_getframe().f_code.co_name)
        except Exception as xx:
            try:
                msg = str('Failed to delete Raw Image! Exception: %s' % str(xx))
                alert['level'] = 'error'
                log_write(msg=msg, request=request, func_name=_getframe().f_code.co_name)
            finally:
                xx = None
                del xx

        alert['message'] = msg
    elif action == 'delete-face-image':
        try:
            image_id = all_data['face-image-id']
            from FaceAuth.img_models import FaceImages
            image_obj = FaceImages.objects.filter(id=image_id).first()
            if image_obj is not None:
                image_obj.delete()
                msg = str('Deleted face image: %s' % image_obj.face_image.path)
                log_write(msg=msg, request=request, func_name=_getframe().f_code.co_name)
            else:
                alert['level'] = 'warning'
                log_write(msg=(str('Can not found Raw image id: %s' % image_id)), request=request,
                          func_name=_getframe().f_code.co_name)
        except Exception as xx:
            try:
                msg = str('Failed to delete Face Image! Exception: %s' % str(xx))
                alert['level'] = 'error'
                log_write(msg=(str('Failed to delete Face Image! Exception: %s' % str(xx))), request=request,
                          func_name=_getframe().f_code.co_name)
            finally:
                xx = None
                del xx

        alert['message'] = msg
    elif action == 'link-face-image':
        try:
            user_uuid = all_data['user_uuid']
            user_type = all_data['user_type']
            u_user_obj = None
            image_id = all_data['face-image-id']
            from FaceAuth.img_models import FaceImages
            image_obj = FaceImages.objects.filter(id=image_id).first()
            if image_obj is not None:
                if user_type == 'person':
                    from FaceAuth.models import Person
                    u_user_obj = Person.objects.filter(uuid=user_uuid).first()
                    image_obj.persons = u_user_obj
                    msg = str('Linked face image: %s to (%s)' % (image_obj.face_image.path, u_user_obj.name))
                elif user_type == 'user':
                    u_user_obj = Account.objects.filter(uuid=user_uuid).first()
                    image_obj.dp_user_tndid = u_user_obj.tndid
                    msg = str('Linked face image: %s to (%s)' % (image_obj.face_image.path, u_user_obj.username))
                elif user_type == 'web_user':
                    from FaceAuth.models import WebsiteUser
                    u_user_obj = WebsiteUser.objects.filter(uuid=user_uuid).first()
                    image_obj.web_user = u_user_obj
                    msg = str('Linked face image: %s to (%s)' % (image_obj.face_image.path, u_user_obj.username))
                super(FaceImages, image_obj).save()
                log_write(msg=msg, request=request, func_name=_getframe().f_code.co_name)
            else:
                alert['level'] = 'warning'
                log_write(msg=(str('Can not found Face image id: %s' % image_id)), request=request,
                          func_name=_getframe().f_code.co_name)
        except Exception as xx:
            try:
                msg = str('Failed to Link Face Image! Exception: %s' % str(xx))
                alert['level'] = 'error'
                log_write(msg=(str('Failed to Face Face Image! Exception: %s' % str(xx))), request=request,
                          func_name=_getframe().f_code.co_name)
            finally:
                xx = None
                del xx

        alert['message'] = msg
    elif action == 'remove-related-face-image':
        try:
            user_uuid = all_data['user_uuid']
            user_type = all_data['user_type']
            u_user_obj = None
            image_id = all_data['face-image-id']
            from FaceAuth.img_models import FaceImages
            image_obj = FaceImages.objects.filter(id=image_id).first()
            if image_obj is not None:
                raw_image_obj = image_obj.sources
                if raw_image_obj is not None:
                    check_owner = False
                    if user_type == 'person':
                        from FaceAuth.models import Person
                        u_user_obj = Person.objects.filter(uuid=user_uuid).first()
                        if u_user_obj in raw_image_obj.persons.all():
                            check_owner = True
                    elif user_type == 'user':
                        u_user_obj = Account.objects.filter(uuid=user_uuid).first()
                        if u_user_obj in raw_image_obj.dp_users():
                            check_owner = True
                    elif user_type == 'web_user':
                        from FaceAuth.models import WebsiteUser
                        u_user_obj = WebsiteUser.objects.filter(uuid=user_uuid).first()
                        if u_user_obj in raw_image_obj.web_user.all():
                            check_owner = True
                    if check_owner == True:
                        image_obj.delete()
                        msg = str('Removed Face Image! Success! %s' % image_id)
                        alert['level'] = 'success'
                        alert['message'] = msg
                        log_write(msg=msg, request=request, func_name=_getframe().f_code.co_name)
                    else:
                        msg = str('Failed to Link Face Image! Error: Onwer permission!')
                        alert['level'] = 'failed'
                        alert['message'] = msg
                        log_write(msg=msg, request=request, func_name=_getframe().f_code.co_name)
            else:
                msg = str('Can not found Face image id: %s' % image_id)
                alert['level'] = 'warning'
                alert['message'] = msg
                log_write(msg=msg, request=request, func_name=_getframe().f_code.co_name)
        except Exception as xx:
            try:
                msg = str('Failed to Link Face Image! Exception: %s' % str(xx))
                alert['level'] = 'error'
                alert['message'] = msg
                log_write(msg=msg, request=request, func_name=_getframe().f_code.co_name)
            finally:
                xx = None
                del xx

        alert['message'] = msg
    elif action == 'account-add-image-from-webcam':
        print('Start...')
        all_files = request.FILES.getlist('webcam')
        print('all_files = %s' % str(all_files))
        response['data']['raw_images'] = []
        response['data']['face_images'] = []
        if len(all_files) == 0:
            msg = str('Can not get any image files!')
            alert['message'] = msg
            response['data']['reason'] = 'Can not get any image files!'
            alert['level'] = 'error'
            response['data']['alerts'].append(alert)
            return response
        for f in request.FILES.getlist('webcam'):
            try:
                name, ext = os.path.splitext(f.name)
                local_file = str('%s-raw-image-%s%s' % (
                    name,
                    tnd_tools.gen_image_id(6),
                    ext))
                log_write(msg=(str('local_file = %s' % local_file)), request=request,
                          func_name=_getframe().f_code.co_name)
                with open(local_file, 'wb+') as destination:
                    for chunk in f.chunks():
                        destination.write(chunk)

                log_write(msg=(str('Save successfull!')), request=request, func_name=_getframe().f_code.co_name)
                md5sum = tnd_tools.md5(local_file)
                log_write(msg=(str('md5sum = %s' % md5sum)), request=request, func_name=_getframe().f_code.co_name)
                from FaceAuth.img_models import RawImages
                counter = RawImages.objects.filter(md5sum=md5sum)
                if counter.count() == 0:
                    uuid = UUID4()
                    obj = RawImages(uuid=uuid, name=uuid,
                                    image=(ImageFile(open(local_file, 'rb'))),
                                    md5sum=md5sum)
                    obj.dp_user_tndid = request.user.tndid
                    obj.dp_users_tndid = []
                    obj.dp_users_tndid.append(user_obj.tndid)
                    super(RawImages, obj).save()
                    try:
                        os.system('rm -f "%s"' % local_file)
                        msg = str('Removed local_file: %s' % local_file)
                        print(msg)
                        log_write(msg=msg, request=request, func_name=_getframe().f_code.co_name)
                        msg = str('Add raw image done! File: %s' % obj.image.url)
                    except Exception as rx:
                        try:
                            msg = str('Can not remove temp raw image: %s' % local_file)
                        finally:
                            rx = None
                            del rx

                    alert['message'] = msg
                    response['data']['alerts'].append(alert)
                    log_write(msg=(str('Save raw image to DB successfull!')), request=request,
                              func_name=_getframe().f_code.co_name)
                    log_write(msg=(str('Add raw Image successfull!')), request=request,
                              func_name=_getframe().f_code.co_name)
                    try:
                        face_image_objs = obj.extract_faces()
                        face_num = len(face_image_objs)
                        if face_num == 0:
                            obj.delete()
                            msg = str('Can not extract face from uploaded image!')
                            alert['message'] = msg
                            response['data']['alerts'].append(alert)
                            response['status'] = 'warning'
                        else:
                            for face_obj in face_image_objs:
                                msg = str('Add Face Image successfull! Face Number = %s' % face_num)
                                alert['message'] = msg
                                response['data']['alerts'].append(alert)
                                response['data']['face_images'].append(
                                    {'id': str(face_obj.id), 'url': face_obj.face_image.url})

                            log_write(msg=(str('face_num = %s' % face_num)), request=request,
                                      func_name=_getframe().f_code.co_name)
                            response['status'] = 'success'
                            response['data']['raw_images'].append({'id': str(obj.id), 'url': obj.image.url})
                    except Exception as exx:
                        try:
                            msg = str('Can not extract face image! Error: %s' % str(exx))
                            alert['message'] = msg
                            alert['level'] = 'error'
                            response['status'] = 'error'
                            response['data']['alerts'].append(alert)
                            log_write(level='ERROR', msg=(str(str(exx))), request=request,
                                      func_name=_getframe().f_code.co_name)
                            response['data']['reason'] = 'Can not extract face from upload image!'
                        finally:
                            exx = None
                            del exx

                    alert['message'] = msg
                    if face_num == 0:
                        alert['level'] = 'WARNING'
                    response['data']['alerts'].append(alert)
                    log_write(msg=msg, request=request, func_name=_getframe().f_code.co_name)
                    response['data']['reason'] = 'Add Face Image Done!'
                else:
                    msg = 'Image dupplicated!'
                    response['data']['reason'] = msg
                    alert['message'] = msg
                    alert['level'] = 'error'
                    response['data']['alerts'].append(alert)
                    log_write(msg=msg, request=request, func_name=_getframe().f_code.co_name)
            except Exception as ex:
                try:
                    msg = str('Can not save file! Error: %s' % str(ex))
                    response['data']['reason'] = msg
                    alert['message'] = msg
                    alert['level'] = 'error'
                    response['data']['alerts'].append(alert)
                    log_write(msg=msg, request=request, func_name=_getframe().f_code.co_name)
                finally:
                    ex = None
                    del ex

    elif action == 'post-user-image-data':
        user_uuid = all_data['user_uuid']
        user_type = all_data['user_type']
        u_user_obj = None
        if user_type == 'person':
            from FaceAuth.models import Person
            u_user_obj = Person.objects.filter(uuid=user_uuid).first()
        elif user_type == 'user':
            u_user_obj = Account.objects.filter(uuid=user_uuid).first()
        elif user_type == 'web_user':
            from FaceAuth.models import WebsiteUser
            u_user_obj = WebsiteUser.objects.filter(uuid=user_uuid).first()
        if u_user_obj is None:
            msg = str('Can not found u_user_obj for uuid %s (user_type: %s)!' % (user_uuid, user_type))
            response['status'] = {'code': '1', 'info': msg}
            log_write(msg=msg, request=request, func_name=_getframe().f_code.co_name)
        else:
            image_string = all_data['img']
            image_string_fix = str(image_string).replace('data:image/png;base64,', '').replace(' ', '+')
            image_data = base64.b64decode(image_string_fix)
            response['data']['raw_images'] = []
            response['data']['face_images'] = []
            name, ext = os.path.splitext(str('%s.%s' % (tnd_tools.gen_image_id(33), 'png')))
            today = date.today()
            year = today.strftime('%Y')
            month = today.strftime('%m')
            day = today.strftime('%d')
            DIR = str('website-raw-images/%s/%s/%s' % (
                year,
                month,
                day))
            if not os.path.exists(DIR):
                os.makedirs(DIR)
            local_file = str('%s-raw-image-%s%s' % (
                name,
                tnd_tools.gen_image_id(6),
                ext))
            log_write(msg=(str('local_file = %s' % local_file)), request=request,
                      func_name=_getframe().f_code.co_name)
            with open(local_file, 'wb+') as destination:
                destination.write(image_data)
            msg = str('Save successfull! File: %s' % local_file)
            log_write(msg=msg, request=request, func_name=_getframe().f_code.co_name)
            status, raw_obj, face_objs = u_user_obj.add_raw_image(local_file=local_file)
            response['status'] = status
            response['data']['raw_images'].append({'id': str(raw_obj.uuid), 'url': raw_obj.image.url})
            for f in face_objs:
                response['data']['face_images'].append({'id': str(f.uuid), 'url': f.face_image.url})

            print(str(raw_obj.name))
        return response
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
