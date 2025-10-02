import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-dashboard-header',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './dashboard-header.component.html',
  styleUrl: './dashboard-header.component.scss'
})
export class DashboardHeaderComponent {

  @Input() title!:string;
  @Input() description!:string;
  @Input() viewType!: string;
  @Input() btnText!:string;
  @Input() btnAssociateText!:string;
  @Input() isShowCreateBtn:boolean=false;
  @Input() isShowAssociateBtn:boolean=false;
  @Input() isShowViewButton:boolean=true;
  @Output() toggleView: EventEmitter<string> = new EventEmitter();
  @Output() handleCreateBtn: EventEmitter<void> = new EventEmitter();
  @Output() handleAssociateBtn: EventEmitter<void> = new EventEmitter();

  constructor(private router: Router, private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.handleView(this.viewType);
  }

  handleView(type: string): void {
    this.viewType = type;
    this.toggleView.emit(type);
  }

  handleCreateFloorRouter(): void {
    this.handleCreateBtn.emit()
  }

  sanitize(svg: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(svg);
  }
}
