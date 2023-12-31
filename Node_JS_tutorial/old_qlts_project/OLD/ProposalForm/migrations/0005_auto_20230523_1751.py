# Generated by Django 3.2.10 on 2023-05-23 10:51

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone
import multiselectfield.db.fields
import uuid


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('ProposalForm', '0004_auto_20230522_1101'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='list',
            name='id',
        ),
        migrations.AddField(
            model_name='list',
            name='created_at',
            field=models.DateTimeField(default=django.utils.timezone.now, help_text='Thời điểm đăng tải'),
        ),
        migrations.AddField(
            model_name='list',
            name='created_by',
            field=models.ForeignKey(blank=True, help_text='Người tạo', null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='proposalform_list_created_by', to=settings.AUTH_USER_MODEL, to_field='username'),
        ),
        migrations.AddField(
            model_name='list',
            name='name',
            field=models.CharField(blank=True, help_text='Tên', max_length=1024, null=True),
        ),
        migrations.AddField(
            model_name='list',
            name='updated_at',
            field=models.DateTimeField(default=django.utils.timezone.now, help_text='Thời điểm cập nhật'),
        ),
        migrations.AddField(
            model_name='list',
            name='updated_by',
            field=models.ForeignKey(blank=True, help_text='Người cập nhật', null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='proposalform_list_updated_by', to=settings.AUTH_USER_MODEL, to_field='username'),
        ),
        migrations.AddField(
            model_name='list',
            name='uuid',
            field=models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False),
        ),
        migrations.AlterField(
            model_name='listtype',
            name='fields',
            field=multiselectfield.db.fields.MultiSelectField(blank=True, choices=[('name', 'Tên'), ('code', 'Mã'), ('execution_date', 'Ngày thực hiện'), ('delivered', 'Họ tên người giao'), ('received', 'Họ tên người nhận'), ('staff_receive_property', 'Nhân viên nhận tài sản được cấp'), ('staff_confiscated_asset', 'Nhân viên bị thu hồi tài sản'), ('reason_asset_recovery', 'Lý do bị thu hồi tài sản'), ('loan_period', 'Thời gian mượn đến'), ('lending_unit', 'Đơn vị cho mượn'), ('unit_currently_borrowing', 'Đơn vị đang mượn'), ('warehouse', 'Kho'), ('suplier', 'Nhà cung cấp'), ('buyer', 'Người mua'), ('price', 'Giá'), ('liquidation_reason', 'Lý do thanh lý'), ('created_by', 'Người tạo'), ('updated_by', 'Người chỉnh sửa'), ('updated_at', 'Ngày chỉnh sửa'), ('created_at', 'Ngày tạo')], help_text='Lựa chọn trường', max_length=255, null=True),
        ),
        migrations.AlterField(
            model_name='proposalform',
            name='reason',
            field=models.CharField(help_text='Lý do tạo đơn', max_length=10024, null=True),
        ),
    ]
