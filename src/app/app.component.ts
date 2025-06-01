import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ManageComponent } from './components/manage/manage/manage.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,ManageComponent,TranslateModule],
  templateUrl: './app.component.html',
    standalone: true,
  styleUrl: './app.component.css'
})
export class AppComponent {
  //title = 'Emloyee-Front';
   title = 'project';

  constructor(private translate: TranslateService) {
    this.translate.addLangs(['ar', 'en']);
    this.translate.setDefaultLang('en');
    this.translate.use('en');
    this.setDirection('en'); 
  }

  switchLanguage(lang: string) {
    this.translate.use(lang);
    this.setDirection(lang); 
  }

  setDirection(lang: string) {
    debugger
    const dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.dir = dir;
    document.documentElement.lang = lang;
    document.body.classList.remove('rtl', 'ltr');
    document.body.classList.add(dir);
  }
}