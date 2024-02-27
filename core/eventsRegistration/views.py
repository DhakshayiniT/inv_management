from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import Event, Registration
from .serializers import EventSerializer, RegistrationSerializer
from django.contrib.auth.models import User
from django.contrib.auth.hashers import make_password
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated


@api_view(['POST'])
@permission_classes([])
def register_user(request):
    if request.method == 'POST':
        username = request.data.get('username')
        email = request.data.get('email')
        password = request.data.get('password')

        if User.objects.filter(username=username).exists():
            return Response({"error": "Username already exists"}, status=status.HTTP_400_BAD_REQUEST)

        hashed_password = make_password(password)

        user = User.objects.create(username=username, email=email, password=hashed_password)
        user.save()

        return Response({"message": "User created successfully"}, status=status.HTTP_201_CREATED)

@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def register_for_event(request):
    if request.method == 'POST':
        event_id = request.data.get('event_id')
        try:
            event = Event.objects.get(pk=event_id)
        except Event.DoesNotExist:
            return Response({"error": "Event does not exist"}, status=status.HTTP_404_NOT_FOUND)

        if event.capacity <= Registration.objects.filter(event=event).count():
            return Response({"error": "Event is at full capacity"}, status=status.HTTP_400_BAD_REQUEST)

        registration = Registration(user=request.user, event=event)
        registration.save()

        return Response({"message": "Registration successful."}, status=status.HTTP_201_CREATED)


@api_view(['POST'])
def create_event(request):
    if request.method == 'POST':
        serializer = EventSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)        

@api_view(['GET'])
def get_events(request):
    if request.method == 'GET':
        events = Event.objects.all()
        serializer = EventSerializer(events, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['DELETE'])
def cancel_event_registration(request, registration_id):
    if request.method == 'DELETE':
        try:
            registration = Registration.objects.get(pk=registration_id)
            if registration.user == request.user:
                registration.delete()
                return Response({"message": "Registration canceled successfully."}, status=status.HTTP_200_OK)
            else:
                return Response({"error": "You are not authorized to cancel this registration."}, status=status.HTTP_403_FORBIDDEN)
        except Registration.DoesNotExist:
            return Response({"error": "Registration not found."}, status=status.HTTP_404_NOT_FOUND)
