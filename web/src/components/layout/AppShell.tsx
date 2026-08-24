import { useState } from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import { Menu } from 'lucide-react'
import { useAuth } from '@/auth/useAuth'
import { Button } from '@/components/ui/button'
import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle, SheetClose } from '@/components/ui/sheet'
import { cn } from '@/lib/utils'

const NAV_LINKS = [
  { to: '/questions', label: 'Kho câu hỏi' },
  { to: '/flashcards', label: 'Flashcards' },
  { to: '/interviews/new', label: 'Phỏng vấn AI' },
  { to: '/progress', label: 'Tiến độ' },
]

function navLinkClassName({ isActive }: { isActive: boolean }) {
  return cn(
    'text-sm font-medium transition-colors hover:text-foreground',
    isActive ? 'text-foreground' : 'text-muted-foreground'
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
      <header className="border-b border-border">
        <div className="mx-auto flex h-16 w-full max-w-5xl items-center justify-between px-4">
          <NavLink to="/" className="font-mono text-sm font-semibold text-foreground">
            Interview Arena
          </NavLink>

          <nav className="hidden items-center gap-6 md:flex">
            {NAV_LINKS.map(link => (
              <NavLink key={link.to} to={link.to} className={navLinkClassName}>
                {link.label}
              </NavLink>
            ))}
          </nav>

          <div className="hidden items-center gap-3 md:flex">
            {user && (
              <Button
                variant="ghost"
                size="sm"
                onClick={logout}
                aria-label="Đăng xuất"
                title={user.displayName}
              >
                {initialsOf(user.displayName) || 'U'}
              </Button>
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
                <SheetTitle>Interview Arena</SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col gap-4">
                {NAV_LINKS.map(link => (
                  <SheetClose asChild key={link.to}>
                    <NavLink to={link.to} className={navLinkClassName}>
                      {link.label}
                    </NavLink>
                  </SheetClose>
                ))}
                {user && (
                  <SheetClose asChild>
                    <Button variant="ghost" onClick={logout} className="justify-start px-0">
                      Đăng xuất
                    </Button>
                  </SheetClose>
                )}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </header>

      <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-8">
        <Outlet />
      </main>
    </div>
  )
}
