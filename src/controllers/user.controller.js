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
    let newInfo = {
      _id,
      member_id,
      calificativo,
      observacion,
      telefono
    };
    if(calificativo === 'ELLOS'){
      newInfo.ELLOSnos = ELLOSnos;
      newInfo.INHABnos = false;
    }
    if(calificativo === 'INHAB') {
      newInfo.INHABnos = INHABnos;
      newInfo.ELLOSnos = false;
    }
    let newVoterInfo = [];
    console.log(newInfo);
    let aux = await User.findOne({user_id: user_uid})
    const existe = aux.voter_info.filter(v=>`${v.member_id}`=== `${_id}`)
     if(existe.length>0){
       newVoterInfo = aux.voter_info.map(info=>{
        if(`${info.member_id}` === `${_id}`){
            info.member_id= newInfo.member_id,
            info.calificativo= newInfo.calificativo,
            info.ELLOSnos= !!newInfo.ELLOSnos,
            info.INHABnos= !!newInfo.INHABnos,
            info.observacion= newInfo.observacion,
            info.telefono= newInfo.telefono
        }
        return info
       })
     } else {
      newVoterInfo = [...aux.voter_info];
      newVoterInfo.push(
        {member_id: mongoose.Types.ObjectId(_id),
          calificativo: newInfo.calificativo,
          ELLOSnos: !!newInfo.ELLOSnos,
          INHABnos: !!newInfo.INHABnos,
          observacion: newInfo.observacion,
          telefono: newInfo.telefono
      }
      ) 
     }
    aux.voter_info = [...newVoterInfo];
    await aux.save();
    const voters = await Voter.find();
    const rta = voters.map(v=>{
      let auxiliar = aux.voter_info.filter(val=>`${val.member_id}` === `${v._id}`)
      let item= {
        _id: v._id,
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