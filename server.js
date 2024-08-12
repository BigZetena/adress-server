const express = require("express");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const app = express();
const port = 3000;
app.use(cors("*"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Файл для хранения данных
const DATA_FILE = "contacts.json";

// Загрузка данных из файла
let contacts = [];
if (fs.existsSync(DATA_FILE)) {
  const fileData = fs.readFileSync(DATA_FILE);
  contacts = JSON.parse(fileData);
}

// Функция для сохранения данных в файл
const saveContactsToFile = () => {
  fs.writeFileSync(DATA_FILE, JSON.stringify(contacts, null, 2));
};

// Настройка multer для загрузки файлов
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

// Проверка существования директории uploads
if (!fs.existsSync("uploads")) {
  fs.mkdirSync("uploads");
}

// Маршрут для получения списка пользователей с фильтрацией
app.get("/contacts", (req, res) => {
  const { search, gender, filter, page = 0, limit = 10000 } = req.query;
  let filteredUsers = [...contacts];

  const startIndex = page * limit;
  const endIndex = startIndex + limit;

  if (search) {
    filteredUsers = filteredUsers.filter(
      (e) =>
        e.name.toLowerCase().includes(search.toLowerCase()) ||
        e.surname.toLowerCase().includes(search.toLowerCase()) ||
        e.phone.toLowerCase().includes(search.toLowerCase()) ||
        e.mail.toLowerCase().includes(search.toLowerCase()) ||
        e.about.toLowerCase().includes(search.toLowerCase())
    );
  }

  if (gender) {
    filteredUsers = filteredUsers.filter((e) => e.gender === gender);
  }
  if (filter) {
    filteredUsers = filteredUsers.sort((a, b) => {
      if (filter === "z") {
        return a.name.localeCompare(b.name) * -1;
      }
      if (filter === "date") {
        const dateA = new Date(a.creationDate);
        const dateB = new Date(b.creationDate);
        return dateB - dateA; // Сортировка в порядке убывания
      }
      return a.name.localeCompare(b.name);
    });
  }

  const data = filteredUsers.slice(startIndex, endIndex);

  const lastPage = Math.floor((filteredUsers.length - 1) / limit);
  const dataLength = filteredUsers.length;

  res.json({ lastPage, dataLength, page, limit, data, filter });
});

// Маршрут для добавления нового контакта
app.post("/contacts", upload.single("image"), (req, res) => {
  const { name, surname, about, gender, mail, phone } = req.body;
  const image = req.file ? req.file.destination + req.file.filename : null;

  const newContact = {
    id: contacts.length + 1,
    name,
    surname,
    about,
    gender,
    mail,
    phone,
    creationDate: new Date().toISOString(),
    image,
  };

  contacts.push(newContact);
  saveContactsToFile(); // Сохранение данных в файл
  res.status(201).json(newContact);
});

// Маршрут для удаления контакта
app.delete("/contacts/:id", (req, res) => {
  const contactId = parseInt(req.params.id);
  const contactIndex = contacts.findIndex(
    (contact) => contact.id === contactId
  );

  if (contactIndex !== -1) {
    const deletedContact = contacts.splice(contactIndex, 1)[0];
    saveContactsToFile(); // Сохранение данных в файл после удаления
    res.json(deletedContact);
  } else {
    res.status(404).json({ message: "Contact not found" });
  }
});

app.use("/uploads", express.static("uploads"));

app.listen(port, () => {
  console.log(`Сервер запущен по адресу http://localhost:${port}/`);
});
