from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = []

    operations = [
        migrations.CreateModel(
            name='Ticket',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('full_name', models.CharField(max_length=150)),
                ('email', models.EmailField(max_length=254)),
                ('phone', models.CharField(max_length=32)),
                ('id_number', models.CharField(blank=True, max_length=80)),
                (
                    'gender',
                    models.CharField(
                        blank=True,
                        choices=[
                            ('female', 'Female'),
                            ('male', 'Male'),
                            ('prefer not to say', 'Prefer not to say'),
                        ],
                        max_length=32,
                    ),
                ),
                (
                    'ticket_type',
                    models.CharField(
                        choices=[('standard', 'Standard'), ('vip', 'VIP'), ('vvip', 'VVIP')], max_length=32
                    ),
                ),
                ('quantity', models.PositiveIntegerField(default=1)),
                ('event_date', models.DateField()),
                ('event_location', models.CharField(blank=True, max_length=120)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
            ],
            options={
                'ordering': ['-created_at'],
            },
        ),
    ]
