# Generated by Django 3.2.10 on 2023-05-30 08:21

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Code', '0007_alter_generatecode_current_code'),
    ]

    operations = [
        migrations.AlterField(
            model_name='generatecode',
            name='current_code',
            field=models.CharField(blank=True, default='current_code', help_text='current_code', max_length=1024, null=True, unique=True),
        ),
    ]
