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
    serializer_class = serializers.HabitsSerializer

    def get_queryset(self):
        # Need to add a condition to only render if the article isn't submitted
        if self.request.user.is_superuser:
            return models.Habit.objects.all()
        else:
            return models.Habit.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class HabitMetaAPIView(generics.RetrieveAPIView):
    serializer_class = serializers.HabitMetaSerializer
    queryset = models.HabitMeta.objects.all()
