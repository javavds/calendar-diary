require('dotenv').config();
const express = require('express');
const app = express();

app.use(express.json());

const cors = require('./src/config/cors');
app.use(cors);

const authRoutes = require('./src/routes/auth.routes');
app.use('/auth', authRoutes);

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`서버 실행중 http://localhost:${PORT}`);
});
