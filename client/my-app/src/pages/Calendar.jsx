import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Calendar() {
    const [date, setDate] = useState(() => {
        const d = new Date();
        const off = d.getTimezoneOffset();
        const local = new Date(d.getTime() - off * 60000);
        return local.toISOString().slice(0, 10);
    });
    const nav = useNavigate();

    return (
        <div className="card">
            <h2>캘린더</h2>
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
            <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
                <button onClick={() => nav(`/diary/${date}`)}>보기</button>
                <button onClick={() => nav(`/diary/${date}/edit`)}>쓰기/수정</button>
            </div>
        </div>
    );
}
