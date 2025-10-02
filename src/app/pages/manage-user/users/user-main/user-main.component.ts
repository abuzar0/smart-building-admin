import { Component } from '@angular/core';
import { DashboardHeaderComponent } from "../../../../ui/dashboard-header/dashboard-header.component";
import { UserViewTypeParams } from '../../../../core/utils/FloorViewParams';
import { UserService } from '../../../../core/services/user/user.service';
import { CardSkeletonComponent } from "../../../../ui/card-skeleton/card-skeleton.component";
import { ListSkeletonComponent } from "../../../../ui/list-skeleton/list-skeleton.component";
import { EmptyStatePlaceholderComponent } from "../../../../ui/empty-state-placeholder/empty-state-placeholder.component";
import { IPermission, IRole, IRoleList, IUserData, IUserList } from '../../../../core/interfaces/IUser';
import { GridViewUserComponent } from "../components/grid-view-user/grid-view-user.component";
import { ListViewUserComponent } from "../components/list-view-user/list-view-user.component";
import { STATUS_MESSAGES_USER } from '../../../../core/utils/end-point-response';
import { ToastService } from '../../../../core/services/toast/toast.service';
import { FilterBarComponent } from "../../../../ui/filter-bar/filter-bar.component";
import { RoleService } from '../../../../core/services/role/role.service';
import { LoaderService } from '../../../../core/services/loader/loader.service';
import { FilterUserTypePipe } from "../../../../core/pipes/filter-user-type/filter-user-type.pipe";
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { SearchPipe } from "../../../../core/pipes/search/search.pipe";
import { NotFoundPlaceholderComponent } from "../../../../ui/not-found-placeholder/not-found-placeholder.component";

@Component({
  selector: 'app-user-main',
  standalone: true,
  imports: [
    DashboardHeaderComponent,
    CardSkeletonComponent,
    ListSkeletonComponent,
    EmptyStatePlaceholderComponent,
    GridViewUserComponent,
    ListViewUserComponent,
    FilterBarComponent,
    FilterUserTypePipe,
    TranslateModule,
    SearchPipe,
    NotFoundPlaceholderComponent
],
  templateUrl: './user-main.component.html',
  styleUrl: './user-main.component.scss'
})
export class UserMainComponent {

  viewType!: string;
  isLoading!: boolean;
  userList!: IUserList[];
  roleList!: IRole[]
  selectedType!: string;
  userInfo!: IUserData;
  searchTrem!: string;

  constructor(
    private _userParams: UserViewTypeParams,
    private _user: UserService,
    private _toast: ToastService,
    private _role: RoleService,
    private loaderService: LoaderService,
    private translate: TranslateService
  ) {

    this._user.getUserInfo()
      .subscribe((res) => {
        if (res) {
          this.userInfo = res;
        }
      })
  }

  ngOnInit(): void {
    this._userParams.getUserViewTypeParams()
      .subscribe((res) => {
        this.viewType = res;
      })

    this.getUserList();
    this.getRoleList();

    this.translate.onLangChange.subscribe(() => {
      this.roleList = this.roleList?.filter((item => item._id != 'All'));
      this.roleList?.unshift({ _id: 'All', type: this.translate.instant('scheduler.filterbar.all') })
    });
  }

  getRoleList(): void {
    this._role.getRoleList<{ data: IRole[] }>()
      .subscribe((res) => {
        this.roleList = res.body?.data ?? [];
        this.roleList = this.roleList.map((item) => ({
          _id: item.type,
          type: item.type
        }
        ))
        this.roleList.unshift({ _id: 'All', type: this.translate.instant('scheduler.filterbar.all') })
      }, (err) => {

      })
  }


  getUserList(): void {
    this.isLoading = true;
    this._user.getUserList<{ data: IUserList[] }>()
      .subscribe((res) => {
        // console.log("res", res.body?.data);
        this.userList = res.body?.data ?? [];
        this.isLoading = false;
      }, (err) => {
        this.isLoading = false;
      })
  }
  toggleView(event: string): void {
    this._userParams.setUserViewTypeParams(event);
  }
  handleCreateEvent(): void {
    this._userParams.navigateToUserCreateRoute('/cob/user/new')
  }

  deActivateUser(event: string): void {
    this.loaderService.showLoader();
    this._user.deActiveUserAccount(event, { reason: "Your Account DeActive Form Your Admin" })
      .subscribe((res) => {
        const content = STATUS_MESSAGES_USER[res.status];
        this._toast.show(content.type, content);
        this.getUserList();
        this.loaderService.hideLoader();
      }, (err) => {
        const content = STATUS_MESSAGES_USER[err.status];
        this._toast.show(content.type, content);
        this.loaderService.hideLoader();
      })
  }

  ActivateUser(event: string): void {
    this.loaderService.showLoader();
    this._user.ActiveUserAccount(event, { reason: "Your Account have been Active Form Your Admin" })
      .subscribe((res) => {
        const content = STATUS_MESSAGES_USER[res.status];
        this._toast.show(content.type, content);
        this.getUserList();
        this.loaderService.hideLoader();
      }, (err) => {
        const content = STATUS_MESSAGES_USER[err.status];
        this._toast.show(content.type, content);
        this.loaderService.hideLoader();
      })
  }


  editUser(event: string) {
    this._userParams.navigateToUserUpdateRoute(`/building/user/${event}`);
  }

  getPermission(type: string, actionType: keyof IPermission['actions']): boolean {
    if (this.userInfo.role == 'super_owner') {
      return true;
    } else {
      return this.userInfo.permission.find((item) => item.name === type)?.actions[actionType] || false;
    }
  }

  handleTabEvent(event: { _id: string, type: string }): void {
    this.selectedType = event._id;
  }

   handleSearch(event:string){
    this.searchTrem=event
  }
}
