from rest_framework import serializers
from pages import models


class HomeSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Home
        fields = ['content']


class FAQSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.FAQ
        fields = ['question', 'answer']


class ServiceTermsSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.ServiceTerms
        fields = ['content']


class PrivacyPolicySerializer(serializers.ModelSerializer):
    class Meta:
        model = models.PrivacyPolicy
        fields = ['content']


class ContactSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Contact
        fields = "__all__"
