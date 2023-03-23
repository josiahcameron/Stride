from celery import app


@app.shared_task
def hello_world():
    print('Hello, World!')
