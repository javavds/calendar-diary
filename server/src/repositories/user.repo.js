const connectDB = require('../config/db');
exports.findByEmail = async (email) => {
    const conn = await connectDB();
    const [rows] = await conn.query('SELECT * FROM users WHERE email =? LIMIT 1');
};
