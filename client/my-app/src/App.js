// src/App.js
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home'; // 추가
import Login from './pages/Login';
import Register from './pages/Register';
import DiaryView from './pages/DiaryView';
import DiaryEdit from './pages/DiaryEdit';
import './App.css';

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route
                    path="/diary/:date"
                    element={
                        <ProtectedRoute>
                            <DiaryView />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/diary/:date/edit"
                    element={
                        <ProtectedRoute>
                            <DiaryEdit />
                        </ProtectedRoute>
                    }
                />
                {/* 없는 경로 처리 */}
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </BrowserRouter>
    );
}
