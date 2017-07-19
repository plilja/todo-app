import datetime

from django.http import HttpResponseRedirect
from django.shortcuts import get_object_or_404, render
from django.urls import reverse

from .models import *


def index(request):
    name = request.GET.get('name', '')
    tasks = Task.objects.filter(name__contains=name)
    return render(request, 'index.html', context={'tasks': tasks})


def create_task(request):
    name = request.POST['name']
    description = request.POST['description']
    t = Task()
    t.name = name
    t.description = description
    t.created_date = datetime.datetime.now().date()
    t.save()
    return HttpResponseRedirect(reverse('todo:index'))


def view_task(request, task_id):
    t = get_object_or_404(Task, id=task_id)
    return render(request, 'view_task.html', context={'task': t})


def close_task(request, task_id):
    t = get_object_or_404(Task, id=task_id)
    t.delete()
    return HttpResponseRedirect(reverse('todo:index'))


def edit_begin(request, task_id):
    t = get_object_or_404(Task, id=task_id)
    return render(request, 'edit_task.html', context={'task': t})


def edit_save(request, task_id):
    t = get_object_or_404(Task, id=task_id)
    name = request.POST['name']
    description = request.POST['description']
    t.name = name
    t.description = description
    t.save()
    return HttpResponseRedirect(reverse('todo:view_task', args=(task_id,)))
