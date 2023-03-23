from django.contrib import admin
from django.contrib.auth.admin import UserAdmin

from .models import CustomUser, UserActivityLog, Profile, Journal


# Register your models here.

admin.site.register(CustomUser, UserAdmin)

admin.site.register(UserActivityLog)

admin.site.register(Profile)

admin.site.register(Journal)
