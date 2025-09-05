import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Home() {
    const [date, setDate] = useState(() => {
        const d = new Date();
        const off = d.getTimezoneOffset();
        const local = new Date(d.getTime() - off * 60000);
        return local.toISOString().slice(0, 10);
    });
    const [showPrompt, setShowPrompt] = useState(false);
    const navigate = useNavigate();
    const isLoggedIn = !!localStorage.getItem('token');

    const gotoView = () => (isLoggedIn ? navigate(`/diary/${date}`) : setShowPrompt(true));
    const gotoWrite = () => (isLoggedIn ? navigate(`/diary/${date}/edit`) : setShowPrompt(true));

    return (
        <div className="home">
            <h1>나의 일기장</h1>
            <p className="subtitle">소중한 하루를 기록하세요</p>

            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />

            <div className="actions">
                <button onClick={gotoView}>일기 보기</button>
                <button onClick={gotoWrite}>일기 쓰기</button>
            </div>

            {showPrompt && (
                <div className="modal-backdrop">
                    <div className="modal">
                        <p>일기를 보거나 쓰려면 로그인이 필요합니다.</p>
                        <button
                            onClick={() => {
                                setShowPrompt(false);
                                navigate('/login');
                            }}
                        >
                            로그인 하러가기
                        </button>
                        <button onClick={() => setShowPrompt(false)}>취소</button>
                    </div>
                </div>
            )}
        </div>
    );
}
