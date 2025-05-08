import express from 'express'
import dotenv from 'dotenv'

dotenv.config()


const port=process.env.PORT||5000

const app=express()

app.get('/',(req,res)=>{
    res.send('hello')
})



app.listen(port,()=>{
    console.log(`sererv started ${port}`)
})