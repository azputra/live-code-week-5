"use strict"
const router = require("express").Router()
const comicController = require('../controllers/comic')
const authentication = require("../middleware/authentication")

router.use(authentication)
router.get("/", comicController.getComic)
router.get("/:id", comicController.getOneComic)
router.put("/:id", comicController.updateComic)

module.exports = router