import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Result } from './admin.service';

@Injectable({
  providedIn: 'root'
})
export class QuestionService 
{

  constructor(private httpClient:HttpClient) 
  { 


  }


  getAllQuestions(subject:string)
  {
    return this.httpClient.get<Question[]>("http://localhost:8000/loginapp/getAllQuestions/"+subject);
  }
  
  getAllSubjects()
  {
    return this.httpClient.get<string[]>("http://localhost:8000/loginapp/getAllSubjects/");

  }

  addQuestion(question:Question)
  {
    return this.httpClient.post<boolean>("http://localhost:8000/loginapp/addQuestion/" , question);
  }

  updateQuestion(question: Question) 
  {
    return this.httpClient.put<boolean>("http://localhost:8000/loginapp/updateQuestion/" , question);
  }

  viewQuestion(qno:number,subject:string)
  {
    return this.httpClient.get<Question>("http://localhost:8000/loginapp/viewQuestion/"+qno+"/"+subject);
  }

  deleteQuestion(qno:number,subject:string)
  {
    return this.httpClient.delete<boolean>("http://localhost:8000/loginapp/deleteQuestion/"+qno+"/"+subject);
  }

  saveResult(result:Result)
  {
    return this.httpClient.post("http://localhost:8000/loginapp/saveResult/",result);
  }

}



export class Question
{
  qno:number;
  subject:string;
  qtext:string;
  op1:string;
  op2:string;
  op3:string;
  op4:string;
  answer:string;

   constructor(qno:number,subject:string,qtext:string,op1:string,op2:string,op3:string,op4:string,answer:string)
   {
    this.qno=qno;
    this.answer=answer;
    this.op1=op1;
    this.op2=op2;
    this.op3=op3;
    this.op4=op4;
    this.answer=answer;
    this.subject=subject;
    this.qtext=qtext;
   }
   
}


export class Answer
{
  qno:number;
  qtext:string;
  submittedAnswer:string;
  correctAnswer:string;


  constructor(qno:number,qtext:string,submittedAnswer:string,correctAnswer:string)
  {
    this.qno=qno;
    this.qtext=qtext;
    this.submittedAnswer=submittedAnswer;
    this.correctAnswer=correctAnswer;
  }

}




