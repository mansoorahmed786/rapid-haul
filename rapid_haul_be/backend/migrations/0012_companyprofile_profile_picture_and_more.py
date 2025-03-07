# Generated by Django 5.1.3 on 2025-01-21 02:21

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("backend", "0011_remove_user_address_remove_user_phone_number_and_more"),
    ]

    operations = [
        migrations.AddField(
            model_name="companyprofile",
            name="profile_picture",
            field=models.ImageField(
                blank=True, null=True, upload_to="profile_pictures/"
            ),
        ),
        migrations.AddField(
            model_name="driverprofile",
            name="profile_picture",
            field=models.ImageField(
                blank=True, null=True, upload_to="profile_pictures/"
            ),
        ),
    ]
