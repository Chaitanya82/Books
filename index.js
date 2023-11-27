var express = require('express')
var {MongoClient} = require('mongodb')
var app = express()

var collection = {} // Defining it globally. This is for storing collection
MongoClient.connect(url).then((client) => { 
    const connect = client.db(databasename); 
    // Connect to collection 
    collection = connect 
        .collection("introduction"); 
  
    collection.find({}).toArray().then((ans) => { 
        console.log(ans); 
    }); 
    
}).catch((err) => { 
    // Printing the error message 
    console.log(err.Message); 
})


app.get('/', (req, res) => {
    res.send("It's working ..")
})

app.listen(3000)