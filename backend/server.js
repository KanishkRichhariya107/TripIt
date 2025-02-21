const express =require('express');
const mongoose=require('mongoose');
const travelRoutes = require('./routes/travelRoutes');
require('dotenv').config();

const app=express();

app.use(express.json());
app.use('/api/travel', travelRoutes);

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