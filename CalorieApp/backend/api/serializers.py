from .models import Food, SelectFood
from rest_framework import serializers
from rest_framework.serializers import ModelSerializer


class FoodSerializer(ModelSerializer):
    class Meta:
        model = Food
        fields = '__all__'

class SelectFoodSerializer(ModelSerializer):
    food = FoodSerializer()
    
    class Meta:
        model = SelectFood
        fields = '__all__'