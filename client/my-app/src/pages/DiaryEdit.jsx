// src/pages/DiaryEdit.jsx
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getDiary, saveDiary } from '../api/diary';
import { getNow } from '../api/weather';

export default function DiaryEdit() {
    const { date } = useParams();
    const navigate = useNavigate();
    const [form, setForm] = useState({ title: '', content: '', mood: '' });
    const [nowWx, setNowWx] = useState(null);

    useEffect(() => {
        // 기존 일기 로딩
        getDiary(date).then((res) => {
            if (res.data) {
                setForm({
                    title: res.data.title || '',
                    content: res.data.content || '',
                    mood: res.data.mood || '',
                });
            }
        });
        // 현재 날씨
        getNow().then((res) => setNowWx(res.data));
    }, [date]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await saveDiary(date, form);
        navigate(`/diary/${date}`);
    };

    return (
        <div className="card">
            <h2>{date} 일기 쓰기</h2>
            {nowWx && <div className="muted">오늘 날씨: {nowWx.summary}</div>}

            <form onSubmit={handleSubmit}>
                <label>
                    제목
                    <input name="title" value={form.title} onChange={handleChange} required />
                </label>

                <label>
                    기분
                    <select name="mood" value={form.mood} onChange={handleChange}>
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
                    <textarea name="content" rows="10" value={form.content} onChange={handleChange} required />
                </label>

                <button>저장</button>
            </form>
        </div>
    );
}
