from django.contrib import admin
from .models import *


# Register your models here.
class foodAdmin(admin.ModelAdmin):
    class Meta:
        model = Food
    list_display=['name']
    list_filter=['name']


admin.site.register(Profile)
admin.site.register(PostFood)
admin.site.register(Food, foodAdmin)