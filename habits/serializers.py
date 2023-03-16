from django.contrib.auth import get_user_model
from datetime import date, timedelta


from rest_framework import serializers
from django.db import models

from .models import Habit, HabitMeta


class HabitMetaSerializer(serializers.ModelSerializer):

    class Meta:
        model = HabitMeta
        fields = ('habit', 'date_completed')


class HabitSerializer(serializers.ModelSerializer):
    class Meta:
        model = Habit
        fields = ('user', 'title', 'frequency', 'is_completed', 'is_active')

    def habit_completed_check(self, habit):
        current_date = date.today()
        # retrieves the data from HabitMeta
        habit_data = HabitMeta.objects.filter(date_completed=current_date)

        if habit_data.exists():
            habit.is_completed = True
        else:
            habit.is_completed = False


# Sets the is_completed field of a Habit instance based on related HabitMeta instances when the instance is being serialized.
    # def to_representation(self, instance):
    #     ret = super().to_representation(instance)
    #     self.habit_completed_check(instance)
    #     return ret
        # # Checks the data on the habitmeta
        # if habit_data.date_completed == date.today():
        #     return habit.is_completed = True
        # else:
        #     return habit.is_completed =

    # def create(self, validated_data):
    #     habit_meta_data = validated_data.pop('habit_meta')
    #     habit = models.Habit.objects.create(**validated_data)
    #     models.HabitMeta.objects.create(habit=habit, **habit_meta_data)
    #     return habit


# class HabitMetaSerializer(serializers.ModelSerializer):

#     class Meta:
#         model = models.HabitMeta
#         fields = '__all__'


# class HabitsSerializer(serializers.ModelSerializer):
#     # Will give the keys from the habit meta model when creating the habit instance
#     # habit_meta = HabitMetaSerializer()

#     class Meta:
#         model = models.Habit
#         fields = '__all__'

#     def create(self, validated_data):
#         habit = models.Habit.objects.create(**validated_data)

#         habit_meta = HabitMetaSerializer()

#             habit_meta_data = validated_data.pop('habit_meta')
#             print(habit_meta_data)
#             habit = models.Habit.objects.create(**validated_data)
#             # Will create an instance of HabitMeta to correspond to the instance of the habit that was just created
#             models.HabitMeta.objects.create(habit=habit)
#             print(validated_data)
#         return self.title
