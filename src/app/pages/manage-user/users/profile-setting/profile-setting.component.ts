import { Component } from '@angular/core';
import { UserService } from '../../../../core/services/user/user.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IUserData, IUserList } from '../../../../core/interfaces/IUser';
import { Location } from '@angular/common';
import { LoaderService } from '../../../../core/services/loader/loader.service';
import { ToastService } from '../../../../core/services/toast/toast.service';
import { STATUS_MESSAGES_USER } from '../../../../core/utils/end-point-response';
import { AuthService } from '../../../../core/services/auth/auth.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-profile-setting',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, TranslateModule],
  templateUrl: './profile-setting.component.html',
  styleUrl: './profile-setting.component.scss'
})
export class ProfileSettingComponent {




  userForm!: FormGroup;
  userImage: string | null = null; // Store uploaded image
  fileError: string = ''; // Store error message
  userId!: string;
  userInfo!: IUserData
  passwordForm!: FormGroup;
  isSubmitted = false;


  constructor(
    private _user: UserService,
    private fb: FormBuilder,
    public location: Location,
    private _loader: LoaderService,
    private _toast: ToastService,
    private _auth: AuthService,
    private translate: TranslateService
  ) {

    this._user.getUserInfo()
      .subscribe((res) => {
        if (res) {
          this.userId = res?._id

        }
      })

    this.passwordForm = this.fb.group({
      currentPassword: ['', [Validators.required, Validators.minLength(6)]],
      newPassword: ['', [Validators.required, Validators.minLength(8)]],
      confirmNewPassword: ['', [Validators.required]]
    }, { validator: this.passwordMatchValidator });
  }


  ngOnInit() {


    this._user.getUserInfo()
      .subscribe((res) => {
        if (res) {
          this.userInfo = res;
          this.userForm = this.fb.group({
            username: [this.userInfo.username, [
              Validators.required,
              Validators.maxLength(50),
              Validators.pattern(/^[a-zA-Z\s]+$/)
            ]], // Default username
            email: [{ value: this.userInfo.email, disabled: true }], // Email is disabled
            avatar: [this.userInfo.avatar]
          });

          this.userImage = 'data:image/png;base64,' + this.userInfo.avatar;
          // Initialize form with default values


          // Mark form as pristine initially
          this.userForm.markAsPristine();
        }
      }, (err) => {
        console.log("err", err)
      })

  }

  passwordMatchValidator(form: FormGroup) {
    const newPassword = form.get('newPassword')?.value;
    const confirmNewPassword = form.get('confirmNewPassword')?.value;
    return newPassword == confirmNewPassword ? null : { mismatch: true };
  }


  discardChanges() {
    // Reset form to initial values
    this.userForm.reset({
      username: this.userInfo.username,
      email: this.userInfo.email,
      avatar: this.userInfo.avatar
    });

    // Reset user image
    this.userImage = 'data:image/png;base64,' + this.userInfo.avatar;

    // Mark the form as pristine (no changes)
    this.userForm.markAsPristine();
  }

  handleUpdate() {
    // console.log("Updated Data:", this.userForm.getRawValue());
    if (this.userForm.valid) {

      this._loader.showLoader();
      const formData = new FormData();
      formData.append('username', this.userForm.get('username')?.value);
      if (this.userImage && this.userForm.get('avatar')?.value instanceof File) {
        formData.append('file', this.userForm.get('avatar')?.value); // Store the new avatar
      }

      this._user.updateUserProfile(this.userId, formData)
        .subscribe((res) => {
          const data = res.body as any;
          this.userInfo = { ...this.userInfo, ...data.data }
          this._user.setUserInfo(this.userInfo)
          this._loader.hideLoader();
          const content = STATUS_MESSAGES_USER[res.status];
          this._toast.show(content.type, content);
        }, (err) => {
          const content = STATUS_MESSAGES_USER[err.status];
          this._toast.show(content.type, content);
          this._loader.hideLoader();
        })
    }

    // Mark form as pristine after update
    this.userForm.markAsPristine();
  }



  onFileSelected(event: any) {
    const file = event.target.files[0];

    // console.log("file", file)

    if (!file) return;

    // Validate file type (PNG/JPEG)
    const allowedTypes = ['image/png', 'image/jpeg'];
    if (!allowedTypes.includes(file.type)) {
      this.translate.onLangChange.subscribe(() => {
        this.translate.get('file_image.invalidType').subscribe((res: string) => {
          this.fileError = res;
        });
      });
      this.translate.get('file_image.invalidType').subscribe((res: string) => {
        this.fileError = res;
      });
      return;
    }

    // Validate file size (< 5MB)
    if (file.size > 5 * 1024 * 1024) {
      this.translate.onLangChange.subscribe(() => {
        this.translate.get('file_image.sizeExceeded').subscribe((res: string) => {
          this.fileError = res;
        });
      })
      this.translate.get('file_image.sizeExceeded').subscribe((res: string) => {
        this.fileError = res;
      });
      return;
    }

    this.fileError = ''; // Reset errors

    // Read file and convert to base64
    const reader = new FileReader();
    reader.onload = () => {
      this.userImage = reader.result as string;
      // console.log("image previe", this.userImage)
    };
    reader.readAsDataURL(file);

    this.userForm.patchValue({ avatar: file });
    this.userInfo.avatar = file;
    this.userForm.markAsDirty();


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


  handlePasswordUpdate() {
    if (this.passwordForm.invalid) return;

    this._loader.showLoader();
    const { currentPassword, newPassword } = this.passwordForm.value;
    this._auth.updatePassword({ old_password: currentPassword, new_password: newPassword })
      .subscribe((res) => {
        this._loader.hideLoader();
        const content = STATUS_MESSAGES_USER[res.status];
        this._toast.show(content.type, content);
      }, (err) => {
        this._loader.hideLoader();
        const content = STATUS_MESSAGES_USER[err.status];
        this._toast.show(content.type, content);
      })
    // Reset the form and disable cancel button after update
    this.passwordForm.markAsPristine();
  }

  handleCancel() {
    this.passwordForm.reset();
    this.passwordForm.markAsPristine();
    this.isSubmitted = false;
  }
}
