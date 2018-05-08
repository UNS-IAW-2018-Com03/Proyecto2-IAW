

/* GET home page. */
const homePage = function (req, res) {
  if(req.user != null){
      res.render('index',{user: req.user});
  }
  else{
      res.render('ingrese',{user: null});
  }

};

const readmePage = function (req,res) {
  res.render('README');
}

module.exports = {
  homePage,
  readmePage
}
