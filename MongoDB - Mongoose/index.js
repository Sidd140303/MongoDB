const mongoose = require('mongoose');

main()
    .then(() => {
        console.log("Connection successful");
    })
    .catch(err => console.log(err));


async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/test');
}

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    age: Number,
    isSingle: Boolean
})

const User = mongoose.model("User", userSchema);

// const user1 = new User({
//     name: "Ross Geller",
//     email: "rossgellerdino@gmail.com",
//     Age: 32
// })

// user1.save();

// const user2 = new User({
//     name: "Monica Geller",
//     email: "monicagellerchef@gmail.com",
//     Age: 32
// })

// user2.save().then((res) => {
//     console.log(res);
// }).catch(err => {
//     console.log(err);
// });

// User.insertMany([

//     {
//         name: "Rachel Green",
//         email: "rachelgreenfashion@gmail.com",
//     },
//     {
//         name: "Phoebe Buffay",
//         email: "phoebebuffaymusic@gmail.com"
//     },
//     {
//         name: "Joey Tribbiani",
//         email: "joeytribbianiactor@gmail.com"
//     },
//     {
//         name: "Chandler Bing",
//         email: "chandlerbingfunny@gmail.com"
//     }


// ]).then(res => {
//     console.log(res);
// });

// User.insertMany([
//   {
//     name: "Ross Geller",
//     email: "rossgellerdino@gmail.com",
//     age: 31
//   },
//   {
//     name: "Monica Geller",
//     email: "monicagellerchef@gmail.com",
//     age: 29
//   },
//   {
//     name: "Rachel Green",
//     email: "rachelgreenfashion@gmail.com",
//     age: 28
//   },
//   {
//     name: "Phoebe Buffay",
//     email: "phoebebuffaymusic@gmail.com",
//     age: 30
//   },
//   {
//     name: "Joey Tribbiani",
//     email: "joeytribbianiactor@gmail.com",
//     age: 31
//   },
//   {
//     name: "Chandler Bing",
//     email: "chandlerbingfunny@gmail.com",
//     age: 32
//   }
// ])


User.findById("681e48e8c176ac909e4d3c74").then(res => {
    console.log(res.name);
}).catch(err => {
    console.log(err);
})

// User.updateOne({ name: "Ross Geller" }, { age: 32 }).then(res => {
//     console.log(res);
// });

User.updateMany(
    { age: { $gt: 25 } },
    { $set: { isSingle: true } }
).then(res => {
    console.log("Updated...");
}).catch(err => {
    console.log(err);
});

User.findOneAndUpdate(
    { name: "Monica Geller" },
    { isSingle: false },
    { new: true }
).then(res => {
    console.log(res);
})

User.deleteOne({ name: "Drake" }).then(res => {
    console.log("User Deleted");
})