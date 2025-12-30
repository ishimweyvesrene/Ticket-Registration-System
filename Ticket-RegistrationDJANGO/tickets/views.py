from rest_framework import viewsets
from rest_framework.permissions import AllowAny

from .models import Ticket
from .serializers import TicketSerializer


class TicketViewSet(viewsets.ModelViewSet):
    queryset = Ticket.objects.all()
    serializer_class = TicketSerializer
    http_method_names = ['get', 'post', 'head', 'options']
    permission_classes = [AllowAny]
