const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/dynamicportfolio",
{
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true
}).then(()=>{
    console.log("success");
}).catch((error)=>{
    console.log(error);
})