import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastService } from '../../../../../core/services/toast/toast.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { PermissionService } from '../../../../../core/services/permission/permission.service';
import { STATUS_MESSAGES_PERMISSION } from '../../../../../core/utils/end-point-response';

@Component({
  selector: 'app-permission-form',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './permission-form.component.html',
  styleUrl: './permission-form.component.scss'
})
export class PermissionFormComponent {


  activeModal = inject(NgbActiveModal);
  // data!: IRoleList;
  form!: FormGroup;
  constructor(
    private _fb: FormBuilder,
    private _toast: ToastService,
    private _permission:PermissionService
  ) { }

  ngOnInit(): void {
    this.setUpForm();
  }

  setUpForm(): void {
    this.form = this._fb.group({
      name: new FormControl('', [Validators.required]),
      actions: this._fb.group({
        create: new FormControl(true),
        read: new FormControl({ value: true, disabled: true }), // Always enabled
        edit: new FormControl(true),
        delete: new FormControl(true),
        control: new FormControl(true), // Basic control option
      })
    });
  }

  handleClick(): void {
    console.log(this.form.getRawValue());
    this._permission.createPermission(this.form.getRawValue())
    .subscribe((res)=>{
      const content = STATUS_MESSAGES_PERMISSION[res.status];
      this._toast.show(content.type,content);
      this.activeModal.close('Success')
    },(err)=>{
      const content = STATUS_MESSAGES_PERMISSION[err.status];
      this._toast.show(content.type,content);
    })
  }
}
