const forwardNeedSchema = new mongoose.Schema({
    name: String,
    location: String,
    savingAmount: Number,
    itemImage: String,

});

const ForwardNeed = mongoose.model('ForwardNeed', forwardNeedSchema);