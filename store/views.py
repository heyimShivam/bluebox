from django.shortcuts import render
from rest_framework import generics
# Create your views here.
from rest_framework.permissions import IsAdminUser
from store import models
from store import serializers

import logging
logger = logging.getLogger(__name__)

logger.exception("jhsfjkhsk jhfkjshdkfjhsjfks")


class RentalListView(generics.ListAPIView):
    """Fetch all active rentals list"""
    queryset = models.RentalPeriod.objects.filter(is_active=True)
    serializer_class = serializers.RentalSerializer


class BoxPackgeListView(generics.ListAPIView):
    """
    Box Packges products selected rental priod vise!
    """
    serializer_class = serializers.ProductSerializer

    def get_queryset(self):
        category = self.kwargs['category']
        sub_category = self.kwargs['sub_category']
        rental = self.kwargs['rental']
        print("self.kwargs", category, sub_category, rental)
        queryset = models.Product.objects.filter(
            product_category__category__title__icontains=category,
            product_category__title__icontains=sub_category,
            rental__period=rental
        )
        return queryset.order_by('rental__price')


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
        return queryset.order_by('rental__price')


class LocationListView(generics.ListAPIView):
    """Get delivery locations"""
    queryset = models.Location.objects.all()
    serializer_class = serializers.LocationSerializer


class NewsletterCreateView(generics.CreateAPIView):
    """Create Newsletter"""
    queryset = models.Newsletter.objects.all()
    serializer_class = serializers.NewsletterSerializer


class QuoteCreateView(generics.CreateAPIView):
    """Save Free Quote Request"""
    queryset = models.Quote.objects.all()
    serializer_class = serializers.QuoteSerializer
