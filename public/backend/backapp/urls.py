from django.urls import path
from . import views

urlpatterns = [
    path('RegisterDetails',views.RegisterDetails.as_view(),name='RegisterDetails'),
    path('GetallUserAPI',views.GetallUserAPI.as_view(),name='GetallUserAPI'),
    path('GetallEducationAPI',views.GetallEducationAPI.as_view(),name='GetallEducationAPI'),
    path('getSingleUserEducation/<int:id>',views.getSingleUserEducation.as_view(),name='getSingleUserEducation'),
    path('getSingleUser/<int:id>',views.getSingleUser.as_view(),name='getSingleUser'),
    path('updateRegister/<int:id>',views.updateRegister.as_view(),name='updateRegister'),
]