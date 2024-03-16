const express = require("express");
const routes = express.Router();
const employeeRoutes = require('./admin/employee');
const initilization = ()=>{
web()
Employee()
}

const web =()=>{

}
const Employee =() =>{
    routes.use('/admin/employee',employeeRoutes)
    
}

initilization()

module.exports = routes;