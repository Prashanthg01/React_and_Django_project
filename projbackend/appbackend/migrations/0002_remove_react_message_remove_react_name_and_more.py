# Generated by Django 4.2.1 on 2023-05-19 08:45

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('appbackend', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='react',
            name='message',
        ),
        migrations.RemoveField(
            model_name='react',
            name='name',
        ),
        migrations.AddField(
            model_name='react',
            name='department',
            field=models.CharField(default=1, max_length=200),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='react',
            name='employee',
            field=models.CharField(default=1, max_length=30),
            preserve_default=False,
        ),
    ]