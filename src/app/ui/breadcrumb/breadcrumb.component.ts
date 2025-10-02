import { Component, Input, SimpleChanges } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

interface Crumb {
  label: string;
  labelAr?: string;
  route?: string;
}


@Component({
  selector: 'app-breadcrumb',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './breadcrumb.component.html',
  styleUrl: './breadcrumb.component.scss'
})
export class BreadcrumbComponent {


  @Input() crumbs: Crumb[] = [];
  currentLang: string = 'en'; // Could also get from a service

  displayCrumbs: { label: string; route?: string }[] = [];

  constructor(private translate: TranslateService) { }

  ngOnInit(): void {
    this.translate.onLangChange.subscribe((res) => {
      this.currentLang = res.lang.toString();
      this.updateDisplayCrumbs();
    })

    this.currentLang = this.translate.currentLang;
    this.updateDisplayCrumbs();
  }

  updateDisplayCrumbs() {
    const items = this.crumbs.map(crumb => ({
      label: this.currentLang === 'ar' ? (crumb.labelAr || crumb.label) : crumb.label,
      route: crumb.route
    }));

    this.displayCrumbs = this.currentLang === 'ar' ? [...items].reverse() : items;
  }
}
