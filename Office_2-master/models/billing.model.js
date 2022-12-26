import mongoose from "mongoose";

const Schema = mongoose.Schema

const billingSchema = new Schema({
    name: String,
    team: String,
    reportDate: Date,
    empId: String,
    batch: String,
    associated:{
        annotation: Number,
        qc: Number,
        pm: Number,
        total: Number
    },
    hours:{
        annotation: Number,
        qc: Number,
        pm: Number,
        training: Number,
        ojt: Number,
        qcFeedback: Number,
        other: Number,
        idle: Number,
        total: Number,
        comments: String
    },
    jobs:{
        annotation: Number,
        qc: Number,
        total: Number
    }
},{
    timestamps: true
})

const Billing = mongoose.model('Billing',billingSchema)

export default Billing