from datetime import datetime
from django.contrib.auth.forms import UserCreationForm
from rest_framework import viewsets
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.status import HTTP_400_BAD_REQUEST
from rest_framework.authtoken.models import Token
from .models import Food, SelectFood, Profile
from .serializers import FoodSerializer, SelectFoodSerializer


"""Auth Views"""
class RegisterView(APIView):
    def post(self, request):
        form = UserCreationForm(request.data)
        if form.is_valid():
            user = form.save()
            Profile.objects.create(user=user, name=user.username, email=user.email, date_created=datetime.now())
            Token.objects.create(user=user)
            return Response("User Created Successfully")
        else:
            return Response(form.errors, status=HTTP_400_BAD_REQUEST)
        
# Create your views here.
class FoodView(viewsets.ModelViewSet):
    queryset = Food.objects.all()
    serializer_class = FoodSerializer

class SelectFoodView(APIView):
    def get(self, request, format=None):
        selected_food_items = SelectFood.objects.filter(profile=request.user.profile)
        
        # Get total calories and totalCount
        totalCalories=0
        cnt = 0
        for item in selected_food_items:
            food_item = item.food
            totalCalories+=(food_item.calorie)*item.units
            cnt += item.units
        
        serializer = SelectFoodSerializer(instance=selected_food_items, many=True)
        data = {
            'totalCalories':totalCalories,
            'cnt': cnt,
            "selectedFoodItems":serializer.data
            }
        return Response(data)
    
    def post(self, request):
        profile = request.user.profile
        for id in request.data:
            food = Food.objects.get(id=id)
            queryset = SelectFood.objects.filter(profile=profile, food=food)
            if queryset.exists():
                food_item = queryset.first()
                food_item.units += 1
                food_item.save()
            else:
                SelectFood.objects.create(profile=profile, food=food)
        return Response("Added food items successfully")
    
    def delete(self, request, format=None):
        ids = request.data
        SelectFood.objects.filter(id__in=ids).delete()
        return Response("Successfully removed food Items")