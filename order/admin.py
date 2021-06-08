from django.contrib import admin
from order import models


class OrderItemsInline(admin.StackedInline):
    model = models.OrderItems
    extra = 0
    fields = ["product", "order"]


class DeliveryAddressInline(admin.StackedInline):
    model = models.DeliveryAddress
    extra = 0
    fields = ["delivery_date", "delivery_address", "apt_number", "description"]


class PickupAddressInline(admin.StackedInline):
    model = models.PickupAddress
    extra = 0
    fields = ["pickup_date", "pickup_address", "apt_number", "description"]


class PersonalDetailInline(admin.StackedInline):
    model = models.PersonalDetail
    extra = 0
    fields = ["first_name", "last_name", "email_address", "phone_number", "company_name", "hdyfu"]


class PaymentDetailInline(admin.StackedInline):
    model = models.PaymentDetail
    extra = 0
    fields = ["amount", "provider", "status"]


@admin.register(models.OrderDetail)
class OrderDetailAdmin(admin.ModelAdmin):
    list_display = ("order_id", "status", "delivered_date")
    search_fields = ["order_id", "status", "delivered_date"]
    inlines = [OrderItemsInline, DeliveryAddressInline, PickupAddressInline, PersonalDetailInline, PaymentDetailInline]


@admin.register(models.CartItem)
class CartItemAdmin(admin.ModelAdmin):
    list_display = ("product", "session", "quantity",)
    search_fields = ["product", "session", "quantity"]


@admin.register(models.Discount)
class DiscountAdmin(admin.ModelAdmin):
    list_display = ("title", "description", "discount_percent",)
    search_fields = ["title"]
