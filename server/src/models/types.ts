export interface User {
  id?: string
  email?: string
  username?: string
  firstName?: string
  lastName?: string
  role: Role
  password?: string
}

export enum Role {
  VIEWER = 'viewer',
  EDITOR = 'editor',
}

export interface IDataService {
  getUsers(): User[]
  getUser(): User | null
}

export interface IUserService {
  getUser(userName: string, hashedPassword: string): User | null
  getUsers(): User[]
}
