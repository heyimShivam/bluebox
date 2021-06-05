from django.contrib import admin
from pages import models


class WhyChooseUsInline(admin.StackedInline):
    model = models.WhyChooseUs
    extra = 0
    fields = ["heading", "content"]


class ContactUsInfoInline(admin.StackedInline):
    model = models.ContactUsInfo
    extra = 0
    fields = ["email", "address", "phone_number"]


@admin.register(models.Home)
class HomeAdmin(admin.ModelAdmin):
    list_display = ("content",)
    search_fields = ["content"]
    inlines = [WhyChooseUsInline, ContactUsInfoInline]


@admin.register(models.Testimonial)
class TestimonialAdmin(admin.ModelAdmin):
    list_display = ("name", "occupation", "content", "image",)
    search_fields = ["name", "occupation"]


@admin.register(models.FAQ)
class FAQAdmin(admin.ModelAdmin):
    list_display = ("question", "answer",)
    search_fields = ["question", "answer"]


@admin.register(models.Contact)
class ContactAdmin(admin.ModelAdmin):
    list_display = ("full_name", "email", "phone", "message", "created_on")
    search_fields = ["full_name", "email", "phone"]


admin.site.register(models.ServiceTerms)
admin.site.register(models.PrivacyPolicy)
