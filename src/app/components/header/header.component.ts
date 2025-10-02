import { Component } from '@angular/core';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { ThemeService } from '../../core/services/theme/theme.service';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../core/services/auth/auth.service';
import { Router, RouterLink } from '@angular/router';
import { STATUS_MESSAGES_LOGIN } from '../../core/utils/end-point-response';
import { ToastService } from '../../core/services/toast/toast.service';
import { UserService } from '../../core/services/user/user.service';
import { IUserData, IUserList } from '../../core/interfaces/IUser';
import { INotificationList, SocketEventType } from '../../core/interfaces/INotification';
import { NotificationService } from '../../core/services/notification/notification.service';
import { SocketService } from '../../core/services/socket/socket.service';
import { Subscription } from 'rxjs';
import { LanguageService } from '../../core/services/language/language.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NgbDropdownModule, FormsModule, RouterLink, TranslateModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  dir: 'ltr' | 'rtl' = 'ltr';
  selectedLang: string = 'en';


  mode!: boolean;
  userId!: string
  userInfo!: IUserData;
  notificationList: INotificationList[] = []
  private messageSub: Subscription[] = [];
  socketEvents: SocketEventType[] = ['Device Action', 'Device Threshold'];
  currentPage:number=1;
  totalpages:number=1;
  limit:number=10

  constructor(
    private _theme: ThemeService,
    private _auth: AuthService,
    private _toast: ToastService,
    private _user: UserService,
    private router: Router,
    private _notification: NotificationService,
    private _socket: SocketService,
    private langService: LanguageService,
    private translate: TranslateService
  ) {
    if (localStorage.getItem('theme') == 'dark') this.mode = true;
    else this.mode = false;

    this._user.getUserInfo()
      .subscribe((res) => {
        if (res) {
          this.userId = res?._id
          this.userInfo = res;
        }
      })

  }

  ngOnInit(): void {
    this.getNotificationList();

    this._socket.connect();

    this.messageSub = this.socketEvents.map((event) =>
      this._socket.on<any>(event).subscribe((msg) => {
        // console.log(`Received ${event}:`, msg);
        const {action} = msg;
        switch (event) {
          case 'Device Action':
            if (action == 'ON') {
              this._toast.show('info', { title: this.translate.instant('Device_Action.title'), text: this.translate.instant('Device_Action.message_on') })
            }else{
               this._toast.show('info', { title: this.translate.instant('Device_Action.title'), text: this.translate.instant('Device_Action.message_off') })
            }
        }
        // handle message

      })
    );

    this.translate.onLangChange.subscribe((res) => {
      this.selectedLang = res.lang
      this.dir = res.lang === 'ar' ? 'rtl' : 'ltr';
    })



  }

  switchLang(lang: 'en' | 'ar') {
    this.langService.setLanguage(lang);
  }

  toggleTheme(event: Event) {
    event.stopPropagation();
    this._theme.toggleTheme();
  }

  logout(event: Event): void {
    event.stopPropagation();
    this._auth.logout({})
      .subscribe((res) => {
        const content = STATUS_MESSAGES_LOGIN[res.status]
        this._toast.show(content.type, content);
        localStorage.removeItem('assignee_User');
        localStorage.removeItem('selectedBuilding');
        localStorage.removeItem('user_info');
        this.router.navigate(['/'])
      }, (err) => {
        const content = STATUS_MESSAGES_LOGIN[err.status]
        this._toast.show(content.type, content);
      })
  }

  handleProfile(): void {
    this.router.navigate(['/cob/profile-setting'])
  }

  getFirstTwoCharacters(name: string): string {
    if (!name) return '';

    // Check if the name contains a space
    if (!name.includes(' ')) {
      // If there is no space, capitalize the entire word and take the first two characters
      return name.substring(0, 2).toUpperCase();
    }

    // Split the name into words
    const words = name.split(' ');

    // Initialize an empty string to store the result
    let result = '';

    // Iterate over the words
    for (let i = 0; i < words.length && i < 2; i++) {
      // Append the first character of each word to the result
      result += words[i].charAt(0);
    }

    return result.toUpperCase();
  }

  getNotificationList(): void {
    this._notification.getNotificationList<{ data: INotificationList[] }>(this.currentPage,this.limit)
      .subscribe((res) => {
        this.notificationList = res.body?.data ?? []
        // console.log("response ", res)
      }, (err) => {
        console.log("notification err", err)
      })
  }

  handleDetailsNotification(event: Event, data: INotificationList): void {

    event.stopPropagation();

    if (data.is_read) {
      this.router.navigate([`/cob/notification/${data._id}`]);
    } else {
      this._notification.updateNotificationStatus(data._id)
        .subscribe((res) => {
          this.router.navigate([`/cob/notification/${data._id}`]);
        }, (err) => {
          console.log("err", err)
        })
    }


  }

  ngOnDestroy(): void {
    this.messageSub.forEach(sub => sub.unsubscribe());
    this._socket.disconnect();
  }
}
