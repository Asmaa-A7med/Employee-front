import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { EmployeeService } from '../../../service/employee.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-add',
  imports: [CommonModule, FormsModule,ReactiveFormsModule],
  templateUrl: './add.component.html',
  styleUrl: './add.component.css'
})
export class AddComponent implements OnInit {
  employeeForm!: FormGroup;

  constructor(private fb: FormBuilder, private service: EmployeeService, private router: Router) {}

  ngOnInit(): void {
    this.employeeForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email, Validators.pattern(/.+\.com$/)]],
      address: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern(/^\d{11}$/)]],
    });
  }

  get f() {
    return this.employeeForm.controls;
  }

  onSubmit() {
    if (this.employeeForm.valid) {
      this.service.addEmployee(this.employeeForm.value).subscribe(() => {
        alert('Employee added successfully!');
        this.router.navigate(['/manage']);
      });
    }
  }

  onCancel() {
    this.router.navigate(['/manage']);
  }
}