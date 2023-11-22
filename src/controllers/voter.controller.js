const Voter = require('../models/Voter.model');
const User = require('../models/User.model');
const ErrorResponse = require('../utils/errorResponse');
const mongoose = require('mongoose')

exports.getAll = async (req, res, next) => {
  try {
    const user_uid = req.authUser.uid;
    const user = await User.findOne({user_id: user_uid})
    if(!user) return next(new ErrorResponse('Usuario no encontrado', 404))
    const voters = await Voter.find();
    res.status(200).json(voters);
  } catch (error) {
    next(error)
  }
};

exports.getOne = async (req, res, next) => {
  try {
    const {id} = req.params;
    const voter = await Voter.findById(id);
    if(!voter) return next(new ErrorResponse("Votante no encontrado", 404));
    res.status(200).json(voter)
  } catch (error) {
    next(error)
  }
};

// exports.createOne = async (req, res, next) => {
//   try {
//     const member = await Members.create(req.body);
//     res.status(201).json(member)
//   } catch (error) {
//     next(error)
//   }
// };

// exports.updateOne = async (req, res, next) => {
//   try {
//     const {voto, correo, observacion, calificativo, matricula, ELLOSnos, INHABnos} = req.body;
//     const {id} = req.params;
//     const member = await Members.findByIdAndUpdate(id,{
//       voto,
//       correo,
//       observacion,
//       calificativo,
//       matricula,
//       INHABnos,
//       ELLOSnos
//     },{new:true});
//     if(!member) return next(new ErrorResponse("miembro no encontrado", 404));
//     const members = await Members.find();
//     res.status(200).json(members);
//   } catch (error) {
//     next(error)
//   }
// };
