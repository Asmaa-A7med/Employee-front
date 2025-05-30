import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService { 

   constructor(private http: HttpClient) {}

  getAll(search = ''): Observable<any[]> {
    const url = search
      ? `${environment.apiUrl}/employees/search?term=${search}`
      : `${environment.apiUrl}/employees`;
    return this.http.get<any[]>(url);
  }
getAllEmployees(): Observable<any[]> {
  return this.http.get<any[]>(`${environment.apiUrl}/employees/all`);
}

delete(id: number): Observable<any> {
  return this.http.delete(`${environment.apiUrl}/employees/delete/${id}`);
}


deleteMultiple(ids: number[]): Observable<any> {
  return this.http.delete(`${environment.apiUrl}/employees/delete-multiple`, {
    body: ids
  });
}


addEmployee(data: any): Observable<any> {
  return this.http.post(`${environment.apiUrl}/employees/add`, data);
}


  updateEmployee(id: number, data: any): Observable<any> {
  return this.http.put(`${environment.apiUrl}/employees/update/${id}`, data);
}

getPaginatedEmployees(pageNumber: number, pageSize: number): Observable<any> {
  const url = `${environment.apiUrl}/employees/paginated?pageNumber=${pageNumber}&pageSize=${pageSize}`;
  return this.http.get<any>(url);
}

}
