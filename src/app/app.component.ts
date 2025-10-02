import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoaderService } from './core/services/loader/loader.service';
import { ToastContainerComponent } from "./components/toast-container/toast-container.component";
import { ToastComponent } from './components/toast/toast.component';
import { LoaderComponent } from "./components/loader/loader.component";
import { SwUpdate } from '@angular/service-worker';
import { ToastService } from './core/services/toast/toast.service';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ToastContainerComponent, ToastComponent, LoaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'OmniLoop';

  isLoading = false;
  constructor(
    private loaderService: LoaderService,
    private updates: SwUpdate,
    private _toast: ToastService
  ) {
    this.listenForUpdates();
    this.monitorConnection();
  }

  listenForUpdates() {
    if (this.updates.isEnabled) {
      this.updates.versionUpdates.subscribe(event => {
        if (event.type === 'VERSION_READY') {
          this._toast.show(
            'info',
            {
              title: 'Information',
              text: 'A new version is available.'
            }
          );
          this.updates.activateUpdate().then(() => document.location.reload());
        }
      });
    }
  }
  monitorConnection() {
    window.addEventListener('offline', () => {
      this._toast.show(
        'info',
        {
          title: 'Notify',
          text: 'You are offline. Viewing cached data.'
        }
      );
    });

    window.addEventListener('online', () => {
      this._toast.show(
        'info',
        {
          title: 'Notify',
          text: 'You’re back online!'
        }
      );
      location.reload();
    });
  }
  ngOnInit() {
    this.loaderService.loaderState$.subscribe(state => {
      this.isLoading = state;
    });
  }
}
