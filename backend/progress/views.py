from rest_framework import viewsets
from rest_framework.response import Response
from django.utils.timezone import now
from datetime import timedelta
from .models import Leaderboard
from .serializers import LeaderboardSerializer

class LeaderboardViewSet(viewsets.ReadOnlyModelViewSet):
    """
    API ViewSet for leaderboard rankings.
    Provides weekly, monthly, and all-time leaderboards.
    """
    queryset = Leaderboard.objects.all().order_by("-total_points")
    serializer_class = LeaderboardSerializer

    def list(self, request):
        current_time = now()

        # Weekly Leaderboard (Last 7 Days)
        weekly_start = current_time - timedelta(days=7)
        weekly = Leaderboard.objects.filter(
            user__progress__timestamp__gte=weekly_start  # ✅ FIXED!
        ).distinct().order_by("-total_points")[:10]

        # Monthly Leaderboard (Last 30 Days)
        monthly_start = current_time - timedelta(days=30)
        monthly = Leaderboard.objects.filter(
            user__progress__timestamp__gte=monthly_start  # ✅ FIXED!
        ).distinct().order_by("-total_points")[:10]

        # All-Time Leaderboard (Top 10)
        all_time = Leaderboard.objects.all().order_by("-total_points")[:10]

        # Serialize Data
        def serialize(queryset):
            return LeaderboardSerializer(queryset, many=True).data

        return Response(
            {
                "weekly": serialize(weekly),
                "monthly": serialize(monthly),
                "allTime": serialize(all_time),
            }
        )
