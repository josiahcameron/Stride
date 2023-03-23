from datetime import timedelta

beat_schedule = {
    'hello_world': {
        'task': 'celery_tasks.tasks.hello_world',
        'schedule': timedelta(minutes=1),
    },
}
