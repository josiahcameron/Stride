from django.contrib.auth.models import AbstractUser
from django.db import models
from django.conf import settings


# Create your models here.


class CustomUser(AbstractUser):
    pass


class Profile(models.Model):
    user = models.OneToOneField(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, blank=True)

    avatar = models.ImageField(upload_to='profiles/', blank=True)
    username = models.CharField(max_length=32)
    streak = models.IntegerField(blank=True)

    def __str__(self):
        return self.user.username


# User's monthly message to themselves
class Journal(models.Model):
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, blank=True)
    created_at = models.DateTimeField(null=True, auto_now=True)
    text = models.TextField(blank=True)

# User messages to themselves


class Log(models.Model):
    text = models.TextField(blank=True)
    created_at = models.DateTimeField(null=True, auto_now=True)
    updated_at = models.DateTimeField(null=True, auto_now=True)
