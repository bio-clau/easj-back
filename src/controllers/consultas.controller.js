const User = require('../models/User.model')
const Voter = require('../models/Voter.model')
const ErrorResponse = require('../utils/errorResponse')


exports.consulta = async (req, res, next) => {
  try {
    const {user_id} = req.params;
    
    const user = await User.findOne({user_id});
    if(!user) return next(new ErrorResponse('Usuario no encontrado', 404))
    const voters = await Voter.find();
    let resp = []
    const rta = voters.map(v=>{
      let aux = user.voter_info.filter(val=>`${val.member_id}` === `${v._id}`)
      if(aux.length>0) {
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
        resp.push(item)
      }
    })
    
    res.status(200).json(resp);
  } catch (error) {
    return next(error)
  }

}

exports.consultaAll = async (req, res, next) => {
  try {
    const voters = await Voter.find();
    res.status(200).json(voters);
  } catch (error) {
    return next(error)
  }
}