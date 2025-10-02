import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { IRouteDictionary, ManageSideBarByPermission } from '../../core/data/DictionaryRoutes';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {


  sideBarList: IRouteDictionary[] = [];
  isSideBarOpen: boolean = true;
  buildingName!: string;
  @Output() SideBarToggle: EventEmitter<boolean> = new EventEmitter(this.isSideBarOpen);

  constructor(
    private router: Router,
    private sanitizer: DomSanitizer,
    private _sidebar: ManageSideBarByPermission
  ) {



    this.sideBarList = this._sidebar.getSideBar()
  }

  toggleSidebar(): void {
    const toggleButton = document.getElementById('toggle-btn')
    const sidebar = document.getElementById('sidebar');
    sidebar?.classList.toggle('close')
    toggleButton?.classList.toggle('rotate');
    this.isSideBarOpen = !this.isSideBarOpen
    this.SideBarToggle.emit(this.isSideBarOpen);
    this.closeAllSubMenus();
    const iconRotate = document.getElementById('button-rotate')
    iconRotate?.classList.remove('rotate');
  }

  toggleSubMenu(event: Event): void {
    event.stopPropagation(); // Prevent event bubbling

    const li = event.currentTarget as HTMLElement;
    const subMenu = li.querySelector(".sub-menu") as HTMLElement | null;

    if (subMenu) {
      const isOpen = subMenu.classList.contains("show");

      // Close all submenus except the clicked one
      this.closeAllSubMenus(li);

      if (!isOpen) {
        subMenu.classList.add("show"); // Open submenu
      } else {
        subMenu.classList.remove("show"); // Close submenu if already open
      }
    }
  }


  closeAllSubMenus(except?: HTMLElement): void {
    const sidebar = document.getElementById('sidebar');
    if (!sidebar) return;

    const elements = sidebar.getElementsByClassName('show');

    Array.from(elements).forEach(ul => {
      const parentLi = ul.closest("li");

      if (ul instanceof HTMLElement && parentLi !== except) {
        ul.classList.remove("show");
      }
    });
  }



  isActive(route: string | undefined): boolean {
    if (!route) return false;
    return this.router?.url.startsWith(route);
  }


  sanitize(svg: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(svg);
  }

  onNavigation(url: string | undefined): void {
    // console.log("url==>",url)
    if (url)
      this.router.navigateByUrl(url)
  }

}
