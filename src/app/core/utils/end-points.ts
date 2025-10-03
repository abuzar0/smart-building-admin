export const API_END_POINT = {
    ROLE: {
        CREATE_ROLE: '/role/create',
        LIST_ROLE: '/role/list',
        LIST_MENU_ROLE: '/role/list-menu',
        ROLE_BY_ID: '/role',
        UPDATE_ROLE: '/role',
        DELETE_ROLE: '/role'
    },
    PERMISSION: {
        CREATE_PERMISSION: '/permission/create',
        LIST_PERMISSION: '/permission/list',
        MENU_LIST_PERMISSION: '/permission/list-menu',
        UPDATE_PERMISSION: '/permission',
        DELETE_PERMISSION: '/permission'
    },
    USER: {
        CREATE_USER: '/user/create',
        LIST_USER: '/user/list',
        USER_BY_ID: '/user',
        DE_ACTIVE_USER: '/user/deactivate',
        ACTIVE_USER: '/user/activate',
        UPDATE_USER_PERMISSION: '/user/feature',
        UPDATE_USER_PROFILE: '/user',
        ASSIGNEE_USER_BUILDING: '/user/building-assignee'
    },
    STATS:{
        STATS_LIST:'/building/summery'
    },
    NOTIFICATION: {
        LIST_NOTIFICATION: '/notification/list',
        UPDATE_NOTIFICATION_STATUS: '/notification',
        NOTIFICATION: '/notification'
    },
    Auth: {
        LOGIN: '/auth/login',
        LOGOUT: '/auth/logout',
        UPDATE_PASSWORD: '/auth/update-password',
        FORGOT_PASSWORD: '/auth/forgot-password-link',
        RESET_PASSWORD: '/auth/forgot-password',
    }
}