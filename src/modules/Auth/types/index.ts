export interface ILoginPostData {
  username: string;
  password: string
}

export interface ILoginResponse {
  phone_number: string;
  session: string;
}
export interface IRequestOtpPostData {
  type: string;
  address: string;
  purpose: string;
  client_secret: string;
}
export interface IRequestOtpResponse {
  sid: number;
  wait: number;
}
export interface IVerifyOtpPostData {
  phone: string;
  code: string;
  type_: string;
  session: string;
}
export interface IVerifyOtpResponse {
  sid: number;
  validated: boolean;
}
export interface IFinishLoginPostData {
  phone_number: string;
  verification: {
    sid: number;
    client_secret: string;
  };
}
export interface IFinishLoginResponse {
  id:number;
  access: string;
  refresh: string;
}
export interface IUser {
  id: number;
  username: string;
  avatar_url: string;
  fullName: string;
  phone: string;
  role: "student" | "teacher" | "manager" | "admin" | "mentor";
  date_joined: string;
  is_active: boolean;
  is_birth_date: boolean;
  car_count: number;
  charge_point_count: number;
  balance: number;
  active_status: boolean;
  is_admin?: boolean;
}
