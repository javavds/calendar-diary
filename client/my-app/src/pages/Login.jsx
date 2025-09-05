import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { login } from '../api/auth';

export default function Login() {
    const [f, setF] = useState({ email: '', password: '' });
    const nav = useNavigate();

    const submit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await login(f); // { token }
            localStorage.setItem('token', data.token);
            nav('/calendar'); // 로그인 후 캘린더로
        } catch (e) {
            alert(e?.response?.data?.message || '로그인 실패');
        }
    };

    return (
        <div className="card">
            <h2>로그인</h2>
            <form onSubmit={submit}>
                <input placeholder="email" onChange={(e) => setF({ ...f, email: e.target.value })} />
                <input
                    type="password"
                    placeholder="password"
                    onChange={(e) => setF({ ...f, password: e.target.value })}
                />
                <button>로그인</button>
            </form>
            <Link to="/register">회원가입</Link>
        </div>
    );
}
