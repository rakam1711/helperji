const Mongoose = require("mongoose");
const aggregatePaginate = require("mongoose-aggregate-paginate-v2");

const employeeSchema = new Mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  phone:{
    type:Number,
    unique:true,
    required:true
  },
  password: {
    type: String,
    required: true,
  },
  status: {
    type: Boolean,
    default: true
  },
  role: {
    type: String,
    enum: ["Admin","SubAdmin", "Hr","Employee"],
    default: "Admin",
  },
  createdOn: {
    type: Date,
    default: Date.now,
  },
  updatedOn: {
    type: Date,
    default: Date.now,
  },
});
employeeSchema.plugin(aggregatePaginate);
const Employee = Mongoose.model("Employee",employeeSchema);
module.exports = Employee
