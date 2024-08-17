from rest_framework import serializers
from .models import userResponse

class FormDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = userResponse
        fields = '__all__'