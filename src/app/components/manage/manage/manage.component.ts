import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { EditEmployeeComponent } from '../../edit/edit-employee/edit-employee.component';
import Swal from 'sweetalert2';
import { EmployeeService } from '../../../service/employee.service';

@Component({
  selector: 'app-manage',
  standalone: true,  
  imports: [CommonModule, FormsModule, HttpClientModule,  EditEmployeeComponent] ,
  templateUrl: './manage.component.html',
  styleUrl: './manage.component.css'
})
export class ManageComponent implements OnInit {

  constructor(private router: Router, private employeeService: EmployeeService) {}

  employees: any[] = [];
  selectedEmployees: Set<number> = new Set();
  searchTerm = '';

  showEditForm = false;
  selectedEmployee: any = null;

  currentPage = 1;
pageSize = 10;
totalCount = 0;

sortKey: string = '';
sortDirection: 'asc' | 'desc' = 'asc';

ngOnInit() {
  this.getEmployees();
}


  addEmployee() {
    this.router.navigate(['/add']);
  }
   


getEmployees() {
  if (!this.searchTerm.trim()) {
    this.employeeService.getPaginatedEmployees(this.currentPage, this.pageSize).subscribe((response) => {
      this.employees = response.data;  
      this.totalCount = response.totalCount;  
       this.applySort();
    });
  } else {
    this.employeeService.getAll(this.searchTerm).subscribe(data => {
      this.employees = data;
      this.totalCount = data.length;
       this.applySort();
    });
  }
}
 sortBy(key: string) {
  if (this.sortKey === key) {
    this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
  } else {
    this.sortKey = key;
    this.sortDirection = 'asc';
  }
  this.applySort();
}

applySort() {
  if (this.sortKey) {
    this.sortEmployees(this.sortKey);
  }
}

sortEmployees(key: string) {
  this.employees.sort((a, b) => {
    let aValue = a[key];
    let bValue = b[key];
 
    if (typeof aValue === 'string') {
      aValue = aValue.toLowerCase();
      bValue = bValue.toLowerCase();
    }

    if (aValue < bValue) return this.sortDirection === 'asc' ? -1 : 1;
    if (aValue > bValue) return this.sortDirection === 'asc' ? 1 : -1;
    return 0;
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
      const ids = Array.from(this.selectedEmployees);

      this.employeeService.deleteMultiple(ids).subscribe({
        next: () => {
          Swal.fire('Deleted!', 'Selected employees have been deleted.', 'success');
          this.selectedEmployees.clear();
          this.getEmployees();
        },
        error: () => {
          Swal.fire('Error', 'Failed to delete selected employees.', 'error');
        }
      });
    }
  });
}

  deleteEmployee(id: number) {
  Swal.fire({
    title: 'Are you sure?',
    text: 'Do you really want to delete this employee?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: '🗑️ Delete',
    cancelButtonText: 'Cancel'
  }).then((result) => {
    if (result.isConfirmed) {
      this.employeeService.delete(id).subscribe({
        next: () => {
          Swal.fire('Deleted!', 'Employee has been deleted.', 'success');
          this.getEmployees();
        },
        error: () => {
          Swal.fire('Error', 'Failed to delete employee.', 'error');
        }
      });
    }
  });
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

  get totalPages(): number {
  return Math.ceil(this.totalCount / this.pageSize);
}

changePage(page: number) {
  this.currentPage = page;
  this.getEmployees();
}

}