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


class CartItem(TimeStampedModel):
    product = models.ForeignKey("store.Product", on_delete=models.CASCADE)
    session = models.CharField(max_length=150, null=True, blank=True)
    quantity = models.IntegerField()

    def __str__(self):
        return self.session + "--->" + self.product.title


class Discount(TimeStampedModel):
    id = models.UUIDField(default=uuid4, editable=False, primary_key=True)
    title = models.CharField(max_length=100)
    description = models.CharField(max_length=20)
    discount_percent = models.FloatField()

    def __str__(self):
        return self.title


ORDER_STATUS = (
    ('pend', 'Pending'),
    ('prc', 'Processing'),
    ('cnf', 'Confirmed'),
    ('dlv', 'Delivered'),
    ('cncl', 'Cancelled'),
    ('com', 'Completed')
)


class OrderDetail(TimeStampedModel):
    """All orders will be add here"""
    order_id = models.CharField(max_length=6)
    status = models.CharField(max_length=50, choices=ORDER_STATUS, default="pend", verbose_name="Order Status")
    delivered_date = models.DateTimeField()

    class Meta:
        verbose_name = "Order"

    def __str__(self):
        return self.status


class OrderItems(TimeStampedModel):
    product = models.ForeignKey('store.Product', on_delete=models.CASCADE)
    order = models.ForeignKey('order.OrderDetail', on_delete=models.CASCADE)


class DeliveryAddress(TimeStampedModel):
    """Delivery Address item vise"""
    order = models.OneToOneField(
        'order.OrderDetail',
        verbose_name=('Delivery Address'),
        on_delete=models.CASCADE,
    )
    delivery_date = models.DateField()
    delivery_address = models.CharField(max_length=255)
    latitude = models.CharField(max_length=100, null=True, blank=True)
    longitude = models.CharField(max_length=100, null=True, blank=True)
    apt_number = models.IntegerField()
    description = models.TextField(null=True, blank=True)
    delivery_window = models.ForeignKey(
        'store.TimeSlots',
        verbose_name="Delivery Window 1",
        on_delete=models.DO_NOTHING
    )
    extra_work = models.ForeignKey(
        "store.ExtraWork",
        verbose_name="Extra Work",
        null=True, blank=True,
        on_delete=models.DO_NOTHING
    )

    def __str__(self):
        return str(self.delivery_date)


class PickupAddress(TimeStampedModel):
    """Pickup Address item vise"""
    order = models.OneToOneField(
        'order.OrderDetail',
        verbose_name=('Pickup Address'),
        on_delete=models.CASCADE,
    )
    pickup_date = models.DateField()
    pickup_address = models.CharField(max_length=255)
    latitude = models.CharField(max_length=100)
    longitude = models.CharField(max_length=100)
    apt_number = models.IntegerField()
    description = models.TextField(null=True, blank=True)
    delivery_window = models.ForeignKey(
        'store.TimeSlots',
        verbose_name="Delivery Window 1",
        on_delete=models.DO_NOTHING
    )
    extra_work = models.ForeignKey(
        "store.ExtraWork",
        verbose_name="Extra Work",
        null=True, blank=True,
        on_delete=models.DO_NOTHING
    )

    def __str__(self):
        return str(self.pickup_date)


class PersonalDetail(TimeStampedModel):
    """User personal details will be stored here"""
    order = models.OneToOneField(
        'order.OrderDetail',
        verbose_name=('Personal Detail'),
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
        "store.HDYFU",
        verbose_name="How Did You Find Us",
        on_delete=models.DO_NOTHING
    )

    def __str__(self):
        return self.first_name + " " + self.last_name


PAYMENT_STATUS = (
    ('pend', 'Pending'),
    ('prc', 'Processing'),
    ('cncl', 'Cancelled'),
    ('com', 'Completed')
)


class PaymentDetail(TimeStampedModel):
    id = models.UUIDField(default=uuid4, editable=False, primary_key=True)
    order = models.OneToOneField("order.OrderDetail", on_delete=models.CASCADE)
    amount = models.FloatField()
    provider = models.CharField(max_length=100)
    status = models.CharField(max_length=50, choices=PAYMENT_STATUS, default="pend", verbose_name="Order Status")
