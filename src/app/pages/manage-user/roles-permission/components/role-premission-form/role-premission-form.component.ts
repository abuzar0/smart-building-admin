import { Component } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { IPermissionList } from '../../../../../core/interfaces/IUser';
import { PermissionService } from '../../../../../core/services/permission/permission.service';
import { CommonModule } from '@angular/common';
import { RoleService } from '../../../../../core/services/role/role.service';
import { ToastService } from '../../../../../core/services/toast/toast.service';
import { STATUS_MESSAGES_ROLE } from '../../../../../core/utils/end-point-response';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-role-premission-form',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule, TranslateModule],
  templateUrl: './role-premission-form.component.html',
  styleUrl: './role-premission-form.component.scss'
})
export class RolePremissionFormComponent {


  form!: FormGroup;
  State: string = 'Create'

  features: Partial<IPermissionList>[] = [];
  isUpdate: boolean = false;
  data: any;



  constructor(
    private fb: FormBuilder,
    private _permission: PermissionService,
    private _role: RoleService,
    private _toast: ToastService,
    private _route: ActivatedRoute,
    private router: Router
  ) {

    if (this._route.snapshot.paramMap.get('id')) {
      this._role.getRoleById<{ data: any }>(this._route.snapshot.paramMap.get('id') as string)
        .subscribe((res) => {
          this.data = res.body?.data[0];
          this.isUpdate = true;
          this.State = 'Update'
          this.mergeFeaturesWithData();
        })
    }
  }


  ngOnInit(): void {

    this.getPermission();

  }


  getPermission(): void {
    this._permission.getPermissionMenuList<{ data: Partial<IPermissionList>[] }>()
      .subscribe((res) => {
        this.features = res.body?.data ?? [];
        this.mergeFeaturesWithData(); // Ensure data is merged after fetching
      }, (err) => {
        console.error('Error fetching permissions', err);
      });
  }


  mergeFeaturesWithData(): void {
    if (!this.features.length) return; // Ensure features are available

    const updatedFeatures = this.features.map((feature) => {
      // Find matching feature from the input `data`
      const userFeature = this.data?.permissions?.find((f: any) => f.name == feature.name);

      return {
        ...feature,
        actions: {
          read: userFeature?.actions?.read || false,
          create: userFeature?.actions?.create || false,
          edit: userFeature?.actions?.edit || false,
          delete: userFeature?.actions?.delete || false,
          control: userFeature?.actions?.control || false,
          assignee: userFeature?.actions?.assignee || false,
          restore: userFeature?.actions?.restore || false
        },
      };
    });

    this.setupForm(updatedFeatures); // Setup form with updated data
  }


  setupForm(updatedFeatures: any) {
    this.form = this.fb.group({
      type: new FormControl(this.data?.type || '', [Validators.required]),
      features: this.fb.array(updatedFeatures.map((feature: any) => this.createFeatureGroup(feature)))
    });

    this.form.setValidators(this.buildingManagementRequiredValidator);
  }


  createFeatureGroup(feature: any): FormGroup {
    const group = new FormGroup({
      name: new FormControl(feature?.name),
      actions: new FormGroup({
        read: new FormControl(feature?.actions?.read || false), // Read is required if others are checked
        create: new FormControl(feature?.actions?.create || false),
        edit: new FormControl(feature?.actions?.edit || false),
        delete: new FormControl(feature?.actions?.delete || false),
        control: new FormControl(feature?.actions?.control || false),
        assignee: new FormControl(feature?.actions?.assignee || false),
        restore: new FormControl(feature?.actions?.restore || false)
      }, { validators: this.readRequiredIfOtherChecked })
    });

    return group;
  }

  buildingManagementRequiredValidator = (form: AbstractControl): ValidationErrors | null => {
    const features = (form.get('features') as FormArray).controls;

    const isBuildingManagementChecked = features.some(ctrl => {
      return ctrl.get('name')?.value === 'building management' &&
        Object.values((ctrl.get('actions') as FormGroup).value).some(v => v === true);
    });

    const isAnyOtherFeatureChecked = features.some(ctrl => {
      return ctrl.get('name')?.value !== 'building management' &&
        Object.values((ctrl.get('actions') as FormGroup).value).some(v => v === true);
    });

    if (!isBuildingManagementChecked && isAnyOtherFeatureChecked) {
      return { buildingManagementRequired: true };
    }

    return null;
  };


