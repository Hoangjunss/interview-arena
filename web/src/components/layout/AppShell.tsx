import { useState } from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import { Menu, Zap } from 'lucide-react'
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
              <div className="flex items-center gap-3">
                <span className="text-xs text-muted-foreground hidden lg:block">{user.email}</span>
                <NavLink to="/billing" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
                  Gói dịch vụ
                </NavLink>
                <button
                  onClick={logout}
                  title={`${user.displayName} — Click để đăng xuất`}
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-accent font-mono text-xs font-bold text-accent-foreground ring-2 ring-accent/30 transition-all hover:ring-accent/70"
                >
                  {initialsOf(user.displayName) || 'U'}
                </button>
              </div>
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
              <nav className="flex flex-col gap-4">
                {NAV_LINKS.map(link => (
                  <SheetClose asChild key={link.to}>
                    <NavLink to={link.to} className={({ isActive }) => cn(
                      'flex items-center gap-2 text-sm font-medium transition-colors',
                      isActive ? 'text-accent' : 'text-muted-foreground hover:text-foreground'
                    )}>
                      {link.label}
                    </NavLink>
                  </SheetClose>
                ))}
                {user && (
                  <>
                    <SheetClose asChild>
                      <NavLink to="/billing" className="flex items-center gap-2 text-sm font-medium transition-colors text-muted-foreground hover:text-foreground">
                        Gói dịch vụ
                      </NavLink>
                    </SheetClose>
                    <SheetClose asChild>
                      <Button variant="ghost" onClick={logout} className="justify-start px-0">
                        Đăng xuất
                      </Button>
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

      {/* Footer */}
      <footer className="border-t border-border mt-auto">
        <div className="mx-auto max-w-5xl px-4 py-6 flex items-center justify-between text-xs text-muted-foreground">
          <span className="font-mono">© 2026 Interview Arena</span>
          <div className="flex items-center gap-1">
            <span className="h-1.5 w-1.5 rounded-full bg-success animate-pulse" />
            <span>Hệ thống hoạt động bình thường</span>
          </div>
        </div>
      </footer>
    </div>
  )
}
