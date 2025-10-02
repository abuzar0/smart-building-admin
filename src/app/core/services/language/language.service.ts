import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  constructor(private translate: TranslateService) {
    const saved = localStorage.getItem('lang') || 'en';
    this.setLanguage(saved as 'en' | 'ar');
  }

  setLanguage(lang: 'en' | 'ar') {
    this.translate.use(lang);
    localStorage.setItem('lang', lang);
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  }

  getCurrentLang(): 'en' | 'ar' {
    return (localStorage.getItem('lang') as 'en' | 'ar') || 'en';
  }
}
