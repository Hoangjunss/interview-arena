import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import { AuthProvider } from './auth/AuthContext'
import { useAuth } from './auth/useAuth'
import { LoginPage } from './pages/LoginPage'
import { RegisterPage } from './pages/RegisterPage'
import './index.css'

function HomePage() {
  const { user, logout } = useAuth()

  return (
    <div className="home-container">
      <h1 className="hero-title">Interview Arena</h1>
      {user ? (
        <>
          <p className="hero-subtitle">
            Xin chào, <strong>{user.displayName}</strong> ({user.email})! Sẵn sàng luyện tập phỏng vấn chưa?
          </p>
          <div className="cta-group">
            <Link className="btn-primary" to="/dashboard">
              Bắt đầu luyện tập
            </Link>
            <button
              className="btn-secondary"
              onClick={logout}
              style={{ cursor: 'pointer' }}
            >
              Đăng xuất
            </button>
          </div>
        </>
      ) : (
        <>
          <p className="hero-subtitle">
            Nền tảng luyện phỏng vấn AI, ôn tập câu hỏi qua thẻ ghi nhớ (Flashcards SRS) và mô phỏng phỏng vấn trực tiếp.
          </p>
          <div className="cta-group">
            <Link className="btn-primary" to="/login">
              Đăng nhập
            </Link>
            <Link className="btn-secondary" to="/register">
              Đăng ký tài khoản
            </Link>
          </div>
        </>
      )}
    </div>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}
