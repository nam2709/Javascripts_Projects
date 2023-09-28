__author__ = 'root'
import sys
import os
from datetime import date

import redis
from django.conf import settings
from django.contrib.sessions.models import Session


def get_username_from_session(session_key):
    user = None
    from Account.models import Account
    # Nếu quản lý session trên db
    if settings.REDIS_SESSION_CACHE_MODE is False:
        try:
            session = Session.objects.get(session_key=session_key)
            session_data = session.get_decoded()
            #print('session_data = %s' % session_data)
            uid = session_data.get('_auth_user_id')
            user = Account.objects.filter(id=uid).first()
        except Exception as xx:
            msg = str('Session: %s Error get username from db: %s' % (session_key, str(xx)))
            print(msg)
    else:
        try:
            r = redis.StrictRedis(host=settings.REDIS_CACHE_HOST,
                                  port=settings.REDIS_CACHE_PORT,
                                  password=settings.REDIS_CACHE_PASSWORD,
                                  db=settings.REDIS_CACHE_DB_NO)
            for key in r.scan_iter(str("*%s" % session_key)):
                uid = int(str(key).split(":")[1])
                print('uid = %s' % str(uid))
                user = Account.objects.filter(id=uid).first()
                if user is not None:
                    print('session username = %s' % user.username)
                    break
                else:
                    print('user is None...')
        except Exception as xx:
            msg = str('Session: %s Error get username from Redis: %s' % (session_key, str(xx)))
            print(msg)
    if user is not None:
        print('session username = %s' % user.username)
        return user.username
    else:
        return None

def get_user_from_session(session_key):
    user = None
    from Account.models import Account
    # Nếu quản lý session trên db
    if settings.REDIS_SESSION_CACHE_MODE is False:
        try:
            session = Session.objects.get(session_key=session_key)
            session_data = session.get_decoded()
            #print('session_data = %s' % session_data)
            uid = session_data.get('_auth_user_id')
            user = Account.objects.filter(id=uid).first()
        except Exception as xx:
            msg = str('Session: %s Error get username from db: %s' % (session_key, str(xx)))
            print(msg)
    else:
        try:
            r = redis.StrictRedis(host=settings.REDIS_CACHE_HOST,
                                  port=settings.REDIS_CACHE_PORT,
                                  password=settings.REDIS_CACHE_PASSWORD,
                                  db=settings.REDIS_CACHE_DB_NO)
            for key in r.scan_iter(str("*%s" % session_key)):
                uid = int(str(key).split(":")[1])
                print('uid = %s' % uid)
                user = Account.objects.filter(id=uid).first()
                break
        except Exception as xx:
            msg = str('Session: %s Error get username from Redis: %s' % (session_key, str(xx)))
            print(msg)
    if user is not None:
        print('session username = %s' % user.username)
        return user
    else:
        return None

def myfunc():
   return(sys._getframe().f_code.co_name)

def create_image_dir(subdir="face-unknown-images"):
    today = date.today()
    year = today.strftime("%Y")
    month = today.strftime("%m")
    day = today.strftime("%d")

    DIR = str('%s/%s/%s/%s'
                     %
                     (subdir,
                      year,
                      month,
                      day))
    if not os.path.exists(DIR):
        try:
            os.makedirs(DIR)
        except Exception as xx:
            print('Can not create create_image_dir: %s ERROR: %s' % (DIR, str(xx)))
            return None
    return(DIR)