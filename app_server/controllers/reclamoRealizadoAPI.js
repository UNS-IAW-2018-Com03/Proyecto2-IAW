const mongoose = require('mongoose');
const ReclamoRealizado = require('../models/reclamoRealizado');

const getReclamosRealizados = function(req,res){
  ReclamoRealizado
            .find({user: req.user._id})
            .exec((err,reclamo) =>{
              if(err)
                res.status(404).json(err);
              else{
                res.status(200).json(reclamo);
              }
            })
}

const setReclamoRealizado = function(req,res) {
  reclamoRealizado = new ReclamoRealizado();
  reclamoRealizado.titulo = req.body.titulo;
  reclamoRealizado.imagen = req.body.imagen;
  reclamoRealizado.descripcion = req.body.descripcion;
  reclamoRealizado.latitud = req.body.latitud;
  reclamoRealizado.longitud = req.body.longitud;
  reclamoRealizado.fecha = req.body.fecha;
  reclamoRealizado.user = req.user._id;
  reclamoRealizado
          .save(function(err){
                    if(err){
                      res.status(404).json(err);
                      }
                    else{
                      res.status(201).json(reclamoRealizado);
                    }
                  })

}

module.exports ={
  getReclamosRealizados, setReclamoRealizado
};
