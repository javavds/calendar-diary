const mysql = require('mysql2/promise');

async function connectDB() {
    const conn = await mysql.createConnection({
        host: process.env.DB_HOST || '127.0.0.1',
        port: Number(process.env.DB_PORT) || 3306,
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD || '1234',
        database: process.env.DB_NAME || 'calendar_diary',
    });
    console.log('MySQL 연결 성공');
    return conn;
}

module.exports = connectDB;
