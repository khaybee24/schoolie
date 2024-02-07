const mongoose = require('mongoose');


const connectDB = async () =>{
try { await mongoose.connect(process.env.MONGO, {
    useNewUrlParser: true, 
    useUnifiedTopology: true,
  });

    console.log('connected to the server');
} catch (error) {
    console.log('failed to connect to server');
    console.log(error);
}
}

module.exports = connectDB;