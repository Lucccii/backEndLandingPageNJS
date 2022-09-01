const mongoose = require('mongoose');

const ModelSchema = mongoose.Model({
    title : {Type : String, require:true},
    description : {Type : String, require:true},
    imageUrl : {Type : String, require:true},
    userId : {Type : String, require:true},
    number : {Type : Number, require:true},
});

modules.exports = mongose.model("Things", ModelSchema);