import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute) { }
  id;
  ngOnInit() {
  /* this.id = parseInt(this.route.snapshot.paramMap.get('id'));*/
    this.route.paramMap.subscribe((param: ParamMap) => {
      this.id = parseInt(param.get('id'));
    });
  }
  ba(){
    this.router.navigate(['/detail', this.id - 1]);
  }
  ne(){
    this.router.navigate(['/detail', this.id + 1]);
  }

  retour(){
    this.router.navigate(['../'], {relativeTo: this.route});
  }
}
