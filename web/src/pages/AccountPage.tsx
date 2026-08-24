/* Hallmark · pre-emit critique: P5 H5 E5 S5 R5 V5 */
import React, { useState, useEffect, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../auth/useAuth'
import { authApi } from '../api/auth'
import { toast } from 'sonner'
import type { UserProfile } from '../types/auth'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Badge } from '@/components/ui/badge'
import {
  User,
  Mail,
  Calendar,
  Lock,
  CreditCard,
  Sparkles,
  ShieldCheck,
  Eye,
  EyeOff,
  Save,
  Loader2,
  CheckCircle2
} from 'lucide-react'

type Tab = 'profile' | 'security' | 'billing'

function initialsOf(name: string) {
  return name.split(' ').filter(Boolean).slice(-2).map(p => p[0]?.toUpperCase()).join('')
}

function gradientByInitial(name: string) {
  const palettes = [
    'from-violet-500 to-purple-700',
    'from-blue-500 to-cyan-600',
    'from-emerald-500 to-teal-600',
    'from-orange-500 to-red-600',
    'from-pink-500 to-rose-600',
  ]
  const idx = (name.charCodeAt(0) || 0) % palettes.length
  return palettes[idx]
}

export function AccountPage() {
  const { user, logout } = useAuth()
  const [activeTab, setActiveTab] = useState<Tab>('profile')
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [loadingProfile, setLoadingProfile] = useState(true)

  // Profile form
  const [displayName, setDisplayName] = useState('')
  const [savingName, setSavingName] = useState(false)

  // Password form
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showCurrent, setShowCurrent] = useState(false)
  const [showNew, setShowNew] = useState(false)
  const [savingPassword, setSavingPassword] = useState(false)
  const [passwordError, setPasswordError] = useState<string | null>(null)

  useEffect(() => {
    authApi.getProfile()
      .then(p => {
        setProfile(p)
        setDisplayName(p.displayName)
      })
      .catch(() => toast.error('Không thể tải thông tin tài khoản'))
      .finally(() => setLoadingProfile(false))
  }, [])

  async function handleSaveProfile(e: FormEvent) {
    e.preventDefault()
    if (!displayName.trim() || displayName.trim().length < 2) return
    setSavingName(true)
    try {
      const updated = await authApi.updateProfile(displayName.trim())
      setProfile(updated)
      // Update localStorage user object
      const raw = localStorage.getItem('user')
      if (raw) {
        const u = JSON.parse(raw)
        localStorage.setItem('user', JSON.stringify({ ...u, displayName: updated.displayName }))
      }
      toast.success('Đã cập nhật tên hiển thị')
    } catch {
      toast.error('Cập nhật thất bại, thử lại sau')
    } finally {
      setSavingName(false)
    }
  }

  async function handleChangePassword(e: FormEvent) {
    e.preventDefault()
    setPasswordError(null)
    if (newPassword !== confirmPassword) {
      setPasswordError('Mật khẩu mới và xác nhận không khớp')
      return
    }
    if (newPassword.length < 6) {
      setPasswordError('Mật khẩu mới phải có ít nhất 6 ký tự')
      return
    }
    setSavingPassword(true)
    try {
      await authApi.changePassword(currentPassword, newPassword)
      toast.success('Đổi mật khẩu thành công! Vui lòng đăng nhập lại.')
      setCurrentPassword('')
      setNewPassword('')
      setConfirmPassword('')
      setTimeout(() => logout(), 2000)
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Đổi mật khẩu thất bại'
      setPasswordError(msg)
    } finally {
      setSavingPassword(false)
    }
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center py-20 text-muted-foreground">
        Bạn cần đăng nhập để xem trang này.
      </div>
    )
  }

  const gradient = gradientByInitial(user.displayName)
  const initials = initialsOf(user.displayName) || 'U'

  const TABS: { id: Tab; label: string; icon: React.ElementType }[] = [
    { id: 'profile', label: 'Hồ sơ', icon: User },
    { id: 'security', label: 'Bảo mật', icon: Lock },
    { id: 'billing', label: 'Gói dịch vụ', icon: CreditCard },
  ]

  return (
    <div className="flex flex-col gap-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
        {/* Avatar */}
        <div className={`h-20 w-20 rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center font-black text-2xl text-white shadow-lg shrink-0`}>
          {initials}
        </div>
        <div className="space-y-1 text-left">
          <h1 className="text-2xl font-black tracking-tight">{user.displayName}</h1>
          <p className="text-sm text-muted-foreground flex items-center gap-1.5">
            <Mail className="h-3.5 w-3.5" />
            {user.email}
          </p>
          {profile?.createdAt && (
            <p className="text-xs text-muted-foreground flex items-center gap-1.5">
              <Calendar className="h-3 w-3" />
              Thành viên từ {new Date(profile.createdAt).toLocaleDateString('vi-VN', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          )}
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex gap-1 border border-border rounded-xl p-1 bg-muted/30 w-fit">
        {TABS.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
              activeTab === tab.id
                ? 'bg-card text-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <tab.icon className="h-4 w-4" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab: Hồ sơ */}
      {activeTab === 'profile' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="md:col-span-2 bg-card/30 border border-border">
            <CardHeader>
              <CardTitle className="text-base font-bold flex items-center gap-2">
                <User className="h-4 w-4 text-accent" />
                Thông tin cá nhân
              </CardTitle>
              <CardDescription>Cập nhật tên hiển thị của bạn trong hệ thống.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSaveProfile} className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="displayName">Tên hiển thị</Label>
                  <Input
                    id="displayName"
                    value={displayName}
                    onChange={e => setDisplayName(e.target.value)}
                    placeholder="Nhập tên hiển thị"
                    minLength={2}
                    maxLength={80}
                    required
                    className="bg-muted/30"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Email</Label>
                  <Input
                    value={user.email}
                    disabled
                    className="bg-muted/20 text-muted-foreground cursor-not-allowed"
                  />
                  <p className="text-xs text-muted-foreground">Email không thể thay đổi</p>
                </div>
                <Button
                  type="submit"
                  disabled={savingName || displayName.trim() === profile?.displayName}
                  className="gap-2 font-semibold"
                >
                  {savingName ? (
                    <><Loader2 className="h-4 w-4 animate-spin" />Đang lưu...</>
                  ) : (
                    <><Save className="h-4 w-4" />Lưu thay đổi</>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Info summary card */}
          <Card className="bg-card/20 border border-border/60 h-fit">
            <CardContent className="p-5 space-y-4">
              <h3 className="text-sm font-semibold flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-green-500" />
                Trạng thái tài khoản
              </h3>
              <div className="space-y-3 text-xs text-muted-foreground">
                <div className="flex items-center justify-between">
                  <span>Email đã xác thực</span>
                  <CheckCircle2 className="h-3.5 w-3.5 text-green-500" />
                </div>
                <div className="flex items-center justify-between">
                  <span>Tài khoản</span>
                  <span className="text-foreground font-medium">Hoạt động</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>ID người dùng</span>
                  <span className="font-mono text-[10px] text-foreground">{user.userId.slice(0, 8)}...</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Tab: Bảo mật */}
      {activeTab === 'security' && (
        <Card className="max-w-lg bg-card/30 border border-border">
          <CardHeader>
            <CardTitle className="text-base font-bold flex items-center gap-2">
              <Lock className="h-4 w-4 text-accent" />
              Đổi mật khẩu
            </CardTitle>
            <CardDescription>
              Sau khi đổi thành công, bạn sẽ được đăng xuất để đăng nhập lại bằng mật khẩu mới.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleChangePassword} className="space-y-5">
              {passwordError && (
                <Alert variant="destructive">
                  <AlertDescription>{passwordError}</AlertDescription>
                </Alert>
              )}

              <div className="space-y-2">
                <Label htmlFor="current-password">Mật khẩu hiện tại</Label>
                <div className="relative">
                  <Input
                    id="current-password"
                    type={showCurrent ? 'text' : 'password'}
                    value={currentPassword}
                    onChange={e => setCurrentPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    className="pr-10 bg-muted/30"
                  />
                  <button
                    type="button"
                    onClick={() => setShowCurrent(v => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showCurrent ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="new-password">Mật khẩu mới</Label>
                <div className="relative">
                  <Input
                    id="new-password"
                    type={showNew ? 'text' : 'password'}
                    value={newPassword}
                    onChange={e => setNewPassword(e.target.value)}
                    placeholder="Ít nhất 6 ký tự"
                    minLength={6}
                    required
                    className="pr-10 bg-muted/30"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNew(v => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showNew ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirm-password">Xác nhận mật khẩu mới</Label>
                <Input
                  id="confirm-password"
                  type="password"
                  value={confirmPassword}
                  onChange={e => setConfirmPassword(e.target.value)}
                  placeholder="Nhập lại mật khẩu mới"
                  required
                  className={`bg-muted/30 ${confirmPassword && newPassword !== confirmPassword ? 'border-destructive' : ''}`}
                />
              </div>

              <Button
                type="submit"
                disabled={savingPassword || !currentPassword || !newPassword || !confirmPassword}
                className="w-full font-semibold gap-2"
              >
                {savingPassword ? (
                  <><Loader2 className="h-4 w-4 animate-spin" />Đang xử lý...</>
                ) : (
                  <><Lock className="h-4 w-4" />Đổi mật khẩu</>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Tab: Gói dịch vụ */}
      {activeTab === 'billing' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="bg-card/30 border border-border">
            <CardHeader>
              <CardTitle className="text-base font-bold flex items-center gap-2">
                <CreditCard className="h-4 w-4 text-accent" />
                Gói hiện tại
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between py-4 border-y border-border/60">
                <div>
                  <p className="text-sm font-semibold">Interview Arena Free</p>
                  <p className="text-xs text-muted-foreground mt-0.5">Hạn ngạch hàng ngày</p>
                </div>
                <Badge variant="secondary" className="font-mono">FREE</Badge>
              </div>
              <ul className="space-y-2 text-sm text-muted-foreground text-left">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-500 shrink-0" />
                  Câu hỏi lý thuyết không giới hạn
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-500 shrink-0" />
                  Flashcard SRS không giới hạn
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-500 shrink-0" />
                  3 phỏng vấn AI / ngày
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-500 shrink-0" />
                  20 lượt nộp bài DSA / ngày
                </li>
              </ul>
              <Button asChild className="w-full font-bold gap-2 bg-accent hover:bg-accent/90 text-accent-foreground">
                <Link to="/billing">
                  <Sparkles className="h-4 w-4" />
                  Nâng cấp lên Pro — $5/tháng
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-card/20 border border-border/60">
            <CardContent className="p-6 space-y-4">
              <h3 className="text-sm font-semibold flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-accent" />
                Pro Plan mở khóa gì?
              </h3>
              <ul className="space-y-2.5 text-xs text-muted-foreground text-left">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-accent mt-0.5 shrink-0" />
                  <span>Phỏng vấn AI <strong className="text-foreground">không giới hạn</strong> mỗi ngày</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-accent mt-0.5 shrink-0" />
                  <span>Nộp bài DSA <strong className="text-foreground">không giới hạn</strong> mỗi ngày</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-accent mt-0.5 shrink-0" />
                  <span>Hỗ trợ đầy đủ 4 ngôn ngữ lập trình cho DSA</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-accent mt-0.5 shrink-0" />
                  <span>Ưu tiên băng thông thực thi chấm bài tốc độ cao</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
