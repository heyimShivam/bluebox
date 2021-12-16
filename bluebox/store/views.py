from django.shortcuts import render
from rest_framework import generics
# Create your views here.
from rest_framework.permissions import IsAdminUser
from store import models
from store import serializers
from rest_framework.views import APIView
from django.http import Http404
from rest_framework.response import Response
from rest_framework import status
import logging
logger = logging.getLogger(__name__)


class RentalListView(generics.ListAPIView):
    """Fetch all active rentals list"""
    queryset = models.RentalPeriod.objects.filter(is_active=True)
    serializer_class = serializers.RentalSerializer


class DeliveryWindowsView(generics.ListAPIView):
    """Fetch all Delivery Window slots """
    queryset = models.TimeSlots.objects.all()
    serializer_class = serializers.TimeSlotsSerializer


class ExtraWorkListView(generics.ListAPIView):
    """Fetch ExtraWork options with price """
    queryset = models.ExtraWork.objects.all()
    serializer_class = serializers.ExtraWorkSerializer


class BoxPackgeListView(generics.ListAPIView):
    """
    Box Packges products selected rental priod vise!
    """
    serializer_class = serializers.ProductSerializer()

    def get_queryset(self):
        category = self.kwargs['category']
        sub_category = self.kwargs['sub_category']
        rental = self.kwargs['rental']
        queryset = models.Product.objects.filter(
            product_category__category__title__icontains=category,
            product_category__title__icontains=sub_category,
            rental__period=rental
        )
        return queryset.order_by('created_on')


class ProductListView(generics.ListAPIView):
    """
    products categories vise!
    """
    serializer_class = serializers.ProductSerializer

    def get_queryset(self):
        category = self.kwargs['category']
        sub_category = self.kwargs['sub_category']
        queryset = models.Product.objects.filter(
            product_category__category__title=category,
            product_category__title=sub_category,
        )
        return queryset.order_by('created_on')


class LocationListView(generics.ListAPIView):
    """Get delivery locations"""
    queryset = models.Location.objects.all()
    serializer_class = serializers.LocationSerializer

class PriceListView(generics.ListAPIView):
    """Get delivery locations"""
    queryset = models.PriceManagement.objects.all()
    serializer_class = serializers.PriceSerializer

class NewsletterCreateView(generics.CreateAPIView):
    """Create Newsletter"""
    queryset = models.Newsletter.objects.all()
    serializer_class = serializers.NewsletterSerializer


class QuoteCreateView(generics.CreateAPIView):
    """Save Free Quote Request"""
    queryset = models.Quote.objects.all()
    serializer_class = serializers.QuoteSerializer


class CheckZipCode(APIView):
    def post(self, reqest):
        response = {}
        delivery_zipcode = reqest.data['delivery_zipcode']
        pickup_zipcode = reqest.data['pickup_zipcode']
        try:
            models.ZipCode.objects.get(code=delivery_zipcode)
        except models.ZipCode.DoesNotExist:
            response['success'] = False
            response['message'] = "Sorry! Your delivery zip code is outside of our free service area. Contact us for potential availability and fees."
            return Response(response)
        try:
            models.ZipCode.objects.get(code=pickup_zipcode)
        except models.ZipCode.DoesNotExist:
            response['success'] = False
            response['message'] = "Sorry! Your pickup zip code is outside of our free service area. Contact us for potential availability and fees."
            return Response(response)
        response['success'] = True
        return Response(response, status=status.HTTP_200_OK)
