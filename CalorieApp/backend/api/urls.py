from django.urls import path
from rest_framework.routers import DefaultRouter
from .views import FoodView, SelectFoodView, RegisterView
from rest_framework.authtoken.views import obtain_auth_token

router = DefaultRouter()
router.register("food", viewset=FoodView, basename="food-view")


urlpatterns = [
    path("register/", RegisterView.as_view()),
    path("selectfood/", SelectFoodView.as_view()),
    path('api-token-auth/', obtain_auth_token, name="api-auth-token-view"),
]

urlpatterns += router.urls