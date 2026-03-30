export interface User {
  id: string;
  name: string;
  email: string;
  password?: string;
  faceDescriptor: number[]; // Vector of 128 numbers
}

export const users: User[] = [];
