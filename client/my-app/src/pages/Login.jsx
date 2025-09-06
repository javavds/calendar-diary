import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Login.css';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [pending, setPending] = useState(false);
  const [error, setError] = useState('');

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setPending(true);

    try {
      // 👉 백엔드 엔드포인트 맞춰서 수정 가능
      const res = await fetch('http://localhost:5555/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        const msg = (await res.json().catch(() => ({})))?.error || '로그인 실패';
        throw new Error(msg);
      }

      const data = await res.json();
      // 토큰 저장 (프로젝트에서 이미 사용 중)
      if (data?.token) localStorage.setItem('token', data.token);

      navigate('/menu'); // 로그인 후 홈으로
    } catch (err) {
      setError(err.message || '문제가 발생했어요.');
    } finally {
      setPending(false);
    }
  };

  return (
    <div className="login-landing">
      {/* 금박/레이스 배경 데코 */}
      <div className="lace-frame" aria-hidden />
      <div className="gilded-light" aria-hidden />

      {/* 왼쪽에 떠있는 열쇠, 오른쪽에 자물쇠 */}
      <img
        className="deco-key"
        src="/assets/rococo-key.png"
        alt=""
        aria-hidden
        draggable="false"
      />
      <img
        className="deco-lock"
        src="/assets/rococo-lock.png"
        alt=""
        aria-hidden
        draggable="false"
      />

      {/* 로그인 카드 */}
      <main className="login-card" role="main">
        <div className="card-head">
          <span className="mini-crown" aria-hidden>👑</span>
          <h1 className="title">암호문을 속삭여<br/>다이어리를 여세요</h1>
          <p className="subtitle">Princess Access • 다이어리를 여는 비밀 암호</p>
        </div>

        <form className="form" onSubmit={onSubmit}>
          <label className="field">
            <span className="field-label">이메일</span>
            <input
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
            />
          </label>

          <label className="field">
            <span className="field-label">비밀번호</span>
            <input
              type="password"
              required
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
            />
          </label>

          {error && <div className="error" role="alert">{error}</div>}

          <button className="btn-login" type="submit" disabled={pending}>
            {pending ? '자물쇠 여는 중…' : '🔐 암호문 제출'}
          </button>
        </form>

        <div className="foot">
          <span>아직 주인이 아니신가요?</span>
          <Link to="/signup" className="link-signup">💗 일기 주인으로 각인하기</Link>
        </div>
      </main>
    </div>
  );
}
