import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  constructor() {
    this.loadTheme();
  }

  toggleTheme(): void {
    console.log("call")
    const isDarkMode = document.documentElement.getAttribute("data-bs-theme");
    if (isDarkMode == 'dark') {
      document.documentElement.setAttribute("data-bs-theme", "light");
      localStorage.setItem('theme', 'light');

    } else {
      localStorage.setItem('theme', 'dark');
      document.documentElement.setAttribute("data-bs-theme", "dark");
    }
  }

  loadTheme(): void {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      document.documentElement.setAttribute("data-bs-theme", "dark");
    } else {
      document.documentElement.setAttribute("data-bs-theme", "light");
    }
  }
}
