import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { QuestionComponent } from './question/question.component';
import { ScoreComponent } from './score/score.component';
import { AdmindashboardComponent } from './admindashboard/admindashboard.component';
import { QuestionmanagementComponent } from './questionmanagement/questionmanagement.component';
import { ManageresultComponent } from './manageresult/manageresult.component';
import { RegisterComponent } from './register/register.component';

export const routes: Routes = [

    {path:'login',component:LoginComponent},

    {path:'question',component:QuestionComponent},

    {path:'score',component:ScoreComponent},

    {path:'admindashboard',component:AdmindashboardComponent},

    {path:'questionmanagement',component:QuestionmanagementComponent},

    {path:'manageresult',component:ManageresultComponent},
    
    {path:"register",component:RegisterComponent},

    {path:'',redirectTo:'register',pathMatch:'full'}


];
