//const { application } = require('express');
const express =require('express');
const morgan=require('morgan');
const mongoose=require('mongoose');
const Blog=require('./models/blog');
//const { result } = require('lodash');
//express app
const app=express();
//connect to mangodb
const dbURI='mongodb+srv://netninjaProject:test12345@nodetuts.gxamndy.mongodb.net/nodetuts?retryWrites=true&w=majority';
mongoose.connect(dbURI,{useNewUrlParser:true,useUnifiedTopology:true})
  //.then((result)=>console.log('connected to db'))
  .then((result)=>app.listen(3000))
  .catch((err)=>console.log(err));

//register view engine 
app.set('view engine','ejs');

//listen for request
//app.listen(3000);

/*app.use((req,res,next) =>{
  console.log('new request made:');
  console.log('host: ',req.hostname);
  console.log('path: ',req.path);
  console.log('method: ',req.method);
  next();
});
*/
//middleware and static files
app.use(express.static('public'));
app.use(express.urlencoded({extended:true}));
app.use(morgan('dev'));
app.use((req, res, next) => {
  res.locals.path = req.path;
  next();
});

/*//mongoose and mongo snadbox routes
app.get('/add-blog',(req,res)=>{
  const blog=new Blog({
    title:'new blog 2',
    snippet:'about my new blog',
    body:'more about my new blog'
  });

  blog.save()
  .then((result)=>{
    res.send(result)
  })
  .catch((err)=>{
    console.log(err);
  })
})

app.get('/all-blogs',(req,res)=>{
  Blog.find()
  .then((result)=>{
    res.send(result);
  })
  .catch((err)=>{
    console.log(err);
  });
});

app.get('/single-blog',(req,res)=>{
  Blog.findById("6388457beabcb4875cd5eaee")
  .then((result)=>{
     res.send(result)
  })
  .catch((err)=>{
    console.log(err);
  });
})
*/
//routes
app.get('/',(req,res)=>{
   /*const blogs=[
    {title:'yoshi find eggs',snippet:'ramu ne kya bola'},
    {title:'mario finds stars',snippet:'chole ne kya bola'},
   ]
   //res.sendFile('./views/index.html',{root:__dirname});
   res.render('index',{title:'Home',blogs});
   */
  res.redirect('/blogs');
});

app.get('/about',(req,res)=>{
    //res.send('<p>re ankitwa</p>');
    //res.sendFile('./views/about.html',{root:__dirname});
    res.render('about',{title:'About'});
 });

//blog routes

app.get('/blogs/create', (req, res) => {
  res.render('create', { title: 'Create a new blog' });
});


app.get('/blogs',(req,res)=>{
  Blog.find().sort({createdAt:-1})
  .then((result)=>{
    res.render('index',{title:'All Blogs',blogs:result})
  })
  .catch((err)=>{
    console.log(err);
  })
}) 

app.post('/blogs',(req,res)=>{
  const blog=new Blog(req.body);
   
  blog.save()
  .then((result)=>{
    res.redirect('/blogs');
  })
  .catch((err)=>{
    console.log(err);
  })
})

app.get('/blogs/:id',(req,res)=>{
  const id=req.params.id;
  Blog.findById(id)
  .then((result) =>{
    res.render('details',{blog:result,title:'Blog Details'});
  })
  .catch((err)=>{
    console.log(err);
  });
})

app.delete('/blogs/:id',(req,res)=>{
  const id=req.params.id;
  Blog.findByIdAndDelete(id)
  .then(result => {
    res.json({ redirect: '/blogs' });
  })
  .catch(err => {
    console.log(err);
  }); 
});

 

 //redirects
 app.get('/about-us',(req,res)=>{
   res.redirect('/about');
 });  

 //404page
 app.use((req,res)=>{
   //res.status(404).sendFile('./views/404.html',{root:__dirname});
   res.status(404).render('404',{title:'404'});
 });