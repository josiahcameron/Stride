from django.contrib.auth import get_user_model

from rest_framework import serializers

from . import models


class ActivitySerializer(serializers.ModelSerializer):

    class Meta:
        model = models.UserActivityLog
        fields = '__all__'


class UserSerializer(serializers.ModelSerializer):
    # user_activity = models.UserActivityLog
    class Meta:
        model = models.CustomUser
        fields = '__all__'
    # def create(self, validated_data):
    #     user_activity_data = validated_data.pop('user_activity')
    #     user = models.CustomUser.objects.create(**validated_data)
    #     models.UserActivityLog.objects.create()


class ProfileSerializer(serializers.ModelSerializer):

    class Meta:
        model = models.Profile
        fields = '__all__'
