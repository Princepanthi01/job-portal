import './config/instrument.js'
import express from 'express'
import cors from 'cors'
import 'dotenv/config' 
import connectDB from './config/db.js'
import * as Sentry from "@sentry/node";
import { clerkWebhooks } from './controllers/webhooks.js'
import companyRoutes from './routes/companyRoutes.js'
import connectCloudinary from './config/cloudinary.js'
import jobRoutes from './routes/JobRoutes.js'
import userRoutes from './routes/userRoutes.js'
import {clerkMiddleware} from '@clerk/express'
// initalise exapress
const app = express()

// connect to database 
await connectDB()
await connectCloudinary()

// middle wares
app.use(cors())
app.use (clerkMiddleware())


app.use(express.json())

// Routes
app.get('/', (req,res)=> res.send("API is working"))

app.get("/debug-sentry", function mainHandler(req, res) {
  throw new Error("My first Sentry error!");
});

app.post('/webhooks',clerkWebhooks)
// server.js
// app.post('/webhooks', express.raw({ type: "application/json" }), clerkWebhooks)


app.use ('/api/company', companyRoutes)
app.use ('/api/jobs',jobRoutes)
app.use ('/api/users', userRoutes)


// port 
const PORT = process.env.PORT || 5000

Sentry.setupExpressErrorHandler(app);



export default app