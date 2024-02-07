const mongoose = require('mongoose');
const saltRounds = 10;


const userSchema = new mongoose.Schema({
    userName: {type: String},
    password: {type:String},
    email: {type: String, unique: true},
    location: {type: String},
    image: {type: String},
    savingAmount: {type: String},
    googleId: {type: String},
    role: {type: String, default: "user", enum: ["admin", "user"]}
},
{
    timestamps: true,
    versionKey: false
});

module.exports = mongoose.model("User",userSchema)


