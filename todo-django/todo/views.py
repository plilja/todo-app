from django.http import HttpResponse
from django.template import loader

from .models import *


def index(request):
    context = {
        'tasks': Task.objects.all()
    }
    template = loader.get_template('index.html')
    return HttpResponse(template.render(context, request))
