# Generated by Django 3.2.10 on 2023-04-27 12:12

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone
import uuid


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('AssetManagement', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='AssetRevaluation',
            fields=[
                ('uuid', models.UUIDField(default=uuid.uuid4, editable=False, help_text='UUID', primary_key=True, serialize=False)),
                ('name', models.CharField(default='TÊN KHẤU HAO', help_text='TÊN KHẤU HAO', max_length=1024)),
                ('time_revaluation', models.DateField(default=django.utils.timezone.now, help_text='Thời điểm thay đổi')),
                ('addup_value', models.IntegerField(blank=True, default=0, help_text='gia tri them + / giam -', null=True)),
                ('addup_time', models.IntegerField(blank=True, default=0, help_text='nam them + / giam -', null=True)),
                ('updated_at', models.DateTimeField(default=django.utils.timezone.now, editable=False, help_text='Thời điểm cập nhật')),
                ('created_at', models.DateTimeField(default=django.utils.timezone.now, editable=False, help_text='Ngày đăng tải')),
                ('created_by', models.ForeignKey(blank=True, editable=False, help_text='Được tạo bởi', null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='assetrevaluation_created_by', to=settings.AUTH_USER_MODEL, to_field='username')),
                ('updated_by', models.ForeignKey(blank=True, editable=False, help_text='Cập nhật bởi', null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='depreciation_assetrevaluation_updated_by', to=settings.AUTH_USER_MODEL, to_field='username')),
            ],
        ),
        migrations.CreateModel(
            name='YearViews',
            fields=[
                ('uuid', models.UUIDField(default=uuid.uuid4, editable=False, help_text='UUID', primary_key=True, serialize=False)),
                ('name', models.IntegerField(blank=True, help_text='SỐ KHẤU HAO CHI TIẾT', null=True)),
                ('updated_at', models.DateTimeField(default=django.utils.timezone.now, editable=False, help_text='Thời điểm cập nhật')),
                ('created_at', models.DateTimeField(default=django.utils.timezone.now, editable=False, help_text='Ngày đăng tải')),
                ('created_by', models.ForeignKey(blank=True, editable=False, help_text='Được tạo bởi', null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='yearviews_created_by', to=settings.AUTH_USER_MODEL, to_field='username')),
                ('updated_by', models.ForeignKey(blank=True, editable=False, help_text='Cập nhật bởi', null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='depreciation_yearviews_updated_by', to=settings.AUTH_USER_MODEL, to_field='username')),
            ],
            options={
                'verbose_name': 'NĂM',
                'verbose_name_plural': 'NHỮNG NĂM',
            },
        ),
        migrations.CreateModel(
            name='DepreciationType',
            fields=[
                ('uuid', models.UUIDField(default=uuid.uuid4, editable=False, help_text='UUID', primary_key=True, serialize=False)),
                ('name', models.CharField(default='TÊN KHẤU HAO TÀI SẢN', help_text='TÊN KHẤU HAO TÀI SẢN', max_length=1024)),
                ('time', models.IntegerField(blank=True, help_text=' Thời gian ', null=True)),
                ('updated_at', models.DateTimeField(default=django.utils.timezone.now, editable=False, help_text='Thời điểm cập nhật')),
                ('created_at', models.DateTimeField(default=django.utils.timezone.now, editable=False, help_text='Ngày đăng tải')),
                ('asset_type', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='assetype', to='AssetManagement.assettype')),
                ('created_by', models.ForeignKey(blank=True, editable=False, help_text='Được tạo bởi', null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='depreciationtype_created_by', to=settings.AUTH_USER_MODEL, to_field='username')),
                ('updated_by', models.ForeignKey(blank=True, editable=False, help_text='Cập nhật bởi', null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='depreciation_depreciationtype_updated_by', to=settings.AUTH_USER_MODEL, to_field='username')),
            ],
            options={
                'verbose_name': 'Kiểu Tài Sản Khấu Hao Chi Tiết',
                'verbose_name_plural': 'Những Kiểu Tài Sản Khấu Hao Chi Tiết',
            },
        ),
        migrations.CreateModel(
            name='DepreciationPeriod',
            fields=[
                ('uuid', models.UUIDField(default=uuid.uuid4, editable=False, help_text='UUID', primary_key=True, serialize=False)),
                ('name', models.CharField(default='KỲ KHẤU HAO', help_text='KỲ KHẤU HAO', max_length=1024)),
                ('updated_at', models.DateTimeField(default=django.utils.timezone.now, editable=False, help_text='Thời điểm cập nhật')),
                ('created_at', models.DateTimeField(default=django.utils.timezone.now, editable=False, help_text='Ngày đăng tải')),
                ('created_by', models.ForeignKey(blank=True, editable=False, help_text='Được tạo bởi', null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='depreciationperiod_created_by', to=settings.AUTH_USER_MODEL, to_field='username')),
                ('updated_by', models.ForeignKey(blank=True, editable=False, help_text='Cập nhật bởi', null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='depreciation_depreciationperiod_updated_by', to=settings.AUTH_USER_MODEL, to_field='username')),
            ],
            options={
                'verbose_name': 'KIỂU KHẤU HAO',
                'verbose_name_plural': 'NHỮNG KIỂU KHẤU HAO',
            },
        ),
        migrations.CreateModel(
            name='DepreciationDetail',
            fields=[
                ('uuid', models.UUIDField(default=uuid.uuid4, editable=False, help_text='UUID', primary_key=True, serialize=False)),
                ('name', models.CharField(default='TÊN KHẤU HAO', help_text='TÊN KHẤU HAO', max_length=1024)),
                ('date_been_add', models.DateField(default=django.utils.timezone.now, help_text='Thời điểm khấu hao')),
                ('add_value', models.IntegerField(blank=True, default=0, help_text='Tang/giam gia trị', null=True)),
                ('depreciation_value', models.IntegerField(blank=True, help_text=' Giá trị để khấu hao', null=True)),
                ('time_depreciation', models.IntegerField(blank=True, help_text='Thời gian khấu hao', null=True)),
                ('updated_at', models.DateTimeField(default=django.utils.timezone.now, editable=False, help_text='Thời điểm cập nhật')),
                ('created_at', models.DateTimeField(default=django.utils.timezone.now, editable=False, help_text='Ngày đăng tải')),
                ('aset', models.ForeignKey(blank=True, help_text='TÀI SẢN1', null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='time', to='AssetManagement.asset', unique=True)),
                ('created_by', models.ForeignKey(blank=True, editable=False, help_text='Được tạo bởi', null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='depreciationdetail_created_by', to=settings.AUTH_USER_MODEL, to_field='username')),
                ('preiod_detail', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='depre', to='Depreciation.depreciationperiod')),
                ('revaluation', models.ManyToManyField(blank=True, null=True, to='Depreciation.AssetRevaluation')),
                ('updated_by', models.ForeignKey(blank=True, editable=False, help_text='Cập nhật bởi', null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='depreciation_depreciationdetail_updated_by', to=settings.AUTH_USER_MODEL, to_field='username')),
            ],
            options={
                'verbose_name': 'KHẤU HAO CHI TIẾT',
                'verbose_name_plural': 'NHỮNG KHẤU HAO CHI TIẾT',
            },
        ),
        migrations.CreateModel(
            name='DepreciationAssetDetail',
            fields=[
                ('uuid', models.UUIDField(default=uuid.uuid4, editable=False, help_text='UUID', primary_key=True, serialize=False)),
                ('name', models.CharField(default='TÊN KHẤU HAO TÀI SẢN', help_text='TÊN KHẤU HAO TÀI SẢN', max_length=1024)),
                ('asset_depreciations', models.CharField(default='TÊN TÀI SẢN ', help_text='TTÊN TÀI SẢN', max_length=1024)),
                ('count_depreciation', models.IntegerField(blank=True, help_text=' Số lần khấu hao ', null=True)),
                ('days_depreciation', models.DateField(default=django.utils.timezone.now, help_text='Thời điểm khấu hao')),
                ('value_start', models.IntegerField(blank=True, help_text=' Giá trị đầu kỳ', null=True)),
                ('value_end', models.IntegerField(blank=True, help_text=' Giá trị cuối kỳ ', null=True)),
                ('percent_depreciation', models.DecimalField(blank=True, decimal_places=2, default=0, help_text=' % Khấu Hao ', max_digits=30, null=True)),
                ('value_depreciaiton', models.DecimalField(blank=True, decimal_places=2, default=0, help_text=' Giá trị Khấu Haos', max_digits=30, null=True)),
                ('remain_value', models.DecimalField(blank=True, decimal_places=2, default=0, help_text=' Giá trị còn lại ', max_digits=30, null=True)),
                ('updated_at', models.DateTimeField(default=django.utils.timezone.now, editable=False, help_text='Thời điểm cập nhật')),
                ('created_at', models.DateTimeField(default=django.utils.timezone.now, editable=False, help_text='Ngày đăng tải')),
                ('created_by', models.ForeignKey(blank=True, editable=False, help_text='Được tạo bởi', null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='depreciationassetdetail_created_by', to=settings.AUTH_USER_MODEL, to_field='username')),
                ('updated_by', models.ForeignKey(blank=True, editable=False, help_text='Cập nhật bởi', null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='depreciation_depreciationassetdetail_updated_by', to=settings.AUTH_USER_MODEL, to_field='username')),
            ],
            options={
                'verbose_name': 'Tài Sản Khấu Hao Chi Tiết',
                'verbose_name_plural': 'Những Tài Sản Khấu Hao Chi Tiết',
            },
        ),
        migrations.CreateModel(
            name='Adjustment',
            fields=[
                ('uuid', models.UUIDField(default=uuid.uuid4, editable=False, help_text='UUID', primary_key=True, serialize=False)),
                ('name', models.CharField(default='TÊN KHẤU HAO TÀI SẢN', help_text='TÊN KHẤU HAO TÀI SẢN', max_length=1024)),
                ('number', models.IntegerField(blank=True, help_text=' Hệ số điều chỉnh ', null=True)),
                ('updated_at', models.DateTimeField(default=django.utils.timezone.now, editable=False, help_text='Thời điểm cập nhật')),
                ('created_at', models.DateTimeField(default=django.utils.timezone.now, editable=False, help_text='Ngày đăng tải')),
                ('created_by', models.ForeignKey(blank=True, editable=False, help_text='Được tạo bởi', null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='adjustment_created_by', to=settings.AUTH_USER_MODEL, to_field='username')),
                ('updated_by', models.ForeignKey(blank=True, editable=False, help_text='Cập nhật bởi', null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='depreciation_adjustment_updated_by', to=settings.AUTH_USER_MODEL, to_field='username')),
            ],
            options={
                'verbose_name': 'Hệ Số Điều Chỉnh',
                'verbose_name_plural': 'Những Hệ Số Điều Chỉnh',
            },
        ),
    ]
