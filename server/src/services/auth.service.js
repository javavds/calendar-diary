const userRepo = require('../repositories/user.repo');
const jwt = require('../config/jwt');
const bcrypt = require('bcrypt');

// 로그인
exports.login = async (email, password) => {
    const user = await userRepo.findByEmail(email);
    if (!user) throw new Error('회원을 찾을 수 없습니다');

    const ok = await bcrypt.compare(password, user.password_hash);
    if (!ok) throw new Error('비밀번호가 일치하지 않습니다');

    return jwt.generateToken({ id: user.id, email: user.email });
};

// 회원가입
exports.register = async (email, password, name) => {
    const existing = await userRepo.findByEmail(email);
    if (existing) {
        throw new Error('이미 가입된 이메일 입니다.');
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const user = await userRepo.createUser(email, passwordHash, name);
    return user;
};
