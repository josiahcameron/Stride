# Generated by Django 4.1.7 on 2023-03-18 16:50

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0012_alter_profile_avatar'),
    ]

    operations = [
        migrations.AddConstraint(
            model_name='useractivitylog',
            constraint=models.UniqueConstraint(fields=('user', 'date'), name='record_date'),
        ),
    ]
