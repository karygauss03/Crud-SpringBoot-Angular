package com.karygauss.crud.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.karygauss.crud.exception.ResourceNotFoundException;
import com.karygauss.crud.model.Employee;
import com.karygauss.crud.repository.EmployeeRepository;

@RestController
@RequestMapping("/api/v1/")
public class EmployeeController {
	@Autowired
	private EmployeeRepository employeeRepository;
	
	//get All employees

	@CrossOrigin(origins = "http://localhost:4200")
	@GetMapping("/employees")
	public List<Employee> getAllEmployees(){
		return employeeRepository.findAll();
	}
	
	//Create employee Rest Api
	@CrossOrigin(origins = "http://localhost:4200")
	@PostMapping("/employees") //to handle post request
	public Employee createEmployee (@RequestBody Employee employee) {
		return employeeRepository.save(employee);
	}
	
	//Get employee by id Rest Api
	@CrossOrigin(origins = "http://localhost:4200")
	@GetMapping("/employees/{id}")
	public ResponseEntity <Employee> getElementById(@PathVariable Long id) {
		Employee employee = employeeRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Employee not exist with that id : "+id)); 
		return ResponseEntity.ok(employee);
	}
	
	//Update employee rest api
	@CrossOrigin(origins = "http://localhost:4200")
	@PutMapping("/employees/{id}") //Pathvarible is used to map the path with the id && RequestBody to directly map a request json object into a java object
	public ResponseEntity<Employee> updateEmployee(@PathVariable Long id, @RequestBody Employee employeeDetails){
		Employee employee = employeeRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Employee not exist with that id : "+id));
		employee.setFirstName(employeeDetails.getFirstName());
		employee.setLastName(employeeDetails.getLastName());
		employee.setEmailId(employeeDetails.getEmailId());
		Employee updatedEmployee = employeeRepository.save(employee);
		return ResponseEntity.ok(updatedEmployee);
	}
	
	//Delete employee rest api
	@CrossOrigin(origins = "http://localhost:4200")
	@DeleteMapping("/employees/{id}")
	public ResponseEntity<Map<String, Boolean>> deleteEmployee(@PathVariable Long id){
		Employee employee = employeeRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Employee not exist with that id : "+id)); 
		employeeRepository.delete(employee);
		Map<String, Boolean>  response = new HashMap<>();
		response.put("Deleted", Boolean.TRUE);
		return ResponseEntity.ok(response);
	}
	
	
}
