import express from 'express'

import UserController from '../controllers/user.controller'
import DataService from '../services/data.service'
import UserService from '../services/user.service'

// TODO - add DI container
const dataService = new DataService()

const userService = new UserService(dataService)

const userController = new UserController(userService)

export default (router: express.Router) => {
  router.get('/healthz', userController.healthCheck)
  router.post('/login', userController.getUser)
  router.get('/users', userController.getUsers)
}
