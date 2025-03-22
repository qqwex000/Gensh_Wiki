const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const bodyParser = require("body-parser");
const path = require('path');

const app = express();
app.use(bodyParser.json());

// Обслуживание статических файлов
app.use(express.static(path.join(__dirname)));


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// MongoDB
mongoose.connect("mongodb+srv://karas:111@pop.6hm11.mongodb.net/?retryWrites=true&w=majority&appName=pop")
    .then(() => console.log("Подключение к MongoDB успешно"))
    .catch(err => console.error("Ошибка подключения к MongoDB:", err));

// схема
const userSchema = new mongoose.Schema({
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true },
});

const User = mongoose.model("User", userSchema);

// Регистрация
app.post("/register", async (req, res) => {
    const { username, password } = req.body;

    // Проверка логина и пароля
    if (!username || !password) {
        return res.status(400).json({ message: "Введите логин и пароль" });
    }

    // Проверка длины
    if (password.length < 6) {
        return res.status(400).json({ message: "Пароль должен быть не менее 6 символов" });
    }

    try {
        // существует ли пользователь
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: "Логин уже используется" });
        }

        // Хешируем пароль
        const hashedPassword = await bcrypt.hash(password, 10);

        // Создаём пользователя
        const newUser = new User({ username, password: hashedPassword });
        await newUser.save();

        res.status(201).json({ message: "Регистрация успешна" });
    } catch (error) {
        res.status(500).json({ message: "Ошибка сервера" });
    }
});

// Запуск сервера
app.listen(3000, () => console.log("Сервер запущен на http://localhost:3000"));
