const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const User = require('./models/userSchema');
const Api =require('./models/apiSchema')
const Note = require('./models/notesSchema')
const Code = require('./models/codeSchema')
const Blog = require('./models/blogSchema')
const Deploy = require('./models/DeploySchema')
const { json } = require('express');
const URL ='mongodb+srv://Ganeshguru:iH%40teyou7@cluster0.zunhkyn.mongodb.net/DevClustDatabse?retryWrites=true&w=majority'


app.use(cors());
app.use(express.json());

mongoose 
 .connect(URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
         })   
 .then(() => console.log("Database connected!"))
 .catch(err => console.log(err));

let Devinfo={
    "DeveloperName":"Ganeshguru",
    "Applcation Name":"DevClust"
}
app.get('/',(req,res)=>{
    console.log(Devinfo)
    res.json(Devinfo)
})

 app.post('/api/register/',async(req,res)=>{
        console.log(req.body);
        console.log('I am called');
        try{
                await User.create({
                        name:req.body.name,
                        email:req.body.email,
                        username:req.body.username,
                        password:req.body.password,
                })
                console.log("sucess")
        }
        catch(e){
                console.log("Error arrives")
        }
 })


 app.post('/api/login/',async(req,res)=>{
        console.log(req.body)
        console.log("I am login called")
        try{
            const user = await User.findOne({
                email:req.body.email,
                password:req.body.password,
            })
            if(user){
                const token = jwt.sign({
                    name:user.name,
                    username:user.username,
                    email:user.email,
                    password:user.password,
    
                },'secret123')
                console.log(token)
                
                console.log(jwt.decode(token))
                console.log(user.name," login suces")
                //console.log(localStorage.email)
    
                return res
                        .status(200)
                        .json({
                            'token':token
                        })
            }
            else{
                return res.json({status:'error'})
            }
        }
        catch(e){
            console.log(e)
        }
    })

    
app.post('/api/addApi',async(req,res)=>{
    console.log("Add api called");
    console.log(req.body);
    try{
        await Api.create({
            username:req.body.username,
            ApiName:req.body.ApiName,
            ApiKey:req.body.ApiKey,
        })
        console.log("sucessfully added")
    }
    catch(e){
        console.log("There was some error")
    }

})

app.post('/api/AddNote/',async(req,res)=>{
    console.log("Add note called");
    console.log(req.body);
    try
    {
        await Note.create({
            username:req.body.username,
            title:req.body.title,
            notes:req.body.notes.trim(),
        })
        console.log("sucessfully notes added");
        return res.status(200)
    }
    catch(e)
    {
        console.log("error occured");
        return res.status(404)
    }
})

app.post('/api/AddCode/',async(req,res)=>{
    try{
        await Code.create({
            username:req.body.username,
            title:req.body.title,
            code:req.body.code,
            language:req.body.language
        })
        console.log("Successfully added");
    }
    catch(e){
        console.log("error")
    }
})

app.post('/api/AddBlog/',async(req,res)=>{
    try{
        await Blog.create({
            username:req.body.username,
            title:req.body.title,
            html:req.body.html,
            css:req.body.css,
            js:req.body.js,
            status:req.body.status,
            date:req.body.date,
        }) 
    }
    catch(e){
        console.log("error")
    }
})

app.post('/api/Deploy/',async(req,res)=>{
    try{
        await Deploy.create({
            _id:req.body.id,
            username:req.body.username,
            title:req.body.title,
            html:req.body.html,
            css:req.body.css,
            js:req.body.js,
            date:req.body.date,
        })
    }
    catch(e){
        console.log("error")
    }
})


///this routes fetch and display in the client
app.get('/api/mykeys/:username',async(req,res)=>{
    var findMyapis=await Api.find({
        username:req.params.username,
    });
    
    res.json(findMyapis)
})

app.get('/api/mynotes/:username',async(req,res)=>{
    console.log("Api called")
    var findmynotes = await Note.find({
        username:req.params.username,
    })
    console.log(findmynotes);
    res.json(findmynotes)
})

app.get('/api/mycodes/:username',async(req,res)=>{
    var findmycode=await Code.find({
        username:req.params.username,
    })
    console.log("COde triggered")
    console.log(findmycode)
    res.json(findmycode)
})

app.get('/api/ownnotes/:username',async(req,res)=>{
    var findmynotes = await Note.find({
        username:req.params.username,
    })
    console.log(findmynotes);
    res.json(findmynotes)
    
})

app.get('/api/myblogs/:username',async(req,res)=>{
     var Blogs = await Blog.find({
        username:req.params.username,
     })
     res.json(Blogs)
})

app.post("/api/delete/:id",async(req,res)=>{
    try{
    await Note.deleteOne({
        _id:req.params.id,
    })
    }
    catch(e){
        console.log("error in delete note")
    }
})

app.post('/api/deletekey/:id',async(req,res)=>{
    console.log("delete api called ",req.params.id)
    try{
        await Api.deleteOne({
            _id:req.params.id,
        })
        console.log("deleted sucessfully")
    }
    catch(e){
        console.log("error in delete api")
    }
})

app.post('/api/onenote/:id',async(req,res)=>{
    try{
        var onenote=await Note.findOne({
            _id:req.params.id,
        })
        res.json(onenote)
    }
    catch(e){

    }
})
app.put('/api/update/:id',async(req,res)=>{
    try{
       const id = req.params.id;
       const updates=req.body;
       const result=await Note.findByIdAndUpdate(id,updates)
       res.send(result);
       console.log("sucess")
}
    catch(e){
console.log("updateerrpr")
    }
})





 app.listen(8080,()=>{
        console.log('Server started')
     })