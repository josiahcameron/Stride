from datetime import date, timedelta

from django.contrib.auth import get_user_model
from django.shortcuts import get_object_or_404

from rest_framework import generics
from rest_framework import permissions
from rest_framework.decorators import api_view


from . import models
from . import serializers

# Return the User model that is active in this project.
User = get_user_model()

# Create your views here.


class HabitsAPIView(generics.ListCreateAPIView):
    serializer_class = serializers.HabitSerializer

    def get_queryset(self):
        if self.request.user.is_superuser:
            return models.Habit.objects.all()
        else:
            return models.Habit.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class UpdateHabitAPIView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = serializers.HabitSerializer
    queryset = models.Habit.objects.all()

    def perform_destroy(self, instance):
        instance.delete()

    def perform_update(self, serializer):
        serializer.save()


class HabitMetaAPIView(generics.CreateAPIView):
    serializer_class = serializers.HabitMetaSerializer
    queryset = models.HabitMeta.objects.all()

    # def perform_create(self, serializer):

    #     serializer.save(habit=self.request.id)


class UpdateHabitMetaAPIView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = serializers.HabitMetaSerializer
    queryset = models.HabitMeta.objects.all()

    def perform_destroy(self, instance):
        instance.delete()

    def perform_update(self, serializer):
        serializer.save()


###################
# date.today() retrieves today's date in YYYY-MM-DD
# timedelta is used to manipulate date in python
# eg.) datetime.timedelta(days=0, seconds=0, microseconds=0, milliseconds=0, minutes=0, hours=0, weeks=0)

# today = date.today()
# yesterday = today - timedelta(days=1)

# def checkStreak:
#     if previousDate == yesterday:
#         streak += 1
#     else:
#         streak = 0
# Serializer for user activity called by url, user activity for specific user, serializer fields for count and streak
# Serializer method view
# API decorator for function based views
