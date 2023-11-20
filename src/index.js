require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const errorHandler = require('./middlewares/errorMiddleware');
const connectDB = require('./config/db');
const {auth} = require('./middlewares/protect');

//Initialize DB and express
connectDB();
const app = express();
 
//middlewares
app.use(morgan('dev'));
app.use(cors({
  origin: '*',
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
  });

//Routes
app.use('/api', require('./routes/public.routes'))
app.use('/api/voter', auth, require('./routes/voter.routes'))
app.use('/api/user', auth, require('./routes/user.routes'))
app.use('/api/admin', auth, require('./routes/admin.routes'))
app.use('/api/fiscal', auth, require('./routes/fiscal.routes'))
app.use('/api/consultas', require('./routes/consultas.routes'))
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