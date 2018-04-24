

/*
Funcion que recibe un arreglo de reclamos que se pueden hacer y los muestra en un popUP
*/
function mostrar(arreglo){
	//Remueve los hijos del panel de reclamos
	var cell = document.getElementById("panelReclamos");
	if ( cell.hasChildNodes() ){
		while ( cell.childNodes.length >= 1 ){
			cell.removeChild( cell.firstChild );
		}
	}
	//Crea la estructura del panel de reclamos
	var titulo = $("<h4></h4>").text("Elija su Reclamo:");
	titulo.attr("class","modal-title");
	var divHeader = $("<div></div>").attr("class","modal-header");
	divHeader.append(titulo);
	var divBody	= $("<div></div>").attr("class","modal-body");
	var divContent = $("<div></div>").attr("class","modal-content");
	var divGroup = $("<div></div>").attr("class","form-group");
	divBody.append(divGroup);
	divContent.append(divHeader);
	divContent.append(divBody);
	$(panelReclamos).append(divContent);
	//Agrega cada tipo de reclamo al panel de reclamos
	var index;
	for(index = 0; index < arreglo.length; ++index){
		agregarComponente(arreglo[index],divGroup);
		if(index !== arreglo.length-1){
			agregarDivisor(divGroup)
		}
		
	}
	//Crea el popUP
	$(panelReclamos).dialog({
		closeText: 'X'
	});
	//Muestra el popUP
	$(panelReclamos).show();
	
}

/*
Funcion que agrega cada tipo de reclamo al contenedor del panel de reclamos
*/
function agregarComponente(componente,divContent){
	var tituloReclamo = $("<label></label>").text(componente.titulo);
	tituloReclamo.attr("class","modal-title");
	tituloReclamo.attr("class","centrado-porcentual");
	var imgReclamo = $("<img></img>").attr("src", componente.imagen);
	imgReclamo.attr("alt",componente.titulo);
	var botonReclamo = $("<button></button>");
	botonReclamo.append(imgReclamo);
	botonReclamo.click(function(){
		ingresarDescripcion(componente);
	});
	var divReclamo = $("<div></div>").attr("class","modal-content");
	divReclamo.attr("id",componente.id);
	
	divReclamo.append(botonReclamo);
	divReclamo.append(tituloReclamo);
	
	divContent.append(divReclamo);
}

/*
Funcion que agrega un divisor a un componente
*/
function agregarDivisor(divContent){
	var divisor = $("<div></div>").attr("class","box-content");
	divContent.append(divisor);
}

/*
Funcion que crea un popUP para ingresar una descripcion al reclamo
*/
function ingresarDescripcion(componente){
	//Oculta el popUp Anterior y lo cierra
	$(panelReclamos).hide();
	$(panelReclamos).dialog("close");
	//Remueve los hijso del panel de descripcion
	var cell = document.getElementById("panelDescripcion");
	if ( cell.hasChildNodes() ){
		while ( cell.childNodes.length >= 1 ){
			cell.removeChild( cell.firstChild );
		}
	}
		
	//Crear el contenido del popUP
	var textArea = $("<textarea></textarea>").attr("class","form-control");
	textArea.attr("type","textarea");
	textArea.attr("name","message");
	textArea.attr("id","txtDescripcion");
	textArea.attr("placeholder","Escriba su mensaje aquí.");
	textArea.attr("maxlength","500");
	textArea.attr("rows","7");
	var lblText = $("<label></label>").text("Escriba una descripcion de su reclamo (máx 500 caracteres)");
	lblText.attr("for","name");
	var divisor = $("<div></div>").attr("class","box-content");
	var divGroup = $("<div></div>").attr("class","form-group");
	divGroup.append(lblText);
	divGroup.append(divisor);
	divGroup.append(textArea);
	var btnEnviar = $("<button></button>").text("Enviar Reclamo →");
	btnEnviar.attr("type","submit");
	btnEnviar.attr("class","btn btn-lg btn-success btn-block");
	btnEnviar.click(function(){
		guardarReclamo(componente, latitud, longitud);
	});
	var divBody	= $("<div></div>").attr("class","modal-body");
	divBody.append(divGroup);
	divBody.append(btnEnviar);
	var titulo = $("<h4></h4>").text("Describa su Reclamo:");
	titulo.attr("class","modal-title");
	var divHeader = $("<div></div>").attr("class","modal-header");
	divHeader.append(titulo);
	var divContent = $("<div></div>").attr("class","modal-content");
	divContent.append(divHeader);
	divContent.append(divBody);
	
	$(panelDescripcion).append(divContent);	
	
	//Crear el popUp
	$(panelDescripcion).dialog({
		closeText: 'X'
	});
	//Muestra el popUp
	$(panelDescripcion).show();
}

/*
Funcion que crea un popUP que muestra la ayuda para ingresar un reclamo
*/
function crearAyudaPopUp(){
	var cell = document.getElementById("panelAyuda");
	if ( !cell.hasChildNodes() ){
		var titulo = $("<h1></h1>").text("Ayuda!");
		titulo.attr("class","modal-title");
		var divHeader = $("<div></div>").attr("class","modal-header");
		divHeader.append(titulo);
		var lblText = $("<label></label>").text("Para ingresar un reclamo en el mapa debe hacer doble click sobre el mismo.");
		var divGroup = $("<div></div>").attr("class","form-group");
		divGroup.append(lblText);
		var divBody	= $("<div></div>").attr("class","modal-body");
		divBody.append(divGroup);
		var divContent = $("<div></div>").attr("class","modal-content");
		divContent.append(divHeader);
		divContent.append(divBody);
		$(panelAyuda).append(divContent);
	}
	//Crear el popUp
	$(panelAyuda).dialog({
		closeText: 'X'
	});
	//Muestra el popUp
	$(panelAyuda).show();
}