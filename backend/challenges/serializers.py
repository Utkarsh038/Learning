from rest_framework import serializers
from .models import Challenge, Category

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = "__all__"

class ChallengeSerializer(serializers.ModelSerializer):
    category = CategorySerializer(read_only=True)  # Nested category info

    class Meta:
        model = Challenge
        fields = "__all__"
