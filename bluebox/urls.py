from django.contrib import admin
from django.urls import path, include

from rest_framework.schemas import get_schema_view
from rest_framework_swagger.renderers import SwaggerUIRenderer, OpenAPIRenderer
from rest_framework.renderers import CoreJSONRenderer
from django.conf import settings
from django.conf.urls.static import static

schema_view = get_schema_view(title='Bluebox API', renderer_classes=[OpenAPIRenderer, SwaggerUIRenderer, CoreJSONRenderer])

urlpatterns = [
    path('api-docs/', schema_view, name="docs"),
    path('super-admin/', admin.site.urls),
    path("page/", include("pages.urls")),

] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
