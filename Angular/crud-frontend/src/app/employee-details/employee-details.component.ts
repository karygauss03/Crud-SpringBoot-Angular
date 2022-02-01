import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Employee } from '../model/employee';
import { EmployeeService } from '../services/employee.service';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css']
})
export class EmployeeDetailsComponent implements OnInit {
  employee : Employee;
  id : number;
  constructor(private route : ActivatedRoute, private employeeService : EmployeeService) { }

  ngOnInit(): void {
    //To get the id from the route, we use ActivatedRoute
    this.id = this.route.snapshot.params['id'];
    this.employee = new Employee();
    this.employeeService.getEmployeeById(this.id).subscribe(
      (data) => {
        this.employee = data;
      },
      (error) => console.log(error)
    );
  }

}
