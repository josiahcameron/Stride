from django.urls import path

from .views import UserCreateAPIView, ActivityRecordCreateAPIView

urlpatterns = [
    path('accounts/', UserCreateAPIView.as_view()),
    path('add-record/', ActivityRecordCreateAPIView.as_view())
]
