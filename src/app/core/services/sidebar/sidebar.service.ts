import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  isSidebarClosed: boolean = false;

  constructor() {}

  toggleSidebar(): void {
    this.isSidebarClosed = !this.isSidebarClosed;
    this.closeAllSubMenus();
  }

  toggleSubMenu(button: HTMLElement): void {
    const nextElement = button.nextElementSibling as HTMLElement | null;

    if (nextElement && !nextElement.classList.contains('show')) {
      this.closeAllSubMenus();
    }

    if (nextElement) {
      nextElement.classList.toggle('show');
      button.classList.toggle('rotate');
    }

    if (this.isSidebarClosed) {
      this.isSidebarClosed = false;
    }
  }

  closeAllSubMenus(): void {
    document.querySelectorAll('.show').forEach(ul => {
      if (ul instanceof HTMLElement && ul.previousElementSibling instanceof HTMLElement) {
        ul.classList.remove('show');
        ul.previousElementSibling.classList.remove('rotate');
      }
    });
  }
}
