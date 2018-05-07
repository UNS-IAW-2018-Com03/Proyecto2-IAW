const request = require("request");


const getClima = function(req,res){
  var lat = req.query.lat;
  var lng = req.query.lng;
  request('http://api.openweathermap.org/data/2.5/weather?lat='+lat+'&lon='+lng+'&appid=8d9e29757db3709bf5a30dccdc7bc6ec', function(error, response, body) {
    if(error){
      res.status(404).json(error);
    }
    else {
      res.status(200).json(body);
    }
  });
}


module.exports = {
  getClima
}
