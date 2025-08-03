const mongose = require('mongoose');


function connectDB() {
    mongose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('MongoDB connected successfully ✅');
    })
    .catch(err => {
        console.error('MongoDB connection error:', err);
    });
}

module.exports = connectDB;