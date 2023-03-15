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


# class HabitSerializer(serializers.ModelSerializer):
#     habit_meta = HabitMetaSerializer()

#     class Meta:
#         model = models.Habit
#         fields = '__all__'

#     def create(self, validated_data):
#         habit_meta_data = validated_data.pop('habit_meta')
#         habit = models.Habit.objects.create(**validated_data)
#         models.HabitMeta.objects.create(habit=habit, **habit_meta_data)
#         return habit
