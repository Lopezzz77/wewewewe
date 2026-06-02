from urllib import request
from django.shortcuts import render

def Home(request):
    return render(request, 'index.html')

def Registrar(request):
   return render(request, 'Pages/registrar.html')