# Generated by Django 4.1.7 on 2023-03-16 14:35

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('habits', '0004_habitmeta_habit_date'),
    ]

    operations = [
        migrations.AddField(
            model_name='habit',
            name='is_completed',
            field=models.BooleanField(default=False),
        ),
    ]
