import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CorrectComponent } from './correct/correct.component';
import { PrivateComponent } from './private/private.component';
import { QuizComponent } from './quiz/quiz.component';
import { ResultComponent } from './result/result.component';

const routes: Routes = [
  { path: '', component: PrivateComponent },
  { path: 'quiz', component: QuizComponent },
  { path: 'result', component: ResultComponent},
  { path: 'correct', component: CorrectComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
