from django.conf.urls import url

from . import views

app_name = 'todo'
urlpatterns = [
    url(r'^$', views.index, name='index'),
    url(r'^create_task/$', views.create_task, name='create_task'),
    url(r'^view_task/(?P<pk>[0-9]+)/$', views.ViewTaskView.as_view(), name='view_task'),
    url(r'^close_task/(?P<pk>[0-9]+)/$', views.CloseTaskView.as_view(), name='close_task'),
    url(r'^edit_task/(?P<pk>[0-9]+)/$', views.EditTaskView.as_view(), name='edit_task'),
]