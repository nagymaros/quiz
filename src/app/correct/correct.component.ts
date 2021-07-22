import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-correct',
  templateUrl: './correct.component.html',
  styleUrls: ['./correct.component.scss']
})
export class CorrectComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
  ) { }

  public num: number = 0;

  public sentence = [
    ["現金の借り入れたので、『現金（資産）』の増加と考え、左に仕訳します。銀行に対する借金が増えたので、『借入金（負債）』の増加と考え、右に仕訳します"],
    ["クレジットカードによって商品を売り上げたとき、信販会社は当社の代わりにお客さんから代金を回収します。 そのため当社はクレジットカード会社には手数料を払わなければならないのですが、この手数料は『支払手数料（費用）』（しはらいてすうりょう）として仕訳します。商品を売り上げた際、売上額から支払手数料を差し引かれた残額を『クレジット売掛金』として処理します。クレジット売掛金  =  売上  - 支払手数料"],
    ["固定資産を買う時は、手数料がかかることがあります。例えば、事務所を買う時には、不動産の仲介手数料がかかりますよね。固定資産そのものの値段を、購入代価（こうにゅうだいか）手数料のことを、付随費用（ふずいひよう）。購入代価と付随費用を合計したものを取得原価（しゅとくげんか）と言います。取得原価  =  購入代価  +  付随費用。仕訳する時の金額には、取得原価を記入します。"]
  ];

  public debit = [
    ['現金'],
    ['クレジット売掛金', '支払手数料'],
    ['土地']
  ];

  public debitMoney = [
    ['1,000'],
    ['4,800', '200'],
    ['50,500']
  ];

  public credit = [
    ['借入金'],
    ['売上'],
    ['現金'],
  ];

  public creditMoney = [
    ['1,000'],
    ['5,000'],
    ['50,500']
  ];

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.num = parseInt(params['num']);
    });
  }

}
