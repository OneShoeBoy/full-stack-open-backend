const express = require("express");
const app = express();

const PORT = 3001;

app.use(express.json());

let people = [
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
});

app.get("/info", (request, response) => {
  const nbrPeople = people.length;
  const datetimeNow = Date();

  response.send(
    `Phonebook has info for ${nbrPeople} people.
        <br>
        Accessed: ${datetimeNow}`
  );
});

app.get("/api/people/:id", (request, response) => {
  const id = request.params.id;
  const person = people.find((person) => person.id === id);

  if (person) {
    response.json(person);
  } else {
    response.status(404).end();
  }
});

app.delete("/api/people/:id", (request, response) => {
  const id = request.params.id;
  const newPeople = people.filter(person=> person.id !== id);

  people = newPeople

  response.status(204).end()
});

function generateId(){
	const maxId =
	  people.length > 0 ? Math.max(...people.map((person) => Number(person.id))) : 0;
	return String(maxId + 1);
  };

app.post("/api/people", (request, response) => {
	const id = generateId();
	const body = request.body
	
	const nameArray = people.map(person=>person.name.toLowerCase())
	
  if(nameArray.includes(body.name.toLowerCase())=== true){
		response.status(400).json({
      error: "Duplicate name"
    }).end()
	} else if(!body.name || !body.number){
    response.status(400).json({
      error: "Content missing"
    }).end()
	} else {
    const person = {
      id: id,
      name: body.name,
      number: body.number
    }	
    people = people.concat(person)
    response.json(person);
  }	
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
