require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const Routes = require('../routes/routes');
const { env } = require("../environments/env");

const initilization = () => {
  setupCors();
  setupDatabase();
  setupBodyParser(); // Filter the request
  setupRoutes();
  setupError404Handler();
  setupErrorHandler();
};

const setupCors = () => {
  app.use(
    cors({
      origin: true,
      credentials: true,
    })
  );
};

const setupBodyParser = () => {
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
};
const setupDatabase = () => {
  mongoose
    .connect(env()?.MONGO_URI)
    .then((r) => {
      console.log("Connected to Database");
    })
    .catch((e) => {
      console.error("Error Connecting to Database", e);
    });
};

const setupRoutes =()=>{
    app.use("/api/v1", Routes)
}

const setupError404Handler=()=>{
    app.use((req,res)=>{
        res.status(404).send({
            statusText:'Failure',
            status:404,
            message:'Not Found',
            data:{}
        });
    })
}
const setupErrorHandler=()=>{
    app.use((error,req,res,next)=>{
      console.log('error',error,req)
        res.status(req.errorStatus||500).send({
            statusText:'Failure',
            status:req.errorStatus||500,
            message:error.message ||'Something went wrong. Please try again later.',
            data:{}
        });
    })
}

initilization();

module.exports = app;