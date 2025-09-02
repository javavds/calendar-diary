const connectDB = require('../config/db');

// 특정 날짜 일기 조회
exports.findByDate = async (userId, date) => {
  const conn = await connectDB();
  const [rows] = await conn.query(
    'SELECT user_id, d, title, content, mood FROM diaries WHERE user_id = ? AND d = ? LIMIT 1',
    [userId, date]
  );
  await conn.end();
  return rows[0];
};

// 일기 저장 (새로 생성하거나 수정)
exports.saveDiary = async (userId, date, content, title = '') => {
  const existing = await this.findByDate(userId, date);

  const conn = await connectDB();
  if (existing) {
    await conn.query(
      'UPDATE diaries SET content = ?, title = ? WHERE user_id = ? AND d = ?',
      [content, title || existing.title, userId, date]
    );
    await conn.end();
    return {
      user_id: userId,
      d: date,
      content,
      title: title || existing.title,
      updated: true
    };
  } else {
    await conn.query(
      'INSERT INTO diaries (user_id, d, title, content, mood) VALUES (?, ?, ?, ?, ?)',
      [userId, date, title, content, null]
    );
    await conn.end();
    return {
      user_id: userId,
      d: date,
      content,
      title,
      created: true
    };
  }
};