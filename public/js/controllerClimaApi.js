
/*Funcion que consulta Web Api Clima*/
function consultarClima(lat,lng){
	$.get("/clima?lat="+lat+"&lng="+lng,function(data,status){
		if(data !== null){
      var jsonData = JSON.parse(data);
      var temp = Math.trunc(parseInt(jsonData.main.temp) - 273.15);
      var ciudad = jsonData.name;
      mostrarClima(ciudad,temp);
		}
	});
}
