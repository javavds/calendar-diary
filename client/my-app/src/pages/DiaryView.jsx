import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getDiary } from '../api/diary';
import { getByDate } from '../api/weather';

export default function DiaryView() {
    const { date } = useParams();
    const [item, setItem] = useState(null);
    const [wx, setWx] = useState(null);

    useEffect(() => {
        getDiary(date).then((res) => setItem(res.data || null));
        getByDate(date).then((res) => setWx(res.data || null));
    }, [date]);

    return (
        <div className="card">
            <h2>{date} 일기</h2>
            {wx && <div className="muted">날씨: {wx.summary}</div>}
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
