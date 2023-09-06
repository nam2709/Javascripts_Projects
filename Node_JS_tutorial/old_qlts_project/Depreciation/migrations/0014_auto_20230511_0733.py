# Generated by Django 3.2.10 on 2023-05-11 07:33

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Depreciation', '0013_depreciationdetail_year_views'),
    ]

    operations = [
        migrations.AlterField(
            model_name='assetrevaluation',
            name='time_revaluation',
            field=models.DateField(default=datetime.date.today, help_text='Thời điểm thay đổi'),
        ),
        migrations.AlterField(
            model_name='depreciationassetdetail',
            name='days_depreciation',
            field=models.DateField(default=datetime.date.today, help_text='Thời điểm khấu hao'),
        ),
        migrations.AlterField(
            model_name='depreciationassetdetail',
            name='yearviews',
            field=models.DateField(default=datetime.date.today, help_text='Thời điểm khấu hao'),
        ),
        migrations.AlterField(
            model_name='depreciationdetail',
            name='date_been_add',
            field=models.DateField(default=datetime.date.today, help_text='Thời điểm khấu hao'),
        ),
        migrations.AlterField(
            model_name='depreciationdetail',
            name='year_views',
            field=models.DateField(default=datetime.date.today, help_text='Thời điểm khấu hao'),
        ),
    ]
