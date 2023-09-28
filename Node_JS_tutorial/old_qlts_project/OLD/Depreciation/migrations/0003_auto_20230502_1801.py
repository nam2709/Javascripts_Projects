# Generated by Django 3.2.10 on 2023-05-02 11:01

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Depreciation', '0002_auto_20230428_1138'),
    ]

    operations = [
        migrations.AlterField(
            model_name='depreciationdetail',
            name='add_value',
            field=models.DecimalField(blank=True, decimal_places=2, default=0, help_text='Tang/giam gia trị', max_digits=15, null=True),
        ),
        migrations.AlterField(
            model_name='depreciationdetail',
            name='depreciation_value',
            field=models.DecimalField(blank=True, decimal_places=2, default=0, editable=False, help_text=' Giá trị để khấu hao', max_digits=15, null=True),
        ),
    ]