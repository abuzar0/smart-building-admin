import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PermissionCardComponent } from "../../../../../ui/permission-card/permission-card.component";
import { IPermissionList } from '../../../../../core/interfaces/IUser';

@Component({
  selector: 'app-grid-view-permission',
  standalone: true,
  imports: [PermissionCardComponent],
  templateUrl: './grid-view-permission.component.html',
  styleUrl: './grid-view-permission.component.scss'
})
export class GridViewPermissionComponent {
  @Input() data!: IPermissionList[];
  @Output() handleDelete: EventEmitter<string> = new EventEmitter<string>();
}
