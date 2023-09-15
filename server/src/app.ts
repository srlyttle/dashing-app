import bodyParser from 'body-parser'
import cors from 'cors'
import express from 'express'

import errorHandler from './middlewear/errorHandler'
import fourOhFour from './middlewear/fourOhFour'
import routes from './routes'

const app = express()
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.json())
app.use('/api', routes())

app.use(fourOhFour)
app.use(errorHandler)

export { app }
