# Generated by Django 3.2.18 on 2023-05-25 03:43

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Perm', '0006_auto_20230525_0312'),
    ]

    operations = [
        migrations.AddField(
            model_name='apppermission',
            name='stt',
            field=models.CharField(help_text='Sttt', max_length=100, null=True),
        ),
    ]
