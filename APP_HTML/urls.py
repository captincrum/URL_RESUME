from django.urls import path
from . import views


urlpatterns = [
  path('', views.index, name='index'),
  path('index/', views.index, name='index'),
  path('cover/', views.cover, name='cover'),
  path('resume/', views.resume, name='resume'),
  path('hobbies/', views.hobbies, name='hobbies'),
  path('chess/', views.chess, name='chess'),
  path('snake/', views.snake, name='snake'),
  path('hardware/', views.hardware, name='hardware'),
  path('finance/', views.finance, name='finance'),
]
