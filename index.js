var express = require('express')
var {MongoClient} = require('mongodb')
var app = express()
var cors = require('cors')
app.use(cors())
app.use(express.json());
var url = "mongodb+srv://root:root@atlascluster.fdgbenn.mongodb.net/?retryWrites=true&w=majority"
var databasename = "books"

var collection = {} // Defining it globally. This is for storing collection
MongoClient.connect(url).then((client) => { 
    const connect = client.db(databasename); 
    // Connect to collection 
    collection = connect 
        .collection("books"); 
  
    collection.find({}).toArray().then((ans) => { 
        console.log(ans); 
    }); 
    
}).catch((err) => { 
    // Printing the error message 
    console.log(err.Message); 
})

app.get('/get',(req, res) => {
    collection.find({}).toArray().then((ans)=>{
        res.json(ans)
    })
}) 
app.listen(3000)