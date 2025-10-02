import { Component } from '@angular/core';
import { DatePipe, Location } from '@angular/common';
import { NotificationService } from '../../../core/services/notification/notification.service';
import { ActivatedRoute } from '@angular/router';
import { NOTIFICATION_ICONS, NOTIFICATION_STATUS, STATUS_MESSAGES_NOTIFICATION } from '../../../core/utils/end-point-response';
import { INotificationList } from '../../../core/interfaces/INotification';
import { ListSkeletonComponent } from "../../../ui/list-skeleton/list-skeleton.component";
import { ToastService } from '../../../core/services/toast/toast.service';
import { TranslateModule } from '@ngx-translate/core';
import { TimeUnitPipe } from "../../../core/pipes/timeUnit/time-unit.pipe";
@Component({
  selector: 'app-notification-detail',
  standalone: true,
  imports: [DatePipe, ListSkeletonComponent, TranslateModule, TimeUnitPipe],
  templateUrl: './notification-detail.component.html',
  styleUrl: './notification-detail.component.scss'
})
export class NotificationDetailComponent {


  notifyDetail!: INotificationList;
  isLoading: boolean = false;


  constructor(
    public location: Location,
    private _notification: NotificationService,
    private route: ActivatedRoute,
    private _toast: ToastService
  ) {

  }


  ngOnInit(): void {

    this.getNotificationDetails(String(this.route.snapshot.paramMap.get('id')))
  }

  getNotificationDetails(id: string): void {
    this.isLoading = true;
    this._notification.getNotificationById<{ data: INotificationList }>(id)
      .subscribe((res) => {
        this.notifyDetail = res.body?.data as INotificationList;
        this.isLoading = false;
      }, (err) => {
        const content = STATUS_MESSAGES_NOTIFICATION[err.state]
        this._toast.show(content.type, content);
        this.isLoading = false;
      })
  }

  getNotifyType(type: string): string {
    return NOTIFICATION_STATUS[type] || 'info';
  }

  getTypeIcon(type: string): string {
    return NOTIFICATION_ICONS[type] || "fas fa-bell";
  }
}
