import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { EmployeeService } from '../../../service/employee.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { environment } from '../../../environment/environment';
import Swal from 'sweetalert2';

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
    console.log('Sending data to:', `${environment.apiUrl}/employees`);
    console.log('Payload:', this.employeeForm.value);
    this.service.addEmployee(this.employeeForm.value).subscribe({
      next: () => {
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Employee added successfully!',
          confirmButtonText: 'OK',
        }).then(() => {
          this.router.navigate(['/manage']);
        });
      },
      error: err => {
        console.error('Error adding employee:', err);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Failed to add employee. Please try again later.',
        });
      }
    });
  }
}


  onCancel() {
    this.router.navigate(['/manage']);
  }
}