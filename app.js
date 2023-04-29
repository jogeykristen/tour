const express = require('express');

const app = express();
const userRouter = require('./routes/userRoutes')
const companyRouter = require('./routes/companyRoutes')
const tourRouter = require('./routes/tourRoutes')


app.use(express.json());
app.use('/api/user', userRouter);
app.use('/api/company', companyRouter);
app.use('/api/tour', tourRouter);

module.exports = app;