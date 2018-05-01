

/* GET home page. */
const homePage = function (req, res) {
  res.render('index',{success: req.session.success});
};

module.exports = {
  homePage
}
