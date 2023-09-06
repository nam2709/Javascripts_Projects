# Generated by Django 3.2.10 on 2023-05-26 07:18

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('AssetManagement', '0013_asset_asset_name'),
        ('company', '0002_staffinformation_avatar'),
        ('FormManagement', '0016_auto_20230524_1438'),
    ]

    operations = [
        migrations.AlterField(
            model_name='historyuseasset',
            name='asset',
            field=models.ForeignKey(blank=True, help_text='Asset', null=True, on_delete=django.db.models.deletion.SET_NULL, to='AssetManagement.asset'),
        ),
        migrations.AlterField(
            model_name='historyuseasset',
            name='type_action',
            field=models.ForeignKey(blank=True, help_text='Asset', null=True, on_delete=django.db.models.deletion.SET_NULL, to='FormManagement.typeaction'),
        ),
        migrations.AlterField(
            model_name='historyuseasset',
            name='user',
            field=models.ForeignKey(blank=True, help_text='User', null=True, on_delete=django.db.models.deletion.SET_NULL, to='company.staff'),
        ),
    ]
