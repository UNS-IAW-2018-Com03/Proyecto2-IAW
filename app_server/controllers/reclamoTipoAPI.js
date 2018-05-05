const mongoose = require('mongoose');
const ReclamoTipo = require('../models/reclamoTipo');

const getReclamosTipo = function(req,res){
  ReclamoTipo
            .find()
            .exec((err,reclamosTipo) =>{
              if(err)
                res.status(404).json(err);
              else{
                res.status(201).json(reclamosTipo);
              }
            })
}

module.exports = {
  getReclamosTipo
};
