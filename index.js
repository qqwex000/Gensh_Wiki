const express = require('express');
const mongoose = require('mongoose');
const authRouter = require('./authRouter');
const port = process.env.PORT || 5000;
const app = express();

app.use(express.json());
app.use('/auth' , authRouter)

const start = async () => {
    try {
        await mongoose.connect('mongodb+srv://karas:111@pop.6hm11.mongodb.net/?retryWrites=true&w=majority&appName=pop')
        app.listen(port, () => console.log('server started   ' ));
    } catch (e) {
        console.log(e);
    }
}

start()
