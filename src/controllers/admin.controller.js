const User = require('../models/User.model');
const Voter = require('../models/Voter.model');
const ErrorResponse = require('../utils/errorResponse');

exports.getUsers = async (req, res, next) => {
  try {
    const users = await User.find({
      $and: [
        {user_name: {$not: {$eq: 'Admin'}}},
        {role:{$eq: 'carga'}}
      //   {user_name: {$not: {$eq: 'Tropura'}}}
      ]
    }).select('user_name _id user_id');
    res.status(200).json(users)
  } catch (error) {
    return next(error)
  }
}

exports.getUserVoter = async (req, res, next) => {
  try {
    const {user_id} = req.params;
    const user = await User.findById(user_id);
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
    return next(error)
  }
}

exports.getVoterNoUser = async (req, res, next) => {
  try {
    const voters = await Voter.find();
    const rta = voters.map(v=>{
      let item= {
        _id: v._id,
        documento: v.documento,
        apellidoNombre: v.apellidoNombre,
        matricula: v.matricula,
        voto: v.voto,
        n: v.n,
        member_id: '',
        calificativo: '',
        ELLOSnos: '',
        INHABnos: '',
        observacion: '',
        telefono: '' 
      }
      return item
    })
    res.status(200).json(rta);

  } catch (error) {
    return next(error)
  }
}