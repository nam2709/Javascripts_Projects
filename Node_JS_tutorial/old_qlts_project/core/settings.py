"""
Django settings for core project.

Generated by 'django-admin startproject' using Django 4.1.2.

For more information on this file, see
https://docs.djangoproject.com/en/4.1/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/4.1/ref/settings/
"""

import os, random, string
from pathlib import Path
from dotenv import load_dotenv
from os import environ
load_dotenv()  # take environment variables from .env.

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent

# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/4.1/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = os.environ.get('SECRET_KEY')
if not SECRET_KEY:
    SECRET_KEY = ''.join(random.choice( string.ascii_lowercase  ) for i in range( 32 ))

# Render Deployment Code
# DEBUG = 'RENDER' not in os.environ
DEBUG = True
ALLOWED_HOSTS = ['*',]

RENDER_EXTERNAL_HOSTNAME = os.environ.get('RENDER_EXTERNAL_HOSTNAME')
if RENDER_EXTERNAL_HOSTNAME:    
    ALLOWED_HOSTS.append(RENDER_EXTERNAL_HOSTNAME)

# Application definition

INSTALLED_APPS = [
    # 'admin_argon.apps.AdminArgonConfig',
    'admin_argon',
    'apscheduler',
    'Portal',
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    'django.contrib.sites',
    "rest_framework",
    'rest_framework.authtoken',
    'oauth2_provider',
    'rest_framework_simplejwt.token_blacklist',
    'social_django',
    'django.contrib.humanize',
    'rest_framework_social_oauth2',
    "Logger",
    "Account",
    "home",
    'django_filters',
    'multiselectfield',
    #namnh
    "Depreciation",
    'Code',
    #duydv,
    'AssetManagement',
    # dohoang
    'FormManagement',
    #khuong
    "company",
    'Perm',
    'SystemGeneralDirectoryManagement',
    # luongpv
    'ProposalForm',
]
REST_FRAMEWORK = {
    # Use Django's standard `django.contrib.auth` permissions,
    # or allow read-only access for unauthenticated users.
    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.DjangoModelPermissionsOrAnonReadOnly'
    ]
}
LOGIN_URL = "/Account/signin/"
ENABLE_RESTFUL_API = True
if environ.get('MPS_HR360_ENABLE_RESTFUL_API') is not None:
    ENABLE_RESTFUL_API = environ.get('MPS_HR360_ENABLE_RESTFUL_API')
SITE_ID=2
MIDDLEWARE = [
    "django.middleware.security.SecurityMiddleware",
    "whitenoise.middleware.WhiteNoiseMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
]

ROOT_URLCONF = "core.urls"

# HOME_TEMPLATES = os.path.join(BASE_DIR, 'home', 'templates')

# REST_FRAMEWORK = {
#     'DEFAULT_PAGINATION_CLASS': 'rest_framework.pagination.PageNumberPagination',
#     'PAGE_SIZE': 5
# }

# REST_FRAMEWORK = {
#     'DEFAULT_FILTER_BACKENDS': ['django_filters.rest_framework.DjangoFilterBackend'],
#     'DEFAULT_PAGINATION_CLASS': 'rest_framework.pagination.PageNumberPagination',
#     'PAGE_SIZE': 10
# }

TEMPLATE_DIRS = [
    os.path.join(BASE_DIR, 'core/templates'),
    os.path.join(BASE_DIR, 'home/templates'),
    os.path.join(BASE_DIR, 'Portal/templates'),
    os.path.join(BASE_DIR, 'Account/templates'),
    os.path.join(BASE_DIR, 'admin_argon/templates'),
    os.path.join(BASE_DIR, 'AssetManagement/templates'),
    os.path.join(BASE_DIR, 'company/templates'),
    os.path.join(BASE_DIR, 'Depreciation/templates'),
    os.path.join(BASE_DIR, 'FormManagement/templates'),
    os.path.join(BASE_DIR, 'Perm/templates'),
    os.path.join(BASE_DIR, 'Workspace/templates'),
]

STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')
STATIC_URL = '/static/'

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": TEMPLATE_DIRS,
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.debug",
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]

