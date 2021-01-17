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
    const name = req.body.name;
    const email = req.body.email;
    const phone = req.body.phone;
    const message= req.body.message;

    var transport = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        requireTLS: true,
        auth: {
          user: "sharmaankit7602@gmail.com",
          pass: "Ankit@7602",
        },
      });
      var mailOptions = {
        from: req.body.email ,
        to: "sharmaankit7602@gmail.com",
        subject:`Mail from ${name}`,
        html: `
           <h2>Information</h2>   
          <h3>Name: ${name}</h3>
          <h3>Phone no: ${phone}</h3>
          <h3>Email: ${email}</h3>
          <p>${message}</p>
    
        `,
      };
      transport.sendMail(mailOptions, function (err, info) {
        if (err) {
          console.log(err);
        } else {
          console.log("sent", info.response);
        }
      });


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
