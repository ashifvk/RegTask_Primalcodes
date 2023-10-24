from rest_framework import serializers
from .models import Candidate,Education


class CandidateSerializer(serializers.ModelSerializer):
    class Meta:
        model=Candidate
        fields='__all__'

class EducationSerializer(serializers.ModelSerializer):
    class Meta:
        model=Education
        fields='__all__'
