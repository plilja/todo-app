from django.db import models
from django.urls import reverse


class Task(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()
    created_date = models.DateField()

    def get_absolute_url(self):
        return reverse('todo:view_task', args=(self.id,))
