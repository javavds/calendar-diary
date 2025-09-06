import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import Calendar from './pages/Calendar';
import Login from './pages/Login';
import Signup from './pages/Signup';
import DiaryView from './pages/DiaryView';
import DiaryEdit from './pages/DiaryEdit';
import Logout from './pages/Logout';
import Menu from './pages/Menu';
import './App.css';

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route
                    path="/calendar"
                    element={
                        <ProtectedRoute>
                            <Calendar />
                        </ProtectedRoute>
                    }
                />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/menu" element={<Menu />} />
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
                <Route path="*" element={<Navigate to="/" replace />} />
                <Route path="/logout" element={<Logout />} />
            </Routes>
        </BrowserRouter>
    );
}
