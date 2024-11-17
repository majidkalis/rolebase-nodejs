const mongoose = require('mongoose');

const dbConnection = async ()=> {
    try {
        mongoose.connect(process.env.MONGO_URL, {

        });
        console.log('Database connected Successfully!');
    } catch (error) {
        console.log('database Connection failed!');
    }
}

module.exports = dbConnection