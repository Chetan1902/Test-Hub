import { Component } from '@angular/core';
import { AdminService, Result } from '../admin.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manageresult',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './manageresult.component.html',
  styleUrl: './manageresult.component.css'
})
export class ManageresultComponent {

  results:Result[]=[];
  subject:string="";
  pages:number[]=[];// it behaves like dynamic array(like list)
  no:number=0;
  message:string="";

  
  
  constructor(private adminService:AdminService,private router:Router)
  {
   
  }

  showRecords()
  {
    this.adminService.getResults2(this.subject, 1).subscribe((array) => {
      this.results = array;
      console.log("called");
    
      // Check if records are found
      if (this.results.length === 0) {
        this.message = "No records found for the entered subject.";
      } else {
        this.message = ""; // Clear the message if records are found
      }
    });
  
    // [[1,2,3]] Observable object

    this.pages.length=0;// for new subject , array must be empty

    console.log('subject is ' + this.subject);

    this.adminService.getRecordsCounts(this.subject).subscribe(noofrecords=>{
      
      let pageno=1;

      while(3*pageno<noofrecords)//11
      {
        this.pages.push(pageno);//[1,2,3]
        pageno=pageno+1;
        
      }

      this.pages.push(pageno);//[1,2,3,4]

      console.log("Total Pages " + pageno);

      
      
    });

    
  }

// 3 records
// 11 records


getResults2(pageno:number)
{
  
  this.adminService.getResults2(this.subject,pageno).subscribe(array=>this.results=array);
}
goToDashboard() 
{
  this.router.navigate(['/admindashboard']);
}



}
