from django.db import models
from ckeditor.fields import RichTextField


class TimeStampedModel(models.Model):
    created_on = models.DateTimeField(auto_now_add=True)  # When it was create
    updated_on = models.DateTimeField(auto_now=True)  # When i was update

    class Meta:
        abstract = True
# Create your models here.


class Home(TimeStampedModel):
    """docstring for Home"""
    content = RichTextField()


class FAQ(TimeStampedModel):
    """docstring for Home"""
    question = models.CharField(max_length=255)
    answer = RichTextField()
    sr_no = models.IntegerField(default=0, verbose_name="Serial No.", help_text="For Sorting FAQ on page")

    def __str__(self):
        return self.question


class ServiceTerms(TimeStampedModel):
    """Add static content for Terms of service page"""
    content = RichTextField()


class PrivacyPolicy(TimeStampedModel):
    """Add static content for Privacy Policy page"""
    content = RichTextField()


class Contact(TimeStampedModel):
    """Store Contact form details"""
    full_name = models.CharField(max_length=64)
    email = models.CharField(max_length=64)
    phone = models.CharField(max_length=15)
    message = models.TextField()

    def __str__(self):
        return self.full_name
