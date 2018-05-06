const isAuthenticated = function(req, res, next) {

	if (req.isAuthenticated()){
			return next();
	}

	res
		.status(401)
		.json({'error': 'No Autorizado para realizar esa acción.'});
}

module.exports = isAuthenticated;
