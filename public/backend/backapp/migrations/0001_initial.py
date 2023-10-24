# Generated by Django 4.2.4 on 2023-10-20 06:05

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Candidate',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=30)),
                ('email', models.CharField(max_length=30)),
            ],
        ),
        migrations.CreateModel(
            name='Education',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('course', models.CharField(max_length=30)),
                ('university', models.CharField(max_length=30)),
                ('year', models.CharField(max_length=30)),
                ('reg_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='backapp.candidate')),
            ],
        ),
    ]