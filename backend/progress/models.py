from django.db import models
from django.db.models import Sum
from users.models import CustomUser
from challenges.models import Challenge

class UserProgress(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name="progress")
    challenge = models.ForeignKey(Challenge, on_delete=models.CASCADE)
    timestamp = models.DateTimeField(auto_now_add=True)
    status = models.CharField(
        max_length=20,
        choices=[("completed", "Completed"), ("in_progress", "In Progress")]
    )

    def __str__(self):
        return f"{self.user.username} - {self.challenge.title} ({self.status})"

class Leaderboard(models.Model):
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE)
    total_points = models.IntegerField(default=0)
    completed_challenges = models.IntegerField(default=0)

    def update_leaderboard(self):
        # ✅ FIXED: Using "progress" instead of "userprogress_set"
        points_sum = self.user.progress.filter(status="completed").aggregate(Sum("challenge__points"))["challenge__points__sum"] or 0
        completed_count = self.user.progress.filter(status="completed").count()

        # Update fields and save
        self.total_points = points_sum
        self.completed_challenges = completed_count
        self.save()

    def __str__(self):
        return f"{self.user.username} - {self.total_points} points"
