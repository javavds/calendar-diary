import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getDiary, saveDiary } from '../api/diary';
import { getNow } from '../api/weather';

const FALLBACK = { lat: 36.12, lon: 128.35 }; // 구미 대략값

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
            .catch(() => {}); // 조용히 무시

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
        <div className="card">
            <h2>{date} 일기 쓰기</h2>
            {nowWx && (
                <div className="muted">
                    오늘 날씨: {nowWx.summary} ({nowWx.tempC}℃)
                </div>
            )}

            <form onSubmit={submit}>
                <label>
                    제목
                    <input
                        name="title"
                        value={form.title}
                        onChange={(e) => setForm({ ...form, title: e.target.value })}
                        required
                    />
                </label>

                <label>
                    기분
                    <select name="mood" value={form.mood} onChange={(e) => setForm({ ...form, mood: e.target.value })}>
                        <option value="">-- 선택하세요 --</option>
                        <option value="행복">행복</option>
                        <option value="기쁨">기쁨</option>
                        <option value="슬픔">슬픔</option>
                        <option value="분노">분노</option>
                        <option value="피곤">피곤</option>
                    </select>
                </label>

                <label>
                    내용
                    <textarea
                        name="content"
                        rows={10}
                        value={form.content}
                        onChange={(e) => setForm({ ...form, content: e.target.value })}
                        required
                    />
                </label>

                <button>저장</button>
            </form>
        </div>
    );
}
