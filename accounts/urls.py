from django.urls import path

from .views import UserCreateAPIView

urlpatterns = [
    path('accounts/', UserCreateAPIView.as_view()),
]
