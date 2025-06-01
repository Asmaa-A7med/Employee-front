import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { EmployeeService } from '../../../service/employee.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-edit-employee',
  imports: [ReactiveFormsModule ,CommonModule,TranslateModule  ],
  templateUrl: './edit-employee.component.html',
  styleUrl: './edit-employee.component.css'
})
export class EditEmployeeComponent  implements OnInit, OnChanges  {
   @Input() employeeData: any;
  @Output() cancel = new EventEmitter<void>();
  @Output() success = new EventEmitter<void>();

  employeeForm!: FormGroup;

  constructor(private fb: FormBuilder, private service: EmployeeService,private router:Router ,private translate: TranslateService) {
      
    this.translate.addLangs(['de', 'en']);
    this.translate.setDefaultLang('en');
    this.translate.use('en');
  }

  ngOnInit(): void {
    if (this.employeeData) {
      this.initForm();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['employeeData'] && changes['employeeData'].currentValue) {
      this.initForm();
    }
  }

  initForm() {
    this.employeeForm = this.fb.group({
      name: [this.employeeData.name || '', Validators.required],
      email: [
        this.employeeData.email || '',
        [Validators.required, Validators.email, Validators.pattern(/.+\.com$/)]
      ],
      address: [this.employeeData.address || '', Validators.required],
      phone: [
        this.employeeData.phone || '',
        [Validators.required, Validators.pattern(/^\d{11}$/)]
      ]
    });
  }

  get f() {
    return this.employeeForm.controls;
  }

 onSubmit() {
  if (this.employeeForm.invalid) {
    return;
  }

  const updatedEmployee = this.employeeForm.value;

this.service.updateEmployee(this.employeeData.id, updatedEmployee).subscribe({
  next: () => {
    Swal.fire({
      icon: 'success',
      title: 'Updated!',
      text: 'Employee data has been updated.',
      timer: 1500,
      showConfirmButton: false
    }).then(() => {
      this.success.emit();  
    });
  },
  error: (err) => {
    console.error('Update failed:', err);
    Swal.fire('Error!', 'Failed to update employee.', 'error');
  }
});

  
}

onCancel() {
  this.router.navigate(['/manage']);
}

}
