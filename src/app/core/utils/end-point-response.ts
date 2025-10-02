export const STATUS_MESSAGES_LOGIN: Record<
  number,
  { title: string; text: string; type: 'success' | 'error' | 'warning' }
> = {
  200: { title: 'toast.login.status.200.title', text: 'toast.login.status.200.text', type: 'success' },
  202: { title: 'toast.login.status.202.title', text: 'toast.login.status.202.text', type: 'success' },
  400: { title: 'toast.login.status.400.title', text: 'toast.login.status.400.text', type: 'warning' },
  401: { title: 'toast.login.status.401.title', text: 'toast.login.status.401.text', type: 'error' },
  403: { title: 'toast.login.status.403.title', text: 'toast.login.status.403.text', type: 'error' },
  404: { title: 'toast.login.status.404.title', text: 'toast.login.status.404.text', type: 'warning' },
  500: { title: 'toast.login.status.500.title', text: 'toast.login.status.500.text', type: 'error' }
};


export const STATUS_MESSAGES_AUTH: Record<number, { title: string; text: string; type: 'success' | 'error' | 'warning' }> = {
  200: { title: 'toast.auth.200.title', text: 'toast.auth.200.text', type: 'success' },
  209: { title: 'toast.auth.209.title', text: 'toast.auth.209.text', type: 'success' },
  400: { title: 'toast.auth.400.title', text: 'toast.auth.400.text', type: 'warning' },
  401: { title: 'toast.auth.401.title', text: 'toast.auth.401.text', type: 'error' },
  410: { title: 'toast.auth.410.title', text: 'toast.auth.410.text', type: 'error' },
  403: { title: 'toast.auth.403.title', text: 'toast.auth.403.text', type: 'error' },
  404: { title: 'toast.auth.404.title', text: 'toast.auth.404.text', type: 'warning' },
  500: { title: 'toast.auth.500.title', text: 'toast.auth.500.text', type: 'error' }
};




export const STATUS_MESSAGES_ROLE: Record<number, { title: string; text: string; type: 'success' | 'error' | 'warning' }> = {
  200: { title: 'toast.role.status.200.title', text: 'toast.role.status.200.text', type: 'success' },
  201: { title: 'toast.role.status.201.title', text: 'toast.role.status.201.text', type: 'success' },
  202: { title: 'toast.role.status.202.title', text: 'toast.role.status.202.text', type: 'success' },
  204: { title: 'toast.role.status.204.title', text: 'toast.role.status.204.text', type: 'success' },
  400: { title: 'toast.role.status.400.title', text: 'toast.role.status.400.text', type: 'warning' },
  401: { title: 'toast.role.status.401.title', text: 'toast.role.status.401.text', type: 'error' },
  403: { title: 'toast.role.status.403.title', text: 'toast.role.status.403.text', type: 'error' },
  404: { title: 'toast.role.status.404.title', text: 'toast.role.status.404.text', type: 'warning' },
  409: { title: 'toast.role.status.409.title', text: 'toast.role.status.409.text', type: 'warning' },
  410: { title: 'toast.role.status.410.title', text: 'toast.role.status.410.text', type: 'warning' },
  500: { title: 'toast.role.status.500.title', text: 'toast.role.status.500.text', type: 'error' }
};


export const STATUS_MESSAGES_PERMISSION: Record<number, { title: string; text: string; type: 'success' | 'error' | 'warning' }> = {
  200: { title: 'toast.permission.status.200.title', text: 'toast.permission.status.200.text', type: 'success' },
  201: { title: 'toast.permission.status.201.title', text: 'toast.permission.status.201.text', type: 'success' },
  202: { title: 'toast.permission.status.202.title', text: 'toast.permission.status.202.text', type: 'success' },
  204: { title: 'toast.permission.status.204.title', text: 'toast.permission.status.204.text', type: 'success' },
  400: { title: 'toast.permission.status.400.title', text: 'toast.permission.status.400.text', type: 'warning' },
  401: { title: 'toast.permission.status.401.title', text: 'toast.permission.status.401.text', type: 'error' },
  403: { title: 'toast.permission.status.403.title', text: 'toast.permission.status.403.text', type: 'error' },
  404: { title: 'toast.permission.status.404.title', text: 'toast.permission.status.404.text', type: 'warning' },
  409: { title: 'toast.permission.status.409.title', text: 'toast.permission.status.409.text', type: 'warning' },
  500: { title: 'toast.permission.status.500.title', text: 'toast.permission.status.500.text', type: 'error' }
};



