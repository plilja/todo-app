import datetime

from django.http import HttpResponseRedirect
from django.shortcuts import render
from django.urls import reverse_lazy
from django.views import generic

from .models import *


def index(request):
    name = request.GET.get('name', '')
    tasks = Task.objects.filter(name__contains=name)
    return render(request, 'todo/index.html', context={'tasks': tasks})


def create_task(request):
    name = request.POST['name']
    description = request.POST['description']
    t = Task()
    t.name = name
    t.description = description
    t.created_date = datetime.datetime.now().date()
    t.save()
    return HttpResponseRedirect(reverse('todo:index'))


class ViewTaskView(generic.DetailView):
    model = Task
    template_name = 'todo/view_task.html'


class CloseTaskView(generic.DeleteView):
    model = Task
    success_url = reverse_lazy('todo:index')


class EditTaskView(generic.UpdateView):
    model = Task
    fields = ['name', 'description']
    template_name = 'todo/edit_task.html'
