import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getDiary, saveDiary } from '../api/diary';
import { getNow } from '../api/weather';
import './DiaryEdit.css';

const FALLBACK = { lat: 36.12, lon: 128.35 }; // 구미 대략값
const PARCHMENT_URL = `${process.env.PUBLIC_URL || ''}/assets/parchment.jpg`;

export default function DiaryEdit() {
  const { date } = useParams();
  const nav = useNavigate();
  const [form, setForm] = useState({ title: '', content: '', mood: '' });
  const [nowWx, setNowWx] = useState(null);
  const [coord, setCoord] = useState(FALLBACK);

  // 좌표
  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => setCoord({ lat: pos.coords.latitude, lon: pos.coords.longitude }),
        () => setCoord(FALLBACK),
        { enableHighAccuracy: false, timeout: 4000 }
      );
    }
  }, []);

  // 일기/날씨
  useEffect(() => {
    getDiary(date)
      .then((res) => {
        if (res.data)
          setForm({
            title: res.data.title || '',
            content: res.data.content || '',
            mood: res.data.mood || '',
          });
      })
      .catch(() => {});

    getNow(coord)
      .then((res) => setNowWx(res.data))
      .catch(() => setNowWx(null));
  }, [date, coord]);

  const submit = async (e) => {
    e.preventDefault();
    await saveDiary(date, form);
    nav(`/diary/${date}`);
  };

  return (
    <div className="edit-landing">
      {/* 배경 데코 */}
      <div
        className="parchment-bg"
        aria-hidden
        style={{ backgroundImage: `url(${PARCHMENT_URL})` }}
      />
      <img className="deco-pen" src="/assets/fountain-pen.png" alt="" aria-hidden />

      <main className="edit-card">
        <header className="edit-head">
          <h2 className="edit-title">👑 {date} 일기 쓰기</h2>
          {nowWx && (
            <div className="wx-pill">
              {nowWx.summary} · {nowWx.tempC}℃
            </div>
          )}
        </header>

        <form className="edit-form" onSubmit={submit}>
          <label className="field">
            <span className="label">제목</span>
            <input
              name="title"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              required
              placeholder="오늘의 이야기를 한 줄로…"
            />
          </label>

          <label className="field">
            <span className="label">기분</span>
            <select
              name="mood"
              value={form.mood}
              onChange={(e) => setForm({ ...form, mood: e.target.value })}
            >
              <option value="">-- 선택하세요 --</option>
              <option value="행복">😊 행복</option>
              <option value="기쁨">😄 기쁨</option>
              <option value="슬픔">😢 슬픔</option>
              <option value="분노">😠 분노</option>
              <option value="피곤">🥱 피곤</option>
            </select>
          </label>

          <label className="field">
            <span className="label">내용</span>
            <textarea
              name="content"
              rows={12}
              value={form.content}
              onChange={(e) => setForm({ ...form, content: e.target.value })}
              placeholder="반짝이는 하루를 적어주세요…"
              required
            />
          </label>

          <div className="actions">
            <button className="btn-primary">💗 저장</button>
            <button
              type="button"
              className="btn-ghost"
              onClick={() => nav(`/diary/${date}`)}
            >
              🔍 훑어보기
            </button>
            <button
              type="button"
              className="btn-logout"
              onClick={() => nav('/menu')}
            >
              🏰 메뉴로 가기
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
