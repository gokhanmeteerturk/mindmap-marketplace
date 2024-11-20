from django.shortcuts import render
from django.http import HttpResponse
from rest_framework import viewsets, permissions
from rest_framework.exceptions import PermissionDenied
from rest_framework.decorators import action
from rest_framework.response import Response
from api.models import MindMap
from .serializers import LoginSerializer, MindMapSerializer
from rest_framework.permissions import AllowAny
from rest_framework.decorators import api_view, permission_classes
from django.contrib.auth import login, logout
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def protected_route(request):
    return Response({"message": "You have access!"})

class IsAuthorOrSuperuser(permissions.BasePermission):
    """
    Custom permission to allow only the author or a superuser to update or delete an object.
    """
    def has_object_permission(self, request, view, obj):
        return request.user.is_superuser or obj.author == request.user


def home(request):
    return HttpResponse("Initial home page test")


class MindMapViewSet(viewsets.ModelViewSet):
    queryset = MindMap.objects.all()
    serializer_class = MindMapSerializer

    def get_queryset(self):
        """
        Filter out inactive MindMaps for list and retrieve actions.
        """
        if self.action in ['list', 'retrieve']:
            return self.queryset.filter(active=True)
        return self.queryset

    def perform_create(self, serializer):
        """
        Automatically set the author of a new MindMap to the logged-in user.
        """
        serializer.save(author=self.request.user)

    permission_classes_by_action = {
        'update': [IsAuthorOrSuperuser],
        'destroy': [IsAuthorOrSuperuser],
        'my_mindmaps': [permissions.IsAuthenticated],
        'default': [permissions.IsAuthenticated]
    }

    @action(detail=False, methods=['get'])
    def my_mindmaps(self, request):
        """
        Custom action to retrieve MindMaps owned by the logged-in user.
        """
        user_mindmaps = self.get_queryset().filter(author=request.user)
        serializer = self.get_serializer(user_mindmaps, many=True)
        return Response(serializer.data)

    def get_permissions(self):
        """
        Dynamically assign permissions based on the action.
        """
        return [
            permission()
            for permission in self.permission_classes_by_action.get(
                self.action, self.permission_classes_by_action['default']
            )
        ]
