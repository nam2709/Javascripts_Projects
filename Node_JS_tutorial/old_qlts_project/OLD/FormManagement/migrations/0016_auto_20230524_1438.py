# Generated by Django 3.2.10 on 2023-05-24 07:38

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('AssetManagement', '0013_asset_asset_name'),
        ('FormManagement', '0015_auto_20230523_1650'),
    ]

    operations = [
        migrations.AddField(
            model_name='formmanagement',
            name='supplier',
            field=models.ForeignKey(blank=True, help_text='Supplier', null=True, on_delete=django.db.models.deletion.SET_NULL, to='AssetManagement.suppliercategory'),
        ),
        migrations.AddField(
            model_name='formmanagement',
            name='warehouse',
            field=models.ForeignKey(blank=True, help_text='Warehouse', null=True, on_delete=django.db.models.deletion.SET_NULL, to='AssetManagement.warehousecategory'),
        ),
    ]