import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { IPermissionList, IUserList } from '../../../../../core/interfaces/IUser';
import { CommonModule } from '@angular/common';
import { DeleteModalComponent } from '../../../../../ui/delete-modal/delete-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivateModalComponent } from '../../../../../ui/activate-modal/activate-modal.component';
import { AssigneeModalComponent } from '../../../../../ui/assignee-modal/assignee-modal.component';
import { UserService } from '../../../../../core/services/user/user.service';

@Component({
  selector: 'app-list-view-user',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './list-view-user.component.html',
  styleUrl: './list-view-user.component.scss'
})
export class ListViewUserComponent {


  private modalService = inject(NgbModal);
  userAssigneeListId:string[]=[];


  @Input() userList!: IUserList[];
  @Output() handleDeleteEvent: EventEmitter<string> = new EventEmitter<string>();
  @Output() handleActivateEvent: EventEmitter<string> = new EventEmitter<string>();
  @Output() handleEditEvent: EventEmitter<string> = new EventEmitter<string>();
  @Output() assigneeEvent:EventEmitter<string>=new EventEmitter<string>();


  permissionList: { key: keyof IPermissionList['actions']; label: string }[] = [
    { key: 'create', label: 'Create' },
    { key: 'read', label: 'Read' },
    { key: 'edit', label: 'Update' },
    { key: 'delete', label: 'Delete' },
    { key: 'control', label: 'Control' },
    { key: 'assignee', label: 'Assignee' }
  ];

  
  constructor(private _user:UserService){
    this._user.getAssigneeUsers()
    .subscribe(res=>{
      this.userAssigneeListId = res;
    })
  }

  isPermissionGranted(user: any, permissionKey: string): boolean {
    return user.permission.some((p: any) => p.name === permissionKey && Object.values(p.actions).some(Boolean));
  }

  getUserPermissions(user: any): any[] {
    return user?.role?.permission?.map((p: any) => ({
      name: p.name, // Permission name (e.g., "Building Management")
      actions: Object.keys(p.actions).filter(action => p.actions[action]) // Filter only allowed actions
    }));
  }


  handleActivate(event: Event, data: IUserList): void {
    event.stopPropagation();
    const modalRef = this.modalService.open(ActivateModalComponent);
    modalRef.componentInstance.text = `This user account is currently inactive. By activating this user, 
       their access will be restored, and they will regain all associated settings and permissions.`;
    modalRef.result.then((res) => {
      if (res == 'Success') {
        this.handleActivateEvent.emit(data._id);
      }
    })

  }

  handleAssignee(event: Event, data: IUserList): void {
      event.stopPropagation();
      const modalRef = this.modalService.open(AssigneeModalComponent);
      modalRef.componentInstance.text = `By adding this user to the building, they will gain access to the premises and any
       associated facilities based on their assigned permissions and roles.`;
      modalRef.result.then((res) => {
        if (res == 'Success') {
          this.assigneeEvent.emit(data._id);
        }
      })
  
    }

  
  handleDelete(event: Event, data: IUserList): void {
    event.stopPropagation();
    const modalRef = this.modalService.open(DeleteModalComponent);
    modalRef.componentInstance.text = `Deactivating this user cannot be undone immediately.
   By deactivating this user, their access will be restricted, and all associated settings and permissions will be disabled.`;
    modalRef.result.then((res) => {
      if (res == 'Success') {
        this.handleDeleteEvent.emit(data._id);
      }
    })

  }

  handleEdit(event: Event, data: IUserList):void{
    event.stopPropagation();

    this.handleEditEvent.emit(data._id)
  }

}
