from rest_framework import serializers
from store import models


class RentalSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.RentalPeriod
        fields = ["id", 'period', 'price', 'sort_by']


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Product
        fields = "__all__"

    def to_representation(self, instance):
        response = super().to_representation(instance)
        response['rental'] = RentalSerializer(instance.rental).data
        return response
