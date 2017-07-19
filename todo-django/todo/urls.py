from django.conf.urls import url

from . import views

app_name = 'todo'
urlpatterns = [
    url(r'^$', views.index, name='index'),
    url(r'^create_task/$', views.create_task, name='create_task'),
    url(r'^view_task/(?P<task_id>[0-9]+)/$', views.view_task, name='view_task'),
    url(r'^close_task/(?P<task_id>[0-9]+)/$', views.close_task, name='close_task'),
    url(r'^edit_begin/(?P<task_id>[0-9]+)/$', views.edit_begin, name='edit_begin'),
    url(r'^edit_save/(?P<task_id>[0-9]+)/$', views.edit_save, name='edit_save'),
]