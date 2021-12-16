"""
Django settings for bluebox project.

Generated by 'django-admin startproject' using Django 3.2.3.

For more information on this file, see
https://docs.djangoproject.com/en/3.2/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/3.2/ref/settings/
"""
import os
from pathlib import Path
from decouple import config
# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent

# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/3.2/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = 'django-insecure-^q)5*14-2g7&pgbq&vl7vxci3xl3q318^v4^(_0a3#6-d&95*-'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = config("DEBUG")

ALLOWED_HOSTS = ['*']

# Application definition

INSTALLED_APPS = [
    # 'admin_reorder',
    'jazzmin',

    # 'jet.dashboard', #dashbaord
    # 'jet',
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',

    'rest_framework',
    'drf_yasg',
    'ckeditor',
    'django_seed',
    'import_export',
    'corsheaders',
    # my apps
    'pages.apps.PagesConfig',
    'store.apps.StoreConfig',
    'order.apps.OrderConfig', 
    'settingadmin.apps.SettingadminConfig',
]
X_FRAME_OPTIONS = 'SAMEORIGIN'

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    # 'admin_reorder.middleware.ModelAdminReorder',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'bluebox.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [os.path.join(BASE_DIR, 'templates')],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
            # 'libraries': {
            #     'jazzmin': 'templatetags.jazzmin',
            # }
        },
    },
]

WSGI_APPLICATION = 'bluebox.wsgi.application'

# Database
# https://docs.djangoproject.com/en/3.2/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}

# Password validation
# https://docs.djangoproject.com/en/3.2/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]

# Internationalization
# https://docs.djangoproject.com/en/3.2/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_L10N = True

USE_TZ = True

# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/3.2/howto/static-files/

STATIC_URL = '/static/'
STATICFILES_DIRS = (
    os.path.join(BASE_DIR, 'static'),
)
STATIC_ROOT = os.path.join(BASE_DIR, '../static/')

MEDIA_URL = '/media/'
MEDIA_ROOT = os.path.join(BASE_DIR, 'media/')
# Default primary key field type
# https://docs.djangoproject.com/en/3.2/ref/settings/#default-auto-field
# STATICFILES_FINDERS = [
#     'django.contrib.staticfiles.finders.FileSystemFinder',
#     'django.contrib.staticfiles.finders.AppDirectoriesFinder',
# ]


DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

REST_FRAMEWORK = {
    'DEFAULT_PAGINATION_CLASS': 'rest_framework.pagination.PageNumberPagination',
    'PAGE_SIZE': 50
}

# LOG_DIRS = (
#     os.path.join(BASE_DIR, 'custom_logs/error.log'),
# )
LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'handlers': {
        'file': {
            'level': 'DEBUG',
            'class': 'logging.FileHandler',
            'filename': os.path.join(BASE_DIR, 'custom_logs/debug.log'),
        },
    },
    'loggers': {
        'django': {
            'handlers': ['file'],
            'level': 'DEBUG',
            'propagate': True,
        },
    },
}

CORS_ALLOW_ALL_ORIGINS = True

# JET_INDEX_DASHBOARD = 'dashboard.AdminDashboard'
# JET_CHANGE_FORM_SIBLING_LINKS = True

# JET_SIDE_MENU_ITEMS = [  # A list of application or custom item dicts
#     {'label': ('Orders Management'),'items': [
#         {'name': 'order.orderdetail', 'label': ('View Orders')},
#         {'name': 'order.discount', 'label': ('Manage Discounts')},
#         {'name': 'order.personaldetail', 'label': ('Customers')},
#     ]},

#     {'label': ('Inventory Management'), 'items': [
#         {'name': 'store.box_products', 'label': ('Box Products')},
#         {'name': 'store.packing_products', 'label': ('Packing Supplies')},
#         {'name': 'store.moving_products', 'label': ('Moving Supplies')},
#     ]},

#     {'label': ('Update Website'), 'items': [
#         {'name': 'pages.contact', 'label': ('Messages from customers')},
#         {'name': 'store.newsletter', 'label': ('NewsLetter')},
#         {'name': ' '},
#         {'name': 'pages.home', 'label': ('Update HomePage')},
#         {'name': 'pages.testimonial', 'label': ('Add Testimonial')},
#         {'name': 'pages.faq', 'label': ('Update FAQs')},
#         {'name': ' '},
#         {'name': 'pages.whychooseus', 'label': ('Update Why Choose Us')},
#         {'name': 'pages.contactusinfo', 'label': ('Update Contact Details')},
#         {'name': ' '},
#         {'name': 'pages.serviceterms', 'label': ('Update Service Terms')},
#         {'name': 'pages.privacypolicy', 'label': ('Update Privacy Policy')},
#     ]},

