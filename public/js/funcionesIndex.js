
var map;
var jsonReclamo;
var latitud, longitud;

/*
Funcion que carga el stilo que el usuario seleccionó
*/	
$(function(){
	var estilo = localStorage.getItem("Estilo");
	if(estilo !== null){
		$("#linkEstilo").attr("href",estilo);
	}
	else {
		$("#linkEstilo").attr("href","css/lightstyle.css");
	}
});

/*
Funcion que se ejecuta cuando se carga en body, que inicializa estilo css guardado, estilo del mapa y los marcadores
*/
function inicializar(){
	var num = localStorage.getItem("NumEstilo");
	if(num !== null){
		initMap(num);
	}else{
		initMap(2);
	}

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
Funcion que cambia el estilo del css a noche
*/
function cambiarNoche(){
	//Save in local storage
	localStorage.setItem("Estilo","css/darkstyle.css");
	localStorage.setItem("NumEstilo",1);
	//Cambio estilo
	cambiarEstilo(1);
	$("#linkEstilo").attr("href","css/darkstyle.css");
}

/*
Funcion que cambia el estilo css al dia
*/
function cambiarDia(){
	//Save in local storage
	localStorage.setItem("Estilo","css/lightstyle.css");
	localStorage.setItem("NumEstilo",2);
	//Cambio estilo
	cambiarEstilo(2);
	$("#linkEstilo").attr("href","css/lightstyle.css");
}

/*
Funcion que inicializa el mapa, recibe un entero para ver si lo inicializa en dia y noche.
*/
function initMap(num) {
        // Create a map object, and include the MapTypeId to add
        // to the map type control.
		map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: -38.7182833, lng: -62.2666803},
          zoom: 16,
		  draggable: false,
		  zoomControl: false,
		  scrollwheel: false,
		  mapTypeControlOptions: {
            mapTypeIds: []
          }
        });
		cambiarEstilo(num);
		//Te localiza en el mapa
		localizacionMapa(map);
}
/*
Funcion que te localiza en el mapa
*/
function localizacionMapa(map){
		var infoWindow = new google.maps.InfoWindow({map: map});
        // Try HTML5 geolocation.
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(position) {
            var pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };

            infoWindow.setPosition(pos);
            infoWindow.setContent('Usted esta aquí.');
            map.setCenter(pos);
			//Una vez localizado te carga todos los reclamos realizados del localStorage
			mostrarTodosReclamosRealizados();
			//Muestra una ventana de ayuda
			mostrarAyuda();
          }, function() {
            handleLocationError(true, infoWindow, map.getCenter());
          });
        } else {
          // Browser doesn't support Geolocation
          handleLocationError(false, infoWindow, map.getCenter());
        }
		google.maps.event.addListener(map,'dblclick',function(event) {
			var latitud = event.latLng.lat();
			var longitud = event.latLng.lng();
			mostrarTipoReclamos(latitud,longitud);
		});

}

/*
Funcion que controla los mensajes para mostrar cuando hay un error en encontrar la localizacion
*/
function handleLocationError(browserHasGeolocation, infoWindow, pos) {
        infoWindow.setPosition(pos);
        infoWindow.setContent(browserHasGeolocation ?
                              'Error: El servicio de Geolocalización falló.' :
                              'Error: Tu navegador no soporta Geolocalización.');
      }


/*
Funcion que crea un marcador con los datos ingresados como parametro y lo coloca en el mapa
*/
function mostrarReclamo(titulo,imagen,longitud,latitud,descripcion,fecha){
	//Crea locacion google
	var myLatLng = new google.maps.LatLng(latitud, longitud);
	//Crea marcador
	var marker = new google.maps.Marker({
		position: myLatLng,
		map: map,
		animation: google.maps.Animation.DROP,
		icon: imagen,
	});
	//Crea cartel para mostrar en el marcador
	var contentString = '<div id="content">'+
            '<div id="siteNotice">'+
            '</div>'+
            '<h1 id="firstHeading" class="firstHeading">'+titulo+'</h1>'+
            '<div id="bodyContent">'+
			'<h1>Descripcion: </h1>'+descripcion+
			'<h4>Fecha: </h4>'+fecha+
            '</div>'+
            '</div>';
	//Asocia cartel con la ventana
	var infowindow = new google.maps.InfoWindow({
          content: contentString
        });
	//Añade un listener al marcador, cuando lo clickeas aparece la ventana con el contenido de la informacion
	marker.addListener('click', function() {
          infowindow.open(map, marker);
        });
}

/*
Funcion que carga los tipos de reclamos en una ventana, se ejecuta cuando haace dobleclick en el mapa.
Guarda la latitud y longitud de donde se hizo el dobleclick
*/
function mostrarTipoReclamos(lat, lng){
	latitud = lat;
	longitud = lng;
	var arreglo = cargarReclamos();
	mostrar(arreglo);
}

/*
Funcion que carga los reclamos del Model para mostrarlos en la vista.
Retorna un arreglo con los reclamos.
*/
function cargarReclamos(){
	var index;
	var arreglo = new Array();
	for(index = 0; index < jsonReclamo.length; ++index){
		arreglo[index] = jsonReclamo[index];
	}
	return arreglo;
}

/*
Funcion que guarda los reclamos en el localStorage y lo muestra
*/
function guardarReclamo(componente, latitud, longitud){
	$(panelDescripcion).hide();
	$(panelDescripcion).dialog("close");
	var id = componente.id;
	var img = componente.imagen;
	var titulo = componente.titulo;
	var descripcion = $(txtDescripcion).val();
	var date = new Date();
	//Pide los reclamos realizados del localStorage
	var jsonReclamosRealizadosLocal = localStorage.getItem("ReclamosRealizados");
	var jsonReclamosRealizados
	if(jsonReclamosRealizadosLocal == null){
		jsonReclamosRealizados = [];
	}
	else{
		jsonReclamosRealizados = JSON.parse(jsonReclamosRealizadosLocal);
	}
	//Agrega el reclamo nuevo realizado
	jsonReclamosRealizados.push({
		"tipo": id,
		"imagen": img,
		"titulo": titulo,
		"latitud": latitud,
		"longitud": longitud,
		"descripcion": descripcion,
		"fecha": date,

	});
	//Muestra el reclamo
	mostrarReclamo(titulo,img,longitud,latitud,descripcion,date);
	//Lo almacena en el localStorage
	localStorage.setItem("ReclamosRealizados", JSON.stringify(jsonReclamosRealizados));
}

/*
Funcion que mustra todoso los reclamos realizados que estan almacenados en el localStorage
*/
function mostrarTodosReclamosRealizados(){
	//Pide los reclamos realizados del localStorage
	var jsonReclamosRealizadosLocal = localStorage.getItem("ReclamosRealizados");
	if(jsonReclamosRealizadosLocal !== null){
		var jsonReclamosRealizados = JSON.parse(jsonReclamosRealizadosLocal);
		var index;
		var reclamo;
		//Para cada reclamo lo muestra en el mapa
		for(index = 0; index < jsonReclamosRealizados.length; ++index){
			reclamo = jsonReclamosRealizados[index];
			mostrarReclamo(reclamo.titulo,reclamo.imagen,reclamo.longitud,reclamo.latitud,reclamo.descripcion,reclamo.fecha);
		}
	}
}

/*
Funcion que llama a la vista para crear el popUp de ayuda
*/
function mostrarAyuda(){
		crearAyudaPopUp();
}
