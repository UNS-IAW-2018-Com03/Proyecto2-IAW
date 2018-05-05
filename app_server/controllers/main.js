

/* GET home page. */
const homePage = function (req, res) {
  if(req.user != null){
      res.render('index',{user: req.user});
  }
  else{
      res.render('ingrese',{user: null});
  }

};

module.exports = {
  homePage
}
