const express = require('express');
const cors = require('cors');
const app = express();
const cookieParser = require('cookie-parser');

// Use cookie-parser middleware
app.use(cookieParser());

const userRoutes = require('./routes/userRoutes')
const adminRoutes = require('./routes/AdminRoutes')
const bookingRoutes = require('./routes/bookingRoutes')
const venueRoutes = require('./routes/venueRoutes')

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



// Routes
app.use('/users',userRoutes)
app.use('/admin',adminRoutes)
app.use('/booking',bookingRoutes)
app.use('/venue',venueRoutes)


app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
