const mongoose = require('mongoose');
const Api=mongoose.Schema(
    {
        username:{
            type:String,
            require:true,
        },
        ApiName:{
            type:String,
            require:true,
        },
        ApiKey:{
            type:String,
            require:true,
        }
    },
    {collection:'api_data'}
)

const model = mongoose.model('ApiData',Api)
module.exports=model;