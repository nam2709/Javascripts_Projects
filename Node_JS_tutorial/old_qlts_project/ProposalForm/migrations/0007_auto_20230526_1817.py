# Generated by Django 3.2.10 on 2023-05-26 11:17

from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('company', '0002_staffinformation_avatar'),
        ('ProposalForm', '0006_merge_20230526_1817'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='list',
            options={'verbose_name': 'Tài sản theo danh sách', 'verbose_name_plural': 'Tài sản theo danh sách'},
        ),
        migrations.AlterModelOptions(
            name='listtype',
            options={'verbose_name': 'Kiểu đơn', 'verbose_name_plural': 'Kiểu đơn'},
        ),
        migrations.AddField(
            model_name='proposalform',
            name='company',
            field=models.ForeignKey(blank=True, help_text='Công ty', null=True, on_delete=django.db.models.deletion.SET_NULL, to='company.company'),
        ),
        migrations.AlterField(
            model_name='proposalform',
            name='created_at',
            field=models.DateTimeField(default=django.utils.timezone.now, help_text='Thời điểm tạo'),
        ),
        migrations.AlterField(
            model_name='proposalformtype',
            name='created_at',
            field=models.DateTimeField(default=django.utils.timezone.now, help_text='Thời điểm tạo'),
        ),
    ]
