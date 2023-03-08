from django.db import models
from django.conf import settings


# Create your models here.


# Base habit model
class Habit(models.Model):
    # Goal tiers
    D_GOAL = 'stroll'
    W_GOAL = 'jaunt'
    M_GOAL = 'parade'

    FREQUENCY_OPTIONS = [
        (D_GOAL, 'stroll'),
        (W_GOAL, 'jaunt'),
        (M_GOAL, 'parade'),
    ]
    # Who has the habit
    user = models.ForeignKey(settings.AUTH_USER_MODEL,
                             on_delete=models.CASCADE, blank=True)
    # The name of the habit
    title = models.CharField(max_length=255, blank=True)
    # Amount of times the habit has been completed
    recurrences = models.IntegerField(null=True)

    def __str__(self):
        return self.title


# In-Depth information of habit instances
class HabitMeta(models.Model):
    COMPLETE = 'complete'
    INCOMPLETE = 'incomplete'
    PHASES = [(COMPLETE, 'Complete'), (INCOMPLETE, 'Incomplete'), ]
    habit = models.ForeignKey(
        Habit, on_delete=models.CASCADE)
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

    def __str__(self):
        return self.habit
