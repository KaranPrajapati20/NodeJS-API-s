const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/practanddelete")
.then(() => {
    console.log("databse is running")
})
.catch((err)=> {
    console.log(err)
})