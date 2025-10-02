import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RoleCardComponent } from "../../../../../ui/role-card/role-card.component";
import { IRoleList } from '../../../../../core/interfaces/IUser';

@Component({
  selector: 'app-grid-view-role',
  standalone: true,
  imports: [RoleCardComponent],
  templateUrl: './grid-view-role.component.html',
  styleUrl: './grid-view-role.component.scss'
})
export class GridViewRoleComponent {

  @Input() data!:IRoleList[]
  @Output() handleEdit:EventEmitter<IRoleList>=new EventEmitter<IRoleList>();
  @Output() handleDelete:EventEmitter<string>=new EventEmitter<string>();
}
