// src/pages/Logout.jsx
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Logout() {
    const navigate = useNavigate();

    useEffect(() => {
        // 토큰 제거
        localStorage.removeItem('token');

        // 로그아웃 후 로그인 페이지로 이동
        navigate('/login');
    }, [navigate]);

    return (
        <div className="logout">
            <h2>로그아웃 중...</h2>
            <p>잠시만 기다려주세요.</p>
        </div>
    );
}
