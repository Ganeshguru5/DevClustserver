const mongoose = require('mongoose');
const Notes=mongoose.Schema(
    {
        username:{
            type:String,
            require:true,
        },
        title:{
            type:String,
            require:true,
        },
        notes:{
            type:String,
            require:true,
        },
    },
    {collection:'notes_data'}
)

const model = mongoose.model('NotesData',Notes)
module.exports=model;