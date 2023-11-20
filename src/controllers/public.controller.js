
exports.status = async (req, res, next)=>{
  try {
    res.status(200)
  } catch (error) {
    return next(error)
  }
}




