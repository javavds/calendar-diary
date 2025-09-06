const connectDB = require('../config/db');

exports.upsertDiary = async (userId, date, { title, content, mood }) => {
    const sql = `
    INSERT INTO diaries (user_id, d, title, content, mood)
    VALUES (?, ?, ?, ?, ?)
    ON DUPLICATE KEY UPDATE title=VALUES(title), content=VALUES(content), mood=VALUES(mood)
  `;
    const conn = await connectDB();
    try {
        await conn.query(sql, [userId, date, title, content, mood]);
        return { userId, date, title, content, mood };
    } finally {
        await conn.end();
    }
};

exports.findDiary = async (userId, date) => {
    const conn = await connectDB();
    try {
        const [rows] = await conn.query('SELECT * FROM diaries WHERE user_id = ? AND d = ?', [userId, date]);
        return rows[0];
    } finally {
        await conn.end();
    }
};

exports.deleteDiary = async (userId, date) => {
    const conn = await connectDB();
    try {
        await conn.query('DELETE FROM diaries WHERE user_id = ? AND d = ?', [userId, date]);
    } finally {
        await conn.end();
    }
};
