import json
from datetime import datetime
from django.core.management.base import BaseCommand
from appbackend.models import DataEntry

class Command(BaseCommand):
    help = 'Import data from jsondata.json file'

    def handle(self, *args, **options):
        with open('jsondata.json', 'r', encoding='utf-8') as file:
            data = json.load(file)

        for entry in data:
            added = None
            if entry['added']:
                try:
                    added = datetime.strptime(entry['added'], '%B, %d %Y %H:%M:%S')
                except ValueError:
                    # Handle parsing error for different date format or empty value
                    # Set added to None or a default value, depending on your requirements
                    pass

            published = None
            if entry['published']:
                try:
                    published = datetime.strptime(entry['published'], '%B, %d %Y %H:%M:%S')
                except ValueError:
                    # Handle parsing error for different date format or empty value
                    # Set published to None or a default value, depending on your requirements
                    pass

            DataEntry.objects.create(
                end_year=entry['end_year'],
                intensity=entry['intensity'],
                sector=entry['sector'],
                topic=entry['topic'],
                insight=entry['insight'],
                url=entry['url'],
                region=entry['region'],
                start_year=entry['start_year'],
                impact=entry['impact'],
                added=added,
                published=published,
                country=entry['country'],
                relevance=entry['relevance'],
                pestle=entry['pestle'],
                source=entry['source'],
                title=entry['title'],
                likelihood=entry['likelihood']
            )

        self.stdout.write(self.style.SUCCESS('Data imported successfully.'))
