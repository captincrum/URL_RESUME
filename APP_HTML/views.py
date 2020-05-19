from django.shortcuts import render


def index(request):
  return render(request, 'APP_HTML/index.html')


def resume(request):
  return render(request, 'APP_HTML/resume.html')


def chess(request):
  return render(request, 'APP_HTML/chess.html')


def snake(request):
  return render(request, 'APP_HTML/snake.html')


def hardware(request):
  return render(request, 'APP_HTML/hardware.html')


def books(request):
  return render(request, 'APP_HTML/books.html')


def software(request):
  return render(request, 'APP_HTML/software.html')



