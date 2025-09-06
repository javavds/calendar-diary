import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Signup.css';

export default function Signup() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [pw, setPw] = useState('');
  const [pw2, setPw2] = useState('');
  const [pending, setPending] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    setError(''); setSuccess('');

    if (pw !== pw2) {
      setError('비밀번호가 서로 달라요.');
      return;
    }
    setPending(true);
    try {
      // 👉 백엔드 엔드포인트에 맞춰 변경: /api/signup 또는 /foodiediary/user/signup 등
      const res = await fetch('http://localhost:5555/auth/signup', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ name, email, password: pw })
      });

      if (!res.ok) {
        const msg = (await res.json().catch(() => ({})))?.error || '회원가입 실패';
        throw new Error(msg);
      }

      setSuccess('반짝! 각인에 성공했어요 ✨ 이제 로그인해 주세요.');
      setTimeout(() => navigate('/login'), 900);
    } catch (err) {
      setError(err.message || '문제가 발생했어요.');
    } finally {
      setPending(false);
    }
  };

  return (
    <div className="signup-landing">
      <div className="lace-frame" aria-hidden />
      <div className="gilded-light" aria-hidden />

      <main className="signup-card" role="main">
        <div className="card-head">
          <span className="mini-crown" aria-hidden>👑</span>
          <h1 className="title">
            일기 주인으로<br/>각인하기
          </h1>
          <p className="subtitle">Princess Registry • 일기장의 주인으로 인정받기</p>
        </div>

        <form className="form" onSubmit={submit}>
          <label className="field">
            <span className="field-label">이름</span>
            <input
              type="text"
              required
              value={name}
              onChange={(e)=>setName(e.target.value)}
              placeholder="홍길동"
            />
          </label>

          <label className="field">
            <span className="field-label">이메일</span>
            <input
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
              placeholder="you@example.com"
            />
          </label>

          <label className="field">
            <span className="field-label">비밀번호</span>
            <input
              type="password"
              required
              autoComplete="new-password"
              value={pw}
              onChange={(e)=>setPw(e.target.value)}
              placeholder="••••••••"
              minLength={6}
            />
          </label>

          <label className="field">
            <span className="field-label">비밀번호 확인</span>
            <input
              type="password"
              required
              autoComplete="new-password"
              value={pw2}
              onChange={(e)=>setPw2(e.target.value)}
              placeholder="••••••••"
              minLength={6}
            />
          </label>

          {error && <div className="error" role="alert">{error}</div>}
          {success && <div className="success" role="status">{success}</div>}

          <button className="btn-signup" type="submit" disabled={pending}>
            {pending ? '각인 중… ✒️' : '💗 각인 완료하기'}
          </button>
        </form>

        <div className="foot">
          <span>이미 주인이신가요?</span>
          <Link to="/login" className="link-login">🔐 암호문으로 입장</Link>
        </div>
      </main>

      {/* 장식 */}
      <img className="deco-lock" src="/assets/rococo-lock.png" alt="" aria-hidden />
      <img className="deco-key"  src="/assets/rococo-key.png"  alt="" aria-hidden />
    </div>
  );
}
