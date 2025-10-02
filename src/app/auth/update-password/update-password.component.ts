import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth/auth.service';
import { ToastService } from '../../core/services/toast/toast.service';
import { STATUS_MESSAGES_AUTH } from '../../core/utils/end-point-response';
import { Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { LanguageService } from '../../core/services/language/language.service';
import { LoaderService } from '../../core/services/loader/loader.service';

@Component({
  selector: 'app-update-password',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, TranslateModule],
  templateUrl: './update-password.component.html',
  styleUrl: './update-password.component.scss'
})
export class UpdatePasswordComponent {

  form!: FormGroup;
  dir: 'ltr' | 'rtl' = 'ltr';
  showConfrimPassword: boolean = false;
  showupdatePassword: boolean = false;
  shownewPassword: boolean = false;
  selectedLang: 'en' | 'ar' = 'en';

  constructor(
    private _fb: FormBuilder,
    private _auth: AuthService,
    private _toast: ToastService,
    private router: Router,
    private langService: LanguageService,
    private _loader: LoaderService
  ) { }


  ngOnInit(): void {
    this.form = this._fb.group({
      old_password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(24),]],
      new_password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(24),]],
      confirmNewPassword: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(24), this.passwordComplexityValidator]]
    }, { validator: this.passwordMatchValidator });

    this.selectedLang = this.langService.getCurrentLang();
    this.dir = this.langService.getCurrentLang() === 'ar' ? 'rtl' : 'ltr';
  }

  switchLang(lang: 'en' | 'ar') {
    this.langService.setLanguage(lang);
  }
  passwordMatchValidator(form: FormGroup) {
    const newPassword = form.get('new_password')?.value;
    const confirmNewPassword = form.get('confirmNewPassword')?.value;
    return newPassword == confirmNewPassword ? null : { mismatch: true };
  }

  // Custom validator for password complexity
  passwordComplexityValidator(control: FormControl): ValidationErrors | null {
    const value = control.value || '';
    const pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,24}$/;
    if (!pattern.test(value)) {
      return { passwordPattern: true };
    }
    return null;
  }

  handleClick(): void {
    if (this.form.valid) {
      this._loader.showLoader();
      this._auth.updatePassword(this.form.value)
        .subscribe((res) => {
          const content = STATUS_MESSAGES_AUTH[res.status];
          this._toast.show(content.type, content);
          this._loader.hideLoader();

          this.router.navigate(['/main/overview'])
        }, (err) => {
          this._loader.hideLoader();
          const content = STATUS_MESSAGES_AUTH[err.status];
          this._toast.show(content.type, content);

        })
    }
  }

  handleSkipClick(): void {
    this.router.navigate(['/main/overview'])
  }

  toggleConfrimPassword() {
    this.showConfrimPassword = !this.showConfrimPassword;
  }
  toggleUpdatePassword(): void {
    this.showupdatePassword = !this.showupdatePassword;
  }
  toggleNewPassword(): void {
    this.shownewPassword = !this.shownewPassword;
  }
}
