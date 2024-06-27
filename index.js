const express = require("express");
const app = express();

const PORT = 3001;

app.use(express.json());

const people = [
  {
    id: "1",
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: "2",
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: "3",
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: "4",
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

app.get("/", (request, response) => {
  response.send("<h1>Hello world!</h1>");
});

app.get("/api/people", (request, response) => {
    response.send(people);
})

app.get("/info", (request, response) => {
    const nbrPeople = people.length
    const datetimeNow = Date()

    response.send(
        `Phonebook has info for ${nbrPeople} people.
        <br>
        Accessed: ${datetimeNow}`
    );

})

app.get("/api/people/:id", (request, response) => {
  const id = request.params.id
  const person = people.find(person => person.id === id)

  if(person){
    response.json(person)
  } else {
    response.status(404).end()
  }
})


app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`)
})
