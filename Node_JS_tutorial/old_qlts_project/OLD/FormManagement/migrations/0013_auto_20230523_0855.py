# Generated by Django 3.2.10 on 2023-05-23 01:55

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('company', '0002_staffinformation_avatar'),
        ('AssetManagement', '0013_asset_asset_name'),
        ('FormManagement', '0012_auto_20230521_1651'),
    ]

    operations = [
        migrations.AlterField(
            model_name='historyuseasset',
            name='asset',
            field=models.ForeignKey(blank=True, help_text='Asset', null=True, on_delete=django.db.models.deletion.DO_NOTHING, to='AssetManagement.asset'),
        ),
        migrations.AlterField(
            model_name='historyuseasset',
            name='user',
            field=models.ForeignKey(blank=True, help_text='User', null=True, on_delete=django.db.models.deletion.DO_NOTHING, to='company.staff'),
        ),
        migrations.AlterField(
            model_name='listasset',
            name='asset',
            field=models.ForeignKey(blank=True, help_text='Asset', null=True, on_delete=django.db.models.deletion.CASCADE, to='AssetManagement.asset'),
        ),
    ]