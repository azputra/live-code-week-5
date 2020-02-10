const routes = require("express").Router()
const userRouter = require("./user")
const comicRouter = require("./comic")

routes.use('/', userRouter)
routes.use('/comics', comicRouter)

module.exports = routes