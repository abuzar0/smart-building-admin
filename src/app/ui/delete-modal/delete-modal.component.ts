import { Component, inject } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';


@Component({
  selector: 'app-delete-modal',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './delete-modal.component.html',
  styleUrl: './delete-modal.component.scss'
})
export class DeleteModalComponent {
  activeModal = inject(NgbActiveModal);

  text!:string;

  handleClick(): void {
    this.activeModal.close('Success')
  }

}
