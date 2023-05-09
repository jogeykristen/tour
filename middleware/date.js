module.exports.myLogger = async(req, res, next)=> {
  req.currentDate = new Date().toTimeString();
    next()
  }