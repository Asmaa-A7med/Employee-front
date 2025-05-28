import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ManageComponent } from './components/manage/manage/manage.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,ManageComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Emloyee-Front';
}
