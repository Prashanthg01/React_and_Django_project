from django.contrib import admin
from django.urls import path, include
from appbackend.views import *

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', ReactView.as_view(), name="xxx"),
    path('data/', DataView.as_view(), name="data"),
]
