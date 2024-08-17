from django.urls import path, include
from . import views

urlpatterns = [
    path("feed", views.feed, name="index"),
    path("profile", views.profile, name="profile"),
    path("idData", views.idDataCreateView.as_view(), name="fetch"),
    path('receive_data', views.receive_data),
    path('id_data', views.get_existing_data)
]