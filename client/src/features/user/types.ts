export interface userI {
  email: string,
  id: string,
  role: string,
  token:string,
};

export enum ModeType {
  SIGN_IN = 'Sign In',
  SIGN_UP = 'Sign Up'
}

export interface stateI{
  user: null | userI,
  mode: ModeType;
  isAuth: Boolean;
  isLoadingApp: Boolean;
}

 