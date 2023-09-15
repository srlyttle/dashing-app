import express from 'express'

import { IUserService } from '../models/types'

class UserController {
  private userService: IUserService

  constructor(userService: IUserService) {
    this.userService = userService
  }

  public getUser = async (req: express.Request, res: express.Response) => {
    try {
      const username = req.body.username
      const password = req.body.password

      if (!username || !password) {
        return res.sendStatus(401)
      }
      const user = this.userService.getUser(username, password)
      if (!user) {
        return res.json(null)
      }
      res.json(user)
    } catch (error) {
      console.log(error)
      return res.sendStatus(400)
    }
  }

  public getUsers = async (req: express.Request, res: express.Response) => {
    try {
      const users = this.userService.getUsers()
      res.json(users)
    } catch (error) {
      console.log(error)
      return res.sendStatus(400)
    }
  }
  public healthCheck = async (req: express.Request, res: express.Response) => res.json({ health: 'ok' })
}

export default UserController
