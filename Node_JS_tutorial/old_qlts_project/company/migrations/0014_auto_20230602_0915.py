# Generated by Django 3.2.18 on 2023-06-02 09:15

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('SystemGeneralDirectoryManagement', '0003_alter_province_options'),
        ('company', '0013_auto_20230602_0815'),
    ]

    operations = [
        migrations.AddField(
            model_name='staffinformation',
            name='position',
            field=models.ForeignKey(blank=True, help_text='Thuộc Phòng', null=True, on_delete=django.db.models.deletion.CASCADE, to='company.position'),
        ),
        migrations.AlterField(
            model_name='staffinformation',
            name='ward',
            field=models.ForeignKey(blank=True, help_text='Thuộc Thị Trấn', null=True, on_delete=django.db.models.deletion.CASCADE, to='SystemGeneralDirectoryManagement.ward'),
        ),
    ]
