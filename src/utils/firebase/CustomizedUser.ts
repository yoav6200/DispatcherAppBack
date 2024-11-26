export interface CustomizedUser {
  uid: string;
  email: string | undefined;
  passwordHash?: string;
}
