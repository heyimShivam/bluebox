from django.shortcuts import render
from rest_framework import generics
# Create your views here.
from rest_framework.permissions import IsAdminUser
from store import models
from store import serializers


class RentalListView(generics.ListAPIView):
    """Fetch all active rentals list"""
    queryset = models.RentalPeriod.objects.filter(is_active=True).order_by("sort_by")
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
        queryset = models.Product.objects.filter(
            product_category__category__title=category,
            product_category__title=sub_category,
            rental__slug=rental
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
