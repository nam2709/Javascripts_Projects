# Generated by Django 3.2.18 on 2023-05-31 08:05

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('company', '0007_position_code'),
    ]

    operations = [
        migrations.AddField(
            model_name='staffstatus',
            name='code',
            field=models.CharField(help_text='Mã trạng Thái', max_length=1024, null=True),
        ),
    ]
