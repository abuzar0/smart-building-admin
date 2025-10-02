import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IUserList } from '../../../../../core/interfaces/IUser';
import { UserCardComponent } from "../../../../../ui/user-card/user-card.component";

@Component({
  selector: 'app-grid-view-user',
  standalone: true,
  imports: [UserCardComponent],
  templateUrl: './grid-view-user.component.html',
  styleUrl: './grid-view-user.component.scss'
})
export class GridViewUserComponent {

  @Input() data!:IUserList[];
  @Output() deleteEvent:EventEmitter<string>=new EventEmitter<string>();
  @Output() activateEvent:EventEmitter<string>=new EventEmitter<string>();
  @Output() assigneeEvent:EventEmitter<string>=new EventEmitter<string>();
  @Output() handleEditEvent:EventEmitter<string>=new EventEmitter<string>();
  
}
