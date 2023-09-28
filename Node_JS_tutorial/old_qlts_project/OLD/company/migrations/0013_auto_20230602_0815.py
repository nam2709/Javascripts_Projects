# Generated by Django 3.2.18 on 2023-06-02 08:15

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('SystemGeneralDirectoryManagement', '0003_alter_province_options'),
        ('company', '0012_auto_20230601_0250'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='company',
            name='city',
        ),
        migrations.RemoveField(
            model_name='company',
            name='commune',
        ),
        migrations.RemoveField(
            model_name='company',
            name='district',
        ),
        migrations.RemoveField(
            model_name='staffinformation',
            name='city',
        ),
        migrations.RemoveField(
            model_name='staffinformation',
            name='commune',
        ),
        migrations.RemoveField(
            model_name='staffinformation',
            name='district',
        ),
        migrations.RemoveField(
            model_name='staffinformation',
            name='position',
        ),
        migrations.AddField(
            model_name='company',
            name='districts',
            field=models.ForeignKey(blank=True, help_text='Thuộc Huyện', null=True, on_delete=django.db.models.deletion.SET_NULL, to='SystemGeneralDirectoryManagement.districts'),
        ),
        migrations.AddField(
            model_name='company',
            name='province',
            field=models.ForeignKey(blank=True, help_text='Thuộc Tỉnh', null=True, on_delete=django.db.models.deletion.CASCADE, to='SystemGeneralDirectoryManagement.province'),
        ),
        migrations.AddField(
            model_name='company',
            name='ward',
            field=models.ForeignKey(blank=True, help_text='Thuộc Xã', null=True, on_delete=django.db.models.deletion.CASCADE, to='SystemGeneralDirectoryManagement.ward'),
        ),
        migrations.AddField(
            model_name='staffinformation',
            name='districts',
            field=models.ForeignKey(blank=True, help_text='Thuộc Huyện', null=True, on_delete=django.db.models.deletion.SET_NULL, to='SystemGeneralDirectoryManagement.districts'),
        ),
        migrations.AddField(
            model_name='staffinformation',
            name='province',
            field=models.ForeignKey(blank=True, help_text='Thuộc Tỉnh', null=True, on_delete=django.db.models.deletion.CASCADE, to='SystemGeneralDirectoryManagement.province'),
        ),
        migrations.AddField(
            model_name='staffinformation',
            name='ward',
            field=models.ForeignKey(blank=True, help_text='Thuộc Xã', null=True, on_delete=django.db.models.deletion.CASCADE, to='SystemGeneralDirectoryManagement.ward'),
        ),
    ]