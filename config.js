require("dotenv").config();
const configuration = {
  mongodbURL: process.env.MONGODB_URL
};

module.exports = configuration;
