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
exports.saveDiary = async (userId, date, title = '', content = '', mood = null) => {
  const existing = await exports.findByDate(userId, date);

  const conn = await connectDB();
  try {
  if (existing) {
    await conn.query(
      'UPDATE diaries SET title = ?, content = ?, mood = ? WHERE user_id = ? AND d = ?',
      [title || existing.title, content, mood, userId, date]
    );
    return {
      user_id: userId,
      d: date,
      title: title || existing.title,
      content,
      updated: true
    };
  } else {
    await conn.query(
      'INSERT INTO diaries (user_id, d, title, content, mood) VALUES (?, ?, ?, ?, ?)',
      [userId, date, title, content, mood]
    );
    return {
      user_id: userId,
      d: date,
      title,
      content,
      mood,
      created: true
    };
    }
  } finally {
    await conn.end();
  }
};