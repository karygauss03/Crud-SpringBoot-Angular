import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from '../model/employee';
import { EmployeeService } from '../services/employee.service';

@Component({
  selector: 'app-update-employee',
  templateUrl: './update-employee.component.html',
  styleUrls: ['./update-employee.component.css'],
})
export class UpdateEmployeeComponent implements OnInit {
  employee: Employee = new Employee();
  id: number;
  constructor(
    private employeeService: EmployeeService,
    private router: ActivatedRoute,
    private route: Router
  ) {}

  ngOnInit(): void {
    //To get the id from the route, we use ActivatedRoute
    this.id = this.router.snapshot.params['id'];
    this.employeeService.getEmployeeById(this.id).subscribe(
      (data) => {
        this.employee = data;
      },
      (error) => console.log(error)
    );
  }

  goToEmployeeList() {
    this.route.navigate(['/employees']);
  }

  onSubmit() {
    this.employeeService.updateEmployeeById(this.id, this.employee).subscribe(
      (data) => {
        this.goToEmployeeList();
      },
      (error) => console.log(error)
    );
  }
}
