import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private apiUrl = environment.apiUrl + '/employees';

  constructor(private http: HttpClient) {}

  getAll(search = ''): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}?search=${search}`);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  deleteMultiple(ids: number[]): Observable<any> {
    return this.http.post(`${this.apiUrl}/delete-multiple`, ids);
  }
addEmployee(data: any) {
  return this.http.post('api/employees', data);  
}
updateEmployee(id: number, data: any) {
  return this.http.put(`${this.apiUrl}/${id}`, data);
}

}
