from django.shortcuts import render
from django.http import HttpResponse
from rest_framework import viewsets, permissions
from rest_framework.exceptions import PermissionDenied
from api.models import MindMap
from .serializers import MindMapSerializer


class IsAuthorOrSuperuser(permissions.BasePermission):

    def has_object_permission(self, request, view, obj):
        return request.user.is_superuser or obj.author == request.user


def home(request):
    return HttpResponse("Initial home page test")


class MindMapViewSet(viewsets.ModelViewSet):
    queryset = MindMap.objects.all()
    serializer_class = MindMapSerializer

    def get_queryset(self):
        if self.action in ['list', 'retrieve']:
            return self.queryset.filter(active=True)
        return self.queryset

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)

    permission_classes_by_action = {
        'update': [IsAuthorOrSuperuser],
        'destroy': [IsAuthorOrSuperuser],
        'default': [permissions.IsAuthenticated]
    }

    def get_permissions(self):
        return [
            permission()
            for permission in self.permission_classes_by_action.get(
                self.action, self.permission_classes_by_action['default']
            )
        ]
