import { Injectable, TemplateRef } from '@angular/core';
import { IToast } from '../../interfaces/IToast';
import { BehaviorSubject } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
	providedIn: 'root'
})
export class ToastService {

	private templates: { [key: string]: TemplateRef<any> } = {};
	private toastTypeSource = new BehaviorSubject<'success' | 'error' | 'warning' | 'info'>('success');
	toastType$ = this.toastTypeSource.asObservable();

	toasts: IToast[] = [];

	constructor(private translate: TranslateService) { }

	registerTemplates(templates: { [key: string]: TemplateRef<any> }) {
		this.templates = templates;
	}


	show(type: 'success' | 'error' | 'warning' | 'info', content: { title: string, text: string }, delay?: number) {
		const translatedTitle = this.translate.instant(content.title);
		const translatedText = this.translate.instant(content.text);

		// Check if toast already exists
		const isDuplicate = this.toasts.some((toast: IToast) =>
			toast.content?.type === type &&
			toast.content?.title === translatedTitle &&
			toast.content?.text === translatedText
		);

		if (isDuplicate) {
			return;
		}

		// No duplicate found, add new toast
		this.toastTypeSource.next(type);
		this.toasts.push({
			template: this.templates['toast'],
			content: {
				title: translatedTitle,
				text: translatedText,
				type: type
			},
			delay
		});

	}

	remove(toast: IToast) {
		this.toasts = this.toasts.filter((t) => t !== toast);
	}

	clear() {
		this.toasts.splice(0, this.toasts.length);
	}
}
