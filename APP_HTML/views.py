from django.shortcuts import render


def index(request):
  return render(request, 'APP_HTML/index.html')


def resume(request):
  return render(request, 'APP_HTML/resume.html')


def cover(request):
  return render(request, 'APP_HTML/cover.html')


def hobbies(request):
  return render(request, 'APP_HTML/hobbies.html')


def chess(request):
  return render(request, 'APP_HTML/chess.html')


def snake(request):
  return render(request, 'APP_HTML/snake.html')


def hardware(request):
  return render(request, 'APP_HTML/hardware.html')


def finance(request):
  return render(request, 'APP_HTML/finance.html')


