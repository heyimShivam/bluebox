from django.shortcuts import render
from rest_framework import generics
# Create your views here.
from rest_framework.permissions import IsAdminUser
from pages.models import Home, FAQ
from pages import serializers


class HomeListView(generics.ListAPIView):
    queryset = Home.objects.all()
    serializer_class = serializers.HomeSerializer
    # permission_classes = [IsAdminUser]


class FAQListView(generics.ListAPIView):
    queryset = FAQ.objects.all().order_by('sr_no')
    serializer_class = serializers.FAQSerializer
