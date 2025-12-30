from django.db import models


class Ticket(models.Model):
    GENDER_CHOICES = [
        ('female', 'Female'),
        ('male', 'Male'),
        ('prefer not to say', 'Prefer not to say'),
    ]

    TICKET_CHOICES = [
        ('standard', 'Standard'),
        ('vip', 'VIP'),
        ('vvip', 'VVIP'),
    ]

    full_name = models.CharField(max_length=150)
    email = models.EmailField()
    phone = models.CharField(max_length=32)
    id_number = models.CharField(max_length=80, blank=True)
    gender = models.CharField(max_length=32, choices=GENDER_CHOICES, blank=True)
    ticket_type = models.CharField(max_length=32, choices=TICKET_CHOICES)
    quantity = models.PositiveIntegerField(default=1)
    event_date = models.DateField()
    event_location = models.CharField(max_length=120, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.full_name} - {self.ticket_type.upper()}"
