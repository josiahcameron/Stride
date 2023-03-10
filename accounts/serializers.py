from django.contrib.auth import get_user_model

from rest_framework import serializers

from . import models


class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = models.CustomUser
        fields = '__all__'


class ActivitySerializer(serializers.ModelSerializer):

    class Meta:
        model = models.ActivityLog
        fields = '__all__'
