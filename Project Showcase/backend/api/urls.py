from . import views
from django.urls import path
from rest_framework.routers import DefaultRouter
from rest_framework.authtoken.views import obtain_auth_token


urlpatterns = [
    path("register/", views.RegisterView.as_view()),
    path('selectfood/', views.SelectFoodView.as_view()),
    # Thirdparty views
    path('api-token-auth/', obtain_auth_token, name="api-auth-token-view"),
]

router = DefaultRouter()
router.register('food', views.FoodView, basename='food-view')

urlpatterns += router.urls