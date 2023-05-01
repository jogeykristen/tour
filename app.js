const express = require('express');

const app = express();
const userRouter = require('./routes/userRoutes')
const companyRouter = require('./routes/companyRoutes')
const tourRouter = require('./routes/tourRoutes')
const{myLogger} = require('./middleware/date')

app.use(express.json());
app.use('/api/user', userRouter);
app.use('/api/company', companyRouter);
app.use('/api/tour', tourRouter);

app.use(myLogger);

module.exports = app;