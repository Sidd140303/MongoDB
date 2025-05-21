const express = require("express");
const app = express();
const ExpressError = require("./ExpressError.js");

const checkToken = ((req, res, next) => {
    let { tokens } = req.query;
    if (tokens === "giveaccess") {
        next();
    }
    else {
        throw new ExpressError(401, "Access denied!");
    }
})

app.get("/api", checkToken, (req, res) => {
    res.send("data");
})

app.get("/", (req, res) => {
    res.send("Hey, I am root...");
})
app.get("/err", (req, res) => {
    abcd = abcd;
})

app.get("/admin", (req, res) => {
    throw new ExpressError(403, "Access is forbidden...!");
})

app.use((err, req, res, next) => {
    let { status = 500, message } = err;
    res.status(status).send(message);
});


// app.use((req, res) => {
//     res.send("Page not found");
// })

app.listen(8080, () => {
    console.log("server listening...");

})