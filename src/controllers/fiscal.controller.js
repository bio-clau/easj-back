const Voter = require('../models/Voter.model');
const ErrorResponse = require('../utils/errorResponse');

exports.getVoters = async(req, res, next) => {
  try {
    const voters = await Voter.find();
    res.status(200).json(voters)
  } catch (error) {
    return next(error)
  }
}

exports.updateVoto = async (req, res, next) => {
  try {
    const {voter_id} = req.params;
    const {voto} = req.query;
    let voter = await Voter.findById(voter_id);
    if(voto === 'true') {
      voter.voto = true;
    }else {
      voter.voto = false
    }
    await voter.save();
    const voters = await Voter.find();
    res.status(200).json(voters)
  } catch (error) {
    return next(error)
  }
}