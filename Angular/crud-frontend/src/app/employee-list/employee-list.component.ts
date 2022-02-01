import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Employee } from '../model/employee';
import { EmployeeService } from '../services/employee.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {

  employees: Employee[];

  constructor(private employeeService : EmployeeService, private route : Router) {

  }

  ngOnInit(): void {
    this.getEmployees();
  }

  private getEmployees(){
    this.employeeService.getEmployeesList().subscribe(data => {
      this.employees = data;
    });
  }

  updateEmployee(id : number){
    this.route.navigate(['update-employee', id]);
  }

  deleteEmployee(id : number){
    this.employeeService.deleteEmployeeById(id).subscribe(data => {
      this.getEmployees();
    }, error => console.log(error));
  }

  employeeDetails(id : number){
    this.route.navigate(['employee-details', id]);
  }


}
