from rest_framework import generics
from .models import userResponse
from .serializers import FormDataSerializer
from django.shortcuts import render
import requests
from rest_framework.response import Response
from rest_framework.decorators import api_view
import csv
import os

class FormDataCreateView(generics.CreateAPIView):
    queryset = userResponse.objects.all()
    serializer_class = FormDataSerializer

def formData(request):
    data = userResponse.objects.all()
    context = { 'data' : data }
    return render(request, 'dashboard.html', context)

@api_view(['POST'])
def send_data(request):
    
        data_to_send = request.data
    
        response = requests.post('http://127.0.0.1:8000/api/receive_data', json=data_to_send)  
    
        if response.status_code == 200:
            return Response({'status': 'success', 'message': 'Data sent successfully'})
        else:
            return Response({'status': 'failure', 'message': 'Failed to send data'}, status=response.status_code)

def fetch_data_from_csv(request):
    data = []
    file_path = os.path.join(os.path.dirname(__file__), 'data', 'yearbook_id_aryan1.csv')
    print(file_path)
    with open(file_path, newline='', encoding='utf-8') as csvfile:
        reader = csv.DictReader(csvfile)
        for row in reader:
            data.append(row)
    
    context = {'data': data}
    print(data[0])
    return render(request, 'dashboard.html', context)

