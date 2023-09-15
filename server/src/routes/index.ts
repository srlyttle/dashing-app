import express from 'express'

import currency from './user.route'

const router = express.Router()

export default (): express.Router => {
  currency(router)

  return router
}
