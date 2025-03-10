from django.db import models

class Category(models.Model):
    name = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return self.name

class Challenge(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    difficulty = models.CharField(
        max_length=20,
        choices=[('Easy', 'Easy'), ('Medium', 'Medium'), ('Hard', 'Hard')],
    )
    points = models.IntegerField(default=10)

    # Set `null=True, blank=True` if category is optional
    category = models.ForeignKey(
        Category, 
        on_delete=models.CASCADE, 
        related_name="challenges",
        null=True,  # Allows NULL values
        blank=True  # Allows blank values in Django forms
    )

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title
