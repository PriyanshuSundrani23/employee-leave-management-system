package com.cognizant.backend.service;

import com.cognizant.backend.entity.Employee;
import java.util.List;

public interface EmployeeService {

    Employee createEmployee(Employee employee);

    List<Employee> getAllEmployees();

    Employee getEmployeeById(Long id);

    void deleteEmployee(Long id);

}
