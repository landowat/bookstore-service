import express from "express";

const app = express();
app.use(express.json());

const books = [
    {
        id: 1,
        title: "The Kite Runner"
    },
    {
        id: 2,
        title: "The Book Thief"
    }
]

function getBook(id) {
    return books.findIndex(book => {
        return book.id === Number(id);
    })
}

app.get("/", (req, res) => {
    res.status(200).send("Bookstore Service!");
});

app.get("/books", (req, res) => {
    res.status(200).json(books);
});

app.get("/books/:id", (req, res) => {
    const index = getBook(req.params.id);
    res.status(200).json(books[index]);
});

app.post("/books", (req, res) => {
    books.push(req.body);
    res.status(201).send("Book successfully added.");
});

app.put("/books/:id", (req, res) => {
    const index = getBook(req.params.id);
    books[index].title = req.body.title;
    res.status(200).json(books[index]);
});

app.delete("/books/:id", (req, res) => {
    const index = getBook(req.params.id);
    books.splice(index, 1);

    res.status(200).send("Book removed successfully.")
});

export default app;