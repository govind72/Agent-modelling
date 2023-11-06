from django.urls import path
from . import views

urlpatterns = [
    path('agents', views.get_all_agents),
    path('agents/<int:id>/', views.get_agent_by_id),
    path('agents/<int:id>/update/', views.update_agent),
    path('agents/create/', views.create_agent),
]
