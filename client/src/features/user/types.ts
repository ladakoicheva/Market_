export interface userI {
  email: string,
  id: number,
  role: string,

};

export enum ModeType {
  SIGN_IN = 'Sign In',
  SIGN_UP = 'Sign Up'
}

export interface stateI{
  user: null | userI,
  mode: ModeType;
  isLoadingApp: boolean;
}

 