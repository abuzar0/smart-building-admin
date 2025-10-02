import { Component, inject } from '@angular/core';
import { DashboardHeaderComponent } from "../../../../ui/dashboard-header/dashboard-header.component";
import { RoleViewTypeParams } from '../../../../core/utils/FloorViewParams';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RoleService } from '../../../../core/services/role/role.service';
import { GridViewRoleComponent } from "../components/grid-view-role/grid-view-role.component";
import { STATUS_MESSAGES_PERMISSION, STATUS_MESSAGES_ROLE } from '../../../../core/utils/end-point-response';
import { ToastService } from '../../../../core/services/toast/toast.service';
import { IPermissionList, IRoleList, IUserData } from '../../../../core/interfaces/IUser';
import { ListViewRoleComponent } from '../components/list-view-role/list-view-role.component';
import { PermissionFormComponent } from '../components/permission-form/permission-form.component';
import { PermissionService } from '../../../../core/services/permission/permission.service';
import { GridViewPermissionComponent } from "../components/grid-view-permission/grid-view-permission.component";
import { ListViewPermissionComponent } from "../components/list-view-permission/list-view-permission.component";
import { UserService } from '../../../../core/services/user/user.service';
import { Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-main-role',
  standalone: true,
  imports: [
    DashboardHeaderComponent,
    GridViewRoleComponent,
    ListViewRoleComponent,
    GridViewPermissionComponent,
    ListViewPermissionComponent,
    TranslateModule
  ],
  templateUrl: './main-role.component.html',
  styleUrl: './main-role.component.scss'
})
export class MainRoleComponent {

  private modalService = inject(NgbModal);

  viewType!: string;
  activeTab: string = 'Role';

  userInfo!: IUserData;

  roles!: IRoleList[]
  permission!: IPermissionList[]

  constructor(
    private _roleParams: RoleViewTypeParams,
    private _role: RoleService,
    private _permission: PermissionService,
    private _toast: ToastService,
    private _user: UserService,
    private _router: Router
  ) {
    this._roleParams.getRoleViewTypeParams().subscribe((res) => {
      this.viewType = res
    });

    this._user.getUserInfo()
      .subscribe((res) => {
        if (res) {

          this.userInfo = res;
          console.log("user", this.userInfo)
        }
      })
  }

  ngOnInit(): void {
    this.getRoleList();
    if (this.userInfo.role == 'super_owner') {
      this.getPermissionList();
    }

  }


  handleTab(args: string): void {
    this.activeTab = args;
  }

  handleCreateEvent(): void {
    if (this.activeTab == 'Role') {
      this._router.navigate(['/building/role/create'])
    } else if (this.activeTab == 'Permission') {
      const modalRef = this.modalService.open(PermissionFormComponent);
      modalRef.result.then((res) => {
        if (res == 'Success') {
          this.getPermissionList();
        }
      })
    }
  }

  getRoleList(): void {
    this._role.getRoleList<{ data: IRoleList[] }>()
      .subscribe((res) => {
        this.roles = res.body?.data ?? [];
      }, (err) => {
        const content = STATUS_MESSAGES_ROLE[err.status];
        this._toast.show(content.type, content);
      })
  }

  getPermissionList(): void {
    this._permission.getPermissionList<{ data: IPermissionList[] }>()
      .subscribe((res) => {
        this.permission = res.body?.data ?? [];
      }, (err) => {
        const content = STATUS_MESSAGES_PERMISSION[err.status];
        this._toast.show(content.type, content);
      })
  }

  toggleView(event: string): void {
    this._roleParams.setRoleViewTypeParams(event);
  }

  handleEdit(event: IRoleList): void {
    this._router.navigate([`/building/role/${event._id}`])
  }

  handleDelete(event: string): void {
    switch (this.activeTab) {
      case 'Role':
        this._role.deleteRole(event)
          .subscribe((res) => {
            this.getRoleList();
            const content = STATUS_MESSAGES_ROLE[res.status];
            this._toast.show(content.type, content);
          }, (err) => {
            const content = STATUS_MESSAGES_ROLE[err.status];
            this._toast.show(content.type, content);
          })
        break;
      case 'Permission':
        this._permission.deletePermission(event)
          .subscribe((res) => {
            this.getPermissionList();
            const content = STATUS_MESSAGES_PERMISSION[res.status];
            this._toast.show(content.type, content);
          }, (err) => {
            const content = STATUS_MESSAGES_PERMISSION[err.status];
            this._toast.show(content.type, content);
          })
        break;
    }
  }

  getPermission(tabActive: string): boolean {


    if (this.userInfo.role == 'super_owner') {
      return true;
    } else if (tabActive == 'Role') {
      return this.userInfo.permission.find((item) => item.name === 'Role Management')?.actions.create || false;
    }
    return false;
  }
}
