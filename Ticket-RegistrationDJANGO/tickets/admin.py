from django.contrib import admin

from .models import Ticket


@admin.register(Ticket)
class TicketAdmin(admin.ModelAdmin):
    list_display = (
        'full_name',
        'email',
        'ticket_type',
        'quantity',
        'event_date',
        'created_at',
    )
    list_filter = ('ticket_type', 'event_date', 'created_at')
    search_fields = ('full_name', 'email', 'phone', 'event_location')
