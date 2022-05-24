const uid = () => {
    return Date.now().toString(16) + Math.random().toString(16).substr(15);
  };

const express = require('express');
const app= express();
const mongoose = require('mongoose');

const mongoURI = "mongodb+srv://Venom789:222222222@cluster0.unao6.mongodb.net/urlShortner?retryWrites=true&w=majority";
mongoose.connect(mongoURI).then(()=>{
    console.log('connected to db');
}).catch((e)=>{
    console.log(e);
});

const { Schema } = mongoose;

const saveUrlSchema = new Schema({
  url:{type:String,unique:true},
  shortenUrl: {type:String,unique:true},
});

const saveURL = mongoose.model('saveURL', saveUrlSchema);


app.use(express.static('./public'));

app.get('/:shortenUrl',(req,res)=>{
    const shortenUrl = req.params.shortenUrl;
    console.log(shortenUrl);
    res.redirect('https://google.com');
})

app.get('/short-url',(req,resp)=>{
    console.log();
    const url = req.query;
    const shorten_url=req.get('host')+'/'+uid();
const newUrl =  new saveURL({url,shorten_url});
newUrl.save((err,result)=>{
    if(err) console.log(err);
    else console.log(result);
});

    resp.json({url,shorten_url});
})


app.get('/product',(req,resp)=>{
console.log(req.query);
resp.send(`you are on page number`);

});


app.listen(4000,()=>{
    console.log('server started');
})