const mongoose = require('mongoose');


const url = "mongodb://localhost:27017"

const connectToMongo = () => {
    mongoose.connect(url, () => {
        console.log("Connected to Mongo Successfully");
    })
}

module.exports = connectToMongo;