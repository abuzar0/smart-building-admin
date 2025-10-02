import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth/auth.guard';

export const routes: Routes = [
    {
        path: 'authentication/login',
        loadComponent: () => import('./auth/login/login.component').then(x => x.LoginComponent),
        title: 'Authentication | Login'
    },
    {
        path: 'authentication/forgot-password',
        loadComponent: () => import('./auth/forgot-password/forgot-password.component').then(x => x.ForgotPasswordComponent),
        title: 'Authentication | Forgot Password'
    },
    {
        path: 'authentication/update-password',
        loadComponent: () => import('./auth/update-password/update-password.component').then(x => x.UpdatePasswordComponent),
        title: 'Authentication | Change Password'
    },
    {
        path: 'authentication/verify',
        loadComponent: () => import('./auth/reset-password/reset-password.component').then(x => x.ResetPasswordComponent),
        title: 'Authentication | Reset Password'
    },
    {
        path: 'cob',
        loadComponent: () => import('./layout/main-layout/main-layout.component').then(x => x.MainLayoutComponent),
        children: [
            {
                path: 'dashboard',
                title: 'COB | Dashboard',
                loadComponent: () => import('./pages/dashboard/main/main.component').then(x => x.MainComponent)
            },
            {
                path: 'role',
                canActivate: [authGuard],
                children: [
                    {
                        path: '',
                        title: 'Role & Permission | Overview',
                        loadComponent: () =>
                            import('./pages/manage-user/roles-permission/main-role/main-role.component').then(m => m.MainRoleComponent),
                    },
                    {
                        path: 'create',
                        title: 'Role & Permission | Create',
                        loadComponent: () =>
                            import('./pages/manage-user/roles-permission/components/role-premission-form/role-premission-form.component').then(m => m.RolePremissionFormComponent),
                    },
                    {
                        path: ':id',
                        title: 'Role & Permission | Update',
                        loadComponent: () =>
                            import('./pages/manage-user/roles-permission/components/role-premission-form/role-premission-form.component').then(m => m.RolePremissionFormComponent),
                    },
                ],
            },

            {
                path: 'user',
                canActivate: [authGuard],
                children: [
                    {
                        path: '',
                        title: 'Manage User | Overview',
                        loadComponent: () =>
                            import('./pages/manage-user/users/user-main/user-main.component').then(m => m.UserMainComponent),
                    },
                    {
                        path: 'new',
                        title: 'Manage User | Creation',
                        loadComponent: () =>
                            import('./pages/manage-user/users/user-from/user-from.component').then(m => m.UserFromComponent),
                    },
                    {
                        path: ':id',
                        title: 'Manage User | Edit',
                        loadComponent: () =>
                            import('./pages/manage-user/users/user-from/user-from.component').then(m => m.UserFromComponent),
                    },
                ],
            },
            {
                path: 'profile-setting',
                loadComponent: () => import('./pages/manage-user/users/profile-setting/profile-setting.component').then(x => x.ProfileSettingComponent),
                title: 'Profile | Setting'
            },
            {
                path: 'notification',
                loadComponent: () => import('./pages/notification/main-notification/main-notification.component').then(x => x.MainNotificationComponent),
                title: 'Notification | Overview'
            },
            {
                path: 'notification/:id',
                loadComponent: () => import('./pages/notification/notification-detail/notification-detail.component').then(x => x.NotificationDetailComponent),
                title: 'Notification | Detail'
            },
            {
                path: '',
                redirectTo: 'dashboard',
                pathMatch: 'full'
            },
        ]
    },
    {
        path: "",
        pathMatch: 'full',
        redirectTo: 'authentication/login'
    }
]

