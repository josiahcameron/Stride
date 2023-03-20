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
    tier = serializers.SerializerMethodField()
    streak = serializers.SerializerMethodField()
    # streak = serializers.SerializerMethodField()

    class Meta:
        model = models.Profile
        fields = '__all__'

    def get_tier(self, obj):
        try:
            instance = models.UserActivityLog.objects.filter(
                user=obj.user).latest('date')
        except:
            return "first"

        if instance.count >= 14:
            tier = 'second'
        elif instance.count >= 21:
            tier = 'third'
        elif instance.count >= 28:
            tier = 'fourth'
        else:
            tier = 'first'

        return tier

    def get_streak(self, obj):
        try:
            instance = models.UserActivityLog.objects.filter(
                user=obj.user).latest('date')
        except:
            return 1
        if instance.streak is 0:
            streak = 1
        else:
            streak = instance.streak
        return streak
