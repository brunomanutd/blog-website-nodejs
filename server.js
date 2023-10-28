const http = require('http');
const fs=require('fs');
const _ =require('lodash');

const server =http.createServer((req,res,er)=>{
    /*if(er)
    console.log('error');
    console.log(req.url,req.method);
    */

    //lodash

    const num=_.random(0,20);
    console.log(num);

    const greet=_.once(()=>{
        console.log("common ayush");
    })

    greet();
    greet();
    //set header content type
    res.setHeader('content-Type','text/html');
    
    let path ='./views/';
    switch(req.url)
    {
        case '/':
            path +='index.html';
            res.statusCode=200;
            break;
        case '/about':
            path +='about.html';
            res.statusCode=200;
            break;
        case '/about-me':
            res.statusCode=301;
            res.setHeader('Location','/about');
            res.end();
            break;
        default:
            path +='404.html';
            res.statusCode=404;
            break;        
    }
    /*res.write('<head><link rel="stylesheet" href="#"></head>');
    res.write('<p>hello,ninjas</p>');
    res.write('<p>hello macha,ninjas</p>');
    res.end();
    */

    //send an html file

    fs.readFile(path,(err,data) =>{
        if(err)
        {
            console.log(err);
            res.end();
        }
        else
        {
            res.write(data);
            res.end();
        }
    })
});

server.listen(3000,'localhost',()=>{
    console.log('lisitening for reuest for port 3000');
});