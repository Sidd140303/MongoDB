const mongoose = require("mongoose");
const { Schema } = mongoose;

main().then(() => {
    console.log("connected");
}).catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/relationDemo');
}

const userSchema = new Schema({
    username: String,
    email: String
});

const postSchema = new Schema({
    content: String,
    likes: Number,
    user: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
})

const User = mongoose.model("User", userSchema);
const Posts = mongoose.model("Posts", postSchema);

// const addUser = async () => {
//     let user = await User.findOne({ username: "Joey" });

//     let post2 = new Posts({
//         content: "Bye bye",
//         likes: 27
//     });

//     post2.user = user;
//     await post2.save();
// }

// addUser();  

const getData = async () => {
    let res = await Posts.find({}).populate("user", "username");
    console.log(res);
}

getData();