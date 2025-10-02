import { Component, inject, OnDestroy, TemplateRef, ViewChild } from '@angular/core';
import { ToastService } from '../../core/services/toast/toast.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.scss'
})
export class ToastComponent implements OnDestroy {
  toastService = inject(ToastService);
  @ViewChild('toast') toast!: TemplateRef<any>;


  ngOnInit() {
  }
  ngAfterViewInit() {
    // Store the templates in the service but don't show them yet
    this.toastService.registerTemplates({
      toast: this.toast,
    });
  }


  getWaveColor(type: string): string {
    switch (type) {
      case 'success': return '#28a745'; // Green
      case 'error': return '#dc3545'; // Red
      case 'warning': return '#ffc107'; // Yellow
      default: return '#007bff'; // Default Blue
    }
  }
  ngOnDestroy(): void {
    this.toastService.clear();
  }
}
