import { TemplateRef } from "@angular/core";

export interface IToast {
	template: TemplateRef<any>;
	content?:{title?: string, text?: string,type?:string}
	delay?: number;
}