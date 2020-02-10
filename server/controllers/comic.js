"use strict"

const { Comic } = require("../models")
const createError = require("http-errors")

class comicController {
    static getComic(req, res, next) {
        Comic.findAll()
            .then((respon) => {
                res.status(200).json(respon)
            }).catch(next);
    }
    static getOneComic(req, res, next) {
        Comic.findOne({
            where: {
                id: req.params.id
            }
        })
            .then((result) => {
                res.status(200).json(result)
            }).catch(next);
    }
    static updateComic(req, res, next) {
        const { title, author, imageUrl } = req.body
        Comic.update({
            title,
            author,
            imageUrl
        }, {
            where: {
                id: req.params.id
            }
        })
            .then((result) => {
                if (result[0] === 0) {
                    res.status(404).json("not found")
                } else {
                    return Comic.findOne({
                        where: {
                            id: req.params.id
                        }
                    })
                        .then((result) => {
                            res.status(200).json(result)
                        }).catch(next);
                }
            }).catch(next);
    }
}

module.exports = comicController