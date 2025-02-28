# Generated by Django 5.1.3 on 2025-01-23 02:14

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("backend", "0012_companyprofile_profile_picture_and_more"),
    ]

    operations = [
        migrations.AddField(
            model_name="companyprofile",
            name="availability_expires_at",
            field=models.DateTimeField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name="companyprofile",
            name="expiry_time",
            field=models.IntegerField(default=72),
        ),
    ]
