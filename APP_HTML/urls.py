from django.urls import path
from . import views


urlpatterns = [
  path('', views.index, name='index'),
  path('index/', views.index, name='index'),
  path('resume/', views.resume, name='resume'),
  path('chess/', views.chess, name='chess'),
  path('snake/', views.snake, name='snake'),
  path('hardware/', views.hardware, name='hardware'),
  path('books/', views.books, name='books'),
  path('software/', views.software, name='software'),
]
