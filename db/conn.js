const mongoose = require("mongoose");

const DB = "mongodb+srv://hashara:hashara123@abcinstitute.7eagkv8.mongodb.net/?retryWrites=true&w=majority"

mongoose.connect(DB,{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=> console.log("connection start")).catch((error)=> console.log(error.message));