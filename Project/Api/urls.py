from django.urls import path
from django.views import *

urlpatterns = [
    path('', Home, name="inicio"),
]
