# Generated by Django 2.2.10 on 2022-05-17 13:21

from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone
import uuid


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='TimeZone',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(blank=True, editable=False, max_length=64, null=True)),
            ],
            options={
                'db_table': 'website_timezones',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='AdminMenuGroup',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=64, null=True)),
                ('uuid', models.UUIDField(default=uuid.uuid4, unique=True)),
                ('title', models.CharField(max_length=64, null=True)),
                ('icon_class', models.CharField(blank=True, max_length=256, null=True)),
                ('desc', models.TextField(blank=True, null=True)),
                ('order', models.PositiveIntegerField(default=0)),
                ('active', models.BooleanField(default=True)),
                ('is_base', models.BooleanField(default=True)),
                ('staff_only', models.BooleanField(default=False)),
                ('superuser_only', models.BooleanField(default=False)),
                ('updated_at', models.DateTimeField(default=django.utils.timezone.now)),
                ('created_at', models.DateTimeField(default=django.utils.timezone.now, editable=False)),
            ],
            options={
                'verbose_name': 'Nhóm Admin Menu',
                'verbose_name_plural': 'Nhóm Admin Menu',
            },
        ),
        migrations.CreateModel(
            name='AllApp',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=64, null=True, unique=True)),
                ('uuid', models.UUIDField(default=uuid.uuid4, unique=True)),
                ('short_name', models.CharField(max_length=64, null=True)),
                ('url', models.CharField(blank=True, help_text='Url for app. If null or blank, app will not be shown on Top Bar!', max_length=1024, null=True)),
                ('href_target', models.CharField(choices=[('_blank', 'Opens the linked document in a new window or tab'), ('_self', 'Opens the linked document in the same frame as it was clicked (this is default)'), ('_parent', 'Opens the linked document in the parent frame'), ('_top', 'Opens the linked document in the full body of the window')], default='_blank', help_text='Target on click!', max_length=256)),
                ('icon', models.ImageField(blank=True, help_text='Logo for app. If blank, app will not be shown on Top Bar!', max_length=2000, null=True, upload_to='app-icons/%Y/%m/%d/')),
                ('icon_base64', models.TextField(blank=True, help_text='Base64 for icon image. When saved, if icon_base64 is null or blank and icon fileexisting, it will be created automatically.', max_length=2000, null=True)),
                ('active', models.BooleanField(default=True)),
                ('is_product', models.BooleanField(default=True, help_text='If not is a product, app will not be shown on Top Bar!')),
                ('staff_only', models.BooleanField(default=True, help_text='Chỉ quyền staff mới truy cập được!')),
                ('admin_only', models.BooleanField(default=True, help_text='Chỉ quyền super admin mới truy cập được!')),
                ('order', models.PositiveIntegerField(default=0)),
                ('demo_mode', models.BooleanField(default=False, help_text='Demo apps!')),
                ('updated_at', models.DateTimeField(default=django.utils.timezone.now)),
                ('created_at', models.DateTimeField(default=django.utils.timezone.now, editable=False)),
            ],
            options={
                'verbose_name': 'Danh Sách Webapp',
                'verbose_name_plural': 'Danh Sách Webapp',
            },
        ),
        migrations.CreateModel(
            name='AllView',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=64, null=True, unique=True)),
                ('uuid', models.UUIDField(default=uuid.uuid4, unique=True)),
                ('short_name', models.CharField(max_length=64, null=True)),
                ('pattern', models.CharField(blank=True, max_length=2000, null=True)),
                ('icon', models.ImageField(blank=True, max_length=2000, null=True, upload_to='app-icons/%Y/%m/%d/')),
                ('icon_base64', models.TextField(blank=True, help_text='Base64 for icon image. When saved, if icon_base64 is null or blank and icon fileexisting, it will be created automatically.', max_length=2000, null=True)),
                ('active', models.BooleanField(default=True)),
                ('is_product', models.BooleanField(default=True)),
                ('staff_only', models.BooleanField(default=True)),
                ('admin_only', models.BooleanField(default=True)),
                ('order', models.PositiveIntegerField(default=0)),
                ('demo_mode', models.BooleanField(default=False)),
                ('updated_at', models.DateTimeField(default=django.utils.timezone.now)),
                ('created_at', models.DateTimeField(default=django.utils.timezone.now, editable=False)),
            ],
            options={
                'verbose_name': 'Danh Sách View (django)',
                'verbose_name_plural': 'Danh Sách View (django)',
            },
        ),
        migrations.CreateModel(
            name='BotUA',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=1024, null=True)),
                ('uuid', models.UUIDField(default=uuid.uuid4, unique=True)),
                ('active', models.BooleanField(default=True)),
                ('updated_at', models.DateTimeField(default=django.utils.timezone.now)),
                ('created_at', models.DateTimeField(default=django.utils.timezone.now, editable=False)),
            ],
            options={
                'verbose_name': 'BotUA',
                'verbose_name_plural': 'BotUA',
            },
        ),
        migrations.CreateModel(
            name='Config',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=64)),
                ('uuid', models.UUIDField(default=uuid.uuid4, unique=True)),
                ('value', models.CharField(max_length=50000, null=True)),
                ('active', models.BooleanField(default=True)),
                ('default', models.BooleanField(default=True)),
                ('updated_at', models.DateTimeField(default=django.utils.timezone.now)),
                ('created_at', models.DateTimeField(default=django.utils.timezone.now, editable=False)),
            ],
            options={
                'verbose_name': 'Thông Tin Cấu Hình',
                'verbose_name_plural': 'Thông Tin Cấu Hình',
            },
        ),
        migrations.CreateModel(
            name='LogoImages',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=64, null=True, unique=True)),
                ('uuid', models.UUIDField(default=uuid.uuid4, unique=True)),
                ('file', models.ImageField(blank=True, max_length=2000, null=True, upload_to='LogoImages/%Y/%m/%d/')),
                ('is_favicon', models.BooleanField(blank=True, default=False, null=True)),
                ('desc', models.TextField(blank=True, null=True)),
                ('updated_at', models.DateTimeField(default=django.utils.timezone.now)),
                ('created_at', models.DateTimeField(default=django.utils.timezone.now, editable=False)),
            ],
            options={
                'verbose_name': 'LogoImages',
                'verbose_name_plural': 'LogoImages',
            },
        ),
        migrations.CreateModel(
            name='PageInfo',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(editable=False, max_length=128, null=True, unique=True)),
                ('uuid', models.UUIDField(default=uuid.uuid4, unique=True)),
                ('title', models.TextField(blank=True, max_length=70, null=True)),
                ('charset', models.CharField(default='UTF-8', max_length=32)),
                ('header', models.TextField(blank=True, null=True)),
                ('desc', models.TextField(blank=True, max_length=160, null=True)),
                ('meta_description', models.TextField(blank=True, max_length=160, null=True)),
                ('meta_keywords', models.TextField(blank=True, null=True)),
                ('active', models.BooleanField(default=True)),
                ('updated_at', models.DateTimeField(default=django.utils.timezone.now)),
                ('created_at', models.DateTimeField(default=django.utils.timezone.now, editable=False)),
            ],
            options={
                'verbose_name': 'PageInfo',
                'verbose_name_plural': 'Pages Info',
            },
        ),
        migrations.CreateModel(
            name='Position',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=32, null=True)),
                ('uuid', models.UUIDField(default=uuid.uuid4, unique=True)),
                ('desc', models.TextField(blank=True, default=None, null=True)),
                ('css', models.TextField(blank=True, default=None, null=True)),
                ('order', models.PositiveIntegerField(default=0)),
                ('active', models.BooleanField(default=True)),
                ('updated_at', models.DateTimeField(default=django.utils.timezone.now)),
                ('created_at', models.DateTimeField(default=django.utils.timezone.now, editable=False)),
            ],
            options={
                'verbose_name': 'Vị trí hiển thị',
                'verbose_name_plural': 'Vị trí hiển thị',
            },
        ),
        migrations.CreateModel(
            name='Widget',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=32, null=True)),
                ('uuid', models.UUIDField(default=uuid.uuid4, unique=True)),
                ('title', models.CharField(blank=True, max_length=64, null=True)),
                ('url', models.CharField(blank=True, max_length=1024, null=True)),
                ('desc', models.TextField(blank=True, null=True)),
                ('html_code', models.TextField(blank=True, null=True)),
                ('css_code', models.TextField(blank=True, null=True)),
                ('js_code', models.TextField(blank=True, null=True)),
                ('order', models.PositiveIntegerField(default=0)),
                ('active', models.BooleanField(default=True)),
                ('updated_at', models.DateTimeField(default=django.utils.timezone.now)),
                ('created_at', models.DateTimeField(default=django.utils.timezone.now, editable=False)),
                ('position', models.ForeignKey(blank=True, default=None, null=True, on_delete=django.db.models.deletion.CASCADE, to='Workspace.Position', to_field='uuid')),
            ],
            options={
                'verbose_name': 'Widget',
                'verbose_name_plural': 'Widget',
            },
        ),
        migrations.CreateModel(
            name='RobotsArg',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=32, null=True)),
                ('uuid', models.UUIDField(default=uuid.uuid4, unique=True)),
                ('value', models.TextField(blank=True, max_length=2000, null=True)),
                ('active', models.BooleanField(default=True)),
                ('updated_at', models.DateTimeField(default=django.utils.timezone.now)),
                ('created_at', models.DateTimeField(default=django.utils.timezone.now, editable=False)),
                ('ua', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='Workspace.BotUA')),
            ],
            options={
                'verbose_name': 'RobotsArg',
                'verbose_name_plural': 'RobotsArg',
            },
        ),
        migrations.CreateModel(
            name='FooterItem',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=32, null=True)),
                ('uuid', models.UUIDField(default=uuid.uuid4, unique=True)),
                ('desc', models.TextField(blank=True, default=None, null=True)),
                ('html_code', models.TextField(blank=True, default=None, null=True)),
                ('css_code', models.TextField(blank=True, default=None, null=True)),
                ('js_code', models.TextField(blank=True, default=None, null=True)),
                ('order', models.PositiveIntegerField(default=0)),
                ('active', models.BooleanField(default=True)),
                ('updated_at', models.DateTimeField(default=django.utils.timezone.now)),
                ('created_at', models.DateTimeField(default=django.utils.timezone.now, editable=False)),
                ('position', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='Workspace.Position', to_field='uuid')),
            ],
            options={
                'verbose_name': 'FooterItem',
                'verbose_name_plural': 'FooterItem',
            },
        ),
        migrations.CreateModel(
            name='AllAdminMenu',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=64, null=True, unique=True)),
                ('uuid', models.UUIDField(default=uuid.uuid4, unique=True)),
                ('title', models.CharField(max_length=64, null=True)),
                ('icon_class', models.CharField(blank=True, help_text='https://fontawesome.com/icons/', max_length=256, null=True)),
                ('data_feather', models.CharField(blank=True, help_text='https://feathericons.com/', max_length=256, null=True)),
                ('url', models.CharField(max_length=1024)),
                ('icon', models.ImageField(blank=True, max_length=2000, null=True, upload_to='icons/%Y/%m/%d/')),
                ('icon_base64', models.TextField(blank=True, help_text='Base64 for icon image. When saved, if icon_base64 is null or blank and icon fileexisting, it will be created automatically.', max_length=2000, null=True)),
                ('desc', models.TextField(blank=True, null=True)),
                ('order', models.PositiveIntegerField(default=0)),
                ('in_main_menu', models.BooleanField(default=True)),
                ('login_redirect', models.BooleanField(blank=True, default=False, help_text='Redirect to this link after login...', null=True)),
                ('active', models.BooleanField(default=True)),
                ('staff_only', models.BooleanField(default=False)),
                ('superuser_only', models.BooleanField(default=False)),
                ('split_marked', models.BooleanField(default=False)),
                ('split_label', models.CharField(blank=True, max_length=64, null=True)),
                ('updated_at', models.DateTimeField(default=django.utils.timezone.now)),
                ('created_at', models.DateTimeField(default=django.utils.timezone.now, editable=False)),
                ('menu_group', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='workspace_alladminmenu_alladminmenu_menu_group_uuid', to='Workspace.AdminMenuGroup', to_field='uuid')),
                ('parent_menu', models.ForeignKey(blank=True, default=None, null=True, on_delete=django.db.models.deletion.SET_DEFAULT, related_name='workspace_alladminmenu_alladminmenu_parent_menu_uuid', to='Workspace.AllAdminMenu', to_field='uuid')),
            ],
            options={
                'verbose_name': 'Admin Menu',
                'verbose_name_plural': 'Admin Menu',
            },
        ),
        migrations.AddField(
            model_name='adminmenugroup',
            name='app',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='Workspace.AllApp', to_field='uuid'),
        ),
        migrations.AddField(
            model_name='adminmenugroup',
            name='related_apps',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='workspace_adminmenugroup_adminmenugroup_related_apps_uuid', to='Workspace.AllApp'),
        ),
    ]