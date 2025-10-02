import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth/auth.service';
import { ToastService } from '../../core/services/toast/toast.service';
import { ActivatedRoute, Router } from '@angular/router';
import { STATUS_MESSAGES_AUTH } from '../../core/utils/end-point-response';
import { TranslateModule } from '@ngx-translate/core';
import { LanguageService } from '../../core/services/language/language.service';
import { LoaderService } from '../../core/services/loader/loader.service';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, TranslateModule],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss'
})
export class ResetPasswordComponent {

  form!: FormGroup;
  token!: string;
  dir: 'ltr' | 'rtl' = 'ltr';
  selectedLang: 'en' | 'ar' = 'en';
  showPassword: boolean = false;
  showConfrimPassword: boolean = false;

  constructor(
    private _fb: FormBuilder,
    private _auth: AuthService,
    private _toast: ToastService,
    private route: ActivatedRoute,
    private router: Router,
    private langService: LanguageService,
    private _loader: LoaderService
  ) {
    this.route.queryParams.subscribe(params => {
      this.token = params['token'];
      console.log('Token:', this.token);
    });

    this.selectedLang = this.langService.getCurrentLang();
    this.dir = this.langService.getCurrentLang() === 'ar' ? 'rtl' : 'ltr';
  }


  ngOnInit(): void {
    this.form = this._fb.group({
      new_password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(24)]],
      confirmNewPassword: ['', [Validators.required,Validators.minLength(8), Validators.maxLength(24), this.passwordComplexityValidator,this.passwordMatchValidator]]
    });
  }



  togglePassword() {
    this.showPassword = !this.showPassword;
  }
  toggleConfrimPassword() {
    this.showConfrimPassword = !this.showConfrimPassword;
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
      this._auth.resetPassword(this.token, this.form.value)
        .subscribe((res) => {
          this._loader.hideLoader();
          const content = STATUS_MESSAGES_AUTH[res.status];
          this._toast.show(content.type, content);

          this.router.navigate(['/authentication/login'])

        }, (err) => {
          const content = STATUS_MESSAGES_AUTH[err.status];
          this._toast.show(content.type, content);
          this._loader.hideLoader();
        })
    }

  }
  handleSkipClick(): void {
    this.router.navigate(['/authentication/login'])
  }
}
