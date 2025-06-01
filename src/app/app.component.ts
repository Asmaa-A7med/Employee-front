import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ManageComponent } from './components/manage/manage/manage.component';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,ManageComponent,TranslateModule],
  templateUrl: './app.component.html',
    standalone: true,
  styleUrl: './app.component.css'
})
export class AppComponent {
  //title = 'Emloyee-Front';
   title = 'translation-demo';
}
