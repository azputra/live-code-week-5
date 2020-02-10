"use strict"

const { User } = require("../models")
const { verifyToken } = require("../helpers/jwt")
const createError = require("http-errors")

function authentication(req, res, next) {
    try {
        const decoded = verifyToken(req.headers.token)
        User.findOne({
            where: {
                id: decoded.id
            }
        })
            .then((user) => {
                if (user) {
                    req.user = {
                        id: user.id
                    }
                    next()
                } else {
                    throw ("user not found")
                }
            }).catch((err) => {
                next(createError(err))
            });
    } catch (err) {
        next(err)
    }
}

module.exports = authentication