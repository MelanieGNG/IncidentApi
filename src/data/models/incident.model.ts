import mongoose from "mongoose";

const incidentSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    descrption:{
        type: String,
        required: true
    },
    lat:{
        type: Number,
        required: true
    },
    lng:{
        type: Number,
        required: true
    },
    isEmailSent:{
        type: Boolean,
        default: false
    }
});



export const InicidentModel = mongoose.model("Incident", incidentSchema)