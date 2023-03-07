from django.urls import path, include

urlpatterns = [
    path('', include('habits.urls')),
]
