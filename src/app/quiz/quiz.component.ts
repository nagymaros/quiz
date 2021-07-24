import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Router } from '@angular/router';
import { QuizService } from '../quiz.service';
import { CorrectService } from '../correct.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})
export class QuizComponent implements OnInit {

  constructor(
    private router: Router,
    private quizService: QuizService,
    private correctService: CorrectService
  ) { }

  /** 問題文 */
  public problemSentence: string[] = [];

  /** 勘定項目 */
  public accountItem:string[][] = [];

  /** 金額 */
  public money:string[][] = [];

  /** 借方 */
  public debit:string[][] = [];

  /** 借方の金額 */
  public debitMoney:string[][] = [];

  /** 貸方 */
  public credit:string[][] = [];

  /** 貸方の金額 */
  public creditMoney:string[][] = [];

  /**借方の正解 */
  public debitCorrectAnswer: { key: string, value: string }[][] = [];

  /**貸方の正解 */
  public creditCorrectAnswer: { key: string, value: string }[][] = [];

  /** ページ数 */
  public pageNumber = 0;

  /** 最後のページ */
  public lastPageNumber = 0;

  ngOnInit(): void {
    this.problemSentence = this.quizService.getProblemSentence();
    this.accountItem = this.quizService.accountItem;
    this.money = this.quizService.money;
    this.debit = this.quizService.debit;
    this.debitMoney = this.quizService.debitMoney;
    this.credit = this.quizService.credit;
    this.creditMoney = this.quizService.creditMoney;
    this.debitCorrectAnswer = this.correctService.debitCorrectAnswer;
    this.creditCorrectAnswer = this.correctService.creditCorrectAnswer;
    // 最終ページを設定
    this.lastPageNumber = this.accountItem.length - 1;
  }

  public drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }

  // 次のページへ進む
  public next() {
    this.pageNumber += 1
  }

  // 前のページへ戻る
  public cancel() {
    this.pageNumber -= 1
  }

  // 最終ページの場合、答え合わせ
  public submit() {
    // 借方をまとめる
    const debitResult = this.debit.map((data, i) => {
      return data.map((str, j) => {
        return {
          key: str,
          value: this.debitMoney[i][j]
        }
      })
    })
    console.log(debitResult);
    // 貸方をまとめる
    const creditResult = this.credit.map((data, i) => {
      return data.map((str, j) => {
        return {
          key: str,
          value: this.creditMoney[i][j]
        }
      })
    })
    const quizResult = this.compareCorrectAnswer(debitResult, creditResult);
    this.router.navigate(['/result'], { queryParams: { quizResult: quizResult } });
  }

  private compareCorrectAnswer(debitResult: { key: string; value: string; }[][], creditResult: { key: string; value: string; }[][]) {
    // 借方を正解と比較する
    const quizDebitResult = debitResult.map((result, i) => {
      const resultArray = result.map(data => {
        const a = this.debitCorrectAnswer[i].find(answer => answer.key == data.key);
        if (a?.value == data.value) {
          return true;
        } else {
          return false;
        }
      })
      if (resultArray.includes(false)) {
        return false;
      } else {
        return true;
      }
    });
    console.log(quizDebitResult);

    // 貸方を正解と比較する
    const quizCreditResult = creditResult.map((result, i) => {
      const resultArray = result.map(data => {
        const a = this.creditCorrectAnswer[i].find(answer => answer.key == data.key);
        if (a?.value == data.value) {
          return true;
        } else {
          return false;
        }
      })
      if (resultArray.includes(false)) {
        return false;
      } else {
        return true;
      }
    });
    console.log(quizCreditResult);

    // 借方と貸方の解答比較
    const quizResult = quizDebitResult.map((debit, i) => {
      if (debit === true && quizCreditResult[i] === true) {
        return 0; // 正解
      } else {
        return 1; // 不正解
      }
    })
    console.log(quizResult);
    return quizResult;
  }
}
