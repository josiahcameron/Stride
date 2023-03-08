from django.contrib.auth import get_user_model
from django.contrib.auth.decorators import login_required
from django.shortcuts import get_object_or_404
from django.http import HttpResponse

from rest_framework import generics

from . import models
from .serializers import UserSerializer

# Create your views here.


class UserCreateAPIView(generics.CreateAPIView):
    queryset = models.CustomUser.objects.all()
    serializer_class = UserSerializer


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
