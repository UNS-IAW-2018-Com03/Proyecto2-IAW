

/* GET home page. */
const homePage = function (req, res) {
  res.render('index',{
    user: req.user,
    message1 : req.flash('errorLogin'),
  });
};

module.exports = {
  homePage
}
