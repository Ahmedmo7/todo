from django.shortcuts import render
from rest_framework import viewsets
from .serializers import TodoSerlializer
from .models import Todo 
# Create your views here.


class TodoView(viewsets.ModelViewSet):
	serializer_class = TodoSerlializer
	queryset = Todo.objects.all()