from rest_framework import serializers
from pages import models


class WhyChooseUsSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.WhyChooseUs
        fields = '__all__'


class TestimonialSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Testimonial
        fields = '__all__'


class ContactUsInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.ContactUsInfo
        fields = '__all__'


class HomeSerializer(serializers.ModelSerializer):
    testimonials = serializers.SerializerMethodField()
    contact_info = serializers.SerializerMethodField()
    why_us = serializers.SerializerMethodField()

    class Meta:
        model = models.Home
        fields = ['banner', 'content', 'testimonials','contact_info','why_us']

    def get_testimonials(self, obj):
        qs = models.Testimonial.objects.all()
        return TestimonialSerializer(qs, many=True).data

    def get_contact_info(self, obj):
        qs = models.ContactUsInfo.objects.get()
        return ContactUsInfoSerializer(qs).data

    def get_why_us(self, obj):
        qs = models.WhyChooseUs.objects.get()
        return WhyChooseUsSerializer(qs).data


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
