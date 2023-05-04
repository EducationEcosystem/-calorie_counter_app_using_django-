from django.shortcuts import render, redirect
from .forms import *
from django.contrib.auth import authenticate, login, logout
from . import models
from datetime import datetime


# Create your views here.
def index(request):
    food_items = Food.objects.all()
    profile = request.user.profile
    selected_food_items = models.PostFood.objects.filter(profile=profile)
    cnt = selected_food_items.count()
    querysetFood=[]
    for food in selected_food_items:
        querysetFood.append(food.food.all())
    finalFoodItems=[]
    for items in querysetFood:
        for obj in items:
            finalFoodItems.append(obj)
    totalCalories=0
    for foods in finalFoodItems:
        totalCalories+=foods.calorie
    context = {
        'totalCalories':totalCalories,
        'cnt':cnt,
        "food_items": food_items,
        "selected_food_items":finalFoodItems 
        }
    return render(request, "index.html", context)

def register_view(request):
    form = CreateUserForm(request.POST or None)
    if request.method == "POST":
        if form.is_valid():
            user = form.save()
            Profile.objects.create(user=user, name=user.username, email=user.email, date_created=datetime.now())
            return redirect("/login")
    return render(request, 'register.html', {"form": form})

def login_view(request):
    if request.method == 'POST':
        username = request.POST.get("username")
        password = request.POST.get("password")
        user = authenticate(username=username, password=password)
        if user is not None:
            login(request, user)
            return redirect("/")
    return render(request, 'login.html')

def logout_view(request):
    logout(request)
    return redirect("/login")

def select_food(request):
    form = SelectFoodForm(request.POST or None)
    if request.method == 'POST':
        if form.is_valid():
            form.save()
            return redirect("/")
    return render(request, 'select-food.html', {"form": form})

def create_food(request):
    form = CreateFoodItemForm(request.POST or None)
    if request.method=='POST':
        if form.is_valid():
            form.save()
            return redirect('/') 
    return render(request, 'create-food.html', {"form": form})

def delete_food(request):
    return render(request, 'delete-food.html')
