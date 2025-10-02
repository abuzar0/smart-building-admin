import { CommonModule } from '@angular/common';
import { Component, ComponentRef, ViewChild, ViewContainerRef } from '@angular/core';
import { UserFormStepOneComponent } from '../components/user-form-step-one/user-form-step-one.component';
import { UserFormStepTwoComponent } from '../components/user-form-step-two/user-form-step-two.component';
import { ActivatedRoute } from '@angular/router';
import { UserViewTypeParams } from '../../../../core/utils/FloorViewParams';
import { UserService } from '../../../../core/services/user/user.service';
import { STATUS_MESSAGES_ROLE, STATUS_MESSAGES_USER } from '../../../../core/utils/end-point-response';
import { ToastService } from '../../../../core/services/toast/toast.service';
import { LoaderService } from '../../../../core/services/loader/loader.service';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { SelectSearchInputComponent } from '../../../../ui/select-search-input/select-search-input.component';
import { IRoleList } from '../../../../core/interfaces/IUser';
import { RoleService } from '../../../../core/services/role/role.service';
import { IDropdownSettings, NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-user-from',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SelectSearchInputComponent,
    NgMultiSelectDropDownModule,
    TranslateModule
  ],
  templateUrl: './user-from.component.html',
  styleUrl: './user-from.component.scss'
})
export class UserFromComponent {

  viewType!: string;
  State: string = "Create";

  form!: FormGroup;
  roleList: IRoleList[] = [];
  data: any
  isUpdate: boolean = false;
  selectedItems: any[] = [];

  dropdownSettings: IDropdownSettings = {
    singleSelection: true,
    idField: '_id',
    textField: 'name',
  };

  constructor(
    private route: ActivatedRoute,
    private _user: UserService,
    private _toast: ToastService,
    private _fb: FormBuilder,
    private _role: RoleService,
    private _loader: LoaderService,
    private _userParams: UserViewTypeParams,

  ) {
  }


  ngOnInit(): void {

    if (this.route.snapshot.paramMap.get('id')) {
      this._user.getUserById<{ data: any }>(String(this.route.snapshot.paramMap.get('id')))
        .subscribe(res => {
          this.State = 'Update';
          this.isUpdate = true;
          this.data = res?.body?.data[0];
          this.setUpForm();
        })
    }
    this.setUpForm();
    this.getRoleList();

  }


  setUpForm(): void {
    console.log("data", this.data)
    this.form = this._fb.group({
      username: new FormControl(this.data?.username || '', [Validators.required]),
      email: new FormControl(this.data?.email || '', [Validators.required]),
      role: new FormControl(this.data?.role || '', [Validators.required]),
    })


  }




  getRoleList(): void {
    this._role.getRoleMenuList<{ data: IRoleList[] }>()
      .subscribe((res) => {
        this.roleList = res.body?.data ?? [];
      }, (err) => {
        const content = STATUS_MESSAGES_ROLE[err.status];
        this._toast.show(content.type, content);
      })
  }

  ngOnDestroy() {

  }

  selectedItem(ev: any): void {
    // console.log("ev",ev)
    this.form.get('role')?.setValue(ev)
  }

  handleCancel(): void {
    this._userParams.navigateToUserMainRoute('/cob/user');
  }

  handleClickEvent(): void {
    this._loader.showLoader();

    console.log(this.form.value)

    if (this.State == 'Create' && this.form.valid) {
      console.log(this.form.value)
      this._user.createUser(this.form.value)
        .subscribe((res) => {
          const content = STATUS_MESSAGES_USER[res.status];
          this._toast.show(content.type, content);
          this._loader.hideLoader();
          this._userParams.navigateToUserMainRoute('/cob/user');
        }, (err) => {
          this._loader.hideLoader();
          const content = STATUS_MESSAGES_USER[err.status];
          this._toast.show(content.type, content)
        })
    };

    if (this.State == 'Update' && this.form.valid) {

      this._user.updateUser(this.data._id, this.form.value)
        .subscribe((res) => {
          const content = STATUS_MESSAGES_USER[res.status];
          this._toast.show(content.type, content);
          this._loader.hideLoader();
          this._userParams.navigateToUserMainRoute('/cob/user');
        }, (err) => {
          this._loader.hideLoader();
          const content = STATUS_MESSAGES_USER[err.status];
          this._toast.show(content.type, content)
        })
    };

  }

  onItemSelect(item: any) {
    this.selectedItems = [item];
    console.log("selected building", this.selectedItems)
  }
}
