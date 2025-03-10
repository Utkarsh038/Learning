from django.urls import path
from .views import get_challenges,submit_code

urlpatterns = [
   path("", get_challenges, name="get_challenges"),  # ✅ List all challenges
     path("submit/", submit_code, name="submit_code"),
]
