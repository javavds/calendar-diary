const connectDB = require('../config/db');

// 이메일로 유저 찾기
exports.findByEmail = async (email) => {
    const conn = await connectDB();
    const [rows] = await conn.query('SELECT * FROM users WHERE email = ? LIMIT 1', [email]);
    return rows[0];
};

// 회원 가입
exports.createUser = async (email, password, name) => {
    const conn = await connectDB();
    const [result] = await conn.query('INSERT INTO users (email, password_hash, name) VALUES (?, ?, ?)', [
        email,
        password,
        name,
    ]);
    await conn.end();
    return { id: result.insertId, email, name };
};
