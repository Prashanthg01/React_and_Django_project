from django.shortcuts import render
from rest_framework.views import APIView
from . models import *
from rest_framework.response import Response
from . serializer import *
# Create your views here.


class ReactView(APIView):

    serializer_class = ReactSerializer

    def get(self, request):
        output = [{"employee": output.employee, "department": output.department}
                  for output in React.objects.all()]
        return Response(output)

    def post(self, request):

        serializer = ReactSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data)
        
class DataView(APIView):
    
    serializer_data = DataSerializer

    def get(self, request):
        output = [{"end_year": output.end_year, "intensity": output.intensity, "sector": output.sector, "topic": output.topic, "insight": output.insight, "url": output.url, "region": output.region, "start_year": output.start_year, "impact": output.impact, "added": output.added, "published": output.published, "country": output.country, "relevance": output.relevance, "pestle": output.pestle, "source": output.source, "title": output.title, "likelihood": output.likelihood}
                  for output in DataEntry.objects.all()]
        return Response(output)

    def post(self, request):

        serializer = DataSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data)
