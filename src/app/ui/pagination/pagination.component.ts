import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [NgxPaginationModule],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss'
})
export class PaginationComponent {


  @Output() pageChange: EventEmitter<number> = new EventEmitter();

  @Input() totalItems!: number; // Total number of items
  @Input() itemsPerPage!: number; // Number of items per page
  @Input() firstLastEnable: boolean = true;

  ngOnInit(): void {
    console.log('pagination loaded ...');
  }

  get totalPages(): number {
    return Math.ceil(this.totalItems / this.itemsPerPage);
  }
}
