const mongoose = require('mongoose');
const ReclamoRealizado = mongoose.model('reclamoRealizado');

const getReclamosRealizados = function(req,res){
  ReclamoRealizado
            .findById(req.user._id)
            .exec((err,reclamo) =>{
              if(err)
                res.status(404).json(err);
              else{
                res.status(200).json(reclamo);
              }
            })
}

const setReclamoRealizado = function(req,res) {
  ReclamoRealizado
          .update({_id: req.user._id},{tipo: req.body.tipo,descipcion: req.body.descripcion,coords: req.body.coords,},
                  {upsert: true, setDefaultOnInsert: true}, (err,reclamo) => {
                    if(err)
                      res.status(404).json(err);
                    else{
                      res.status(201).json(reclamo);
                    }
                  })

}

module.exports ={
  getReclamosRealizados, setReclamoRealizado
};
