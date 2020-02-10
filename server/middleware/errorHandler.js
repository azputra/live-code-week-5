"usee strict"

module.exports = function (err, req, res, next) {
    console.log(err.message);
    if (err.message && err.status) {
        res.status(err.status).json(err.message)
    } else if (err.errors[0].message === "email already exist") {
        res.status(400).json(err.errors[0].message)
    } if (err.message === "JsonWebTokenError") {
        res.status(400).json("not found token")
    }
}