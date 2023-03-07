from django.db import models
from django.conf import settings


# Create your models here.

# Tracks the frequency of the habit
class Frequency(models.Model):
    DAILY = 'daily'
    WEEKLY = 'weekly'
    MONTHLY = 'monthly'
    FREQUENCY_OPTIONS = [
        (DAILY, 'daily'),
        (WEEKLY, 'weekly'),
        (MONTHLY, 'monthly'),
    ]
    # Amount of times the habit has been completed
    recurrences = models.IntegerField(null=True)


# Base habit model
class Habit(models.Model):
    # Who has the habit
    user = models.ForeignKey(settings.AUTH_USER_MODEL,
                             on_delete=models.CASCADE, blank=True)
    # The name of the habit
    title = models.CharField(max_length=255, blank=True)
    # Information for frequency of a particular habit
    # frequency = models.ForeignKey(Frequency, blank=True)


# In-Depth information of habit instances
class HabitMeta(models.Model):
    COMPLETE = 'complete'
    INCOMPLETE = 'incomplete'
    PHASES = [(COMPLETE, 'Complete'), (INCOMPLETE, 'Incomplete'), ]

    habit = models.ForeignKey(Habit, on_delete=models.CASCADE)
    # What exactly the habit is
    summary = models.CharField(max_length=255, blank=True)
    # Day the habit is created
    date = models.DateField(null=True, auto_now_add=True)
    # Checks whether or not the habit is completed
    phase = models.CharField(
        null=True,
        max_length=255,
        choices=PHASES,
        default=INCOMPLETE,
    )
