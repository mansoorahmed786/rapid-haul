# Generated by Django 5.1.3 on 2025-01-14 00:03

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("backend", "0006_companyprofile_status"),
    ]

    operations = [
        migrations.AddField(
            model_name="driverprofile",
            name="about",
            field=models.TextField(blank=True, null=True),
        ),
    ]
