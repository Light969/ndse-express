#!/usr/bin/env node
const express = require('express');

const { v4: uuid } = require('uuid');

class Book {
    constructor(title = '', authors = '', description = '', favorite = '', fileCover = '', fileName = '') {
        this.title = title;
        this.authors = authors;
        this.description = description;
        this.favorite = favorite;
        this.fileCover = fileCover;
        this.fileName = fileName;
        this.id = uuid();
    }
}

const stor = {
    books: [],
    user: {
        id: 1, 
        mail: "test@mail.ru",
    },
}

const app = express();
app.use(express.json());

app.get('/api/books', (req, res) => {
    const {books} = stor;
    res.json(books);
});

app.get('/api/books/:id', (req, res) => {
    const {books} = stor;
    const {id} = req.params;
    const idx = books.findIndex((el) => el.id === id);
    if (idx !== -1) {
        res.json(books[idx]);
    } else { 
        res.status(404);
        res.json('404 | страница не найдена')
    }

});

app.post('/api/books', (req, res) => {
    const {books} = stor;
    const {
        title, 
        authors, 
        description, 
        favorite, 
        fileCover, 
        fileName
    } = req.body;

    const newBook = new Book(
        title, 
        authors, 
        description, 
        favorite, 
        fileCover, 
        fileName
    );
    books.push(newBook);

    res.status(201);
    res.json(newBook);
});

app.post('/api/user/login', (req, res) => {
    const {user} = stor;
    res.status(201);
    res.json(user);
});

app.put('/api/books/:id', (req, res) => {
    const {books} = stor;
    const {
        title, 
        authors, 
        description, 
        favorite, 
        fileCover, 
        fileName
    } = req.body;

    const {id} = req.params;
    const idx = books.findIndex((el) => el.id === id);

    if (idx !== -1) {
        books[idx] = {
            ...books[idx],
            title, 
            authors, 
            description, 
            favorite, 
            fileCover, 
            fileName
        }
        res.json(books[idx]);
    } else { 
        res.status(404);
        res.json('404 | страница не найдена')
    }
});

app.delete('/api/books/:id', (req, res) => {
    const {books} = stor;
    const {id} = req.params;
    const idx = books.findIndex(el => el.id === id);
    if (idx !== -1) {
        books.splice(idx, 1);
        res.json('Книга удалена')
    } else { 
        res.status(404);
        res.json('404 | страница не найдена')
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT);

// POST  http://localhost:3000/api/user/login
// GET   http://localhost:3000/api/books
// GET   http://localhost:3000/api/books/:id       http://localhost:3000/api/books/a857c2b1-9826-48b1-ba8c-060ff3daf1b7
// POST  http://localhost:3000/api/books
// PUT   http://localhost:3000/api/books/:id       
// DELETE  http://localhost:3000/api/books/:id     

// books - В моём случае равносильно команде npm run start