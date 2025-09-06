require('dotenv').config();
const express = require('express');
const cors = require('cors');

if (!process.env.JWT_SECRET) {
    // 개발 기본값 (운영에선 반드시 환경변수 설정)
    process.env.JWT_SECRET = 'dev-secret-change-me';
}

const app = express();

app.use(express.json());
app.use(cors()); // 기본 전체 허용

// 요청 로깅(선택)
app.use((req, res, next) => {
    console.log('[REQ]', req.method, req.originalUrl);
    next();
});

const authRoutes = require('./src/routes/auth.routes');
const diaryRoutes = require('./src/routes/diary.routes');
const weatherRoutes = require('./src/routes/weather.routes');

app.use('/auth', authRoutes);
app.use('/diary', diaryRoutes);
app.use('/weather', weatherRoutes);

// 404
app.use((req, res) => res.status(404).json({ message: 'Not Found' }));

// 에러 미들웨어 (반드시 마지막)
const error = require('./src/middleware/error');
app.use(error);

const PORT = process.env.PORT || 5555;
app.listen(PORT, () => console.log(`서버 실행중 http://localhost:${PORT}`));
