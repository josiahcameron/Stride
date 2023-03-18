from django.urls import path

from .views import UserCreateAPIView, ActivityRecordCreateAPIView, ProfileCreateAPIView, ProfileAPIView

urlpatterns = [
    path('accounts/', UserCreateAPIView.as_view()),
    path('add-profile/', ProfileCreateAPIView.as_view()),
    path('profile/', ProfileAPIView.as_view()),
    path('add-user-record/', ActivityRecordCreateAPIView.as_view())
]
