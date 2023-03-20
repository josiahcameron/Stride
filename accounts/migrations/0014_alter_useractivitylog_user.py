# Generated by Django 4.1.7 on 2023-03-20 16:11

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0013_useractivitylog_record_date'),
    ]

    operations = [
        migrations.AlterField(
            model_name='useractivitylog',
            name='user',
            field=models.ForeignKey(blank=True, on_delete=django.db.models.deletion.CASCADE, related_name='user_activity_log', to=settings.AUTH_USER_MODEL),
        ),
    ]
