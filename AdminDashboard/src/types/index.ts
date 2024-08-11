export interface RegUser {
  name: string;
  email: string;
  password: string;
}
export interface logUser {
  email: string;
  password: string;
}
export interface ZustandStoretype {
  token: string;
  setToken: (data: string) => void;
}
