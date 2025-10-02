import { CommonModule } from '@angular/common';
import { Component, ElementRef, EventEmitter, HostListener, Input, Output, SimpleChanges, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SelectInputFilterPipe } from "../../core/pipes/select-input-filter/select-input-filter.pipe";

@Component({
  selector: 'app-select-search-input',
  standalone: true,
  imports: [CommonModule, FormsModule, SelectInputFilterPipe],
  templateUrl: './select-search-input.component.html',
  styleUrl: './select-search-input.component.scss'
})
export class SelectSearchInputComponent {
  @Input() dataSource!: any[];
  @Input() placeholder: string = 'placeholder';
  @Input() label: string = 'Choose option';
  @Input() search: boolean = false;
  @Input() selectedItem!: any;
  @Input() isSubText:boolean=false;
  @Output() onSelectedItem: EventEmitter<any> = new EventEmitter();

  @ViewChild('dropdownMenu', { static: false }) dropdownMenu!: ElementRef;


  isHidden: boolean = false;
  showDropdown: boolean = false;
  openUpward = false;
  selectedValue: string = '';
  searchText!: string;

  constructor(private elementRef: ElementRef,) { }

  isObjectList(): boolean {
    return typeof this.dataSource[0] === 'object';
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['selectedItem']){
      if(this.selectedItem !=''){
        this.OnChange(this.selectedItem);
      }
    }
  }
  OnChange(ev: any): void {
    this.isHidden = true;
    this.showDropdown = false
    if (typeof ev == 'string') {
      this.selectedValue = ev
      this.selectedItem = ev;
    } else if (typeof ev == 'object') {
      this.selectedValue = this.hasTitleProperty(ev) ? ev.title : ev.name;
      this.selectedItem = this.hasTitleProperty(ev) ? ev : ev;
    }

    this.onSelectedItem.emit(ev)
  }


  getStatus(str1:any,str2:any):boolean{
    return JSON.stringify(str1) == JSON.stringify(str2);
  }

  toggleDropdown() {
    this.showDropdown = !this.showDropdown;
    if (this.showDropdown) {
      setTimeout(() => {
        this.adjustDropdownPosition();
      }, 0);
    }
  }

  adjustDropdownPosition() {
    if (!this.dropdownMenu) return;

    const dropdown = this.dropdownMenu.nativeElement;
    const rect = dropdown.getBoundingClientRect();
    const spaceBelow = window.innerHeight - rect.bottom;
    const spaceAbove = rect.top;

    // If there's less space below, open upwards
    this.openUpward = spaceBelow < 200 && spaceAbove > spaceBelow;
  }
  // Check if the given option object has a 'title' property
  hasTitleProperty(option: any): boolean {
    return option.hasOwnProperty('title');
  }

  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent) {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      // Clicked outside the dropdown, close it
      this.showDropdown = false;
    }
  }
}
