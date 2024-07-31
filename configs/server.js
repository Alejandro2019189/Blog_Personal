'use strict'

import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import { dbConnection } from './mongo.js'
import authRoutes from '../src/auth/auth.routes.js'
import publicationsRoutes from '../src/publications/publications.routes.js'

class Server{
    constructor(){
        this.app = express()
        this.port = process.env.PORT
        
        this.authPath = '/portafolio/v1/auth'
        this.publicationsPath = '/portafolio/v1/publications'
        
        this.middleware()
        this.conectarDB()
        this.routes()
    }

    async conectarDB(){
        await dbConnection()
    }

    middleware() {
        this.app.use(express.urlencoded({extended: false}))
        this.app.use(cors())
        this.app.use(express.json())
        this.app.use(helmet())
        this.app.use(morgan('dev'))
    }

    routes(){
        this.app.use(this.authPath, authRoutes)
        this.app.use(this.publicationsPath, publicationsRoutes)
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log('Server running on port ', this.port)
        })
    }
}

export default Server