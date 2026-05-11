require("dotenv").config()
require("dns").setDefaultResultOrder("ipv4first");

const app = require("./src/app")

const connectToDB = require("./src/config/database")

connectToDB()

app.listen(3000, () => {
    console.log("server is running on port 3000")
})