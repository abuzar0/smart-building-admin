import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../../components/header/header.component';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { ThemeService } from '../../core/services/theme/theme.service';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-main-layout',
  standalone: true,
 imports: [HeaderComponent, SidebarComponent, RouterOutlet, TranslateModule],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss'
})
export class MainLayoutComponent {

  isSideBarOpen: boolean = true;
  constructor(private themeService:ThemeService ) {}

  sidebarToggle(toggleStatus: boolean): void {
    this.isSideBarOpen = toggleStatus;
  }
}
