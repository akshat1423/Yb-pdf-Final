from django.urls import path
from .views import FormDataCreateView
from response import views

urlpatterns = [
    path('api/formdata/', FormDataCreateView.as_view(), name='formdata-create'),
    path('', views.formData),
    path('api/send_data/', views.send_data),
    path('csvdata/', views.fetch_data_from_csv, name="csv")
]