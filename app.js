const uid = () => {
    return Date.now().toString(16) + Math.random().toString(16).substr(15);
  };

var indexRouter = require("./routes/index.js");

const express = require('express');
const app= express();
const mongoose = require('mongoose');
const { auth } = require('express-openid-connect');

const config = {
    authRequired: false,
    auth0Logout: true,
    secret: 'a long, randomly-generated string stored in env',
    baseURL: 'http://localhost:3000',
    clientID: 'a2DJzcMC3fb9FAfbQFcDgP56bip5Ngb1',
    issuerBaseURL: 'https://deep98akash.us.auth0.com'
  };

// req.isAuthenticated is provided from the auth router
app.get('/', (req, res) => {
    res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
  });

  const { Schema } = mongoose;

const saveUrlSchema = new Schema({
  url:{type:String,unique:[true,'url already exits'],maxlength:4000},
  shortenUrl: {type:String,unique:true},
});

const saveURL = mongoose.model('saveURL', saveUrlSchema);

//require("dotenv").config();

app.use(express.json());
app.use(express.urlencoded({extended : true}));


//app.use("/",indexRouter);

//app.use(express.static('./public'));



app.use(auth(config));

const mongoURI = "mongodb+srv://Venom789:222222222@cluster0.unao6.mongodb.net/urlShortner?retryWrites=true&w=majority";
mongoose.connect(mongoURI).then(()=>{
    console.log('connected to db');
}).catch((e)=>{
    console.log(e);
});


app.set('view engine', 'ejs');
app.set("views","views");


app.listen(3000,()=>{
    console.log('server started');
    console.log();
});







