// src/pages/Home.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Home() {
    const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
    const [showPrompt, setShowPrompt] = useState(false);
    const navigate = useNavigate();
    const isLoggedIn = !!localStorage.getItem('token');

    const gotoView = () => {
        if (!isLoggedIn) {
            setShowPrompt(true);
        } else {
            navigate(`/diary/${date}`);
        }
    };

    const gotoWrite = () => {
        if (!isLoggedIn) {
            setShowPrompt(true);
        } else {
            navigate(`/diary/${date}/edit`);
        }
    };

    return (
        <div className="home">
            <h1>나의 일기장</h1>
            <p className="subtitle">소중한 하루를 기록하세요</p>

            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />

            <div className="actions">
                <button onClick={gotoView}>일기 보기</button>
                <button onClick={gotoWrite}>일기 쓰기</button>
            </div>

            {/* 로그인 안내 모달 */}
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
