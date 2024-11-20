from django.urls import path
from .views import *

from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register('mindmap', MindMapViewSet, basename='mindmap')

urlpatterns = [
     path('', home, name='home'),

]
urlpatterns += router.urls
