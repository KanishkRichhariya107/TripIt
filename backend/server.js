const express =require('express');
const mongoose=require('mongoose');
require('dotenv').config();

const app=express();

app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
 .then(()=>{
    app.listen(4000,()=>{
        console.log("listening to port",process.env.PORT);
})
}
)
.catch((err)=>{
    console.error("connection error",err)
})