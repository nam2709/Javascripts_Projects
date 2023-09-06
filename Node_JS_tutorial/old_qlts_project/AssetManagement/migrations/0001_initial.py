# Generated by Django 3.2.10 on 2023-04-27 12:12

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone
import uuid


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('company', '__first__'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Asset',
            fields=[
                ('uuid', models.UUIDField(default=uuid.uuid4, editable=False, help_text='Khóa chính của tài sản', primary_key=True, serialize=False, unique=True)),
                ('code', models.CharField(help_text='Mã tài sản', max_length=150, unique=True)),
                ('name', models.CharField(blank=True, help_text='Tên tài sản', max_length=150, null=True)),
                ('price_buy', models.DecimalField(blank=True, decimal_places=2, default=0, help_text='Giá mua', max_digits=15, null=True)),
                ('date_added', models.DateField(default=django.utils.timezone.now, help_text='Ngày mua')),
                ('price_current', models.TextField(blank=True, help_text='Giá trị hiện tại của tài sản', null=True)),
                ('created_at', models.DateTimeField(default=django.utils.timezone.now, editable=False, help_text='Được tạo lúc')),
                ('updated_at', models.DateField(default=django.utils.timezone.now, editable=False, help_text='Cập nhật lúc')),
            ],
            options={
                'verbose_name': 'Tài sản',
                'verbose_name_plural': 'Những Tài sản',
            },
        ),
        migrations.CreateModel(
            name='AssetOfType',
            fields=[
                ('uuid', models.UUIDField(default=uuid.uuid4, editable=False, help_text='Khóa chính của loại hình tài sản', primary_key=True, serialize=False, unique=True)),
                ('code', models.CharField(help_text='Mã loại hình tài sản', max_length=150, unique=True)),
                ('name', models.CharField(blank=True, help_text='Tên loại hình tài sản', max_length=150, null=True, unique=True)),
                ('created_at', models.DateTimeField(default=django.utils.timezone.now, editable=False, help_text='Được tạo lúc')),
                ('updated_at', models.DateField(default=django.utils.timezone.now, editable=False, help_text='Cập nhật lúc')),
                ('created_by', models.ForeignKey(blank=True, editable=False, help_text='Được tạo bởi', null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='assetmanagement_assetoftype_created_by', to=settings.AUTH_USER_MODEL, to_field='username')),
                ('updated_by', models.ForeignKey(blank=True, editable=False, help_text='Cập nhật bởi', null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='assetmanagement_assetoftype_updated_by', to=settings.AUTH_USER_MODEL, to_field='username')),
            ],
            options={
                'verbose_name': 'Loại hình tài sản',
                'verbose_name_plural': 'Những loại hình tài sản',
            },
        ),
        migrations.CreateModel(
            name='WareHouseCategory',
            fields=[
                ('uuid', models.UUIDField(default=uuid.uuid4, editable=False, help_text='Khóa chính của kho', primary_key=True, serialize=False, unique=True)),
                ('code', models.CharField(help_text='Mã kho', max_length=150, unique=True)),
                ('name', models.CharField(blank=True, help_text='Tên kho', max_length=150, null=True)),
                ('status', models.BooleanField(default=True, help_text='Trạng thái kho')),
                ('created_at', models.DateTimeField(default=django.utils.timezone.now, editable=False, help_text='Được tạo lúc')),
                ('updated_at', models.DateField(default=django.utils.timezone.now, editable=False, help_text='Cập nhật lúc')),
                ('created_by', models.ForeignKey(blank=True, editable=False, help_text='Được tạo bởi', null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='assetmanagement_warehousecategory_created_by', to=settings.AUTH_USER_MODEL, to_field='username')),
                ('manager', models.ForeignKey(help_text='Người quản lý kho', on_delete=django.db.models.deletion.CASCADE, related_name='manager_name', to=settings.AUTH_USER_MODEL, to_field='username')),
                ('updated_by', models.ForeignKey(blank=True, editable=False, help_text='Cập nhật bởi', null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='assetmanagement_warehousecategory_updated_by', to=settings.AUTH_USER_MODEL, to_field='username')),
            ],
            options={
                'verbose_name': 'Nhà kho',
                'verbose_name_plural': 'Những nhà kho',
            },
        ),
        migrations.CreateModel(
            name='UnitCategory',
            fields=[
                ('uuid', models.UUIDField(default=uuid.uuid4, editable=False, help_text='Khóa chính của đơn vị tính', primary_key=True, serialize=False, unique=True)),
                ('code', models.CharField(help_text='Mã đơn vị tính', max_length=150, unique=True)),
                ('name', models.CharField(blank=True, help_text='Tên đơn vị tính', max_length=150, null=True, unique=True)),
                ('created_at', models.DateTimeField(default=django.utils.timezone.now, editable=False, help_text='Được tạo lúc')),
                ('updated_at', models.DateField(default=django.utils.timezone.now, editable=False, help_text='Cập nhật lúc')),
                ('created_by', models.ForeignKey(blank=True, editable=False, help_text='Được tạo bởi', null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='assetmanagement_unitcategory_created_by', to=settings.AUTH_USER_MODEL, to_field='username')),
                ('updated_by', models.ForeignKey(blank=True, editable=False, help_text='Cập nhật bởi', null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='assetmanagement_unitcategory_updated_by', to=settings.AUTH_USER_MODEL, to_field='username')),
            ],
            options={
                'verbose_name': 'Đơn vị tính',
                'verbose_name_plural': 'Những đơn vị tính',
            },
        ),
        migrations.CreateModel(
            name='SupplierCategory',
            fields=[
                ('uuid', models.UUIDField(default=uuid.uuid4, editable=False, help_text='Khóa chính của Nhà cung cấp', primary_key=True, serialize=False, unique=True)),
                ('code', models.CharField(help_text='Mã nhà cung cấp', max_length=150, unique=True)),
                ('name', models.CharField(blank=True, help_text='Tên nhà cung cấp', max_length=150, null=True)),
                ('detail_address', models.TextField(blank=True, help_text='Địa chỉ cụ thể', max_length=1000, null=True)),
                ('contact_info', models.CharField(blank=True, help_text='Thông tin liên hệ', max_length=1000, null=True)),
                ('created_at', models.DateTimeField(default=django.utils.timezone.now, editable=False, help_text='Được tạo lúc')),
                ('updated_at', models.DateField(default=django.utils.timezone.now, editable=False, help_text='Cập nhật lúc')),
                ('address', models.ForeignKey(blank=True, help_text='Địa chỉ', null=True, on_delete=django.db.models.deletion.SET_NULL, to='company.city')),
                ('created_by', models.ForeignKey(blank=True, editable=False, help_text='Được tạo bởi', null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='assetmanagement_suppliercategory_created_by', to=settings.AUTH_USER_MODEL, to_field='username')),
                ('updated_by', models.ForeignKey(blank=True, editable=False, help_text='Cập nhật bởi', null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='assetmanagement_suppliercategory_updated_by', to=settings.AUTH_USER_MODEL, to_field='username')),
            ],
            options={
                'verbose_name': 'Nhà cung cấp',
                'verbose_name_plural': 'Những nhà cung cấp',
            },
        ),
        migrations.CreateModel(
            name='OwnStatus',
            fields=[
                ('uuid', models.UUIDField(default=uuid.uuid4, editable=False, help_text='Khóa chính của trạng thái sở hữu', primary_key=True, serialize=False, unique=True)),
                ('code', models.CharField(help_text='Mã trạng thái sở hữu', max_length=150, unique=True)),
                ('name', models.CharField(blank=True, help_text='Tên đơn trạng thái sở hữu', max_length=150, null=True)),
                ('detail_description', models.TextField(blank=True, help_text='Mô tả chi tiết trạng thái', max_length=1000, null=True)),
                ('created_at', models.DateTimeField(default=django.utils.timezone.now, editable=False, help_text='Được tạo lúc')),
                ('updated_at', models.DateField(default=django.utils.timezone.now, editable=False, help_text='Cập nhật lúc')),
                ('created_by', models.ForeignKey(blank=True, editable=False, help_text='Được tạo bởi', null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='assetmanagement_ownstatus_created_by', to=settings.AUTH_USER_MODEL, to_field='username')),
                ('updated_by', models.ForeignKey(blank=True, editable=False, help_text='Cập nhật bởi', null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='assetmanagement_ownstatus_updated_by', to=settings.AUTH_USER_MODEL, to_field='username')),
            ],
            options={
                'verbose_name': 'Trạng thái sở hữu',
                'verbose_name_plural': 'Những trạng thái sở hữu',
            },
        ),
        migrations.CreateModel(
            name='AssetType',
            fields=[
                ('uuid', models.UUIDField(default=uuid.uuid4, editable=False, help_text='Khóa chính của loại tài sản', primary_key=True, serialize=False, unique=True)),
                ('code', models.CharField(help_text='Mã loại tài sản', max_length=150, unique=True)),
                ('name', models.CharField(blank=True, help_text='Tên loại tài sản', max_length=150, null=True, unique=True)),
                ('created_at', models.DateTimeField(default=django.utils.timezone.now, editable=False, help_text='Được tạo lúc')),
                ('updated_at', models.DateField(default=django.utils.timezone.now, editable=False, help_text='Cập nhật lúc')),
                ('asset_of_type', models.ForeignKey(blank=True, help_text='Loại hình tài sản', null=True, on_delete=django.db.models.deletion.SET_NULL, to='AssetManagement.assetoftype')),
                ('created_by', models.ForeignKey(blank=True, editable=False, help_text='Được tạo bởi', null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='assetmanagement_assettype_created_by', to=settings.AUTH_USER_MODEL, to_field='username')),
                ('updated_by', models.ForeignKey(blank=True, editable=False, help_text='Cập nhật bởi', null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='assetmanagement_assettype_updated_by', to=settings.AUTH_USER_MODEL, to_field='username')),
            ],
            options={
                'verbose_name': 'Loại tài sản',
                'verbose_name_plural': 'Những loại tài sản',
            },
        ),
        migrations.CreateModel(
            name='AssetStatus',
            fields=[
                ('uuid', models.UUIDField(default=uuid.uuid4, editable=False, help_text='Khóa chính của tình trạng tài sản', primary_key=True, serialize=False, unique=True)),
                ('code', models.CharField(help_text='Mã tình trạng', max_length=150, unique=True)),
                ('name', models.CharField(blank=True, help_text='Tên tình trạng', max_length=150, null=True)),
                ('detail_description', models.TextField(blank=True, help_text='Mô tả chi tiết tình trạng thiết bị', max_length=1000, null=True)),
                ('created_at', models.DateTimeField(default=django.utils.timezone.now, editable=False, help_text='Được tạo lúc')),
                ('updated_at', models.DateField(default=django.utils.timezone.now, editable=False, help_text='Cập nhật lúc')),
                ('created_by', models.ForeignKey(blank=True, editable=False, help_text='Được tạo bởi', null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='assetmanagement_assetstatus_created_by', to=settings.AUTH_USER_MODEL, to_field='username')),
                ('updated_by', models.ForeignKey(blank=True, editable=False, help_text='Cập nhật bởi', null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='assetmanagement_assetstatus_updated_by', to=settings.AUTH_USER_MODEL, to_field='username')),
            ],
            options={
                'verbose_name': 'Tình trạng tài sản',
                'verbose_name_plural': 'Những tình trạng tài sản',
            },
        ),
        migrations.CreateModel(
            name='AssetDetailTemplate',
            fields=[
                ('uuid', models.UUIDField(default=uuid.uuid4, editable=False, help_text='Khóa chính của mẫu thông số', primary_key=True, serialize=False, unique=True)),
                ('code', models.CharField(help_text='Mã mẫu thông số', max_length=150, unique=True)),
                ('name', models.CharField(blank=True, help_text='Tên thông số', max_length=150, null=True, unique=True)),
                ('created_at', models.DateTimeField(default=django.utils.timezone.now, editable=False, help_text='Được tạo lúc')),
                ('updated_at', models.DateField(default=django.utils.timezone.now, editable=False, help_text='Cập nhật lúc')),
                ('asset_type', models.ForeignKey(blank=True, help_text='Loai TS', null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='assetmanagement_assetdetailtemplate_asset_type', to='AssetManagement.assettype')),
                ('created_by', models.ForeignKey(blank=True, editable=False, help_text='Được tạo bởi', null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='assetmanagement_assetdetailtemplate_created_by', to=settings.AUTH_USER_MODEL, to_field='username')),
                ('updated_by', models.ForeignKey(blank=True, editable=False, help_text='Cập nhật bởi', null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='assetmanagement_assetdetailtemplate_updated_by', to=settings.AUTH_USER_MODEL, to_field='username')),
            ],
            options={
                'verbose_name': 'Mẫu chi tiết thông số tài sản',
                'verbose_name_plural': 'Những mẫu chi tiết thông số tài sản',
            },
        ),
        migrations.CreateModel(
            name='AssetDetail',
            fields=[
                ('uuid', models.UUIDField(default=uuid.uuid4, editable=False, help_text='Khóa chính của chi tiết tài sản', primary_key=True, serialize=False, unique=True)),
                ('code', models.CharField(help_text='Mã chi tiết tài sản', max_length=150, unique=True)),
                ('name', models.CharField(blank=True, help_text='Tên chi tiết tài sản', max_length=150, null=True)),
                ('value', models.CharField(blank=True, help_text='Gía trị thông số', max_length=1024, null=True)),
                ('created_at', models.DateTimeField(default=django.utils.timezone.now, editable=False, help_text='Được tạo lúc')),
                ('updated_at', models.DateField(default=django.utils.timezone.now, editable=False, help_text='Cập nhật lúc')),
                ('asset', models.ForeignKey(help_text='mẫu chi tiết tài sản', on_delete=django.db.models.deletion.CASCADE, to='AssetManagement.asset')),
                ('created_by', models.ForeignKey(blank=True, editable=False, help_text='Được tạo bởi', null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='assetmanagement_assetdetail_created_by', to=settings.AUTH_USER_MODEL, to_field='username')),
                ('updated_by', models.ForeignKey(blank=True, editable=False, help_text='Cập nhật bởi', null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='assetmanagement_assetdetail_updated_by', to=settings.AUTH_USER_MODEL, to_field='username')),
            ],
            options={
                'verbose_name': 'Chi tiết tài sản',
                'verbose_name_plural': 'Những chi tiết tài sản',
            },
        ),
        migrations.AddField(
            model_name='asset',
            name='asset_status',
            field=models.ForeignKey(blank=True, help_text='Tình trạng thiết bị', null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='assetmanagement_asset_asset_status', to='AssetManagement.assetstatus'),
        ),
        migrations.AddField(
            model_name='asset',
            name='asset_type',
            field=models.ForeignKey(blank=True, help_text='Loại tài sản', null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='assetmanagement_asset_asset_type', to='AssetManagement.assettype'),
        ),
        migrations.AddField(
            model_name='asset',
            name='created_by',
            field=models.ForeignKey(blank=True, editable=False, help_text='Được tạo bởi', null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='assetmanagement_asset_created_by', to=settings.AUTH_USER_MODEL, to_field='username'),
        ),
        migrations.AddField(
            model_name='asset',
            name='current_asset_user',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='assetmanagement_asset_using', to='company.staff'),
        ),
        migrations.AddField(
            model_name='asset',
            name='own_status',
            field=models.ForeignKey(blank=True, help_text='Trạng thái sở hữu', null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='assetmanagement_asset_own_status', to='AssetManagement.ownstatus'),
        ),
        migrations.AddField(
            model_name='asset',
            name='owned_company',
            field=models.ForeignKey(blank=True, help_text='Công ty sở hữu tài sản', null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='assetmanagement_asset_owned_company', to='company.company'),
        ),
        migrations.AddField(
            model_name='asset',
            name='supplier',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='assetmanagement_asset_supplier', to='AssetManagement.suppliercategory'),
        ),
        migrations.AddField(
            model_name='asset',
            name='unit',
            field=models.ForeignKey(blank=True, help_text='Đơn vị tính', null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='assetmanagement_asset_unit', to='AssetManagement.unitcategory'),
        ),
        migrations.AddField(
            model_name='asset',
            name='updated_by',
            field=models.ForeignKey(blank=True, editable=False, help_text='Cập nhật bởi', null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='assetmanagement_asset_updated_by', to=settings.AUTH_USER_MODEL, to_field='username'),
        ),
        migrations.AddField(
            model_name='asset',
            name='warehouse',
            field=models.ForeignKey(blank=True, help_text='Kho', null=True, on_delete=django.db.models.deletion.CASCADE, related_name='assetmanagement_asset_warehouse', to='AssetManagement.warehousecategory'),
        ),
    ]
