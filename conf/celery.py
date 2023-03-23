import os
from celery import Celery
from datetime import timedelta
from celery_tasks.beat_schedule import beat_schedule

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'conf.settings')

# Create a Celery instance
app = Celery('conf')

# Configure Celery to use the settings in our Django project
app.config_from_object('django.conf:settings', namespace='CELERY')

# Set the broker and result backend URLs
app.conf.update(
    CELERY_BROKER_URL=os.getenv('REDIS_URL', 'redis://localhost:6379/0'),
    CELERY_RESULT_BACKEND=os.getenv('REDIS_URL', 'redis://localhost:6379/0'),
)

app.conf.beat_schedule = beat_schedule
app.conf.timezone = 'UTC'

# Discover and register task modules
app.autodiscover_tasks()
