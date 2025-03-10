from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import Challenge
# from progress.models import UserProgress
from .serializers import ChallengeSerializer

@api_view(["GET"])
def get_challenges(request):
    challenges = Challenge.objects.all()
    serializer = ChallengeSerializer(challenges, many=True)
    return Response(serializer.data)

@api_view(["POST"])
def submit_code(request):
    """
    Handles user code submission for a challenge.
    """
    challenge_id = request.data.get("challenge_id")
    user_code = request.data.get("code")

    try:
        challenge = Challenge.objects.get(id=challenge_id)
    except Challenge.DoesNotExist:
        return Response({"error": "Challenge not found"}, status=404)

    # Simple validation (You can extend this for real execution)
    if "print" in user_code:
        return Response({"message": "Code executed successfully!"}, status=200)

    return Response({"message": "Code did not pass validation."}, status=400)