#     {'label': ('Settings'), 'items': [
#         {'name': 'store.rentalperiod', 'label': ('Rental Periods')},
#         {'name': 'store.location', 'label': ('Locations')},
#         {'name': 'store.zipcode', 'label': ('Zip Codes')},
#     ]},
    
#     ]

JAZZMIN_SETTINGS = {
    "site_title": "Bluebox Admin",
    "site_header": "Bluebox",
    "site_brand": ' ',
    "site_logo": os.path.join(BASE_DIR, 'static/admin/img/logo.png'),
    "site_logo_classes": "img",
    "site_icon": os.path.join(BASE_DIR, 'static/admin/img/logo.png'),
    "welcome_sign": "Welcome to the Bluebox",
    "copyright": "Bluebox LLC",
    "user_avatar": None,

    "topmenu_links": [
        {"name": "Home",  "url": "admin:index"},
        {"model": "auth.User"},
        {"app": "order"},
        {"app": "store"},
        {"app": "pages"},
        {"app": "adminsetting"},    
        ],

    "show_sidebar": True,
    "navigation_expanded": True,
    "order_with_respect_to": ["auth", "order", "order.OrderDetail", "order.Discount", "store", "store.Box_Products", "store.Packing_Products", "pages", "settingadmin",],

    "icons": {
        "auth.user": "fas fa-user",
        "order.OrderDetail": "fas fa-shopping-cart",
        "order.Discount": "fas fa-tags",
        "order.UnavailableDates": "fas fa-calendar-times",

        "store.Box_Products": "fas fa-box-open",
        "store.Packing_Products": "fas fa-box-open",
        "store.Moving_Products": "fas fa-box-open",
        "store.RentalPeriod" : "fas fa-business-time",

        "pages.ContactUs": "fas fa-address-card",
        "pages.Home": "fas fa-home",
        "pages.FAQ": "fas fa-question-circle",
        "pages.Testimonial": "fas fa-comment-dots",
        "pages.WhyChooseUs": "fas fa-people-carry",
        "pages.Contact": "fas fa-address-card",

        "settingadmin.HDYFU": "fas fa-search",
        "settingadmin.TimeSlots": "fas fa-clock",
        "settingadmin.Tax": "fas fa-dollar-sign",
        "settingadmin.ExtraWork": "fas fa-building",
        "settingadmin.Location": "fas fa-map-marked-alt",
        "settingadmin.ZipCode": "fas fa-map-marked-alt",
        "settingadmin.NewsLetter": "fas fa-envelope",
        "settingadmin.Quote": "fas fa-comments-dollar",

    },
    "default_icon_parents": "fas fa-chevron-circle-right",
    "default_icon_children": "fas fa-circle",

    "related_modal_active": False,
    "related_modal_active": True,

    "custom_css": None,
    "custom_js": None,
    "show_ui_builder": False,

    "changeform_format": "horizontal_tabs",
    "changeform_format_overrides": {"auth.user": "collapsible", "auth.group": "vertical_tabs"},
}
JAZZMIN_UI_TWEAKS = {
    "navbar_small_text": False,
    "footer_small_text": False,
    "body_small_text": False,
    "brand_small_text": False,
    "brand_colour": "navbar-white",
    "accent": "accent-primary",
    "navbar": "navbar-light",
    "no_navbar_border": True,
    "navbar_fixed": False,
    "layout_boxed": False,
    "footer_fixed": False,
    "sidebar_fixed": True,
    "sidebar": "sidebar-light-primary",
    "sidebar_nav_small_text": False,
    "sidebar_disable_expand": False,
    "sidebar_nav_child_indent": False,
    "sidebar_nav_compact_style": False,
    "sidebar_nav_legacy_style": False,
    "sidebar_nav_flat_style": True,
    "theme": "default",
    "dark_mode_theme": None,
    "button_classes": {
        "primary": "btn-outline-primary",
        "secondary": "btn-outline-secondary",
        "info": "btn-outline-info",
        "warning": "btn-outline-warning",
        "danger": "btn-outline-danger",
        "success": "btn-outline-success"
    },
    "actions_sticky_top": False
}

EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
EMAIL_HOST = 'smtp.gmail.com'
EMAIL_USE_TLS = True
EMAIL_PORT = 587
EMAIL_HOST_USER = 'viraj.rowwat@gmail.com'
EMAIL_HOST_PASSWORD = 'hgrbnbnottrerycx'
