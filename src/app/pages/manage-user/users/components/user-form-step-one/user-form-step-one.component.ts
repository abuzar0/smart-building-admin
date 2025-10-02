import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { SelectSearchInputComponent } from "../../../../../ui/select-search-input/select-search-input.component";
import { IRoleList } from '../../../../../core/interfaces/IUser';
import { RoleService } from '../../../../../core/services/role/role.service';
import { STATUS_MESSAGES_ROLE } from '../../../../../core/utils/end-point-response';
import { ToastService } from '../../../../../core/services/toast/toast.service';

@Component({
  selector: 'app-user-form-step-one',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, SelectSearchInputComponent],
  templateUrl: './user-form-step-one.component.html',
  styleUrl: './user-form-step-one.component.scss'
})
export class UserFormStepOneComponent {


  form!: FormGroup;
  roleList:IRoleList[]=[]
  

  @Input() isUpdate: boolean = false;
  @Input() data: any;
  @Output() handleClickNext: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    private _fb: FormBuilder,
    private _role:RoleService,
    private _toast:ToastService
  ) { }


  ngOnInit(): void {
    this.getRoleList();
    this.setUpForm();
  }

  setUpForm(): void {
    this.form = this._fb.group({
      username: new FormControl(this.data?.username || '', [Validators.required]),
      email: new FormControl(this.data?.email || '', [Validators.required]),
      role: new FormControl(this.data?.role || '', [Validators.required])
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

  handleClickEvent(): void {
    this.handleClickNext.emit({ move: 'next', data: this.form.value });
  }
  handleCancel(): void {
    this.handleClickNext.emit({ move: 'cancel' });
  }


    selectedItem(ev: any): void {
      // console.log("ev",ev)
      this.form.get('role')?.setValue(ev)
    }
}
