const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  
  name:{
    type: String,
  required: true},


  Amount:{
    type: mongoose.Decimal128,
    required: true 
  },

  location:{
    type: String
},

  image: {
    type: String
  }

},
{
    timestamps: true,
    versionKey: false,
  })

    module.exports = mongoose.model('Item', itemSchema);