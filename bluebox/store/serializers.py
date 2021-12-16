from rest_framework import serializers
from store import models


class RentalSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.RentalPeriod
        fields = ["id", 'period', 'sort_by']


class PriceSerializer(serializers.ModelSerializer):
    # pricing = serializers.SerializerMethodField()
    
    class Meta:
        model = models.PriceManagement
        fields = ['product', 'rental', 'price']

    # def get_pricing(self, obj):
    #     return (now() - obj.date_joined).days



class LocationSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Location
        fields = ['title']

class RelatedPriceSerializer(serializers.ListSerializer):
    def to_representation(self, data):
        data = data.filter(price=12000.0)
        return super(RelatedPriceSerializer, self).to_representation(data)

# class PriceSerializer(serializers.ModelSerializer):
#     # pricing = serializers.SerializerMethodField()
    
#     class Meta:
#         model = models.PriceManagement
#         fields = ['product', 'rental', 'price', ]

    # def get_pricing(self, obj):
    #     return (now() - obj.date_joined).days
#  class UserSerializer(serializers.ModelSerializer):
#     delete_filtered_items = serializers.SerializerMethodField()

#     class Meta:
#         model = User

#     def get_delete_filtered_items(self, obj):
#         items = Item.objects.filter(user=obj,deleted=False)
#         serializer = ItemsSerializer(instance=items, many=True)
#         return serializer.data
        
class ProductSerializer(serializers.ModelSerializer):
    prices = serializers.SerializerMethodField('price_by_week')
    quantity = serializers.SerializerMethodField()

    def price_by_week(self, product_obj):
        request_object = self.context
        print(request_object)

        query = models.PriceManagement.objects.filter(product=product_obj).filter(rental__period='week 1').all()
        for i in query:
            return i.price


    def get_quantity(self, product_obj):
        return 1     

    class Meta:
        model = models.Product
        fields = "__all__"
        

    def to_representation(self, instance):
#        print(self.context)
#        qry = models.PriceManagement.objects.filter(product=instance).filter(rental=instance.rental).all()
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

