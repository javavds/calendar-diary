import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

export default function Home() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const goLogin = () => navigate('/login');
  const goSignup = () => navigate('/signup');

  return (
    <div className="landing">
      <header className="landing__header" aria-hidden>
        <h1 className="sr-only">나의 일기장</h1>
      </header>

      <section
        className={`cover ${menuOpen ? 'cover--open' : ''}`}
        onMouseEnter={() => setMenuOpen(true)}
        onMouseLeave={() => setMenuOpen(false)}
      >
        {/* 키보드/모바일 토글용 버튼 */}
        <button
          className="cover__toggle"
          aria-expanded={menuOpen}
          aria-controls="spell-menu"
          onClick={() => setMenuOpen((v) => !v)}
        >
          ✨ 마법서 펼치기
        </button>

        {/* 북커버 일러스트 */}
        <img
          className="cover__image"
          src="/assets/rococo-diary.png"
          alt="연핑크 레이스 & 리본, 보석과 자물쇠가 달린 로코코 스타일 다이어리 표지"
          draggable="false"
        />

        {/* Hover/Fous 시 나타나는 선택 메뉴 */}
        <div
          id="spell-menu"
          className="cover__menu"
          role="menu"
          aria-label="마법 선택"
        >
          <button className="spell spell--login" role="menuitem" onClick={goLogin}>
            🔐 암호문 말해서 <strong>일기 펼치기</strong>
            <span className="spell__hint">로그인으로 이동</span>
          </button>

          <button className="spell spell--signup" role="menuitem" onClick={goSignup}>
            ✒️ 일기 주인으로 <strong>각인하기</strong>
            <span className="spell__hint">회원가입으로 이동</span>
          </button>
        </div>

        {/* 금박 글로우 장식 */}
        <div className="gilded-glow" aria-hidden />
      </section>
    </div>
  );
}
