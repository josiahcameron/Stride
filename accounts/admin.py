from django.contrib import admin
from django.contrib.auth.admin import UserAdmin

from .models import CustomUser, ActivityLog

from habits.models import Habit, HabitMeta

# Register your models here.

admin.site.register(CustomUser, UserAdmin)
admin.site.register(Habit)
admin.site.register(HabitMeta)
admin.site.register(ActivityLog)
