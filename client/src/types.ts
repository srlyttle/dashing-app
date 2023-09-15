export interface User {
  id: string;
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  role: Role;
  password: string;
}

export enum SortOrder {
  ASC = "asc",
  DESC = "desc",
}

export enum Role {
  VIEWER = "viewer",
  EDITOR = "editor",
}
