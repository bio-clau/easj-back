const admin = require('../config/firebase');

exports.auth = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  try {
    const decodeValue = await admin.auth().verifyIdToken(token);
    if(decodeValue) {
      req.authUser = decodeValue;
      return next()
    } else {
      res.status(403).json({msg: 'Acceso no autorizado.'})
    }
  } catch (error) {
    res.status(500).json({msg: 'Internal error'})
  }
}