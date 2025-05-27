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
    address: [
        {
            _id : false,
            location: String,
            city: String
        }
    ]
})

const User = mongoose.model("User", userSchema);

const addUser = async () => {
    let user1 = new User({
        username: "Tony Stark",
        address: [
            {
                location: "10880 Malibu Point",
                city: "Malibu"
            },

        ]
    })
    user1.address.push({
        location: "Stark Tower, Midtown",
        city: "New York"
    })
    let result = await user1.save();
    console.log(result);

}

addUser();