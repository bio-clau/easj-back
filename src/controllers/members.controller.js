const { findByIdAndUpdate } = require('../models/Members.model');
const Members = require('../models/Members.model');
const ErrorResponse = require('../utils/errorResponse');

exports.getAll = async (req, res, next) => {
  try {
    const members = await Members.find();
    if(members.length < 1) return next(new ErrorResponse(404, "Miembros no encontrados"));
    res.status(200).json(members);
  } catch (error) {
    next(error)
  }
};

exports.getOne = async (req, res, next) => {
  try {
    const {id} = req.params;
    const member = await Members.findById(id);
    if(!member) return next(new ErrorResponse(404, "Miembro no encontrado"));
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
    const {voto, correo, observacion, calificativo} = req.body;
    const {id} = req.params;
    const member = await Members.findByIdAndUpdate(id,{
      voto,
      correo,
      observacion,
      calificativo
    },{new:true});
    if(!member) return next(new ErrorResponse(404, "miembro no encontrado"));
    const members = await Members.find();
    res.status(200).json(members);
  } catch (error) {
    next(error)
  }
};