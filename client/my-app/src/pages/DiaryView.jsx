import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getDiary } from '../api/diary';
import { getByDate } from '../api/weather';
import './DiaryView.css';

const FALLBACK = { lat: 36.12, lon: 128.35 };
const PARCHMENT_URL = `${process.env.PUBLIC_URL || ''}/assets/parchment.jpg`;

export default function DiaryView() {
  const { date } = useParams();
  const nav = useNavigate();
  const [item, setItem] = useState(null);
  const [wx, setWx] = useState(null);
  const [coord, setCoord] = useState(FALLBACK);

  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => setCoord({ lat: pos.coords.latitude, lon: pos.coords.longitude }),
        () => setCoord(FALLBACK),
        { enableHighAccuracy: false, timeout: 4000 }
      );
    }
  }, []);

  useEffect(() => {
    getDiary(date)
      .then((res) => setItem(res.data || null))
      .catch(() => setItem(null));

    getByDate(date, coord)
      .then((res) => setWx(res.data || null))
      .catch(() => setWx(null));
  }, [date, coord]);

  return (
    <div className="view-landing">
      {/* 배경 양피지 & 만년필 데코 */}
      <div
        className="parchment-bg"
        aria-hidden
        style={{ backgroundImage: `url(${PARCHMENT_URL})` }}
      />
      <img className="deco-pen" src="/assets/fountain-pen.png" alt="" aria-hidden />

      <main className="view-card">
        <header className="view-head">
          <h2 className="view-title">👑 {date} 일기</h2>
          {wx && (
            <div className="wx-pill">
              {wx.summary} · 최고 {wx.tMaxC}℃ / 최저 {wx.tMinC}℃
            </div>
          )}
        </header>

        {item ? (
          <article className="entry">
            <h3 className="entry-title">{item.title}</h3>
            <div className="entry-meta">
              <span className="mood-badge">{item.mood || '기분 미설정'}</span>
            </div>
            <div className="entry-content">{item.content}</div>
          </article>
        ) : (
          <div className="empty">
            아직 작성된 일기가 없어요. ✍️
          </div>
        )}

        <div className="actions">
          <button
            className="btn-primary"
            onClick={() => nav(`/diary/${date}/edit`)}
          >
            ✍️ 쓰기/수정
          </button>
          <button
            className="btn-logout"
            onClick={() => nav('/menu')}
          >
            🏰 메뉴로 가기
          </button>
        </div>
      </main>
    </div>
  );
}
