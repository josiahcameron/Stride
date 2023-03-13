# Generated by Django 4.1.7 on 2023-03-13 19:47

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0007_rename_activity_activitylog'),
    ]

    operations = [
        migrations.CreateModel(
            name='UserActivityLog',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date', models.DateField(auto_now=True, null=True)),
                ('count', models.IntegerField(blank=True)),
                ('streak', models.BigIntegerField(blank=True)),
            ],
        ),
        migrations.RemoveField(
            model_name='profile',
            name='streak',
        ),
        migrations.AddField(
            model_name='customuser',
            name='tier',
            field=models.CharField(choices=[('first', 'first'), ('second', 'second'), ('third', 'third'), ('fourth', 'fourth'), ('fifth', 'fifth'), ('master', 'master')], default='first', max_length=255, null=True),
        ),
        migrations.DeleteModel(
            name='ActivityLog',
        ),
        migrations.AddField(
            model_name='useractivitylog',
            name='user',
            field=models.OneToOneField(blank=True, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
    ]
