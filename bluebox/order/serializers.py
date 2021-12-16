from rest_framework import serializers
from order import models


class CartSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.CartItem
        fields = "__all__"