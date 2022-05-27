app.get('/short-url',async (req,resp)=>{
    const url = req.query.newUrl;
    if(url){
        const shorten_url=req.get('host')+'/'+uid();
        const newUrl =  await saveURL.create({url:url,shortenUrl:shorten_url});
        resp.json(newUrl);
    }
    else {
        resp.json({'error':'url is required'});
    }
})



app.get('/:shortenUrl',async (req,res)=>{
    const shortenUrl=req.get('host')+'/'+req.params.shortenUrl;
    const getSavedUrl =  await saveURL.findOne({shortenUrl:shortenUrl});
    console.log(getSavedUrl);
    if(getSavedUrl){

        res.redirect(getSavedUrl.url);
    }
    else{

        res.json({'error':'page not exits'});
    }
});