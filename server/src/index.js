const express = require('express');

const dotenv = require('dotenv').config();

const dbConnect = require('./config/dbConnect');

const authRoutes = require('./routes/authRoutes');

const cookieParser = require('cookie-parser');
const cors = require('cors');

dbConnect();

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(
  cors({
    // origin: 'https://financial-ai-rvju.vercel.app',
    // origin: 'http://localhost:3000',
    // origin: 'https://financial-ai-apnn.vercel.app',
    origin: 'https://financial-ai-07.vercel.app/',
    credentials: true,
  })
);
app.use(express.json());

app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server listening at port: ${PORT}`);
});
