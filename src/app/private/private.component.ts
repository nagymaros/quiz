import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

export class PrivateAPIKeySet {
  constructor(public key: string, public secret: string) {}
}

@Component({
  selector: 'app-private',
  templateUrl: './private.component.html',
  styleUrls: ['./private.component.scss']
})
export class PrivateComponent implements OnInit {
  keySet = new PrivateAPIKeySet('', '');
  hide = true;

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
  }

  onSubmit() {
    console.log(this.keySet);
    sessionStorage.setItem('name', JSON.stringify(this.keySet.key));
    // this.router.navigate(['../quiz'], { relativeTo: this.route });
    this.router.navigate(['/quiz']);
  }

}
