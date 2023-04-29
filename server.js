const mongoose = require('mongoose');
const http = require('http');
const app = require('./app');
require('dotenv').config();


mongoose.connect(process.env.MONGODB_URL_LOCAL,
  {
    useNewUrlParser: true,
    //useFindAndModify: false,
    useUnifiedTopology: true
  }
).then(()=>(console.log("DB connected")))
.catch((err)=>(console.log("connection failed")));


const port = process.env.PORT
// const server = http.createServer((req, res) => {
//     res.statusCode = 200;
//   });

app.listen(port, ()=>{
    console.log(`server running at port `+process.env.PORT)
})