from django.conf import settings
from django.db import models

class MindMap(models.Model):
    name = models.CharField(unique=True, max_length=100)
    added_date = models.DateTimeField(auto_now_add=True)
    description = models.TextField(blank=False, null=False, default="")
    active = models.BooleanField(default=True)
    author = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
    )
    nodes = models.TextField(blank=False, null=False, default="")
    edges = models.TextField(blank=False, null=False, default="")
    price_gbp = models.DecimalField(max_digits=5, decimal_places=2, default=5.50, null=False, blank=False)

    def __str__(self):
         return self.name
