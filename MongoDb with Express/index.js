const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const Chat = require("./models/chat");
const methodOverride = require("method-override");
const ExpressError = require("./ExpressError.js");


app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ exteneded: true }));
app.use(methodOverride("_method"));

main().then(res => {
    console.log("Connection Successful...");

}).catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}

//Index Route
app.get("/chats", async (req, res, next) => {
    try {
        let chats = await Chat.find();
        res.render("index.ejs", { chats });
    } catch (error) {
        next(error);
    }
})

//New route
app.get("/chats/new", async (req, res) => {
    // throw new ExpressError(404, "Page not found..!");
    res.render("newForm.ejs",)
})

//Create route

app.post("/chats", asyncWrap(async (req, res, next) => {

    let { from, to, msg } = req.body;
    let newChat = new Chat({
        from: from,
        to: to,
        msg: msg,
        createdAt: new Date(),
    });
    await newChat.save();
    res.redirect("/chats");

}))

function asyncWrap(fn) {
    return function (req, res, next) {
        fn(req, res, next).catch((err) => { next(err) });
    }
}

//Show route
app.get("/chats/:id", asyncWrap(async (req, res, next) => {
    let { id } = req.params;
    let chat = await Chat.findById(id);
    if (!chat) {
        next(new ExpressError(404, "Chat not found...!"));
    }
    res.render("edit.ejs", { chat });
}))

//Edit route
app.get("/chats/:id/edit", async (req, res, next) => {
    try {
        let { id } = req.params;
        let chat = await Chat.findById(id);
        res.render("edit.ejs", { chat });
    } catch (error) {
        next(error);
    }
})

//Update route
app.put("/chats/:id", async (req, res, next) => {
    try {
        let { id } = req.params;
        let { msg: newMsg } = req.body;
        let updatedChat = await Chat.findByIdAndUpdate(id,
            { msg: newMsg },
            { runValidators: true, new: true });
        res.redirect("/chats");
    } catch (error) {
        next(error);
    }
})
//Destroy Route
app.delete("/chats/:id", async (req, res, next) => {
    try {
        let { id } = req.params;
        let chatDeleted = await Chat.findByIdAndDelete(id)
        res.redirect("/chats");
    } catch (error) {
        next(error);
    }
})

app.get("/", (req, res) => {
    res.send("Working...");
})

app.use((err, req, res, next) => {
    console.log(err.name + "...!");
    next(err);

})

// Error Handling Middleware 
app.use((err, req, res, next) => {
    let { status = 500, message } = err;
    res.status(status).send(message);
})

app.listen(8080, () => {
    console.log("Server is listening...");
});