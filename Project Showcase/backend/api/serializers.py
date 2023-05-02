from .models import Food, SelectFood
from rest_framework import serializers
from rest_framework.serializers import ModelSerializer


class FoodSerializer(ModelSerializer):
    class Meta:
        model = Food
        fields = '__all__'

    def validate_name(self, value):
        if Food.objects.filter(name__iexact=value).first():
            raise serializers.ValidationError("Food with given name already exists")
        return value


class SelectFoodSerializer(ModelSerializer):
    food = FoodSerializer()
    
    class Meta:
        model = SelectFood
        fields = '__all__'
