# Generated by Django 3.2.10 on 2023-05-10 10:03

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('Depreciation', '0011_auto_20230510_0311'),
    ]

    operations = [
        migrations.AddField(
            model_name='depreciationassetdetail',
            name='yearviews',
            field=models.DateField(default=django.utils.timezone.now, help_text='Thời điểm khấu hao'),
        ),
    ]