const express = require("express");
const app = express();

// app.use((req, res, next) => {
//     console.log("Hey, I am middleware");
//     next();
// })
// app.use((req, res, next) => {
//     console.log("Hey, I am 2nd middleware");
//     next();
// })

// app.use((req, res, next) => {
//     req.time = new Date(Date.now()).toString();
//     console.log(req.method, req.hostname, req.path, req.time);
//     next();

// })
const checkToken = ((req, res, next) => {
    let { tokens } = req.query;
    if (tokens === "giveaccess") {
        next();
    }
    else {
        throw new Error("Access denied!");
    }
})

app.get("/api", checkToken, (req, res) => {
    res.send("data");
})

app.get("/", (req, res) => {
    res.send("Hey, I am root...");
})
app.get("/random", (req, res) => {
    res.send("This is random...");
})

app.use((req, res) => {
    res.send("Page not found");
})

app.listen(8080, () => {
    console.log("server listening...");

})