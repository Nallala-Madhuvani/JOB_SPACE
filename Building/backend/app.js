require('dotenv').config();

const express = require('express');
const path = require('path');
const cors = require('cors');

const connectDB = require('./config/db');
const sessionMiddleware = require('./config/session');

const app = express();


// ✅ DATABASE CONNECTION
connectDB().then(() => {
  console.log("✅ MongoDB Connected");
}).catch(err => {
  console.error("❌ MongoDB Connection Error:", err.message);
});


// ✅ MIDDLEWARE
app.use(cors({
  origin: "http://localhost:5173", // frontend port
  credentials: true
}));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// ✅ STATIC FILES
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


// ✅ SESSION
app.use(sessionMiddleware);


// ✅ USER CONTEXT
app.use((req, res, next) => {
  res.locals.user = req.session?.userId ? {
    id: req.session.userId,
    name: req.session.userName,
    role: req.session.userRole,
    avatar: req.session.userAvatar
  } : null;
  next();
});


// ✅ ROOT ROUTE
app.get('/', (req, res) => {
  res.send("🚀 Backend Running Successfully");
});


// ✅ API ROUTES
app.use('/api/auth', require('./routes/auth'));
app.use('/api/dashboard', require('./routes/dashboard'));
app.use('/api/applications', require('./routes/applications'));
app.use('/api/companies', require('./routes/companies'));
app.use('/api/documents', require('./routes/documents'));
app.use('/api/profile', require('./routes/profile'));
app.use('/api/analytics', require('./routes/analytics'));
app.use('/api/admin', require('./routes/admin'));
app.use('/api/columns', require('./routes/columns'));


// ✅ ERROR HANDLING
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

app.use((err, req, res, next) => {
  console.error("🔥 Server Error:", err.stack);
  res.status(500).json({ error: "Internal Server Error" });
});


// ✅ SERVER START
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});