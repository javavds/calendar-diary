const connectDB = require('../config/db');

// 이메일로 유저 찾기
exports.findByEmail = async (email) => {
    const conn = await connectDB();
    try {
        const [rows] = await conn.query('SELECT * FROM users WHERE email = ? LIMIT 1', [email]);
        return rows[0];
    } finally {
        await conn.end();
    }
};

// 회원 가입
exports.createUser = async (email, passwordHash, name) => {
    const conn = await connectDB();
    try {
        const [result] = await conn.query('INSERT INTO users (email, password_hash, name) VALUES (?, ?, ?)', [
            email,
            passwordHash,
            name,
        ]);
        return { id: result.insertId, email, name };
    } finally {
        await conn.end();
    }
};
