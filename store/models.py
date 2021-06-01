from django.db import models
from django.utils.text import slugify
from ckeditor.fields import RichTextField
from uuid import uuid4
import os
from django.utils.translation import gettext_lazy as _
# Create your models here.


class TimeStampedModel(models.Model):
    created_on = models.DateTimeField(auto_now_add=True)  # When it was create
    updated_on = models.DateTimeField(auto_now=True)  # When i was update

    class Meta:
        abstract = True


class TimeSlots(TimeStampedModel):
    """Deliver/Pickup Window Time Slots will be add here"""

    start_time = models.TimeField()
    end_time = models.TimeField()

    class Meta:
        verbose_name = _('Delivery/Pickup TimeSlot')

    def __str__(self):
        return str(self.start_time) + "-" + str(self.end_time)


class RentalPeriod(TimeStampedModel):
    period = models.CharField(max_length=100, verbose_name="Rental Period", help_text="Add period like 1 week,2 week etc")
    price = models.FloatField()

    def __str__(self):
        return self.period


class ExtraWork(TimeStampedModel):
    """Do you have stairs or an elevator?"""

    title = models.CharField(max_length=255)
    price = models.FloatField(null=True, blank=True)

    class Meta:
        verbose_name = _("Do you have stairs or an elevator")

    def __str__(self):
        return self.title + " $" + str(self.price)


class Location(TimeStampedModel):
    """Add delivery Locations here"""

    title = models.CharField(max_length=100,verbose_name="Location", help_text="Add location i.e city,country etc")

    def __str__(self):
        return self.title


class HDYFU(TimeStampedModel):
    """How Did you fide us options can be add/edit here"""
    title = models.CharField(max_length=255)

    class Meta:
        verbose_name = _('How Did You Find U')
        ordering = ['title']

    def __str__(self):
        return self.title


class Category(TimeStampedModel):
    """Table for main Category Home/Office"""
    title = models.CharField(max_length=20, unique=True, verbose_name="Category")
    slug = models.SlugField(unique=True, blank=True, help_text=("The name of the page as it will appear in URLs e.g http://domain.com/category/[my-slug]/"))

    def save(self, *args, **kwargs):
        if not self.id:
            self.slug = slugify(self.title)
        super(Category, self).save(*args, **kwargs)

    def __str__(self):
        return self.title

    # Fetch related sub_categories
    def sub_categories(self):
        return [obj.title for obj in SubCategory.objects.filter(category=self)]


class SubCategory(TimeStampedModel):
    """Subcategories 1. Boxes Packages 2. Packing Supplies 3. Moving Supplies"""
    category = models.ForeignKey(
        'store.Category',
        verbose_name=('Category'),
        related_name='sub_category',
        on_delete=models.CASCADE,
    )
    title = models.CharField(max_length=100, verbose_name="Sub Category")
    slug = models.SlugField(unique=True, blank=True, help_text=("The name of the page as it will appear in URLs e.g http://domain.com/category/[my-slug]/"))

    def save(self, *args, **kwargs):
        if not self.id:
            self.slug = slugify(self.category.title + "-" + self.title)
        super(SubCategory, self).save(*args, **kwargs)

    def __str__(self):
        return self.category.title + "-->" + self.title


def upload_to(instance, filename):
    filename_base, filename_ext = os.path.splitext(filename)
    return "{category}/{item_category}/{filename}{extension}".format(
        category=slugify(instance.item_category.category.title),
        item_category=slugify(instance.item_category.title),
        filename=slugify(filename_base),
        extension=filename_ext.lower(),
    )


class Item(TimeStampedModel):
    """ Subcategory vise item will be stored here"""
    item_category = models.ForeignKey(
        'store.SubCategory',
        verbose_name=('Sub Category'),
        related_name='items',
        on_delete=models.CASCADE,
    )
    rental_period = models.ForeignKey(
        "store.RentalPeriod",
        verbose_name=_("Rental Period"),
        on_delete=models.DO_NOTHING
    )
    id = models.UUIDField(default=uuid4, editable=False, primary_key=True)
    title = models.CharField(max_length=100, verbose_name="Item Name")
    image = models.ImageField(upload_to=upload_to)
    price = models.FloatField()
    unit = models.CharField(max_length=64, help_text="Add item unit i.e $2 per lb,per week,per roll etc.")
    description = RichTextField()

    def __str__(self):
        return self.title
