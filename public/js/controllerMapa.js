
var map;
var latitud, longitud;


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
			crearAyudaPopUp();
			//Mostrar Clima
			consultarClima(pos.lat,pos.lng);
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
function mostrarReclamo(titulo,imagen,longitud,latitud,descripcion,fecha,estado){
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
            '<h3 id="firstHeading" class="firstHeading">'+titulo+'</h3>'+
            '<div id="bodyContent">'+
			'<h4>Descripcion: </h4>'+descripcion+
			'<h4>Fecha: </h4>'+fecha+
			'<h4>Estado: </h4>'+estado+
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
	cargarReclamos();

}

/*
Funcion que carga los reclamos del servidor para mostrarlos en la vista.
*/
function cargarReclamos(){
	$.get("./reclamosTipo",function(data,status){
		var index;
		var arreglo = new Array();
		for(index = 0; index < data.length; ++index){
			arreglo[index] = data[index];
		}
		mostrarReclamosPicker(arreglo);
	});
}

/*
Funcion que guarda los reclamos en el servidor y lo muestra
*/
function guardarReclamo(componente, latitud, longitud){
	$(panelDescripcion).hide();
	$(panelDescripcion).dialog("close");
	var img = componente.imagen;
	var titulo = componente.titulo;
	var descripcion = $(txtDescripcion).val();
	var date = new Date();
	var fecha = date.getDay()+"/"+date.getMonth()+"/"+date.getFullYear()+" "+date.getHours()+":"+date.getMinutes();
	$.ajax({
	    url: './reclamosRealizados',
	    type: 'POST',
	    data: JSON.stringify({imagen: img, titulo: titulo, descripcion: descripcion, fecha:	fecha, latitud: latitud, longitud: longitud}),
    	contentType: "application/json",
    	dataType: "json",
	    success: function(data){
					mostrarReclamo(titulo,img,longitud,latitud,descripcion,date);
	    },
	    error: function(data) {
				console.log("POST ERR");
	    }
	});
}

/*
Funcion que mustra todoso los reclamos realizados que estan almacenados
*/
function mostrarTodosReclamosRealizados(){
	//Pide los reclamos realizados del servidor
	$.get("/reclamosRealizados",function(data,status){
		if(data !== null){
			var index;
			var reclamo;
			//Muestra los reclamos
			for(index = 0; index < data.length; ++index){
				reclamo = data[index];
				mostrarReclamo(reclamo.titulo,reclamo.imagen,reclamo.longitud,reclamo.latitud,reclamo.descripcion,reclamo.fecha,reclamo.estado);
			}
		}
	});
}
