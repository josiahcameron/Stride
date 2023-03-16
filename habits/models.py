from django.db import models
from django.conf import settings


# Create your models here.
class Habit(models.Model):

    D_GOAL = 'daily'
    W_GOAL = 'weekly'
    M_GOAL = 'monthly'

    HABIT_TYPES = [
        (D_GOAL, 'daily'),
        (W_GOAL, 'weekly'),
        (M_GOAL, 'monthly'),
    ]

    user = models.ForeignKey(settings.AUTH_USER_MODEL,
                             on_delete=models.CASCADE, blank=True)
    title = models.CharField(max_length=255, blank=True)
    frequency = models.CharField(
        null=True,
        max_length=255,
        choices=HABIT_TYPES,
        default=D_GOAL,
    )
    is_completed = models.BooleanField(default=False)
# Logic to check whether or not User's habit is active
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return self.title


class HabitMeta(models.Model):
    habit = models.ForeignKey(Habit, on_delete=models.CASCADE, blank=True)
    date_completed = models.DateField(auto_now_add=True)

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=['habit', 'date_completed'], name='habit_date')
        ]

    def __str__(self):
        return (f"{self.date_completed}-{self.habit.title}")


# Each instance will be a record of a user completing a phase


# x    habit = models.OneToOneField(
#     Habit, on_delete=models.CASCADE, primary_key=True)


# class GroupHabit(models.Model):
#     users = models.ManyToManyField(settings.AUTH_USER_MODEL)
