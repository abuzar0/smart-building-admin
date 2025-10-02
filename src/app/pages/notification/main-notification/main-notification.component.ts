import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { NotificationService } from '../../../core/services/notification/notification.service';
import { INotificationList } from '../../../core/interfaces/INotification';
import { TimeAgoPipe } from "../../../core/pipes/time-ago/time-ago.pipe";
import { NOTIFICATION_ICONS, NOTIFICATION_STATUS_CLASS, STATUS_MESSAGES_NOTIFICATION } from '../../../core/utils/end-point-response';
import { ToastService } from '../../../core/services/toast/toast.service';
import { ListSkeletonComponent } from "../../../ui/list-skeleton/list-skeleton.component";
import { Router, RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { PaginationComponent } from "../../../ui/pagination/pagination.component";
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-main-notification',
  standalone: true,
  imports: [TimeAgoPipe, ListSkeletonComponent, TranslateModule, PaginationComponent,NgxPaginationModule],
  templateUrl: './main-notification.component.html',
  styleUrl: './main-notification.component.scss'
})
export class MainNotificationComponent {


  notificationList!: INotificationList[];
  isLoading: boolean = false;
  currentPage:number=1;
  totalpages:number=1;
  limit:number=10

  constructor(
    public location: Location,
    private _toast: ToastService,
    private _notification: NotificationService,
    private router: Router
  ) { }


  ngOnInit(): void {
    this.getNotificationList();
  }


  getNotificationList(): void {
    this.isLoading = true;
    this._notification.getNotificationList<{ data: INotificationList[],totalPages:number,totalRecords:number,currentPage:number }>(this.currentPage,this.limit)
      .subscribe((res) => {
        this.notificationList = res.body?.data ?? [];
        this.isLoading = false;
        this.currentPage=res?.body?.currentPage ?? 1;
        this.totalpages=res?.body?.totalRecords ?? 1;
      }, (err) => {
        const content = STATUS_MESSAGES_NOTIFICATION[err.state]
        this._toast.show(content.type, content);
        this.isLoading = false;
      })
  }

  getTypeIcon(type: string): string {
    return NOTIFICATION_ICONS[type?.toLowerCase()] || "fas fa-bell";
  }

  getNotifyType(type: string): string {
    return NOTIFICATION_STATUS_CLASS[type?.toLowerCase()] || 'bg-info text-info';
  }

  handleDetailsNotification(event: Event, data: INotificationList): void {

    event.stopPropagation();

    if (data.is_read) {
      this.router.navigate([`/main/notification/${data._id}`]);
    } else {
      this._notification.updateNotificationStatus(data._id)
        .subscribe((res) => {
          this.router.navigate([`/main/notification/${data._id}`]);
        }, (err) => {
          console.log("err", err)
        })
    }



  }


   handleChnage(event: number) {
    this.currentPage = event;

    this.getNotificationList();
  }
}
