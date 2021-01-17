const mongoose = require('mongoose');

mongoose.connect("mongodb+srv://ankit4180:Ankit7602@cluster0.rxg5r.mongodb.net/ankit4180?retryWrites=true&w=majority",
{
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true
}).then(()=>{
    console.log("success");
}).catch((error)=>{
    console.log(error);
})