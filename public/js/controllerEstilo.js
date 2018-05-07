
/*
Funcion que carga el stilo que el usuario seleccionó
*/
$(function(){
	$.get("./estilo",function(data,status){
    var jsonData = data;
		var estilo = jsonData.estilo;
    var estiloMapa = jsonData.estiloMapa;
		if(estilo !== null){
			$("#linkEstilo").attr("href",estilo);
		}
    if(estiloMapa !== null){
      cambiarEstilo(estiloMapa);
    }
	});
});


/*
Funcion que cambia el estilo del css a noche
*/
function cambiarNoche(){
	//Guarda el estilo en el server
	$.ajax({
	    url: './estilo',
	    type: 'POST',
	    data: JSON.stringify({estilo: "css/darkstyle.css", estiloMapa: "1"}),
    	contentType: "application/json",
    	dataType: "json",
	    success: function(data){
					localStorage.setItem("Estilo","css/darkstyle.css");
					localStorage.setItem("NumEstilo",1);
					//Cambio estilo
					cambiarEstilo(1);
					$("#linkEstilo").attr("href","css/darkstyle.css");
	    },
	    error: function(data) {
				console.log("POST ERR");
	    }
	});
}

/*
Funcion que cambia el estilo css al dia
*/
function cambiarDia(){
	//Guarda el estilo en el server
	$.ajax({
	    url: './estilo',
	    type: 'POST',
	    data: JSON.stringify({estilo: "css/lightstyle.css", estiloMapa: "2"}),
    	contentType: "application/json",
    	dataType: "json",
	    success: function(data){
					localStorage.setItem("Estilo","css/lightstyle.css");
					localStorage.setItem("NumEstilo",2);
					//Cambio estilo
					cambiarEstilo(2);
					$("#linkEstilo").attr("href","css/lightstyle.css");
	    },
	    error: function(data) {
				console.log("POST ERR");
	    }
	});
}

/*
Funcion que cambia el mapa al día
*/
function dia(map){
	var styledMapLight = new google.maps.StyledMapType(
			[{"elementType":"geometry","stylers":[{"color":"#ebe3cd"}]},{"elementType":"labels.text.fill","stylers":[{"color":"#523735"}]},{"elementType":"labels.text.stroke","stylers":[{"color":"#f5f1e6"}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#c9b2a6"}]},{"featureType":"administrative.land_parcel","elementType":"geometry.stroke","stylers":[{"color":"#dcd2be"}]},{"featureType":"administrative.land_parcel","elementType":"labels.text.fill","stylers":[{"color":"#ae9e90"}]},{"featureType":"landscape.natural","elementType":"geometry","stylers":[{"color":"#dfd2ae"}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#dfd2ae"}]},{"featureType":"poi","elementType":"labels.text.fill","stylers":[{"color":"#93817c"}]},{"featureType":"poi.park","elementType":"geometry.fill","stylers":[{"color":"#a5b076"}]},{"featureType":"poi.park","elementType":"labels.text.fill","stylers":[{"color":"#447530"}]},{"featureType":"road","elementType":"geometry","stylers":[{"color":"#f5f1e6"}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#fdfcf8"}]},{"featureType":"road.highway","elementType":"geometry","stylers":[{"color":"#f8c967"}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#e9bc62"}]},{"featureType":"road.highway.controlled_access","elementType":"geometry","stylers":[{"color":"#e98d58"}]},{"featureType":"road.highway.controlled_access","elementType":"geometry.stroke","stylers":[{"color":"#db8555"}]},{"featureType":"road.local","elementType":"labels.text.fill","stylers":[{"color":"#806b63"}]},{"featureType":"transit.line","elementType":"geometry","stylers":[{"color":"#dfd2ae"}]},{"featureType":"transit.line","elementType":"labels.text.fill","stylers":[{"color":"#8f7d77"}]},{"featureType":"transit.line","elementType":"labels.text.stroke","stylers":[{"color":"#ebe3cd"}]},{"featureType":"transit.station","elementType":"geometry","stylers":[{"color":"#dfd2ae"}]},{"featureType":"water","elementType":"geometry.fill","stylers":[{"color":"#b9d3c2"}]},{"featureType":"water","elementType":"labels.text.fill","stylers":[{"color":"#92998d"}]}],
            {name: 'Styled Map Light'});
	//Associate the styled map with the MapTypeId and set it to display.
        map.mapTypes.set('Styled Map Light', styledMapLight);
        map.setMapTypeId('Styled Map Light');
}

/*
Funcion que cambia el mapa a noche
*/
function noche(map){
	var styledMapNight = new google.maps.StyledMapType(
		[{"elementType":"geometry","stylers":[{"color":"#242f3e"}]},{"elementType":"labels.text.fill","stylers":[{"color":"#746855"}]},{"elementType":"labels.text.stroke","stylers":[{"color":"#242f3e"}]},{"featureType":"administrative.locality","elementType":"labels.text.fill","stylers":[{"color":"#d59563"}]},{"featureType":"poi","elementType":"labels.text.fill","stylers":[{"color":"#d59563"}]},{"featureType":"poi.park","elementType":"geometry","stylers":[{"color":"#263c3f"}]},{"featureType":"poi.park","elementType":"labels.text.fill","stylers":[{"color":"#6b9a76"}]},{"featureType":"road","elementType":"geometry","stylers":[{"color":"#38414e"}]},{"featureType":"road","elementType":"geometry.stroke","stylers":[{"color":"#212a37"}]},{"featureType":"road","elementType":"labels.text.fill","stylers":[{"color":"#9ca5b3"}]},{"featureType":"road.highway","elementType":"geometry","stylers":[{"color":"#746855"}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#1f2835"}]},{"featureType":"road.highway","elementType":"labels.text.fill","stylers":[{"color":"#f3d19c"}]},{"featureType":"transit","elementType":"geometry","stylers":[{"color":"#2f3948"}]},{"featureType":"transit.station","elementType":"labels.text.fill","stylers":[{"color":"#d59563"}]},{"featureType":"water","elementType":"geometry","stylers":[{"color":"#17263c"}]},{"featureType":"water","elementType":"labels.text.fill","stylers":[{"color":"#515c6d"}]},{"featureType":"water","elementType":"labels.text.stroke","stylers":[{"color":"#17263c"}]}],
		{name: 'Styled Map Night'});
	//Associate the styled map with the MapTypeId and set it to display.
        map.mapTypes.set('Styled Map Night', styledMapNight);
        map.setMapTypeId('Styled Map Night');
}

/*
Funcion que cambia el mapa a el estilo noche si se ingresa un 1, en caso contrario lo cambia a dia
*/
function cambiarEstilo(num){
	//Veo con cual estilo de mapa lo inicializo
		if(num == 1){
			noche(map);
		}
		else{
			dia(map);
		}
}

/*
Funcion que se ejecuta cuando se carga en body, que inicializa estilo css guardado, estilo del mapa y los marcadores
*/
function inicializar(){
	initMap(2);
}
