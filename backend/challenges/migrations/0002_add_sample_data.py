from django.db import migrations

def add_sample_challenges(apps, schema_editor):
    Challenge = apps.get_model("challenges", "Challenge")
    Category = apps.get_model("challenges", "Category")

    # Ensure a default category exists (if the category field is used)
    default_category, _ = Category.objects.get_or_create(name="General")

    sample_challenges = [
        {"title": "Reverse a String", "description": "Write a function to reverse a given string.", "difficulty": "Easy", "points": 10},
        {"title": "Find the Largest Number", "description": "Write a function that finds the largest number in an array.", "difficulty": "Medium", "points": 20},
        {"title": "Check for Palindrome", "description": "Write a function that checks if a word is a palindrome.", "difficulty": "Medium", "points": 20},
        {"title": "FizzBuzz Problem", "description": "Write a function that prints numbers from 1 to 100.\n- If a number is divisible by 3, print 'Fizz'.\n- If a number is divisible by 5, print 'Buzz'.\n- If a number is divisible by both 3 and 5, print 'FizzBuzz'.", "difficulty": "Easy", "points": 10},
        {"title": "Sum of Natural Numbers", "description": "Write a function to return the sum of the first N natural numbers.", "difficulty": "Easy", "points": 10},
    ]

    # Add category only if the field exists in the model
    for challenge in sample_challenges:
        if hasattr(Challenge, 'category'):
            challenge["category"] = default_category
        Challenge.objects.create(**challenge)

class Migration(migrations.Migration):
    dependencies = [
        ('challenges', '0001_initial'),
    ]

    operations = [
        migrations.RunPython(add_sample_challenges),
    ]
