from django.contrib import admin
from .models import Food, Profile, SelectFood


# Register your models here.
admin.site.register(Food)
admin.site.register(Profile)
admin.site.register(SelectFood)