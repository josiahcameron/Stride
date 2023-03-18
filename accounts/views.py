from datetime import date, timedelta

from django.contrib.auth import get_user_model
from django.contrib.auth.decorators import login_required
from django.shortcuts import get_object_or_404
from django.http import HttpResponse

from rest_framework import generics, status
from rest_framework import permissions
from rest_framework.views import APIView
from rest_framework.decorators import api_view
from rest_framework.response import Response


from . import models
from .serializers import UserSerializer, ActivitySerializer, ProfileSerializer

# Create your views here.


class UserCreateAPIView(generics.CreateAPIView):
    queryset = models.CustomUser.objects.all()
    serializer_class = UserSerializer


class ProfileCreateAPIView(generics.CreateAPIView):
    queryset = models.Profile.objects.all()
    serializer_class = ProfileSerializer

    def perform_create(self, serializer):
        # serializer.save(user=get_object_or_404(User, id=1))
        serializer.save(user=self.request.user)


class ProfileAPIView(generics.ListAPIView):
    serializer_class = ProfileSerializer

    def get_queryset(self):
        if self.request.user.is_superuser:
            return models.Profile.objects.all()
        else:
            return models.Profile.objects.filter(user=self.request.user)


class ActivityRecordCreateAPIView(generics.ListCreateAPIView):
    serializer_class = ActivitySerializer

    def get_queryset(self):
        return models.UserActivityLog.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        streak = 0  # consecutive
        count = 0  # not consecutive
        tier = 'first'

        # def check_streak(self):
        today = date.today() - timedelta(days=0)
        yesterday = today - timedelta(days=1)

        try:
            previous_entry = models.UserActivityLog.objects.filter(
                user=self.request.user, date__lt=date.today()).latest('date')
        except:
            previous_entry = None

        if previous_entry is None:
            streak = 1
            count = 1

        elif previous_entry.date == yesterday:
            streak = previous_entry.streak + 1
            count = previous_entry.count + 1

        else:
            streak = 1
            count = previous_entry.count + 1

        serializer.save(user=self.request.user,
                        streak=streak, count=count)


class RemoveActivityRecordAPIView(APIView):
    def delete(self, request, pk):
        current_date = date.today()
        # .get targets individual instance; filter gives an array, get gives an object
        # Retrieves
        user_activity = models.UserActivityLog.objects.get(
            user=self.request.user, date_completed=current_date)
        user_activity.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

# @login_required
# def send_friend_request(request, userID):
#     from_user = request.user
#     to_user = models.CustomUser.objects.get(id=userID)
#     friend_request, created = models.Friend_Request.objects.get_or_create(
#         from_user=from_user, to_user=to_user)
#     if created:
#         return HttpResponse('friend request sent')
#     else:
#         return HttpResponse('friend request was already sent')


# @login_required
# def accept_friend_request(request, userID):
