from django.http import HttpResponse, HttpResponseRedirect
from django.template import loader
import datetime

from .models import *


def index(request):
    context = {
        'tasks': Task.objects.all()
    }
    template = loader.get_template('index.html')
    return HttpResponse(template.render(context, request))


def create_task(request):
    name = request.POST['name']
    description = request.POST['description']
    t = Task()
    t.name = name
    t.description = description
    t.created_date = datetime.datetime.now().date()
    t.save()
    return HttpResponseRedirect('/')

