import { Routes } from '@angular/router';
import { ManageComponent } from './components/manage/manage/manage.component';
import { AddComponent } from './components/add/add/add.component';
import { EditEmployeeComponent } from './components/edit/edit-employee/edit-employee.component';

export const routes: Routes = [
{ path: '', component: ManageComponent, pathMatch: 'full' },
  { path: 'manage', component: ManageComponent },
  {path:'add',component:AddComponent},
  {path:'edit',component:EditEmployeeComponent}
];