export const STATUS_MESSAGES_USER: Record<number, { title: string; text: string; type: 'success' | 'error' | 'warning' }> = {
  200: { title: 'toast.user.status.200.title', text: 'toast.user.status.200.text', type: 'success' },
  201: { title: 'toast.user.status.201.title', text: 'toast.user.status.201.text', type: 'success' },
  202: { title: 'toast.user.status.202.title', text: 'toast.user.status.202.text', type: 'success' },
  203: { title: 'toast.user.status.203.title', text: 'toast.user.status.203.text', type: 'success' },
  204: { title: 'toast.user.status.204.title', text: 'toast.user.status.204.text', type: 'success' },
  205: { title: 'toast.user.status.205.title', text: 'toast.user.status.205.text', type: 'success' },
  206: { title: 'toast.user.status.206.title', text: 'toast.user.status.206.text', type: 'success' },
  400: { title: 'toast.user.status.400.title', text: 'toast.user.status.400.text', type: 'warning' },
  401: { title: 'toast.user.status.401.title', text: 'toast.user.status.401.text', type: 'error' },
  403: { title: 'toast.user.status.403.title', text: 'toast.user.status.403.text', type: 'error' },
  404: { title: 'toast.user.status.404.title', text: 'toast.user.status.404.text', type: 'warning' },
  409: { title: 'toast.user.status.409.title', text: 'toast.user.status.409.text', type: 'warning' },
  500: { title: 'toast.user.status.500.title', text: 'toast.user.status.500.text', type: 'error' }
};


export const STATUS_MESSAGES_NOTIFICATION: Record<number, { title: string; text: string; type: 'success' | 'error' | 'warning' }> = {
  200: { title: 'toast.notification.status.200.title', text: 'toast.notification.status.200.text', type: 'success' },
  206: { title: 'toast.notification.status.206.title', text: 'toast.notification.status.206.text', type: 'success' },
  401: { title: 'toast.notification.status.401.title', text: 'toast.notification.status.401.text', type: 'error' },
  403: { title: 'toast.notification.status.403.title', text: 'toast.notification.status.403.text', type: 'error' },
  404: { title: 'toast.notification.status.404.title', text: 'toast.notification.status.404.text', type: 'warning' },
  500: { title: 'toast.notification.status.500.title', text: 'toast.notification.status.500.text', type: 'error' }
};


export const NOTIFICATION_ICONS: Record<string, string> = {
  "on": "fas fa-power-off ", // Power icon for ON/OFF notifications
  "off": "fas fa-power-off", // Power icon for ON/OFF notifications
  "alert": "fas fa-exclamation-triangle", // Alert icon for warnings
  "threshold": "fas fa-chart-line", // Chart icon for threshold notifications
  "install": "fas fa-plug ", // Plug icon for installation events
};


export const NOTIFICATION_STATUS: Record<string, string> = {
  "on": "info",
  "off": "info",
  "alert": "error",
  "threshold": "warning",
  "install": "success",
  "notify":"info"
};

export const NOTIFICATION_STATUS_CLASS: Record<string, string> = {
  "on": "bg-info text-info",
  "off": "bg-info text-info",
  "alert": "bg-danger text-danger",
  "threshold": "bg-warning text-warning",
  "install": "bg-success text-success",
  "notify":  "bg-info text-info"
};
