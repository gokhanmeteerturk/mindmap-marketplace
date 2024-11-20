from django.urls import path
from .views import *
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register('mindmap', MindMapViewSet, basename='mindmap')

urlpatterns = [
     path('', home, name='home'),
     path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
     path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
     path('protected-route/', protected_route, name='protected_route'),

]
urlpatterns += router.urls
