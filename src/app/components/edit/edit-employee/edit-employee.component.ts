import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { EmployeeService } from '../../../service/employee.service';

@Component({
  selector: 'app-edit-employee',
  imports: [ReactiveFormsModule ],
  templateUrl: './edit-employee.component.html',
  styleUrl: './edit-employee.component.css'
})
export class EditEmployeeComponent  implements OnInit {
  @Input() employeeData: any;
  @Output() cancel = new EventEmitter<void>();
  @Output() success = new EventEmitter<void>();

  employeeForm!: FormGroup;

  constructor(private fb: FormBuilder, private service: EmployeeService) {}

  ngOnInit(): void {
    this.employeeForm = this.fb.group({
      name: [this.employeeData?.name || '', Validators.required],
      email: [this.employeeData?.email || '', [Validators.required, Validators.email, Validators.pattern(/.+\.com$/)]],
      address: [this.employeeData?.address || '', Validators.required],
      phone: [this.employeeData?.phone || '', [Validators.required, Validators.pattern(/^\d{11}$/)]],
    });
  }

  onSubmit() {
    if (this.employeeForm.valid) {
      this.service.updateEmployee(this.employeeData.id, this.employeeForm.value).subscribe(() => {
        alert('Employee updated successfully!');
        this.success.emit();
      });
    }
  }

  onCancel() {
    this.cancel.emit();
  }
}
