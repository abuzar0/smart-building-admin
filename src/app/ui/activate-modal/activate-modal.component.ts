import { Component, inject } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-activate-modal',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './activate-modal.component.html',
  styleUrl: './activate-modal.component.scss'
})
export class ActivateModalComponent {
 activeModal = inject(NgbActiveModal);

  text!:string;

  handleClick(): void {
    this.activeModal.close('Success')
  }

}
