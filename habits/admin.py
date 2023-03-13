from django.contrib import admin
from .models import Habit, HabitMeta

# Register your models here.
admin.site.register(Habit)
admin.site.register(HabitMeta)
