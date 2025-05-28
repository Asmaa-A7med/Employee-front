import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { EditEmployeeComponent } from '../../edit/edit-employee/edit-employee.component';

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

  employees: any[] = [];
  selectedEmployees: Set<number> = new Set();
  searchTerm = '';

  showEditForm = false;
  selectedEmployee: any = null;

  ngOnInit() {
    this.getEmployees();
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
    if (confirm("Are you sure you want to delete selected employees?")) {
      this.http.post('api/employees/delete-multiple', Array.from(this.selectedEmployees))
        .subscribe(() => {
          this.getEmployees();
          this.selectedEmployees.clear();
        });
    }
  }
addEmployee() {
  this.router.navigate(['/add']);
}
  deleteEmployee(id: number) {
    if (confirm("Delete this employee?")) {
      this.http.delete(`api/employees/${id}`).subscribe(() => this.getEmployees());
    }
  }

  openEditForm() {
   // this.selectedEmployee = null;
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