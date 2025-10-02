import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { IRoleList } from '../../../../../core/interfaces/IUser';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DeleteModalComponent } from '../../../../../ui/delete-modal/delete-modal.component';
import { DatePipe } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-list-view-role',
  standalone: true,
  imports: [DatePipe,TranslateModule],
  templateUrl: './list-view-role.component.html',
  styleUrl: './list-view-role.component.scss'
})
export class ListViewRoleComponent {



  private modalService = inject(NgbModal);


  @Input() data!: IRoleList[]
  @Output() handleEditEvent: EventEmitter<IRoleList> = new EventEmitter<IRoleList>();
  @Output() handleDeleteEvent: EventEmitter<string> = new EventEmitter<string>();



  handleEdit(event: Event, data: any): void {
    event.stopPropagation();
    this.handleEditEvent.emit(data)
  }

  handleDelete(event: Event, data: IRoleList): void {
    event.stopPropagation();
    const modalRef = this.modalService.open(DeleteModalComponent);
    modalRef.componentInstance.text = `Once deleted, this action cannot be undone. By deleting this role, you’ll permanently
                    remove it, along with all associated settings, users and data.`;
    modalRef.result.then((res) => {
      if (res == 'Success') {
        this.handleDeleteEvent.emit(data._id);
      }
    })
  }

}
