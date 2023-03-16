from django.urls import path
from . import views


urlpatterns = [
    path('habits/', views.HabitsAPIView.as_view()),
    path('habit-meta/', views.HabitMetaAPIView.as_view()),
    path('add-habit/', views.HabitsAPIView.as_view()),
    path('add-habit-meta/', views.HabitMetaAPIView.as_view()),
    # path('habit/<int:pk>/', views.HabitMetaAPIView.as_view()),
    path('update-habit-meta/<int:pk>/', views.UpdateHabitMetaAPIView.as_view()),
]
