from django.contrib.auth.models import AbstractUser
from django.db import models
from django.conf import settings


class CustomUser(AbstractUser):
    # Setting up friends field in our user model
    friends = models.ManyToManyField("CustomUser", blank=True)


class Profile(models.Model):
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

    user = models.OneToOneField(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, blank=True)

    avatar = models.ImageField(upload_to='add-profile/', blank=True)
    display_name = models.CharField(max_length=32)

    # Determines how many habits a user can set
    tier = models.CharField(
        null=True,
        max_length=255,
        choices=USER_TIERS,
        default=f_tier,
    )

    def __str__(self):
        return self.user.username

# Each instance will be a record of a user completing a phase


class UserActivityLog(models.Model):

    user = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, blank=True)
    date = models.DateField(null=True, auto_now=True,)

    # How many times a user has completed all habits
    count = models.IntegerField(blank=True)

    # How many times a user has completed all steps consecutively
    streak = models.BigIntegerField(blank=True)

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=['user', 'date'], name='record_date')
        ]

    def __str__(self):
        return (f"{self.user.username}-{self.date}")


# User's monthly message to themselves


class Journal(models.Model):
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, blank=True)
    title = models.CharField(max_length=255, default="No Title")
    created_at = models.DateTimeField(null=True, auto_now=True)
    text = models.TextField(blank=True)

    def __str__(self):
        return (f"{self.user.username}-{self.title}-{self.created_at}")


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
