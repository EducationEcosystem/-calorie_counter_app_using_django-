from django.urls import path
from . import views


urlpatterns = [
    path("", views.index, name="index-view"),
    # Authentication
    path('register', views.register_view, name='register-view'),
    path('login', views.login_view, name='login-view'),
    path('logout', views.logout_view, name='logout-view'),

    # App Views
    path('create-food', views.create_food, name='create-food'),
    path('delete-food', views.delete_food, name='delete-food'),
    path('select-food', views.select_food, name='select-food'),
]