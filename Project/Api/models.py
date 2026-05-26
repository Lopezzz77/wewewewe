from django.db import models

# clss+name 

class Alumno(models.Model):
    id_Alumno = models.AutoField(primary_key=True)
    DNI = models.TextField(max_length=10, unique=True)
    Edad = models.IntegerField()
    nombre = models.TextField(max_length=35)
    apellido = models.TextField(max_length=35)
    email = models.EmailField(unique=True)
    Calle = models.TextField(max_length=50)
    Altura= models.IntegerField()

    def __str__(self):
        return self.DNI 
