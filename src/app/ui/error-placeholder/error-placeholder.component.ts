import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-error-placeholder',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './error-placeholder.component.html',
  styleUrl: './error-placeholder.component.scss'
})
export class ErrorPlaceholderComponent {

}
