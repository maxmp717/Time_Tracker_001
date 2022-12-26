import mongoose from "mongoose";
import moment from 'moment';

const Schema = mongoose.Schema

const analystSchema = new Schema({
    name: String,
    team: {
        type: String,
        required: true
      },
    empId: String,
    TotalTime: Number,
    ActiveTime: Number,
    EntityTime: Number,
    week:{type: Number, default:()=>moment().format("W")},
    createdAt:{type:Date,default:()=>moment().format('M D YYYY')}
})

const Analyst = mongoose.model('Analyst',analystSchema)

export default Analyst;