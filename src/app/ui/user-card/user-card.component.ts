import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IPermission, IPermissionList, IUserData, IUserList } from '../../core/interfaces/IUser';
import { DeleteModalComponent } from '../delete-modal/delete-modal.component';
import { CommonModule } from '@angular/common';
import { UserViewTypeParams } from '../../core/utils/FloorViewParams';
import { ActivateModalComponent } from '../activate-modal/activate-modal.component';
import { AssigneeModalComponent } from '../assignee-modal/assignee-modal.component';
import { UserService } from '../../core/services/user/user.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-user-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.scss'
})
export class UserCardComponent {
  private modalService = inject(NgbModal);
  userInfo!: IUserData

  userAssigneeListId: string[] = [];


  @Input() user!: IUserList;
  @Output() handleDeleteEvent: EventEmitter<string> = new EventEmitter<string>();
  @Output() handleActivateEvent: EventEmitter<string> = new EventEmitter<string>();
  @Output() handleAssigneeEvent: EventEmitter<string> = new EventEmitter<string>();
  @Output() handleEditEvent: EventEmitter<string> = new EventEmitter<string>();


  permissionList: { key: keyof IPermissionList['actions']; label: string }[] = [
    { key: 'create', label: 'Create' },
    { key: 'read', label: 'Read' },
    { key: 'edit', label: 'Update' },
    { key: 'delete', label: 'Delete' },
    { key: 'control', label: 'Control' }
  ];


  constructor(
    private _user: UserService,
    private translate: TranslateService
  ) {

    this._user.getAssigneeUsers()
      .subscribe(res => {
        this.userAssigneeListId = res;
      })

    this._user.getUserInfo()
      .subscribe((res) => {
        if (res) {
          this.userInfo = res;
        }
      })
  }

  


  handleActivate(event: Event, data: IUserList): void {
    event.stopPropagation();
    const modalRef = this.modalService.open(ActivateModalComponent);
    modalRef.componentInstance.text = this.translate.instant('modal.activate.text');
    modalRef.result.then((res) => {
      if (res == 'Success') {
        this.handleActivateEvent.emit(data._id);
      }
    })

  }

  handleAssignee(event: Event, data: IUserList): void {
    event.stopPropagation();
    const modalRef = this.modalService.open(AssigneeModalComponent);
    modalRef.componentInstance.text = this.translate.instant('modal.assigne.text');
    modalRef.result.then((res) => {
      if (res == 'Success') {
        this.handleAssigneeEvent.emit(data._id);
      }
    })

  }
  handleDelete(event: Event, data: IUserList): void {
    event.stopPropagation();
    const modalRef = this.modalService.open(DeleteModalComponent);
    modalRef.componentInstance.text = this.translate.instant('modal.delete.text');;
    modalRef.result.then((res) => {
      if (res == 'Success') {
        this.handleDeleteEvent.emit(data._id);
      }
    })

  }

  handleEdit(event: Event, data: IUserList): void {
    event.stopPropagation();
    this.handleEditEvent.emit(data._id)
  }

  getPermission(type: string, actionType: keyof IPermission['actions']): boolean {
    if (this.userInfo.role == 'super_owner') {
      return true;
    } else {
      return this.userInfo.permission.find((item) => item.name === type)?.actions[actionType] || false;
    }
  }
}
