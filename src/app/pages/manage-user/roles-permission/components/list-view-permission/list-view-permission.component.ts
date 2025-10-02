import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IPermissionList } from '../../../../../core/interfaces/IUser';
import { DeleteModalComponent } from '../../../../../ui/delete-modal/delete-modal.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-list-view-permission',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './list-view-permission.component.html',
  styleUrl: './list-view-permission.component.scss'
})
export class ListViewPermissionComponent {

  private modalService = inject(NgbModal);
  @Input() data!: IPermissionList[];
  @Output() handleDeleteEvent: EventEmitter<string> = new EventEmitter<string>();


  permissionList: { key: keyof IPermissionList['actions']; label: string }[] = [
    { key: 'create', label: 'Create' },
    { key: 'read', label: 'Read' },
    { key: 'edit', label: 'Update' },
    { key: 'delete', label: 'Delete' },
    { key: 'control', label: 'Control' }
  ]

  handleDelete(event: Event, data: IPermissionList): void {
      event.stopPropagation();
      const modalRef = this.modalService.open(DeleteModalComponent);
      modalRef.componentInstance.text = `Once deleted, this action cannot be undone. By deleting this permission, you’ll permanently
                      remove it, along with all associated settings, users permission and data.`;
      modalRef.result.then((res) => {
        if (res == 'Success') {
          this.handleDeleteEvent.emit(data._id);
        }
      })
  
    }
}
