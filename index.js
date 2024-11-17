const express = require('express');
const dotenv = require('dotenv').config();
const bodyParser = require('body-parser');
const cors = require('cors')
const dbConnection = require('./config/mongoDB');


const app = express();
app.use(express.json());
app.use(bodyParser.json());

let corsOptions = {
    origin : ['http://localhost:4200'],
 }
 
 app.use(cors(corsOptions))

PORT = process.env.PORT;
dbConnection()




app.use('/', require('./routes/authRoute'));
app.use('/user', require('./routes/userRoute'));
app.use('/message', require('./routes/messageRoute'));



app.listen(PORT, ()=> {
    console.log(`App is Listening on ${PORT}`);
});



