import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from '../api/auth';

export default function Register() {
    const [f, setF] = useState({ name: '', email: '', password: '' });
    const nav = useNavigate();

    const submit = async (e) => {
        e.preventDefault();
        try {
            await register(f);
            nav('/login');
        } catch (e) {
            alert(e?.response?.data?.message || '회원가입 실패');
        }
    };

    return (
        <div className="card">
            <h2>회원가입</h2>
            <form onSubmit={submit}>
                <input placeholder="name" onChange={(e) => setF({ ...f, name: e.target.value })} />
                <input placeholder="email" onChange={(e) => setF({ ...f, email: e.target.value })} />
                <input
                    type="password"
                    placeholder="password"
                    onChange={(e) => setF({ ...f, password: e.target.value })}
                />
                <button>가입</button>
            </form>
        </div>
    );
}
