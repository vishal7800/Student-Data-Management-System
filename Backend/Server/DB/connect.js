const mongoose = require('mongoose');

const connectdb =async ()=>{
    try {
        const db = await mongoose.connect(process.env.MONGODB_URI);
    } catch (error) {
        console.log("error connecting to Mongodb",error);
    }
}

module.exports = connectdb;