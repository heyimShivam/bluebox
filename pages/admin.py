from django.contrib import admin
from pages import models


@admin.register(models.Home)
class HomeAdmin(admin.ModelAdmin):
    list_display = ("content",)
    search_fields = ["content"]


@admin.register(models.FAQ)
class FAQAdmin(admin.ModelAdmin):
    list_display = ("question", "answer",)
    search_fields = ["question", "answer"]


@admin.register(models.Contact)
class ContactAdmin(admin.ModelAdmin):
    list_display = ("full_name", "email", "phone", "message","created_on")
    search_fields = ["full_name", "email", "phone"]


admin.site.register(models.ServiceTerms)
admin.site.register(models.PrivacyPolicy)
