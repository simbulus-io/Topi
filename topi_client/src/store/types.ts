export interface RootState {
  version: string;
  name: any;
}

export interface User {
  username: string,
  email: string,
  uid: string,
  loggedIn: boolean,
  events: [],
}

export interface UserState {
  user?: User;
  error: boolean;
}
