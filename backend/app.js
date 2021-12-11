const express = require("express");
const app = express();
var cors = require("cors");
const config = require('./config')
const bodyParser = require('body-parser');
const userRoutes = require("./routes/user-routes");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.use('/podcast',userRoutes.routes)

app.listen(5000, () => {
    console.log("SERVER STARTED");
  });

