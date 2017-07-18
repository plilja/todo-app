from django.http import HttpResponse, HttpResponseRedirect
from django.template import loader
from django.shortcuts import get_object_or_404, render
import datetime

from .models import *


def index(request):
    return render(request, 'index.html', context={'tasks' : Task.objects.all()})


def create_task(request):
    name = request.POST['name']
    description = request.POST['description']
    t = Task()
    t.name = name
    t.description = description
    t.created_date = datetime.datetime.now().date()
    t.save()
    return HttpResponseRedirect('/')


def view_task(request, task_id):
    t = get_object_or_404(Task, id=task_id)
    return render(request, 'view_task.html', context={'task' : t})


