"use strict"

if (process.env.NODE_ENV === "development") {
    require("dotenv").config()
}
const express = require("express")
const app = express()
const routes = require("./routes")
const cors = require("cors")
const PORT = process.env.PORT || 3001

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(cors())
app.use("/", routes)

app.listen(PORT, () => console.log("Example app listening on port" + PORT))