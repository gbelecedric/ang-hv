import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { EmployeesService } from '../employees.service';
import { Employee } from '../_models/employee';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {

  constructor(private employeesSerice: EmployeesService, private router: Router, private route: ActivatedRoute) { }

  public moi;
  @Output() public event = new EventEmitter();

  data: Employee[];

  ngOnInit() {
    this.employeesSerice.getEmployees().subscribe((data) => {
      console.log(data);
      this.data = data;
    }, (err) => {
      console.log(err);
    });
  }
  fireEvent(){
    this.event.emit('hey am there!');
  }

  go(obj){
    //this.router.navigate(['/detail', obj.id]);
    this.router.navigate([obj.id], {relativeTo: this.route});
    console.log(obj.id);
  }
}
