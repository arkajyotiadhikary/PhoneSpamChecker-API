export interface IUser {
      id: number;
      name: string;
      phoneNumber: string;
      email?: string | null;
      password: string;
}

export interface IContact {
      id: number;
      name: string;
      phoneNumber: string;
      userID: number | null;
}
