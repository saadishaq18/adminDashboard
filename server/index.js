import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import dotenv from 'dotenv'
import helmet from 'helmet'
import morgan from 'morgan'
import mongoose from 'mongoose'
import clientRoutes from './routes/client.js'
import managementRoutes from './routes/management.js'
import generalRoutes from './routes/general.js'
import salesRoutes from './routes/sales.js'

//CONFIGURATION
dotenv.config()
const app = express()
app.use(express.json())
app.use(helmet())
app.use(helmet.crossOriginResourcePolicy({policy:'cross-origin'}))
app.use(morgan("common"))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))
app.use(cors())

//Routes
app.use('/client', clientRoutes)
app.use('/general', generalRoutes)
app.use('/management', managementRoutes)
app.use('/sales', salesRoutes)


//MONGOOSE
const PORT = process.env.PORT || 9000

mongoose.connect(process.env.MONGO_URL ,{
    useNewUrlParser: true,
    useUnifiedTopology: true,

}).then(()=>{
    app.listen(PORT, ()=>{console.log(`Server port no is: ${PORT}`)})
}).catch((error)=>{
    console.log(`${error} didnot work`)
})