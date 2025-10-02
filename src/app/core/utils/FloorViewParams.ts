import { ActivatedRoute, Router } from "@angular/router";
import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from "rxjs";


@Injectable({
    providedIn: 'root'
})
export class RoleViewTypeParams {

    private viewType: BehaviorSubject<string> = new BehaviorSubject<string>('grid');
    constructor(private route: ActivatedRoute, private router: Router) {
        this.route.queryParams.subscribe(params => {
            if (params['vt_rp']) this.viewType.next(params['vt_rp']);
        });
    }

    getRoleViewTypeParams(): Observable<string> {
        return this.viewType.asObservable();
    }

    setRoleViewTypeParams(viewType: string): void {
        this.router.navigate([], {
            queryParams: { vt_rp: viewType },
            queryParamsHandling: 'merge' // Keep other existing query params
        });
        this.viewType.next(viewType)
    }

    navigateToRoleMainRoute(path: string): void {
        this.router.navigate([path], {
            queryParams: { vt_rp: this.viewType.value },
            queryParamsHandling: 'merge'
        });
    }
    
}



@Injectable({
    providedIn: 'root'
})
export class UserViewTypeParams {

    private viewType: BehaviorSubject<string> = new BehaviorSubject<string>('grid');
    constructor(private route: ActivatedRoute, private router: Router) {
        this.route.queryParams.subscribe(params => {
            if (params['vtu']) this.viewType.next(params['vtu']);
        });
    }

    getUserViewTypeParams(): Observable<string> {
        return this.viewType.asObservable();
    }

    setUserViewTypeParams(viewType: string): void {
        this.router.navigate([], {
            queryParams: { vtu: viewType },
            queryParamsHandling: 'merge' // Keep other existing query params
        });
        this.viewType.next(viewType)
    }

    navigateToUserMainRoute(path: string): void {
        this.router.navigate([path], {
            queryParams: { vtu: this.viewType.value },
            queryParamsHandling: 'merge'
        });
    }

    navigateToUserCreateRoute(path: string): void {
        this.router.navigate([path], {
            queryParams: { vtu: this.viewType.value },
            queryParamsHandling: 'merge'
        });
    }

    navigateToUserUpdateRoute(path: string): void {
        this.router.navigate([path], {
            queryParams: { vtu: this.viewType.value },
            queryParamsHandling: 'merge'
        });
    }
    
}