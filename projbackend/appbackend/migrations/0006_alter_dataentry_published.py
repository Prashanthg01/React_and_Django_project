# Generated by Django 4.2.1 on 2023-05-25 18:28

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('appbackend', '0005_alter_dataentry_added_alter_dataentry_published'),
    ]

    operations = [
        migrations.AlterField(
            model_name='dataentry',
            name='published',
            field=models.DateTimeField(null=True),
        ),
    ]
