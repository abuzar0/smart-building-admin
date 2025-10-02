import { DatePipe } from '@angular/common';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { IPermission, IRoleList, IUserData } from '../../core/interfaces/IUser';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DeleteModalComponent } from '../delete-modal/delete-modal.component';
import { UserService } from '../../core/services/user/user.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-role-card',
  standalone: true,
  imports: [DatePipe,TranslateModule],
  templateUrl: './role-card.component.html',
  styleUrl: './role-card.component.scss'
})
export class RoleCardComponent {


  private modalService = inject(NgbModal);

  userInfo!: IUserData

  @Input() item!: IRoleList
  @Output() handleEditEvent: EventEmitter<IRoleList> = new EventEmitter<IRoleList>();
  @Output() handleDeleteEvent: EventEmitter<string> = new EventEmitter<string>();


  constructor(
    private _user: UserService,
    private translate: TranslateService
  ) {
    this._user.getUserInfo()
      .subscribe((res) => {
        if (res) {
          this.userInfo = res;
        }
      })
  }

  handleEdit(event: Event, data: any): void {
    event.stopPropagation();
    this.handleEditEvent.emit(data)
  }

  handleDelete(event: Event, data: IRoleList): void {
    event.stopPropagation();
    const modalRef = this.modalService.open(DeleteModalComponent);
    modalRef.componentInstance.text = this.translate.instant('modal.role_modal.text');
    modalRef.result.then((res) => {
      console.log("caaa===", res)
      if (res == 'Success') {
        this.handleDeleteEvent.emit(data._id);
      }
    })

  }

  getPermission(type: string, actionType: keyof IPermission['actions']): boolean {
    if (this.userInfo.role == 'super_owner') {
      return true;
    } else {
      return this.userInfo.permission.find((item) => item.name === type)?.actions[actionType] || false;
    }
  }
}
