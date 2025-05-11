const mongoose = require("mongoose");
const Chat = require("./models/chat");


main().then(res => {
    console.log("Connection Successful...");

}).catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}
let allChats = [
    {
        from: "Joey",
        to: "Ross",
        msg: "How u doin'",
        createdAt: new Date()
    },
    {
        from: "Ross",
        to: "Joey",
        msg: "Doing good! What's up?",
        createdAt: new Date()
    },
    {
        from: "Monica",
        to: "Rachel",
        msg: "Dinner at 8?",
        createdAt: new Date()
    },
    {
        from: "Rachel",
        to: "Monica",
        msg: "Sure, see you then!",
        createdAt: new Date()
    },
    {
        from: "Chandler",
        to: "Joey",
        msg: "Did you eat my sandwich?!",
        createdAt: new Date()
    },
    {
        from: "Joey",
        to: "Chandler",
        msg: "Maybe... was it yours?",
        createdAt: new Date()
    },
    {
        from: "Phoebe",
        to: "Everyone",
        msg: "Smelly cat, smelly cat 🎵",
        createdAt: new Date()
    },
    {
        from: "Rachel",
        to: "Ross",
        msg: "We were on a break!",
        createdAt: new Date()
    }
];

Chat.insertMany(allChats);
