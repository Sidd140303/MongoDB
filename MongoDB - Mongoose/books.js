const mongoose = require("mongoose");

main()
    .then(() => {
        console.log("Connection successful");
    })
    .catch(err => console.log(err));

async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/amazon");
}

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
    },
    author: {
        type: String,
    },
    price: {
        type: Number,
        min: [50, "Amount is less"]
    }
})

const Book = mongoose.model("Book", bookSchema);

// Book.insertMany([
//     { title: "To Kill a Mockingbird", author: "Harper Lee", price: 299 },
//     { title: "1984", author: "George Orwell", price: 249 },
//     { title: "The Great Gatsby", author: "F. Scott Fitzgerald", price: 199 },
//     { title: "Pride and Prejudice", author: "Jane Austen", price: 189 },
//     { title: "The Catcher in the Rye", author: "J.D. Salinger", price: 209 },
//     { title: "The Hobbit", author: "J.R.R. Tolkien", price: 350 },
//     { title: "Fahrenheit 451", author: "Ray Bradbury", price: 275 },
//     { title: "The Alchemist", author: "Paulo Coelho", price: 225 },
//     { title: "The Book Thief", author: "Markus Zusak", price: 315 },
//     { title: "Sapiens", author: "Yuval Noah Harari", price: 399 }
// ]).then(res => {
//     console.log("Inserted...");
// }).catch(err => {
//     console.log(err);
// })

Book.insertOne({
    title: "Harry Potter",
    author: "J.K Rowling",
    price: 49
}).then().catch(err => {
    console.log(err.errors.price.properties.message);
})


