const mongoose = require('mongoose');
const Code=mongoose.Schema(
    {
        username:{
            type:String,
            require:true,
        },
        title:{
            type:String,
            require:true,
        },
        code:{
            type:String,
            require:true,
        },
        language:{
            type:String,
            require:true,
        }
    },
    {collection:'codes_data'}
)

const model = mongoose.model('codesData',Code)
module.exports=model;