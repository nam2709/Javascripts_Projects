# Generated by Django 3.2.18 on 2023-05-30 07:33

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('company', '0003_auto_20230525_1127'),
    ]

    operations = [
        migrations.AlterField(
            model_name='staffinformation',
            name='email',
            field=models.CharField(help_text='email Nhân Viên', max_length=1024),
        ),
        migrations.AlterField(
            model_name='staffinformation',
            name='id_card',
            field=models.CharField(help_text='Chứng Minh Thư', max_length=1024),
        ),
    ]
