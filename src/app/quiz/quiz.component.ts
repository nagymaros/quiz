import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})
export class QuizComponent implements OnInit {

  constructor(
    private router: Router,
  ) { }

  public pageNumber = 0;
  

  /** 問題文 */
  public sentence: string[] = [];

  /** 勘定項目 */
  public accountItem = [
    [
      '現金',
      '借入金'
    ],
    [
      'クレジット売掛金',
      '支払手数料',
      '売上'
    ],
    [
      '土地',
      '支払手数料'
    ]
  ];
  /** 最後のページ */
  public lastPageNumber = this.accountItem.length - 1;

  /** 金額 */
  public money = [
    [
      '1,000',
      '1,000'
    ],
    [
      '200',
      '500',
      '4,500',
      '4,800',
      '5,000',
    ],
    [
      '100,000',
      '120,000',
      '50,500'
    ]
  ];

  public debit = [
    ['借入金'],
    ['現金'],
    ['現金']
  ];

  public debitMoney = [
    ['50,000'],
    ['500,000'],
    ['5000,000']
  ];

  public credit = [
    ['小銭'],
    ['売上高'],
    ['売上高']
  ];

  public creditMoney = [
    ['50,000'],
    ['500,000'],
    ['5000,000']
  ];

  public debitCorrectAnswer = [
    [
      {
        key:'現金',
        value: '1,000'
      }
    ],
    [
      {
        key:'クレジット売掛金',
        value: '4,800'
      },
      {
        key:'支払手数料',
        value: '200'
      }
    ],
    [
      {
        key:'土地',
        value: '50,500'
      },
    ]
  ];

  public creditCorrectAnswer = [
    [
      {
        key:'借入金',
        value: '1,000'
      }
    ],
    [
      {
        key:'売上',
        value: '5,000'
      }
    ],
    [
      {
        key:'現金',
        value: '50,500'
      },
    ]
  ];

  ngOnInit(): void {
    const name = window.sessionStorage.getItem('name')?.replace(/^"(.*)"$/, '$1');;
    this.sentence =  [
      `株式会社${name}は、銀行から現金1,000円を借入れた。`,
      `クレジット払いの条件で売り上げた5,000円から手数料200円が引かれた残額4,800円が、信販会社から株式会社${name}の普通預金口座に振り込まれた。`,
      `${name}社は、土地50,000円を購入し、 代金は手数料500円とともに現金で支払った`,
    ];
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
    this.router.navigate(['/result'], {queryParams : {quizResult: quizResult}});
  }

  private compareCorrectAnswer(debitResult: {key: string; value: string;}[][], creditResult: {key: string; value: string;} [][]) {
    // 借方を正解と比較する
    const quizDebitResult = debitResult.map((result, i) => {
      const resultArray = result.map(data => {
        const a = this.debitCorrectAnswer[i].find(answer => answer.key == data.key);
        if(a?.value == data.value){
          return true;
        }else{
          return false;
        }
      })
      if(resultArray.includes(false)){
        return false;
      }else{
        return true;
      }
    });
    console.log(quizDebitResult);

    // 貸方を正解と比較する
    const quizCreditResult = creditResult.map((result, i) => {
      const resultArray = result.map(data => {
        const a = this.creditCorrectAnswer[i].find(answer => answer.key == data.key);
        if(a?.value == data.value){
          return true;
        }else{
          return false;
        }
      })
      if(resultArray.includes(false)){
        return false;
      }else{
        return true;
      }
    });
    console.log(quizCreditResult);
    
    // 借方と貸方の解答比較
    const quizResult = quizDebitResult.map((debit, i) => {
      if (debit === true && quizCreditResult[i]=== true) {
        return 0; // 正解
      } else {
        return 1; // 不正解
      }
    })
    console.log(quizResult);
    return quizResult;
  }
}
