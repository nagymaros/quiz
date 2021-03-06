import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';


@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router:Router
  ) {}

  public quizResult: string[] = [];

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.quizResult = params['quizResult'];
    });
    console.log(this.quizResult);
  }
  
  public toCorrectAnswer(i:number){
    this.router.navigate(['/correct'], {queryParams : {num: i}});
  }

}

