import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './auth/AuthContext'
import { AppShell } from './components/layout/AppShell'
import { HomePage } from './pages/HomePage'
import { LoginPage } from './pages/LoginPage'
import { RegisterPage } from './pages/RegisterPage'
import { QuestionBankPage } from './pages/QuestionBankPage'
import { QuestionDetailPage } from './pages/QuestionDetailPage'
import { FlashcardsPage } from './pages/FlashcardsPage'
import { QuizPage } from './pages/QuizPage'
import { InterviewSetupPage } from './pages/InterviewSetupPage'
import { InterviewSessionPage } from './pages/InterviewSessionPage'
import { ProgressPage } from './pages/ProgressPage'
import { DsaListPage } from './pages/DsaListPage'
import { DsaProblemPage } from './pages/DsaProblemPage'

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route element={<AppShell />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/questions" element={<QuestionBankPage />} />
            <Route path="/questions/:id" element={<QuestionDetailPage />} />
            <Route path="/flashcards" element={<FlashcardsPage />} />
            <Route path="/quiz/:questionId" element={<QuizPage />} />
            <Route path="/interviews/new" element={<InterviewSetupPage />} />
            <Route path="/interviews/:sessionId" element={<InterviewSessionPage />} />
            <Route path="/dsa" element={<DsaListPage />} />
            <Route path="/dsa/:slug" element={<DsaProblemPage />} />
            <Route path="/progress" element={<ProgressPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}
