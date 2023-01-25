const mongoose = require('mongoose');
const Blog = mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
        },
        title:{
            type:String,
            required:true,
        },
        html:{
            type: String,
            required: true,
        },
        css:{
            type: String,
            required: true,
        },
        js:{
            type: String,
            required: true,
        },
        date:{
            type: String,
            required: true,
        }
    },
    {collection : 'blog_data'}
)

const model = mongoose.model('BlogData', Blog);
module.exports=model;