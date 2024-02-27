from django.urls import path
from .views import register_user, register_for_event, get_events, cancel_event_registration,create_event
from rest_framework_simplejwt.views import TokenObtainPairView

urlpatterns = [
    path('api/register', register_user, name='register_user'),
    path('api/register_event', register_for_event, name='register_for_event'),
    path('api/events', get_events, name='get_events'),
    path('api/event/create', create_event, name='create_event'),
    path('api/cancel_registration/<int:registration_id>/', cancel_event_registration, name='cancel_event_registration'),
    path('api/token', TokenObtainPairView.as_view(), name='token_obtain_pair'),
]
