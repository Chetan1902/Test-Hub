from . import views
from django.urls import path

urlpatterns = [
    path('giveStudentInfo/',views.giveStudentInfo),
    path('hello',views.hello),
    path('getAllQuestions/<subject>/',views.getAllQuestions),
    path('getAllSubjects/',views.getAllSubjects),
    path('saveUser/',views.saveUser),
    path('validate/',views.validate),
    path('validate2/',views.validate2),
    path('saveResult/',views.saveResult),
    path('getResults/<subject>/',views.getResults),
    path("getRecordsCounts/<subject>/",views.getRecordsCounts),
    path('getResults2/<subject>/<pageno>/',views.getResults2),
    path('addQuestion/',views.addQuestion),
    path('updateQuestion/',views.updateQuestion),
    path('deleteQuestion/<qno>/<subject>/',views.deleteQuestion),
    path('viewQuestion/<qno>/<subject>/',views.viewQuestion)
    
]