  // ✅ Custom Validator: "read" must be checked if any other action is selected
  readRequiredIfOtherChecked: ValidatorFn = (controlAbs: AbstractControl): ValidationErrors | null => {
    if (!(controlAbs instanceof FormGroup)) return null; // Ensure it's a FormGroup

    const read = controlAbs.get('read')?.value;
    const create = controlAbs.get('create')?.value;
    const edit = controlAbs.get('edit')?.value;
    const del = controlAbs.get('delete')?.value;
    const control = controlAbs.get('control')?.value;
    const assignee = controlAbs.get('assignee')?.value;
    const restore = controlAbs.get('restore')?.value;

    if (!read && (create || edit || del || control || assignee || restore)) {
      return { readRequired: true }; // ❌ Invalid
    }

    return null; // ✅ Valid
  };


  get featuresArray(): FormArray {
    return this.form.get('features') as FormArray;
  }

  getFormControl(featureIndex: number, action: string): FormControl {
    return this.featuresArray.at(featureIndex).get(`actions.${action}`) as FormControl;
  }


  segregatePermissions(previousPermissions: any, updatedPermissions: any) {
    const previousMap: any = new Map(previousPermissions.map((item: any) => [item.name, item]));
    const updatedMap = new Map(updatedPermissions.map((item: any) => [item.name, item]));

    const result: any = { previous: [], newPermission: [], deleted: [] };

    updatedPermissions.forEach((item: any) => {
      if (previousMap.has(item.name)) {
        result.previous.push({
          _id: previousMap.get(item.name)._id,
          name: item.name,
          actions: item.actions
        });
      } else {
        result.newPermission.push(item);
      }
    });

    previousPermissions.forEach((item: any) => {
      if (!updatedMap.has(item.name)) {
        result.deleted.push(item);
      }
    });

    return result;
  }



  handleClickEvent(): void {

    const filteredFeatures = this.featuresArray.value.filter((feature: any) => {
      const actions = feature.actions;
      return actions.read || actions.create || actions.edit || actions.delete;
    });

    if (this.isUpdate) {
      const result = this.segregatePermissions(this.data.permissions, filteredFeatures);

      const { type } = this.form.value;
      // console.log("result ", result);
      this._role.updateRole(this.data._id, { type: type, ...result })
        .subscribe((res) => {
          const content = STATUS_MESSAGES_ROLE[res.status];
          this._toast.show(content.type, content);
          this.router.navigate(['/building/role'])
        }, (err) => {
          const content = STATUS_MESSAGES_ROLE[err.status];
          this._toast.show(content.type, content)
        })
    } else {
      const { type } = this.form.value
      const formData = {
        type: type,
        permission: filteredFeatures, // Remove unselected features
      };

      // if (this.form.valid) {
      console.log(formData)
      this._role.createRole(formData)
        .subscribe((res) => {
          const content = STATUS_MESSAGES_ROLE[res.status];
          this._toast.show(content.type, content);
          this.router.navigate(['/building/role'])
        }, (err) => {
          const content = STATUS_MESSAGES_ROLE[err.status];
          this._toast.show(content.type, content)
        })
    }


    // }

  }

  handleCancel(): void {
    this.router.navigate(['/building/role'])
  }

  toggleAllActions(featureIndex: number, event: Event) {
    const checked = (event.target as HTMLInputElement).checked;
    const featureGroup = this.featuresArray.at(featureIndex);

    const actionsGroup = featureGroup.get('actions');
    if (actionsGroup) {
      ['create', 'read', 'edit', 'delete', 'control', 'assignee', 'restore'].forEach(action => {
        const control = actionsGroup.get(action);
        if (control) {
          control.setValue(checked);
        }
      });
    }
  }


  isAllActionsChecked(featureIndex: number): boolean {
    const actions = ['create', 'read', 'edit', 'delete', 'control', 'assignee', 'restore'];
    return actions.every(action => this.getFormControl(featureIndex, action)?.value === true);
  }
}
