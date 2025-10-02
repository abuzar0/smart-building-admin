import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, ValidatorFn } from '@angular/forms';
import { PermissionService } from '../../../../../core/services/permission/permission.service';
import { IPermissionList } from '../../../../../core/interfaces/IUser';

@Component({
  selector: 'app-user-form-step-two',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './user-form-step-two.component.html',
  styleUrl: './user-form-step-two.component.scss'
})
export class UserFormStepTwoComponent {

  userForm!: FormGroup;

  features: Partial<IPermissionList>[] = [];
  @Input() isUpdate: boolean = false;
  @Input() data: any;
  @Output() handleClickNext: EventEmitter<any> = new EventEmitter<any>();


  constructor(
    private fb: FormBuilder,
    private _permission: PermissionService
  ) { }


  ngOnInit(): void {

    this.getPermission();

  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data'] && this.data) {
      this.mergeFeaturesWithData();
    }
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

    // console.log("data reciw===>>",this.data)
    const updatedFeatures = this.features.map((feature) => {
      // Find matching feature from the input `data`
      const userFeature = this.data?.features?.find((f: any) => f.name == feature.name);

      return {
        ...feature,
        actions: {
          read: userFeature?.actions?.read || false,
          create: userFeature?.actions?.create || false,
          edit: userFeature?.actions?.edit || false,
          delete: userFeature?.actions?.delete || false,
          control: userFeature?.actions?.control || false,
          assignee:userFeature?.actions?.assignee || false,
          restore:userFeature?.actions?.restore || false
        },
      };
    });

    console.log("update===>", updatedFeatures)
    this.setupForm(updatedFeatures); // Setup form with updated data
  }


  setupForm(updatedFeatures: any) {
    this.userForm = this.fb.group({
      features: this.fb.array(updatedFeatures.map((feature: any) => this.createFeatureGroup(feature)))
    });
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
    return this.userForm.get('features') as FormArray;
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



  handleClick(): void {

    const filteredFeatures = this.featuresArray.value.filter((feature: any) => {
      const actions = feature.actions;
      return actions.read || actions.create || actions.edit || actions.delete;
    });

    if (this.isUpdate) {
      // console.log("data",this.data);
      const result = this.segregatePermissions(this.data.features, filteredFeatures);
      // console.log("result ",result);
      this.handleClickNext.emit({ move: 'submit', data: result });
    } else {
      const formData = {
        // ...this.userForm.value,
        permission: filteredFeatures, // Remove unselected features
      };

      // if (this.form.valid) {
      // console.log(formData)
      this.handleClickNext.emit({ move: 'submit', data: formData });
    }


    // }

  }

  handleBack(): void {
    this.handleClickNext.emit({ move: 'back' });
  }

}
