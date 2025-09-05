import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getDiary } from '../api/diary';
import { getByDate } from '../api/weather';

const FALLBACK = { lat: 36.12, lon: 128.35 };

export default function DiaryView() {
    const { date } = useParams();
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
        <div className="card">
            <h2>{date} 일기</h2>
            {wx && (
                <div className="muted">
                    날씨: {wx.summary} (최고 {wx.tMaxC}℃ / 최저 {wx.tMinC}℃)
                </div>
            )}
            {item ? (
                <>
                    <h3>{item.title}</h3>
                    <pre>{item.content}</pre>
                </>
            ) : (
                <p>작성된 일기가 없습니다.</p>
            )}
            <Link to={`/diary/${date}/edit`}>쓰기/수정</Link>
        </div>
    );
}
