import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Menu.css';

export default function Menu() {
  const navigate = useNavigate();

  // 로컬 기준 YYYY-MM-DD
  const [date, setDate] = useState(() => {
    const d = new Date();
    const off = d.getTimezoneOffset();
    const local = new Date(d.getTime() - off * 60000);
    return local.toISOString().slice(0, 10);
  });

  const goView = () => navigate(`/diary/${date}`);        // 일기 훑어보기
  const goEdit = () => navigate(`/diary/${date}/edit`);   // 비밀 속삭이기
  const goLogout = () => navigate('/logout');             // 로그아웃(일기 덮기)

  return (
    <div className="menu-landing">
      {/* 레이스/금빛 오라 */}
      <div className="lace-frame" aria-hidden />
      <div className="gilded-light" aria-hidden />

      {/* 데코: 열쇠/자물쇠 */}
      <img className="deco-key"  src="/assets/rococo-key.png"  alt="" aria-hidden />
      <img className="deco-lock" src="/assets/rococo-lock.png" alt="" aria-hidden />

      <main className="menu-card">
        <h1 className="title">나의 다이어리</h1>
        <p className="subtitle">오늘은 어떤 마법을 부를까요?</p>

        {/* 날짜 선택 */}
        <div className="calendar-box">
          <label htmlFor="menu-date" className="calendar-label">
            <span className="label-badge">📅</span>
            날짜 선택
          </label>
          <input
            id="menu-date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="calendar-input"
          />
          <p className="calendar-help">날짜를 고르고 아래 버튼을 눌러주세요.</p>
        </div>

        {/* 액션 버튼 */}
        <div className="actions">
          <button className="menu-btn menu-btn--secondary" onClick={goView}>
            🔍 일기 다시 훑어보기
            <span className="hint">{date} 일기 보기</span>
          </button>
          <button className="menu-btn menu-btn--primary" onClick={goEdit}>
            📖 비밀 속삭이기
            <span className="hint">{date} 일기 쓰기/수정</span>
          </button>
          <button className="menu-btn menu-btn--logout" onClick={goLogout}>
            🗝️ 일기 덮기
            <span className="hint">로그아웃</span>
          </button>
        </div>
      </main>
    </div>
  );
}
