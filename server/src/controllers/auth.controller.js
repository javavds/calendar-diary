const authService = require('../services/auth.service');


// 로그인
exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const token = await authService.login(email, password);
        res.json({ token });
    } catch (err) {
        next(err);
    }
};

// 회원가입
exports.register = async (req, res, next) => {
    try {
        const { email, password, name } = req.body;
        if (!email || !password || !name) {
            return res.status(400).json({ error: 'email, password, name을 필수로 입력해주세요' });
        }

        const user = await authService.register(email, password, name);
        res.status(201).json({ message: '회원가입 성공', user });
    } catch (err) {
        next(err);
    }
};


