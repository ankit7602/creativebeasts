const express = require('express');
const { dirname} = require('path');
const path = require('path');
const hbs = require("hbs");
const cors = require('cors');
const { urlencoded } = require('express');
const nodemailer = require('nodemailer');
const User = require('./models/usermessage');
require("./db/conn");

const app = express();
const port = process.env.PORT || 5000;
app.use(cors());


//static path
const staticpath = path.join(__dirname, "../public");
const templatespath = path.join(__dirname, "../templates/views");
const partialspath = path.join(__dirname, "../templates/partials");



//middleware
app.use('/css', express.static(path.join(__dirname, "../node_modules/bootstrap/dist/css")));
app.use('/js', express.static(path.join(__dirname, "../node_modules/bootstrap/dist/js")));
app.use('/jq', express.static(path.join(__dirname, "../node_modules/jquery/dist")));
app.use(express.static(staticpath));
app.set("view engine", "hbs");
app.set("views", templatespath);
hbs.registerPartials(partialspath);
app.use(express.urlencoded({extended: false}));



//routing
app.get("/" , (req, res)=>{
      res.render("index");  
   
} ) 

app.post("/contact", async(req , res)=>{
    
    try {
        const userData = new User(req.body);
        await userData.save();
        res.status(201).render("index");
    } catch (error) {
        res.status(500).send(error)
    }
})


app.listen(port, ()=>{
    console.log (`server is running at port ${port}`);
});
