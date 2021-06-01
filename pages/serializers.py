from rest_framework import serializers
from pages import models


class HomeSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Home
        fields = ['content']


class FAQSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.FAQ
        fields = ['question','answer']
