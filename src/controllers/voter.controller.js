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
    const rta = voters.map(v=>{
      let aux = user.voter_info.filter(val=>`${val.member_id}` === `${v._id}`)
      let item= {
        _id: v._id,
        documento: v.documento,
        apellidoNombre: v.apellidoNombre,
        matricula: v.matricula,
        voto: v.voto,
        n: v.n,
        info_id: aux[0]?._id,
        member_id: aux[0]?.member_id,
        calificativo: aux[0]?.calificativo,
        ELLOSnos: aux[0]?.ELLOSnos,
        INHABnos: aux[0]?.INHABnos,
        observacion: aux[0]?.observacion,
        telefono: aux[0]?.telefono 
      }
      return item
    })
    res.status(200).json(rta);
  } catch (error) {
    next(error)
  }
};

exports.getOne = async (req, res, next) => {
  try {
    const {id} = req.params;
    const member = await Members.findById(id);
    if(!member) return next(new ErrorResponse("Miembro no encontrado", 404));
    res.status(200).json(member)
  } catch (error) {
    next(error)
  }
};

exports.createOne = async (req, res, next) => {
  try {
;
    const member = await Members.create(req.body);
    res.status(201).json(member)
  } catch (error) {
    next(error)
  }
};

exports.updateOne = async (req, res, next) => {
  try {
    const {voto, correo, observacion, calificativo, matricula, ELLOSnos, INHABnos} = req.body;
    const {id} = req.params;
    const member = await Members.findByIdAndUpdate(id,{
      voto,
      correo,
      observacion,
      calificativo,
      matricula,
      INHABnos,
      ELLOSnos
    },{new:true});
    if(!member) return next(new ErrorResponse("miembro no encontrado", 404));
    const members = await Members.find();
    res.status(200).json(members);
  } catch (error) {
    next(error)
  }
};
