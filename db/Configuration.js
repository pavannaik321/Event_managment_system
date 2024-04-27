// src/config.js

const mongoose = require('mongoose');

const mongoURI = "mongodb+srv://EventManagementDB:EventManagementDB@clusterv1.15umtkt.mongodb.net/?retryWrites=true&w=majority&appName=ClusterV1";


module.exports = () => {
  const connectionParams = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };

  try {
    mongoose.connect(mongoURI);
    console.log("connected to database successfully");
  } catch (error) {
    console.log("could not connect to database");
  }
};