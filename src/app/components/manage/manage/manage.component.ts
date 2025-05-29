import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { EditEmployeeComponent } from '../../edit/edit-employee/edit-employee.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage',
  standalone: true,  
  imports: [CommonModule, FormsModule, HttpClientModule,  EditEmployeeComponent] ,
  templateUrl: './manage.component.html',
  styleUrl: './manage.component.css'
})
export class ManageComponent {
   
 constructor(private router: Router) {}
  private http = inject(HttpClient);

  // employees: any[] = [];
  employees: any[] = [
  {
    id: 1,
    name: 'Ahmed Mohamed',
    email: 'ahmed@example.com',
    address: 'Cairo, Egypt',
    phone: '01012345678'
  },
  {
    id: 2,
    name: 'Sara Ali',
    email: 'sara@example.com',
    address: 'Giza, Egypt',
    phone: '01098765432'
  },
  {
    id: 3,
    name: 'Youssef Hassan',
    email: 'youssef@example.com',
    address: 'Alexandria, Egypt',
    phone: '01111222333'
  }
];
  selectedEmployees: Set<number> = new Set();
  searchTerm = '';

  showEditForm = false;
  selectedEmployee: any = null;

  ngOnInit() {
   // this.getEmployees();
  }
  addEmployee() {
  this.router.navigate(['/add']);
}


  getEmployees() {
    this.http.get<any[]>(`api/employees?search=${this.searchTerm}`).subscribe(data => {
      this.employees = data;
    });
  }

  toggleSelection(id: number) {
    if (this.selectedEmployees.has(id)) {
      this.selectedEmployees.delete(id);
    } else {
      this.selectedEmployees.add(id);
    }
  }

  toggleAllSelections() {
    if (this.selectedEmployees.size === this.employees.length) {
      this.selectedEmployees.clear();
    } else {
      this.employees.forEach(emp => this.selectedEmployees.add(emp.id));
    }
  }

deleteSelected() {
  if (this.selectedEmployees.size === 0) return;

  Swal.fire({
    title: 'Are you sure to delete selected employees?',
    text: 'This action cannot be undone.',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: '🗑️ Delete',
    cancelButtonText: 'Cancel'
  }).then((result) => {
    if (result.isConfirmed) {
     
      this.employees = this.employees.filter(emp => !this.selectedEmployees.has(emp.id));

      Swal.fire(
        'Deleted!',
        'Selected employees have been deleted.',
        'success'
      );

      this.selectedEmployees.clear();
    }
  });
}

loyee() {
  this.router.navigate(['/add']);
}
  deleteEmployee(id: number) {
    if (confirm("Delete this employee?")) {
      this.http.delete(`api/employees/${id}`).subscribe(() => this.getEmployees());
    }
  }

openEditForm(emp: any) {
  this.selectedEmployee = emp;
  this.showEditForm = true;
}


  closeEditForm() {
    this.selectedEmployee = null;
    this.showEditForm = false;
  }

  onEditSuccess() {
    this.closeEditForm();
    this.getEmployees();
  }

  trackById(index: number, item: any) {
    return item.id;
  }
}