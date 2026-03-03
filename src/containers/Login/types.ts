export interface LoginState {
  email: string;
  password: string;
  error: string | null;
}

export interface CreateState {
  email: string;
  name: string;
  password: string;
  error: string | null;
}
