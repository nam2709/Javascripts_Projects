# Generated by Django 3.2.18 on 2023-06-01 02:50

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('company', '0011_unit_code'),
    ]

    operations = [
        migrations.AddField(
            model_name='companystatus',
            name='desc',
            field=models.TextField(blank=True, help_text='Mô tả', max_length=5000, null=True),
        ),
        migrations.AddField(
            model_name='staffstatus',
            name='desc',
            field=models.TextField(blank=True, help_text='Mô tả', max_length=5000, null=True),
        ),
    ]
