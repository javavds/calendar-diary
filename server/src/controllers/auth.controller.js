const authService = require('../services/auth.service');

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body || {};

    if (!email || !password) {
      return res.status(400).json({ error: 'email, password는 필수입니다.' });
    }

    const token = await authService.login(email, password);
    return res.json({ token });
  } catch (err) {
    console.error('[LOGIN_ERR]', err);

    if (err.code === 'AUTH_INVALID') {
      return res.status(401).json({ error: '이메일 또는 비밀번호가 올바르지 않습니다.' });
    }

    return res.status(500).json({ error: '로그인 중 오류가 발생했습니다.' });
  }
};

exports.register = async (req, res) => {
  try {
    const { email, password, name } = req.body || {};

    if (!email || !password || !name) {
      return res.status(400).json({ error: 'email, password, name을 필수로 입력해주세요' });
    }

    const user = await authService.register(email, password, name);

    // 비밀번호는 응답에 절대 포함하지 않음
    const safeUser = {
      id: user.id,
      email: user.email,
      name: user.name,
      createdAt: user.createdAt,
    };

    return res.status(201).json({ message: '회원가입 성공', user: safeUser });
  } catch (err) {
    console.error('[REGISTER_ERR]', err);

    if (err?.code === 'ER_DUP_ENTRY' || err?.errno === 1062 || err?.code === 'USER_EXISTS') {
      return res.status(409).json({ error: '이미 가입된 이메일입니다.' });
    }

    return res.status(500).json({ error: '회원가입 처리 중 오류가 발생했습니다.' });
  }
};
