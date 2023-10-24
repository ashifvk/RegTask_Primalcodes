from django.shortcuts import render
from rest_framework.generics import GenericAPIView
from rest_framework.response import Response
from rest_framework import status
from .models import Candidate,Education
from .serializers import CandidateSerializer,EducationSerializer
# Create your views here.

class RegisterDetails(GenericAPIView):
    serializer_class=CandidateSerializer
    serializer_class_Education=EducationSerializer
    def post(self,request):
      
        reg_id=''
        name=request.data.get('name')
        email=request.data.get('email')
        array=request.data.get('array')
        print(name)
        print(email)
        print(array)

        if(Candidate.objects.filter(email=email)):
            return Response({'message':'duplicate registration found !'},status=status.HTTP_400_BAD_REQUEST)
        serializer_candidate=self.serializer_class(data={'name':name,'email':email})
        if serializer_candidate.is_valid():
            candidate_data= serializer_candidate.save()
            r_id=candidate_data.id
            print(r_id)
        print(array)
        for education_data in array:
            course = education_data.get('course')
            university = education_data.get('university')
            year = education_data.get('year')

            serializer = self.serializer_class_Education(data={'course': course, 'university': university, 'year': year, 'reg_id': r_id})

            if serializer.is_valid():
                serializer.save()
            
        return Response({'message': 'Registered'})

class GetallUserAPI(GenericAPIView):
    def get(self,request):
        query=Candidate.objects.all()
        if(query.count()>0):
            serializer=CandidateSerializer(query,many=True)
            return Response({'data':serializer.data,'message':'ok'},status=status.HTTP_200_OK)
        
class GetallEducationAPI(GenericAPIView):
    def get(self,request):
        query=Education.objects.all()
        if(query.count()>0):
            serializer=EducationSerializer(query,many=True)
            return Response({'data':serializer.data,'message':'ok'},status=status.HTTP_200_OK)
        
class getSingleUserEducation(GenericAPIView):
    serializer_class=EducationSerializer
    def get(self,request,id):
        query=Education.objects.filter(reg_id=id).values()
        return Response({'data':query,'message':'ok'},status=status.HTTP_200_OK)
    

class getSingleUser(GenericAPIView):
    serializer_class=CandidateSerializer
    def get(self,request,id):
        query=Candidate.objects.filter(id=id).values()
        return Response({'data':query,'message':'ok'},status=status.HTTP_200_OK)
