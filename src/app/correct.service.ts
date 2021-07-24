import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CorrectService {

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
    ],
    [
      {
        key:'前払金',
        value: '25,000'
      }
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
    ],
    [
      {
        key:'当座預金',
        value: '25,000'
      }
    ]
  ];

  public explanation =  [
    ["現金の借り入れたので、『現金（資産）』の増加と考え、左に仕訳します。銀行に対する借金が増えたので、『借入金（負債）』の増加と考え、右に仕訳します"],
    ["クレジットカードによって商品を売り上げたとき、信販会社は当社の代わりにお客さんからCorrect代金を回収します。 そのため当社はクレジットカード会社には手数料を払わなければならないのですが、この手数料は『支払手数料（費用）』（しはらいてすうりょう）として仕訳します。商品を売り上げた際、売上額から支払手数料を差し引かれた残額を『クレジット売掛金』として処理します。クレジット売掛金  =  売上  - 支払手数料"],
    ["固定資産を買う時は、手数料がかかることがあります。例えば、事務所を買う時には、不動産の仲介手数料がかかりますよね。固定資産そのものの値段を、購入代価（こうにゅうだいか）手数料のことを、付随費用（ふずいひよう）。購入代価と付随費用を合計したものを取得原価（しゅとくげんか）と言います。取得原価  =  購入代価  +  付随費用。仕訳する時の金額には、取得原価を記入します。"],
    ["「手付金を差し引いた額で商品を売ってもらえる権利」を得たので、 『前払金（資産）』の増加と考え、左に仕訳します。小切手を振り出したので、『当座預金（資産）』の減少と考え、右に仕訳します。"]
  ];

  constructor() { }

  public getCorrectDebit(): string[][]{
    return this.debitCorrectAnswer.map(data => {
      return data.map(a => {
        return a.key;
      })
    });
  };

  public getCorrectDebitMoney(): string[][]{
    return this.debitCorrectAnswer.map(data => {
      return data.map(a => {
        return a.value;
      })
    });
  };

  public getCorrectCrebit(): string[][]{
    return this.creditCorrectAnswer.map(data => {
      return data.map(a => {
        return a.key;
      })
    })
  };

  public getCorrectCreditMoney(): string[][]{
    return this.creditCorrectAnswer.map(data => {
      return data.map(a => {
        return a.value;
      })
    })
  };

}
