const Employee = require("../../../models/employee");

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { env } = require("../../../environments/env");




exports.employeeLogin = async (req, res, next) => {
  try {
    const {email , password} = req.body;
    const employee = await Employee.findOne({email})
    console.log(password,employee.password)
    const isMatched = await bcrypt.compare(password, employee.password);
    console.log(isMatched)
        if (isMatched) {
            const token = jwt.sign(
                { _id: employee._id, email: employee.email },
                env().jwt_secret
            );
            employee.password = null
            if (!token) {
              throw new Error('Unable to login the user')
            }
            res.send({ status: 200, message: "User Login successfully", data: { employee ,token } });
        } else {
            res.send({ status: 401, message: "Invalid email or password", data: {} });
        }
  } catch (error) { 
    res.status(400).send({
      statusText: "BAD REQUEST",
      status: 400,
      message: error.message || "Getting error while employee login ",
      data: {},
    });
  }
};

exports.addEmployee = async(req, res, next) => {
  try {
    const {name,  email, phone , password ,role } = req.body;
      console.log(req.body)
    const checkEmailExists = await Employee.findOne({ email })
    if (checkEmailExists) {
      throw new Error('Email already in use')
    }
    const checkPhoneExists = await Employee.findOne({ phone })
    if (checkPhoneExists) {
      throw new Error('Phone number already in use')
    }
    const hashedPassword = await bcrypt.hash(password , 10);
    const registration = new Employee({
      name: name,
      email: email,
      phone:phone,
      password: hashedPassword,
      status: true,
      role: role=='Owner'?'Admin':role=='Admin'?'SubAdmin':role=='Hr'?'Hr':'Employee',
    });

    const employee =registration.save();
    employee .password =null;
   
    return res.status(201).send({
      statusText: "CREATED",
      status: 201,
      message: "employee registered successfully.",
      data: { employee },
    });
  } 
  catch (error) {   
    res.status(400).send({
      statusText: "BAD REQUEST",
      status: 400,
      message: error.message || "Getting error while registering employee",
      data: {},
    });
  }
};

exports.employeeDetails = async (req, res, next) => {
  try {
    
    const employee = await Employee.findById({_id: req?.params?.id});
    return res.status(200).send({
      statusText: "OK",
      status: 200,
      message: "employee data displayed",
      data: { employee },
    });
  } catch (error) {
    res.status(400).send({
      statusText: "BAD REQUEST",
      status: 400,
      message: error.message || "Getting error while geting  employee",
      data: {},
    });
  }
};

exports.employeeUpdate = async (req, res, next) => {
  try {
    const data  = req.body;    
    const employee = await Employee.findByIdAndUpdate({_id: req?.params?.id},data);
    
    
    return res.status(200).send({
      statusText: "OK",
      status: 200,
      message: "employee data updated",
      data: { employee },
    });
  } catch (error) {
    res.status(400).send({
      statusText: "BAD REQUEST",
      status: 400,
      message: error.message || "Getting error while updating  employee",
      data: {},
    });
  }
}

exports.employeeDelete = async (req, res, next) => {
  try {
    const employee = await Employee.findByIdAndDelete({ _id: req?.params?.id });
    return res.status(200).send({
      statusText: "OK",
      status: 200,
      message: "employee data deleted",
      data: { employee },
    });
  } catch (error) {
    res.status(400).send({
      statusText: "BAD REQUEST",
      status: 400,
      message: error.message || "Getting error while deleting  employee",
      data: {},
    });
  }
};
