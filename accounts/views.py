from django.contrib.auth import get_user_model
from django.contrib.auth.decorators import login_required
from django.shortcuts import get_object_or_404
from django.http import HttpResponse

from rest_framework import generics

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


class ActivityRecordCreateAPIView(generics.CreateAPIView):
    serializer_class = ActivitySerializer

    def get_queryset(self):
        return models.ActivityLog.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


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
