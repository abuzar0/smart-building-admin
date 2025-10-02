import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth/auth.service';
import { ToastService } from '../../core/services/toast/toast.service';
import { STATUS_MESSAGES_AUTH } from '../../core/utils/end-point-response';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { LanguageService } from '../../core/services/language/language.service';
import { LoaderService } from '../../core/services/loader/loader.service';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, RouterLink, TranslateModule],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss'
})
export class ForgotPasswordComponent {

  form!: FormGroup;

  dir: 'ltr' | 'rtl' = 'ltr';
  selectedLang: 'en' | 'ar' = 'en';

  constructor(
    private _fb: FormBuilder,
    private _auth: AuthService,
    private _toast: ToastService,
    private langService: LanguageService,
    private _loader: LoaderService
  ) { }


  ngOnInit(): void {
    this.form = this._fb.group({
      email: new FormControl('', [Validators.required,Validators.email,Validators.maxLength(50)]),
    });

    this.selectedLang = this.langService.getCurrentLang();
    this.dir = this.langService.getCurrentLang() === 'ar' ? 'rtl' : 'ltr';
  }

  switchLang(lang: 'en' | 'ar') {
    this.langService.setLanguage(lang);
  }
  handleClick(): void {
    if (this.form.valid) {
      this._loader.showLoader();
      this._auth.forgotPassword(this.form.value)
        .subscribe((res) => {
          const content = STATUS_MESSAGES_AUTH[res.status];
          this._toast.show(content.type, content);
          this._loader.hideLoader();
          this.form.reset();
        }, (err) => {
          const content = STATUS_MESSAGES_AUTH[err.status];
          this._toast.show(content.type, content);
          this._loader.hideLoader();
        })
    } else {

    }
  }
}
