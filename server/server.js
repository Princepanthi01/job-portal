import express from 'express'
import cors from 'cors'
import 'dotenv/config' 
// initalise exapress
const app = express()

// middle wares
app.use(cors())


app.use(express.json())

// Routes
app.get('/', (req,res)=> res.send("API is working"))

// port 
const PORT = process.env.PORT || 5000

app.listen(PORT, ()=> {
    console.log (`server is running on PORT ${PORT}`)
})