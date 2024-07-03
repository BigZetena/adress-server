const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;
app.use(cors("*"));
// Пример данных пользователей

const contacts = [
  {
    id: 1,
    name: "Kurt",
    surname: "Cobain",
    about: "Java Developer",
    gender: "male",
    mail: "kurtcobain@gmail.com",
    phone: "0706312495",
    creationDate: "2024-06-09T12:34:56.789Z",
  },
  {
    id: 2,
    name: "Janis",
    surname: "Joplin",
    about: "Best friend",
    gender: "female",
    mail: "janisjoplin@gmail.com",
    phone: "0902362954",
    creationDate: "2024-06-09T12:34:56.789Z",
  },
  {
    id: 3,
    name: "Jimi",
    surname: "Hendrix",
    about: "Guitar Legend",
    gender: "male",
    mail: "jimihendrix@gmail.com",
    phone: "0902362951",
    creationDate: "2024-06-09T12:34:56.789Z",
  },
  {
    id: 4,
    name: "Freddie",
    surname: "Mercury",
    about: "Queen Vocalist",
    gender: "male",
    mail: "freddiemercury@gmail.com",
    phone: "0902362952",
    creationDate: "2024-06-09T12:34:56.789Z",
  },
  {
    id: 5,
    name: "Robert",
    surname: "Plant",
    about: "Led Zeppelin Singer",
    gender: "male",
    mail: "robertplant@gmail.com",
    phone: "0902362953",
    creationDate: "2024-06-09T12:34:56.789Z",
  },
  {
    id: 6,
    name: "David",
    surname: "Bowie",
    about: "Rock Icon",
    gender: "male",
    mail: "davidbowie@gmail.com",
    phone: "0902362955",
    creationDate: "2024-06-09T12:34:56.789Z",
  },
  {
    id: 7,
    name: "Mick",
    surname: "Jagger",
    about: "Rolling Stones Frontman",
    gender: "male",
    mail: "mickjagger@gmail.com",
    phone: "0902362956",
    creationDate: "2024-06-09T12:34:56.789Z",
  },
  {
    id: 8,
    name: "Bruce",
    surname: "Springsteen",
    about: "The Boss",
    gender: "male",
    mail: "brucespringsteen@gmail.com",
    phone: "0902362957",
    creationDate: "2024-06-09T12:34:56.789Z",
  },
  {
    id: 9,
    name: "Elvis",
    surname: "Presley",
    about: "King of Rock and Roll",
    gender: "male",
    mail: "elvispresley@gmail.com",
    phone: "0902362958",
    creationDate: "2024-06-09T12:34:56.789Z",
  },
  {
    id: 10,
    name: "Steven",
    surname: "Tyler",
    about: "Aerosmith Vocalist",
    gender: "male",
    mail: "steventyler@gmail.com",
    phone: "0902362959",
    creationDate: "2024-06-09T12:34:56.789Z",
  },
  {
    id: 11,
    name: "Axl",
    surname: "Rose",
    about: "Guns N' Roses Singer",
    gender: "male",
    mail: "axlrose@gmail.com",
    phone: "0902362960",
    creationDate: "2024-06-09T12:34:56.789Z",
  },
  {
    id: 12,
    name: "Ozzy",
    surname: "Osbourne",
    about: "Prince of Darkness",
    gender: "male",
    mail: "ozzyosbourne@gmail.com",
    phone: "0902362961",
    creationDate: "2024-06-09T12:34:56.789Z",
  },
  {
    id: 13,
    name: "Jim",
    surname: "Morrison",
    about: "The Doors Frontman",
    gender: "male",
    mail: "jimmorrison@gmail.com",
    phone: "0902362962",
    creationDate: "2024-06-09T12:34:56.789Z",
  },
  {
    id: 14,
    name: "Eddie",
    surname: "Vedder",
    about: "Pearl Jam Singer",
    gender: "male",
    mail: "eddievedder@gmail.com",
    phone: "0902362963",
    creationDate: "2024-06-09T12:34:56.789Z",
  },
  {
    id: 15,
    name: "Brian",
    surname: "Johnson",
    about: "AC/DC Vocalist",
    gender: "male",
    mail: "brianjohnson@gmail.com",
    phone: "0902362964",
    creationDate: "2024-06-09T12:34:56.789Z",
  },
  {
    id: 16,
    name: "Jon",
    surname: "Bon Jovi",
    about: "Bon Jovi Frontman",
    gender: "male",
    mail: "jonbonjovi@gmail.com",
    phone: "0902362965",
    creationDate: "2024-06-09T12:34:56.789Z",
  },
  {
    id: 17,
    name: "Chris",
    surname: "Cornell",
    about: "Soundgarden Singer",
    gender: "male",
    mail: "chriscornell@gmail.com",
    phone: "0902362966",
    creationDate: "2024-06-09T12:34:56.789Z",
  },
  {
    id: 18,
    name: "Tina",
    surname: "Weymouth",
    about: "Talking Heads Bassist",
    gender: "female",
    mail: "tinaweymouth@gmail.com",
    phone: "0902362968",
    creationDate: "2024-06-09T12:34:56.789Z",
  },
  {
    id: 19,
    name: "Linda",
    surname: "Ronstadt",
    about: "Rock Legend",
    gender: "female",
    mail: "lindaronstadt@gmail.com",
    phone: "0902362969",
    creationDate: "2024-06-09T12:34:56.789Z",
  },
  {
    id: 20,
    name: "Annie",
    surname: "Lennox",
    about: "Eurythmics Singer",
    gender: "female",
    mail: "annielennox@gmail.com",
    phone: "0902362970",
    creationDate: "2024-06-09T12:34:56.789Z",
  },
];

// Маршрут для получения списка пользователей с фильтрацией
app.get("/contacts", (req, res) => {
  const { search, gender, filter } = req.query;

  let filteredUsers = contacts;

  if (search) {
    console.log(search);
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
        if (a.name > b.name) return -1;
        if (a.name < b.name) return 1;
        if (a.name === b.name) return 0;
      }
      if (filter === "date") {
        if (a.creationDate > b.creationDate) return -1;
        if (a.creationDate < b.creationDate) return 1;
        if (a.creationDate === b.creationDate) return 0;
      }
      if (a.name < b.name) return -1;
      if (a.name > b.name) return 1;
      if (a.name === b.name) return 0;
    });
  }

  res.json(filteredUsers);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
