# Generated by Django 3.2.10 on 2023-05-11 09:54

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('company', '0002_staffinformation_avatar'),
        ('AssetManagement', '0011_alter_asset_date_added'),
        ('FormManagement', '0009_listtypeform_fields'),
    ]

    operations = [
        migrations.AlterField(
            model_name='historyuseasset',
            name='asset',
            field=models.ForeignKey(blank=True, help_text='Asset', null=True, on_delete=django.db.models.deletion.SET_NULL, to='AssetManagement.asset'),
        ),
        migrations.AlterField(
            model_name='historyuseasset',
            name='user',
            field=models.ForeignKey(blank=True, help_text='User', null=True, on_delete=django.db.models.deletion.SET_NULL, to='company.staff'),
        ),
    ]