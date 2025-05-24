import mongoose from "mongoose";

const imageSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true
    },

    description: {
        type: String,
        require:true
    },

    url: {
        type: String,
        require: true
    }
})

export default mongoose.model('picture', imageSchema)