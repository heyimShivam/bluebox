from django.shortcuts import render
from rest_framework import generics
# Create your views here.
from rest_framework.permissions import IsAdminUser
from pages import models
from pages import serializers


class HomeListView(generics.ListAPIView):
    queryset = models.Home.objects.all()
    serializer_class = serializers.HomeSerializer


class FAQListView(generics.ListAPIView):
    queryset = models.FAQ.objects.all().order_by('sr_no')
    serializer_class = serializers.FAQSerializer


class ServicesListView(generics.ListAPIView):
    queryset = models.ServiceTerms.objects.all()
    serializer_class = serializers.ServiceTermsSerializer


class PolicyListView(generics.ListAPIView):
    queryset = models.FAQ.objects.all()
    serializer_class = serializers.PrivacyPolicySerializer


class ContactListView(generics.ListAPIView):
    queryset = models.Contact.objects.all()
    serializer_class = serializers.ContactSerializer


class TestimonialListView(generics.ListAPIView):
    queryset = models.Testimonial.objects.all()
    serializer_class = serializers.TestimonialSerializer


class WhyChooseUsListView(generics.ListAPIView):
    queryset = models.WhyChooseUs.objects.all()
    serializer_class = serializers.WhyChooseUsSerializer


class ContactUsInfoListView(generics.ListAPIView):
    queryset = models.ContactUsInfo.objects.all()
    serializer_class = serializers.ContactUsInfoSerializer
