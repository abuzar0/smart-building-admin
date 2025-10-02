export interface INotificationList {
  _id: string;
  title: string;
  description: string;
  notification_type: string;
  alert_type_device:string;
  user_id: User;
  device_id: Device;
  is_read: boolean;
  data_params:any;
  isActive: boolean;
  created: string;  // ISO date string
  updated: string;  // ISO date string
  __v: number;
}

interface User {
  _id: string;
  email: string;
  username: string;
}

interface Location {
  _id: string;
  name: string;
}

interface Device {
  _id: string;
  name: string;
  device_id: string;
  state: "ON" | "OFF"; // Assuming state is either "ON" or "OFF"
  created: string; // ISO date string
  updated: string; // ISO date string
  location: Location;
  deviceType:string;
  locationType: "Building" | "Room" | "Floor"; // Enum based on `refPath`
}

export type SocketEventType = 'Device Action' | 'Device Threshold';