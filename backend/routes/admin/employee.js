const express = require("express");
const employeeRoutes = express.Router();
const {addEmployee,employeeDetails , employeeUpdate , employeeDelete ,employeeLogin } = require('../../controllers/admin/employee/adminEmployeeController');

const globlemiddleware = require('../../middlewares/globlemiddleware');

function initilization() {
    getRoutes();
    postRoutes();
    putRoutes();
    patchRoutes();
    deleteRoutes();
}

initilization();

function getRoutes() {
    employeeRoutes.get('/employeeDetails/:id',globlemiddleware.ractifyError , employeeDetails);
    // employeeRoutes.get('/employeeList',globlemiddleware.ractifyError , listingContacts);

    
}

function postRoutes() {
    employeeRoutes.post('/addEmployee',globlemiddleware.ractifyError,addEmployee);
    employeeRoutes.post('/loginEmployee',globlemiddleware.ractifyError,employeeLogin);
}

function putRoutes() {

}

function patchRoutes(){
    employeeRoutes.patch('/updateEmployee/:id',globlemiddleware.ractifyError , employeeUpdate)
}
function deleteRoutes(){
    employeeRoutes.delete('/deleteEmployee/:id' ,globlemiddleware.ractifyError , employeeDelete )
}

module.exports = employeeRoutes;