# Generated by Django 4.1.7 on 2023-03-15 14:39

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0010_remove_customuser_tier_profile_tier'),
    ]

    operations = [
        migrations.RenameField(
            model_name='profile',
            old_name='username',
            new_name='display_name',
        ),
    ]
