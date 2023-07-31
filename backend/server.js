const app = require('./app');
const connectDatabase = require('./config/database')


const dotenv = require('dotenv');

dotenv.config({path: 'backend/config/config.env'})

//connecting to database
connectDatabase();


app.listen(process.env.PORT, () =>{
    console.log(`server runing on PORT:  ${process.env.PORT}`);
})
// ``