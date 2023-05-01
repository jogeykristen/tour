module.exports.myLogger = async(req, res, next)=> {
    const currentDate = new Date().toLocaleString();
    req.currentDate = currentDate;
    next()
  }