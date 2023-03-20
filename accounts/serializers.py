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
    # streak = serializers.SerializerMethodField()

    class Meta:
        model = models.Profile
        fields = '__all__'

    def get_tier(self, profile):
        if models.UserActivityLog.objects.all():
            progress = models.UserActivityLog.objects.filter(
                user=self.context['request'].user).latest('date')

            if progress.count <= 14:
                profile.tier = 'second'
            elif progress.count <= 21:
                profile.tier = 'third'
            elif progress.count <= 28:
                profile.tier = 'fourth'
        else:
            profile.tier = 'first'
            print(profile.tier)
        return profile.tier

    # def get_streak(self, profile):
    #     if models.UserActivityLog.objects.all():
    #         activity = models.UserActivityLog.objects.filter(
    #             user=self.context['request'].user).latest('date')

    #         if activity.streak

    # def get_tier(self, profile):
    #     request = self.context.get('request')
    #     if request:
    #         progress = models.UserActivityLog.objects.filter(
    #             user=request.user).latest('date')
    #         return progress.tier
    #     else:
    #         return None
