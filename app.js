const express = require("express");
const cors = require("cors")
const dotenv = require("dotenv")
const bodyParser = require("body-parser")

const connectionRouter = require("./routes/connection.route")
const rendezVousRouter = require("./routes/rendez_vous.route")
const pushNotifRouter = require("./routes/app-routes")
const medecinRouter = require("./routes/medecin.route")

// Configure dotenv
dotenv.config({
    path: ".env"
})

const app = express();
app.set("port", process.env.PORT || 3000);
app.use(express.static('uploads'));

//// Apply middlewares
// Allow cross-origin
app.use(cors())

// Parse data as json
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use(connectionRouter)
app.use("/api/rendezVous", rendezVousRouter) 
app.use(pushNotifRouter)
app.use(medecinRouter)


app.use(rendezVousRouter) 

app.get("/", (req, res) => {
    res.send("Server is up and running")
})

const connection = require("./services/connection.service")
const hash = connection.hash()
console.log(toString(hash))

app.listen(app.get("port"), () => {
    console.log(`App is served under ${app.get("port")} port`);
})