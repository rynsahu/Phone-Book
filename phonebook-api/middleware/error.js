module.exports = function(err, req, res, next) {
    console.log(err);
    res.status(500).send('Somthing failed: ' + err.message);
}