from django.db import models
from django.contrib.auth.models import User
from django.core.exceptions import ValidationError


# Create your models here.
class Food(models.Model):
    name = models.CharField(max_length=200)
    carbohydrate = models.DecimalField(max_digits=5, decimal_places=2, default=0)
    fats = models.DecimalField(max_digits=5, decimal_places=2, default=0)
    protein = models.DecimalField(max_digits=5, decimal_places=2, default=0)
    calorie = models.DecimalField(max_digits=5, decimal_places=2, default=0, blank=True)
    quantity = models.IntegerField(default=1, null=True, blank=True)
    
    def __str__(self):
        return str(self.name)


class Profile(models.Model):
    user = models.OneToOneField(User, null=True, on_delete=models.CASCADE)
    name = models.CharField(max_length=200, null=True)
    email = models.CharField(max_length=200, null=True)
    date_created = models.DateTimeField(blank=True, null=True ,editable=False)

    def __str__(self):
        return str(self.name)
    

class SelectFood(models.Model):
    profile = models.ForeignKey(Profile, null=True, on_delete=models.CASCADE)
    food    = models.ForeignKey(Food, null=True,on_delete=models.CASCADE)
    units   = models.IntegerField(default=1)