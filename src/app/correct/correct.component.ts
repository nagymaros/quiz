import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CorrectService } from '../correct.service';
import { QuizService } from '../quiz.service';

@Component({
  selector: 'app-correct',
  templateUrl: './correct.component.html',
  styleUrls: ['./correct.component.scss']
})
export class CorrectComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private quizService: QuizService,
    private correctService: CorrectService
  ) { }

  public num: number = 0;

  /** 問題文 */
  public problemSentence: string[] = [];

  /** 解説 */
  public explanation: string[][] = [];

  public debit: string[][]  = [];

  public debitMoney: string[][] = [];

  public credit: string[][] = [];

  public creditMoney: string[][] = [];

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.num = parseInt(params['num']);
    });
    this.problemSentence = this.quizService.getProblemSentence();
    this.explanation = this.correctService.explanation;
    this.debit = this.correctService.getCorrectDebit();
    this.debitMoney = this.correctService.getCorrectDebitMoney();
    this.credit = this.correctService.getCorrectCrebit();
    this.creditMoney = this.correctService.getCorrectCreditMoney();
  }

}
