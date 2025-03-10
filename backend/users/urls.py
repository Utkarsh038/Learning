from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .views import UserViewSet  # Import the correct view

# Create a router for the viewset
router = DefaultRouter()
router.register(r'users', UserViewSet)  # This maps CRUD operations automatically

urlpatterns = [
    path("login/", TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path("", include(router.urls)),  # Include the router URLs
]
