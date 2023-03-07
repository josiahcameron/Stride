from django.urls import path
from . import views


urlpatterns = [
    path('habits/', views.HabitsAPIView.as_view()),
    path('habit/<int:pk>/', views.HabitMetaAPIView.as_view()),
]
