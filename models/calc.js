const mongoose = require('mongoose')
const Schema = mongoose.Schema
const CalcSchema = new Schema({
  numA: Number,
  numB: Number,
  operator: String,
  result: Number
})
const CalcModel = mongoose.model('Calc', CalcSchema)
module.exports = CalcModel