import { CommonModule } from '@angular/common';
import { Component, ElementRef, EventEmitter, Input, Output, QueryList, SimpleChanges, ViewChild, ViewChildren } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { ReplaceUnderscorePipe } from "../../core/pipes/replace-underscore/replace-underscore.pipe";
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-filter-bar',
  standalone: true,
  imports: [CommonModule, FormsModule, NgbDropdownModule, ReplaceUnderscorePipe, NgMultiSelectDropDownModule, TranslateModule],
  templateUrl: './filter-bar.component.html',
  styleUrl: './filter-bar.component.scss'
})
export class FilterBarComponent {

  activeTab: number = 0;

  @Input() tabs: any[] = [];
  @Input() classTypeTabs:string='';
  @Input() classTypeSearch:string='';
  @Input() classGapRow:string='';
  @Input() searchTerm: string = '';
  @Input() isSearchEnable: boolean = true;
  @Output() TabFilter: EventEmitter<{ _id: string, type: string }> = new EventEmitter<{ _id: string, type: string }>();
  @Output() search_Event: EventEmitter<string> = new EventEmitter<string>();
  @ViewChild('tabContainer') tabContainerRef!: ElementRef<HTMLElement>;
  @ViewChildren('tabItem') tabItemRefs!: QueryList<ElementRef<HTMLElement>>;

  constructor(private translate: TranslateService) { }

  ngOnInit(): void {
    this.translate.onLangChange.subscribe(() => {
      setTimeout(() => {
        this.setActiveTab(this.activeTab);
      }, 1500);
    });

  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['tabs']) {
      setTimeout(() => {
        this.setActiveTab(this.activeTab);
      }, 1000);
    }

  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.setActiveTab(this.activeTab);
    }, 1500);

    this.tabContainerRef?.nativeElement?.addEventListener('wheel', (evt: WheelEvent) => {
      evt.preventDefault();
      this.tabContainerRef.nativeElement.scrollLeft += evt.deltaY;
    });
  }


  setActiveTab(index: number): void {
    this.activeTab = index;

    const tabItems = this.tabItemRefs.toArray();
    const tabContainer = this.tabContainerRef?.nativeElement;

    if (tabItems[index] && tabContainer) {
      const activeTab = tabItems[index].nativeElement;

      const tabOffset = activeTab.offsetLeft;
      const tabWidth = activeTab.offsetWidth;

      tabContainer.style.setProperty('--tab-offset', `${tabOffset}px`);
      tabContainer.style.setProperty('--tab-width', `${tabWidth}px`);
      activeTab.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
    }

    this.TabFilter.emit(this.tabs[index]);
  }
  searchEvent(event: Event): void {
    event.stopPropagation();
    this.search_Event.emit(this.searchTerm);
  }

  cancelSearch(): void {
    this.searchTerm = '';
    this.search_Event.emit(this.searchTerm);

  }

  onSearchTermChange(event: string): void {
    this.search_Event.emit(event);
  }

}
