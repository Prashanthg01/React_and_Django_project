from rest_framework import serializers
from . models import *


class ReactSerializer(serializers.ModelSerializer):
    class Meta:
        model = React
        fields = ['employee', 'department']
        
class DataSerializer(serializers.ModelSerializer):
    class Meta:
        model = DataEntry
        fields = ['end_year', 'intensity', 'sector', 'topic', 'insight', 'url', 'region', 'start_year', 'impact', 'added', 'published', 'country', 'relevance', 'pestle', 'source', 'title', 'likelihood']

