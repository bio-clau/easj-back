const User = require('../models/User.model');
const Likes = require('../models/User.model');
const ErrorResponse = require('../utils/errorResponse');
const Voter = require('../models/Voter.model');
const mongoose = require('mongoose');

exports.getOne = async (req, res, next)=>{
  try {
    const {user_id} = req.params;
    if(!user_id){
      return next(new ErrorResponse("Se necesita el id del usuario", 400));
    }
    const userLikes = await User.findOne({user_id});
    if(!userLikes){
      return next(new ErrorResponse('usuario no encontrado', 404));
    }
    res.status(200).json(userLikes)
  } catch (error) {
    return next(error)
  }
}

exports.createOne = async (req, res, next)=>{
  try {
    const {role, user_id} = req.body;
    if(!user_id){
      return next(new ErrorResponse("Se necesita el id del usuario", 400))
    }
    const newLikes = await Likes.create({user_id, role});
    res.status(201).json(newLikes)
  } catch (error) {
    return next(error)
  }
}

exports.updateOne = async (req, res, next)=>{
  try {
    // const {user_id} = req.params;
    const user_uid = req.authUser.uid;
    const {
      _id,
      member_id,
      calificativo,
      ELLOSnos,
      INHABnos,
      observacion,
      telefono
    } = req.body;
    let newVoterInfo = [];
    let aux = await User.findOne({user_id: user_uid})
    const existe = aux.voter_info.filter(v=>`${v.member_id}`=== `${member_id}`)
     if(existe.length>0){
       newVoterInfo = aux.voter_info.map(info=>{
        if(`${info.member_id}` === `${member_id}`){
            info.member_id= member_id,
            info.calificativo= calificativo,
            info.ELLOSnos= ELLOSnos,
            info.INHABnos= INHABnos,
            info.observacion= observacion,
            info.telefono= telefono
        }
        return info
       })
     } else {
      newVoterInfo = [...aux.voter_info];
      newVoterInfo.push(
        {member_id: mongoose.Types.ObjectId(_id),
          calificativo,
          ELLOSnos: !!ELLOSnos,
          INHABnos: !!INHABnos,
          observacion,
          telefono}
      ) 
     }
     console.log("🚀 ~ file: user.controller.js ~ line 60 ~ newVoterInfo ~ newVoterInfo", newVoterInfo)
    aux.voter_info = newVoterInfo;
    await aux.save();
    const voters = await Voter.find();
    const rta = voters.map(v=>{
      let auxiliar = aux.voter_info.filter(val=>`${val.member_id}` === `${v._id}`)
      let item= {
        documento: v.documento,
        apellidoNombre: v.apellidoNombre,
        matricula: v.matricula,
        voto: v.voto,
        n: v.n,
        member_id: auxiliar[0]?.member_id,
        calificativo: auxiliar[0]?.calificativo,
        ELLOSnos: auxiliar[0]?.ELLOSnos,
        INHABnos: auxiliar[0]?.INHABnos,
        observacion: auxiliar[0]?.observacion,
        telefono: auxiliar[0]?.telefono 
      }
      return item
    })

    res.status(200).json(rta)
  } catch (error) {
    return next(error)
  }
}

// exports.deleteOne = async ()=>{}