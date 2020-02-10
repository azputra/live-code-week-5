"use strict"

const { User } = require("../models")
const { createToken } = require('../helpers/jwt')

class UserController {
    static login(req, res, next) {
        const { email, password } = req.body
        User.findOne({
            where: {
                email, password
            }
        })
            .then((user) => {
                if (user) {
                    const token = createToken(user)
                    res.status(201).json({ user, token })
                } else {
                    res.status(404).json("email/password wrong")
                }
            }).catch(next);
    }
    static register(req, res, next) {
        const { email, password, name } = req.body
        User.create({
            email,
            password,
            name
        })
            .then((user) => {
                const token = createToken(user)
                res.status(201).json({ user, token })
            }).catch(next);
    }
}

module.exports = UserController