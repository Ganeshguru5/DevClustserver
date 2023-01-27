const mongoose = require('mongoose');
const DeployBlog = mongoose.Schema(
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
    {collection : 'Deployblog_data'}
)

const model = mongoose.model('DeployBlogData', DeployBlog);
module.exports=model;