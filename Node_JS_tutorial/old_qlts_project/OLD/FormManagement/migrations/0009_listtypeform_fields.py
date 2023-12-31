# Generated by Django 3.2.10 on 2023-05-08 23:46

from django.db import migrations
import multiselectfield.db.fields


class Migration(migrations.Migration):

    dependencies = [
        ('FormManagement', '0008_auto_20230508_1259'),
    ]

    operations = [
        migrations.AddField(
            model_name='listtypeform',
            name='fields',
            field=multiselectfield.db.fields.MultiSelectField(blank=True, choices=[('name', 'Tên Phiếu'), ('code', 'Mã Phiếu'), ('execution_date', 'Ngày thực hiện'), ('attached_document', 'Đơn đi kèm'), ('delivered', 'Họ tên người giao'), ('received', 'Họ tên người nhận'), ('staff_receive_property', 'Nhân viên nhận tài sản được cấp'), ('staff_confiscated_asset', 'Nhân viên bị thu hồi tài sản'), ('reason_asset_recovery', 'Lý do bị thu hồi tài sản'), ('loan_period', 'Thời gian mượn đến'), ('lending_unit', 'Đơn vị cho mượn'), ('unit_currently_borrowing', 'Đơn vị đang mượn'), ('warehouse', 'Kho'), ('suplier', 'Nhà cung cấp'), ('buyer', 'Người mua'), ('price', 'Giá'), ('liquidation_reason', 'Lý do thanh lý'), ('created_by', 'Người tạo phiếu'), ('updated_by', 'Người chỉnh sửa'), ('updated_at', 'Ngày chỉnh sửa'), ('created_at', 'Ngày tạo phiếu')], help_text='Lựa chọn trường cho loại phiếu', max_length=273, null=True),
        ),
    ]