WSGI_APPLICATION = "core.wsgi.application"

REST_FRAMEWORK = {
    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.DjangoModelPermissionsOrAnonReadOnly'
    ],
    'DEFAULT_FILTER_BACKENDS': ['django_filters.rest_framework.DjangoFilterBackend'],

    'DEFAULT_PAGINATION_CLASS': 'rest_framework.pagination.PageNumberPagination',
    'PAGE_SIZE': 10000
}


# Database
# https://docs.djangoproject.com/en/4.1/ref/settings/#databases

DB_ENGINE   = os.getenv('MPS_QLTS_DB_ENGINE'   , None)
DB_USERNAME = os.getenv('MPS_QLTS_DB_USER' , None)
DB_PASS     = os.getenv('MPS_QLTS_DB_PASSWORD'     , None)
DB_HOST     = os.getenv('MPS_QLTS_DB_HOST'     , None)
DB_PORT     = os.getenv('MPS_QLTS_DB_PORT'     , None)
DB_NAME     = os.getenv('MPS_QLTS_DB_NAME'     , None)

if DB_NAME and DB_USERNAME:
    DATABASES = { 
      'default': {
        'ENGINE'  : 'django.db.backends.postgresql_psycopg2',
        'NAME'    : DB_NAME,
        'USER'    : DB_USERNAME,
        'PASSWORD': DB_PASS,
        'HOST'    : DB_HOST,
        'PORT'    : DB_PORT,
        }, 
    }
else:
    DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.sqlite3',
            'NAME': 'db.sqlite3',
        }
    }
# print(DB_HOST)
# print("DB_HOST: ", DB_HOST)
# Password validation
# https://docs.djangoproject.com/en/4.1/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        "NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.MinimumLengthValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.CommonPasswordValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.NumericPasswordValidator",
    },
]

STATICFILES_DIRS = (
    os.path.join(BASE_DIR, 'core/static'),  # Absolute Path
    os.path.join(BASE_DIR, 'Portal/static'),  # Absolute Path
    os.path.join(BASE_DIR, 'Account/static'),  # Absolute Path
    os.path.join(BASE_DIR, 'admin_argon/static'),  # Absolute Path
    os.path.join(BASE_DIR, 'AssetManagement/static'),  # Absolute Path
    os.path.join(BASE_DIR, 'company/static'),  # Absolute Path
    os.path.join(BASE_DIR, 'Depreciation/static'),  # Absolute Path
    os.path.join(BASE_DIR, 'FormManagement/static'),  # Absolute Path
    os.path.join(BASE_DIR, 'Perm/static'),  # Absolute Path
    os.path.join(BASE_DIR, 'Workspace/static'),  # Absolute Path
)

# Internationalization
# https://docs.djangoproject.com/en/4.1/topics/i18n/

LANGUAGE_CODE = "en-us"

TIME_ZONE = "UTC"

USE_I18N = True

USE_TZ = True

AUTH_USER_MODEL = 'Account.Account'

LOGFILE_PATH = str(BASE_DIR) + '/debug.log'
if not os.path.exists(LOGFILE_PATH):
    try:
        os.system("touch %s" % LOGFILE_PATH)
        print('Created debug log file: %s' % LOGFILE_PATH)
    except Exception as xx:
        print("[settings.py] %s" % str(xx))
# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/4.1/howto/static-files/

STATIC_URL = '/static/'
STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')
# REST_FRAMEWORK = {
#     'DEFAULT_FILTER_BACKENDS': ['django_filters.rest_framework.DjangoFilterBackend'],
#     'DEFAULT_PAGINATION_CLASS': 'rest_framework.pagination.PageNumberPagination',
#     'PAGE_SIZE': 1000
# }
#if not DEBUG:
#    STATICFILES_STORAGE = 'whitenoise.storage.CompressedManifestStaticFilesStorage'

# Default primary key field type
# https://docs.djangoproject.com/en/4.1/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"

LOGIN_REDIRECT_URL = '/'
EMAIL_BACKEND = 'django.core.mail.backends.console.EmailBackend'
