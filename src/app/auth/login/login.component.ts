import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth/auth.service';
import { ToastService } from '../../core/services/toast/toast.service';
import { STATUS_MESSAGES_LOGIN } from '../../core/utils/end-point-response';
import { UserService } from '../../core/services/user/user.service';
import { TranslateModule } from '@ngx-translate/core';
import { LanguageService } from '../../core/services/language/language.service';
import { LoaderService } from '../../core/services/loader/loader.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, RouterLink, TranslateModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {

  form!: FormGroup;

  dir: 'ltr' | 'rtl' = 'ltr';
  selectedLang: 'en' | 'ar' = 'en';
  showPassword: boolean = false;


  constructor(private router: Router,
    private _fb: FormBuilder,
    private _auth: AuthService,
    private _toast: ToastService,
    private _user: UserService,
    private _loader: LoaderService,
    private langService: LanguageService
  ) { }


  ngOnInit(): void {
    this.form = this._fb.group({
      email: new FormControl('', [Validators.required, Validators.email,Validators.maxLength(50)]),
      password: new FormControl('', [Validators.required, Validators.minLength(8),
      Validators.maxLength(24),
      this.passwordComplexityValidator])
    })

    this.selectedLang = this.langService.getCurrentLang();
    this.dir = this.langService.getCurrentLang() === 'ar' ? 'rtl' : 'ltr';
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

  switchLang(lang: 'en' | 'ar') {
    this.langService.setLanguage(lang);
  }


  togglePassword() {
    this.showPassword = !this.showPassword;
  }
  handleClick(): void {
    this._loader.showLoader();
    this._auth.login(this.form.value)
      .subscribe((res) => {
        const content = STATUS_MESSAGES_LOGIN[res.status];
        this._toast.show(content.type, content);
        this._user.setUserInfo(res.body?.data);
        this._loader.hideLoader();
        const { is_first_time } = res.body?.data
        if (is_first_time) {
          this.router.navigate(['/authentication/update-password'])
        } else {
          this.router.navigate(['/cob'])
        }
      }, (error) => {
        this._loader.hideLoader();
        const content = STATUS_MESSAGES_LOGIN[error.status];
        this._toast.show(content.type, content);
      })
  }
}
