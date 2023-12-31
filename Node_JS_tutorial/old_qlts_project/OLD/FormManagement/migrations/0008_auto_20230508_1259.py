# Generated by Django 3.2.10 on 2023-05-08 05:59

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('company', '0001_initial'),
        ('FormManagement', '0007_auto_20230506_1030'),
    ]

    operations = [
        migrations.AddField(
            model_name='historyuseasset',
            name='end_use',
            field=models.DateTimeField(blank=True, help_text='End Use', null=True),
        ),
        migrations.AlterField(
            model_name='formmanagement',
            name='lending_unit',
            field=models.ForeignKey(blank=True, help_text='Lending Unit', null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='lending_unit', to='company.unit'),
        ),
        migrations.AlterField(
            model_name='formmanagement',
            name='unit_currently_borrowing',
            field=models.ForeignKey(blank=True, help_text='Unit Currently Browwing', null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='unit_currently_borrowing', to='company.unit'),
        ),
        migrations.AlterField(
            model_name='historyuseasset',
            name='name',
            field=models.CharField(default='Người sử dụng', help_text='Name', max_length=1024),
        ),
        migrations.AlterField(
            model_name='historyuseasset',
            name='started_using',
            field=models.DateTimeField(blank=True, help_text='Stared Using', null=True),
        ),
    ]
