import { Component, OnInit } from '@angular/core';
import { Answer, Question, QuestionService } from '../question.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Result } from '../admin.service';

@Component({
  selector: 'app-question',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './question.component.html',
  styleUrl: './question.component.css'
})
export class QuestionComponent implements OnInit
{
  message:any='';
  subject:any='';
  username:any='';

  question:Question=new Question(0,'','','','','','','');
  submittedAnswer:string='';
  
  answer:Answer=new Answer(0,'','','');
  
  duration:any=181;// 181 seconds

  durationMessage='';

  durationInterval:any='';

  selected:boolean=false;

  allAnswers:Answer[]=[];

  questions:Question[]=[];

  index:number=0;

  score:number=0;


  constructor(private questionService:QuestionService,private router:Router)
  {
      this.message=sessionStorage.getItem("message");
      this.subject=sessionStorage.getItem("subject");
      this.username=sessionStorage.getItem("username");
  
  
      this.durationInterval=setInterval(()=>
        {

          this.duration=this.duration-1;// 178
         
          var minutes= Math.floor(this.duration/60);//2
          var seconds=this.duration%60;// 58

          this.durationMessage=minutes + ":" + seconds ;//2:58

          if(this.duration==0)
            this.endexam();


        },1000);// after 1 sec setInterval will execute given arrow function
  }


  ngOnInit(): void 
  {

     this.questionService.getAllQuestions(this.subject).subscribe(array=>{this.questions=array;this.question=this.questions[0];});
    
  }


  
// 0  1  2 index
// 1  2  3
  nextQuestion()
  {
  
    if(this.index<this.questions.length-1)
    {
         this.index=this.index+1;
         this.question=this.questions[this.index];
    }
    else
    {
        this.question=this.questions[this.questions.length-1];
    }

  }

  // 1 2 3
  // 0 1 2==index
  previousQuestion()
  {
    
      if(this.index>0)
      {
        this.index=this.index-1;

        this.question=this.questions[this.index];
      }
      else
      {
        this.question=this.questions[0];
      }

  }

  getColor(option:string)
  {
      //console.log(this.allAnswers.length);

        for(var i=0;i<this.allAnswers.length;i++)
        {
            let answer=this.allAnswers[i];

  //          console.log(answer.submittedAnswer + " " + option);

            if(answer.qno == this.question.qno && answer.submittedAnswer.trim()==option.trim())
            {
                return "green";

            }
        }


        return "red";
  }

  isChecked(option:string)
  {
      //console.log(this.allAnswers.length);

        for(var i=0;i<this.allAnswers.length;i++)
        {
            let answer=this.allAnswers[i];

           console.log(answer.submittedAnswer + " " + option);

            if(answer.qno == this.question.qno && answer.submittedAnswer.trim()==option.trim())
            {
              
                return true;

            }
        }

        return false;
  }

  saveAnswer()
  {
    this.answer=new Answer(this.question.qno,this.question.qtext,this.submittedAnswer,this.question.answer);
      
    var indexofelement=this.allAnswers.findIndex(answer=>this.answer.qno==answer.qno);

    // If answer is already present then update it and if not present then push it .

  if(indexofelement==-1)
  {
    this.allAnswers.push(this.answer);
  }
  else
  {
      this.allAnswers[indexofelement].submittedAnswer=this.answer.submittedAnswer;
  }

  console.log(JSON.stringify(this.allAnswers));
}

  endexam()
  {
    clearInterval(this.durationInterval);
    
    for (var i=0;i<this.allAnswers.length;i++) 
    {
      var answer=this.allAnswers[i];

      console.log(answer.submittedAnswer + " " + answer.correctAnswer);
      
      if(answer.submittedAnswer==answer.correctAnswer)
        {
            this.score=this.score+1;
        }
  
    }
    
    var result=new Result(this.username,this.subject,this.score);

    this.questionService.saveResult(result).subscribe();

    this.router.navigate(['score'],{queryParams:{'score':this.score,'allanswers':JSON.stringify(this.allAnswers)}});
  }


  getQuestion(eventobject:any)
  {

      let questionNumber=eventobject.target.value; // target will give source of event
     
      //console.log("selected question number is " + questionNumber);

      // [ Question object subscriber() ] Observable object given by getQuestion()

      // We do not need reference for calling single method

      // we laways pass arrow function as a argument while calling another function

      // e.g. while calling subscribe() function , we have passed arrow function as a argument

      // In functional programming , we can pass function as argument . Java too support
      
      // functional programming through lambda expresssion 

    }


}
