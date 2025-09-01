const userRepo = require('../repositories/user.repo');
const jwt = require('../config/jwt');

exports.login = async (email, password) => {
    const user = await userRepo.findByEmail(email);
    if (!user) throw new Error('회원을 찾을 수 없습니다');

    if (user.password !== password) throw new Error('비밀번호가 일치하지 않습니다');
};
