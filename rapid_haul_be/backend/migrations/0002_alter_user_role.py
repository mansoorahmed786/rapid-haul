# Generated by Django 5.1.3 on 2025-01-04 22:54

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("backend", "0001_initial"),
    ]

    operations = [
        migrations.AlterField(
            model_name="user",
            name="role",
            field=models.CharField(
                blank=True,
                choices=[("Driver", "Driver"), ("Company", "Company")],
                max_length=20,
                null=True,
            ),
        ),
    ]
