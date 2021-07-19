from rest_framework import serializers
from store import models


class RentalSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.RentalPeriod
        fields = ["id", 'period', 'price', 'sort_by']


class LocationSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Location
        fields = ['title']


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Product
        fields = "__all__"

    def to_representation(self, instance):
        response = super().to_representation(instance)
        response['rental'] = RentalSerializer(instance.rental).data
        return response


class QuoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Quote
        fields = "__all__"


class NewsletterSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Newsletter
        fields = "__all__"


class TimeSlotsSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.TimeSlots
        fields = ["start_time", "end_time"]

class ExtraWorkSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.ExtraWork
        fields = ["title", "price"]

