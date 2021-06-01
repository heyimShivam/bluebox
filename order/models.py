from django.db import models
from django.utils.text import slugify
from ckeditor.fields import RichTextField
from uuid import uuid4
import os


class TimeStampedModel(models.Model):
    created_on = models.DateTimeField(auto_now_add=True)  # When it was create
    updated_on = models.DateTimeField(auto_now=True)  # When i was update

    class Meta:
        abstract = True


class Order(TimeStampedModel):
    """All orders will be add here"""
    item = models.OneToOneField(
        'store.Item',
        verbose_name=('Item'),
        on_delete=models.DO_NOTHING,
    )
    delivered_date = models.DateTimeField()
    total_amount = models.FloatField()

    def __str__(self):
        return str()


class DeliveryAddress(TimeStampedModel):
    """Delivery Address item vise"""
    order = models.OneToOneField(
        'order.Order',
        verbose_name=('Order'),
        related_name='delivery_address',
        on_delete=models.CASCADE,
    )
    delivery_date = models.DateField()
    delivery_address = models.CharField(max_length=255)
    latitude = models.CharField(max_length=100, null=True, blank=True)
    longitude = models.CharField(max_length=100, null=True, blank=True)
    apt_number = models.IntegerField()
    description = models.TextField(null=True, blank=True)
    delivery_window = models.ForeignKey(
        'main.TimeSlots',
        verbose_name="Delivery Window 1",
        on_delete=models.DO_NOTHING
    )
    extra_work = models.ForeignKey(
        "main.ExtraWork",
        verbose_name="Extra Work",
        null=True, blank=True,
        on_delete=models.DO_NOTHING
    )

    def __str__(self):
        return str(self.delivery_date)


class PickupAddress(TimeStampedModel):
    """Pickup Address item vise"""
    order = models.OneToOneField(
        'order.Order',
        verbose_name=('Order'),
        related_name='pickup_address',
        on_delete=models.CASCADE,
    )
    pickup_date = models.DateField()
    pickup_address = models.CharField(max_length=255)
    latitude = models.CharField(max_length=100)
    longitude = models.CharField(max_length=100)
    apt_number = models.IntegerField()
    description = models.TextField(null=True, blank=True)
    delivery_window = models.ForeignKey(
        'main.TimeSlots',
        verbose_name="Delivery Window 1",
        on_delete=models.DO_NOTHING
    )
    extra_work = models.ForeignKey(
        "main.ExtraWork",
        verbose_name="Extra Work",
        null=True, blank=True,
        on_delete=models.DO_NOTHING
    )

    def __str__(self):
        return str(self.pickup_date)


class PersonalDetail(TimeStampedModel):
    """User personal details will be stored here"""
    order = models.OneToOneField(
        'order.Order',
        verbose_name=('Order'),
        related_name='personal_detail',
        on_delete=models.CASCADE,
    )
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=30)
    email_address = models.CharField(max_length=64)
    phone_number = models.CharField(max_length=15)
    secondary_phone_number = models.CharField(max_length=15, null=True, blank=True)
    company_name = models.CharField(max_length=255, null=True, blank=True)
    voucher_code = models.CharField(max_length=6, null=True, blank=True)
    hdyfu = models.OneToOneField(
        "ref_data.HDYFU",
        verbose_name="How Did You Find Us",
        on_delete=models.DO_NOTHING
    )

    def __str__(self):
        return self.first_name + " " + self.last_name
