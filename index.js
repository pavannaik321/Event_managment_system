const express = require('express');
const cors = require('cors');
const app = express();


// dont touch below this

const PORT = 8000 || 3000;

// Middlewares
app.use(cors({
  credentials: true,
  origin: ["http://localhost:5173", "http://localhost:5174"],
  methods: ["POST", "GET", "PUT"],
}));

app.use(express.json());

const connection = require('./db/Configuration');
connection();

// dont touch above this 

app.get('/', (req, res) => {
  res.send('server is running');
});

app.get('/test', (req, res) => {
  res.send('test the deployment');
});

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
