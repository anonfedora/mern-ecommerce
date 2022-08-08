const express = require('express')
const app = express();
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const path = require('path');
const errorMiddleware = require('./middleware/error');
const cors = require("cors");
//config
// dotenv.config({path: "backend/config/config.env"});
if (process.env.NODE_ENV !== "PRODUCTION"){
  require("dotenv").config({path: "backend/config/config.env"});
}
app.use(cors());

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: true}));
app.use(fileUpload());
//Route imports
const user = require("./routes/userRoute");
const product = require("./routes/productRoute");
const order = require("./routes/orderRoute");

//Routes middleware
app.use("/api/v1", user);
app.use("/api/v1", product);
app.use("/api/v1", order);


app.use(express.static(path.join(__dirname, '../frontend/build')));

// app.get("*", (req, res)=> {
//   res.sendFile(path.resolve(__dirname, "../frontend/build/index.html"));
// });

app.use(errorMiddleware);
// app.use((err, req, res, next)=> {
//   const errorStatus = err.status || 500;
//   const errorMessage = err.message  || "Something went wrong!";
//   return res.status(errorStatus).json({
//     success: false,
//     status: errorStatus,
//     message: errorMessage,
//     stack: err.stack,
//   });
// })

module.exports = app;
