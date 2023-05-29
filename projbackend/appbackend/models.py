from django.db import models

# Create your models here.
class React(models.Model):
  employee = models.CharField(max_length=30)
  department = models.CharField(max_length=200)

class DataEntry(models.Model):
    end_year = models.CharField(max_length=10, blank=True)
    intensity = models.IntegerField(blank=True)
    sector = models.CharField(max_length=255, blank=True)
    topic = models.CharField(max_length=255, blank=True)
    insight = models.TextField(blank=True)
    url = models.URLField(blank=True)
    region = models.CharField(max_length=255, blank=True)
    start_year = models.CharField(max_length=10, blank=True)
    impact = models.CharField(max_length=255, blank=True)
    added = models.DateTimeField()
    published = models.DateTimeField(null=True)
    country = models.CharField(max_length=255, blank=True)
    relevance = models.IntegerField(blank=True)
    pestle = models.CharField(max_length=255, blank=True)
    source = models.CharField(max_length=255, blank=True)
    title = models.CharField(max_length=255, blank=True)
    likelihood = models.IntegerField(blank=True)

