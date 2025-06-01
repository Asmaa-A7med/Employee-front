import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {

   defaultLang = 'en';

  constructor(private translate: TranslateService) {
    const savedLang = localStorage.getItem('lang') || 'en';
    this.setLanguage(savedLang);
    this.setDirection(savedLang);  
   }
   
   setLanguage(lang: string) {
    this.translate.use(lang);
    localStorage.setItem('lang', lang);
       this.setDirection(lang); 
  }

  getCurrentLanguage(): string {
    return this.translate.currentLang || 'en';
  }
  public setDirection(lang: string) {
    
    const dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.dir = dir;
    document.documentElement.lang = lang;
    document.body.classList.remove('rtl', 'ltr');
    document.body.classList.add(dir);
  }
}