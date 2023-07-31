const mongoose = require('mongoose');



const connectDatabase = () =>{
    mongoose.connect(process.env.DB_CLOUD_URI,{
        useNewUrlParser:true,
        useUnifiedTopology: true

    }).then(con =>{
        console.log(`Mongo Db database connected whit cloud on host ${con.connection.host}`);
    })

}

module.exports = connectDatabase;