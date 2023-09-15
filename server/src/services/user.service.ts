import { IDataService, IUserService, Role, User } from '../models/types'

class UserService implements IUserService {
  private dataService: IDataService

  constructor(dataService: IDataService) {
    this.dataService = dataService
  }

  public getUser(userName: string, hashedPassword: string): User | null {
    return this.getUsers().find((user) => user.username === userName && user.password === hashedPassword) || null
  }

  public getUsers(): User[] {
    return [
      {
        id: '1234',
        username: 'john34',
        firstName: 'john',
        lastName: 'doe',
        role: Role.EDITOR,
        email: 'john34@gmail.com',
        password: 'T@1234567Ks',
      },
      {
        id: '5678',
        username: 'peter12',
        firstName: 'peter',
        lastName: 'jones',
        role: Role.VIEWER,
        email: 'peter12@gmail.com',
        password: 'T@1234567Ks',
      },
    ]
  }
}

export default UserService
