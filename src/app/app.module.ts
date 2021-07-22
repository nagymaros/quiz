import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { PrivateComponent } from './private/private.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { QuizComponent } from './quiz/quiz.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ResultComponent } from './result/result.component';
import { MatTableModule } from '@angular/material/table';
import { CorrectComponent } from './correct/correct.component';

@NgModule({
  declarations: [
    AppComponent,
    PrivateComponent,
    QuizComponent,
    ResultComponent,
    CorrectComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    FormsModule,
    BrowserAnimationsModule,
    DragDropModule,
    MatTableModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
