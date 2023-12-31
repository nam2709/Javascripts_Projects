# Generated by Django 3.2.10 on 2023-05-10 03:11

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('Depreciation', '0010_alter_adjustment_number'),
    ]

    operations = [
        migrations.AddField(
            model_name='depreciationdetail',
            name='adjustment_aset',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='adjustment_tyoe', to='Depreciation.adjustment'),
        ),
        migrations.AddField(
            model_name='depreciationdetail',
            name='adjustment_number',
            field=models.DecimalField(blank=True, decimal_places=2, default=0, editable=False, help_text=' he so ', max_digits=30, null=True),
        ),
    ]
