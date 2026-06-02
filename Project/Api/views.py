from urllib import request
from django.shortcuts import render

def Home(request):
    return render(request, 'index.html')

def Admin(request):
    return render(request, 'admin.html')