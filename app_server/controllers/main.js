

/* GET home page. */
const homePage = function (req, res) {
  res.render('index',{
    success: req.session.success,
    message1 : req.flash('errorLogin'),
  });
};

module.exports = {
  homePage
}
