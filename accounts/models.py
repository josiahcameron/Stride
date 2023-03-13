from django.contrib.auth.models import AbstractUser
from django.db import models
from django.conf import settings


class CustomUser(AbstractUser):
    # Goal tiers
    f_tier = 'first'
    d_tier = 'second'
    c_tier = 'third'
    b_tier = 'fourth'
    a_tier = 'fifth'
    m_tier = 'master'

    USER_TIERS = [
        (f_tier, 'first'),
        (d_tier, 'second'),
        (c_tier, 'third'),
        (b_tier, 'fourth'),
        (a_tier, 'fifth'),
        (m_tier, 'master'),
    ]

    # Setting up friends field in our user model
    friends = models.ManyToManyField("CustomUser", blank=True)
    # Determines how many habits a user can set
    tier = models.CharField(
        null=True,
        max_length=255,
        choices=USER_TIERS,
        default=f_tier,
    )


class Profile(models.Model):
    user = models.OneToOneField(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, blank=True)

    avatar = models.ImageField(upload_to='profiles/', blank=True)
    username = models.CharField(max_length=32)

    def __str__(self):
        return self.user.username

# Each instance will be a record of a user completing a phase


class UserActivityLog(models.Model):

    user = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, blank=True)
    date = models.DateField(null=True, auto_now=True)

    # How many times a user has completed all habits
    count = models.IntegerField(blank=True)

    # How many times a user has completed all steps consecutively
    streak = models.BigIntegerField(blank=True)

    def __str__(self):
        return (f"{self.user.username}-{self.date}-{self.tier}")

# User's monthly message to themselves


class Journal(models.Model):
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, blank=True)
    created_at = models.DateTimeField(null=True, auto_now=True)
    text = models.TextField(blank=True)


class Friend_Request(models.Model):
    # related_name is used when there's a reverse relation from the User model to this model
    # User who sends the request
    from_user = models.ForeignKey(
        CustomUser, related_name='from_user', on_delete=models.CASCADE)

    # User receiving the request
    to_user = models.ForeignKey(
        CustomUser, related_name="to_user", on_delete=models.CASCADE)

# User messages to themselves


class Log(models.Model):
    text = models.TextField(blank=True)
    created_at = models.DateTimeField(null=True, auto_now=True)
    updated_at = models.DateTimeField(null=True, auto_now=True)
