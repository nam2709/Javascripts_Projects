# Generated by Django 3.2.10 on 2023-05-05 05:11

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('FormManagement', '0003_alter_formmanagement_execution_date'),
    ]

    operations = [
        migrations.AlterField(
            model_name='formmanagement',
            name='execution_date',
            field=models.DateTimeField(blank=True, default=django.utils.timezone.now, help_text='Implementation date', null=True),
        ),
    ]
