from rest_framework import serializers

from .models import Ticket


class TicketSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ticket
        fields = [
            'id',
            'full_name',
            'email',
            'phone',
            'id_number',
            'gender',
            'ticket_type',
            'quantity',
            'event_date',
            'event_location',
            'created_at',
        ]
