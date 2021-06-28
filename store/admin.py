from django.contrib import admin
from import_export.admin import ImportExportModelAdmin

from store import models
from django.contrib.auth.models import User, Group

admin.site.unregister(User)
admin.site.unregister(Group)
"""Inline Models"""


class SubCategoryInline(admin.StackedInline):
    model = models.SubCategory
    extra = 0
    fields = ["title", "category"]


@admin.register(models.Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ("title", "sub_categories",)
    search_fields = ["title"]
    fields = ['title']
    inlines = [SubCategoryInline]


@admin.register(models.Product)
class ItemAdmin(admin.ModelAdmin):
    list_display = ("product_category", "title", "price",)
    search_fields = ["product_category", "title", "unit"]
    fields = ["product_category", "rental", "title", "price", "unit", "image","description"]


@admin.register(models.RentalPeriod)
class RentalPeriodAdmin(admin.ModelAdmin):
    list_display = ("period", "price",)
    search_fields = ["period"]


@admin.register(models.Location)
class RentalPeriodAdmin(ImportExportModelAdmin, admin.ModelAdmin):
    list_display = ("title",)
    search_fields = ["title"]


@admin.register(models.Quote)
class QuoteAdmin(admin.ModelAdmin):
    list_display = ("full_name", "email", "phone", "address", "delivery_date", "created_on",)
    search_fields = ["full_name", "email", "phone", "address", "delivery_date", "created_on"]

@admin.register(models.Newsletter)
class NewsletterAdmin(admin.ModelAdmin):
    list_display = ("email", "created_on",)
    search_fields = ["email","created_on"]


admin.site.register(models.HDYFU)
admin.site.register(models.TimeSlots)
admin.site.register(models.ExtraWork)
