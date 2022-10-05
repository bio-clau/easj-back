require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const errorHandler = require('./middlewares/errorMiddleware');
const connectDB = require('./config/db');

//Initialize DB and express
connectDB();
const app = express();

//middlewares
app.use(morgan('dev'));
app.use(
  cors({
    origin: process.env.CLIENT_API,
    credentials: true
  })
);
app.use(express.json());
app.use(express.urlencoded({extended: false}));

//Routes
app.use('/api/members', require('./routes/members.routes'))
//error handler
app.use(errorHandler);
//server
const PORT = process.env.PORT || 8000
const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
})

//inhandledRejection prettier :P
process.on("unhandledRejection", (err, promise) => {
  console.log(`Logged error: ${err}`);
  //Stops the server from accepting new connections and keeps existing connections.
  server.close(() => {
    process.exit(1);
  });
});