from django.contrib.auth import get_user_model

from rest_framework import serializers

from . import models


class HabitsSerializer(serializers.ModelSerializer):

    class Meta:
        model = models.Habit
        fields = '__all__'


class HabitMetaSerializer(serializers.ModelSerializer):

    class Meta:
        model = models.HabitMeta
        fields = '__all__'
