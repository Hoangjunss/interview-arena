import { useState, useRef, useEffect } from 'react'
import { NavLink, Outlet, Link } from 'react-router-dom'
import { Menu, Zap, User, CreditCard, BarChart3, LogOut, ChevronDown } from 'lucide-react'
import { useAuth } from '@/auth/useAuth'
import { Button } from '@/components/ui/button'
import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle, SheetClose } from '@/components/ui/sheet'
import { cn } from '@/lib/utils'

const NAV_LINKS = [
  { to: '/questions', label: 'Kho câu hỏi' },
  { to: '/flashcards', label: 'Flashcards' },
  { to: '/interviews/new', label: 'Phỏng vấn AI' },
  { to: '/dsa', label: 'DSA' },
  { to: '/progress', label: 'Tiến độ' },
]

function navLinkClassName({ isActive }: { isActive: boolean }) {
  return cn(
    'relative text-sm font-medium transition-colors hover:text-foreground',
    isActive
      ? 'text-foreground after:absolute after:-bottom-[21px] after:left-0 after:right-0 after:h-[2px] after:rounded-full after:bg-accent after:content-[""]'
      : 'text-muted-foreground'
  )
}

function initialsOf(displayName: string) {
  return displayName
    .split(' ')
    .filter(Boolean)
    .slice(-2)
    .map(part => part[0]?.toUpperCase())
    .join('')
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

function AvatarDropdown({ user, logout }: { user: { email: string; displayName: string }, logout: () => void }) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const initials = initialsOf(user.displayName) || 'U'
  const gradient = gradientByInitial(user.displayName)

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(v => !v)}
        className="flex items-center gap-2 rounded-xl px-2 py-1.5 transition-colors hover:bg-muted/40"
        aria-label="Tài khoản"
      >
        <div className={`flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br ${gradient} font-bold text-xs text-white ring-2 ring-border`}>
          {initials}
        </div>
        <span className="hidden text-sm font-medium text-foreground lg:block max-w-[120px] truncate">
          {user.displayName}
        </span>
        <ChevronDown className={`h-3.5 w-3.5 text-muted-foreground transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 w-56 rounded-xl border border-border bg-card/95 backdrop-blur-md shadow-xl z-50 overflow-hidden">
          {/* User info header */}
          <div className="px-4 py-3 border-b border-border/60">
            <p className="text-sm font-semibold text-foreground truncate">{user.displayName}</p>
            <p className="text-xs text-muted-foreground truncate mt-0.5">{user.email}</p>
          </div>

          {/* Menu items */}
          <div className="p-1.5 space-y-0.5">
            <Link
              to="/account"
              onClick={() => setOpen(false)}
              className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/40 transition-colors"
            >
              <User className="h-4 w-4" />
              Hồ sơ cá nhân
            </Link>
            <Link
              to="/billing"
              onClick={() => setOpen(false)}
              className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/40 transition-colors"
            >
              <CreditCard className="h-4 w-4" />
              Gói dịch vụ
            </Link>
            <Link
              to="/progress"
              onClick={() => setOpen(false)}
              className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/40 transition-colors"
            >
              <BarChart3 className="h-4 w-4" />
              Tiến độ của tôi
            </Link>
          </div>

          {/* Logout */}
          <div className="p-1.5 border-t border-border/60">
            <button
              onClick={() => { setOpen(false); logout() }}
              className="flex w-full items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium text-destructive hover:bg-destructive/10 transition-colors"
            >
              <LogOut className="h-4 w-4" />
              Đăng xuất
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export function AppShell() {
  const { user, logout } = useAuth()
  const [sheetOpen, setSheetOpen] = useState(false)

  return (
    <div className="flex min-h-svh flex-col bg-background text-foreground">
      {/* Announcement bar */}
      <div className="bg-accent/10 border-b border-accent/20 py-1.5 text-center text-xs text-accent">
        <Zap className="inline h-3 w-3 mr-1" />
        Interview Arena — Hơn <strong>5,000+</strong> câu hỏi phỏng vấn kỹ thuật đang chờ bạn luyện tập
      </div>

      <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 w-full max-w-5xl items-center justify-between px-4">
          <NavLink to="/" className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-md bg-accent font-mono text-xs font-bold text-accent-foreground">
              IA
            </div>
            <span className="font-mono text-sm font-semibold text-foreground">Interview Arena</span>
          </NavLink>

          <nav className="hidden items-center gap-8 md:flex">
            {NAV_LINKS.map(link => (
              <NavLink key={link.to} to={link.to} className={navLinkClassName}>
                {link.label}
              </NavLink>
            ))}
          </nav>

          <div className="hidden items-center gap-3 md:flex">
            {user ? (
              <AvatarDropdown user={user} logout={logout} />
            ) : (
              <div className="flex items-center gap-2">
                <NavLink to="/login" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Đăng nhập
                </NavLink>
                <NavLink to="/register">
                  <Button size="sm">Đăng ký</Button>
                </NavLink>
              </div>
            )}
          </div>

          <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="sm" className="md:hidden" aria-label="Mở menu">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle className="flex items-center gap-2">
                  <div className="flex h-6 w-6 items-center justify-center rounded-md bg-accent font-mono text-xs font-bold text-accent-foreground">IA</div>
                  Interview Arena
                </SheetTitle>
              </SheetHeader>
              {user && (
                <div className="flex items-center gap-3 py-4 border-b border-border/60 mb-2">
                  <div className={`flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br ${gradientByInitial(user.displayName)} font-bold text-sm text-white shrink-0`}>
                    {initialsOf(user.displayName) || 'U'}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold truncate">{user.displayName}</p>
                    <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                  </div>
                </div>
              )}
              <nav className="flex flex-col gap-1">
                {NAV_LINKS.map(link => (
                  <SheetClose asChild key={link.to}>
                    <NavLink to={link.to} className={({ isActive }) => cn(
                      'flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                      isActive ? 'bg-accent/10 text-accent' : 'text-muted-foreground hover:text-foreground hover:bg-muted/40'
                    )}>
                      {link.label}
                    </NavLink>
                  </SheetClose>
                ))}
                {user && (
                  <>
                    <div className="my-2 border-t border-border/40" />
                    <SheetClose asChild>
                      <NavLink to="/account" className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/40 transition-colors">
                        <User className="h-4 w-4" />
                        Hồ sơ cá nhân
                      </NavLink>
                    </SheetClose>
                    <SheetClose asChild>
                      <NavLink to="/billing" className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/40 transition-colors">
                        <CreditCard className="h-4 w-4" />
                        Gói dịch vụ
                      </NavLink>
                    </SheetClose>
                    <SheetClose asChild>
                      <button
                        onClick={logout}
                        className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-destructive hover:bg-destructive/10 transition-colors"
                      >
                        <LogOut className="h-4 w-4" />
                        Đăng xuất
                      </button>
                    </SheetClose>
                  </>
                )}
                {!user && (
                  <>
                    <div className="my-2 border-t border-border/40" />
                    <SheetClose asChild>
                      <NavLink to="/login" className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/40">
                        Đăng nhập
                      </NavLink>
                    </SheetClose>
                    <SheetClose asChild>
                      <NavLink to="/register" className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium bg-accent/10 text-accent hover:bg-accent/20">
                        Đăng ký
                      </NavLink>
                    </SheetClose>
                  </>
                )}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </header>

      <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-8">
        <Outlet />
      </main>

      {/* Upgraded Footer */}
      <footer className="border-t border-border mt-auto">
        <div className="mx-auto max-w-5xl px-4 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            {/* Brand */}
            <div className="col-span-2 md:col-span-1 space-y-3">
              <div className="flex items-center gap-2">
                <div className="flex h-7 w-7 items-center justify-center rounded-md bg-accent font-mono text-xs font-bold text-accent-foreground">IA</div>
                <span className="font-mono text-sm font-semibold">Interview Arena</span>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Nền tảng luyện phỏng vấn kỹ thuật toàn diện cho kỹ sư phần mềm Việt Nam.
              </p>
            </div>

            {/* Tính năng */}
            <div className="space-y-3">
              <p className="text-xs font-semibold text-foreground uppercase tracking-wider">Tính năng</p>
              <ul className="space-y-2 text-xs text-muted-foreground">
                <li><Link to="/questions" className="hover:text-foreground transition-colors">Kho câu hỏi</Link></li>
                <li><Link to="/flashcards" className="hover:text-foreground transition-colors">Flashcard SRS</Link></li>
                <li><Link to="/interviews/new" className="hover:text-foreground transition-colors">Phỏng vấn AI</Link></li>
                <li><Link to="/dsa" className="hover:text-foreground transition-colors">Thuật toán DSA</Link></li>
              </ul>
            </div>

            {/* Tài khoản */}
            <div className="space-y-3">
              <p className="text-xs font-semibold text-foreground uppercase tracking-wider">Tài khoản</p>
              <ul className="space-y-2 text-xs text-muted-foreground">
                <li><Link to="/account" className="hover:text-foreground transition-colors">Hồ sơ cá nhân</Link></li>
                <li><Link to="/billing" className="hover:text-foreground transition-colors">Gói dịch vụ</Link></li>
                <li><Link to="/progress" className="hover:text-foreground transition-colors">Tiến độ học tập</Link></li>
                <li><Link to="/register" className="hover:text-foreground transition-colors">Đăng ký miễn phí</Link></li>
              </ul>
            </div>

            {/* Hệ thống */}
            <div className="space-y-3">
              <p className="text-xs font-semibold text-foreground uppercase tracking-wider">Hệ thống</p>
              <ul className="space-y-2 text-xs text-muted-foreground">
                <li className="flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-success animate-pulse" />
                  Chấm bài Judge0
                </li>
                <li className="flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-success animate-pulse" />
                  AI Interview Engine
                </li>
                <li className="flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-success animate-pulse" />
                  Stripe Billing
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-border/40 pt-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-muted-foreground">
            <span className="font-mono">© 2026 Interview Arena. All rights reserved.</span>
            <div className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-success animate-pulse" />
              <span>Tất cả hệ thống hoạt động bình thường</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
