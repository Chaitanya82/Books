var express = require('express')
var mongoose = require('mongoose')
var {MongoClient, ObjectId} = require('mongodb')
var multer = require('multer')
var upload = multer({ dest: '/client/public/images/' })
var app = express()
var cors = require('cors')
app.use(cors())
app.use(express.urlencoded({ extended: false }));
app.use(express.json({limit: '50mb'}));
var page = 0
const ObjectID = require('mongodb').ObjectId;
var url = "mongodb+srv://root:root@atlascluster.fdgbenn.mongodb.net/?retryWrites=true&w=majority"
var databasename = "books"
var pageno = 0;

var collection = {} // Defining it globally. This is for storing collection

MongoClient.connect(url).then((client) => { 
    const connect = client.db(databasename); 
    // Connect to collection 
    collection = connect 
        .collection("books"); 
  
    collection.find({}).toArray().then((ans) => { 
        console.log('done'); 
    }); 
    
}).catch((err) => { 
    // Printing the error message 
    console.log(err.Message); 
})

app.get('/get', (req, res) => {
    collection.find({}).toArray().then((ans)=>{
        res.json(ans)
    })
}) 

app.post('/add', (req, res) => {
    var item = {
        name: req.body.name,
        author: req.body.author,
        genre: req.body.genre,
        description: req.body.description,
        sno: req.body.sno,
        image: req.body.image
    }
    collection.insertOne(item)
        .then(result => {
            res.json('Record added')
        })
        .catch(error => console.error(error))
})

app.post('/upload-file', upload.single('file'), (req, res) => {
    res.send('File uploaded successfully')
  })

app.delete('/delete', (req, res, next) => {
    
    collection.deleteOne({sno: req.body.sno})
        .then(result => {
            res.json('Record deleted')
        })
        .catch(error => console.error(error))
})

app.put('/edit', (req, res) => {
    //res.send('Put is being called ...')
    collection.findOneAndUpdate(
        {sno: req.body.sno},
        {
            $set: {
                name: req.body.name,
                author: req.body.author,
                genre: req.body.genre,
                description: req.body.description,
                image: req.body.image
            },
        }
        ,    
            {
                upsert: false,
            }
        
    )
        .then(result => {
            res.json('Record edited')
        })
        .catch(error => console.error(error))
})

app.get('/search', (req, res, next) => {
    var searchValue = req.query.searchValue
    var searchResult = []
    collection.find({}).toArray().then((ans)=>{
        for(var i in ans){
            if(ans[i].name.includes(searchValue) || ans[i].author.includes(searchValue) || ans[i].genre.includes(searchValue) ){
                searchResult.push(ans[i])
            }
        }
        res.send(searchResult)
    })
    
        /*var query = { "name": /req.query.name/}
        collection.find(query).toArray().then((ans)=>{
            res.send(ans)
        })*/
    //res.send(searchValue)
    }); 
     
/*app.get('/search',(req, res)=>{
    var a = req.body.name
    //var result = []
    
    collection.find({}).toArray().then((ans)=>{
        for(var i in ans){
            if(a == ans[i].name)
                var result = ans[i]   
        }
        res.send(result)   
    })
    //res.send(result)
})*/
app.listen(3000)