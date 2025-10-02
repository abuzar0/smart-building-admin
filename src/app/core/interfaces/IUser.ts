export interface ILoginBody {
  email: string,
  password: string
}


export interface IPermission {
  _id: string;
  name: string;
  actions:{
    create: boolean;
    read: boolean;
    edit: boolean;
    delete: boolean;
    control: boolean;
    assignee:boolean;
    restore:boolean
  }
}

export interface IUserData {
  _id: string;
  email:string;
  role: string;
  avatar:string;
  is_first_time:boolean;
  username:string
  permission: IPermission[];
}

export interface ILoginResponse {
  message: string;
  data: IUserData;
  isSuccess: boolean;
}

export interface IRole {
  type: string,
  _id?:string,
  permission?: IPermissionList[];
}

export interface IRoleList {
  _id: string;
  type: string;
  user_id: string;
  isActive: boolean;
  created: string;
  updated: string;
}


export interface IPermissionList {
  _id:string
  name: string,
  actions: {
    create: boolean;
    read: boolean;
    edit: boolean;
    delete: boolean;
    control: boolean;
    assignee:boolean;
    restore:boolean
  },
  isActive:boolean
}


export interface IUserList {
  _id: string;
  role: IRole;
  email:string,
  avatar:string;
  username:string
  isActive:boolean
}
