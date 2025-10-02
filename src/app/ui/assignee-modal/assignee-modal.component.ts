import { Component, inject } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-assignee-modal',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './assignee-modal.component.html',
  styleUrl: './assignee-modal.component.scss'
})
export class AssigneeModalComponent {
  activeModal = inject(NgbActiveModal);

  text!: string;

  handleClick(): void {
    this.activeModal.close('Success')
  }
}
