from django.contrib import admin
from django.urls import path, include
from django.http import JsonResponse

# ✅ Default homepage view
def home(request):
    return JsonResponse({"message": "Welcome to the Interactive Learning Platform!"})

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/users/", include("users.urls")),
    path("api/challenges/", include("challenges.urls")),
    path("api/leaderboard/", include("progress.urls")),
    path("", home),  # 👈 This handles requests to "/"
]
